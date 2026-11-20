const THEMES = [
  {
    id: 'cocoa', name: 'Chocolate Strawberry', desc: 'the original pink & brown',
    choc:'#4a2a16', choc2:'#6b4024', tan:'#b8895a', cream:'#fdf3e3',
    blush:'#fcd9e3', pink:'#f5aac2', rose:'#e2709a', berry:'#b8406e'
  },
  {
    id: 'bubblegum', name: 'Bubblegum Pop', desc: 'hot pink, stars & swirls',
    choc:'#5a3524', choc2:'#7a4a33', tan:'#c79a86', cream:'#fff3f9',
    blush:'#f7d2e6', pink:'#f59cca', rose:'#e3168a', berry:'#a50e66'
  },
  {
    id: 'retro', name: 'Retro Patchwork', desc: '70s orange, teal & olive',
    choc:'#4a2c1c', choc2:'#6e4428', tan:'#a3a948', cream:'#fff8ea',
    blush:'#f6e4c6', pink:'#f0a36e', rose:'#d9572e', berry:'#2f9893'
  },
  {
    id: 'seaside', name: 'Seaside Swirl', desc: 'aqua circles & pink',
    choc:'#2e3a4f', choc2:'#3f5068', tan:'#c9a46b', cream:'#fbfaf4',
    blush:'#d3eef0', pink:'#93d6d6', rose:'#e05e8f', berry:'#1f8ea1'
  },
  {
    id: 'pistachio', name: 'Pistachio Paisley', desc: 'sage green & rosy pink',
    choc:'#463722', choc2:'#665233', tan:'#a9b85c', cream:'#fffdf2',
    blush:'#ecf1d4', pink:'#f2a9c2', rose:'#d24f84', berry:'#76913a'
  },
  {
    id: 'bossa', name: 'Bossa Red', desc: 'warm red & tan, 70s record sleeve',
    choc:'#3a1712', choc2:'#5e2a1e', tan:'#c49a6c', cream:'#f8eedd',
    blush:'#e8d3b4', pink:'#e2a184', rose:'#b8302a', berry:'#7e1c18'
  },
  {
    id: 'lavender', name: 'Lavender Latte', desc: 'lilac, mocha & cream',
    choc:'#3f2b2a', choc2:'#5e4340', tan:'#b0927f', cream:'#fdf8f4',
    blush:'#e8dcf3', pink:'#cdb4ec', rose:'#9a63c9', berry:'#e27aa6'
  }
];

/* ---------- pattern images that need theme colors ---------- */
function svgURL(svg){ return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`; }
function flower(x,y,s,petal,center){
  const pts=[[0,-9],[8.5,-3],[5.3,7.3],[-5.3,7.3],[-8.5,-3]];
  return `<g transform="translate(${x} ${y}) scale(${s})">${pts.map(([a,b])=>`<circle cx="${a}" cy="${b}" r="7" fill="${petal}"/>`).join('')}<circle r="4" fill="${center}"/></g>`;
}
function heart(x,y,s,c){
  return `<path transform="translate(${x} ${y}) scale(${s})" d="M0 12C-9 5-14 1-14-5a7 7 0 0 1 14-2 7 7 0 0 1 14 2c0 6-5 10-14 17z" fill="${c}"/>`;
}

function applyTheme(id){
  const t = THEMES.find(x=>x.id===id) || THEMES[0];
  const root = document.documentElement.style;
  const map = {choc:'--choc',choc2:'--choc-2',tan:'--tan',cream:'--cream',blush:'--blush',pink:'--pink',rose:'--rose',berry:'--berry'};
  for (const k in map) root.setProperty(map[k], t[k]);

  root.setProperty('--floral-img', svgURL(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">${flower(22,22,1,t.pink,t.cream)}${flower(60,58,.6,t.rose,t.cream)}<circle cx="62" cy="16" r="3" fill="${t.cream}"/><circle cx="14" cy="64" r="2.5" fill="${t.tan}"/></svg>`));
  root.setProperty('--hearts-img', svgURL(
    `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70">${heart(18,18,1,t.pink)}${heart(52,50,.65,t.cream)}${heart(55,14,.42,t.rose)}</svg>`));

  document.documentElement.dataset.theme = t.id;
  try { localStorage.setItem('sf-theme', t.id); } catch(e) {}
  document.querySelectorAll('.theme-opt').forEach(b=>b.setAttribute('aria-checked', b.dataset.id===t.id));
  window.dispatchEvent(new CustomEvent('themechange',{detail:t}));
}

/* ---------- picker UI ---------- */
(function(){
  const list = document.getElementById('themeList');
  const btn = document.getElementById('themeBtn');
  const panel = document.getElementById('themePanel');
  THEMES.forEach(t=>{
    const b = document.createElement('button');
    b.className='theme-opt'; b.type='button'; b.dataset.id=t.id; b.setAttribute('role','radio');
    b.innerHTML = `<span class="sw">${[t.choc,t.rose,t.pink,t.blush].map(c=>`<i style="background:${c}"></i>`).join('')}</span><span>${t.name}<small>${t.desc}</small></span>`;
    b.addEventListener('click',()=>applyTheme(t.id));
    list.appendChild(b);
  });
  btn.addEventListener('click',()=>{
    panel.hidden = !panel.hidden;
    btn.setAttribute('aria-expanded', !panel.hidden);
  });
  document.addEventListener('click',e=>{
    if(!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)){ panel.hidden=true; btn.setAttribute('aria-expanded',false); }
  });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ panel.hidden=true; btn.setAttribute('aria-expanded',false);} });

  let saved = null;
  try { saved = localStorage.getItem('sf-theme'); } catch(e) {}
  applyTheme(saved || THEMES[0].id);
})();
