
(function(){

const SONGS = {
  strawberry: { // dreamy 2-step garage, Db major
    bpm: 132, swing: .16, padTone: 'sawtooth', padCut: 1500, bell: 'glass', delaySteps: 3,
    chords: [[61,65,68,72],[58,65,68,72],[61,65,66,70],[60,63,68,70]],
    bass: [37,34,42,44], bassSteps: [[0,0],[3,0],[10,0],[14,12]],
    drums: { kick:[0,7,10], snare:[4,12], ghost:[15], hat:[2,6,10,14], shaker:[0,1,3,4,5,7,8,9,11,12,13,15] },
    melody: [
      [[0,80,2],[3,77,1],[4,80,2],[6,82,2],[10,85,3],[14,84,2]],
      [[0,82,3],[4,80,2],[7,77,2],[10,75,2],[12,77,4]],
      [[0,78,2],[3,77,1],[4,78,2],[6,80,2],[8,82,4],[14,85,2]],
      [[0,84,4],[6,80,2],[8,77,4],[12,75,2],[14,73,2]]
    ]
  },
  bubblegum: { // light drum & bass, F minor, sparkly arps
    bpm: 168, swing: 0, padTone: 'sawtooth', padCut: 1300, bell: 'glass', delaySteps: 3, arp: true,
    chords: [[56,60,63,67],[56,60,61,65],[55,60,63,67],[55,58,60,63]],
    bass: [41,37,44,39], bassSteps: [[0,0],[6,0],[10,0],[11,7]],
    drums: { kick:[0,10], snare:[4,12], ghost:[7,9,15], hat:[0,2,4,6,8,10,12,14], open:[14] },
    melody: [
      [[0,84,4],[6,82,2],[8,79,6]],
      [[0,80,4],[6,79,2],[8,77,6]],
      [[0,79,4],[6,80,2],[8,84,4],[12,82,4]],
      [[0,82,6],[8,79,8]]
    ]
  },
  /* ---- Lamp-inspired: bossa nova & 70s Japanese soft pop ---- */
  breeze: { // breezy bossa nova, D major
    bpm: 128, swing: .08, sectionBars: 8, kit: 'brush', bassInst: 'upright', lead: 'flute',
    padTone: 'sawtooth', padCut: 800, padVol: .03, bell: 'keys', delaySteps: 3,
    comp: { type: 'strum', steps: [0,3,6,10,12] },
    chords: [[54,57,61,64],[57,61,62,66],[55,59,62,66],[55,59,61,66],[54,59,62,67],[52,57,61,64],[52,55,59,62],[55,57,62,64]],
    bass: [38,35,40,33,43,42,40,33], bassSteps: [[0,0],[6,7],[8,0],[14,7]],
    drums: { kick:[0,8], snare:[4,12], rim:[0,3,6,10,13], shaker:[0,2,3,4,6,7,8,10,11,12,14,15], hat:[] },
    melody: [
      [[2,81,2],[4,78,2],[6,76,2],[8,78,8]],
      [[2,74,2],[4,76,2],[6,78,4],[10,85,6]],
      [[0,83,4],[4,81,2],[6,78,2],[8,79,6],[14,78,2]],
      [[0,76,6],[8,78,2],[10,81,2],[12,83,4]],
      [[0,83,6],[6,86,2],[8,85,6]],
      [[0,81,4],[4,78,2],[6,76,2],[8,81,8]],
      [[2,79,2],[4,78,2],[6,76,4],[10,74,6]],
      [[0,76,8],[10,78,2],[12,81,4]]
    ]
  },
  dusk: { // 70s city-pop ballad, F major, Rhodes + flute
    bpm: 94, swing: .12, sectionBars: 8, kit: 'brush', bassInst: 'upright', lead: 'flute',
    padTone: 'sawtooth', padCut: 1000, padVol: .04, bell: 'keys', delaySteps: 3,
    comp: { type: 'rhodes', steps: [0,6,10] },
    chords: [[57,60,64,67],[55,59,62,64],[55,57,61,64],[53,57,60,64],[53,57,58,62],[53,55,58,62],[52,57,60,64],[57,60,62,65]],
    bass: [41,40,33,38,43,36,41,34], bassSteps: [[0,0],[10,0],[14,7]],
    drums: { kick:[0,10], snare:[4,12], hat:[0,2,4,6,8,10,12,14] },
    melody: [
      [[0,81,2],[2,84,2],[4,88,6],[12,86,4]],
      [[0,83,4],[4,81,2],[6,79,6],[14,76,2]],
      [[0,76,2],[2,79,2],[4,81,4],[8,85,6]],
      [[0,86,4],[4,84,2],[6,81,4],[10,76,6]],
      [[0,82,4],[4,81,2],[6,79,2],[8,77,8]],
      [[2,79,2],[4,82,2],[6,86,4],[10,84,6]],
      [[0,81,6],[6,84,2],[8,88,8]],
      [[0,86,4],[4,84,2],[6,81,6],[12,77,4]]
    ]
  },
  rain: { // slow bossa ballad, C major, guitar arpeggios + vibraphone
    bpm: 74, swing: .1, sectionBars: 8, kit: 'brush', bassInst: 'upright', lead: 'vibes',
    padTone: 'triangle', padCut: 900, padVol: .05, bell: 'keys', delaySteps: 6,
    comp: { type: 'arp' },
    chords: [[55,59,62,64],[55,59,60,64],[53,57,60,64],[53,57,59,64],[52,55,59,62],[55,57,61,64],[53,57,60,64],[53,56,60,62]],
    bass: [36,33,38,31,40,33,38,41], bassSteps: [[0,0],[8,7]],
    drums: { kick:[], snare:[], rim:[3,10], shaker:[0,2,4,6,8,10,12,14], hat:[] },
    melody: [
      [[0,76,4],[4,79,4],[8,83,8]],
      [[0,84,4],[4,83,2],[6,79,10]],
      [[0,77,4],[4,81,4],[8,84,6],[14,83,2]],
      [[0,81,8],[8,79,8]],
      [[0,79,4],[4,83,4],[8,86,8]],
      [[0,85,4],[4,81,4],[8,79,8]],
      [[0,77,4],[4,81,4],[8,84,8]],
      [[0,80,6],[6,79,2],[8,77,8]]
    ]
  },

  /* ---- original Y2K tracks (add them back to the playlist any time) ---- */
  latte: { // cozy lo-fi, Eb major, vinyl crackle
    bpm: 82, sectionBars: 4, swing: .3, padTone: 'triangle', padCut: 900, bell: 'keys', delaySteps: 6, crackle: true,
    chords: [[55,58,62,65],[51,55,58,62],[56,60,63,67],[56,60,63,65]],
    bass: [39,36,41,46], bassSteps: [[0,0],[7,0],[10,7]],
    drums: { kick:[0,7,10], snare:[4,12], hat:[0,2,4,6,8,10,12,14] },
    melody: [
      [[2,79,2],[4,82,4],[10,84,2],[12,82,4]],
      [[0,79,4],[6,75,2],[8,77,6]],
      [[2,80,2],[4,84,2],[6,82,2],[8,80,4],[12,79,2]],
      [[0,82,6],[8,79,2],[10,77,2],[12,75,4]]
    ]
  }
};

const hz = m => 440 * Math.pow(2, (m - 69) / 12);

/* ---------- Part 2: INSTRUMENTS ---------- */
let ctx, bus, comp, master, analyser, reverb, reverbIn, delay, delayIn, noise;

function initAudio(){
  if (ctx) return;
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  bus = ctx.createGain();                       // everything goes here (used for fades)
  comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16; comp.ratio.value = 3;
  master = ctx.createGain();                    // volume slider
  analyser = ctx.createAnalyser(); analyser.fftSize = 64;
  bus.connect(comp); comp.connect(master); master.connect(analyser); analyser.connect(ctx.destination);

  // reverb (a made-up "room" from fading noise)
  reverb = ctx.createConvolver();
  const len = ctx.sampleRate * 2.6, ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++){ const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/len, 3); }
  reverb.buffer = ir;
  reverbIn = ctx.createGain(); reverbIn.gain.value = .35;
  const revOut = ctx.createGain(); revOut.gain.value = .9;
  reverbIn.connect(reverb); reverb.connect(revOut); revOut.connect(bus);

  // echo
  delay = ctx.createDelay(2);
  const fb = ctx.createGain(); fb.gain.value = .32;
  const tone = ctx.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 3000;
  delayIn = ctx.createGain(); delayIn.gain.value = .22;
  delayIn.connect(delay); delay.connect(tone); tone.connect(fb); fb.connect(delay); tone.connect(bus);

  // white noise for drums
  noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const nd = noise.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random()*2-1;
}

