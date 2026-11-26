
/**
 * WORKNELY
 * Job Application Analytics
 * Version: 7.19.6
 *
 * Professional recruitment analytics.
 * Copyright Worknely.
 */

(function () {
  "use strict";

  const VERSION = "7.19.6";
  const ROOT_ID = "wnJobAnalytics";
  const STYLE_ID = "wnJobAnalyticsStyles";

  const STATUSES = Object.freeze([
    "saved",
    "applied",
    "screening",
    "interview",
    "assessment",
    "offer",
    "accepted",
    "rejected",
    "withdrawn"
  ]);

  const COLORS = Object.freeze({
    saved: "#94a3b8",
    applied: "#7540ef",
    screening: "#9333ea",
    interview: "#0891b2",
    assessment: "#d97706",
    offer: "#10b981",
    accepted: "#15803d",
    rejected: "#dc2626",
    withdrawn: "#64748b"
  });

  /* =========================
     INTERNATIONAL LOCALIZATION
  ========================= */

  const DICTIONARY = {
    en: {
      title: "Application Analytics",
      subtitle: "Understand your job search performance.",
      total: "Total applications",
      active: "Active applications",
      advanced: "Advanced-stage share",
      positive: "Offer and acceptance share",
      distribution: "Application distribution",
      breakdown: "Current recruitment stages",
      outcomes: "Application outcomes",
      accepted: "Accepted",
      rejected: "Rejected",
      withdrawn: "Withdrawn",
      refresh: "Refresh analytics",
      signin: "Sign in to view your analytics.",
      loading: "Loading analytics...",
      empty: "Add applications to unlock your analytics.",
      error: "Unable to load analytics.",
      unavailable: "Analytics is unavailable.",
      disclaimer: "Indicators reflect current application statuses, not historical conversion rates.",
      basis: "Applications excluding saved listings",
      updated: "Last updated",
      stages: [
        "Saved", "Applied", "Screening",
        "Interview", "Assessment", "Offer",
        "Accepted", "Rejected", "Withdrawn"
      ]
    },

    ro: {
      title: "Analiza candidaturilor",
      subtitle: "Înțelege performanța căutării unui loc de muncă.",
      total: "Total candidaturi",
      active: "Candidaturi active",
      advanced: "Ponderea etapelor avansate",
      positive: "Ponderea ofertelor și acceptărilor",
      distribution: "Distribuția candidaturilor",
      breakdown: "Etapele actuale de recrutare",
      outcomes: "Rezultatele candidaturilor",
      accepted: "Acceptate",
      rejected: "Respinse",
      withdrawn: "Retrase",
      refresh: "Actualizează statisticile",
      signin: "Autentifică-te pentru a vedea statisticile.",
      loading: "Se încarcă statisticile...",
      empty: "Adaugă candidaturi pentru a vedea statisticile.",
      error: "Statisticile nu au putut fi încărcate.",
      unavailable: "Modulul nu este disponibil.",
      disclaimer: "Indicatorii reflectă statusurile actuale, nu ratele istorice de conversie.",
      basis: "Candidaturi fără anunțurile doar salvate",
      updated: "Ultima actualizare",
      stages: [
        "Salvate", "Trimise", "Evaluare inițială",
        "Interviu", "Testare", "Ofertă",
        "Acceptate", "Respinse", "Retrase"
      ]
    },

    it: {
      title: "Analisi delle candidature",
      subtitle: "Comprendi le prestazioni della tua ricerca di lavoro.",
      total: "Candidature totali",
      active: "Candidature attive",
      advanced: "Quota delle fasi avanzate",
      positive: "Quota di offerte e accettazioni",
      distribution: "Distribuzione delle candidature",
      breakdown: "Fasi attuali di selezione",
      outcomes: "Esiti delle candidature",
      accepted: "Accettate",
      rejected: "Rifiutate",
      withdrawn: "Ritirate",
      refresh: "Aggiorna statistiche",
      signin: "Accedi per visualizzare le statistiche.",
      loading: "Caricamento statistiche...",
      empty: "Aggiungi candidature per visualizzare le statistiche.",
      error: "Impossibile caricare le statistiche.",
      unavailable: "Modulo non disponibile.",
      disclaimer: "Gli indicatori riflettono gli stati attuali, non i tassi storici di conversione.",
      basis: "Candidature escluse quelle solo salvate",
      updated: "Ultimo aggiornamento",
      stages: [
        "Salvate", "Inviate", "Selezione",
        "Colloquio", "Valutazione", "Offerta",
        "Accettate", "Rifiutate", "Ritirate"
      ]
    },

    de: {
      title: "Bewerbungsanalyse",
      subtitle: "Analysiere deine Fortschritte bei der Jobsuche.",
      total: "Bewerbungen insgesamt",
      active: "Aktive Bewerbungen",
      advanced: "Anteil fortgeschrittener Phasen",
      positive: "Anteil Angebote und Annahmen",
      distribution: "Bewerbungsverteilung",
      breakdown: "Aktuelle Bewerbungsphasen",
      outcomes: "Bewerbungsergebnisse",
      accepted: "Angenommen",
      rejected: "Abgelehnt",
      withdrawn: "Zurückgezogen",
      refresh: "Statistiken aktualisieren",
      signin: "Melde dich an, um Statistiken zu sehen.",
      loading: "Statistiken werden geladen...",
      empty: "Füge Bewerbungen hinzu, um Statistiken zu sehen.",
      error: "Statistiken konnten nicht geladen werden.",
      unavailable: "Modul nicht verfügbar.",
      disclaimer: "Die Kennzahlen zeigen aktuelle Statuswerte, keine historischen Konversionsraten.",
      basis: "Bewerbungen ohne nur gespeicherte Stellen",
      updated: "Zuletzt aktualisiert",
      stages: [
        "Gespeichert", "Beworben", "Vorauswahl",
        "Gespräch", "Bewertung", "Angebot",
        "Angenommen", "Abgelehnt", "Zurückgezogen"
      ]
    },

    fr: {
      title: "Analyse des candidatures",
      subtitle: "Comprenez les performances de votre recherche d'emploi.",
      total: "Total des candidatures",
      active: "Candidatures actives",
      advanced: "Part des étapes avancées",
      positive: "Part des offres et acceptations",
      distribution: "Répartition des candidatures",
      breakdown: "Étapes actuelles du recrutement",
      outcomes: "Résultats des candidatures",
      accepted: "Acceptées",
      rejected: "Refusées",
      withdrawn: "Retirées",
      refresh: "Actualiser les statistiques",
      signin: "Connectez-vous pour consulter les statistiques.",
      loading: "Chargement des statistiques...",
      empty: "Ajoutez des candidatures pour afficher les statistiques.",
      error: "Impossible de charger les statistiques.",
      unavailable: "Module indisponible.",
      disclaimer: "Les indicateurs reflètent les statuts actuels, pas les taux historiques de conversion.",
      basis: "Candidatures hors annonces seulement enregistrées",
      updated: "Dernière actualisation",
      stages: [
        "Enregistrées", "Envoyées", "Présélection",
        "Entretien", "Évaluation", "Offre",
        "Acceptées", "Refusées", "Retirées"
      ]
    },

    es: {
      title: "Análisis de candidaturas",
      subtitle: "Comprende el rendimiento de tu búsqueda de empleo.",
      total: "Total de candidaturas",
      active: "Candidaturas activas",
      advanced: "Proporción en etapas avanzadas",
      positive: "Proporción de ofertas y aceptaciones",
      distribution: "Distribución de candidaturas",
      breakdown: "Etapas actuales de selección",
      outcomes: "Resultados de candidaturas",
      accepted: "Aceptadas",
      rejected: "Rechazadas",
      withdrawn: "Retiradas",
      refresh: "Actualizar estadísticas",
      signin: "Inicia sesión para ver tus estadísticas.",
      loading: "Cargando estadísticas...",
      empty: "Añade candidaturas para ver las estadísticas.",
      error: "No se pudieron cargar las estadísticas.",
      unavailable: "Módulo no disponible.",
      disclaimer: "Los indicadores reflejan los estados actuales, no las tasas históricas de conversión.",
      basis: "Candidaturas sin ofertas solo guardadas",
      updated: "Última actualización",
      stages: [
        "Guardadas", "Enviadas", "Preselección",
        "Entrevista", "Evaluación", "Oferta",
        "Aceptadas", "Rechazadas", "Retiradas"
      ]
    }
  };

  /* =========================
     PRIVATE STATE
  ========================= */

  let root = null;
  let authClient = null;
  let authSubscription = null;
  let initialized = false;
  let recoveryMode = false;
  let generation = 0;
  let refreshScheduled = false;

  const state = {
    owner: null,
    loading: false,
    error: false,
    analytics: null
  };

  /* =========================
     UTILITIES
  ========================= */

  function storage() {
    return window.WorknelyJobStorage;
  }

  function language() {
    const value =
      window.WorknelyLocalization?.getLanguage?.() ||
      document.getElementById("language")?.value ||
      document.documentElement.lang ||
      "en";

    const code = String(value)
      .toLowerCase()
      .split("-")[0];

    return DICTIONARY[code] ? code : "en";
  }

  function tr(key) {
    return DICTIONARY[language()][key] ||
      DICTIONARY.en[key] ||
      "";
  }

  function statusLabel(status) {
    return DICTIONARY[language()]
      .stages[STATUSES.indexOf(status)] ||
      status;
  }

  function node(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text != null) {
      element.textContent = String(text);
    }

    return element;
  }

  function button(text, handler) {
    const element = node(
      "button",
      "wnja-button",
      text
    );

    element.type = "button";

    if (handler) {
      element.addEventListener(
        "click",
        handler
      );
    }

    return element;
  }

  function formatNumber(value) {
    if (!Number.isFinite(value)) {
      return "—";
    }

    return new Intl.NumberFormat(
      language()
    ).format(value);
  }

  function formatPercent(value) {
    if (!Number.isFinite(value)) {
      return "—";
    }

    return new Intl.NumberFormat(
      language(),
      {
        style: "percent",
        maximumFractionDigits: 1
      }
    ).format(value / 100);
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

  /* =========================
     ANALYTICS ENGINE
  ========================= */

  function safeCount(value) {
    return (
      Number.isSafeInteger(value) &&
      value >= 0
    ) ? value : 0;
  }

  function percentage(value, total) {
    if (
      !Number.isFinite(value) ||
      !Number.isFinite(total) ||
      total <= 0
    ) {
      return null;
    }

    return Math.round(
      (value / total) * 1000
    ) / 10;
  }

  function calculate(input) {
    const source =
      input?.byStatus || {};

    const byStatus = {};

    STATUSES.forEach(function (status) {
      byStatus[status] =
        safeCount(source[status]);
    });

    const total = STATUSES.reduce(
      (sum, status) =>
        sum + byStatus[status],
      0
    );

    const tracked =
      total - byStatus.saved;

    const active =
      byStatus.applied +
      byStatus.screening +
      byStatus.interview +
      byStatus.assessment +
      byStatus.offer;

    const advanced =
      byStatus.interview +
      byStatus.assessment +
      byStatus.offer +
      byStatus.accepted;

    const positive =
      byStatus.offer +
      byStatus.accepted;

    const closed =
      byStatus.accepted +
      byStatus.rejected +
      byStatus.withdrawn;

    const distribution =
      STATUSES.map(function (status) {
        return {
          status,
          count: byStatus[status],
          percentage:
            percentage(
              byStatus[status],
              total
            ) ?? 0
        };
      });

    return {
      version: VERSION,

      total,
      tracked,
      active,
      advanced,
      positive,
      closed,

      advancedShare:
        percentage(advanced, tracked),

      positiveShare:
        percentage(positive, tracked),

      activeShare:
        percentage(active, tracked),

      closedShare:
        percentage(closed, tracked),

      byStatus,
      distribution,

      outcomes: {
        accepted: byStatus.accepted,
        rejected: byStatus.rejected,
        withdrawn: byStatus.withdrawn
      },

      comparisonBasis:
        "current-status-distribution",

      historicalConversionRates: false,

      generatedAt:
        new Date().toISOString()
    };
  }

  /* =========================
     PRIVATE STATE MANAGEMENT
  ========================= */

  function clearPrivateState() {
    generation += 1;

    state.owner = null;
    state.loading = false;
    state.error = false;
    state.analytics = null;

    root?.replaceChildren();
  }

  function isCurrent(ticket, owner) {
    return (
      ticket === generation &&
      state.owner === owner &&
      !recoveryMode
    );
  }

  /* =========================
     AUTHENTICATION
  ========================= */

  function bindAuthentication() {
    const client = window.worknelySupabase;

    if (!client?.auth?.onAuthStateChange) {
      return false;
    }

    if (
      client === authClient &&
      authSubscription
    ) {
      return true;
    }

    authSubscription?.unsubscribe?.();

    clearPrivateState();

    authClient = client;
    recoveryMode = false;

    const response =
      client.auth.onAuthStateChange(
        function (event, session) {
          if (client !== authClient) return;

          const owner =
            session?.user?.id || null;

          if (event === "PASSWORD_RECOVERY") {
            recoveryMode = true;
            clearPrivateState();
            render();
            return;
          }

          if (event === "SIGNED_OUT") {
            recoveryMode = false;
            clearPrivateState();
            render();
            return;
          }

          if (recoveryMode) return;

          if (owner !== state.owner) {
            clearPrivateState();

            state.owner = owner;

            render();

            if (owner) {
              scheduleRefresh();
            }
          }
        }
      );

    authSubscription =
      response?.data?.subscription || null;

    return Boolean(authSubscription);
  }

  /* =========================
     CLOUD SYNCHRONIZATION
  ========================= */

  function scheduleRefresh() {
    if (refreshScheduled) return;

    refreshScheduled = true;

    window.setTimeout(function () {
      refreshScheduled = false;

      if (root?.isConnected) {
        refresh();
      }
    }, 0);
  }

  async function refresh() {
    if (
      !root?.isConnected ||
      recoveryMode
    ) {
      return;
    }

    const engine = storage();

    if (!engine || !authClient) {
      render();
      return;
    }

    const ticket = ++generation;

    state.loading = true;
    state.error = false;

    render();

    try {
      const { data, error } =
        await authClient.auth.getUser();

      if (ticket !== generation) return;

      if (error || !data?.user?.id) {
        clearPrivateState();
        render();
        return;
      }

      const owner = data.user.id;

      if (
        state.owner &&
        state.owner !== owner
      ) {
        clearPrivateState();
        state.owner = owner;
        scheduleRefresh();
        return;
      }

      state.owner = owner;

      const statistics =
        await engine.getStatistics({
          expectedUserId: owner
        });

      if (!isCurrent(ticket, owner)) {
        return;
      }

      state.analytics =
        calculate(statistics);

    } catch {
      if (ticket !== generation) return;

      state.analytics = null;
      state.error = true;

    } finally {
      if (ticket === generation) {
        state.loading = false;
        render();
      }
    }
  }

  /* =========================
     METRIC CARDS
  ========================= */

  function metric(
    label,
    value,
    color,
    description
  ) {
    const card = node(
      "div",
      "wnja-metric"
    );

    const number = node(
      "strong",
      "wnja-number",
      value
    );

    number.style.color = color;

    card.append(
      number,
      node(
        "span",
        "wnja-label",
        label
      )
    );

    if (description) {
      card.append(
        node(
          "span",
          "wnja-muted",
          description
        )
      );
    }

    return card;
  }

  function renderMetrics(data) {
    const grid = node(
      "div",
      "wnja-metrics"
    );

    grid.append(
      metric(
        tr("total"),
        formatNumber(data.total),
        "#7540ef"
      ),

      metric(
        tr("active"),
        formatNumber(data.active),
        "#db2777"
      ),

      metric(
        tr("advanced"),
        formatPercent(data.advancedShare),
        "#0891b2",
        tr("basis")
      ),

      metric(
        tr("positive"),
        formatPercent(data.positiveShare),
        "#059669",
        tr("basis")
      )
    );

    return grid;
  }

  /* =========================
     DONUT CHART
  ========================= */

  function renderDonut(data) {
    const panel = node(
      "section",
      "wnja-panel"
    );

    panel.append(
      node(
        "h3",
        "wnja-section-title",
        tr("distribution")
      )
    );

    const layout = node(
      "div",
      "wnja-donut-layout"
    );

    const donut = node(
      "div",
      "wnja-donut"
    );

    let cursor = 0;

    const segments = [];

    data.distribution.forEach(
      function (item) {
        if (!item.count || !data.total) {
          return;
        }

        const start = cursor;

        cursor +=
          (item.count / data.total) * 100;

        segments.push(
          COLORS[item.status] +
          " " + start + "% " +
          Math.min(100, cursor) + "%"
        );
      }
    );

    donut.style.background =
      segments.length
        ? "conic-gradient(" +
          segments.join(",") +
          ")"
        : "#e5e7eb";

    donut.setAttribute(
      "aria-hidden",
      "true"
    );

    const center = node(
      "div",
      "wnja-donut-center"
    );

    center.append(
      node(
        "strong",
        "wnja-donut-number",
        formatNumber(data.total)
      ),

      node(
        "span",
        "wnja-muted",
        tr("total")
      )
    );

    donut.append(center);

    const legend = node(
      "div",
      "wnja-legend"
    );

    data.distribution.forEach(
      function (item) {
        const row = node(
          "div",
          "wnja-legend-row"
        );

        const dot = node(
          "span",
          "wnja-dot"
        );

        dot.style.backgroundColor =
          COLORS[item.status];

        dot.setAttribute(
          "aria-hidden",
          "true"
        );

        row.append(
          dot,

          node(
            "span",
            "wnja-legend-label",
            statusLabel(item.status)
          ),

          node(
            "strong",
            "wnja-legend-value",
            formatNumber(item.count)
          )
        );

        legend.append(row);
      }
    );

    layout.append(donut, legend);
    panel.append(layout);

    return panel;
  }

  /* =========================
     STATUS DISTRIBUTION CHART
  ========================= */

  function renderBars(data) {
    const panel = node(
      "section",
      "wnja-panel"
    );

    panel.append(
      node(
        "h3",
        "wnja-section-title",
        tr("breakdown")
      )
    );

    const chart = node(
      "div",
      "wnja-bars"
    );

    data.distribution.forEach(
      function (item) {
        const row = node(
          "div",
          "wnja-bar-row"
        );

        const header = node(
          "div",
          "wnja-bar-header"
        );

        header.append(
          node(
            "span",
            "wnja-bar-label",
            statusLabel(item.status)
          ),

          node(
            "strong",
            "wnja-bar-value",
            formatNumber(item.count) +
              " · " +
              formatPercent(
                item.percentage
              )
          )
        );

        const track = node(
          "div",
          "wnja-track"
        );

        const fill = node(
          "div",
          "wnja-fill"
        );

        fill.style.width =
          Math.max(
            0,
            Math.min(
              100,
              item.percentage
            )
          ) + "%";

        fill.style.backgroundColor =
          COLORS[item.status];

        track.setAttribute(
          "role",
          "progressbar"
        );

        track.setAttribute(
          "aria-label",
          statusLabel(item.status)
        );

        track.setAttribute(
          "aria-valuemin",
          "0"
        );

        track.setAttribute(
          "aria-valuemax",
          "100"
        );

        track.setAttribute(
          "aria-valuenow",
          String(item.percentage)
        );

        track.append(fill);

        row.append(header, track);
        chart.append(row);
      }
    );

    panel.append(chart);

    return panel;
  }

  /* =========================
     APPLICATION OUTCOMES
  ========================= */

  function renderOutcomes(data) {
    const panel = node(
      "section",
      "wnja-panel"
    );

    panel.append(
      node(
        "h3",
        "wnja-section-title",
        tr("outcomes")
      )
    );

    const grid = node(
      "div",
      "wnja-outcomes"
    );

    [
      [
        "accepted",
        data.outcomes.accepted,
        "#15803d"
      ],
      [
        "rejected",
        data.outcomes.rejected,
        "#dc2626"
      ],
      [
        "withdrawn",
        data.outcomes.withdrawn,
        "#64748b"
      ]
    ].forEach(function (item) {
      grid.append(
        metric(
          tr(item[0]),
          formatNumber(item[1]),
          item[2]
        )
      );
    });

    panel.append(grid);

    return panel;
  }

  /* =========================
     MAIN RENDER
  ========================= */

  function render() {
    if (!root?.isConnected) return;

    const content =
      document.createDocumentFragment();

    const header = node(
      "div",
      "wnja-header"
    );

    header.append(
      node(
        "span",
        "wnja-brand",
        "WORKNELY"
      ),

      node(
        "h2",
        "wnja-title",
        tr("title")
      ),

      node(
        "p",
        "wnja-subtitle",
        tr("subtitle")
      )
    );

    content.append(header);

    root.setAttribute(
      "aria-label",
      tr("title")
    );

    root.setAttribute(
      "aria-busy",
      String(state.loading)
    );

    if (!storage()) {
      content.append(
        node(
          "div",
          "wnja-notice",
          tr("unavailable")
        )
      );

      root.replaceChildren(content);
      return;
    }

    if (!state.owner || recoveryMode) {
      content.append(
        node(
          "div",
          "wnja-notice",
          state.loading
            ? tr("loading")
            : tr("signin")
        )
      );

      root.replaceChildren(content);
      return;
    }

    const reload = button(
      "↻ " + tr("refresh"),
      refresh
    );

    reload.disabled = state.loading;

    content.append(reload);

    if (state.loading) {
      content.append(
        node(
          "div",
          "wnja-notice",
          tr("loading")
        )
      );

      root.replaceChildren(content);
      return;
    }

    if (state.error) {
      const error = node(
        "div",
        "wnja-error",
        tr("error")
      );

      error.setAttribute(
        "role",
        "alert"
      );

      content.append(error);

      root.replaceChildren(content);
      return;
    }

    const data = state.analytics;

    if (!data) {
      content.append(
        node(
          "div",
          "wnja-notice",
          tr("loading")
        )
      );

      root.replaceChildren(content);
      return;
    }

    content.append(
      renderMetrics(data)
    );

    if (data.total === 0) {
      content.append(
        node(
          "div",
          "wnja-notice",
          tr("empty")
        )
      );

    } else {
      content.append(
        renderDonut(data),
        renderBars(data),
        renderOutcomes(data)
      );
    }

    const footer = node(
      "div",
      "wnja-footer"
    );

    footer.append(
      node(
        "p",
        "wnja-muted",
        tr("disclaimer")
      ),

      node(
        "p",
        "wnja-muted",
        tr("updated") +
          ": " +
          formatDate(
            data.generatedAt
          )
      )
    );

    content.append(footer);

    root.replaceChildren(content);
  }

  /* =========================
     PREMIUM RESPONSIVE DESIGN
  ========================= */

  function installStyles() {
    if (
      document.getElementById(STYLE_ID)
    ) {
      return;
    }

    const style = node("style");

    style.id = STYLE_ID;

    style.textContent = `
      #wnJobAnalytics {
        --wnja-purple: #7540ef;
        --wnja-pink: #ec4899;
        --wnja-cyan: #06b6d4;
        --wnja-text: #1e293b;
        --wnja-muted: #64748b;

        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        margin: 24px 0;
        padding: clamp(12px, 3vw, 28px);
        border: 1px solid #e9e3fb;
        border-radius: 24px;
        color: var(--wnja-text);
        background: linear-gradient(
          145deg,
          #faf7ff,
          #ffffff 55%,
          #f0fdff
        );
        font-family:
          Inter, -apple-system,
          BlinkMacSystemFont,
          "Segoe UI", sans-serif;
      }

      #wnJobAnalytics *,
      #wnJobAnalytics *::before,
      #wnJobAnalytics *::after {
        box-sizing: border-box;
        min-width: 0;
      }

      #wnJobAnalytics h2,
      #wnJobAnalytics h3,
      #wnJobAnalytics p {
        margin: 0;
        overflow-wrap: anywhere;
      }

      #wnJobAnalytics .wnja-header {
        margin-bottom: 20px;
      }

      #wnJobAnalytics .wnja-brand {
        display: inline-block;
        color: #7540ef;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 2px;
        margin-bottom: 10px;
      }

      #wnJobAnalytics .wnja-title {
        font-size: clamp(23px, 5vw, 34px);
        font-weight: 800;
        line-height: 1.2;
        color: #20183d;
      }

      #wnJobAnalytics .wnja-subtitle {
        margin-top: 8px;
        color: #64748b;
        font-size: 14px;
        line-height: 1.5;
      }

      #wnJobAnalytics .wnja-button {
        min-height: 44px;
        max-width: 100%;
        padding: 10px 16px;
        margin-bottom: 18px;
        border: 1px solid #e6dff7;
        border-radius: 12px;
        background: #ffffff;
        color: #5941a8;
        font: inherit;
        font-size: 14px;
        font-weight: 650;
        cursor: pointer;
        white-space: normal;
        overflow-wrap: anywhere;
        touch-action: manipulation;
      }

      #wnJobAnalytics .wnja-button:disabled {
        opacity: .55;
        cursor: not-allowed;
      }

      #wnJobAnalytics .wnja-button:focus-visible {
        outline: 3px solid #c4b5fd;
        outline-offset: 2px;
      }

      #wnJobAnalytics .wnja-metrics {
        display: grid;
        grid-template-columns:
          repeat(4, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 18px;
      }

      #wnJobAnalytics .wnja-metric {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
        border: 1px solid #e5e7ef;
        border-radius: 16px;
        background: #ffffff;
        overflow-wrap: anywhere;
      }

      #wnJobAnalytics .wnja-number {
        font-size: clamp(23px, 4vw, 34px);
        font-weight: 800;
        font-variant-numeric: tabular-nums;
      }

      #wnJobAnalytics .wnja-label {
        font-size: 13px;
        font-weight: 650;
        color: #334155;
        line-height: 1.5;
      }

      #wnJobAnalytics .wnja-muted {
        font-size: 12px;
        color: #64748b;
        line-height: 1.6;
        overflow-wrap: anywhere;
      }

      #wnJobAnalytics .wnja-panel {
        padding: clamp(14px, 3vw, 22px);
        margin-bottom: 18px;
        border: 1px solid #e5e7ef;
        border-radius: 18px;
        background: #ffffff;
      }

      #wnJobAnalytics .wnja-section-title {
        font-size: 17px;
        font-weight: 750;
        margin-bottom: 20px;
      }

      #wnJobAnalytics .wnja-donut-layout {
        display: grid;
        grid-template-columns:
          minmax(0, 1fr)
          minmax(0, 1fr);
        align-items: center;
        gap: 24px;
      }

      #wnJobAnalytics .wnja-donut {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 230px;
        aspect-ratio: 1;
        margin: auto;
        border-radius: 50%;
      }

      #wnJobAnalytics .wnja-donut-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 72%;
        height: 72%;
        padding: 12px;
        border-radius: 50%;
        background: #ffffff;
        text-align: center;
      }

      #wnJobAnalytics .wnja-donut-number {
        font-size: clamp(25px, 5vw, 38px);
        font-weight: 800;
        color: #20183d;
      }

      #wnJobAnalytics .wnja-legend {
        display: grid;
        gap: 10px;
      }

      #wnJobAnalytics .wnja-legend-row {
        display: grid;
        grid-template-columns:
          10px minmax(0, 1fr) auto;
        align-items: center;
        gap: 9px;
        font-size: 13px;
      }

      #wnJobAnalytics .wnja-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      #wnJobAnalytics .wnja-legend-label {
        color: #475569;
        overflow-wrap: anywhere;
      }

      #wnJobAnalytics .wnja-legend-value {
        font-variant-numeric: tabular-nums;
      }

      #wnJobAnalytics .wnja-bars {
        display: grid;
        gap: 18px;
      }

      #wnJobAnalytics .wnja-bar-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      #wnJobAnalytics .wnja-bar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 6px;
        font-size: 13px;
      }

      #wnJobAnalytics .wnja-bar-label {
        color: #475569;
        overflow-wrap: anywhere;
      }

      #wnJobAnalytics .wnja-bar-value {
        color: #334155;
        font-variant-numeric: tabular-nums;
      }

      #wnJobAnalytics .wnja-track {
        height: 10px;
        width: 100%;
        border-radius: 20px;
        background: #f1f5f9;
        overflow: hidden;
      }

      #wnJobAnalytics .wnja-fill {
        height: 100%;
        border-radius: 20px;
        transition: width .3s ease;
      }

      #wnJobAnalytics .wnja-outcomes {
        display: grid;
        grid-template-columns:
          repeat(3, minmax(0, 1fr));
        gap: 10px;
      }

      #wnJobAnalytics .wnja-notice {
        padding: 26px 14px;
        border: 1px dashed #ddd6fe;
        border-radius: 14px;
        background: #ffffff;
        color: #64748b;
        text-align: center;
        overflow-wrap: anywhere;
      }

      #wnJobAnalytics .wnja-error {
        padding: 14px;
        border: 1px solid #fecaca;
        border-radius: 12px;
        background: #fef2f2;
        color: #b91c1c;
        overflow-wrap: anywhere;
      }

      #wnJobAnalytics .wnja-footer {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 16px;
      }

      @media (max-width: 760px) {
        #wnJobAnalytics .wnja-metrics {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 520px) {
        #wnJobAnalytics {
          padding: 12px;
          border-radius: 18px;
        }

        #wnJobAnalytics .wnja-donut-layout {
          grid-template-columns: 1fr;
        }

        #wnJobAnalytics .wnja-donut {
          max-width: 190px;
        }

        #wnJobAnalytics .wnja-metric {
          padding: 12px;
        }

        #wnJobAnalytics .wnja-button {
          width: 100%;
        }

        #wnJobAnalytics .wnja-outcomes {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 340px) {
        #wnJobAnalytics .wnja-metrics {
          grid-template-columns: 1fr;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #wnJobAnalytics .wnja-fill {
          transition: none;
        }
      }

      @media print {
        #wnJobAnalytics {
          display: none !important;
        }
      }
    `;

    document.head.append(style);
  }

  /* =========================
     ANALYTICS SELF TEST
  ========================= */

  function selfTest() {
    const sample = calculate({
      byStatus: {
        saved: 2,
        applied: 5,
        screening: 2,
        interview: 3,
        assessment: 1,
        offer: 2,
        accepted: 1,
        rejected: 3,
        withdrawn: 1
      }
    });

    const empty = calculate({
      byStatus: {}
    });

    const invalid = calculate({
      byStatus: {
        applied: -5,
        interview: "invalid"
      }
    });

    const tests = [
      {
        name: "Total applications",
        passed: sample.total === 20
      },
      {
        name: "Tracked applications",
        passed: sample.tracked === 18
      },
      {
        name: "Active applications",
        passed: sample.active === 13
      },
      {
        name: "Advanced stages",
        passed: sample.advanced === 7
      },
      {
        name: "Positive stages",
        passed: sample.positive === 3
      },
      {
        name: "Closed applications",
        passed: sample.closed === 5
      },
      {
        name: "Advanced share",
        passed: sample.advancedShare === 38.9
      },
      {
        name: "Positive share",
        passed: sample.positiveShare === 16.7
      },
      {
        name: "Empty dataset",
        passed:
          empty.total === 0 &&
          empty.positiveShare === null
      },
      {
        name: "Invalid data protection",
        passed: invalid.total === 0
      }
    ];

    return {
      version: VERSION,
      passed: tests.every(
        test => test.passed
      ),
      totalTests: tests.length,
      successfulTests: tests.filter(
        test => test.passed
      ).length,
      tests
    };
  }

  /* =========================
     MOUNT AND INTEGRATION
  ========================= */

  function mount(target) {
    let container = null;

    if (typeof target === "string") {
      container =
        document.querySelector(target);

    } else if (
      target instanceof HTMLElement
    ) {
      container = target;
    }

    if (!container) {
      container = document.getElementById(
        "wnJobAnalyticsMount"
      );
    }

    const anchor =
      document.getElementById(
        "wnJobCalendar"
      ) ||
      document.getElementById(
        "wnJobPipeline"
      ) ||
      document.getElementById(
        "wnJobTracker"
      );

    const existing =
      document.getElementById(ROOT_ID);

    if (existing) {
      root = existing;

    } else if (container || anchor) {
      root = node(
        "section",
        "wnja-root"
      );

      root.id = ROOT_ID;

      if (container) {
        container.append(root);

      } else {
        anchor.insertAdjacentElement(
          "afterend",
          root
        );
      }

    } else {
      return false;
    }

    installStyles();
    bindAuthentication();
    render();

    return true;
  }

  /* =========================
     INITIALIZATION
  ========================= */

  function initialize() {
    if (!mount()) return false;

    if (!initialized) {
      initialized = true;

      document.addEventListener(
        "worknely:languagechange",
        render
      );

      document.addEventListener(
        "worknely:localizationready",
        render
      );

      document.getElementById(
        "language"
      )?.addEventListener(
        "change",
        render
      );

      document.addEventListener(
        "worknely:jobapplicationschange",
        function (event) {
          if (
            state.owner &&
            event.detail?.userId ===
              state.owner
          ) {
            scheduleRefresh();
          }
        }
      );

      document.addEventListener(
        "worknely:jobstorageready",
        function () {
          bindAuthentication();
          scheduleRefresh();
        }
      );

      window.addEventListener(
        "pagehide",
        clearPrivateState
      );
    }

    if (
      !state.loading &&
      !recoveryMode
    ) {
      scheduleRefresh();
    }

    return true;
  }

  /* =========================
     PUBLIC API
  ========================= */

  window.WorknelyJobAnalytics =
    Object.freeze({
      version: VERSION,

      mount,

      initialize,

      refresh,

      calculate,

      selfTest,

      getState: function () {
        return {
          version: VERSION,

          mounted: Boolean(
            root?.isConnected
          ),

          authenticated: Boolean(
            state.owner
          ),

          loading: state.loading,

          recoveryMode,

          language: language(),

          available: Boolean(
            state.analytics
          ),

          storageAvailable:
            Boolean(storage()),

          historicalConversionRates: false,

          automaticSaving: false,

          localDataStorage: false
        };
      }
    });

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      { once: true }
    );

  } else {
    initialize();
  }

  window.addEventListener(
    "load",
    initialize,
    { once: true }
  );

  window.addEventListener(
    "pageshow",
    initialize
  );

  document.addEventListener(
    "worknely:workspacechange",
    initialize
  );

  document.addEventListener(
    "worknely:jobinterfaceready",
    initialize
  );

  document.addEventListener(
    "worknely:jobpipelineready",
    initialize
  );

  document.addEventListener(
    "worknely:jobcalendarready",
    initialize
  );

  document.dispatchEvent(
    new CustomEvent(
      "worknely:jobanalyticsready",
      {
        detail: {
          version: VERSION
        }
      }
    )
  );

})();
