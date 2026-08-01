/* Desy Stars — game progression engine */
window.DesyGame = (() => {
  const KEY = "desy-stars-game-v3";
  const FRESH_FLAG = "desy-stars-fresh-boot-2";
  const LEGACY_KEYS = [
    "desy-stars-game-v2",
    "desy-stars-game-v3",
    "desy-stars-goals-v1",
    "desy-stars-goals-v3",
    "desy-stars-eggs-v1",
    "desy-stars-eggs-v3",
    "desy-stars-daily-v1",
    "desy-stars-music-v1",
    "desy-stars-music-v3",
  ];

  // One-shot wipe so this build opens as a true first access
  try {
    if (!localStorage.getItem(FRESH_FLAG)) {
      LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
      localStorage.setItem(FRESH_FLAG, "1");
    }
  } catch {
    /* ignore */
  }

  const XP_TABLE = {
    openSite: 5,
    completeGoal: 50,
    dailyVisit: 20,
    dailyClaim: 15,
    panicDone: 40,
    streak7: 150,
    streak14: 250,
    streak30: 500,
    streak100: 1200,
    levelBonus: 25,
  };

  const ACHIEVEMENTS = [
    { id: "first_login", icon: "🥇", title: "Primo accesso", desc: "Hai aperto Desy Stars per la prima volta." },
    { id: "streak_7", icon: "🔥", title: "7 giorni di fuoco", desc: "Serie di 7 giorni consecutivi." },
    { id: "streak_14", icon: "💫", title: "Due settimane", desc: "Serie di 14 giorni." },
    { id: "streak_30", icon: "👑", title: "Regina della costanza", desc: "Serie di 30 giorni." },
    { id: "streak_100", icon: "🌟", title: "Leggenda Rosa", desc: "Serie di 100 giorni." },
    { id: "first_goal", icon: "💪", title: "Primo obiettivo", desc: "Hai completato il tuo primo obiettivo." },
    { id: "goals_10", icon: "🎯", title: "10 vittorie", desc: "Hai completato 10 obiettivi." },
    { id: "goals_50", icon: "🏆", title: "50 traguardi", desc: "Hai completato 50 obiettivi." },
    { id: "first_panic", icon: "🌸", title: "Momento difficile", desc: "Hai completato la guida calma." },
    { id: "panic_5", icon: "💗", title: "Cuore forte", desc: "Hai affrontato 5 momenti difficili." },
    { id: "rewards_30", icon: "🎁", title: "30 premi", desc: "Hai aperto 30 premi quotidiani." },
    { id: "level_5", icon: "⭐", title: "Livello 5", desc: "Hai raggiunto il livello 5." },
    { id: "level_10", icon: "🏅", title: "Livello 10", desc: "Hai raggiunto il livello 10." },
    { id: "level_20", icon: "💎", title: "Livello 20", desc: "Hai raggiunto il livello 20." },
    { id: "shop_first", icon: "🛍️", title: "Prima spesa", desc: "Hai comprato qualcosa nello shop." },
    { id: "collect_5", icon: "🎨", title: "Collezionista", desc: "Hai sbloccato 5 personaggi." },
    { id: "tree_bloom", icon: "🌳", title: "Albero in fiore", desc: "Il tuo albero è cresciuto fino allo stadio massimo." },
  ];

  const SHOP = [
    { id: "theme_sunset", type: "theme", name: "Tema Tramonto Rosa", price: 80, icon: "🌅" },
    { id: "theme_night", type: "theme", name: "Tema Notte Arena", price: 100, icon: "🌙" },
    { id: "theme_mint", type: "theme", name: "Tema Menta Soft", price: 90, icon: "🍃" },
    { id: "music_calm", type: "music", name: "Musica Soft Calm", price: 70, icon: "🎶" },
    { id: "music_hype", type: "music", name: "Musica Hype Drop", price: 90, icon: "🎧" },
    { id: "frame_gold", type: "frame", name: "Cornice Oro", price: 60, icon: "🖼️" },
    { id: "frame_sparkle", type: "frame", name: "Cornice Sparkle", price: 75, icon: "✨" },
    { id: "fx_confetti", type: "fx", name: "Effetto Super Confetti", price: 50, icon: "🎊" },
    { id: "fx_glow", type: "fx", name: "Glow Rosa", price: 55, icon: "💡" },
    { id: "sticker_heart", type: "sticker", name: "Sticker Cuore", price: 30, icon: "💖" },
    { id: "sticker_star", type: "sticker", name: "Sticker Stella", price: 30, icon: "⭐" },
    { id: "avatar_crown", type: "avatar", name: "Avatar Corona", price: 120, icon: "👑" },
    { id: "anim_bounce", type: "anim", name: "Animazioni Extra Bounce", price: 65, icon: "🦘" },
  ];

  const CHARACTERS = [
    { key: "shelly", name: "Shelly", rarity: "Starting", quote: "Ripartiamo insieme!" },
    { key: "colt", name: "Colt", rarity: "Rare", quote: "I was born ready!" },
    { key: "spike", name: "Spike", rarity: "Legendary", quote: "…" },
    { key: "crow", name: "Crow", rarity: "Legendary", quote: "Watch your back…" },
    { key: "leon", name: "Leon", rarity: "Legendary", quote: "Peek-a-boo!" },
    { key: "piper", name: "Piper", rarity: "Epic", quote: "Have a blast!" },
    { key: "poco", name: "Poco", rarity: "Rare", quote: "Let's rock!" },
    { key: "mortis", name: "Mortis", rarity: "Mythic", quote: "Bat to the bone!" },
    { key: "primo", name: "El Primo", rarity: "Rare", quote: "El Primooo!" },
    { key: "tara", name: "Tara", rarity: "Mythic", quote: "Fate is sealed." },
    { key: "sandy", name: "Sandy", rarity: "Legendary", quote: "Sweet dreams." },
    { key: "max", name: "Max", rarity: "Mythic", quote: "Gotta go FAST!" },
    { key: "belle", name: "Belle", rarity: "Epic", quote: "Smile!" },
    { key: "janet", name: "Janet", rarity: "Mythic", quote: "On stage!" },
    { key: "kit", name: "Kit", rarity: "Legendary", quote: "Meow!" },
    { key: "melodie", name: "Melodie", rarity: "Legendary", quote: "Feel the beat!" },
    { key: "cordelius", name: "Cordelius", rarity: "Legendary", quote: "Into the dark…" },
    { key: "surge", name: "Surge", rarity: "Legendary", quote: "Power UP!" },
    { key: "nita", name: "Nita", rarity: "Rare", quote: "Rawr!" },
    { key: "jessie", name: "Jessie", rarity: "Rare", quote: "Turret time!" },
  ];

  const CHAR_IDS = {
    shelly: 16000000, colt: 16000001, spike: 16000005, crow: 16000012, leon: 16000023,
    piper: 16000015, poco: 16000013, mortis: 16000011, primo: 16000010, tara: 16000017,
    sandy: 16000028, max: 16000032, belle: 16000042, janet: 16000049, kit: 16000068,
    melodie: 16000070, cordelius: 16000062, surge: 16000038, nita: 16000008, jessie: 16000007,
  };

  const DAILY_LOOT = [
    { kind: "coins", min: 20, max: 60, label: "Monete", icon: "🪙" },
    { kind: "xp", min: 25, max: 80, label: "XP Boost", icon: "⭐" },
    { kind: "sticker", items: ["💖", "⭐", "🎀", "🌸", "💎"], label: "Sticker", icon: "🎨" },
    { kind: "frame", items: ["frame_soft", "frame_pink", "frame_arena"], label: "Cornice", icon: "🖼️" },
    { kind: "badge", items: ["badge_spark", "badge_calm", "badge_brave"], label: "Badge", icon: "🏅" },
    { kind: "character", label: "Personaggio", icon: "👾" },
    { kind: "theme", items: ["theme_bonus_a", "theme_bonus_b"], label: "Sfondo", icon: "🌈" },
  ];

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function yesterdayKey() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function xpNeeded(level) {
    return 100 + Math.max(0, level - 1) * 50;
  }

  function defaultState() {
    const starters = {};
    ["shelly", "piper", "spike"].forEach((k) => {
      starters[k] = { unlocked: true, level: 1, skin: "default" };
    });
    return {
      xp: 0,
      level: 1,
      totalXp: 0,
      coins: 40,
      streak: 0,
      bestStreak: 0,
      lastVisit: null,
      lastDailyClaim: null,
      dailyCycleDay: 1,
      claimedDays: [],
      weekComplete: false,
      owned: {},
      equipped: { theme: null, music: null, frame: null, fx: [], avatar: null },
      characters: starters,
      achievements: {},
      timeline: [],
      stickers: [],
      frames: [],
      badges: [],
      themes: [],
      stats: {
        goalsCompleted: 0,
        panicCompleted: 0,
        rewardsOpened: 0,
        timeSpentMs: 0,
        sessions: 0,
        shopBuys: 0,
      },
      growthStage: 0,
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return { ...defaultState(), ...parsed, stats: { ...defaultState().stats, ...(parsed.stats || {}) } };
    } catch {
      return defaultState();
    }
  }

  let state = load();
  let listeners = [];
  let sessionAwarded = false;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
    listeners.forEach((fn) => fn(state));
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  function addTimeline(text, icon = "✨") {
    state.timeline.unshift({ id: `${Date.now()}`, text, icon, at: Date.now() });
    state.timeline = state.timeline.slice(0, 60);
  }

  function unlockAchievement(id) {
    if (state.achievements[id]) return null;
    const def = ACHIEVEMENTS.find((a) => a.id === id);
    if (!def) return null;
    state.achievements[id] = Date.now();
    addTimeline(`${def.title}: ${def.desc}`, def.icon);
    save();
    return def;
  }

  function checkStreakAchievements() {
    const unlocked = [];
    if (state.streak >= 7) unlocked.push(unlockAchievement("streak_7"));
    if (state.streak >= 14) unlocked.push(unlockAchievement("streak_14"));
    if (state.streak >= 30) unlocked.push(unlockAchievement("streak_30"));
    if (state.streak >= 100) unlocked.push(unlockAchievement("streak_100"));
    return unlocked.filter(Boolean);
  }

  function checkLevelAchievements() {
    const unlocked = [];
    if (state.level >= 5) unlocked.push(unlockAchievement("level_5"));
    if (state.level >= 10) unlocked.push(unlockAchievement("level_10"));
    if (state.level >= 20) unlocked.push(unlockAchievement("level_20"));
    return unlocked.filter(Boolean);
  }

  function addXp(amount, reason) {
    const levelsGained = [];
    state.xp += amount;
    state.totalXp += amount;
    let needed = xpNeeded(state.level);
    while (state.xp >= needed) {
      state.xp -= needed;
      state.level += 1;
      state.coins += 15 + state.level;
      levelsGained.push(state.level);
      needed = xpNeeded(state.level);
      addTimeline(`Livello ${state.level} raggiunto!`, "⭐");
    }
    if (reason) addTimeline(`+${amount} XP · ${reason}`, "⭐");
    const ach = checkLevelAchievements();
    save();
    return { amount, levelsGained, achievements: ach };
  }

  function addCoins(amount, reason) {
    state.coins += amount;
    if (reason) addTimeline(`+${amount} monete · ${reason}`, "🪙");
    save();
  }

  function registerVisit() {
    const today = todayKey();
    const result = { streakBroken: false, streakMilestone: null, xpGain: null, achievements: [] };
    state.stats.sessions += 1;

    if (!state.achievements.first_login) {
      result.achievements.push(unlockAchievement("first_login"));
    }

    if (state.lastVisit !== today) {
      if (state.lastVisit && state.lastVisit !== yesterdayKey()) {
        if (state.streak > 0) result.streakBroken = true;
        state.streak = 1;
      } else if (state.lastVisit === yesterdayKey()) {
        state.streak += 1;
      } else if (!state.lastVisit) {
        state.streak = 1;
      }
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      state.lastVisit = today;
      result.xpGain = addXp(XP_TABLE.dailyVisit, "Entrata giornaliera");
      const milestoneAch = checkStreakAchievements();
      result.achievements.push(...milestoneAch);
      if (state.streak === 7) {
        result.streakMilestone = 7;
        addXp(XP_TABLE.streak7, "Serie 7 giorni");
      } else if (state.streak === 14) {
        result.streakMilestone = 14;
        addXp(XP_TABLE.streak14, "Serie 14 giorni");
      } else if (state.streak === 30) {
        result.streakMilestone = 30;
        addXp(XP_TABLE.streak30, "Serie 30 giorni");
      } else if (state.streak === 100) {
        result.streakMilestone = 100;
        addXp(XP_TABLE.streak100, "Serie 100 giorni");
      }
    }

    if (!sessionAwarded) {
      result.openXp = addXp(XP_TABLE.openSite, "Apertura app");
      sessionAwarded = true;
    }

    save();
    return result;
  }

  function canClaimDaily() {
    return state.lastDailyClaim !== todayKey();
  }

  function rollDailyLoot() {
    const pool = [...DAILY_LOOT];
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick.kind === "coins") {
      const amount = rand(pick.min, pick.max);
      return { ...pick, amount, title: `${amount} Monete`, detail: "Spendile nello shop!" };
    }
    if (pick.kind === "xp") {
      const amount = rand(pick.min, pick.max);
      return { ...pick, amount, title: `+${amount} XP`, detail: "Boost esperienza!" };
    }
    if (pick.kind === "sticker") {
      const item = pick.items[Math.floor(Math.random() * pick.items.length)];
      return { ...pick, item, title: `Sticker ${item}`, detail: "Aggiunto alla collezione" };
    }
    if (pick.kind === "frame") {
      const item = pick.items[Math.floor(Math.random() * pick.items.length)];
      return { ...pick, item, title: "Nuova cornice", detail: item };
    }
    if (pick.kind === "badge") {
      const item = pick.items[Math.floor(Math.random() * pick.items.length)];
      return { ...pick, item, title: "Badge speciale", detail: item };
    }
    if (pick.kind === "theme") {
      const item = pick.items[Math.floor(Math.random() * pick.items.length)];
      return { ...pick, item, title: "Nuovo sfondo", detail: item };
    }
    // character
    const locked = CHARACTERS.filter((c) => !state.characters[c.key]?.unlocked);
    if (!locked.length) {
      const amount = rand(40, 90);
      return { kind: "coins", amount, icon: "🪙", title: `${amount} Monete`, detail: "Collezione completa: bonus monete!" };
    }
    const ch = locked[Math.floor(Math.random() * locked.length)];
    return { kind: "character", icon: "👾", character: ch.key, title: ch.name, detail: `Rarità ${ch.rarity}` };
  }

  function rand(a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
  }

  function claimDaily() {
    if (!canClaimDaily()) return null;
    const loot = rollDailyLoot();
    state.lastDailyClaim = todayKey();
    state.stats.rewardsOpened += 1;
    const dayNum = state.dailyCycleDay || 1;
    state.claimedDays = [...(state.claimedDays || []).filter((d) => d < dayNum), dayNum];
    if (dayNum >= 7) {
      state.dailyCycleDay = 1;
      state.weekComplete = true;
      state.claimedDays = [];
    } else {
      state.dailyCycleDay = dayNum + 1;
      state.weekComplete = false;
    }

    applyLoot(loot);
    addXp(XP_TABLE.dailyClaim, "Premio quotidiano");
    if (state.stats.rewardsOpened >= 30) unlockAchievement("rewards_30");
    addTimeline(`Premio quotidiano: ${loot.title}`, "🎁");
    save();
    return { loot, dayNum };
  }

  function applyLoot(loot) {
    if (loot.kind === "coins") addCoins(loot.amount, "Premio");
    if (loot.kind === "xp") addXp(loot.amount, "Premio XP");
    if (loot.kind === "sticker") state.stickers.push(loot.item);
    if (loot.kind === "frame") state.frames.push(loot.item);
    if (loot.kind === "badge") state.badges.push(loot.item);
    if (loot.kind === "theme") state.themes.push(loot.item);
    if (loot.kind === "character" && loot.character) {
      state.characters[loot.character] = { unlocked: true, level: 1, skin: "default" };
      if (unlockedCharacterCount() >= 5) unlockAchievement("collect_5");
    }
  }

  function unlockedCharacterCount() {
    return Object.values(state.characters).filter((c) => c.unlocked).length;
  }

  function buyShopItem(id) {
    const item = SHOP.find((s) => s.id === id);
    if (!item) return { ok: false, reason: "missing" };
    if (state.owned[id]) return { ok: false, reason: "owned" };
    if (state.coins < item.price) return { ok: false, reason: "coins" };
    state.coins -= item.price;
    state.owned[id] = Date.now();
    state.stats.shopBuys += 1;
    if (item.type === "theme") state.equipped.theme = id;
    if (item.type === "music") state.equipped.music = id;
    if (item.type === "frame") state.equipped.frame = id;
    if (item.type === "avatar") state.equipped.avatar = id;
    if (item.type === "fx") state.equipped.fx = [...new Set([...(state.equipped.fx || []), id])];
    unlockAchievement("shop_first");
    addTimeline(`Acquistato: ${item.name}`, item.icon);
    save();
    applyTheme();
    return { ok: true, item };
  }

  function applyTheme() {
    document.body.dataset.theme = state.equipped.theme || "";
    document.body.dataset.frame = state.equipped.frame || "";
    document.body.classList.toggle("fx-glow", (state.equipped.fx || []).includes("fx_glow"));
    document.body.classList.toggle("fx-extra-bounce", !!state.owned.anim_bounce);
  }

  function onGoalCompleted(goalTitle) {
    state.stats.goalsCompleted += 1;
    const xp = addXp(XP_TABLE.completeGoal, `Obiettivo: ${goalTitle}`);
    addCoins(10, "Obiettivo");
    // chance unlock character
    if (Math.random() < 0.22) {
      const locked = CHARACTERS.filter((c) => !state.characters[c.key]?.unlocked);
      if (locked.length) {
        const ch = locked[Math.floor(Math.random() * locked.length)];
        state.characters[ch.key] = { unlocked: true, level: 1, skin: "default" };
        addTimeline(`Nuovo personaggio: ${ch.name}`, "👾");
      }
    }
    updateGrowth();
    const ach = [];
    if (state.stats.goalsCompleted === 1) ach.push(unlockAchievement("first_goal"));
    if (state.stats.goalsCompleted >= 10) ach.push(unlockAchievement("goals_10"));
    if (state.stats.goalsCompleted >= 50) ach.push(unlockAchievement("goals_50"));
    if (unlockedCharacterCount() >= 5) ach.push(unlockAchievement("collect_5"));
    save();
    return { xp, achievements: ach.filter(Boolean) };
  }

  function onPanicCompleted() {
    state.stats.panicCompleted += 1;
    const xp = addXp(XP_TABLE.panicDone, "Guida calma completata");
    const ach = [];
    if (state.stats.panicCompleted === 1) ach.push(unlockAchievement("first_panic"));
    if (state.stats.panicCompleted >= 5) ach.push(unlockAchievement("panic_5"));
    addTimeline("Hai affrontato un momento difficile", "🌸");
    save();
    return { xp, achievements: ach.filter(Boolean) };
  }

  function updateGrowth() {
    const g = state.stats.goalsCompleted;
    let stage = 0;
    if (g >= 1) stage = 1;
    if (g >= 3) stage = 2;
    if (g >= 7) stage = 3;
    if (g >= 15) stage = 4;
    if (g >= 30) stage = 5;
    state.growthStage = stage;
    if (stage >= 5) unlockAchievement("tree_bloom");
  }

  function trackTime(ms) {
    state.stats.timeSpentMs += ms;
    save();
  }

  function resetAll() {
    try {
      [
        KEY,
        "desy-stars-goals-v3",
        "desy-stars-eggs-v3",
        "desy-stars-music-v3",
        ...LEGACY_KEYS,
      ].forEach((k) => localStorage.removeItem(k));
    } catch {
      /* ignore */
    }
    state = defaultState();
    sessionAwarded = false;
    save();
    applyTheme();
    return state;
  }

  function progress() {
    const need = xpNeeded(state.level);
    return {
      level: state.level,
      xp: state.xp,
      need,
      pct: Math.min(100, Math.round((state.xp / need) * 100)),
      coins: state.coins,
      streak: state.streak,
      totalXp: state.totalXp,
    };
  }

  function completionPct() {
    const charPct = unlockedCharacterCount() / CHARACTERS.length;
    const achPct = Object.keys(state.achievements).length / ACHIEVEMENTS.length;
    const shopPct = Object.keys(state.owned).length / SHOP.length;
    return Math.round(((charPct + achPct + shopPct) / 3) * 100);
  }

  // expose
  return {
    XP_TABLE,
    ACHIEVEMENTS,
    SHOP,
    CHARACTERS,
    CHAR_IDS,
    get state() {
      return state;
    },
    onChange,
    save,
    progress,
    addXp,
    addCoins,
    registerVisit,
    canClaimDaily,
    claimDaily,
    buyShopItem,
    onGoalCompleted,
    onPanicCompleted,
    unlockedCharacterCount,
    completionPct,
    applyTheme,
    trackTime,
    unlockAchievement,
    xpNeeded,
    resetAll,
  };
})();