// plucked-string sound (Karplus-Strong), made once per note and reused
const stringCache = {};
function stringBuffer(m){
  if (stringCache[m]) return stringCache[m];
  const sr = ctx.sampleRate, len = Math.floor(sr * 2.4), period = sr / hz(m);
  const N = Math.max(2, Math.floor(period - .6));       // whole-sample part of the string length
  const D = period - .5 - N, C = (1 - D) / (1 + D);     // fractional part, tuned with an allpass filter
  const buf = ctx.createBuffer(1, len, sr), d = buf.getChannelData(0), ring = new Float32Array(N);
  let prev = 0;
  for (let i = 0; i < N; i++){ prev = prev * .55 + (Math.random()*2-1) * .45; ring[i] = prev; } // softer = nylon
  const decay = m < 50 ? .9965 : .9982;
  let idx = 0, last = 0, apX = 0, apY = 0;
  for (let i = 0; i < len; i++){
    const out = ring[idx];
    d[i] = out;
    const lp = .5 * (out + last); last = out;           // string damping
    const ap = C * lp + apX - C * apY; apX = lp; apY = ap;
    ring[idx] = decay * ap;
    idx = (idx + 1) % N;
  }
  return stringCache[m] = buf;
}

function env(g, t, peak, attack, end){
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, end);
}
function noiseSrc(t, dur){
  const s = ctx.createBufferSource(); s.buffer = noise;
  s.start(t, Math.random()*1.5); s.stop(t + dur); return s;
}

