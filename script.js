"use strict";

const metals = [
  "Magnesium",
  "Aluminium",
  "Zink",
  "Eisen",
  "Blei",
  "Kupfer",
  "Silber",
  "Gold"
];

// Fachliche Daten bleiben zentral, damit Aufgaben und Feedback konsistent sind.
const stationOnePairs = [
  ["Zink", "Kupfer"],
  ["Aluminium", "Eisen"],
  ["Blei", "Silber"],
  ["Kupfer", "Gold"],
  ["Magnesium", "Zink"],
  ["Eisen", "Silber"]
];

const reactions = [
  {
    oxideMetal: "Kupfer",
    freeMetal: "Eisen",
    explanation: "Eisen ist unedler als Kupfer. Deshalb kann Eisen dem Kupferoxid den Sauerstoff entziehen."
  },
  {
    oxideMetal: "Kupfer",
    freeMetal: "Magnesium",
    explanation: "Magnesium ist unedler als Kupfer. Deshalb kann Magnesium dem Kupferoxid den Sauerstoff entziehen."
  },
  {
    oxideMetal: "Eisen",
    freeMetal: "Aluminium",
    explanation: "Aluminium ist unedler als Eisen. Deshalb kann Aluminium dem Eisenoxid den Sauerstoff entziehen."
  },
  {
    oxideMetal: "Blei",
    freeMetal: "Zink",
    explanation: "Zink ist unedler als Blei. Deshalb kann Zink dem Bleioxid den Sauerstoff entziehen."
  },
  {
    oxideMetal: "Silber",
    freeMetal: "Kupfer",
    explanation: "Kupfer ist unedler als Silber. Deshalb kann Kupfer dem Silberoxid den Sauerstoff entziehen."
  },
  {
    oxideMetal: "Kupfer",
    freeMetal: "Zink",
    explanation: "Zink ist unedler als Kupfer. Deshalb kann Zink dem Kupferoxid den Sauerstoff entziehen."
  }
];

const misconceptionTasks = [
  {
    statement: "Kupfer kann Eisenoxid zu Eisen reduzieren, weil Kupfer edler ist als Eisen.",
    correct: false,
    correction: "Kupfer kann Eisenoxid nicht zu Eisen reduzieren, weil Kupfer edler als Eisen ist und Sauerstoff schlechter aufnimmt.",
    wrongOptions: [
      "Kupfer kann Eisenoxid reduzieren, weil Kupfer Sauerstoff besonders leicht aufnimmt.",
      "Eisenoxid wird oxidiert, wenn Kupfer Sauerstoff abgibt."
    ],
    explanation: "Für das Entziehen von Sauerstoff muss das freie Metall unedler sein als das Metall im Metalloxid."
  },
  {
    statement: "Bei der Oxidation nimmt ein Stoff Sauerstoff auf.",
    correct: true,
    explanation: "Genau. Oxidation bedeutet in diesem Lernprogramm Sauerstoffaufnahme."
  },
  {
    statement: "Das Reduktionsmittel wird bei der Reaktion selbst oxidiert.",
    correct: true,
    explanation: "Richtig. Das Reduktionsmittel nimmt den Sauerstoff auf und wird dabei oxidiert."
  },
  {
    statement: "Das Oxidationsmittel wird selbst oxidiert.",
    correct: false,
    correction: "Das Oxidationsmittel oxidiert einen anderen Stoff und wird dabei selbst reduziert.",
    wrongOptions: [
      "Das Oxidationsmittel ist immer das freie Metall.",
      "Das Oxidationsmittel nimmt Sauerstoff auf und wird deshalb oxidiert."
    ],
    explanation: "Das Oxidationsmittel gibt Sauerstoff ab. Es wird selbst reduziert."
  },
  {
    statement: "Ein unedles Metall ist oft ein gutes Reduktionsmittel.",
    correct: true,
    explanation: "Richtig. Unedle Metalle nehmen Sauerstoff leicht auf und können Metalloxiden Sauerstoff entziehen."
  },
  {
    statement: "Silber kann Magnesiumoxid leicht Sauerstoff entziehen.",
    correct: false,
    correction: "Silber ist viel edler als Magnesium und kann Magnesiumoxid den Sauerstoff nicht entziehen.",
    wrongOptions: [
      "Silber kann Magnesiumoxid Sauerstoff entziehen, weil Silber rechts steht.",
      "Magnesiumoxid gibt Sauerstoff besonders leicht an Gold ab."
    ],
    explanation: "Silber steht rechts von Magnesium. Es ist edler und nimmt Sauerstoff schlechter auf."
  }
];

