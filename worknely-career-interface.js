
/*
 * WORKNELY V7.18.2.2
 * Career Intelligence Interface
 * International Edition
 * Local Processing & Optional Cloud History
 */

(function () {
  "use strict";

  const VERSION = "7.18.2.2";
  const ROOT_ID = "wnCareerIntelligence";

  const LANGUAGES = [
    "en", "ro", "it", "de", "fr", "es"
  ];

  const TOOLS = [
    {
      id: "ats",
      icon: "◎",
      label: [
        "Advanced ATS Intelligence",
        "Analiză ATS avansată",
        "Analisi ATS avanzata",
        "Erweiterte ATS-Analyse",
        "Analyse ATS avancée",
        "Análisis ATS avanzado"
      ]
    },
    {
      id: "skill-gap",
      icon: "◈",
      label: [
        "Skill Gap Intelligence",
        "Analiza competențelor",
        "Analisi delle competenze",
        "Kompetenzanalyse",
        "Analyse des compétences",
        "Análisis de competencias"
      ]
    },
    {
      id: "resume-optimizer",
      icon: "✦",
      label: [
        "Smart Resume Optimization",
        "Optimizare inteligentă CV",
        "Ottimizzazione CV",
        "Lebenslaufoptimierung",
        "Optimisation du CV",
        "Optimización del CV"
      ]
    },
    {
      id: "career-match",
      icon: "◇",
      label: [
        "Career Match Intelligence",
        "Compatibilitate profesională",
        "Compatibilità professionale",
        "Karriereabgleich",
        "Compatibilité professionnelle",
        "Compatibilidad profesional"
      ]
    },
    {
      id: "interview-preparation",
      icon: "◉",
      label: [
        "Interview Preparation",
        "Pregătire pentru interviu",
        "Preparazione al colloquio",
        "Bewerbungsgespräch",
        "Préparation à l’entretien",
        "Preparación de entrevistas"
      ]
    },
    {
      id: "cover-letter",
      icon: "✉",
      label: [
        "Cover Letter Studio",
        "Scrisoare de intenție",
        "Lettera di presentazione",
        "Bewerbungsschreiben",
        "Lettre de motivation",
        "Carta de presentación"
      ]
    },
    {
      id: "career-action-plan",
      icon: "✓",
      label: [
        "Career Action Plan",
        "Plan de dezvoltare profesională",
        "Piano di carriera",
        "Karriereplan",
        "Plan de carrière",
        "Plan de carrera"
      ]
    }
  ];

  const D = {
    title: [
      "Career Intelligence",
      "Inteligență profesională",
      "Career Intelligence",
      "Karriereintelligenz",
      "Intelligence professionnelle",
      "Inteligencia profesional"
    ],
    intro: [
      "Explore seven tools for your professional development.",
      "Explorează șapte instrumente pentru dezvoltarea ta profesională.",
      "Esplora sette strumenti per la tua crescita professionale.",
      "Entdecke sieben Werkzeuge für deine berufliche Entwicklung.",
      "Découvrez sept outils de développement professionnel.",
      "Explora siete herramientas para tu desarrollo profesional."
    ],
    source: [
      "Resume source",
      "Sursa CV-ului",
      "Origine del CV",
      "Lebenslaufquelle",
      "Source du CV",
      "Origen del CV"
    ],
    builder: [
      "Resume Builder",
      "Creator de CV",
      "Creatore di CV",
      "Lebenslauf-Builder",
      "Créateur de CV",
      "Creador de CV"
    ],
    comparison: [
      "Career Analysis",
      "Analiza carierei",
      "Analisi della carriera",
      "Karriereanalyse",
      "Analyse de carrière",
      "Análisis profesional"
    ],
    manual: [
      "Enter text manually",
      "Introdu textul manual",
      "Inserisci il testo",
      "Text manuell eingeben",
      "Saisir le texte",
      "Introducir texto"
    ],
    resume: [
      "Resume text",
      "Textul CV-ului",
      "Testo del CV",
      "Lebenslauftext",
      "Texte du CV",
      "Texto del CV"
    ],
    job: [
      "Job description",
      "Descrierea jobului",
      "Descrizione del lavoro",
      "Stellenbeschreibung",
      "Description du poste",
      "Descripción del empleo"
    ],
    role: [
      "Target role",
      "Funcția dorită",
      "Ruolo desiderato",
      "Zielposition",
      "Poste souhaité",
      "Puesto deseado"
    ],
    company: [
      "Company (optional)",
      "Companie (opțional)",
      "Azienda (facoltativa)",
      "Unternehmen (optional)",
      "Entreprise (facultatif)",
      "Empresa (opcional)"
    ],
    run: [
      "Generate results",
      "Generează rezultatele",
      "Genera risultati",
      "Ergebnisse erstellen",
      "Générer les résultats",
      "Generar resultados"
    ],
    loading: [
      "Loading Career Intelligence...",
      "Se încarcă instrumentele profesionale...",
      "Caricamento degli strumenti...",
      "Karrierewerkzeuge werden geladen...",
      "Chargement des outils...",
      "Cargando herramientas..."
    ],
    processing: [
      "Processing...",
      "Se procesează...",
      "Elaborazione...",
      "Verarbeitung...",
      "Traitement...",
      "Procesando..."
    ],
    ready: [
      "Modules available",
      "Module disponibile",
      "Moduli disponibili",
      "Verfügbare Module",
      "Modules disponibles",
      "Módulos disponibles"
    ],
    unavailable: [
      "Module unavailable. Check the diagnostics.",
      "Modul indisponibil. Verifică diagnosticul.",
      "Modulo non disponibile. Verifica la diagnostica.",
      "Modul nicht verfügbar. Diagnose prüfen.",
      "Module indisponible. Vérifiez le diagnostic.",
      "Módulo no disponible. Revisa el diagnóstico."
    ],
    retry: [
      "Retry loading",
      "Reîncearcă încărcarea",
      "Riprova",
      "Erneut laden",
      "Réessayer",
      "Reintentar"
    ],
    error: [
      "Unable to complete the operation.",
      "Operațiunea nu a putut fi finalizată.",
      "Impossibile completare l’operazione.",
      "Vorgang fehlgeschlagen.",
      "Impossible de terminer l’opération.",
      "No se pudo completar la operación."
    ],
    controller: [
      "Career Controller is missing.",
      "Career Controller nu este încărcat.",
      "Career Controller non disponibile.",
      "Career Controller fehlt.",
      "Career Controller indisponible.",
      "Career Controller no disponible."
    ],
    diagnostics: [
      "Module diagnostics",
      "Diagnostic module",
      "Diagnostica moduli",
      "Moduldiagnose",
      "Diagnostic des modules",
      "Diagnóstico de módulos"
    ],
    results: [
      "Your results",
      "Rezultatele tale",
      "I tuoi risultati",
      "Deine Ergebnisse",
      "Vos résultats",
      "Tus resultados"
    ],
    score: [
      "Estimated score",
      "Scor estimativ",
      "Punteggio stimato",
      "Geschätzter Wert",
      "Score estimé",
      "Puntuación estimada"
    ],
    matched: [
      "Matched skills",
      "Competențe identificate",
      "Competenze corrispondenti",
      "Passende Kompetenzen",
      "Compétences correspondantes",
      "Competencias coincidentes"
    ],
    missing: [
      "Skills to review",
      "Competențe de îmbunătățit",
      "Competenze da rivedere",
      "Zu prüfende Kompetenzen",
      "Compétences à revoir",
      "Competencias por revisar"
    ],
    recommendations: [
      "Recommendations",
      "Recomandări",
      "Raccomandazioni",
      "Empfehlungen",
      "Recommandations",
      "Recomendaciones"
    ],
    questions: [
      "Interview questions",
      "Întrebări pentru interviu",
      "Domande per il colloquio",
      "Interviewfragen",
      "Questions d’entretien",
      "Preguntas de entrevista"
    ],
    copy: [
      "Copy result",
      "Copiază rezultatul",
      "Copia risultato",
      "Ergebnis kopieren",
      "Copier le résultat",
      "Copiar resultado"
    ],
    copied: [
      "Copied",
      "Copiat",
      "Copiato",
      "Kopiert",
      "Copié",
      "Copiado"
    ],
    duration: [
      "Plan duration",
      "Durata planului",
      "Durata del piano",
      "Plandauer",
      "Durée du plan",
      "Duración del plan"
    ],
    days: [
      "days", "zile", "giorni",
      "Tage", "jours", "días"
    ],
    day: [
      "Day", "Ziua", "Giorno",
      "Tag", "Jour", "Día"
    ],
    minutes: [
      "Minutes per day",
      "Minute pe zi",
      "Minuti al giorno",
      "Minuten pro Tag",
      "Minutes par jour",
      "Minutos al día"
    ],
    progress: [
      "Plan progress",
      "Progresul planului",
      "Progresso del piano",
      "Planfortschritt",
      "Progression du plan",
      "Progreso del plan"
    ],
    privacy: [
      "Local, rule-based analysis. Results are estimates, not hiring guarantees.",
      "Analiză locală bazată pe reguli. Rezultatele sunt estimative, fără garanția angajării.",
      "Analisi locale basata su regole. Nessuna garanzia di assunzione.",
      "Lokale regelbasierte Analyse. Keine Einstellungsgarantie.",
      "Analyse locale fondée sur des règles. Aucune garantie de recrutement.",
      "Análisis local basado en reglas. Sin garantía de contratación."
    ],
    needResume: [
      "Enter resume information first.",
      "Introdu mai întâi informațiile CV-ului.",
      "Inserisci prima i dati del CV.",
      "Gib zuerst Lebenslaufdaten ein.",
      "Saisissez d’abord les données du CV.",
      "Introduce primero los datos del CV."
    ],
    needJob: [
      "Enter a job description.",
      "Introdu descrierea jobului.",
      "Inserisci una descrizione del lavoro.",
      "Gib eine Stellenbeschreibung ein.",
      "Saisissez une description du poste.",
      "Introduce una descripción del empleo."
    ]
  };

  let root = null;
  let controller = null;
  let activeTool = "ats";
  let busy = false;
  let revision = 0;
  let loadRevision = 0;
  let loading = false;
  let planSession = null;
  let lastResult = null;
  let initialized = false;

  const state = {
    source: "builder",
    resumeText: "",
    jobDescription: "",
    targetRole: "",
    company: "",
    duration: 14,
    dailyMinutes: 30
  };

  const refs = {};

  function getLanguage() {
    const language =
      window.WorknelyLocalization?.getLanguage?.() ||
      document.getElementById("language")?.value ||
      document.documentElement.lang ||
      "en";

    return LANGUAGES.includes(language)
      ? language : "en";
  }

  function tr(key) {
    return D[key]?.[
      LANGUAGES.indexOf(getLanguage())
    ] || D[key]?.[0] || key;
  }

  function toolLabel(tool) {
    return tool.label[
      LANGUAGES.indexOf(getLanguage())
    ] || tool.label[0];
  }

  function make(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined) {
      element.textContent = String(text);
    }

    return element;
  }

  function button(text, callback, primary) {
    const element = make(
      "button",
      primary ? "wnci-primary" : "wnci-button",
      text
    );

    element.type = "button";
    element.addEventListener("click", callback);

    return element;
  }

  function installStyles() {
    if (
      document.getElementById("wnci-styles")
    ) return;

    const style = document.createElement("style");

    style.id = "wnci-styles";

    style.textContent = `
      #wnCareerIntelligence {
        width:100%;
        min-width:0;
        color:#20123f;
        overflow-wrap:anywhere;
      }

      #wnCareerIntelligence *,
      #wnCareerIntelligence *::before,
      #wnCareerIntelligence *::after {
        box-sizing:border-box;
      }

      #wnCareerIntelligence h2 {
        font-size:23px;
        line-height:1.25;
        margin:0 0 8px;
        letter-spacing:-.6px;
      }

      #wnCareerIntelligence h3 {
        font-size:16px;
        margin:0 0 12px;
      }

      .wnci-intro {
        color:#746c85;
        font-size:13px;
        line-height:1.6;
        margin:0 0 16px;
      }

      .wnci-grid {
        display:grid;
        grid-template-columns:
          repeat(2,minmax(0,1fr));
        gap:8px;
        margin:12px 0 18px;
      }

      .wnci-tool {
        display:flex;
        align-items:center;
        gap:8px;
        width:100%;
        min-width:0;
        min-height:60px;
        border:1px solid #e4dbfa;
        border-radius:12px;
        background:#fff;
        color:#20123f;
        text-align:left;
        font:inherit;
        font-size:12px;
        font-weight:700;
        padding:10px;
        cursor:pointer;
        white-space:normal;
      }

      .wnci-tool[aria-pressed="true"] {
        border-color:#6840ff;
        background:#f1ebff;
        color:#5424ff;
      }

      .wnci-icon {
        display:grid;
        place-items:center;
        flex:0 0 30px;
        width:30px;
        height:30px;
        border-radius:9px;
        background:#ede6ff;
        color:#5424ff;
        font-size:19px;
      }

      .wnci-panel {
        background:#fff;
        border:1px solid #e9e2f4;
        border-radius:14px;
        padding:15px;
        margin:12px 0;
        min-width:0;
      }

      .wnci-field {
        display:flex;
        flex-direction:column;
        gap:6px;
        margin:10px 0;
        font-size:12px;
        font-weight:700;
      }

      #wnCareerIntelligence input,
      #wnCareerIntelligence select,
      #wnCareerIntelligence textarea {
        width:100%;
        min-width:0;
        max-width:100%;
        background:#faf9ff;
        color:#20123f;
        border:1px solid #e4dbf4;
        border-radius:9px;
        padding:11px;
        font:inherit;
        font-size:16px;
      }

      #wnCareerIntelligence textarea {
        min-height:115px;
        resize:vertical;
        line-height:1.5;
      }

      .wnci-primary,
      .wnci-button {
        min-height:44px;
        padding:11px 14px;
        border:1px solid #e3d9ff;
        border-radius:10px;
        font:inherit;
        font-size:13px;
        font-weight:750;
        cursor:pointer;
        white-space:normal;
        touch-action:manipulation;
      }

      .wnci-primary {
        width:100%;
        background:
          linear-gradient(105deg,#5424ff,#ec22ad);
        color:white;
        border:0;
        margin-top:12px;
      }

      .wnci-button {
        color:#5424ff;
        background:#f5f1ff;
        margin:6px 0;
      }

      #wnCareerIntelligence button:disabled {
        opacity:.55;
        cursor:default;
      }

      .wnci-status {
        background:#f3efff;
        border:1px solid #dfd3ff;
        color:#5424ff;
        padding:12px;
        border-radius:10px;
        font-size:13px;
        margin:10px 0;
        line-height:1.5;
      }

      .wnci-status[data-error="true"] {
        color:#a92337;
        background:#fff1f2;
        border-color:#fecdd3;
      }

      .wnci-score {
        font-size:38px;
        font-weight:850;
        color:#5424ff;
        margin:8px 0;
      }

      .wnci-list {
        padding-left:20px;
        font-size:13px;
        line-height:1.7;
      }

      .wnci-list li {
        margin-bottom:7px;
      }

      .wnci-output {
        white-space:pre-wrap;
        overflow-wrap:anywhere;
        font:inherit;
        font-size:13px;
        line-height:1.7;
      }

      .wnci-task {
        display:flex;
        align-items:flex-start;
        gap:10px;
        border-bottom:1px solid #eee8f6;
        padding:12px 0;
      }

      #wnCareerIntelligence
      .wnci-task input {
        flex:0 0 20px;
        width:20px;
        height:20px;
        accent-color:#5424ff;
      }

      .wnci-task strong {
        font-size:13px;
        display:block;
      }

      .wnci-task p {
        font-size:12px;
        color:#746c85;
        margin:6px 0;
      }

      .wnci-progress {
        width:100%;
        height:10px;
        accent-color:#5424ff;
        margin:8px 0;
      }

      .wnci-diagnostics {
        margin:12px 0;
        font-size:12px;
        line-height:1.6;
      }

      .wnci-diagnostics summary {
        cursor:pointer;
        color:#5424ff;
        padding:10px 0;
        font-weight:700;
      }

      .wnci-privacy {
        font-size:11px;
        color:#746c85;
        line-height:1.6;
        margin:14px 0;
      }


      /* Career Intelligence responsive safeguards */
      #wnCareerIntelligence,
      #wnCareerIntelligence .wnci-panel,
      #wnCareerIntelligence .wnci-grid,
      #wnCareerIntelligence .wnci-field,
      #wnCareerIntelligence .wnci-list,
      #wnCareerIntelligence .wnci-task,
      #wnCareerIntelligence .wnci-diagnostics {
        min-width:0;
        max-width:100%;
      }

      #wnCareerIntelligence .wnci-tool > span:last-child,
      #wnCareerIntelligence .wnci-task > div {
        min-width:0;
        overflow-wrap:anywhere;
        white-space:normal;
      }

      #wnCareerIntelligence button {
        min-width:0;
        max-width:100%;
        overflow-wrap:anywhere;
        white-space:normal;
      }

      #wnCareerIntelligence [hidden] {
        display:none !important;
      }

      #wnCareerIntelligence .wnci-skill-priority {
        font-size:11px;
        font-weight:700;
        color:#5424ff;
        margin:4px 0;
      }

      #wnCareerIntelligence .wnci-skill-guidance {
        color:#746c85;
        font-size:13px;
        line-height:1.6;
        margin:5px 0 12px;
      }

      @media(max-width:360px) {
        .wnci-grid {
          grid-template-columns:1fr;
        }
        .wnci-panel {
          padding:11px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function setStatus(message, error = false) {
    if (!refs.status) return;

    refs.status.textContent = message;
    refs.status.dataset.error = String(error);
    refs.status.hidden = !message;
  }

  function clearResults() {
    revision++;
    busy = false;
    planSession = null;
    lastResult = null;

    if (refs.output) {
      refs.output.replaceChildren();
      refs.output.hidden = true;
    }

    if (refs.run) {
      refs.run.disabled = loading;
    }
  }

  function clearPrivateState() {
    clearResults();

    state.resumeText = "";
    state.jobDescription = "";
    state.targetRole = "";
    state.company = "";

    ["resumeText", "jobDescription",
      "targetRole", "company"
    ].forEach(key => {
      if (refs[key]) {
        refs[key].value = "";
      }
    });
  }

  function makeField(
    key, labelKey, type, options
  ) {
    const wrapper = make(
      "label", "wnci-field"
    );

    wrapper.appendChild(
      make("span", "", tr(labelKey))
    );

    let field;

    if (type === "select") {
      field = make("select");

      options.forEach(option => {
        const item = make(
          "option", "", option.label
        );
        item.value = option.value;
        field.appendChild(item);
      });

    } else if (type === "textarea") {
      field = make("textarea");
      field.rows = 5;
      field.maxLength = 150000;

    } else {
      field = make("input");
      field.type = type || "text";

      if (type === "number") {
        field.min = "15";
        field.max = "180";
        field.step = "15";
      } else {
        field.maxLength = 200;
      }
    }

    field.id = "wnci-" + key;
    field.value = String(state[key] ?? "");

    const eventName =
      type === "select" ? "change" : "input";

    field.addEventListener(eventName, () => {
      state[key] =
        type === "number" ||
        key === "duration"
          ? Number(field.value)
          : field.value;

      controller?.closeSession?.(
        "career-action-plan"
      );

      clearResults();

      if (key === "source") {
        updateFields();
      }
    });

    refs[key] = field;
    refs[key + "Wrapper"] = wrapper;

    wrapper.appendChild(field);

    return wrapper;
  }

  function updateFields() {
    if (!refs.resumeTextWrapper) return;

    refs.resumeTextWrapper.hidden =
      state.source !== "manual";

    refs.companyWrapper.hidden =
      activeTool !== "cover-letter";

    const plan =
      activeTool === "career-action-plan";

    refs.durationWrapper.hidden = !plan;
    refs.dailyMinutesWrapper.hidden = !plan;

    if (refs.toolTitle) {
      refs.toolTitle.textContent = toolLabel(
        TOOLS.find(t => t.id === activeTool)
      );
    }

    root.querySelectorAll(
      "[data-wnci-tool]"
    ).forEach(element => {
      element.setAttribute(
        "aria-pressed",
        String(
          element.dataset.wnciTool === activeTool
        )
      );
    });
  }

  function selectTool(id) {
    if (!TOOLS.some(tool => tool.id === id)) {
      return;
    }

    controller?.closeSession?.(
      "career-action-plan"
    );

    activeTool = id;
    controller?.setActiveModule?.(id);

    clearResults();
    updateFields();
    updateDiagnostics();
  }

  function render() {
    if (!root) return;

    root.replaceChildren();

    root.appendChild(
      make("h2", "", tr("title"))
    );

    root.appendChild(
      make("p", "wnci-intro", tr("intro"))
    );

    const grid = make("div", "wnci-grid");

    TOOLS.forEach(tool => {
      const element = make(
        "button", "wnci-tool"
      );

      element.type = "button";
      element.dataset.wnciTool = tool.id;

      element.append(
        make("span", "wnci-icon", tool.icon),
        make("span", "", toolLabel(tool))
      );

      element.addEventListener(
        "click", () => selectTool(tool.id)
      );

      grid.appendChild(element);
    });

    root.appendChild(grid);

    refs.status = make(
      "p", "wnci-status", tr("loading")
    );

    refs.status.setAttribute("role", "status");
    refs.status.setAttribute("aria-live", "polite");

    root.appendChild(refs.status);

    const panel = make("div", "wnci-panel");

    refs.toolTitle = make("h3");

    panel.appendChild(refs.toolTitle);

    panel.appendChild(
      makeField("source", "source", "select", [
        {
          value: "builder",
          label: tr("builder")
        },
        {
          value: "comparison",
          label: tr("comparison")
        },
        {
          value: "manual",
          label: tr("manual")
        }
      ])
    );

    panel.appendChild(
      makeField(
        "resumeText", "resume", "textarea"
      )
    );

    panel.appendChild(
      makeField(
        "jobDescription", "job", "textarea"
      )
    );

    panel.appendChild(
      makeField("targetRole", "role", "text")
    );

    panel.appendChild(
      makeField("company", "company", "text")
    );

    panel.appendChild(
      makeField("duration", "duration", "select",
        [7, 14, 30].map(value => ({
          value: String(value),
          label: value + " " + tr("days")
        }))
      )
    );

    panel.appendChild(
      makeField(
        "dailyMinutes", "minutes", "number"
      )
    );

    refs.run = button(
      tr("run"), runActiveTool, true
    );

    refs.run.disabled = true;

    panel.appendChild(refs.run);
    root.appendChild(panel);

    refs.output = make("div", "wnci-panel");
    refs.output.hidden = true;
    refs.output.setAttribute("aria-live", "polite");

    root.appendChild(refs.output);

    const details = make(
      "details", "wnci-diagnostics"
    );

    details.appendChild(
      make("summary", "", tr("diagnostics"))
    );

    refs.diagnostics = make("div");

    details.appendChild(refs.diagnostics);

    refs.retry = button(
      tr("retry"), initializeModules
    );

    details.appendChild(refs.retry);

    root.appendChild(details);

    root.appendChild(
      make("p", "wnci-privacy", tr("privacy"))
    );

    updateFields();
  }

  function updateDiagnostics() {
    if (!refs.diagnostics) return;

    refs.diagnostics.replaceChildren();

    if (!controller) {
      refs.diagnostics.appendChild(
        make("p", "", tr("controller"))
      );
      return;
    }

    let modules = [];

    try {
      modules =
        controller.getModuleStatus?.() || [];
    } catch {}

    modules.forEach(module => {
      const text =
        (module.ready ? "✓ " : "✕ ") +
        module.id +
        " · " +
        (
          module.actualVersion ||
          module.expectedVersion ||
          "—"
        ) +
        (
          module.error
            ? " · " + module.error
            : ""
        );

      refs.diagnostics.appendChild(
        make("div", "", text)
      );
    });
  }

  async function initializeModules() {
    if (!root || loading) return;

    const ticket = ++loadRevision;

    controller =
      window.WorknelyCareerController || null;

    if (!controller) {
      setStatus(tr("controller"), true);
      updateDiagnostics();
      refs.run.disabled = true;
      return;
    }

    loading = true;

    refs.run.disabled = true;
    refs.retry.disabled = true;

    setStatus(tr("loading"));

    let timer;

    try {
      if (window.worknelySupabase) {
        controller.bindAuthentication?.(
          window.worknelySupabase
        );
      }

      await Promise.race([
        controller.initialize(),
        new Promise((_, reject) => {
          timer = setTimeout(
            () => reject(
              new Error("initializationTimeout")
            ),
            120000
          );
        })
      ]);

      if (ticket !== loadRevision) return;

      const status = controller.getState();

      setStatus(
        tr("ready") +
        ": " +
        status.readyCount +
        "/" +
        status.totalModules,
        status.readyCount === 0
      );

    } catch {
      if (ticket !== loadRevision) return;

      setStatus(tr("unavailable"), true);

    } finally {
      clearTimeout(timer);

      if (ticket === loadRevision) {
        loading = false;
        refs.run.disabled = busy;
        refs.retry.disabled = false;
        updateDiagnostics();
      }
    }
  }

  function getOptions() {
    const comparison =
      controller.readComparison?.() || {};

    const options = {
      source: state.source === "comparison"
        ? "comparison" : "builder",
      language: getLanguage(),
      jobDescription:
        state.jobDescription.trim() ||
        comparison.jobDescription ||
        "",
      company: state.company.trim(),
      duration: Number(state.duration) || 14,
      dailyMinutes:
        Math.min(
          180,
          Math.max(
            15,
            Number(state.dailyMinutes) || 30
          )
        )
    };

    if (state.targetRole.trim()) {
      options.targetRole =
        state.targetRole.trim();
    }

    if (state.source === "manual") {
      options.content = {};
      options.resumeText =
        state.resumeText.trim();
    }

    return options;
  }

  function itemText(item) {
    if (typeof item === "string") {
      return item;
    }

    if (!item || typeof item !== "object") {
      return "";
    }

    return String(
      item.message ||
      item.recommendation ||
      item.question ||
      item.name ||
      item.keyword ||
      item.title ||
      item.label ||
      ""
    );
  }

  function renderList(title, items) {
    if (!Array.isArray(items) || !items.length) {
      return;
    }

    const list = make("ul", "wnci-list");

    items.forEach(item => {
      const text = itemText(item);

      if (text) {
        const li = make("li", "", text);

        if (item?.guidance) {
          li.appendChild(
            make(
              "p",
              "wnci-intro",
              item.guidance
            )
          );
        }

        list.appendChild(li);
      }
    });

    if (!list.childElementCount) return;

    refs.output.append(
      make("h3", "", title),
      list
    );
  }


  function renderSkillGapList(title, items) {
    if (!Array.isArray(items) || !items.length) return;

    const list = make("ul", "wnci-list");
    const seen = new Set();

    items.forEach(item => {
      const name = typeof item === "string"
        ? item.trim()
        : String(item?.name || item?.keyword || "").trim();

      if (!name) return;

      const key = String(item?.id || name).toLowerCase();

      if (seen.has(key)) return;
      seen.add(key);

      const li = make("li");
      li.appendChild(make("strong", "", name));

      if (item?.priorityLabel) {
        li.appendChild(
          make("p", "wnci-skill-priority", item.priorityLabel)
        );
      }

      if (item?.recommendation) {
        li.appendChild(
          make("p", "wnci-skill-guidance", item.recommendation)
        );
      }

      list.appendChild(li);
    });

    if (list.childElementCount) {
      refs.output.append(make("h3", "", title), list);
    }
  }

  function renderScore(result) {
    const score =
      result.estimatedATSReadiness ??
      result.estimatedSkillCoverage ??
      result.estimatedCareerMatch ??
      result.estimatedScore ??
      result.matchScore ??
      result.coverage;

    if (typeof score !== "number" ||
        !Number.isFinite(score)) return;

    refs.output.append(
      make("p", "", tr("score")),
      make(
        "div",
        "wnci-score",
        Math.round(score) + "%"
      )
    );

    if (result.levelLabel || result.matchLabel) {
      refs.output.appendChild(
        make(
          "p", "wnci-intro",
          result.levelLabel || result.matchLabel
        )
      );
    }
  }

  function addCopyButton(text) {
    if (!text) return;

    const copy = button(tr("copy"), async () => {
      try {
        await navigator.clipboard.writeText(text);
        copy.textContent = tr("copied");
      } catch {
        setStatus(tr("error"), true);
      }
    });

    refs.output.appendChild(copy);
  }



  /* WORKNELY V7.18.2.2 — CLOUD HISTORY INTEGRATION */

  const CLOUD = {
    save: [
      "Save to My Career History",
      "Salvează în istoricul meu profesional",
      "Salva nella cronologia professionale",
      "Im Karriereverlauf speichern",
      "Enregistrer dans mon historique",
      "Guardar en mi historial profesional"
    ],
    saving: [
      "Saving...",
      "Se salvează...",
      "Salvataggio...",
      "Wird gespeichert...",
      "Enregistrement...",
      "Guardando..."
    ],
    saved: [
      "Saved successfully",
      "Salvat cu succes",
      "Salvato correttamente",
      "Erfolgreich gespeichert",
      "Enregistré avec succès",
      "Guardado correctamente"
    ],
    signin: [
      "Sign in before saving. Generate the result again after signing in.",
      "Autentifică-te înainte de salvare. Generează din nou rezultatul după autentificare.",
      "Accedi prima di salvare. Genera nuovamente il risultato.",
      "Melde dich an und erstelle das Ergebnis erneut.",
      "Connectez-vous puis générez à nouveau le résultat.",
      "Inicia sesión y genera nuevamente el resultado."
    ],
    privacy: [
      "Save only numerical indicators and analysis metadata. Your original CV and generated text are not included.",
      "Salvează doar indicatorii numerici și metadatele analizei. CV-ul original și textele generate nu sunt incluse.",
      "Salva solo indicatori numerici e metadati. Il CV originale e i testi generati non sono inclusi.",
      "Nur numerische Kennzahlen und Metadaten speichern. Lebenslauf und generierte Texte werden nicht gespeichert.",
      "Seuls les indicateurs numériques et les métadonnées sont enregistrés. Le CV et les textes générés sont exclus.",
      "Solo se guardan indicadores numéricos y metadatos. El CV y los textos generados no se incluyen."
    ],
    failed: [
      "Saving could not be confirmed. Check your history before retrying.",
      "Salvarea nu a putut fi confirmată. Verifică istoricul înainte de a reîncerca.",
      "Salvataggio non confermato. Controlla la cronologia prima di riprovare.",
      "Speichern nicht bestätigt. Prüfe zuerst deinen Verlauf.",
      "Enregistrement non confirmé. Vérifiez votre historique avant de réessayer.",
      "Guardado no confirmado. Revisa el historial antes de reintentar."
    ],
    unavailable: [
      "Cloud storage is temporarily unavailable.",
      "Stocarea cloud este temporar indisponibilă.",
      "Archiviazione cloud temporaneamente non disponibile.",
      "Cloud-Speicher vorübergehend nicht verfügbar.",
      "Stockage cloud temporairement indisponible.",
      "Almacenamiento en la nube temporalmente no disponible."
    ],
    history: [
      "View My Career History",
      "Vezi istoricul meu profesional",
      "Visualizza la cronologia",
      "Karriereverlauf anzeigen",
      "Voir mon historique",
      "Ver mi historial profesional"
    ]
  };

  let cloudAuthEpoch = 0;
  let cloudOwner = null;
  let cloudClient = null;
  let cloudSubscription = null;
  let cloudRecovery = false;

  function cloudText(key) {
    return CLOUD[key][LANGUAGES.indexOf(getLanguage())]
      || CLOUD[key][0];
  }

  function bindCloudAuth() {
    const client = window.worknelySupabase;

    if (!client?.auth) return false;

    if (cloudClient === client && cloudSubscription) {
      return true;
    }

    cloudSubscription?.unsubscribe();
    cloudClient = client;
    cloudOwner = null;
    cloudAuthEpoch++;

    const { data } = client.auth.onAuthStateChange(
      (event, session) => {
        const owner = session?.user?.id || null;

        if (
          event === "PASSWORD_RECOVERY" ||
          event === "SIGNED_OUT" ||
          owner !== cloudOwner
        ) {
          cloudAuthEpoch++;
          cloudOwner = owner;
          clearPrivateState();
        }

        if (event === "PASSWORD_RECOVERY") {
          cloudRecovery = true;
        } else if (
          event === "SIGNED_OUT" ||
          event === "USER_UPDATED"
        ) {
          cloudRecovery = false;
        }
      }
    );

    cloudSubscription = data?.subscription || null;
    return Boolean(cloudSubscription);
  }

  function addCloudSave(id, result) {
    if (!refs.output || !result) return;

    const previous = refs.output.querySelector(
      "[data-wnci-cloud-save]"
    );

    previous?.remove();

    const ticket = revision;
    const epoch = cloudAuthEpoch;
    const owner = cloudOwner;

    const panel = make("div", "wnci-panel");
    panel.dataset.wnciCloudSave = "true";

    const status = make("p", "wnci-intro", "");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    let pending = false;
    let saved = false;

    function isCurrent() {
      return (
        revision === ticket &&
        cloudAuthEpoch === epoch &&
        cloudOwner === owner &&
        activeTool === id &&
        panel.isConnected
      );
    }

    const saveButton = button(
      cloudText("save"),
      async () => {
        if (pending || saved || !isCurrent()) return;

        if (!owner || cloudRecovery) {
          status.textContent = cloudText("signin");
          return;
        }

        const storage = window.WorknelyCareerStorage;

        if (!storage || !cloudClient?.auth) {
          status.textContent = cloudText("unavailable");
          return;
        }

        pending = true;
        saveButton.disabled = true;
        saveButton.textContent = cloudText("saving");

        try {
          const { data, error } =
            await cloudClient.auth.getUser();

          if (!isCurrent()) return;

          if (error || data?.user?.id !== owner) {
            status.textContent = cloudText("signin");
            return;
          }

          const savedRecord = await storage.save({
            type: id,
            result,
            language: getLanguage(),
            consent: true,
            includeTargetRole: false,
            expectedUserId: owner
          });

          if (!isCurrent()) return;

          if (!savedRecord?.id) {
            throw new Error("SAVE_NOT_CONFIRMED");
          }

          saved = true;
          status.textContent = cloudText("saved");

        } catch (error) {
          if (isCurrent()) {
            const code = String(error?.code || error?.message || "UNKNOWN_ERROR");
            const safeCode = /^[A-Z0-9_]{1,64}$/.test(code) ? code : "UNKNOWN_ERROR";
            status.textContent = cloudText("failed") + " [" + safeCode + "]";
          }

        } finally {
          pending = false;

          if (isCurrent()) {
            saveButton.disabled = saved;
            saveButton.textContent = saved
              ? cloudText("saved")
              : cloudText("save");
          }
        }
      },
      true
    );

    const historyButton = button(
      cloudText("history"),
      () => {
        document.getElementById("wnCareerHistory")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
      }
    );

    panel.append(
      make("p", "wnci-privacy", cloudText("privacy")),
      saveButton,
      historyButton,
      status
    );

    refs.output.appendChild(panel);
  }

  document.addEventListener(
    "DOMContentLoaded",
    bindCloudAuth,
    { once: true }
  );

  window.addEventListener("load", bindCloudAuth);
  window.addEventListener("pageshow", bindCloudAuth);

  document.addEventListener(
    "worknely:workspacechange",
    bindCloudAuth
  );

  if (document.readyState !== "loading") {
    bindCloudAuth();
  }

  /* END CLOUD HISTORY INTEGRATION */


  function renderResult(id, result) {
    refs.output.replaceChildren();
    refs.output.hidden = false;

    refs.output.appendChild(
      make("h3", "", tr("results"))
    );

    if (id === "cover-letter") {
      const text =
        result.text ||
        result.body ||
        "";

      refs.output.appendChild(
        make("div", "wnci-output", text)
      );

      addCopyButton(text);

    } else if (id === "interview-preparation") {
      renderList(
        tr("questions"), result.questions
      );

      addCopyButton(
        (result.questions || [])
          .map(itemText)
          .join("\n\n")
      );

    } else if (id === "skill-gap") {
      renderScore(result);

      renderSkillGapList(
        tr("matched"), result.matchedSkills
      );

      renderSkillGapList(
        tr("missing"), result.missingSkills
      );

    } else {
      renderScore(result);

      renderList(
        tr("matched"),
        result.matchedSkills ||
        result.matchedKeywords
      );

      renderList(
        tr("missing"),
        result.missingSkills ||
        result.missingKeywords
      );

      renderList(
        tr("recommendations"),
        result.suggestions ||
        result.recommendations ||
        result.optimizationSuggestions
      );
    }

    if (result.message) {
      refs.output.appendChild(
        make(
          "p", "wnci-intro", result.message
        )
      );
    }

    if (result.disclaimer) {
      refs.output.appendChild(
        make(
          "p", "wnci-privacy", result.disclaimer
        )
      );
    }
    addCloudSave(id, result);
  }

  function renderPlan(session) {
    refs.output.replaceChildren();
    refs.output.hidden = false;

    const progress = session.getProgress();

    document.dispatchEvent(new CustomEvent("worknely:careerdashboardresult", {
      detail: { module: "career-action-plan", progress: { completed: progress.completed, total: progress.total } }
    }));

    refs.output.appendChild(
      make(
        "h3", "",
        tr("progress") + ": " +
        progress.completed + "/" +
        progress.total
      )
    );

    const bar = make(
      "progress", "wnci-progress"
    );

    bar.max = Math.max(1, progress.total);
    bar.value = progress.completed;

    refs.output.appendChild(bar);

    const tasks = session.getTasks();

    tasks.forEach(task => {
      const label = make(
        "label", "wnci-task"
      );

      const check = make("input");
      check.type = "checkbox";

      check.checked =
        task.status === "completed";

      check.addEventListener("change", () => {
        if (planSession !== session) return;

        if (check.checked) {
          session.completeTask(task.id);
        } else {
          session.resetTask(task.id);
        }

        renderPlan(session);
      });

      const content = make("div");

      content.append(
        make(
          "strong", "",
          tr("day") + " " +
          task.day + " · " +
          task.title
        ),
        make(
          "p", "",
          task.description || ""
        )
      );

      label.append(check, content);
      refs.output.appendChild(label);
    });

    refs.output.appendChild(
      make("p", "wnci-privacy", tr("privacy"))
    );
    addCloudSave("career-action-plan", {
      ok: true,
      progress: {
        completed: progress.completed,
        total: progress.total
      },
      tasks: tasks.map(() => null)
    });
  }

  async function runActiveTool() {
    if (!controller || busy || loading) return;

    clearResults();

    const current = ++revision;
    const id = activeTool;

    const options = getOptions();

    busy = true;
    refs.run.disabled = true;

    setStatus(tr("processing"));

    try {
      const input =
        controller.getInput(options);

      if (!input.resumeText &&
          ![
            "interview-preparation",
            "career-action-plan"
          ].includes(id)) {

        setStatus(tr("needResume"), true);
        return;
      }

      if (!input.jobDescription &&
          ["skill-gap", "career-match"].includes(id)) {

        setStatus(tr("needJob"), true);
        return;
      }

      if (!controller.validateModule(id)) {
        await controller.loadModule(id);
      }

      if (current !== revision) return;

      if (id === "career-action-plan") {
        const response =
          await controller.createSession(
            id, options
          );

        if (current !== revision) return;

        if (!response?.ok ||
            !response.session) {

          setStatus(tr("error"), true);
          return;
        }

        planSession = response.session;
        renderPlan(planSession);

      } else {
        const result =
          await controller.run(id, options);

        if (current !== revision) return;

        if (!result?.ok) {
          setStatus(
            result?.message || tr("error"),
            true
          );
          return;
        }

        lastResult = result;

        renderResult(id, result);

        document.dispatchEvent(new CustomEvent("worknely:careerdashboardresult", {
          detail: { module: id, result }
        }));
      }

      setStatus("");

    } catch {
      if (current === revision) {
        setStatus(tr("error"), true);
      }

    } finally {
      if (current === revision) {
        busy = false;
        refs.run.disabled = false;
        updateDiagnostics();
      }
    }
  }

  function mount(target) {
    const element =
      typeof target === "string"
        ? document.getElementById(target)
        : target ||
          document.getElementById(ROOT_ID);

    if (!element) {
      return false;
    }

    if (initialized && root === element) {
      return true;
    }

    root = element;
    initialized = true;

    installStyles();
    render();
    initializeModules();

    return true;
  }

  function refreshLanguage() {
    if (!root) return;

    controller?.closeSession?.(
      "career-action-plan"
    );

    clearResults();

    render();
    updateDiagnostics();

    if (loading) {
      refs.run.disabled = true;
      refs.retry.disabled = true;
      setStatus(tr("loading"));

    } else if (controller) {
      const status =
        controller.getState?.();

      setStatus(
        tr("ready") + ": " +
        (status?.readyCount || 0) +
        "/" +
        (status?.totalModules || 7)
      );

      refs.run.disabled = false;

    } else {
      setStatus(tr("controller"), true);
    }
  }

  function boot() {
    mount(
      document.getElementById(ROOT_ID)
    );
  }

  document.addEventListener(
    "worknely:careercontrollerready",
    () => {
      controller =
        window.WorknelyCareerController;

      if (!initialized) {
        boot();
      } else {
        initializeModules();
      }
    }
  );

  document.addEventListener(
    "worknely:workspacechange",
    event => {
      if (
        event.detail?.view ===
        "career-intelligence"
      ) {
        boot();

        if (!controller) {
          initializeModules();
        } else {
          updateDiagnostics();
        }
      }
    }
  );

  document.addEventListener(
    "worknely:languagechange",
    refreshLanguage
  );

  document.addEventListener(
    "worknely:careercontextcleared",
    event => {
      const reason = event.detail?.reason;

      if (
        [
          "authChanged",
          "pageHidden",
          "documentChanged"
        ].includes(reason)
      ) {
        clearPrivateState();

      } else {
        clearResults();
      }
    }
  );

  window.addEventListener("pagehide", () => {
    clearPrivateState();
  });

  window.addEventListener("pageshow", () => {
    boot();

    if (
      window.worknelySupabase &&
      controller
    ) {
      controller.bindAuthentication?.(
        window.worknelySupabase
      );
    }
  });

  window.addEventListener("load", () => {
    boot();

    if (!controller) {
      initializeModules();
    }

    if (window.worknelySupabase) {
      controller?.bindAuthentication?.(
        window.worknelySupabase
      );
    }
  }, { once: true });

  window.WorknelyCareerInterface =
    Object.freeze({
      version: VERSION,
      mount,
      refresh: refreshLanguage,
      selectTool,
      initialize: initializeModules,
      isMounted: () => Boolean(root),
      getState: () => ({
        version: VERSION,
        mounted: Boolean(root),
        activeTool,
        busy,
        loading,
        controllerAvailable:
          Boolean(controller),
        language: getLanguage(),
        hasResult: Boolean(lastResult)
      })
    });

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      boot,
      { once: true }
    );
  } else {
    boot();
  }

  document.dispatchEvent(
    new CustomEvent(
      "worknely:careerinterfaceready",
      {
        detail: {
          version: VERSION
        }
      }
    )
  );

})();

/*
 * END WORKNELY V7.18.2.2
 * Career Intelligence Interface
 */