const Inst = {
  kick(t, v=1){
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(45, t + .12);
    env(g, t, .9*v, .005, t + .42);
    o.connect(g); g.connect(bus); o.start(t); o.stop(t + .45);
  },
  snare(t, v=1){
    const n = noiseSrc(t, .25), f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = 'bandpass'; f.frequency.value = 1900; f.Q.value = .7;
    env(g, t, .55*v, .003, t + .2);
    n.connect(f); f.connect(g); g.connect(bus); g.connect(reverbIn);
    const o = ctx.createOscillator(), g2 = ctx.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(220, t); o.frequency.exponentialRampToValueAtTime(160, t + .08);
    env(g2, t, .35*v, .003, t + .11);
    o.connect(g2); g2.connect(bus); o.start(t); o.stop(t + .12);
  },
  hat(t, v=1, open=false){
    const n = noiseSrc(t, open ? .35 : .08), f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = 'highpass'; f.frequency.value = 7500;
    env(g, t, .2*v, .002, t + (open ? .3 : .045));
    n.connect(f); f.connect(g); g.connect(bus);
  },
  crackle(t){
    const n = noiseSrc(t, .02), f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = 'bandpass'; f.frequency.value = 2500 + Math.random()*3000;
    env(g, t, .04 + Math.random()*.05, .001, t + .015);
    n.connect(f); f.connect(g); g.connect(bus);
  },
  bass(t, m, dur){
    const o = ctx.createOscillator(), o2 = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    o.type = 'sine'; o2.type = 'triangle'; o.frequency.value = o2.frequency.value = hz(m);
    f.type = 'lowpass'; f.frequency.value = 380;
    const g2 = ctx.createGain(); g2.gain.value = .35;
    env(g, t, .55, .01, t + dur);
    o.connect(g); o2.connect(g2); g2.connect(f); f.connect(g); g.connect(bus);
    o.start(t); o2.start(t); o.stop(t + dur + .05); o2.stop(t + dur + .05);
  },
  pad(t, notes, dur, song){
    const f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = 'lowpass'; f.frequency.value = song.padCut; f.Q.value = .6;
    g.gain.setValueAtTime(0.0001, t);
    const pv = song.padVol || .06;
    g.gain.exponentialRampToValueAtTime(pv, t + .35);
    g.gain.setValueAtTime(pv, t + dur - .1);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + .5);
    f.connect(g); g.connect(bus); g.connect(reverbIn);
    notes.forEach(m=>[-7, 7].forEach(cents=>{
      const o = ctx.createOscillator();
      o.type = song.padTone; o.frequency.value = hz(m); o.detune.value = cents;
      o.connect(f); o.start(t); o.stop(t + dur + .6);
    }));
  },
  /* ---- Lamp-style acoustic instruments ---- */
  pluck(t, m, v=.2, cut=2600){ // nylon guitar / upright bass (plucked string model)
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = stringBuffer(m);
    f.type = 'lowpass'; f.frequency.value = cut;
    g.gain.value = v;
    s.connect(f); f.connect(g); g.connect(bus); g.connect(reverbIn);
    s.start(t);
  },
  strum(t, notes, v=.13){ // soft thumb strum, low to high
    notes.forEach((m,i)=>Inst.pluck(t + i*.014, m, v * (1 - i*.08)));
  },
  upright(t, m, dur){
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = stringBuffer(m);
    f.type = 'lowpass'; f.frequency.value = 700;
    g.gain.setValueAtTime(.95, t); g.gain.setValueAtTime(.95, t + dur); g.gain.exponentialRampToValueAtTime(.001, t + dur + .25);
    s.connect(f); f.connect(g); g.connect(bus);
    s.start(t); s.stop(t + dur + .3);
  },
  flute(t, m, dur){
    const f0 = hz(m), o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), mix2 = ctx.createGain();
    o.frequency.value = f0; o2.type = 'triangle'; o2.frequency.value = f0 * 2; mix2.gain.value = .08;
    // vibrato that fades in like a real player
    const lfo = ctx.createOscillator(), depth = ctx.createGain();
    lfo.frequency.value = 5.2; depth.gain.setValueAtTime(0, t); depth.gain.linearRampToValueAtTime(f0 * .007, t + .35);
    lfo.connect(depth); depth.connect(o.frequency); depth.connect(o2.frequency);
    const end = t + Math.max(dur, .2);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(.12, t + .07);
    g.gain.setValueAtTime(.11, end - .05);
    g.gain.exponentialRampToValueAtTime(0.0001, end + .18);
    // breath noise
    const n = noiseSrc(t, dur + .25), bp = ctx.createBiquadFilter(), ng = ctx.createGain();
    bp.type = 'bandpass'; bp.frequency.value = f0 * 2; bp.Q.value = 2; ng.gain.value = .25;
    n.connect(bp); bp.connect(ng); ng.connect(g);
    o.connect(g); o2.connect(mix2); mix2.connect(g);
    g.connect(bus); g.connect(reverbIn); g.connect(delayIn);
    [o,o2,lfo].forEach(x=>{ x.start(t); x.stop(end + .25); });
  },
  vibes(t, m, dur){
    const f0 = hz(m), o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), g2 = ctx.createGain();
    o.frequency.value = f0; o2.frequency.value = f0 * 4; g2.gain.value = .12;
    const trem = ctx.createGain(), lfo = ctx.createOscillator(), ld = ctx.createGain();
    lfo.frequency.value = 5.5; ld.gain.value = .3; trem.gain.value = .7;
    lfo.connect(ld); ld.connect(trem.gain);
    const end = t + Math.max(dur, 1.8);
    env(g, t, .15, .004, end);
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(trem);
    trem.connect(bus); trem.connect(reverbIn); trem.connect(delayIn);
    [o,o2,lfo].forEach(x=>{ x.start(t); x.stop(end + .05); });
  },
  brush(t, v=1){ // brushed snare "swish"
    const n = noiseSrc(t, .4), f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = 'bandpass'; f.frequency.value = 2600; f.Q.value = .5;
    env(g, t, .13*v, .025, t + .32);
    n.connect(f); f.connect(g); g.connect(bus); g.connect(reverbIn);
  },
  rim(t, v=1){ // rim click
    const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
    o.type = 'triangle'; o.frequency.value = 1750; f.type = 'highpass'; f.frequency.value = 900;
    env(g, t, .12*v, .001, t + .035);
    o.connect(f); f.connect(g); g.connect(bus); g.connect(reverbIn);
    o.start(t); o.stop(t + .05);
  },
  bell(t, m, dur, song, v=1){
    // FM bell: "glass" is sparkly, "keys" is soft like an electric piano
    const glass = song.bell === 'glass';
    const c = ctx.createOscillator(), mod = ctx.createOscillator(), mg = ctx.createGain(), g = ctx.createGain();
    c.frequency.value = hz(m); mod.frequency.value = hz(m) * (glass ? 3.5 : 1);
    mg.gain.setValueAtTime(hz(m) * (glass ? 1.4 : .9), t);
    mg.gain.exponentialRampToValueAtTime(1, t + (glass ? .9 : .5));
    const end = t + Math.max(dur, glass ? 1.2 : .9);
    env(g, t, (glass ? .13 : .16) * v, .004, end);
    mod.connect(mg); mg.connect(c.frequency); c.connect(g);
    g.connect(bus); g.connect(reverbIn); g.connect(delayIn);
    c.start(t); mod.start(t); c.stop(end + .05); mod.stop(end + .05);
  }
};