const labScenarios = [
  {
    prompt: "Du möchtest aus Kupferoxid wieder Kupfer gewinnen. Welche Metalle eignen sich als Reduktionsmittel?",
    options: ["Magnesium", "Aluminium", "Zink", "Eisen", "Blei", "Silber", "Gold"],
    correct: ["Magnesium", "Aluminium", "Zink", "Eisen", "Blei"],
    explanation: "Diese Metalle stehen links von Kupfer. Sie sind unedler als Kupfer und können Kupferoxid Sauerstoff entziehen."
  },
  {
    prompt: "Du möchtest Eisen aus Eisenoxid gewinnen. Welche Metalle könnten helfen?",
    options: ["Magnesium", "Aluminium", "Zink", "Blei", "Kupfer", "Silber", "Gold"],
    correct: ["Magnesium", "Aluminium", "Zink"],
    explanation: "Diese Metalle sind unedler als Eisen. Sie nehmen Sauerstoff leichter auf als Eisen."
  },
  {
    prompt: "Du möchtest aus Silberoxid wieder Silber gewinnen. Welche Metalle eignen sich?",
    options: ["Magnesium", "Aluminium", "Zink", "Eisen", "Blei", "Kupfer", "Gold"],
    correct: ["Magnesium", "Aluminium", "Zink", "Eisen", "Blei", "Kupfer"],
    explanation: "Alle diese Metalle stehen links von Silber und sind daher unedler als Silber."
  }
];

const stations = [
  { title: "Startseite", render: renderStart },
  { title: "Station 1 von 5", render: renderStationOne },
  { title: "Station 2 von 5", render: renderStationTwo },
  { title: "Station 3 von 5", render: renderStationThree },
  { title: "Station 4 von 5", render: renderStationFive },
  { title: "Station 5 von 5", render: renderStationSix },
  { title: "Abschluss", render: renderFinish }
];

const state = {
  screen: 0,
  attempts: 0,
  selectedCard: null,
  stationOneIndex: 0,
  stationFiveIndex: 0,
  labIndex: 0
};

const app = document.querySelector("#app");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const attemptText = document.querySelector("#attemptText");
const seriesPanel = document.querySelector("#seriesPanel");
const seriesToggle = document.querySelector("#seriesToggle");
const redoxSeries = document.querySelector("#redoxSeries");

// In der Redoxreihe gilt: kleinerer Index bedeutet unedler.
function metalRank(metal) {
  return metals.indexOf(metal);
}

function isLessNoble(metal, otherMetal) {
  return metalRank(metal) < metalRank(otherMetal);
}

function oxide(metal) {
  return `${metal}oxid`;
}

function reactionText(reaction) {
  return `${oxide(reaction.oxideMetal)} + ${reaction.freeMetal} → ${reaction.oxideMetal} + ${oxide(reaction.freeMetal)}`;
}

function shuffle(items) {
  const mixed = [...items];
  for (let index = mixed.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [mixed[index], mixed[swapIndex]] = [mixed[swapIndex], mixed[index]];
  }
  return mixed;
}

function setScreen(index) {
  state.screen = index;
  state.attempts = 0;
  state.selectedCard = null;
  app.innerHTML = "";
  stations[index].render();
  updateProgress();
}

function nextScreen() {
  setScreen(Math.min(state.screen + 1, stations.length - 1));
}

// Fortschritt und Versuche werden nach jedem Stationswechsel oder Fehlversuch aktualisiert.
function updateProgress() {
  progressText.textContent = stations[state.screen].title;
  attemptText.textContent = state.attempts ? `Versuch ${state.attempts}` : "";
  progressFill.style.width = `${(state.screen / (stations.length - 1)) * 100}%`;
}

function renderSeries() {
  redoxSeries.innerHTML = metals.map((metal) => `<li>${metal}</li>`).join("");
}

function header(title, intro, help) {
  return `
    <div class="screen-header">
      <div>
        <h2>${title}</h2>
        <p>${intro}</p>
      </div>
      <button class="secondary-button" type="button" data-help>ⓘ Hilfe</button>
    </div>
    <div class="tip-box hidden" id="helpBox">${help}</div>
  `;
}

function attachHelp() {
  const helpButton = app.querySelector("[data-help]");
  const helpBox = app.querySelector("#helpBox");
  if (!helpButton || !helpBox) return;
  helpButton.addEventListener("click", () => helpBox.classList.toggle("hidden"));
}

