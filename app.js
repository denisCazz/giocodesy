(() => {
  const STORAGE_KEY = "desy-stars-goals-v1";
  const PRIZES = [
    { title: "STELLA ROSA!", prize: "+1 ⭐ Stella Rosa", text: "Desy ha conquistato un obiettivo!" },
    { title: "SUPER HIT!", prize: "+1 🎀 Fiocco Power", text: "Colpo da campionessa!" },
    { title: "MEGA WIN!", prize: "+1 💎 Gemma Shine", text: "Arena dominata, bravissima!" },
    { title: "LEGENDARY!", prize: "+1 👑 Corona Desy", text: "Obiettivo epico completato!" },
    { title: "POWER UP!", prize: "+1 💗 Cuore Forza", text: "La tua energia è al massimo!" },
  ];

  const PANIC_STEPS = [
    {
      emoji: "🛑",
      title: "Stop. Sei al sicuro.",
      body: "Desy, fermati un secondo. Non stai in pericolo. Questo momento è scomodo, ma passerà. Sei in un posto sicuro adesso.",
      hint: "Metti una mano sul petto. Senti che sei qui, adesso.",
    },
    {
      emoji: "👀",
      title: "Ancorati qui",
      body: "Guarda intorno a te e nomina piano piano: 5 cose che vedi, 4 che puoi toccare, 3 che senti, 2 che puoi odorare, 1 che puoi assaporare.",
      hint: "Non serve farlo perfetto. Basta notare qualcosa di reale.",
      grounding: true,
    },
    {
      emoji: "🌬️",
      title: "Respira con me",
      body: "Segui il cerchio: inspira mentre cresce, trattieni un attimo, espira mentre rimpicciolisce. Ripeti almeno 4 volte.",
      hint: "Il naso inspira. La bocca espira lentamente.",
      breathe: true,
    },
    {
      emoji: "💬",
      title: "Parla alla mente",
      body: "Di' a voce alta o nella testa: «È un attacco di panico. Il mio corpo è in allarme, ma non c'è un pericolo reale. Passerà.»",
      hint: "Puoi ripeterlo come un power-up vocale.",
    },
    {
      emoji: "🧊",
      title: "Rilassa il corpo",
      body: "Stringi forte i pugni per 5 secondi, poi rilascia. Alza le spalle alle orecchie, poi lasciale andare. Muovi piano collo e mascella.",
      hint: "La tensione esce quando rilasci con intenzione.",
    },
    {
      emoji: "⭐",
      title: "Sei tornata in gioco",
      body: "Hai fatto tutti i passi. Bevi un sorso d'acqua se puoi. Sei più forte di quanto pensi. Quando vuoi, torna all'arena.",
      hint: "Se serve, riparti dal passo 1. Sempre.",
    },
  ];

  const els = {
    views: {
      home: document.getElementById("view-home"),
      panic: document.getElementById("view-panic"),
      goals: document.getElementById("view-goals"),
    },
    panicStep: document.getElementById("panicStep"),
    panicCounter: document.getElementById("panicCounter"),
    panicProgress: document.getElementById("panicProgress"),
    panicPrev: document.getElementById("panicPrev"),
    panicNext: document.getElementById("panicNext"),
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
    calmOverlay: document.getElementById("calmOverlay"),
    calmClose: document.getElementById("calmClose"),
    starsLayer: document.getElementById("starsLayer"),
  };

  let panicIndex = 0;
  let goals = loadGoals();

  function loadGoals() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveGoals() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }

  function showView(name) {
    Object.entries(els.views).forEach(([key, node]) => {
      node.classList.toggle("active", key === name);
    });
    if (name === "panic") {
      panicIndex = 0;
      renderPanicStep();
    }
    if (name === "goals") {
      renderGoals();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPanicStep() {
    const step = PANIC_STEPS[panicIndex];
    const total = PANIC_STEPS.length;
    els.panicCounter.textContent = `Passo ${panicIndex + 1} di ${total}`;
    els.panicProgress.style.width = `${((panicIndex + 1) / total) * 100}%`;
    els.panicPrev.hidden = panicIndex === 0;
    els.panicNext.textContent =
      panicIndex === total - 1 ? "Ho finito ⭐" : "Ok, prossimo →";

    let extra = "";
    if (step.breathe) {
      extra = `<div class="breathe-circle" aria-hidden="true">Respira</div>`;
    }
    if (step.grounding) {
      extra = `
        <div class="step-hint" style="margin-bottom:0.75rem">
          5 vedi · 4 tocca · 3 senti · 2 odora · 1 gusta
        </div>`;
    }

    els.panicStep.innerHTML = `
      <span class="step-emoji">${step.emoji}</span>
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
        <button type="button" class="goal-check" data-action="toggle" aria-label="${
          g.done ? "Segna come non completato" : "Completa obiettivo"
        }">${g.done ? "✓" : ""}</button>
        <span class="goal-title">${escapeHtml(g.title)}</span>
        <button type="button" class="goal-delete" data-action="delete" aria-label="Elimina">✕</button>
      </li>`
      )
      .join("");
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function addGoal(title) {
    goals.unshift({
      id: uid(),
      title: title.trim(),
      done: false,
      stars: 1,
      createdAt: Date.now(),
    });
    saveGoals();
    renderGoals();
  }

  function toggleGoal(id) {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;
    const wasDone = goal.done;
    goal.done = !goal.done;
    if (goal.done && !wasDone) {
      saveGoals();
      renderGoals();
      showReward();
      return;
    }
    saveGoals();
    renderGoals();
  }

  function deleteGoal(id) {
    goals = goals.filter((g) => g.id !== id);
    saveGoals();
    renderGoals();
  }

  function showReward() {
    const pick = PRIZES[Math.floor(Math.random() * PRIZES.length)];
    els.rewardTitle.textContent = pick.title;
    els.rewardText.textContent = pick.text;
    els.rewardPrize.textContent = pick.prize;
    els.rewardOverlay.hidden = false;
    burstConfetti(["#ff4fa3", "#ffd54a", "#ff9ed2", "#7cfc00", "#4da3ff", "#fff"]);
  }

  function burstConfetti(colors) {
    const count = 36;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.top = `${-10 - Math.random() * 20}vh`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDuration = `${1.4 + Math.random() * 1.6}s`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 3200);
    }
  }

  function spawnSkyStars() {
    const n = 18;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${Math.random() * 70}%`;
      s.style.animationDelay = `${Math.random() * 2}s`;
      els.starsLayer.appendChild(s);
    }
  }

  // Events
  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => showView(btn.getAttribute("data-go")));
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

  spawnSkyStars();
  renderGoals();
})();
