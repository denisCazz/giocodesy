(() => {
  const CDN = "https://cdn.brawlify.com/brawlers";
  const img = (id, kind = "borders") => `${CDN}/${kind}/${id}.png`;

  const BRAWLERS = {
    shelly: { id: 16000000, name: "Shelly", rarity: "Starting", quote: "Time to shell out some pain!", color: "#9cf" },
    colt: { id: 16000001, name: "Colt", rarity: "Rare", quote: "I was born ready!", color: "#4da3ff" },
    spike: { id: 16000005, name: "Spike", rarity: "Legendary", quote: "…", color: "#7cfc00", silent: true },
    crow: { id: 16000012, name: "Crow", rarity: "Legendary", quote: "Watch your back…", color: "#2d2d2d" },
    leon: { id: 16000023, name: "Leon", rarity: "Legendary", quote: "Peek-a-boo!", color: "#57c100" },
    piper: { id: 16000015, name: "Piper", rarity: "Epic", quote: "Have a blast!", color: "#ff4fa3" },
    poco: { id: 16000013, name: "Poco", rarity: "Rare", quote: "Let's rock!", color: "#c77dff" },
    mortis: { id: 16000011, name: "Mortis", rarity: "Mythic", quote: "Bat to the bone!", color: "#8b1e3f" },
    primo: { id: 16000010, name: "El Primo", rarity: "Rare", quote: "El Primooo!", color: "#ff6b35" },
    tara: { id: 16000017, name: "Tara", rarity: "Mythic", quote: "Fate is sealed.", color: "#6b4cff" },
    sandy: { id: 16000028, name: "Sandy", rarity: "Legendary", quote: "Zzz… sweet dreams.", color: "#7ec8ff" },
    max: { id: 16000032, name: "Max", rarity: "Mythic", quote: "Gotta go FAST!", color: "#ffd54a" },
    belle: { id: 16000042, name: "Belle", rarity: "Epic", quote: "Smile for the camera!", color: "#ff9ed2" },
    janet: { id: 16000049, name: "Janet", rarity: "Mythic", quote: "Let's take it to the stage!", color: "#ff4fa3" },
    kit: { id: 16000068, name: "Kit", rarity: "Legendary", quote: "Meow-sic to my ears!", color: "#ffa07a" },
    melodie: { id: 16000070, name: "Melodie", rarity: "Legendary", quote: "Feel the beat!", color: "#ff2d87" },
    cordelius: { id: 16000062, name: "Cordelius", rarity: "Legendary", quote: "Into the mushroom kingdom…", color: "#5d3a9b" },
    surge: { id: 16000038, name: "Surge", rarity: "Legendary", quote: "Power UP!", color: "#4dffc3" },
  };

  const HERO_KEYS = ["piper", "shelly", "spike", "crow", "leon"];
  const RAIL_KEYS = Object.keys(BRAWLERS);

  const PRIZES = [
    { title: "STARR DROP!", prize: "+1 🎁 Starr Drop Rosa", text: "Hai aperto una ricompensa da arena!", rarity: "RARE", brawler: "shelly" },
    { title: "POWER POINTS!", prize: "+50 ⚡ Power Points", text: "Il tuo brawler è più forte!", rarity: "COMMON", brawler: "colt" },
    { title: "GEMME!", prize: "+10 💎 Gems", text: "Luccicano come Desy!", rarity: "EPIC", brawler: "tara" },
    { title: "MEGA BOX!", prize: "+1 📦 Mega Box", text: "Boom! Come ai vecchi tempi.", rarity: "MYTHIC", brawler: "primo" },
    { title: "PIN SPECIALE!", prize: "+1 📌 Pin Spike", text: "… (Spike approva in silenzio)", rarity: "LEGENDARY", brawler: "spike" },
    { title: "HYPERCHARGE!", prize: "+1 ⚡ Hypercharge", text: "Modalità campionessa attiva!", rarity: "LEGENDARY", brawler: "surge" },
    { title: "SKIN ROSA!", prize: "+1 🎀 Skin Pink Piper", text: "Outfit da diva dell'arena!", rarity: "EPIC", brawler: "piper" },
  ];

  const DAILY_REWARDS = [
    { day: 1, title: "Monete", prize: "+100 🪙 Coins", text: "Warm-up reward del giorno 1!", rarity: "COMMON", brawler: "shelly", emoji: "🪙" },
    { day: 2, title: "Power Points", prize: "+50 ⚡ PP", text: "Il tuo brawler sale di potenza!", rarity: "RARE", brawler: "colt", emoji: "⚡" },
    { day: 3, title: "Starr Drop", prize: "+1 🎁 Starr Drop", text: "Giorno 3: drop rosa speciale!", rarity: "EPIC", brawler: "piper", emoji: "🎁" },
    { day: 4, title: "Gemme", prize: "+20 💎 Gems", text: "Luccichio da campionessa!", rarity: "EPIC", brawler: "tara", emoji: "💎" },
    { day: 5, title: "Mega Box", prize: "+1 📦 Mega Box", text: "Nostalgia box day!", rarity: "MYTHIC", brawler: "primo", emoji: "📦" },
    { day: 6, title: "Pin Doubles", prize: "+2 📌 Pins", text: "Pin party con Spike & Crow!", rarity: "MYTHIC", brawler: "crow", emoji: "📌" },
    { day: 7, title: "JACKPOT!", prize: "+1 👑 Skin Legendary Rosa", text: "Giorno 7: jackpot Desy Stars!", rarity: "LEGENDARY", brawler: "melodie", emoji: "👑" },
  ];

  const DAILY_KEY = "desy-stars-daily-v1";
  const MUSIC_KEY = "desy-stars-music-v1";

  const PANIC_STEPS = [
    {
      emoji: "🛑",
      title: "Stop. Sei al sicuro.",
      body: "Desy, fermati. Non sei in Showdown: qui nessuno ti spara. Questo momento passerà. Sei al sicuro.",
      hint: "Come Shelly all'inizio: riparti dalle basi. Mano sul petto.",
      buddy: "shelly",
      line: "Shelly: «Ripartiamo insieme.»",
    },
    {
      emoji: "👀",
      title: "Ancorati qui (no bush!)",
      body: "Guarda intorno: 5 cose che vedi, 4 che tocchi, 3 che senti, 2 che odori, 1 che gusti. Niente imboschate… solo realtà.",
      hint: "Leon può sparire. Tu no: resta presente.",
      grounding: true,
      buddy: "leon",
      line: "Leon: «Peek-a-boo… eccoti!»",
    },
    {
      emoji: "🌬️",
      title: "Respira con Piper",
      body: "Segui il cerchio: inspira mentre cresce, trattieni, espira mentre rimpicciolisce. Almeno 4 cicli. Mira alla calma.",
      hint: "Come un colpo carico di Piper: lento, preciso, potente.",
      breathe: true,
      buddy: "piper",
      line: "Piper: «Have a blast… di aria.»",
    },
    {
      emoji: "💬",
      title: "Power-up mentale",
      body: "Di' forte: «È un attacco di panico. Il corpo è in allarme, ma non c'è pericolo reale. Passerà.»",
      hint: "Poco metterebbe la colonna sonora. Tu metti le parole.",
      buddy: "poco",
      line: "Poco: «Let's rock… piano piano.»",
    },
    {
      emoji: "🧊",
      title: "Rilascia (no Hypercharge)",
      body: "Stringi i pugni 5 secondi, poi rilascia. Spalle su, spalle giù. Mascella morbida. Energia fuori, non contro di te.",
      hint: "Anche El Primo dopo lo slam… rilassa.",
      buddy: "primo",
      line: "El Primo: «El Primooo… e poi riposo!»",
    },
    {
      emoji: "⭐",
      title: "Victory screen",
      body: "Hai finito la partita contro il panico. Bevi un sorso d'acqua. Sei più forte di un brawler mythic. Torna quando vuoi.",
      hint: "Se serve, replay dal passo 1. Sempre.",
      buddy: "spike",
      line: "Spike: «…» (ti fa un fiore)",
    },
  ];

  const STORAGE_KEY = "desy-stars-goals-v1";
  const EGG_KEY = "desy-stars-eggs-v1";

  const els = {
    views: {
      home: document.getElementById("view-home"),
      panic: document.getElementById("view-panic"),
      goals: document.getElementById("view-goals"),
      daily: document.getElementById("view-daily"),
    },
    heroStage: document.getElementById("heroStage"),
    brawlerRail: document.getElementById("brawlerRail"),
    panicStep: document.getElementById("panicStep"),
    panicCounter: document.getElementById("panicCounter"),
    panicProgress: document.getElementById("panicProgress"),
    panicPrev: document.getElementById("panicPrev"),
    panicNext: document.getElementById("panicNext"),
    panicBuddyImg: document.getElementById("panicBuddyImg"),
    panicBuddyLine: document.getElementById("panicBuddyLine"),
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
    dailyClaimBtn: document.getElementById("dailyClaimBtn"),
    dailyNote: document.getElementById("dailyNote"),
    dailyStreakCount: document.getElementById("dailyStreakCount"),
    dailyDayNum: document.getElementById("dailyDayNum"),
    dailyTotalClaims: document.getElementById("dailyTotalClaims"),
  };

  let panicIndex = 0;
  let goals = loadGoals();
  let eggs = loadEggs();
  let daily = loadDaily();
  let starClicks = 0;
  let brandClicks = 0;
  let typedBuffer = "";
  let toastTimer = null;
  const clickMap = {};

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function yesterdayKey() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function loadDaily() {
    try {
      const raw = localStorage.getItem(DAILY_KEY);
      if (!raw) return { lastClaim: null, streak: 0, cycleDay: 1, total: 0, claimedDays: [] };
      return JSON.parse(raw);
    } catch {
      return { lastClaim: null, streak: 0, cycleDay: 1, total: 0, claimedDays: [] };
    }
  }

  function saveDaily() {
    localStorage.setItem(DAILY_KEY, JSON.stringify(daily));
  }

  function syncDailyStreak() {
    const today = todayKey();
    if (daily.lastClaim === today) return;
    if (daily.weekComplete) {
      daily.claimedDays = [];
      daily.weekComplete = false;
      daily.cycleDay = 1;
    }
    if (daily.lastClaim && daily.lastClaim !== yesterdayKey()) {
      daily.streak = 0;
      daily.cycleDay = 1;
      daily.claimedDays = [];
      daily.weekComplete = false;
    }
    saveDaily();
  }

  function canClaimDaily() {
    return daily.lastClaim !== todayKey();
  }

  function currentDailyReward() {
    const idx = Math.max(0, Math.min(6, (daily.cycleDay || 1) - 1));
    return DAILY_REWARDS[idx];
  }

  function updateDailyBanner() {
    syncDailyStreak();
    const reward = currentDailyReward();
    els.dailyStreakPill.textContent = `🔥 ${daily.streak || 0}`;
    if (canClaimDaily()) {
      els.dailyBanner.classList.remove("claimed");
      els.dailyBannerTitle.textContent = "Premio Quotidiano";
      els.dailyBannerSub.textContent = `Giorno ${reward.day}: ${reward.title} pronto!`;
    } else {
      els.dailyBanner.classList.add("claimed");
      els.dailyBannerTitle.textContent = "Premio ritirato!";
      els.dailyBannerSub.textContent = "Torna domani per il prossimo drop 💫";
    }
  }

  function renderDaily() {
    syncDailyStreak();
    const today = todayKey();
    const claimedToday = daily.lastClaim === today;
    const cycleDay = daily.cycleDay || 1;

    els.dailyStreakCount.textContent = String(daily.streak || 0);
    els.dailyDayNum.textContent = String(
      claimedToday ? daily.lastClaimedDay || 1 : cycleDay
    );
    els.dailyTotalClaims.textContent = String(daily.total || 0);

    els.dailyGrid.innerHTML = DAILY_REWARDS.map((r) => {
      const done =
        (daily.claimedDays || []).includes(r.day) ||
        (!daily.weekComplete && r.day < cycleDay);
      const isToday = !claimedToday && r.day === cycleDay;
      return `
        <div class="daily-cell ${done ? "done" : ""} ${isToday ? "today" : ""}" data-day="${r.day}">
          <span class="daily-day">Giorno ${r.day}</span>
          <span class="daily-emoji">${r.emoji}</span>
          <span class="daily-cell-title">${r.title}</span>
          ${done ? '<span class="daily-check">✓</span>' : ""}
          ${isToday ? '<span class="daily-now">OGGI</span>' : ""}
        </div>`;
    }).join("");

    if (claimedToday) {
      els.dailyClaimBtn.disabled = true;
      els.dailyClaimBtn.textContent = "Già ritirato oggi ✓";
      els.dailyNote.textContent = "Streak salvato! Torna domani per il giorno successivo.";
    } else {
      els.dailyClaimBtn.disabled = false;
      const reward = currentDailyReward();
      els.dailyClaimBtn.textContent = `Ritira: ${reward.emoji} ${reward.title}`;
      els.dailyNote.textContent = "Un premio al giorno. Se salti un giorno, lo streak riparte.";
    }
  }

  function claimDaily() {
    if (!canClaimDaily()) {
      showToast("Hai già ritirato il premio di oggi!");
      return;
    }
    syncDailyStreak();
    const reward = currentDailyReward();
    const dayNum = reward.day;

    daily.lastClaim = todayKey();
    daily.streak = (daily.streak || 0) + 1;
    daily.total = (daily.total || 0) + 1;
    daily.lastClaimedDay = dayNum;
    daily.claimedDays = [...(daily.claimedDays || []).filter((d) => d < dayNum), dayNum];

    if (dayNum >= 7) {
      daily.cycleDay = 1;
      daily.weekComplete = true;
    } else {
      daily.cycleDay = dayNum + 1;
      daily.weekComplete = false;
    }
    saveDaily();

    if (window.DesyMusic) DesyMusic.fanfare();
    showDailyReward(reward);
    updateDailyBanner();
    renderDaily();
  }

  function showDailyReward(reward) {
    const b = BRAWLERS[reward.brawler];
    els.rewardTitle.textContent = `GIORNO ${reward.day}!`;
    els.rewardText.textContent = reward.text;
    els.rewardPrize.textContent = reward.prize;
    els.rewardRarity.textContent = reward.rarity;
    els.rewardRarity.dataset.rarity = reward.rarity;
    els.rewardImg.src = img(b.id);
    els.rewardImg.alt = b.name;
    els.rewardOverlay.hidden = false;
    burstConfetti(["#ff4fa3", "#ffd54a", "#a855f7", "#fff", "#7cfc00", "#4da3ff"]);
  }

  function updateMusicFab(on) {
    els.musicFab.classList.toggle("playing", on);
    els.musicFab.setAttribute("aria-pressed", on ? "true" : "false");
    els.musicLabel.textContent = on ? "ON" : "PLAY";
  }

  function toggleMusic() {
    if (!window.DesyMusic) return;
    const on = DesyMusic.toggle();
    localStorage.setItem(MUSIC_KEY, on ? "1" : "0");
    updateMusicFab(on);
    showToast(on ? "Lobby theme ON 🎵" : "Musica in pausa");
  }

  function loadGoals() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveGoals() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }

  function loadEggs() {
    try {
      return JSON.parse(localStorage.getItem(EGG_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveEggs() {
    localStorage.setItem(EGG_KEY, JSON.stringify(eggs));
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

  function flashBrawl(brawlerKey, text = "BRAWL!") {
    const b = BRAWLERS[brawlerKey] || BRAWLERS.shelly;
    els.brawlFlashImg.src = img(b.id);
    els.brawlFlashImg.alt = b.name;
    els.brawlFlashText.textContent = text;
    els.brawlFlash.hidden = false;
    els.brawlFlash.classList.add("show");
    setTimeout(() => {
      els.brawlFlash.classList.remove("show");
      els.brawlFlash.hidden = true;
    }, 1200);
  }

  function renderHeroStage() {
    els.heroStage.innerHTML = HERO_KEYS.map((key, i) => {
      const b = BRAWLERS[key];
      const float = ["float-a", "float-b", "float-c", "float-a", "float-c"][i];
      return `
        <button type="button" class="brawler-portrait ${float}" data-brawler="${key}" aria-label="${b.name}">
          <img src="${img(b.id)}" alt="${b.name}" width="140" height="140" loading="eager" />
          <span class="brawler-name">${b.name}</span>
        </button>`;
    }).join("");
  }

  function renderRail() {
    els.brawlerRail.innerHTML = RAIL_KEYS.map((key) => {
      const b = BRAWLERS[key];
      return `
        <button type="button" class="rail-chip" data-brawler="${key}" title="${b.quote}">
          <img src="${img(b.id)}" alt="${b.name}" width="72" height="72" loading="lazy" />
          <span>${b.name}</span>
        </button>`;
    }).join("");
  }

  function onBrawlerClick(key) {
    const b = BRAWLERS[key];
    if (!b) return;
    clickMap[key] = (clickMap[key] || 0) + 1;

    if (b.silent) {
      showToast("Spike: «…» 🌵");
      if (clickMap[key] === 5) {
        eggs.spikeFriend = true;
        saveEggs();
        openStarrDrop("spike", "SPIKE TI HA REGALATO UN FIORE!", "LEGENDARY");
      }
      return;
    }

    if (key === "crow" && clickMap[key] % 3 === 0) {
      showToast("☠️ Crow ti ha avvelenato… scherzo! +1 antidoto rosa");
      burstConfetti(["#2d2d2d", "#7cfc00", "#ff4fa3"]);
      return;
    }

    if (key === "leon" && clickMap[key] === 3) {
      document.body.classList.add("leon-invisible");
      showToast("Leon: invisibilità! (3 secondi)");
      setTimeout(() => document.body.classList.remove("leon-invisible"), 3000);
      return;
    }

    if (key === "mortis" && clickMap[key] === 4) {
      flashBrawl("mortis", "BAT DASH!");
      showToast("Mortis: dash nella notte 🦇");
      return;
    }

    if (key === "sandy" && clickMap[key] === 2) {
      document.body.classList.add("sandy-sleep");
      showToast("Sandy addormenta l'arena… zzz");
      setTimeout(() => document.body.classList.remove("sandy-sleep"), 2500);
      return;
    }

    showToast(`${b.name}: «${b.quote}»`);
    if (Math.random() < 0.18) flashBrawl(key, b.name.toUpperCase() + "!");
  }

  function showView(name) {
    Object.entries(els.views).forEach(([key, node]) => {
      node.classList.toggle("active", key === name);
    });
    if (name === "panic") {
      panicIndex = 0;
      renderPanicStep();
      // soft pause lobby vibe during calm
      if (window.DesyMusic && DesyMusic.isPlaying()) {
        DesyMusic.stop();
        updateMusicFab(false);
        showToast("Musica in pausa per la calma 💗");
      }
    }
    if (name === "goals") renderGoals();
    if (name === "daily") renderDaily();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPanicStep() {
    const step = PANIC_STEPS[panicIndex];
    const total = PANIC_STEPS.length;
    const buddy = BRAWLERS[step.buddy];
    els.panicCounter.textContent = `Passo ${panicIndex + 1} di ${total}`;
    els.panicProgress.style.width = `${((panicIndex + 1) / total) * 100}%`;
    els.panicPrev.hidden = panicIndex === 0;
    els.panicNext.textContent = panicIndex === total - 1 ? "Victory! ⭐" : "Ok, prossimo →";
    els.panicBuddyImg.src = img(buddy.id);
    els.panicBuddyImg.alt = buddy.name;
    els.panicBuddyLine.textContent = step.line;

    let extra = "";
    if (step.breathe) extra = `<div class="breathe-circle" aria-hidden="true">Respira</div>`;
    if (step.grounding) {
      extra = `<div class="step-hint" style="margin-bottom:0.75rem">5 vedi · 4 tocca · 3 senti · 2 odora · 1 gusta</div>`;
    }

    els.panicStep.innerHTML = `
      <div class="step-buddy">
        <img src="${img(buddy.id)}" alt="${buddy.name}" width="56" height="56" />
        <span class="step-emoji">${step.emoji}</span>
      </div>
      <h3>${step.title}</h3>
      <p>${step.body}</p>
      ${extra}
      <div class="step-hint">${step.hint}</div>
    `;
  }

  function nextPanic() {
    if (panicIndex >= PANIC_STEPS.length - 1) {
      els.calmOverlay.hidden = false;
      burstConfetti(["#ff4fa3", "#ffd54a", "#7cfc00", "#fff"]);
      if (!eggs.calmWin) {
        eggs.calmWin = true;
        saveEggs();
        setTimeout(() => showToast("Achievement: Calm Master! 🏅"), 800);
      }
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
    return str
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
      .map(
        (g) => `
      <li class="goal-item ${g.done ? "done" : ""}" data-id="${g.id}">
        <button type="button" class="goal-check" data-action="toggle" aria-label="Completa">${g.done ? "✓" : ""}</button>
        <span class="goal-title">${escapeHtml(g.title)}</span>
        <button type="button" class="goal-delete" data-action="delete" aria-label="Elimina">✕</button>
      </li>`
      )
      .join("");
  }

  function addGoal(title) {
    const lower = title.toLowerCase();
    if (lower.includes("3v3") && !eggs.threeVThree) {
      eggs.threeVThree = true;
      saveEggs();
      showToast("Easter egg 3v3! Cerchi di gemme sbloccato 💎");
      flashBrawl("max", "3v3!");
    }
    if (lower.includes("showdown") && !eggs.showdownGoal) {
      eggs.showdownGoal = true;
      saveEggs();
      showToast("Solo Showdown mentality. Solo tu vs il panico.");
    }
    goals.unshift({ id: uid(), title: title.trim(), done: false, stars: 1, createdAt: Date.now() });
    saveGoals();
    renderGoals();
  }

  function toggleGoal(id) {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;
    const wasDone = goal.done;
    goal.done = !goal.done;
    saveGoals();
    renderGoals();
    if (goal.done && !wasDone) showReward();
  }

  function deleteGoal(id) {
    goals = goals.filter((g) => g.id !== id);
    saveGoals();
    renderGoals();
  }

  function showReward() {
    const pick = PRIZES[Math.floor(Math.random() * PRIZES.length)];
    const b = BRAWLERS[pick.brawler];
    els.rewardTitle.textContent = pick.title;
    els.rewardText.textContent = pick.text;
    els.rewardPrize.textContent = pick.prize;
    els.rewardRarity.textContent = pick.rarity;
    els.rewardRarity.dataset.rarity = pick.rarity;
    els.rewardImg.src = img(b.id);
    els.rewardImg.alt = b.name;
    els.rewardOverlay.hidden = false;
    if (window.DesyMusic) DesyMusic.fanfare();
    burstConfetti(["#ff4fa3", "#ffd54a", "#ff9ed2", "#7cfc00", "#4da3ff", "#fff"]);
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
    const rarity = els.starrDrop.dataset.rarity || b.rarity.toUpperCase();
    const title = els.starrDrop.dataset.title || `Hai trovato ${b.name}!`;
    els.starrDrop.hidden = true;
    els.starrResult.hidden = false;
    els.starrResultImg.src = img(b.id, "portraits");
    els.starrResultImg.onerror = () => {
      els.starrResultImg.src = img(b.id);
    };
    els.starrResultImg.alt = b.name;
    els.starrResultRarity.textContent = rarity;
    els.starrResultRarity.dataset.rarity = rarity;
    els.starrResultTitle.textContent = title;
    els.starrResultText.textContent = b.silent ? "Spike non parla. Ma ti vuole bene." : `«${b.quote}»`;
    burstConfetti(["#ff4fa3", "#ffd54a", "#a855f7", "#fff", "#7cfc00"]);
    eggs.starrOpened = (eggs.starrOpened || 0) + 1;
    saveEggs();
  }

  function burstConfetti(colors) {
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.top = `${-10 - Math.random() * 20}vh`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDuration = `${1.4 + Math.random() * 1.6}s`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 3200);
    }
  }

  function spawnSkyStars() {
    for (let i = 0; i < 18; i++) {
      const s = document.createElement("span");
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${Math.random() * 70}%`;
      s.style.animationDelay = `${Math.random() * 2}s`;
      els.starsLayer.appendChild(s);
    }
  }

  function handleSecretCode(char) {
    if (!/^[a-z0-9]$/i.test(char)) return;
    typedBuffer = (typedBuffer + char.toLowerCase()).slice(-12);
    if (typedBuffer.includes("brawl")) {
      typedBuffer = "";
      flashBrawl("shelly", "BRAWL!");
      showToast("Hai attivato il grido di battaglia! 📣");
      eggs.brawlCode = true;
      saveEggs();
    }
    if (typedBuffer.includes("showdown")) {
      typedBuffer = "";
      document.body.classList.add("showdown-mode");
      showToast("SHOWDOWN MODE — solo Desy nell'arena!");
      setTimeout(() => document.body.classList.remove("showdown-mode"), 4000);
      eggs.showdownCode = true;
      saveEggs();
    }
    if (typedBuffer.includes("desy")) {
      typedBuffer = "";
      openStarrDrop("melodie", "DESY SBLOCCATA! Brawler Mythic Rosa", "MYTHIC");
      eggs.desyUnlock = true;
      saveEggs();
    }
  }

  // Events
  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => showView(btn.getAttribute("data-go")));
  });

  els.heroStage.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-brawler]");
    if (btn) onBrawlerClick(btn.getAttribute("data-brawler"));
  });

  els.brawlerRail.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-brawler]");
    if (btn) onBrawlerClick(btn.getAttribute("data-brawler"));
  });

  els.panicNext.addEventListener("click", nextPanic);
  els.panicPrev.addEventListener("click", prevPanic);

  els.goalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = els.goalInput.value.trim();
    if (!value) return;
    addGoal(value);
    els.goalInput.value = "";
    els.goalInput.focus();
  });

  els.goalList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const item = btn.closest(".goal-item");
    if (!item) return;
    const id = item.getAttribute("data-id");
    const action = btn.getAttribute("data-action");
    if (action === "toggle") toggleGoal(id);
    if (action === "delete") deleteGoal(id);
  });

  els.rewardClose.addEventListener("click", () => {
    els.rewardOverlay.hidden = true;
  });

  els.calmClose.addEventListener("click", () => {
    els.calmOverlay.hidden = true;
    showView("home");
  });

  els.starHit.addEventListener("click", () => {
    starClicks += 1;
    els.starHit.classList.add("spin");
    setTimeout(() => els.starHit.classList.remove("spin"), 500);
    if (starClicks >= 7) {
      starClicks = 0;
      openStarrDrop(null, null, null);
      showToast("Starr Drop caduto dal cielo! 🌟");
    } else if (starClicks >= 3) {
      showToast(`Ancora ${7 - starClicks} tocchi sulla stella…`);
    }
  });

  els.brandTitle.addEventListener("click", () => {
    brandClicks += 1;
    if (brandClicks >= 5) {
      brandClicks = 0;
      flashBrawl("janet", "DESY ON STAGE!");
      showToast("Janet: Desy prende il microfono 🎤");
    }
  });

  els.starrOpen.addEventListener("click", revealStarr);
  els.starrClose.addEventListener("click", () => {
    els.starrOverlay.hidden = true;
  });

  els.musicFab.addEventListener("click", toggleMusic);
  els.dailyClaimBtn.addEventListener("click", claimDaily);

  window.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    handleSecretCode(e.key);
  });

  // Konami-ish: ↑↑↓↓ → hyper starr
  const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown"];
  let konamiIdx = 0;
  window.addEventListener("keydown", (e) => {
    if (e.key === konami[konamiIdx]) {
      konamiIdx += 1;
      if (konamiIdx === konami.length) {
        konamiIdx = 0;
        openStarrDrop("cordelius", "HYPER STARR DROP!", "LEGENDARY");
        showToast("Codice freccia attivato! 🍄");
      }
    } else if (!e.key.startsWith("Arrow")) {
      /* ignore non-arrows for typing codes */
    } else {
      konamiIdx = 0;
    }
  });

  renderHeroStage();
  renderRail();
  spawnSkyStars();
  renderGoals();
  updateDailyBanner();

  // Music needs a user gesture in most browsers — FAB handles start.
  // If previously ON, nudge user.
  if (localStorage.getItem(MUSIC_KEY) === "1") {
    els.musicLabel.textContent = "PLAY";
    setTimeout(() => showToast("Tocca 🎵 per la musichetta lobby!"), 1200);
  }

  if (!eggs.welcome) {
    setTimeout(() => showToast("Benvenuta nell'arena, Desy 💗"), 600);
    eggs.welcome = true;
    saveEggs();
  }

  // Pulse daily banner if unclaimed
  if (canClaimDaily()) {
    els.dailyBanner.classList.add("pulse");
  }
})();