// Einheitliche Rückmeldungen: knapp, positiv und mit fachlichem Hinweis.
function feedback(message, type = "info") {
  let box = app.querySelector(".feedback");
  if (!box) {
    box = document.querySelector("#feedbackTemplate").content.firstElementChild.cloneNode(true);
    app.append(box);
  }
  box.className = `feedback ${type}`;
  box.textContent = message;
}

function clearFeedback() {
  app.querySelector(".feedback")?.remove();
}

function addNextButton(label = "Weiter") {
  const row = document.createElement("div");
  row.className = "button-row";
  row.innerHTML = `<button class="primary-button" type="button">${label}</button>`;
  row.querySelector("button").addEventListener("click", nextScreen);
  app.append(row);
}

// Nach zwei Fehlversuchen erscheint ein stärkerer Tipp.
function handleWrong(firstTip, secondTip) {
  state.attempts += 1;
  updateProgress();
  feedback(state.attempts >= 2 ? secondTip : firstTip, "error");
}

function renderStart() {
  app.innerHTML = `
    <div class="screen-header">
      <div>
        <h2>Redoxreaktionen von Metallen</h2>
        <p>Bei manchen Redoxreaktionen wird Sauerstoff von einem Metalloxid auf ein anderes Metall übertragen. Ob das klappt, entscheidest du mit der Redoxreihe.</p>
      </div>
    </div>
    <div class="reaction-line">unedel → Magnesium – Aluminium – Zink – Eisen – Blei – Kupfer – Silber – Gold → edel</div>
    <div class="button-row">
      <button class="primary-button" type="button" id="startButton">Lernprogramm starten</button>
    </div>
  `;
  app.querySelector("#startButton").addEventListener("click", nextScreen);
}

function renderStationOne() {
  const pair = stationOnePairs[state.stationOneIndex];
  const choices = shuffle(pair);
  const correct = pair.reduce((best, metal) => (isLessNoble(metal, best) ? metal : best));
  app.innerHTML = `
    ${header(
      "Wer zieht Sauerstoff stärker an?",
      "Welches Metall nimmt Sauerstoff leichter auf?",
      "Schau in der Redoxreihe nach: Weiter links bedeutet unedler und nimmt Sauerstoff leichter auf."
    )}
    <div class="choice-grid">
      ${choices.map((metal) => `<button class="metal-card" type="button" data-metal="${metal}">${metal}</button>`).join("")}
    </div>
  `;
  attachHelp();
  app.querySelectorAll("[data-metal]").forEach((button) => {
    button.addEventListener("click", () => {
      clearFeedback();
      app.querySelectorAll("[data-metal]").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      const chosen = button.dataset.metal;
      if (chosen === correct) {
        feedback(`Richtig! ${chosen} ist unedler als ${pair.find((metal) => metal !== chosen)}. Deshalb nimmt ${chosen} Sauerstoff leichter auf.`, "success");
        state.stationOneIndex += 1;
        if (state.stationOneIndex >= stationOnePairs.length) {
          state.stationOneIndex = 0;
          addNextButton();
        } else {
          const row = document.createElement("div");
          row.className = "button-row";
          row.innerHTML = `<button class="primary-button" type="button">Nächstes Paar</button>`;
          row.querySelector("button").addEventListener("click", () => {
            state.attempts = 0;
            renderStationOne();
            updateProgress();
          });
          app.append(row);
        }
        app.querySelectorAll("[data-metal]").forEach((item) => (item.disabled = true));
      } else {
        handleWrong(
          "Noch nicht ganz. Schau auf die Redoxreihe: Das Metall weiter links ist unedler.",
          `Stärkerer Tipp: ${correct} steht links von ${chosen}. Deshalb nimmt ${correct} Sauerstoff leichter auf.`
        );
      }
    });
  });
}

function cardButton(label, id) {
  return `<button class="metal-card small" type="button" draggable="true" data-card="${id}">${label}</button>`;
}

function initCardPlacement(container, zones, onPlace) {
  const cards = container.querySelectorAll("[data-card]");
  const dropZones = container.querySelectorAll("[data-zone]");

  // Drag-and-drop und Klick-zum-Auswählen laufen parallel für Touchscreens.
  cards.forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.card);
    });
    card.addEventListener("click", () => {
      cards.forEach((item) => item.classList.remove("is-selected"));
      state.selectedCard = card.dataset.card;
      card.classList.add("is-selected");
    });
  });

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("drag-over");
      onPlace(event.dataTransfer.getData("text/plain"), zone.dataset.zone);
    });
    zone.addEventListener("click", () => {
      if (state.selectedCard) onPlace(state.selectedCard, zone.dataset.zone);
    });
  });
}

