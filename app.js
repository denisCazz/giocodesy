(() => {
  const CDN = "https://cdn.brawlify.com/brawlers";
  const img = (id, kind = "borders") => `${CDN}/${kind}/${id}.png`;
  const G = window.DesyGame;
  const STORAGE_KEY = "desy-stars-goals-v3";
  const MUSIC_KEY = "desy-stars-music-v3";
  const EGGS_KEY = "desy-stars-eggs-v3";

  const BRAWLERS = Object.fromEntries(
    G.CHARACTERS.map((c) => [
      c.key,
      {
        id: G.CHAR_IDS[c.key],
        name: c.name,
        rarity: c.rarity,
        quote: c.quote,
        silent: c.key === "spike",
      },
    ])
  );

  const HERO_KEYS = ["piper", "shelly", "spike", "crow", "leon"];
  const RAIL_KEYS = G.CHARACTERS.map((c) => c.key);

  const PANIC_STEPS = [
    {
      emoji: "🛑",
      title: "Fermati qui",
      body: "Desy, un momento. Se il luogo intorno a te è sicuro, senti i piedi a terra. Questa ondata può passare, un passo alla volta.",
      hint: "Se non sei al sicuro o i sintomi sono nuovi, apri “Ho bisogno di aiuto adesso”.",
      buddy: "shelly",
      line: "Shelly resta con te.",
    },
    {
      emoji: "👀",
      title: "Ancorati",
      body: "Nomina piano: 5 cose che vedi, 4 che tocchi, 3 che senti, 2 che odori, 1 che gusti.",
      hint: "Non serve farlo perfetto.",
      grounding: true,
      buddy: "leon",
      line: "Leon: eccoti, qui.",
    },
    {
      emoji: "🌬️",
      title: "Respira",
      body: "Inspira dolcemente 4 secondi. Espira 6 secondi. Niente apnea. Prova qualche ciclo.",
      hint: "Se ti gira la testa, torna al tuo ritmo.",
      breathe: true,
      buddy: "piper",
      line: "Piper: piano, preciso.",
    },
    {
      emoji: "💬",
      title: "Parole soft",
      body: "Puoi dirti: «Il mio corpo è in allarme. Posso fare un passo alla volta e chiedere aiuto se serve.»",
      hint: "Una frase basta.",
      buddy: "poco",
      line: "Poco: piano piano.",
    },
    {
      emoji: "🧊",
      title: "Rilascia",
      body: "Stringi i pugni 5 secondi, poi lascia andare. Spalle su, spalle giù. Mascella morbida.",
      hint: "L’energia può uscire senza farti male.",
      buddy: "primo",
      line: "El Primo: e poi riposo.",
    },
    {
      emoji: "⭐",
      title: "Hai finito",
      body: "Hai completato la guida. Bevi un sorso se ti va. Se i sintomi non diminuiscono, chiama qualcuno o il 112.",
      hint: "Questo è supporto, non sostituisce un professionista.",
      buddy: "spike",
      line: "Spike: …",
    },
  ];

  const TREE_STAGES = [
    { emoji: "🌱", title: "Seme", text: "Il viaggio inizia con un piccolo passo." },
    { emoji: "🌿", title: "Germoglio", text: "Hai iniziato a crescere." },
    { emoji: "🪴", title: "Piantina", text: "Le radici si stanno rafforzando." },
    { emoji: "🌳", title: "Alberello", text: "Si vede il progresso, anche nei giorni difficili." },
    { emoji: "🌸", title: "In fiore", text: "La costanza sta fiorendo." },
    { emoji: "🏞️", title: "Bosco Desy", text: "Un percorso intero: sei arrivata lontano." },
  ];

  const els = {
    views: {
      home: document.getElementById("view-home"),
      panic: document.getElementById("view-panic"),
      goals: document.getElementById("view-goals"),
      daily: document.getElementById("view-daily"),
      shop: document.getElementById("view-shop"),
      achievements: document.getElementById("view-achievements"),
      collection: document.getElementById("view-collection"),
      stats: document.getElementById("view-stats"),
      tree: document.getElementById("view-tree"),
      timeline: document.getElementById("view-timeline"),
    },
    heroStage: document.getElementById("heroStage"),
    brawlerRail: document.getElementById("brawlerRail"),
    panicStep: document.getElementById("panicStep"),
    panicCounter: document.getElementById("panicCounter"),
    panicProgress: document.getElementById("panicProgress"),
    panicProgressTrack: document.getElementById("panicProgressTrack"),
    panicPrev: document.getElementById("panicPrev"),
    panicNext: document.getElementById("panicNext"),
    panicBuddyImg: document.getElementById("panicBuddyImg"),
    panicBuddyLine: document.getElementById("panicBuddyLine"),
    panicTimer: document.getElementById("panicTimer"),
    goalForm: document.getElementById("goalForm"),
    goalInput: document.getElementById("goalInput"),
    goalList: document.getElementById("goalList"),
    emptyGoals: document.getElementById("emptyGoals"),
    starCount: document.getElementById("starCount"),
    doneCount: document.getElementById("doneCount"),
    openCount: document.getElementById("openCount"),
    rewardOverlay: document.getElementById("rewardOverlay"),
    rewardTitle: document.getElementById("rewardTitle"),
    rewardText: document.getElementById("rewardText"),
    rewardPrize: document.getElementById("rewardPrize"),
    rewardClose: document.getElementById("rewardClose"),
    rewardImg: document.getElementById("rewardImg"),
    rewardRarity: document.getElementById("rewardRarity"),
    calmOverlay: document.getElementById("calmOverlay"),
    calmClose: document.getElementById("calmClose"),
    starsLayer: document.getElementById("starsLayer"),
    toast: document.getElementById("toast"),
    brawlFlash: document.getElementById("brawlFlash"),
    brawlFlashImg: document.getElementById("brawlFlashImg"),
    brawlFlashText: document.getElementById("brawlFlashText"),
    starHit: document.getElementById("starHit"),
    brandTitle: document.getElementById("brandTitle"),
    starrOverlay: document.getElementById("starrOverlay"),
    starrDrop: document.getElementById("starrDrop"),
    starrOpen: document.getElementById("starrOpen"),
    starrResult: document.getElementById("starrResult"),
    starrResultImg: document.getElementById("starrResultImg"),
    starrResultRarity: document.getElementById("starrResultRarity"),
    starrResultTitle: document.getElementById("starrResultTitle"),
    starrResultText: document.getElementById("starrResultText"),
    starrClose: document.getElementById("starrClose"),
    musicFab: document.getElementById("musicFab"),
    musicLabel: document.getElementById("musicLabel"),
    dailyBanner: document.getElementById("dailyBanner"),
    dailyBannerTitle: document.getElementById("dailyBannerTitle"),
    dailyBannerSub: document.getElementById("dailyBannerSub"),
    dailyStreakPill: document.getElementById("dailyStreakPill"),
    dailyGrid: document.getElementById("dailyGrid"),
    dailyNote: document.getElementById("dailyNote"),
    mysteryBox: document.getElementById("mysteryBox"),
    levelLabel: document.getElementById("levelLabel"),
    xpLabel: document.getElementById("xpLabel"),
    xpFill: document.getElementById("xpFill"),
    xpTrack: document.getElementById("xpTrack"),
    streakValue: document.getElementById("streakValue"),
    coinValue: document.getElementById("coinValue"),
    shopGrid: document.getElementById("shopGrid"),
    shopCoins: document.getElementById("shopCoins"),
    achGrid: document.getElementById("achGrid"),
    achCount: document.getElementById("achCount"),
    collectGrid: document.getElementById("collectGrid"),
    collectCount: document.getElementById("collectCount"),
    collectFill: document.getElementById("collectFill"),
    statsGrid: document.getElementById("statsGrid"),
    statBars: document.getElementById("statBars"),
    treeStage: document.getElementById("treeStage"),
    treeCaption: document.getElementById("treeCaption"),
    timelineList: document.getElementById("timelineList"),
    levelOverlay: document.getElementById("levelOverlay"),
    levelText: document.getElementById("levelText"),
    levelPrize: document.getElementById("levelPrize"),
    levelClose: document.getElementById("levelClose"),
    lootOverlay: document.getElementById("lootOverlay"),
    lootBoxAnim: document.getElementById("lootBoxAnim"),
    lootCard: document.getElementById("lootCard"),
    lootIcon: document.getElementById("lootIcon"),
    lootTitle: document.getElementById("lootTitle"),
    lootDetail: document.getElementById("lootDetail"),
    lootClose: document.getElementById("lootClose"),
    achOverlay: document.getElementById("achOverlay"),
    achPopIcon: document.getElementById("achPopIcon"),
    achPopTitle: document.getElementById("achPopTitle"),
    achPopDesc: document.getElementById("achPopDesc"),
    achPopClose: document.getElementById("achPopClose"),
    sadStreak: document.getElementById("sadStreak"),
    coinChip: document.getElementById("coinChip"),
    welcomeGate: document.getElementById("welcomeGate"),
    welcomeStart: document.getElementById("welcomeStart"),
    welcomeMusic: document.getElementById("welcomeMusic"),
  };

  let panicIndex = 0;
  let goals = loadGoals();
  let eggs = loadEggs();
  let starClicks = 0;
  let brandClicks = 0;
  let typedBuffer = "";
  let toastTimer = null;
  let panicTimerId = null;
  let panicSeconds = 0;
  let timeTicker = null;
  const clickMap = {};
  const pendingAchievements = [];

  function loadGoals() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return list.map((g) => ({
        progress: g.progress || (g.done ? g.target || 1 : 0),
        target: g.target || 1,
        rewarded: !!g.rewarded,
        ...g,
      }));
    } catch {
      return [];
    }
  }

  function saveGoals() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }

  function loadEggs() {
    try {
      return JSON.parse(localStorage.getItem(EGGS_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveEggs() {
    localStorage.setItem(EGGS_KEY, JSON.stringify(eggs));
  }

  function vibrate(pattern = 12) {
    try {
      if (navigator.vibrate) navigator.vibrate(pattern);
    } catch {
      /* ignore */
    }
  }

  function showToast(message, ms = 2400) {
    els.toast.hidden = false;
    els.toast.textContent = message;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.toast.classList.remove("show");
      els.toast.hidden = true;
    }, ms);
  }

  function burstConfetti(colors) {
    const n = document.body.classList.contains("calm-mode") ? 8 : 36;
    for (let i = 0; i < n; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.top = `${-10 - Math.random() * 20}vh`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDuration = `${1.2 + Math.random() * 1.4}s`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 3000);
    }
  }

  function spawnSparkles() {
    if (document.body.classList.contains("calm-mode")) return;
    for (let i = 0; i < 3; i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      s.style.left = `${10 + Math.random() * 80}%`;
      s.style.top = `${10 + Math.random() * 60}%`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }
  }

  function spawnSkyStars() {
    for (let i = 0; i < 16; i++) {
      const s = document.createElement("span");
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${Math.random() * 70}%`;
      s.style.animationDelay = `${Math.random() * 2}s`;
      els.starsLayer.appendChild(s);
    }
  }

  function refreshHud() {
    const p = G.progress();
    els.levelLabel.textContent = `Livello ${p.level}`;
    els.xpLabel.textContent = `${p.xp} / ${p.need} XP`;
    els.xpFill.style.width = `${p.pct}%`;
    els.xpTrack.setAttribute("aria-valuenow", String(p.pct));
    els.streakValue.textContent = String(p.streak);
    els.coinValue.textContent = String(p.coins);
    els.dailyStreakPill.textContent = `🔥 ${p.streak}`;
    if (G.canClaimDaily()) {
      els.dailyBanner.classList.add("pulse");
      els.dailyBanner.classList.remove("claimed");
      els.dailyBannerTitle.textContent = "Premio Quotidiano";
      els.dailyBannerSub.textContent = "Scatola misteriosa pronta!";
    } else {
      els.dailyBanner.classList.remove("pulse");
      els.dailyBanner.classList.add("claimed");
      els.dailyBannerTitle.textContent = "Premio ritirato";
      els.dailyBannerSub.textContent = "Torna domani per un nuovo drop";
    }
  }

  function queueAchievements(list) {
    (list || []).filter(Boolean).forEach((a) => pendingAchievements.push(a));
    maybeShowAchievement();
  }

  function maybeShowAchievement() {
    if (!els.achOverlay.hidden || !pendingAchievements.length) return;
    if (![els.rewardOverlay, els.levelOverlay, els.lootOverlay, els.calmOverlay].every((o) => o.hidden)) return;
    const a = pendingAchievements.shift();
    els.achPopIcon.textContent = a.icon;
    els.achPopTitle.textContent = a.title;
    els.achPopDesc.textContent = a.desc;
    els.achOverlay.hidden = false;
    vibrate([20, 40, 20]);
    if (window.DesyMusic) DesyMusic.pop();
  }

  function handleXpResult(result) {
    if (!result) return;
    refreshHud();
    if (result.levelsGained?.length) {
      const lvl = result.levelsGained[result.levelsGained.length - 1];
      showLevelUp(lvl);
    }
    queueAchievements(result.achievements);
  }

  function showLevelUp(level) {
    els.levelPrize.textContent = `Livello ${level}`;
    els.levelText.textContent = `Hai sbloccato il livello ${level}! +monete bonus`;
    els.levelOverlay.hidden = false;
    burstConfetti(["#ffd54a", "#ff4fa3", "#fff", "#7cfc00"]);
    vibrate([30, 50, 30, 50, 60]);
    if (window.DesyMusic) DesyMusic.fanfare();
  }

  async function sfx(name) {
    if (!window.DesyMusic) return;
    if (name === "click") await DesyMusic.click();
    else if (name === "pop") await DesyMusic.pop();
    else if (name === "fanfare") await DesyMusic.fanfare();
  }

  async function toggleMusic() {
    if (!window.DesyMusic) return showToast("Audio non supportato");
    const on = await DesyMusic.toggle();
    localStorage.setItem(MUSIC_KEY, on ? "1" : "0");
    els.musicFab.classList.toggle("playing", on);
    els.musicFab.setAttribute("aria-pressed", on ? "true" : "false");
    els.musicLabel.textContent = on ? "ON" : "PLAY";
    showToast(on ? "Lobby theme ON 🎵" : "Musica in pausa");
  }

  function flashBrawl(brawlerKey, text = "BRAWL!") {
    const b = BRAWLERS[brawlerKey] || BRAWLERS.shelly;
    els.brawlFlashImg.src = img(b.id);
    els.brawlFlashText.textContent = text;
    els.brawlFlash.hidden = false;
    els.brawlFlash.classList.add("show");
    setTimeout(() => {
      els.brawlFlash.classList.remove("show");
      els.brawlFlash.hidden = true;
    }, 1100);
  }

  function renderHeroStage() {
    els.heroStage.innerHTML = HERO_KEYS.map((key, i) => {
      const b = BRAWLERS[key];
      const float = ["float-a", "float-b", "float-c", "float-a", "float-c"][i];
      return `<button type="button" class="brawler-portrait ${float} bounce-tap" data-brawler="${key}" aria-label="${b.name}">
        <img src="${img(b.id)}" alt="${b.name}" width="140" height="140" loading="eager" />
        <span class="brawler-name">${b.name}</span>
      </button>`;
    }).join("");
  }

  function renderRail() {
    els.brawlerRail.innerHTML = RAIL_KEYS.map((key) => {
      const b = BRAWLERS[key];
      const owned = G.state.characters[key]?.unlocked;
      return `<button type="button" class="rail-chip bounce-tap ${owned ? "" : "locked"}" data-brawler="${key}" title="${b.quote}">
        <img src="${img(b.id)}" alt="${b.name}" width="72" height="72" loading="lazy" />
        <span>${owned ? b.name : "???"}</span>
      </button>`;
    }).join("");
  }

  function onBrawlerClick(key) {
    const b = BRAWLERS[key];
    if (!b) return;
    if (!G.state.characters[key]?.unlocked) {
      showToast("Personaggio ancora bloccato 🔒");
      return;
    }
    clickMap[key] = (clickMap[key] || 0) + 1;
    if (b.silent) {
      showToast("Spike: «…» 🌵");
      if (clickMap[key] === 5) openStarrDrop("spike", "SPIKE TI REGALA UN FIORE!", "LEGENDARY");
      return;
    }
    if (key === "crow" && clickMap[key] % 3 === 0) {
      showToast("Crow: scherzo! +1 antidoto rosa");
      burstConfetti(["#2d2d2d", "#7cfc00", "#ff4fa3"]);
      return;
    }
    if (key === "leon" && clickMap[key] === 3) {
      document.body.classList.add("leon-invisible");
      showToast("Leon: invisibilità!");
      setTimeout(() => document.body.classList.remove("leon-invisible"), 3000);
      return;
    }
    showToast(`${b.name}: «${b.quote}»`);
  }

  function enterCalmMode() {
    document.body.classList.add("calm-mode");
    if (window.DesyMusic && DesyMusic.isPlaying()) {
      DesyMusic.stop();
      els.musicFab.classList.remove("playing");
      els.musicLabel.textContent = "PLAY";
    }
    panicSeconds = 0;
    clearInterval(panicTimerId);
    panicTimerId = setInterval(() => {
      panicSeconds += 1;
      const m = String(Math.floor(panicSeconds / 60)).padStart(2, "0");
      const s = String(panicSeconds % 60).padStart(2, "0");
      els.panicTimer.textContent = `${m}:${s}`;
    }, 1000);
    vibrate(10);
  }

  function exitCalmMode() {
    document.body.classList.add("calm-fadeout");
    setTimeout(() => {
      document.body.classList.remove("calm-mode", "calm-fadeout");
    }, 700);
    clearInterval(panicTimerId);
    panicTimerId = null;
  }

  function showView(name) {
    Object.entries(els.views).forEach(([key, node]) => {
      node.classList.toggle("active", key === name);
    });
    if (name === "panic") {
      panicIndex = 0;
      renderPanicStep();
      enterCalmMode();
    } else if (document.body.classList.contains("calm-mode")) {
      exitCalmMode();
    }
    if (name === "home" && localStorage.getItem(MUSIC_KEY) === "1" && window.DesyMusic && !DesyMusic.isPlaying()) {
      DesyMusic.play().then((ok) => {
        if (ok) {
          els.musicFab.classList.add("playing");
          els.musicLabel.textContent = "ON";
        }
      });
    }
    if (name === "goals") renderGoals();
    if (name === "daily") renderDaily();
    if (name === "shop") renderShop();
    if (name === "achievements") renderAchievements();
    if (name === "collection") renderCollection();
    if (name === "stats") renderStats();
    if (name === "tree") renderTree();
    if (name === "timeline") renderTimeline();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPanicStep() {
    const step = PANIC_STEPS[panicIndex];
    const total = PANIC_STEPS.length;
    const buddy = BRAWLERS[step.buddy];
    els.panicCounter.textContent = `Passo ${panicIndex + 1} di ${total}`;
    els.panicProgress.style.width = `${((panicIndex + 1) / total) * 100}%`;
    els.panicProgressTrack.setAttribute("aria-valuenow", String(panicIndex + 1));
    els.panicPrev.hidden = panicIndex === 0;
    els.panicNext.textContent = panicIndex === total - 1 ? "Ho finito ⭐" : "Ok, prossimo →";
    els.panicBuddyImg.src = img(buddy.id);
    els.panicBuddyLine.textContent = step.line;
    vibrate(8);

    let extra = "";
    if (step.breathe) {
      extra = `<div class="breathe-guide"><div class="breathe-circle" aria-hidden="true">4 → 6</div>
        <p><strong>Inspira 4 · Espira 6</strong><br>Senza trattenere.</p></div>`;
    }
    if (step.grounding) {
      extra = `<div class="step-hint" style="margin-bottom:.75rem">5 vedi · 4 tocca · 3 senti · 2 odora · 1 gusta</div>`;
    }
    els.panicStep.innerHTML = `
      <div class="step-buddy"><img src="${img(buddy.id)}" alt="${buddy.name}" width="56" height="56" /><span class="step-emoji">${step.emoji}</span></div>
      <h3>${step.title}</h3><p>${step.body}</p>${extra}<div class="step-hint">${step.hint}</div>`;
  }

  function nextPanic() {
    if (panicIndex >= PANIC_STEPS.length - 1) {
      els.calmOverlay.hidden = false;
      const result = G.onPanicCompleted();
      handleXpResult(result.xp);
      queueAchievements(result.achievements);
      showToast("+40 XP · Guida calma");
      return;
    }
    panicIndex += 1;
    renderPanicStep();
  }

  function prevPanic() {
    if (panicIndex <= 0) return;
    panicIndex -= 1;
    renderPanicStep();
  }

  function uid() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderGoals() {
    const done = goals.filter((g) => g.done).length;
    const open = goals.length - done;
    const stars = goals.reduce((sum, g) => sum + (g.done ? g.stars || 1 : 0), 0);
    els.starCount.textContent = String(stars);
    els.doneCount.textContent = String(done);
    els.openCount.textContent = String(open);
    els.emptyGoals.classList.toggle("hidden", goals.length > 0);
    els.goalList.innerHTML = goals
      .map((g) => {
        const target = g.target || 1;
        const progress = Math.min(target, g.progress || (g.done ? target : 0));
        const pct = Math.round((progress / target) * 100);
        return `<li class="goal-item ${g.done ? "done" : ""} float-card" data-id="${g.id}">
          <button type="button" class="goal-check bounce-tap" data-action="progress" aria-label="Avanza">${g.done ? "✓" : "+"}</button>
          <div class="goal-main">
            <span class="goal-title">${escapeHtml(g.title)}</span>
            <div class="goal-progress-track"><div class="goal-progress-fill" style="width:${pct}%"></div></div>
            <span class="goal-progress-label">${progress} / ${target} · ${pct}%</span>
          </div>
          <button type="button" class="goal-delete bounce-tap" data-action="delete" aria-label="Elimina">✕</button>
        </li>`;
      })
      .join("");
    // animate fills
    requestAnimationFrame(() => {
      els.goalList.querySelectorAll(".goal-progress-fill").forEach((el) => {
        const w = el.style.width;
        el.style.width = "0%";
        requestAnimationFrame(() => {
          el.style.width = w;
        });
      });
    });
  }

  function addGoal(title, target = 1) {
    goals.unshift({
      id: uid(),
      title: title.trim(),
      done: false,
      rewarded: false,
      progress: 0,
      target: Math.max(1, Number(target) || 1),
      stars: 1,
      createdAt: Date.now(),
    });
    saveGoals();
    renderGoals();
  }

  function progressGoal(id) {
    const goal = goals.find((g) => g.id === id);
    if (!goal || goal.done) return;
    goal.progress = Math.min(goal.target || 1, (goal.progress || 0) + 1);
    if (goal.progress >= (goal.target || 1)) {
      goal.done = true;
      goal.completedAt = Date.now();
      if (!goal.rewarded) {
        goal.rewarded = true;
        const result = G.onGoalCompleted(goal.title);
        handleXpResult(result.xp);
        queueAchievements(result.achievements);
        showGoalReward(goal.title);
      }
    }
    saveGoals();
    renderGoals();
    refreshHud();
  }

  function deleteGoal(id) {
    goals = goals.filter((g) => g.id !== id);
    saveGoals();
    renderGoals();
  }

  function showGoalReward(title) {
    els.rewardTitle.textContent = "OBIETTIVO!";
    els.rewardText.textContent = title;
    els.rewardPrize.textContent = "+50 XP · +10 🪙";
    els.rewardRarity.textContent = "EPIC";
    els.rewardRarity.dataset.rarity = "EPIC";
    els.rewardImg.src = img(BRAWLERS.piper.id);
    els.rewardOverlay.hidden = false;
    if (window.DesyMusic) DesyMusic.fanfare();
    burstConfetti(["#ff4fa3", "#ffd54a", "#fff", "#7cfc00"]);
    vibrate([15, 30, 15]);
  }

  function renderDaily() {
    const st = G.state;
    const claimedToday = !G.canClaimDaily();
    const cycleDay = st.dailyCycleDay || 1;
    els.mysteryBox.disabled = claimedToday;
    els.mysteryBox.classList.toggle("opened", claimedToday);
    els.dailyNote.textContent = claimedToday
      ? "Già aperto oggi. Torna domani!"
      : "Tocca la scatola misteriosa…";
    const days = [1, 2, 3, 4, 5, 6, 7];
    els.dailyGrid.innerHTML = days
      .map((d) => {
        const done =
          !!st.weekComplete ||
          (st.claimedDays || []).includes(d) ||
          (!claimedToday && d < cycleDay);
        const isToday = !claimedToday && d === cycleDay;
        return `<div class="daily-cell ${done ? "done" : ""} ${isToday ? "today" : ""}">
          <span class="daily-day">Giorno ${d}</span>
          <span class="daily-emoji">❓</span>
          <span class="daily-cell-title">Mistero</span>
          ${done ? '<span class="daily-check">✓</span>' : ""}
          ${isToday ? '<span class="daily-now">OGGI</span>' : ""}
        </div>`;
      })
      .join("");
  }

  function openDailyBox() {
    if (!G.canClaimDaily()) {
      showToast("Già ritirato oggi!");
      return;
    }
    els.mysteryBox.classList.add("shake");
    sfx("pop");
    setTimeout(() => {
      els.mysteryBox.classList.remove("shake");
      const claimed = G.claimDaily();
      if (!claimed) return;
      refreshHud();
      playLootReveal(claimed.loot);
      renderDaily();
    }, 500);
  }

  function playLootReveal(loot) {
    els.lootOverlay.hidden = false;
    els.lootCard.hidden = true;
    els.lootBoxAnim.classList.remove("opened");
    els.lootBoxAnim.classList.add("opening");
    sfx("fanfare");
    vibrate([20, 40, 20, 40, 60]);
    burstConfetti(["#ffd54a", "#ff4fa3", "#a855f7", "#fff"]);
    setTimeout(() => {
      els.lootBoxAnim.classList.add("opened");
      els.lootIcon.textContent = loot.icon || "🎁";
      els.lootTitle.textContent = loot.title;
      els.lootDetail.textContent = loot.detail || "";
      els.lootCard.hidden = false;
      refreshHud();
    }, 900);
  }

  function renderShop() {
    els.shopCoins.textContent = String(G.state.coins);
    els.shopGrid.innerHTML = G.SHOP.map((item) => {
      const owned = !!G.state.owned[item.id];
      return `<article class="shop-card float-card">
        <div class="shop-icon">${item.icon}</div>
        <h3>${item.name}</h3>
        <p>${item.price} 🪙</p>
        <button type="button" class="bs-btn ${owned ? "bs-btn-ghost" : "bs-btn-pink"} compact bounce-tap" data-buy="${item.id}" ${owned ? "disabled" : ""}>
          ${owned ? "Posseduto" : "Compra"}
        </button>
      </article>`;
    }).join("");
  }

  function renderAchievements() {
    const unlocked = Object.keys(G.state.achievements).length;
    els.achCount.textContent = `${unlocked} / ${G.ACHIEVEMENTS.length} badge`;
    els.achGrid.innerHTML = G.ACHIEVEMENTS.map((a) => {
      const on = !!G.state.achievements[a.id];
      return `<article class="ach-card ${on ? "unlocked" : "locked"} float-card">
        <div class="ach-icon">${a.icon}</div>
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
        <span class="ach-state">${on ? "Sbloccato" : "Bloccato"}</span>
      </article>`;
    }).join("");
  }

  function renderCollection() {
    const have = G.unlockedCharacterCount();
    const total = G.CHARACTERS.length;
    els.collectCount.textContent = `${have} / ${total} personaggi`;
    els.collectFill.style.width = `${Math.round((have / total) * 100)}%`;
    els.collectGrid.innerHTML = G.CHARACTERS.map((c) => {
      const data = G.state.characters[c.key];
      const on = data?.unlocked;
      return `<article class="collect-card ${on ? "unlocked" : "locked"} float-card">
        <img src="${img(G.CHAR_IDS[c.key])}" alt="${c.name}" width="88" height="88" loading="lazy" />
        <h3>${on ? c.name : "???"}</h3>
        <p class="rarity-tag" data-rarity="${c.rarity}">${c.rarity}</p>
        <p>${on ? `Lv ${data.level} · «${c.quote}»` : "Da sbloccare"}</p>
      </article>`;
    }).join("");
  }

  function renderStats() {
    const st = G.state;
    const p = G.progress();
    const mins = Math.round(st.stats.timeSpentMs / 60000);
    const rows = [
      ["🔥 Serie attuale", st.streak],
      ["🏅 Best streak", st.bestStreak],
      ["✅ Obiettivi", st.stats.goalsCompleted],
      ["🌸 Momenti difficili", st.stats.panicCompleted],
      ["🎁 Premi aperti", st.stats.rewardsOpened],
      ["⭐ Livello", p.level],
      ["✨ XP totale", st.totalXp],
      ["🪙 Monete", st.coins],
      ["🏅 Badge", Object.keys(st.achievements).length],
      ["⏱️ Minuti nell’app", mins],
      ["📈 Completamento", `${G.completionPct()}%`],
    ];
    els.statsGrid.innerHTML = rows
      .map(
        ([k, v]) => `<div class="stat-card float-card"><span>${k}</span><strong>${v}</strong></div>`
      )
      .join("");

    const bars = [
      { label: "Obiettivi", pct: Math.min(100, st.stats.goalsCompleted * 4) },
      { label: "Badge", pct: Math.round((Object.keys(st.achievements).length / G.ACHIEVEMENTS.length) * 100) },
      { label: "Collezione", pct: Math.round((G.unlockedCharacterCount() / G.CHARACTERS.length) * 100) },
      { label: "Shop", pct: Math.round((Object.keys(st.owned).length / G.SHOP.length) * 100) },
    ];
    els.statBars.innerHTML = bars
      .map(
        (b) => `<div class="stat-bar-row"><span>${b.label}</span>
        <div class="xp-track"><div class="xp-fill anim-bar" style="width:${b.pct}%"></div></div>
        <strong>${b.pct}%</strong></div>`
      )
      .join("");
  }

  function renderTree() {
    const stage = Math.min(TREE_STAGES.length - 1, G.state.growthStage || 0);
    const info = TREE_STAGES[stage];
    els.treeStage.innerHTML = `<div class="tree-visual stage-${stage}">${info.emoji}</div><h3>${info.title}</h3>`;
    els.treeCaption.textContent = `${info.text} · Obiettivi completati: ${G.state.stats.goalsCompleted}`;
  }

  function renderTimeline() {
    const list = G.state.timeline || [];
    if (!list.length) {
      els.timelineList.innerHTML = `<li class="timeline-item">Ancora nessun traguardo… completene uno e apparirà qui ✨</li>`;
      return;
    }
    els.timelineList.innerHTML = list
      .map((t) => {
        const d = new Date(t.at);
        return `<li class="timeline-item float-card"><span class="tl-icon">${t.icon}</span><div><strong>${escapeHtml(t.text)}</strong><small>${d.toLocaleString("it-IT")}</small></div></li>`;
      })
      .join("");
  }

  function openStarrDrop(forcedKey, forcedTitle, forcedRarity) {
    els.starrOverlay.hidden = false;
    els.starrDrop.hidden = false;
    els.starrResult.hidden = true;
    els.starrDrop.dataset.forced = forcedKey || "";
    els.starrDrop.dataset.title = forcedTitle || "";
    els.starrDrop.dataset.rarity = forcedRarity || "";
  }

  function revealStarr() {
    const keys = RAIL_KEYS;
    const forced = els.starrDrop.dataset.forced;
    const key = forced && BRAWLERS[forced] ? forced : keys[Math.floor(Math.random() * keys.length)];
    const b = BRAWLERS[key];
    els.starrDrop.hidden = true;
    els.starrResult.hidden = false;
    els.starrResultImg.src = img(b.id);
    els.starrResultRarity.textContent = els.starrDrop.dataset.rarity || b.rarity.toUpperCase();
    els.starrResultTitle.textContent = els.starrDrop.dataset.title || `Hai trovato ${b.name}!`;
    els.starrResultText.textContent = b.silent ? "Spike non parla. Ma ti vuole bene." : `«${b.quote}»`;
    if (!G.state.characters[key]?.unlocked) {
      G.state.characters[key] = { unlocked: true, level: 1, skin: "default" };
      G.save();
    }
    burstConfetti(["#ff4fa3", "#ffd54a", "#a855f7", "#fff"]);
  }

  function handleSecretCode(char) {
    if (!/^[a-z0-9]$/i.test(char)) return;
    typedBuffer = (typedBuffer + char.toLowerCase()).slice(-12);
    if (typedBuffer.includes("brawl")) {
      typedBuffer = "";
      flashBrawl("shelly", "BRAWL!");
    }
    if (typedBuffer.includes("desy")) {
      typedBuffer = "";
      openStarrDrop("melodie", "DESY SBLOCCATA!", "MYTHIC");
    }
  }

  // Events
  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      sfx("click");
      showView(btn.getAttribute("data-go"));
    });
  });

  els.coinChip.addEventListener("click", () => showView("shop"));
  els.heroStage.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-brawler]");
    if (!btn) return;
    sfx("pop");
    onBrawlerClick(btn.getAttribute("data-brawler"));
  });
  els.brawlerRail.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-brawler]");
    if (!btn) return;
    sfx("pop");
    onBrawlerClick(btn.getAttribute("data-brawler"));
  });

  els.panicNext.addEventListener("click", () => {
    sfx("click");
    nextPanic();
  });
  els.panicPrev.addEventListener("click", () => {
    sfx("click");
    prevPanic();
  });

  els.goalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = els.goalInput.value.trim();
    if (!value) return;
    sfx("pop");
    addGoal(value, 1);
    els.goalInput.value = "";
  });

  document.querySelectorAll("[data-quick-goal]").forEach((button) => {
    button.addEventListener("click", () => {
      sfx("pop");
      addGoal(button.getAttribute("data-quick-goal"), Number(button.getAttribute("data-target") || 1));
      showToast("Obiettivo aggiunto 🌟");
    });
  });

  els.goalList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const item = btn.closest(".goal-item");
    if (!item) return;
    const id = item.getAttribute("data-id");
    if (btn.getAttribute("data-action") === "progress") {
      sfx("click");
      progressGoal(id);
    }
    if (btn.getAttribute("data-action") === "delete") {
      sfx("click");
      deleteGoal(id);
    }
  });

  els.shopGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-buy]");
    if (!btn) return;
    const res = G.buyShopItem(btn.getAttribute("data-buy"));
    if (!res.ok) {
      showToast(res.reason === "coins" ? "Monete insufficienti 🪙" : "Non disponibile");
      return;
    }
    sfx("fanfare");
    showToast(`Acquistato: ${res.item.name}`);
    refreshHud();
    renderShop();
  });

  els.mysteryBox.addEventListener("click", openDailyBox);
  els.rewardClose.addEventListener("click", () => {
    els.rewardOverlay.hidden = true;
    maybeShowAchievement();
  });
  els.levelClose.addEventListener("click", () => {
    els.levelOverlay.hidden = true;
    maybeShowAchievement();
  });
  els.lootClose.addEventListener("click", () => {
    els.lootOverlay.hidden = true;
    maybeShowAchievement();
  });
  els.achPopClose.addEventListener("click", () => {
    els.achOverlay.hidden = true;
    maybeShowAchievement();
  });
  els.calmClose.addEventListener("click", () => {
    els.calmOverlay.hidden = true;
    showView("home");
  });
  els.musicFab.addEventListener("click", toggleMusic);
  els.starrOpen.addEventListener("click", () => {
    sfx("fanfare");
    revealStarr();
  });
  els.starrClose.addEventListener("click", () => {
    els.starrOverlay.hidden = true;
  });

  els.starHit.addEventListener("click", () => {
    sfx("pop");
    starClicks += 1;
    if (starClicks >= 7) {
      starClicks = 0;
      openStarrDrop(null, null, null);
    }
  });
  els.brandTitle.addEventListener("click", () => {
    brandClicks += 1;
    if (brandClicks >= 5) {
      brandClicks = 0;
      flashBrawl("janet", "DESY ON STAGE!");
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      [els.rewardOverlay, els.levelOverlay, els.lootOverlay, els.achOverlay, els.starrOverlay, els.calmOverlay].forEach((o) => {
        o.hidden = true;
      });
      maybeShowAchievement();
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    handleSecretCode(e.key);
  });

  // boot — fresh first access
  G.applyTheme();
  G.onChange(refreshHud);
  renderHeroStage();
  renderRail();
  spawnSkyStars();
  renderGoals();
  refreshHud();

  function finishWelcome(withMusic) {
    eggs.welcome = true;
    eggs.onboarded = true;
    saveEggs();
    els.welcomeGate.hidden = true;
    const visit = G.registerVisit();
    refreshHud();
    handleXpResult(visit.openXp);
    handleXpResult(visit.xpGain);
    queueAchievements(visit.achievements);
    if (withMusic && window.DesyMusic) {
      DesyMusic.play().then((ok) => {
        if (!ok) return;
        localStorage.setItem(MUSIC_KEY, "1");
        els.musicFab.classList.add("playing");
        els.musicLabel.textContent = "ON";
      });
    }
    showToast("Benvenuta nell’arena, Desy 💗");
  }

  els.welcomeStart.addEventListener("click", () => {
    sfx("pop");
    finishWelcome(false);
  });
  els.welcomeMusic.addEventListener("click", () => finishWelcome(true));

  if (!eggs.onboarded) {
    // Hard reset feel: no leftover goals/progress keys from older versions
    goals = [];
    saveGoals();
    renderGoals();
    els.welcomeGate.hidden = false;
  } else {
    const visit = G.registerVisit();
    refreshHud();
    if (visit.streakBroken) {
      els.sadStreak.hidden = false;
      els.sadStreak.classList.add("show");
      setTimeout(() => {
        els.sadStreak.classList.remove("show");
        els.sadStreak.hidden = true;
      }, 2800);
    }
    handleXpResult(visit.xpGain);
    handleXpResult(visit.openXp);
    queueAchievements(visit.achievements);
    if (visit.streakMilestone) showToast(`🔥 Serie ${visit.streakMilestone} giorni! Bonus XP`);
  }

  timeTicker = setInterval(() => G.trackTime(15000), 15000);
  setInterval(spawnSparkles, 4000);
})();
