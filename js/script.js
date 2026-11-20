const OS_REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOTION_SPEED = { full: 1, calm: .35, off: 0 };
let MOTION = OS_REDUCED ? 'calm' : 'full';
try { const saved = localStorage.getItem('sf-motion'); if (MOTION_SPEED[saved] !== undefined) MOTION = saved; } catch(e){}
document.documentElement.dataset.motion = MOTION;
function setMotion(m){
  MOTION = m;
  document.documentElement.dataset.motion = m;
  try { localStorage.setItem('sf-motion', m); } catch(e){}
  document.querySelectorAll('.motion-opts button').forEach(b=>b.setAttribute('aria-checked', b.dataset.m === m));
  window.dispatchEvent(new CustomEvent('motionchange', {detail:m}));
}
// motion switch inside the palette menu
(function(){
  const panel = document.getElementById('themePanel');
  if (!panel) return;
  const wrap = document.createElement('div');
  wrap.className = 'motion-row';
  wrap.innerHTML = '<div class="theme-head">Motion</div><div class="motion-opts" role="radiogroup" aria-label="Animation level"></div>';
  const opts = wrap.querySelector('.motion-opts');
  [['full','✨ Full'],['calm','🌙 Calm'],['off','⏸ Off']].forEach(([m,label])=>{
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.m = m; b.textContent = label;
    b.setAttribute('role','radio'); b.setAttribute('aria-checked', m === MOTION);
    b.addEventListener('click', e=>{ e.stopPropagation(); setMotion(m); });
    opts.appendChild(b);
  });
  panel.appendChild(wrap);
})();


function themeColor(name, alpha = 1){
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#000000';
  const n = parseInt(hex.replace('#',''),16);
  return `rgba(${n>>16&255},${n>>8&255},${n&255},${alpha})`;
}

/* ---------- 1. page switching ---------- */
const PAGES = ['home','about','projects','board','contact'];
function route(){
  let id = (location.hash || '#home').slice(1);
  if (!PAGES.includes(id)) id = 'home';
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('show', p.id==='page-'+id));
  document.querySelectorAll('.links a').forEach(a=>a.classList.toggle('active', a.dataset.page===id));
  window.scrollTo({top:0, behavior:'smooth'});
  window.dispatchEvent(new CustomEvent('pagechange',{detail:id}));
}
addEventListener('hashchange', route);
route();

/* ---------- 2. contact form (not connected to an inbox yet) ---------- */
document.getElementById('form').addEventListener('submit', e=>{
  e.preventDefault();
  document.getElementById('sent').style.display = 'block';
});

/* ---------- 3. mouse tracking (shared by the side decor + waves) ---------- */
const mouse = { x:-9999, y:-9999 };
addEventListener('pointermove', e=>{ mouse.x = e.clientX; mouse.y = e.clientY; }, {passive:true});
addEventListener('pointerleave', ()=>{ mouse.x = mouse.y = -9999; });
document.addEventListener('mouseleave', ()=>{ mouse.x = mouse.y = -9999; });

