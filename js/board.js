
(function(){
  const cfg = BOARD_CONFIG;
  const SHARED = Boolean(cfg.supabaseUrl && cfg.supabaseKey);
  const NOTE_COLORS = {
    pink:'#ffc8dc', butter:'#fff2b8', mint:'#cdeedd', lilac:'#e3d3f5', sky:'#cde8f6', peach:'#ffd6bd'
  };

  const board = document.getElementById('noteBoard');
  const form = document.getElementById('noteForm');
  const msg = document.getElementById('noteMsg');
  const status = document.getElementById('boardStatus');
  const count = document.getElementById('noteCount');
  const picker = document.getElementById('colorPick');
  let chosen = 'pink', loaded = false, pollTimer = null;

  /* ---- color picker ---- */
  Object.entries(NOTE_COLORS).forEach(([name,hex])=>{
    const b = document.createElement('button');
    b.type = 'button'; b.style.background = hex; b.title = name;
    b.setAttribute('role','radio'); b.setAttribute('aria-label', name + ' note');
    b.setAttribute('aria-checked', name === chosen);
    b.addEventListener('click', ()=>{
      chosen = name;
      picker.querySelectorAll('button').forEach(x=>x.setAttribute('aria-checked', x === b));
    });
    picker.appendChild(b);
  });
  form.message.addEventListener('input', ()=> count.textContent = form.message.value.length);

  /* ---- storage: Supabase (shared) or this browser (local) ---- */
  const headers = ()=>{
    const h = { apikey: cfg.supabaseKey, 'Content-Type': 'application/json' };
    if (!cfg.supabaseKey.startsWith('sb_')) h.Authorization = 'Bearer ' + cfg.supabaseKey; // older "anon" JWT keys
    return h;
  };
  const api = cfg.supabaseUrl.replace(/\/$/,'') + '/rest/v1/notes';

  async function fetchNotes(){
    if (SHARED){
      const sel = 'select=id,name,message,color,created_at,pinned';
      const [pinned, recent] = await Promise.all([
        fetch(`${api}?${sel}&pinned=eq.true&order=created_at.desc`, {headers:headers()}),
        fetch(`${api}?${sel}&pinned=eq.false&order=created_at.desc&limit=${cfg.maxNotes}`, {headers:headers()})
      ]);
      if (!pinned.ok || !recent.ok) throw new Error('load failed');
      return [...await pinned.json(), ...await recent.json()];
    }
    try { return JSON.parse(localStorage.getItem('sf-notes') || '[]'); } catch(e){ return []; }
  }

  async function saveNote(note){
    if (SHARED){
      const res = await fetch(api, { method:'POST', headers:{...headers(), Prefer:'return=representation'}, body: JSON.stringify(note) });
      if (!res.ok) throw new Error('save failed');
      return (await res.json())[0];
    }
    const saved = { ...note, id: 'local-' + Date.now(), created_at: new Date().toISOString(), pinned:false };
    try {
      const all = JSON.parse(localStorage.getItem('sf-notes') || '[]');
      all.unshift(saved);
      localStorage.setItem('sf-notes', JSON.stringify(all.slice(0, cfg.maxNotes)));
    } catch(e) {}
    return saved;
  }

  /* ---- drawing notes ---- */
  function tilt(id){ // same tilt for the same note every time
    let h = 0; for (const c of String(id)) h = (h*31 + c.charCodeAt(0)) | 0;
    return ((Math.abs(h) % 9) - 4) * 1.1;
  }
  function when(iso){
    if (!iso) return '';
    const d = new Date(iso); if (isNaN(d)) return '';
    return d.toLocaleDateString(undefined, {month:'short', day:'numeric'});
  }
  function noteEl(n, i, opts = {}){
    const el = document.createElement('article');
    el.className = 'sticky' + (opts.pinned ? ' pinned' : '');
    el.style.setProperty('--note', NOTE_COLORS[n.color] || NOTE_COLORS.pink);
    el.style.setProperty('--r', tilt(n.id ?? n.message) + 'deg');
    el.style.animationDelay = Math.min(i, 12) * 60 + 'ms';
    const p = document.createElement('p'); p.textContent = n.message;           // textContent = safe, no HTML injection
    const meta = document.createElement('div'); meta.className = 'meta';
    const who = document.createElement('span'); who.textContent = '— ' + (n.name?.trim() || 'Anonymous');
    const date = document.createElement('span'); date.textContent = when(n.created_at);
    meta.append(who, date);
    if (opts.pinned){ const s = document.createElement('span'); s.className = 'star'; s.textContent = '★ pinned'; el.append(s); }
    el.append(p, meta);
    return el;
  }
  function render(notes){
    board.innerHTML = '';
    let i = 0;
    cfg.welcomeNotes.forEach(n=>board.append(noteEl({...n, id:'welcome-'+i}, i++, {pinned:true})));
    notes.forEach(n=>board.append(noteEl(n, i++, {pinned:n.pinned})));
  }

  async function load(){
    try {
      render(await fetchNotes());
      status.textContent = SHARED
        ? 'Notes are shared with everyone who visits ✿'
        : 'Notes are saved in your browser for now. Connect a database (see README) to share them with every visitor.';
    } catch(e){
      render([]);
      status.textContent = "Couldn't load notes right now, please try again in a bit.";
    }
  }

  /* ---- posting ---- */
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const name = form.name.value.trim().slice(0,30);
    const message = form.message.value.trim().slice(0,200);
    if (!message) return;
    const lower = (name + ' ' + message).toLowerCase();
    if (cfg.blockedWords.some(w=>lower.includes(w))){ msg.textContent = "Hmm, that note can't be posted."; return; }
    let last = 0; try { last = +localStorage.getItem('sf-last-note') || 0; } catch(e){}
    const wait = Math.ceil((last + cfg.cooldownSeconds*1000 - Date.now())/1000);
    if (wait > 0){ msg.textContent = `Give it ${wait}s before pinning another note ♡`; return; }

    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true; msg.textContent = 'Pinning…';
    try {
      const saved = await saveNote({ name, message, color: chosen });
      try { localStorage.setItem('sf-last-note', Date.now()); } catch(e){}
      // put the new note right after the pinned ones
      const firstNormal = [...board.children].find(c=>!c.classList.contains('pinned'));
      board.insertBefore(noteEl(saved, 0), firstNormal || null);
      form.reset(); count.textContent = '0';
      msg.textContent = 'Pinned! Thanks for the note ♡';
    } catch(err){
      msg.textContent = "Couldn't pin that note, please try again.";
    }
    btn.disabled = false;
  });

  /* ---- load when the Board page opens; refresh every 30s while it's open ---- */
  function onPage(id){
    clearInterval(pollTimer);
    if (id !== 'board') return;
    if (!loaded){ loaded = true; load(); }
    if (SHARED) pollTimer = setInterval(load, 30000);
  }
  addEventListener('pagechange', e=>onPage(e.detail));
  onPage((location.hash || '#home').slice(1));
})();