function placeInZone(cardId, zoneId) {
  const zone = app.querySelector(`[data-zone="${zoneId}"] .drop-content`);
  const card = app.querySelector(`[data-card="${cardId}"]`);
  if (!zone || !card) return;
  const oldZone = app.querySelector(`.drop-content[data-holds="${cardId}"]`);
  if (oldZone) {
    oldZone.textContent = "hier ablegen";
    oldZone.classList.remove("has-card");
    delete oldZone.dataset.holds;
  }
  zone.textContent = card.textContent;
  zone.classList.add("has-card");
  zone.dataset.holds = cardId;
  card.classList.remove("is-selected");
  state.selectedCard = null;
}

function readZones() {
  return [...app.querySelectorAll("[data-zone]")].reduce((result, zone) => {
    const content = zone.querySelector(".drop-content");
    result[zone.dataset.zone] = content.dataset.holds || "";
    return result;
  }, {});
}

function renderStationTwo() {
  const reaction = reactions[0];
  const cards = shuffle([
    oxide(reaction.oxideMetal),
    reaction.freeMetal,
    reaction.oxideMetal,
    oxide(reaction.freeMetal),
    oxide("Silber"),
    "Blei"
  ]);
  app.innerHTML = `
    ${header(
      "Baue eine mögliche Redoxreaktion",
      "Ziehe oder tippe Karten in die vier Felder. Das freie Metall muss unedler sein als das Metall im Metalloxid.",
      "Erst links prüfen: Welches Metall steckt im Metalloxid? Dann suche ein freies Metall, das weiter links in der Redoxreihe steht."
    )}
    <div class="cards-grid">${cards.map((label) => cardButton(label, label)).join("")}</div>
    <div class="drop-grid">
      ${["Metalloxid", "Metall", "entstehendes Metall", "entstehendes Metalloxid"].map((label, index) => `
        <div class="drop-zone" tabindex="0" data-zone="slot${index}">
          <span class="drop-label">${label}</span>
          <span class="drop-content">hier ablegen</span>
        </div>
      `).join("")}
    </div>
    <div class="button-row">
      <button class="primary-button" type="button" id="checkReaction">Prüfen</button>
    </div>
  `;
  attachHelp();
  initCardPlacement(app, null, placeInZone);
  app.querySelector("#checkReaction").addEventListener("click", () => {
    const zones = readZones();
    const correct =
      zones.slot0 === oxide(reaction.oxideMetal) &&
      zones.slot1 === reaction.freeMetal &&
      zones.slot2 === reaction.oxideMetal &&
      zones.slot3 === oxide(reaction.freeMetal);
    if (correct) {
      feedback(`Das passt! ${reaction.explanation}`, "success");
      addNextButton();
    } else {
      handleWrong(
        "Prüfe noch einmal: Das freie Metall muss unedler sein als das Metall im Metalloxid.",
        `Stärkerer Tipp: Eine passende Reaktion ist ${reactionText(reaction)}.`
      );
    }
  });
}