const Side = (function(){
  const svg = document.getElementById('side');
  const NS = 'http://www.w3.org/2000/svg';
  let items = [];

  // a curly flourish tile, 300px tall
  const FLOURISH = [
    'M70 0 C40 50 110 90 72 150 C46 192 60 240 84 300',
    'M78 60 C110 46 148 66 140 96 C134 116 108 112 112 94 C115 82 130 84 128 95',
    'M66 175 C38 160 8 182 18 210 C25 228 48 224 45 208 C43 198 32 200 34 209',
    'M80 238 C106 232 128 246 122 266 C118 278 104 276 106 266',
    'M58 112 C44 104 36 92 42 80'
  ];
  const star = (r)=>{ let d=''; for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, rr=i%2?r*.45:r; d+=(i?'L':'M')+(Math.cos(a)*rr).toFixed(1)+' '+(Math.sin(a)*rr).toFixed(1);} return d+'Z'; };

  function el(tag, attrs, parent){
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function build(){
    const H = innerHeight, W = 190;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('height', H);
    svg.style.height = H + 'px';
    svg.innerHTML = '';
    items = [];

    const defs = el('defs', {}, svg);
    // fade everything out toward the right edge
    const lg = el('linearGradient', {id:'sideFade', x1:'0', x2:'1', y1:'0', y2:'0'}, defs);
    el('stop', {offset:'0', 'stop-color':'#fff', 'stop-opacity':'1'}, lg);
    el('stop', {offset:'.55', 'stop-color':'#fff', 'stop-opacity':'.7'}, lg);
    el('stop', {offset:'1', 'stop-color':'#fff', 'stop-opacity':'0'}, lg);
    const mask = el('mask', {id:'sideMask', maskUnits:'userSpaceOnUse', x:0, y:0, width:W, height:H}, defs);
    el('rect', {width:W, height:H, fill:'url(#sideFade)'}, mask);
    // halftone dots
    const pat = el('pattern', {id:'halftone', width:'9', height:'9', patternUnits:'userSpaceOnUse'}, defs);
    el('circle', {cx:'4.5', cy:'4.5', r:'2', style:'fill:var(--rose)'}, pat);
    const rg = el('radialGradient', {id:'dotFade'}, defs);
    el('stop', {offset:'0', 'stop-color':'#fff', 'stop-opacity':'.9'}, rg);
    el('stop', {offset:'1', 'stop-color':'#fff', 'stop-opacity':'0'}, rg);
    const dmask = el('mask', {id:'dotMask', maskUnits:'userSpaceOnUse', x:0, y:0, width:W, height:H}, defs);

    const g = el('g', {mask:'url(#sideMask)'}, svg);

    // soft vertical stripes
    const stripeCols = ['--pink','--blush','--rose','--cream','--pink','--berry','--cream','--pink','--rose','--blush'];
    let x = 0, i = 0;
    while (x < W){
      const w = [14,4,22,3,10,2,18,6,8,26][i%10];
      el('rect', {x, y:0, width:w, height:H, style:`fill:var(${stripeCols[i%stripeCols.length]});opacity:${i%3? .55:.8}`}, g);
      x += w; i++;
    }
    // halftone patches
    for (let y = 120; y < H; y += 420){
      el('circle', {cx: 60 + (y%2)*40, cy:y, r:110, fill:'url(#dotFade)'}, dmask);
    }
    el('rect', {width:W, height:H, fill:'url(#halftone)', mask:'url(#dotMask)', opacity:.55}, g);

    // flourishes, repeated down the page
    for (let y = -40, k = 0; y < H; y += 300, k++){
      const wrap = el('g', {}, svg);
      const inner = el('g', {}, wrap);
      const flip = k % 2 ? `translate(150 ${y}) scale(-1 1)` : `translate(0 ${y})`;
      const art = el('g', {transform:flip}, inner);
      FLOURISH.forEach((d,j)=>el('path', {d, fill:'none', style:'stroke:var(--choc)', 'stroke-width': j? 3:4.5, 'stroke-linecap':'round'}, art));
      // little leaves/dots on the vine
      [[96,40],[52,130],[90,200],[40,250]].forEach(([cx,cy],j)=>el('circle',{cx,cy,r:j%2?4:5.5, style:`fill:var(${j%2?'--rose':'--choc'})`},art));
      items.push({node:inner, x:80, y:y+150, kind:'vine', phase:k*1.7, ox:0, oy:0, vx:0, vy:0, rot:0, vr:0});
    }

    // ring circles + stars scattered along the side
    const spots = [];
    for (let y = 60; y < H; y += 115) spots.push(y);
    spots.forEach((y,k)=>{
      const wrap = el('g', {}, svg);
      const inner = el('g', {}, wrap);
      const cx = [118, 54, 132, 70, 108][k%5], r = [34,22,46,18,28][k%5];
      if (k % 3 === 2){
        el('path', {d:star(r*.6), transform:`translate(${cx} ${y})`, style:'fill:var(--rose)', stroke:'none'}, inner);
        items.push({node:inner, x:cx, y, kind:'star', phase:k, ox:0, oy:0, vx:0, vy:0, rot:0, vr:0});
      } else {
        const ring = el('g', {transform:`translate(${cx} ${y})`}, inner);
        el('circle', {r, style:'fill:var(--pink);stroke:var(--choc)', 'stroke-width':4}, ring);
        el('circle', {r:r*.66, style:'fill:var(--cream);stroke:var(--choc)', 'stroke-width':2.5}, ring);
        el('circle', {r:r*.66, fill:'none', style:'stroke:var(--rose)', 'stroke-width':3, 'stroke-dasharray':'2 6', 'stroke-linecap':'round'}, ring);
        el('circle', {r:r*.28, style:'fill:var(--rose)'}, ring);
        el('circle', {r:r*.1, style:'fill:var(--choc)'}, ring);
        items.push({node:inner, ring, x:cx, y, kind:'ring', phase:k, ox:0, oy:0, vx:0, vy:0, rot:0, vr:0, r});
      }
    });
    // tiny scattered dots + mini stars
    for (let k = 0; k < Math.floor(H/22); k++){
      const cx = 20 + Math.random()*160, cy = Math.random()*H;
      if (k % 6 === 0) el('path', {d:star(6), transform:`translate(${cx} ${cy})`, style:'fill:var(--choc);opacity:.7'}, svg);
      else el('circle', {cx, cy, r:1.5+Math.random()*3.5, style:`fill:var(${['--rose','--choc','--pink','--cream'][k%4]});opacity:.8`}, svg);
    }
    tick(0, true);
  }

  // physics: push away from the mouse, spring back, gentle idle sway
  function tick(t, force){
    const R = 170;
    const still = MOTION === 'off';
    const mx = still ? -9999 : mouse.x, my = still ? -9999 : mouse.y;
    items.forEach(it=>{
      const dx = it.x + it.ox - mx, dy = it.y + it.oy - my;
      const d = Math.hypot(dx, dy);
      let fx = 0, fy = 0;
      if (d < R && d > 0.1){
        const f = Math.pow(1 - d/R, 2) * 3.2;
        fx = dx/d * f; fy = dy/d * f;
        it.vr += (dx > 0 ? 1 : -1) * f * .35;   // a little spin when nudged
      }
      // spring back home
      it.vx = (it.vx + fx - it.ox * .04) * .9;
      it.vy = (it.vy + fy - it.oy * .04) * .9;
      it.ox += it.vx; it.oy += it.vy;
      it.vr = (it.vr - it.rot * .03) * .92;
      it.rot += it.vr;
      const sway = Math.sin(t/2600 + it.phase) * (it.kind==='vine' ? 2.5 : 4);
      const spin = it.kind==='ring' ? t/180 : 0;   // rings turn very slowly
      if (it.kind === 'vine'){
        it.node.setAttribute('transform', `translate(${it.ox.toFixed(2)} ${it.oy.toFixed(2)}) rotate(${(it.rot*.4 + sway*.4).toFixed(2)} ${it.x} ${it.y-150})`);
      } else {
        it.node.setAttribute('transform', `translate(${(it.ox + sway).toFixed(2)} ${it.oy.toFixed(2)}) rotate(${(it.rot*4 + spin).toFixed(2)} ${it.x} ${it.y})`);
      }
    });
  }

  addEventListener('resize', ()=>{ clearTimeout(build.t); build.t = setTimeout(build, 150); });
  build();
  return { tick };
})();