/* ---------- Part 3: SEQUENCER ---------- */
let song = null, stepDur = 0, nextTime = 0, step = 0, timer = null;

function playStep(s, t){
  const bar = Math.floor(s / 16), st = s % 16;
  const ci = bar % song.chords.length, chord = song.chords[ci];
  const len = song.sectionBars || 8;            // bars per section
  const section = Math.floor(bar / len) % 4;   // 0 intro, 1 groove, 2 groove + melody, 3 softer part
  const inBar8 = bar % len, half = len / 2;
  const sw = (st % 2) ? stepDur * song.swing : 0;
  const tt = t + sw;
  const d = song.drums, brush = song.kit === 'brush';

  if (st === 0) Inst.pad(t, chord, stepDur * 16, song);

  // accompaniment (guitar / Rhodes) plays the whole song
  const c = song.comp;
  if (c){
    if (c.type === 'strum' && c.steps.includes(st)) Inst.strum(tt, chord, st === 0 ? .15 : .11);
    if (c.type === 'rhodes' && c.steps.includes(st)) chord.forEach(m=>Inst.bell(tt, m, stepDur * 3, song, .38));
    if (c.type === 'arp' && st % 2 === 0){
      const order = [0,1,2,3,2,1,3,2];
      Inst.pluck(tt, chord[order[(st/2) % 8]] + 12, .15);
    }
  }

  const drumsOn = section === 1 || section === 2;
  const hatsOn = drumsOn || (section === 0 && inBar8 >= half) || section === 3;
  const bassOn = drumsOn || (brush && section === 3);
  if (drumsOn){
    if (d.kick.includes(st)) Inst.kick(tt, brush ? .42 : 1);
    if (d.snare.includes(st)) brush ? Inst.brush(tt) : Inst.snare(tt);
    if (d.ghost?.includes(st)) Inst.snare(tt, .3);
    if (d.open?.includes(st)) Inst.hat(tt, 1, true);
    if (d.rim?.includes(st)) Inst.rim(tt);
  }
  if (bassOn){
    const root = song.bass[ci % song.bass.length];
    song.bassSteps.forEach(([bs, off])=>{ if (bs === st){
      if (song.bassInst === 'upright') Inst.upright(tt, root + off, stepDur * 4);
      else Inst.bass(tt, root + off, stepDur * 2.5);
    }});
  }
  if (hatsOn){
    if (d.hat.includes(st)) Inst.hat(tt, (section === 3 ? .6 : 1) * (brush ? .45 : 1));
    if (d.shaker?.includes(st)) Inst.hat(tt, brush ? .22 : .3);
    if (brush && section !== 1 && section !== 2 && d.rim?.includes(st)) Inst.rim(tt, .6);
  }
  // snare roll into the drop (electronic songs only)
  if (!brush && (section === 0 || section === 3) && inBar8 === len - 1 && st >= 8) Inst.snare(tt, .25 + (st-8)*.08);

  const melodyOn = section === 2 || section === 3 || (section === 0 && inBar8 >= half);
  if (melodyOn){
    song.melody[bar % song.melody.length].forEach(([ms, m, l])=>{ if (ms === st){
      if (song.lead === 'flute') Inst.flute(tt, m, l * stepDur);
      else if (song.lead === 'vibes') Inst.vibes(tt, m, l * stepDur);
      else Inst.bell(tt, m, l * stepDur, song);
    }});
  }
  if (song.arp && drumsOn && st % 2 === 0){
    Inst.bell(tt, chord[(st/2) % chord.length] + 12, stepDur, song, .45);
  }
  if (song.crackle && Math.random() < .35) Inst.crackle(t + Math.random()*stepDur);
}