function renderStationThree() {
  const reaction = reactions[3];
  const cards = shuffle([oxide(reaction.oxideMetal), reaction.freeMetal]);
  const reductionButtons = shuffle(["Reduktion", "Oxidation"]);
  const oxidationButtons = shuffle(["Reduktion", "Oxidation"]);
  let start = "";
  let target = "";
  let reductionChoice = "";
  let oxidationChoice = "";
  app.innerHTML = `
    ${header(
      "Sauerstoff-Pfeil setzen",
      "Klicke zuerst den Stoff an, der Sauerstoff abgibt. Klicke danach den Stoff an, der Sauerstoff aufnimmt.",
      "Der Sauerstoff startet beim Metalloxid und landet beim unedleren freien Metall."
    )}
    <div class="reaction-line">${reactionText(reaction)}</div>
    <div class="oxygen-area">
      ${cards.map((label) => `<button class="metal-card" type="button" data-oxygen-card="${label}">${label}</button>`).join('<div class="oxygen-arrow">Sauerstoff</div>')}
    </div>
    <div class="tip-box" id="arrowChoice">Noch kein Pfeil gesetzt.</div>
    <section class="hidden" id="meaningArea">
      <h3>Was bedeutet das?</h3>
      <p>Sauerstoff abgeben bedeutet …</p>
      <div class="button-row" data-meaning="reduction">
        ${reductionButtons.map((value) => `<button class="choice-button" type="button" data-value="${value}">${value}</button>`).join("")}
      </div>
      <p>Sauerstoff aufnehmen bedeutet …</p>
      <div class="button-row" data-meaning="oxidation">
        ${oxidationButtons.map((value) => `<button class="choice-button" type="button" data-value="${value}">${value}</button>`).join("")}
      </div>
      <div class="button-row">
        <button class="primary-button" type="button" id="checkOxygen">Prüfen</button>
      </div>
    </section>
  `;
  attachHelp();
  const choiceBox = app.querySelector("#arrowChoice");
  app.querySelectorAll("[data-oxygen-card]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!start || (start && target)) {
        app.querySelectorAll("[data-oxygen-card]").forEach((item) => item.classList.remove("is-selected"));
        start = button.dataset.oxygenCard;
        target = "";
        button.classList.add("is-selected");
        choiceBox.textContent = `Start: ${start}. Wähle jetzt das Ziel.`;
      } else {
        target = button.dataset.oxygenCard;
        button.classList.add("is-selected");
        choiceBox.textContent = `Dein Sauerstoff-Pfeil: ${start} → ${target}`;
        app.querySelector("#meaningArea").classList.remove("hidden");
      }
    });
  });
  app.querySelectorAll("[data-meaning] button").forEach((button) => {
    button.addEventListener("click", () => {
      button.parentElement.querySelectorAll("button").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      if (button.parentElement.dataset.meaning === "reduction") reductionChoice = button.dataset.value;
      if (button.parentElement.dataset.meaning === "oxidation") oxidationChoice = button.dataset.value;
    });
  });
  app.querySelector("#checkOxygen").addEventListener("click", () => {
    const correctArrow = start === oxide(reaction.oxideMetal) && target === reaction.freeMetal;
    const correctMeanings = reductionChoice === "Reduktion" && oxidationChoice === "Oxidation";
    if (correctArrow && correctMeanings) {
      feedback(`Genau! Das ${oxide(reaction.oxideMetal)} gibt Sauerstoff ab. Es wird reduziert. ${reaction.freeMetal} nimmt Sauerstoff auf. Es wird oxidiert.`, "success");
      addNextButton();
    } else {
      handleWrong(
        "Noch nicht ganz. Der Sauerstoff wandert vom Metalloxid zum unedleren Metall.",
        "Stärkerer Tipp: Bleioxid gibt Sauerstoff ab. Zink nimmt Sauerstoff auf. Abgeben heißt Reduktion, Aufnehmen heißt Oxidation."
      );
    }
  });
}

function hasSameItems(actual, expected) {
  return actual.length === expected.length && expected.every((item) => actual.includes(item));
}

function renderStationFive() {
  const task = misconceptionTasks[state.stationFiveIndex];
  const corrections = task.correct ? [] : shuffle([task.correction, ...task.wrongOptions]);
  const truthChoices = shuffle([
    { label: "stimmt", value: "true" },
    { label: "stimmt nicht", value: "false" }
  ]);
  let firstAnswer = null;
  let correctionChoice = null;
  app.innerHTML = `
    ${header(
      "Fehlerdetektiv",
      "Entscheide, ob die Aussage stimmt. Wenn sie falsch ist, wähle die beste Korrektur.",
      "Achte genau auf die Wörter oxidiert, reduziert, Reduktionsmittel und Oxidationsmittel."
    )}
    <div class="statement-box">„${task.statement}“</div>
    <p>Stimmt diese Aussage?</p>
    <div class="button-row">
      ${truthChoices.map((choice) => `<button class="choice-button" type="button" data-truth="${choice.value}">${choice.label}</button>`).join("")}
    </div>
    <section class="tip-box hidden" id="correctionArea">
      <h3>Welche Korrektur passt?</h3>
      <div class="choice-grid">
        ${corrections.map((text) => `<button class="choice-button" type="button" data-correction="${text}">${text}</button>`).join("")}
      </div>
    </section>
    <div class="button-row">
      <button class="primary-button" type="button" id="checkStatement">Prüfen</button>
    </div>
  `;
  attachHelp();
  app.querySelectorAll("[data-truth]").forEach((button) => {
    button.addEventListener("click", () => {
      app.querySelectorAll("[data-truth]").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      firstAnswer = button.dataset.truth === "true";
      app.querySelector("#correctionArea").classList.toggle("hidden", firstAnswer !== false || task.correct);
    });
  });
  app.querySelectorAll("[data-correction]").forEach((button) => {
    button.addEventListener("click", () => {
      app.querySelectorAll("[data-correction]").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      correctionChoice = button.dataset.correction;
    });
  });
  app.querySelector("#checkStatement").addEventListener("click", () => {
    const correct = task.correct ? firstAnswer === true : firstAnswer === false && correctionChoice === task.correction;
    if (correct) {
      feedback(task.explanation, "success");
      state.stationFiveIndex += 1;
      if (state.stationFiveIndex >= misconceptionTasks.length) {
        state.stationFiveIndex = 0;
        addNextButton();
      } else {
        const row = document.createElement("div");
        row.className = "button-row";
        row.innerHTML = `<button class="primary-button" type="button">Nächste Aussage</button>`;
        row.querySelector("button").addEventListener("click", () => {
          state.attempts = 0;
          renderStationFive();
          updateProgress();
        });
        app.append(row);
      }
    } else {
      handleWrong(
        "Das passt noch nicht. Lies die Aussage Wort für Wort und vergleiche sie mit der Redoxreihe.",
        task.correct ? "Stärkerer Tipp: Diese Aussage stimmt." : `Stärkerer Tipp: Die passende Korrektur beginnt so: ${task.correction}`
      );
    }
  });
}