const Waves = (function(){
  const cv = document.getElementById('waves'), ctx = cv.getContext('2d');
  const STEP = 10;           // px between points on each ribbon
  const MOUSE_RADIUS = 170;  // how far the mouse reaches
  const MOUSE_PUSH = 85;     // how hard ribbons bend away
  let W, H, dpr;

  const ribbons = [
    {y:.18, a:38, k:.006,  s:.16,  color:'--rose',  alpha:.38, w:16, ph:0},
    {y:.22, a:30, k:.009,  s:-.12, color:'--cream', alpha:.7,  w:5,  ph:1.4},
    {y:.48, a:52, k:.0045, s:.1,   color:'--tan',   alpha:.22, w:28, ph:2.1},
    {y:.52, a:40, k:.007,  s:.18,  color:'--choc',  alpha:.16, w:4,  ph:.7},
    {y:.56, a:46, k:.005,  s:-.09, color:'--pink',  alpha:.6,  w:12, ph:3},
    {y:.82, a:36, k:.008,  s:.14,  color:'--rose',  alpha:.32, w:20, ph:4.2},
    {y:.86, a:28, k:.011,  s:-.16, color:'--cream', alpha:.75, w:4,  ph:5},
  ];
  const swirls = [];
  const SWIRL_COLORS = ['--rose','--choc','--cream','--tan'];

  function size(){
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W*dpr; cv.height = H*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const n = Math.ceil((W + 40) / STEP) + 1;
    ribbons.forEach(r=>{ r.off = new Float32Array(n); r.vel = new Float32Array(n); });
  }
  function colors(){
    ribbons.forEach(r=>r.css = themeColor(r.color, r.alpha));
    swirls.forEach(s=>s.css = themeColor(s.colorVar, .6));
  }

  ribbons.forEach((r,i)=>{
    if (r.w >= 12) for (let n = 0; n < 4; n++) swirls.push({
      r, off: Math.random(), sp: .006 + Math.random()*.006, size: 10 + Math.random()*16,
      rot: Math.random()*6, spin: 0, ox:0, oy:0, vx:0, vy:0, colorVar: SWIRL_COLORS[(i+n)%4]
    });
  });

  // waves grow a little with the music's beat (window.MUSIC_LEVEL comes from js/music.js)
  const baseY = (r,x,t)=>{
    const a = r.a * (1 + (window.MUSIC_LEVEL || 0) * .7);
    return H*r.y + a*Math.sin(x*r.k + t*r.s + r.ph) + a*.45*Math.sin(x*r.k*2.3 - t*r.s*1.3 + r.ph*2);
  };

  function spiral(x,y,s,rot,col){
    ctx.save(); ctx.translate(x,y); ctx.rotate(rot);
    ctx.beginPath();
    for (let a = 0; a < Math.PI*4.2; a += .15){ const rr = s*a/(Math.PI*4.2); ctx.lineTo(Math.cos(a)*rr, Math.sin(a)*rr); }
    ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.stroke();
    ctx.beginPath(); ctx.arc(0,0,s*.18,0,7); ctx.fillStyle = col; ctx.fill();
    ctx.restore();
  }

  // the animation clock runs at the chosen motion speed
  let clock = 0, lastTs = null, drawnStill = false;
  const redraw = ()=>{ drawnStill = false; };
  addEventListener('motionchange', redraw);
  addEventListener('themechange', redraw);
  addEventListener('resize', redraw);

  function draw(ts){
    const dt = lastTs === null ? 0 : Math.min(ts - lastTs, 100);
    lastTs = ts;
    clock += dt * MOTION_SPEED[MOTION];
    if (MOTION === 'off'){
      if (drawnStill){ requestAnimationFrame(draw); return; }   // nothing moves: skip the work
      drawnStill = true;
    }
    const t = clock/1000;
    ctx.clearRect(0,0,W,H);
    const still = MOTION === 'off';
    const mx = still ? -9999 : mouse.x, my = still ? -9999 : mouse.y;

    ribbons.forEach(r=>{
      // how close is the mouse to this ribbon, and which side is it on?
      const gap = baseY(r, mx, t) + (r.off[Math.round((mx+20)/STEP)] || 0) - my;
      const near = Math.max(0, 1 - Math.abs(gap) / MOUSE_RADIUS);
      const side = gap >= 0 ? 1 : -1;
      const sigma = MOUSE_RADIUS * .7;
      ctx.beginPath();
      for (let i = 0, x = -20; i < r.off.length; i++, x += STEP){
        const y0 = baseY(r,x,t);
        // bulge away from the mouse (smooth bell curve), with a springy wobble back
        const dx = x - mx;
        const target = near * near * Math.exp(-(dx*dx) / (2*sigma*sigma)) * MOUSE_PUSH * side;
        r.vel[i] = (r.vel[i] + (target - r.off[i]) * .05) * .88;
        r.off[i] += r.vel[i];
        const y = y0 + r.off[i];
        i ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
      }
      ctx.strokeStyle = r.css; ctx.lineWidth = r.w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    });

    swirls.forEach(s=>{
      const span = W + 120;
      const x0 = (((s.off + t*s.sp*Math.sign(s.r.s)) % 1) + 1) % 1 * span - 60;
      const idx = Math.max(0, Math.min(s.r.off.length-1, Math.round((x0+20)/STEP)));
      const y0 = baseY(s.r,x0,t) + s.r.off[idx];
      const dx = x0 + s.ox - mx, dy = y0 + s.oy - my, d = Math.hypot(dx,dy);
      if (d < 140 && d > .1){
        const f = Math.pow(1 - d/140, 2) * 4;
        s.vx += dx/d*f; s.vy += dy/d*f; s.spin += f*.04;
      }
      s.vx = (s.vx - s.ox*.03) * .9; s.vy = (s.vy - s.oy*.03) * .9;
      s.ox += s.vx; s.oy += s.vy;
      s.spin *= .96;
      s.rot += (.004 + s.spin) * Math.sign(s.r.s);
      spiral(x0 + s.ox, y0 + s.oy, s.size, s.rot, s.css);
    });

    Side.tick(clock);
    requestAnimationFrame(draw);
  }

  addEventListener('resize', size);
  addEventListener('themechange', colors);
  size(); colors();
  requestAnimationFrame(draw);
})();