function schedule(){
  while (nextTime < ctx.currentTime + .15){
    playStep(step, nextTime);
    nextTime += stepDur; step++;
  }
}
function startSong(id){
  stopSong();
  song = SONGS[id];
  stepDur = 60 / song.bpm / 4;
  delay.delayTime.value = stepDur * song.delaySteps;
  step = 0; nextTime = ctx.currentTime + .08;
  bus.gain.cancelScheduledValues(ctx.currentTime);
  bus.gain.setValueAtTime(1, ctx.currentTime);
  timer = setInterval(schedule, 25); schedule();
}
function stopSong(){
  clearInterval(timer); timer = null;
  if (bus){ const n = ctx.currentTime; bus.gain.cancelScheduledValues(n); bus.gain.setValueAtTime(bus.gain.value, n); bus.gain.linearRampToValueAtTime(0, n + .08); }
}

/* ---------- Part 4: PLAYER ---------- */
const $ = id => document.getElementById(id);
const player = $('player'), playBtn = $('playBtn'), titleEl = $('trackTitle'), artistEl = $('trackArtist');
const vol = $('volume'), viz = $('viz'), vctx = viz.getContext('2d'), list = $('playlist');
const audio = new Audio(); audio.preload = 'none';
let index = 0, playing = false, level = 0;

