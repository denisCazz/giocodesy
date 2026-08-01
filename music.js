/* Desy Stars audio — lobby loop + SFX (Web Audio, mobile-safe) */
window.DesyMusic = (() => {
  let ctx = null;
  let master = null;
  let sfxBus = null;
  let playing = false;
  let timer = null;
  let step = 0;
  let unlocked = false;

  const BPM = 128;
  const STEP_MS = ((60 / BPM) * 1000) / 2;

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
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;
    sfxBus = ctx.createGain();
    sfxBus.gain.value = 0.85;
    master.connect(ctx.destination);
    sfxBus.connect(ctx.destination);
    return ctx;
  }

  async function unlock() {
    ensure();
    if (!ctx) return false;
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch (_) {
        /* ignore */
      }
    }
    // Silent buffer kickstarts iOS audio
    try {
      const buffer = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(ctx.destination);
      src.start(0);
    } catch (_) {
      /* ignore */
    }
    unlocked = ctx.state === "running";
    return unlocked;
  }

  function tone(freq, dur, type, gainVal, when, bus) {
    if (!freq || !ctx) return;
    const t = when ?? ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    const peak = Math.max(0.001, gainVal);
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.015);
    g.gain.linearRampToValueAtTime(0.001, t + Math.max(0.04, dur));
    osc.connect(g);
    g.connect(bus || master);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  function noiseHit(dur, gainVal, when, bus) {
    if (!ctx) return;
    const t = when ?? ctx.currentTime;
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const g = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.7;
    const peak = Math.max(0.001, gainVal);
    g.gain.setValueAtTime(peak, t);
    g.gain.linearRampToValueAtTime(0.001, t + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(bus || master);
    src.start(t);
    src.stop(t + dur + 0.02);
  }

  function tick() {
    if (!playing || !ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const t = ctx.currentTime;
    const i = step % MELODY.length;

    if (i % 4 === 0) tone(95, 0.14, "sine", 0.7, t);
    if (i % 8 === 4) noiseHit(0.09, 0.35, t);
    if (i % 2 === 0) noiseHit(0.03, 0.12, t);

    tone(BASS[i], 0.2, "triangle", 0.5, t);
    tone(MELODY[i], 0.18, "square", 0.28, t);
    if (MELODY[i]) tone(MELODY[i] * 2, 0.12, "sine", 0.12, t);

    step += 1;
    timer = window.setTimeout(tick, STEP_MS);
  }

  async function play() {
    await unlock();
    if (!ctx) return false;
    if (playing) return true;
    playing = true;
    step = 0;
    tick();
    return true;
  }

  function stop() {
    playing = false;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  async function toggle() {
    if (playing) {
      stop();
      return false;
    }
    return play();
  }

  function isPlaying() {
    return playing;
  }

  async function fanfare() {
    await unlock();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((f, i) => {
      const when = ctx.currentTime + i * 0.08;
      tone(f, 0.28, "square", 0.45, when, sfxBus);
      tone(f * 2, 0.22, "sine", 0.2, when, sfxBus);
    });
    noiseHit(0.15, 0.3, ctx.currentTime + 0.35, sfxBus);
  }

  async function click() {
    await unlock();
    if (!ctx) return;
    tone(880, 0.06, "square", 0.35, ctx.currentTime, sfxBus);
    tone(1320, 0.05, "sine", 0.2, ctx.currentTime + 0.02, sfxBus);
  }

  async function pop() {
    await unlock();
    if (!ctx) return;
    tone(392, 0.1, "triangle", 0.4, ctx.currentTime, sfxBus);
    tone(587, 0.12, "square", 0.3, ctx.currentTime + 0.05, sfxBus);
  }

  async function reward() {
    await fanfare();
  }

  return { play, stop, toggle, isPlaying, fanfare, click, pop, reward, unlock };
})();
