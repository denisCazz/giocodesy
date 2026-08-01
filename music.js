/* Desy Stars Lobby Theme — arcade loop in stile Brawl Stars (Web Audio) */
window.DesyMusic = (() => {
  let ctx = null;
  let master = null;
  let playing = false;
  let timer = null;
  let step = 0;
  const BPM = 132;
  const STEP_MS = (60 / BPM) * 1000 / 2; // eighth notes

  // Catchy lobby riff (C major / playful punches like BS menu energy)
  const MELODY = [
    523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, null,
    659.25, 783.99, 880.0, 987.77, 880.0, 783.99, 659.25, null,
    523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 466.16, 523.25,
    783.99, 698.46, 659.25, 587.33, 523.25, 587.33, 659.25, null,
  ];

  const BASS = [
    130.81, null, 130.81, null, 146.83, null, 164.81, null,
    174.61, null, 174.61, null, 164.81, null, 146.83, null,
    130.81, null, 196.0, null, 174.61, null, 164.81, null,
    146.83, null, 130.81, null, 116.54, null, 130.81, null,
  ];

  function ensure() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.22;
    master.connect(ctx.destination);
  }

  function beep(freq, dur, type, gainVal, when) {
    if (!freq) return;
    const t = when ?? ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gainVal, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  function noiseHit(dur, gainVal, when) {
    const t = when ?? ctx.currentTime;
    const len = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const g = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 1200;
    g.gain.setValueAtTime(gainVal, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(master);
    src.start(t);
    src.stop(t + dur);
  }

  function tick() {
    if (!playing || !ctx) return;
    const t = ctx.currentTime;
    const i = step % MELODY.length;

    // kick on 0,4,8...
    if (i % 4 === 0) beep(90, 0.12, "sine", 0.45, t);
    // snare-ish
    if (i % 8 === 4) noiseHit(0.08, 0.18, t);
    // hi-hat
    if (i % 2 === 0) noiseHit(0.03, 0.06, t);

    beep(BASS[i], 0.18, "triangle", 0.28, t);
    beep(MELODY[i], 0.16, "square", 0.12, t);
    // sparkle harmony
    if (MELODY[i]) beep(MELODY[i] * 2, 0.1, "sine", 0.05, t);

    step += 1;
    timer = setTimeout(tick, STEP_MS);
  }

  async function play() {
    ensure();
    if (ctx.state === "suspended") await ctx.resume();
    if (playing) return;
    playing = true;
    step = 0;
    tick();
  }

  function stop() {
    playing = false;
    clearTimeout(timer);
    timer = null;
  }

  function toggle() {
    if (playing) {
      stop();
      return false;
    }
    play();
    return true;
  }

  function isPlaying() {
    return playing;
  }

  // Short "reward jingle" fanfare
  function fanfare() {
    ensure();
    if (ctx.state === "suspended") ctx.resume();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      beep(f, 0.22, "square", 0.16, ctx.currentTime + i * 0.09);
      beep(f * 2, 0.18, "sine", 0.06, ctx.currentTime + i * 0.09);
    });
  }

  return { play, stop, toggle, isPlaying, fanfare };
})();