function setVolume(v){
  audio.volume = v;
  if (master) master.gain.value = v * .9;
  try { localStorage.setItem('sf-volume', v); } catch(e){}
}
function showTrack(){
  const tr = PLAYLIST[index];
  titleEl.textContent = tr.title; artistEl.textContent = tr.artist || '';
  titleEl.parentElement.classList.toggle('long', tr.title.length > 18);
  [...list.children].forEach((li,i)=>li.setAttribute('aria-current', i === index));
}
function play(){
  const tr = PLAYLIST[index];
  stopSong(); audio.pause();
  if (tr.generator){
    initAudio(); setVolume(+vol.value);
    ctx.resume(); startSong(tr.generator);
  } else {
    if (ctx) ctx.suspend();
    audio.src = tr.src; audio.play().catch(()=>{ artistEl.textContent = "couldn't load this file"; });
  }
  playing = true; render();
}
function pause(){
  playing = false;
  if (PLAYLIST[index].generator){ stopSong(); setTimeout(()=>{ if(!playing && ctx) ctx.suspend(); }, 150); }
  else audio.pause();
  render();
}
function go(dir){ index = (index + dir + PLAYLIST.length) % PLAYLIST.length; showTrack(); if (playing) play(); }
function render(){
  player.classList.toggle('playing', playing);
  playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  playBtn.innerHTML = playing
    ? '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1.5"/><rect x="14" y="5" width="4" height="14" rx="1.5"/></svg>'
    : '<svg viewBox="0 0 24 24"><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5z"/></svg>';
}
audio.addEventListener('ended', ()=>go(1));