function renderStationSix() {
  const scenario = labScenarios[state.labIndex];
  const options = shuffle(scenario.options);
  app.innerHTML = `
    ${header(
      "Laborentscheidung",
      "Wähle alle Metalle aus, die als Reduktionsmittel passen.",
      "Passende Metalle stehen links vom Metall, das im Metalloxid steckt."
    )}
    <div class="statement-box">${scenario.prompt}</div>
    <div class="checkbox-grid">
      ${options.map((metal) => `<button class="check-card" type="button" data-check="${metal}" aria-pressed="false">${metal}</button>`).join("")}
    </div>
    <div class="button-row">
      <button class="primary-button" type="button" id="checkLab">Auswahl prüfen</button>
    </div>
  `;
  attachHelp();
  app.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("is-selected");
      button.setAttribute("aria-pressed", button.classList.contains("is-selected") ? "true" : "false");
    });
  });
  app.querySelector("#checkLab").addEventListener("click", () => {
    const selected = [...app.querySelectorAll("[data-check].is-selected")].map((button) => button.dataset.check);
    const correct = hasSameItems(selected, scenario.correct);
    if (correct) {
      feedback(scenario.explanation, "success");
      state.labIndex += 1;
      if (state.labIndex >= labScenarios.length) {
        state.labIndex = 0;
        addNextButton();
      } else {
        const row = document.createElement("div");
        row.className = "button-row";
        row.innerHTML = `<button class="primary-button" type="button">Nächste Entscheidung</button>`;
        row.querySelector("button").addEventListener("click", () => {
          state.attempts = 0;
          renderStationSix();
          updateProgress();
        });
        app.append(row);
      }
    } else {
      handleWrong(
        "Prüfe noch einmal: Es zählen alle Metalle links vom Metall im Metalloxid.",
        `Stärkerer Tipp: Richtig sind ${scenario.correct.join(", ")}.`
      );
    }
  });
}

function renderFinish() {
  app.innerHTML = `
    <div class="screen-header">
      <div>
        <h2>Geschafft!</h2>
        <p>Du hast geübt, wie Sauerstoff bei Redoxreaktionen übertragen wird.</p>
      </div>
    </div>
    <ol class="summary-list">
      <li>Oxidation bedeutet Sauerstoffaufnahme.</li>
      <li>Reduktion bedeutet Sauerstoffabgabe.</li>
      <li>Ein unedleres Metall kann einem Metalloxid eines edleren Metalls Sauerstoff entziehen.</li>
    </ol>
    <div class="button-row">
      <button class="primary-button" type="button" id="restart">Noch einmal üben</button>
      <button class="secondary-button" type="button" id="showSeries">Redoxreihe anzeigen</button>
    </div>
  `;
  app.querySelector("#restart").addEventListener("click", () => setScreen(0));
  app.querySelector("#showSeries").addEventListener("click", () => {
    seriesPanel.classList.remove("is-hidden");
    seriesToggle.setAttribute("aria-expanded", "true");
  });
}

seriesToggle.addEventListener("click", () => {
  const hidden = seriesPanel.classList.toggle("is-hidden");
  seriesToggle.setAttribute("aria-expanded", hidden ? "false" : "true");
});

renderSeries();
setScreen(0);
