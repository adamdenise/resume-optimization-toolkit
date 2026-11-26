
/*
 * WORKNELY V7.18.3.4
 * Career Progress Visualization
 * International Edition
 * WORKNELY — PEOPLE TECHNOLOGY
 */

(function () {
  "use strict";

  const VERSION = "7.18.3.4";
  const ROOT_ID = "wnCareerProgress";
  const SVG_NS = "http://www.w3.org/2000/svg";

  const LANGUAGES = [
    "en", "ro", "it", "de", "fr", "es"
  ];

  const D = {
    en: [
      "Career Progress Analytics",
      "Explore your saved professional results.",
      "Latest ATS score",
      "Best ATS score",
      "ATS score difference",
      "Saved analyses",
      "ATS score history",
      "Skill coverage",
      "Career match",
      "Career plan progress",
      "Sign in to view your progress.",
      "Loading your analytics...",
      "Save an analysis to start tracking your results.",
      "Save at least two ATS analyses to display a trend.",
      "Refresh analytics",
      "Saved modules",
      "Scores from different jobs or engine versions may not be directly comparable.",
      "Based on the latest 100 saved analyses.",
      "Analytics temporarily unavailable.",
      "Latest saved indicators",
      "percentage points"
    ],
    ro: [
      "Analiza progresului profesional",
      "Explorează rezultatele tale profesionale salvate.",
      "Ultimul scor ATS",
      "Cel mai bun scor ATS",
      "Diferența scorului ATS",
      "Analize salvate",
      "Istoricul scorurilor ATS",
      "Acoperirea competențelor",
      "Compatibilitate profesională",
      "Progresul planului de carieră",
      "Autentifică-te pentru a vedea progresul.",
      "Se încarcă statisticile...",
      "Salvează o analiză pentru a începe monitorizarea rezultatelor.",
      "Salvează minimum două analize ATS pentru a afișa evoluția.",
      "Actualizează statisticile",
      "Module salvate",
      "Scorurile pentru joburi sau versiuni diferite ale motorului pot să nu fie direct comparabile.",
      "Pe baza ultimelor 100 de analize salvate.",
      "Statisticile sunt temporar indisponibile.",
      "Ultimii indicatori salvați",
      "puncte procentuale"
    ],
    it: [
      "Analisi dei progressi professionali",
      "Esplora i tuoi risultati professionali salvati.",
      "Ultimo punteggio ATS",
      "Miglior punteggio ATS",
      "Differenza del punteggio ATS",
      "Analisi salvate",
      "Storico dei punteggi ATS",
      "Copertura delle competenze",
      "Compatibilità professionale",
      "Progresso del piano di carriera",
      "Accedi per visualizzare i progressi.",
      "Caricamento delle statistiche...",
      "Salva un'analisi per monitorare i risultati.",
      "Salva almeno due analisi ATS per visualizzare l'andamento.",
      "Aggiorna statistiche",
      "Moduli salvati",
      "I punteggi relativi a lavori o versioni diverse potrebbero non essere direttamente confrontabili.",
      "Basato sulle ultime 100 analisi salvate.",
      "Statistiche temporaneamente non disponibili.",
      "Ultimi indicatori salvati",
      "punti percentuali"
    ],
    de: [
      "Analyse des Karrierefortschritts",
      "Entdecke deine gespeicherten Ergebnisse.",
      "Letzter ATS-Wert",
      "Bester ATS-Wert",
      "ATS-Punktedifferenz",
      "Gespeicherte Analysen",
      "ATS-Verlauf",
      "Kompetenzabdeckung",
      "Karriere-Match",
      "Fortschritt des Karriereplans",
      "Melde dich an, um deinen Fortschritt zu sehen.",
      "Statistiken werden geladen...",
      "Speichere eine Analyse, um Ergebnisse zu verfolgen.",
      "Speichere mindestens zwei ATS-Analysen für einen Verlauf.",
      "Statistiken aktualisieren",
      "Gespeicherte Module",
      "Werte verschiedener Stellen oder Engine-Versionen sind möglicherweise nicht direkt vergleichbar.",
      "Basierend auf den letzten 100 gespeicherten Analysen.",
      "Statistiken vorübergehend nicht verfügbar.",
      "Letzte gespeicherte Kennzahlen",
      "Prozentpunkte"
    ],
    fr: [
      "Analyse de la progression professionnelle",
      "Explorez vos résultats professionnels enregistrés.",
      "Dernier score ATS",
      "Meilleur score ATS",
      "Différence du score ATS",
      "Analyses enregistrées",
      "Historique des scores ATS",
      "Couverture des compétences",
      "Compatibilité professionnelle",
      "Progression du plan de carrière",
      "Connectez-vous pour voir votre progression.",
      "Chargement des statistiques...",
      "Enregistrez une analyse pour suivre vos résultats.",
      "Enregistrez au moins deux analyses ATS pour afficher une tendance.",
      "Actualiser les statistiques",
      "Modules enregistrés",
      "Les scores de postes ou de versions différents ne sont pas toujours directement comparables.",
      "Basé sur les 100 dernières analyses enregistrées.",
      "Statistiques temporairement indisponibles.",
      "Derniers indicateurs enregistrés",
      "points de pourcentage"
    ],
    es: [
      "Análisis del progreso profesional",
      "Explora tus resultados profesionales guardados.",
      "Última puntuación ATS",
      "Mejor puntuación ATS",
      "Diferencia de puntuación ATS",
      "Análisis guardados",
      "Historial de puntuaciones ATS",
      "Cobertura de habilidades",
      "Compatibilidad profesional",
      "Progreso del plan de carrera",
      "Inicia sesión para ver tu progreso.",
      "Cargando estadísticas...",
      "Guarda un análisis para seguir tus resultados.",
      "Guarda al menos dos análisis ATS para mostrar una tendencia.",
      "Actualizar estadísticas",
      "Módulos guardados",
      "Las puntuaciones de distintos puestos o versiones pueden no ser directamente comparables.",
      "Basado en los últimos 100 análisis guardados.",
      "Estadísticas temporalmente no disponibles.",
      "Últimos indicadores guardados",
      "puntos porcentuales"
    ]
  };

  let root = null;
  let initialized = false;

  function language() {
    const value = String(
      window.WorknelyLocalization?.getLanguage?.() ||
      document.getElementById("language")?.value ||
      document.documentElement.lang ||
      "en"
    ).toLowerCase().split("-")[0];

    return LANGUAGES.includes(value)
      ? value : "en";
  }

  function tr(index) {
    return D[language()][index] ||
      D.en[index] || "";
  }

  function node(tag, cls, text) {
    const el = document.createElement(tag);

    if (cls) el.className = cls;

    if (text !== undefined) {
      el.textContent = String(text);
    }

    return el;
  }

  function svgNode(tag, attrs = {}) {
    const el = document.createElementNS(
      SVG_NS, tag
    );

    Object.entries(attrs).forEach(
      ([key, value]) => {
        el.setAttribute(key, String(value));
      }
    );

    return el;
  }

  function number(value) {
    return typeof value === "number" &&
      Number.isFinite(value);
  }

  function validScore(value) {
    return number(value) &&
      value >= 0 && value <= 100;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat(
      language(),
      { maximumFractionDigits: 2 }
    ).format(value);
  }

  function formatScore(value) {
    return validScore(value)
      ? formatNumber(value) + "%"
      : "—";
  }

  function formatChange(value) {
    if (!number(value)) return "—";

    return (value > 0 ? "+" : "") +
      formatNumber(value) + " pp";
  }

  function formatDate(value) {
    const date = new Date(value);

    if (!Number.isFinite(date.getTime())) {
      return "—";
    }

    return new Intl.DateTimeFormat(
      language(),
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    ).format(date);
  }

  const EXTRA = {
    en: ["Average ATS score","Lowest ATS score","ATS analyses","Score increased","Score decreased","No score change"],
    ro: ["Scor ATS mediu","Cel mai mic scor ATS","Analize ATS","Creștere a scorului","Scădere a scorului","Scor neschimbat"],
    it: ["Punteggio ATS medio","Punteggio ATS minimo","Analisi ATS","Punteggio aumentato","Punteggio diminuito","Punteggio invariato"],
    de: ["Durchschnittlicher ATS-Wert","Niedrigster ATS-Wert","ATS-Analysen","Wert gestiegen","Wert gesunken","Wert unverändert"],
    fr: ["Score ATS moyen","Score ATS minimum","Analyses ATS","Score en hausse","Score en baisse","Score inchangé"],
    es: ["Puntuación ATS media","Puntuación ATS mínima","Análisis ATS","Puntuación aumentada","Puntuación reducida","Puntuación sin cambios"]
  };

  function extra(index) {
    return (EXTRA[language()] || EXTRA.en)[index];
  }

  function changeMetric(value) {
    const card = metric(tr(4), formatChange(value));
    if (!number(value)) return card;
    const direction = value > 0 ? 3 : value < 0 ? 4 : 5;
    card.classList.add(value > 0 ? "wnp-positive" : value < 0 ? "wnp-negative" : "wnp-neutral");
    card.appendChild(node("small", "wnp-muted", extra(direction)));
    return card;
  }

  function metric(label, value) {
    const card = node("div", "wnp-card");

    card.append(
      node("span", "wnp-muted", label),
      node("strong", "wnp-value", value)
    );

    return card;
  }

  function progressBar(label, value) {
    const container = node(
      "div", "wnp-indicator"
    );

    const header = node("div", "wnp-row");

    header.append(
      node("span", "", label),
      node("strong", "", formatScore(value))
    );

    container.appendChild(header);

    if (validScore(value)) {
      const track = node("div", "wnp-track");
      const fill = node("div", "wnp-fill");

      track.setAttribute("role", "progressbar");
      track.setAttribute("aria-label", label);
      track.setAttribute("aria-valuemin", "0");
      track.setAttribute("aria-valuemax", "100");
      track.setAttribute("aria-valuenow", value);

      fill.style.width = value + "%";

      track.appendChild(fill);
      container.appendChild(track);
    }

    return container;
  }

  function createChart(series) {
    const wrapper = node(
      "div", "wnp-chart"
    );

    const entries = (
      Array.isArray(series) ? series : []
    ).filter(
      item => validScore(item?.score) &&
        Number.isFinite(Date.parse(item.date))
    ).slice(-100);

    if (entries.length < 2) {
      wrapper.appendChild(
        node("p", "wnp-muted", tr(13))
      );

      return wrapper;
    }

    const width = 600;
    const height = 240;

    const left = 48;
    const right = 20;
    const top = 20;
    const bottom = 34;

    const plotWidth =
      width - left - right;

    const plotHeight =
      height - top - bottom;

    const x = index =>
      left + index /
        (entries.length - 1) * plotWidth;

    const y = score =>
      top + (100 - score) /
        100 * plotHeight;

    const svg = svgNode("svg", {
      viewBox: `0 0 ${width} ${height}`,
      role: "img",
      "aria-label": tr(6),
      preserveAspectRatio: "xMidYMid meet"
    });

    [0, 25, 50, 75, 100].forEach(value => {
      svg.appendChild(
        svgNode("line", {
          x1: left,
          y1: y(value),
          x2: width - right,
          y2: y(value),
          stroke: "#e9e2f4",
          "stroke-width": 1
        })
      );

      const label = svgNode("text", {
        x: left - 8,
        y: y(value) + 4,
        "text-anchor": "end",
        fill: "#746c85",
        "font-size": 12
      });

      label.textContent = value + "%";
      svg.appendChild(label);
    });

    const points = entries.map(
      (entry, index) =>
        `${x(index)},${y(entry.score)}`
    ).join(" ");

    const area = [
      `${x(0)},${y(0)}`,
      points,
      `${x(entries.length - 1)},${y(0)}`
    ].join(" ");

    svg.appendChild(
      svgNode("polygon", {
        points: area,
        fill: "#ede6ff",
        opacity: ".7"
      })
    );

    svg.appendChild(
      svgNode("polyline", {
        points,
        fill: "none",
        stroke: "#7540ef",
        "stroke-width": 3,
        "stroke-linejoin": "round",
        "stroke-linecap": "round"
      })
    );

    entries.forEach((entry, index) => {
      const point = svgNode("circle", {
        cx: x(index),
        cy: y(entry.score),
        r: entries.length > 30 ? 2 : 4,
        fill: "#7540ef",
        stroke: "#ffffff",
        "stroke-width": 1
      });

      const title = svgNode("title");

      title.textContent =
        formatDate(entry.date) +
        " · " +
        formatScore(entry.score);

      point.appendChild(title);
      svg.appendChild(point);
    });

    wrapper.appendChild(svg);

    const dates = node("div", "wnp-dates");

    dates.append(
      node(
        "span",
        "",
        formatDate(entries[0].date)
      ),
      node(
        "span",
        "",
        formatDate(
          entries[entries.length - 1].date
        )
      )
    );

    wrapper.appendChild(dates);

    const details = node(
      "details", "wnp-details"
    );

    details.appendChild(
      node("summary", "", tr(6))
    );

    const list = node("ul", "wnp-series");

    entries.slice().reverse().forEach(
      entry => {
        list.appendChild(
          node(
            "li",
            "",
            formatDate(entry.date) +
              " · " +
              formatScore(entry.score)
          )
        );
      }
    );

    details.appendChild(list);
    wrapper.appendChild(details);

    return wrapper;
  }

  function installStyles() {
    if (
      document.getElementById(
        "wnCareerProgressStyle"
      )
    ) return;

    const style = node("style");

    style.id = "wnCareerProgressStyle";

    style.textContent = `
      #wnCareerProgress {
        box-sizing:border-box;
        width:100%;
        max-width:100%;
        min-width:0;
        margin:16px 0;
        padding:20px;
        background:linear-gradient(
          135deg,#f6f1ff,#fff,#fff0fa
        );
        border:1px solid #e5d9ff;
        border-radius:18px;
        color:#20123f;
        overflow-wrap:anywhere;
      }

      #wnCareerProgress * {
        box-sizing:border-box;
        min-width:0;
      }

      #wnCareerProgress h3 {
        margin:0 0 8px;
        font-size:clamp(20px,4vw,27px);
        line-height:1.3;
        letter-spacing:-.5px;
      }

      #wnCareerProgress h4 {
        font-size:15px;
        margin:20px 0 12px;
      }

      #wnCareerProgress .wnp-muted {
        color:#746c85;
        font-size:13px;
        line-height:1.6;
      }

      #wnCareerProgress .wnp-grid {
        display:grid;
        grid-template-columns:
          repeat(4,minmax(0,1fr));
        gap:10px;
        margin:16px 0;
      }

      #wnCareerProgress .wnp-card {
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        gap:8px;
        padding:14px;
        border:1px solid #e9e2f4;
        border-radius:13px;
        background:#fff;
      }

      #wnCareerProgress .wnp-value {
        color:#5424ff;
        font-size:clamp(24px,4vw,32px);
        line-height:1.25;
        font-weight:850;
      }

      #wnCareerProgress .wnp-chart {
        padding:12px;
        background:white;
        border:1px solid #e9e2f4;
        border-radius:14px;
        max-width:100%;
      }

      #wnCareerProgress svg {
        display:block;
        width:100%;
        height:auto;
        max-width:100%;
      }

      #wnCareerProgress .wnp-dates,
      #wnCareerProgress .wnp-row {
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px;
        font-size:13px;
        line-height:1.5;
      }

      #wnCareerProgress .wnp-dates {
        color:#746c85;
        font-size:11px;
      }

      #wnCareerProgress .wnp-indicator {
        margin:16px 0;
      }

      #wnCareerProgress .wnp-track {
        height:9px;
        background:#eae4f6;
        border-radius:20px;
        overflow:hidden;
        margin-top:8px;
      }

      #wnCareerProgress .wnp-fill {
        height:100%;
        border-radius:20px;
        background:linear-gradient(
          90deg,#5424ff,#ec22ad
        );
      }

      #wnCareerProgress .wnp-button {
        display:block;
        width:100%;
        max-width:100%;
        min-height:44px;
        border:1px solid #e4dbfa;
        border-radius:10px;
        background:#f3efff;
        color:#5424ff;
        font:inherit;
        font-size:13px;
        font-weight:750;
        padding:12px;
        margin-top:14px;
        cursor:pointer;
        white-space:normal;
      }

      #wnCareerProgress .wnp-button:disabled {
        opacity:.55;
        cursor:default;
      }

      #wnCareerProgress .wnp-details {
        margin-top:12px;
        color:#5424ff;
        font-size:12px;
      }

      #wnCareerProgress .wnp-details summary {
        cursor:pointer;
        font-weight:700;
      }

      #wnCareerProgress .wnp-series {
        padding-left:18px;
        max-height:200px;
        overflow:auto;
        line-height:1.8;
        color:#20123f;
      }

      #wnCareerProgress .wnp-positive .wnp-value {
        color:#15803d;
      }

      #wnCareerProgress .wnp-negative .wnp-value {
        color:#dc2626;
      }

      #wnCareerProgress .wnp-neutral .wnp-value {
        color:#746c85;
      }

      #wnCareerProgress .wnp-extra-stats {
        display:grid;
        gap:12px;
        padding:14px;
        margin:12px 0;
        background:#fff;
        border:1px solid #e9e2f4;
        border-radius:12px;
        max-width:100%;
        min-width:0;
      }

      #wnCareerProgress .wnp-card,
      #wnCareerProgress .wnp-chart,
      #wnCareerProgress .wnp-button,
      #wnCareerProgress .wnp-grid,
      #wnCareerProgress .wnp-dates,
      #wnCareerProgress .wnp-row {
        min-width:0;
        max-width:100%;
        overflow-wrap:anywhere;
        white-space:normal;
      }

      #wnCareerProgress .wnp-dates {
        flex-wrap:wrap;
      }

      #wnCareerProgress .wnp-value {
        font-size:clamp(21px,4vw,32px);
      }

      @media(max-width:700px) {
        #wnCareerProgress {
          padding:14px;
        }

        #wnCareerProgress .wnp-grid {
          grid-template-columns:
            repeat(2,minmax(0,1fr));
        }
      }

      @media(max-width:340px) {
        #wnCareerProgress .wnp-grid {
          grid-template-columns:1fr;
        }
      }

      @media print {
        #wnCareerProgress {
          display:none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function render() {
    if (!root?.isConnected) return;

    const engine =
      window.WorknelyCareerAnalytics;

    const state =
      engine?.getState?.();

    const snapshot =
      engine?.getSnapshot?.();

    const fragment =
      document.createDocumentFragment();

    fragment.append(
      node("h3", "", tr(0)),
      node("p", "wnp-muted", tr(1))
    );

    if (!engine || !state) {
      fragment.appendChild(
        node("p", "wnp-muted", tr(18))
      );

    } else if (state.loading) {
      fragment.appendChild(
        node("p", "wnp-muted", tr(11))
      );

    } else if (!state.authenticated) {
      fragment.appendChild(
        node("p", "wnp-muted", tr(10))
      );

    } else if (!snapshot) {
      fragment.appendChild(
        node("p", "wnp-muted", tr(18))
      );

    } else if (!snapshot.totalAnalyses) {
      fragment.appendChild(
        node("p", "wnp-muted", tr(12))
      );

    } else {
      const grid = node("div", "wnp-grid");

      grid.append(
        metric(
          tr(2),
          formatScore(snapshot.ats.latestScore)
        ),
        metric(
          tr(3),
          formatScore(snapshot.ats.bestScore)
        ),
        changeMetric(snapshot.ats.change),
        metric(
          tr(5),
          snapshot.totalAnalyses
        )
      );

      fragment.append(
        grid,
        node("h4", "", tr(6)),
        createChart(snapshot.ats.series),
        (() => {
          const stats = node("div", "wnp-extra-stats");
          [
            [extra(0), formatScore(snapshot.ats.averageScore)],
            [extra(1), formatScore(snapshot.ats.lowestScore)],
            [extra(2), snapshot.ats.count]
          ].forEach(([label,value]) => {
            const row = node("div", "wnp-row");
            row.append(node("span","wnp-muted",label),node("strong","",value));
            stats.appendChild(row);
          });
          return stats;
        })(),
        node("h4", "", tr(19)),
        progressBar(
          tr(7),
          snapshot.skillGap.latestScore
        ),
        progressBar(
          tr(8),
          snapshot.careerMatch.latestScore
        ),
        progressBar(
          tr(9),
          snapshot.careerPlan.latestScore
        ),
        node(
          "p",
          "wnp-muted",
          tr(15) + ": " +
          snapshot.completedModules +
          "/" +
          snapshot.totalModules
        ),
        node("p", "wnp-muted", tr(16)),
        node("p", "wnp-muted", tr(17))
      );
    }

    const refresh = node(
      "button",
      "wnp-button",
      tr(14)
    );

    refresh.type = "button";
    refresh.disabled =
      !engine || Boolean(state?.loading);

    refresh.addEventListener(
      "click",
      () => engine?.refresh?.()
    );

    fragment.appendChild(refresh);

    root.replaceChildren(fragment);

    root.setAttribute(
      "aria-label",
      tr(0)
    );
  }

  function mount() {
    const dashboard =
      document.getElementById(
        "wnCareerDashboard"
      );

    if (!dashboard) return false;

    if (root?.isConnected) return true;

    root = node("section");
    root.id = ROOT_ID;

    dashboard.after(root);

    installStyles();
    render();

    return true;
  }

  function initialize() {
    if (!mount()) return false;

    if (initialized) {
      render();
      return true;
    }

    initialized = true;

    document.addEventListener(
      "worknely:careeranalyticschange",
      render
    );

    document.addEventListener(
      "worknely:languagechange",
      render
    );

    document.addEventListener(
      "worknely:localizationready",
      render
    );

    document.addEventListener(
      "change",
      event => {
        if (event.target?.id === "language") {
          render();
        }
      }
    );

    window.addEventListener(
      "pagehide",
      () => {
        root?.replaceChildren();
      }
    );

    render();

    return true;
  }

  document.addEventListener(
    "worknely:workspacechange",
    initialize
  );

  window.addEventListener(
    "pageshow",
    initialize
  );

  window.addEventListener(
    "load",
    initialize,
    { once: true }
  );

  window.WorknelyCareerProgress =
    Object.freeze({
      version: VERSION,
      mount,
      refresh: render,
      initialize,
      getState: () => ({
        version: VERSION,
        mounted: Boolean(root?.isConnected),
        analyticsAvailable: Boolean(
          window.WorknelyCareerAnalytics
        ),
        language: language(),
        externalLibraries: false
      })
    });

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      { once: true }
    );
  } else {
    initialize();
  }

  console.info(
    "Worknely V7.18.3.4 Career Progress Visualization ready."
  );

})();

/*
 * END WORKNELY V7.18.3.4
 * CAREER PROGRESS VISUALIZATION
 */