// playlist menu
PLAYLIST.forEach((tr,i)=>{
  const li = document.createElement('li');
  const b = document.createElement('button'); b.type = 'button';
  b.innerHTML = `<span></span><small></small>`;
  b.firstChild.textContent = tr.title; b.lastChild.textContent = tr.artist || '';
  b.addEventListener('click', ()=>{ index = i; showTrack(); play(); list.hidden = true; });
  li.appendChild(b); list.appendChild(li);
});

playBtn.addEventListener('click', ()=> playing ? pause() : play());
$('prevBtn').addEventListener('click', ()=>go(-1));
$('nextBtn').addEventListener('click', ()=>go(1));
$('listBtn').addEventListener('click', e=>{ e.stopPropagation(); list.hidden = !list.hidden; });
document.addEventListener('click', e=>{ if (!list.hidden && !list.contains(e.target)) list.hidden = true; });
$('cdBtn').addEventListener('click', ()=>{
  player.classList.toggle('mini');
  $('cdBtn').setAttribute('aria-expanded', !player.classList.contains('mini'));
});
vol.addEventListener('input', ()=>setVolume(+vol.value));
try { const v = localStorage.getItem('sf-volume'); if (v !== null) vol.value = v; } catch(e){}
setVolume(+vol.value);
showTrack(); render();

// visualizer bars + the "beat level" the background waves dance to
const bins = new Uint8Array(32);
function drawViz(t){
  const W = viz.width, H = viz.height, n = 7, bw = W / n;
  vctx.clearRect(0,0,W,H);
  let lv = 0;
  if (playing && PLAYLIST[index].generator && analyser){
    analyser.getByteFrequencyData(bins);
    lv = (bins[1] + bins[2] + bins[3]) / 765;
  } else if (playing){
    lv = .45 + .35 * Math.max(0, Math.sin(t/180));   // MP3s: a gentle fake pulse
  }
  level += (lv - level) * .2;
  window.MUSIC_LEVEL = WAVES_DANCE ? level : 0;
  vctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--rose');
  for (let i = 0; i < n; i++){
    let v = playing ? (analyser && PLAYLIST[index].generator ? bins[i*3+1]/255 : .3 + .5*Math.abs(Math.sin(t/220 + i))) : .12;
    const h = Math.max(3, v * H);
    vctx.beginPath();
    vctx.roundRect ? vctx.roundRect(i*bw + 1.5, H - h, bw - 3, h, 2) : vctx.rect(i*bw + 1.5, H - h, bw - 3, h);
    vctx.fill();
  }
  requestAnimationFrame(drawViz);
}
requestAnimationFrame(drawViz);

// for testing / other scripts
window.SydneyFM = { SONGS, Inst, play, pause, get analyser(){ return analyser; } };
})();
