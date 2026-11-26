
/**
 * WORKNELY
 * Job Application Pipeline
 * Version: 7.19.4
 *
 * Secure multilingual Kanban workspace.
 * Copyright Worknely.
 */

(function () {
  "use strict";

  const VERSION = "7.19.4";
  const ROOT_ID = "wnJobPipeline";
  const STYLE_ID = "wnJobPipelineStyles";
  const PAGE_SIZE = 10;

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
    saved: "#64748b",
    applied: "#7540ef",
    screening: "#9333ea",
    interview: "#0891b2",
    assessment: "#d97706",
    offer: "#059669",
    accepted: "#15803d",
    rejected: "#dc2626",
    withdrawn: "#64748b"
  });

  /* =========================
     INTERNATIONAL LOCALIZATION
  ========================= */

  const DICTIONARY = {
    en: {
      title: "Application Pipeline",
      subtitle: "Track every step of your career journey.",
      empty: "No applications",
      signin: "Sign in to view your pipeline.",
      loading: "Loading pipeline...",
      refresh: "Refresh pipeline",
      move: "Move to stage",
      moving: "Updating application...",
      success: "Application stage updated.",
      error: "Unable to complete the operation.",
      unavailable: "Pipeline is unavailable.",
      total: "Total applications",
      active: "Active applications",
      accepted: "Accepted offers",
      more: "Load more",
      remaining: "More applications available",
      stage: "Application stage",
      statuses: [
        "Saved",
        "Applied",
        "Screening",
        "Interview",
        "Assessment",
        "Offer",
        "Accepted",
        "Rejected",
        "Withdrawn"
      ]
    },

    ro: {
      title: "Evoluția candidaturilor",
      subtitle: "Urmărește fiecare etapă a carierei tale.",
      empty: "Nicio candidatură",
      signin: "Autentifică-te pentru a vedea candidaturile.",
      loading: "Se încarcă...",
      refresh: "Actualizează",
      move: "Mută în etapa",
      moving: "Se actualizează candidatura...",
      success: "Etapa candidaturii a fost actualizată.",
      error: "Operațiunea nu a putut fi finalizată.",
      unavailable: "Modulul nu este disponibil.",
      total: "Total candidaturi",
      active: "Candidaturi active",
      accepted: "Oferte acceptate",
      more: "Încarcă mai multe",
      remaining: "Mai există candidaturi",
      stage: "Etapa candidaturii",
      statuses: [
        "Salvate",
        "Trimise",
        "Evaluare inițială",
        "Interviu",
        "Testare",
        "Ofertă",
        "Acceptate",
        "Respinse",
        "Retrase"
      ]
    },

    it: {
      title: "Percorso delle candidature",
      subtitle: "Segui ogni fase della tua carriera.",
      empty: "Nessuna candidatura",
      signin: "Accedi per visualizzare le candidature.",
      loading: "Caricamento...",
      refresh: "Aggiorna",
      move: "Sposta nella fase",
      moving: "Aggiornamento candidatura...",
      success: "Stato della candidatura aggiornato.",
      error: "Impossibile completare l'operazione.",
      unavailable: "Modulo non disponibile.",
      total: "Candidature totali",
      active: "Candidature attive",
      accepted: "Offerte accettate",
      more: "Carica altro",
      remaining: "Altre candidature disponibili",
      stage: "Fase della candidatura",
      statuses: [
        "Salvate",
        "Inviate",
        "Selezione",
        "Colloquio",
        "Valutazione",
        "Offerta",
        "Accettate",
        "Rifiutate",
        "Ritirate"
      ]
    },

    de: {
      title: "Bewerbungspipeline",
      subtitle: "Verfolge jeden Schritt deiner Karriere.",
      empty: "Keine Bewerbungen",
      signin: "Melde dich an, um Bewerbungen zu sehen.",
      loading: "Wird geladen...",
      refresh: "Aktualisieren",
      move: "Phase ändern",
      moving: "Bewerbung wird aktualisiert...",
      success: "Bewerbungsphase aktualisiert.",
      error: "Vorgang konnte nicht abgeschlossen werden.",
      unavailable: "Modul nicht verfügbar.",
      total: "Bewerbungen insgesamt",
      active: "Aktive Bewerbungen",
      accepted: "Angenommene Angebote",
      more: "Mehr laden",
      remaining: "Weitere Bewerbungen verfügbar",
      stage: "Bewerbungsphase",
      statuses: [
        "Gespeichert",
        "Beworben",
        "Vorauswahl",
        "Gespräch",
        "Bewertung",
        "Angebot",
        "Angenommen",
        "Abgelehnt",
        "Zurückgezogen"
      ]
    },

    fr: {
      title: "Parcours des candidatures",
      subtitle: "Suivez chaque étape de votre carrière.",
      empty: "Aucune candidature",
      signin: "Connectez-vous pour voir vos candidatures.",
      loading: "Chargement...",
      refresh: "Actualiser",
      move: "Changer d'étape",
      moving: "Mise à jour...",
      success: "Étape de candidature mise à jour.",
      error: "Impossible de terminer l'opération.",
      unavailable: "Module indisponible.",
      total: "Total des candidatures",
      active: "Candidatures actives",
      accepted: "Offres acceptées",
      more: "Afficher plus",
      remaining: "Autres candidatures disponibles",
      stage: "Étape de candidature",
      statuses: [
        "Enregistrées",
        "Envoyées",
        "Présélection",
        "Entretien",
        "Évaluation",
        "Offre",
        "Acceptées",
        "Refusées",
        "Retirées"
      ]
    },

    es: {
      title: "Proceso de candidaturas",
      subtitle: "Sigue cada etapa de tu carrera.",
      empty: "No hay candidaturas",
      signin: "Inicia sesión para ver tus candidaturas.",
      loading: "Cargando...",
      refresh: "Actualizar",
      move: "Cambiar de etapa",
      moving: "Actualizando candidatura...",
      success: "Etapa de candidatura actualizada.",
      error: "No se pudo completar la operación.",
      unavailable: "Módulo no disponible.",
      total: "Total de candidaturas",
      active: "Candidaturas activas",
      accepted: "Ofertas aceptadas",
      more: "Cargar más",
      remaining: "Más candidaturas disponibles",
      stage: "Etapa de candidatura",
      statuses: [
        "Guardadas",
        "Enviadas",
        "Preselección",
        "Entrevista",
        "Evaluación",
        "Oferta",
        "Aceptadas",
        "Rechazadas",
        "Retiradas"
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
  let generation = 0;
  let recoveryMode = false;
  let refreshScheduled = false;
  let draggedApplication = null;

  const state = {
    owner: null,
    loading: false,
    busy: false,
    error: false,
    statistics: null,
    records: {},
    limits: {},
    message: null,
    messageType: ""
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
    const index = STATUSES.indexOf(status);

    return DICTIONARY[language()]
      .statuses[index] || status;
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
      "wnjp-button",
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

  function formatDate(value) {
    if (!value) return "";

    const date = new Date(
      /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? value + "T00:00:00"
        : value
    );

    if (!Number.isFinite(date.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat(
      language(),
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    ).format(date);
  }

  function isCurrent(ticket, owner) {
    return (
      ticket === generation &&
      state.owner === owner &&
      !recoveryMode
    );
  }

  function clearPrivateState() {
    generation += 1;

    state.owner = null;
    state.loading = false;
    state.busy = false;
    state.error = false;
    state.statistics = null;
    state.records = {};
    state.limits = {};
    state.message = null;
    state.messageType = "";

    draggedApplication = null;

    if (root) {
      root.replaceChildren();
    }
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
      state.busy ||
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

      const entries = await Promise.all(
        STATUSES.map(async function (status) {
          const count =
            statistics.byStatus?.[status] || 0;

          if (!count) {
            return [status, []];
          }

          const limit = Math.min(
            100,
            state.limits[status] || PAGE_SIZE
          );

          const records = await engine.list({
            expectedUserId: owner,
            status,
            limit,
            offset: 0
          });

          return [status, records];
        })
      );

      if (!isCurrent(ticket, owner)) {
        return;
      }

      state.statistics = statistics;
      state.records = Object.fromEntries(entries);

    } catch {
      if (ticket !== generation) return;

      state.error = true;
      state.records = {};
      state.statistics = null;
      state.message = "error";
      state.messageType = "error";

    } finally {
      if (ticket === generation) {
        state.loading = false;
        render();
      }
    }
  }

  /* =========================
     LOAD ADDITIONAL RECORDS
  ========================= */

  async function loadMore(status) {
    if (
      !state.owner ||
      state.loading ||
      state.busy ||
      !STATUSES.includes(status)
    ) {
      return;
    }

    const owner = state.owner;
    const ticket = ++generation;

    const current =
      state.records[status] || [];

    state.busy = true;
    render();

    try {
      const records = await storage().list({
        expectedUserId: owner,
        status,
        limit: PAGE_SIZE,
        offset: current.length
      });

      if (!isCurrent(ticket, owner)) {
        return;
      }

      const unique = new Map(
        current.map(record => [
          record.id,
          record
        ])
      );

      records.forEach(function (record) {
        unique.set(record.id, record);
      });

      state.records[status] =
        Array.from(unique.values());

      state.limits[status] = Math.min(
        100,
        state.records[status].length
      );

      if (
        records.length === 0 ||
        state.records[status].length ===
          current.length
      ) {
        scheduleRefresh();
      }

    } catch {
      if (isCurrent(ticket, owner)) {
        state.message = "error";
        state.messageType = "error";
      }

    } finally {
      if (isCurrent(ticket, owner)) {
        state.busy = false;
        render();
      }
    }
  }

  /* =========================
     SECURE STATUS MANAGEMENT
  ========================= */

  function findApplication(id) {
    for (const status of STATUSES) {
      const records =
        state.records[status] || [];

      const record = records.find(
        item => item.id === id
      );

      if (record) return record;
    }

    return null;
  }

  async function moveApplication(id, status) {
    if (
      !state.owner ||
      state.loading ||
      state.busy ||
      recoveryMode ||
      !STATUSES.includes(status)
    ) {
      return false;
    }

    const record = findApplication(id);

    if (
      !record ||
      record.user_id !== state.owner ||
      record.status === status
    ) {
      return false;
    }

    const owner = state.owner;
    const ticket = ++generation;

    state.busy = true;
    state.message = "moving";
    state.messageType = "";

    draggedApplication = null;

    render();

    try {
      await storage().updateStatus(
        id,
        status,
        {
          expectedUserId: owner
        }
      );

      if (!isCurrent(ticket, owner)) {
        return false;
      }

      state.message = "success";
      state.messageType = "success";

      return true;

    } catch {
      if (isCurrent(ticket, owner)) {
        state.message = "error";
        state.messageType = "error";
      }

      return false;

    } finally {
      if (isCurrent(ticket, owner)) {
        state.busy = false;
        render();
        scheduleRefresh();
      }
    }
  }

  /* =========================
     DASHBOARD METRICS
  ========================= */

  function metric(label, value, color) {
    const card = node(
      "div",
      "wnjp-metric"
    );

    const number = node(
      "strong",
      "wnjp-metric-number",
      formatNumber(value)
    );

    number.style.color = color;

    card.append(
      number,
      node(
        "span",
        "wnjp-muted",
        label
      )
    );

    return card;
  }

  function renderMetrics() {
    const grid = node(
      "div",
      "wnjp-metrics"
    );

    const stats = state.statistics;

    grid.append(
      metric(
        tr("total"),
        stats?.total,
        "#7540ef"
      ),

      metric(
        tr("active"),
        stats?.active,
        "#db2777"
      ),

      metric(
        tr("accepted"),
        stats?.accepted,
        "#15803d"
      )
    );

    return grid;
  }

  /* =========================
     KANBAN APPLICATION CARD
  ========================= */

  function renderApplication(record) {
    const card = node(
      "article",
      "wnjp-card"
    );

    card.draggable =
      !state.busy &&
      !state.loading;

    card.addEventListener(
      "dragstart",
      function (event) {
        if (
          state.busy ||
          state.loading ||
          record.user_id !== state.owner
        ) {
          event.preventDefault();
          return;
        }

        draggedApplication = {
          id: record.id,
          owner: state.owner,
          generation
        };

        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed =
            "move";

          event.dataTransfer.setData(
            "text/plain",
            record.id
          );
        }

        card.classList.add(
          "wnjp-dragging"
        );
      }
    );

    card.addEventListener(
      "dragend",
      function () {
        draggedApplication = null;

        card.classList.remove(
          "wnjp-dragging"
        );

        root?.querySelectorAll(
          ".wnjp-drop-active"
        ).forEach(function (element) {
          element.classList.remove(
            "wnjp-drop-active"
          );
        });
      }
    );

    const header = node(
      "div",
      "wnjp-card-header"
    );

    const logo = node(
      "span",
      "wnjp-logo",
      String(record.company || "?")
        .slice(0, 1)
        .toUpperCase()
    );

    logo.setAttribute(
      "aria-hidden",
      "true"
    );

    const identity = node(
      "div",
      "wnjp-identity"
    );

    identity.append(
      node(
        "strong",
        "wnjp-company",
        record.company
      ),

      node(
        "span",
        "wnjp-position",
        record.job_title
      )
    );

    header.append(logo, identity);
    card.append(header);

    if (record.location) {
      card.append(
        node(
          "span",
          "wnjp-muted",
          record.location
        )
      );
    }

    if (record.applied_at) {
      card.append(
        node(
          "span",
          "wnjp-date",
          formatDate(record.applied_at)
        )
      );
    }

    const select = node(
      "select",
      "wnjp-select"
    );

    select.setAttribute(
      "aria-label",
      tr("move") + ": " + record.company
    );

    select.disabled =
      state.busy || state.loading;

    STATUSES.forEach(function (status) {
      const option = node(
        "option",
        "",
        statusLabel(status)
      );

      option.value = status;
      select.append(option);
    });

    select.value = record.status;

    select.addEventListener(
      "change",
      function () {
        moveApplication(
          record.id,
          select.value
        );
      }
    );

    card.append(select);

    return card;
  }

  /* =========================
     KANBAN STAGE
  ========================= */

  function renderColumn(status) {
    const column = node(
      "section",
      "wnjp-column"
    );

    const color = COLORS[status];

    column.style.setProperty(
      "--wnjp-stage",
      color
    );

    column.setAttribute(
      "aria-label",
      statusLabel(status)
    );

    const records =
      state.records[status] || [];

    const count =
      state.statistics?.byStatus?.[status] || 0;

    const header = node(
      "div",
      "wnjp-column-header"
    );

    const dot = node(
      "span",
      "wnjp-dot"
    );

    dot.style.backgroundColor = color;

    dot.setAttribute(
      "aria-hidden",
      "true"
    );

    const title = node(
      "h3",
      "wnjp-column-title",
      statusLabel(status)
    );

    const counter = node(
      "span",
      "wnjp-counter",
      formatNumber(count)
    );

    header.append(
      dot,
      title,
      counter
    );

    column.append(header);

    const body = node(
      "div",
      "wnjp-column-body"
    );

    if (!records.length) {
      body.append(
        node(
          "div",
          "wnjp-empty",
          tr("empty")
        )
      );

    } else {
      records.forEach(function (record) {
        body.append(
          renderApplication(record)
        );
      });
    }

    if (count > records.length) {
      const more = button(
        tr("more") +
          " (" +
          formatNumber(
            count - records.length
          ) +
          ")",

        function () {
          loadMore(status);
        }
      );

      more.disabled =
        state.loading || state.busy;

      body.append(more);
    }

    column.append(body);

    column.addEventListener(
      "dragover",
      function (event) {
        if (
          !draggedApplication ||
          state.busy ||
          state.loading ||
          draggedApplication.owner !==
            state.owner ||
          draggedApplication.generation !==
            generation
        ) {
          return;
        }

        event.preventDefault();

        if (event.dataTransfer) {
          event.dataTransfer.dropEffect =
            "move";
        }

        column.classList.add(
          "wnjp-drop-active"
        );
      }
    );

    column.addEventListener(
      "dragleave",
      function (event) {
        if (
          !event.relatedTarget ||
          !column.contains(
            event.relatedTarget
          )
        ) {
          column.classList.remove(
            "wnjp-drop-active"
          );
        }
      }
    );

    column.addEventListener(
      "drop",
      function (event) {
        event.preventDefault();

        column.classList.remove(
          "wnjp-drop-active"
        );

        const drag = draggedApplication;

        draggedApplication = null;

        if (
          !drag ||
          drag.owner !== state.owner ||
          drag.generation !== generation
        ) {
          return;
        }

        moveApplication(
          drag.id,
          status
        );
      }
    );

    return column;
  }

  /* =========================
     MAIN RENDER
  ========================= */

  function render() {
    if (!root?.isConnected) return;

    const previousScroll =
      root.querySelector(
        ".wnjp-board"
      )?.scrollLeft || 0;

    const fragment =
      document.createDocumentFragment();

    const header = node(
      "div",
      "wnjp-header"
    );

    const heading = node(
      "div",
      "wnjp-heading"
    );

    heading.append(
      node(
        "span",
        "wnjp-brand",
        "WORKNELY"
      ),

      node(
        "h2",
        "wnjp-title",
        tr("title")
      ),

      node(
        "p",
        "wnjp-subtitle",
        tr("subtitle")
      )
    );

    header.append(heading);

    root.setAttribute(
      "aria-label",
      tr("title")
    );

    root.setAttribute(
      "aria-busy",
      String(
        state.loading || state.busy
      )
    );

    fragment.append(header);

    if (!storage()) {
      fragment.append(
        node(
          "div",
          "wnjp-notice",
          tr("unavailable")
        )
      );

      root.replaceChildren(fragment);
      return;
    }

    if (!state.owner || recoveryMode) {
      fragment.append(
        node(
          "div",
          "wnjp-notice",
          state.loading
            ? tr("loading")
            : tr("signin")
        )
      );

      root.replaceChildren(fragment);
      return;
    }

    const reload = button(
      "↻ " + tr("refresh"),
      refresh
    );

    reload.disabled =
      state.loading || state.busy;

    header.append(reload);

    fragment.append(renderMetrics());

    if (state.message) {
      const message = node(
        "div",
        "wnjp-message " +
          (
            state.messageType === "error"
              ? "wnjp-error"
              : state.messageType === "success"
                ? "wnjp-success"
                : ""
          ),
        tr(state.message)
      );

      message.setAttribute(
        "role",
        state.messageType === "error"
          ? "alert"
          : "status"
      );

      fragment.append(message);
    }

    if (state.loading) {
      fragment.append(
        node(
          "div",
          "wnjp-notice",
          tr("loading")
        )
      );

    } else if (!state.error) {
      const board = node(
        "div",
        "wnjp-board"
      );

      STATUSES.forEach(function (status) {
        board.append(
          renderColumn(status)
        );
      });

      fragment.append(board);
    }

    root.replaceChildren(fragment);

    const board =
      root.querySelector(".wnjp-board");

    if (board) {
      board.scrollLeft = previousScroll;
    }
  }

  /* =========================
     PREMIUM RESPONSIVE STYLES
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
      #wnJobPipeline {
        --wnjp-purple: #7540ef;
        --wnjp-pink: #ec4899;
        --wnjp-cyan: #06b6d4;
        --wnjp-text: #1e293b;
        --wnjp-muted: #64748b;

        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        margin: 24px 0;
        padding: clamp(14px, 3vw, 28px);
        border: 1px solid #e9e3fb;
        border-radius: 24px;
        color: var(--wnjp-text);
        background: linear-gradient(
          145deg,
          #faf7ff,
          #ffffff 55%,
          #f0fdff
        );
        font-family:
          Inter,
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          sans-serif;
      }

      #wnJobPipeline *,
      #wnJobPipeline *::before,
      #wnJobPipeline *::after {
        box-sizing: border-box;
        min-width: 0;
      }

      #wnJobPipeline h2,
      #wnJobPipeline h3,
      #wnJobPipeline p {
        margin: 0;
        overflow-wrap: anywhere;
      }

      #wnJobPipeline .wnjp-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 20px;
      }

      #wnJobPipeline .wnjp-heading {
        flex: 1 1 220px;
      }

      #wnJobPipeline .wnjp-brand {
        display: inline-block;
        color: #7540ef;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 2px;
        margin-bottom: 10px;
      }

      #wnJobPipeline .wnjp-title {
        font-size: clamp(23px, 4vw, 34px);
        font-weight: 800;
        line-height: 1.2;
        color: #20183d;
      }

      #wnJobPipeline .wnjp-subtitle {
        color: #64748b;
        font-size: 14px;
        line-height: 1.5;
        margin-top: 8px;
      }

      #wnJobPipeline .wnjp-metrics {
        display: grid;
        grid-template-columns:
          repeat(3, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 22px;
      }

      #wnJobPipeline .wnjp-metric {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
        border: 1px solid #e5e7ef;
        border-radius: 16px;
        background: #ffffff;
        overflow-wrap: anywhere;
      }

      #wnJobPipeline .wnjp-metric-number {
        font-size: clamp(24px, 4vw, 34px);
        font-weight: 800;
        font-variant-numeric: tabular-nums;
      }

      #wnJobPipeline .wnjp-muted {
        color: #64748b;
        font-size: 12px;
        line-height: 1.5;
        overflow-wrap: anywhere;
      }

      #wnJobPipeline .wnjp-board {
        display: grid;
        grid-template-columns:
          repeat(9, minmax(230px, 1fr));
        gap: 12px;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        align-items: start;
        overflow-x: auto;
        overscroll-behavior-x: contain;
        padding: 4px 2px 16px;
        scrollbar-width: thin;
        scrollbar-color: #c4b5fd transparent;
        -webkit-overflow-scrolling: touch;
      }

      #wnJobPipeline .wnjp-column {
        min-width: 0;
        padding: 12px;
        border: 1px solid #e5e7ef;
        border-top: 4px solid
          var(--wnjp-stage);
        border-radius: 16px;
        background: #f8fafc;
        transition:
          background-color .15s,
          border-color .15s;
      }

      #wnJobPipeline .wnjp-column-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 14px;
      }

      #wnJobPipeline .wnjp-dot {
        width: 9px;
        height: 9px;
        flex: 0 0 9px;
        border-radius: 50%;
      }

      #wnJobPipeline .wnjp-column-title {
        flex: 1;
        font-size: 13px;
        font-weight: 750;
        line-height: 1.4;
      }

      #wnJobPipeline .wnjp-counter {
        padding: 5px 9px;
        border-radius: 20px;
        background: #ffffff;
        color: var(--wnjp-stage);
        font-size: 12px;
        font-weight: 800;
        border: 1px solid #e5e7ef;
      }

      #wnJobPipeline .wnjp-column-body {
        display: grid;
        gap: 10px;
      }

      #wnJobPipeline .wnjp-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
        border: 1px solid #e5e7ef;
        border-radius: 13px;
        background: #ffffff;
        box-shadow:
          0 3px 12px rgba(31, 24, 64, .05);
        overflow-wrap: anywhere;
      }

      #wnJobPipeline .wnjp-card[draggable="true"] {
        cursor: grab;
      }

      #wnJobPipeline .wnjp-card-header {
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }

      #wnJobPipeline .wnjp-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 36px;
        width: 36px;
        height: 36px;
        border-radius: 11px;
        background: linear-gradient(
          135deg,
          #ede9fe,
          #cffafe
        );
        color: #7540ef;
        font-size: 17px;
        font-weight: 800;
      }

      #wnJobPipeline .wnjp-identity {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 4px;
      }

      #wnJobPipeline .wnjp-company {
        font-size: 14px;
        font-weight: 750;
        overflow-wrap: anywhere;
      }

      #wnJobPipeline .wnjp-position {
        font-size: 12px;
        color: #475569;
        line-height: 1.5;
        overflow-wrap: anywhere;
      }

      #wnJobPipeline .wnjp-date {
        color: #64748b;
        font-size: 12px;
      }

      #wnJobPipeline .wnjp-select {
        display: block;
        width: 100%;
        max-width: 100%;
        min-height: 44px;
        padding: 8px 10px;
        border: 1px solid #e6dff7;
        border-radius: 10px;
        background: #faf8ff;
        color: #5941a8;
        font: inherit;
        font-size: 16px;
      }

      #wnJobPipeline .wnjp-button {
        min-height: 44px;
        max-width: 100%;
        padding: 10px 14px;
        border: 1px solid #e6dff7;
        border-radius: 11px;
        background: #ffffff;
        color: #5941a8;
        font: inherit;
        font-size: 13px;
        font-weight: 650;
        cursor: pointer;
        white-space: normal;
        overflow-wrap: anywhere;
        touch-action: manipulation;
      }

      #wnJobPipeline .wnjp-button:disabled,
      #wnJobPipeline .wnjp-select:disabled {
        opacity: .55;
        cursor: not-allowed;
      }

      #wnJobPipeline .wnjp-button:focus-visible,
      #wnJobPipeline .wnjp-select:focus-visible {
        outline: 3px solid #c4b5fd;
        outline-offset: 2px;
      }

      #wnJobPipeline .wnjp-empty {
        padding: 24px 10px;
        border: 1px dashed #d8dce7;
        border-radius: 12px;
        color: #64748b;
        font-size: 12px;
        text-align: center;
      }

      #wnJobPipeline .wnjp-notice {
        padding: 28px 16px;
        border: 1px dashed #ddd6fe;
        border-radius: 16px;
        background: #ffffff;
        color: #64748b;
        text-align: center;
        overflow-wrap: anywhere;
      }

      #wnJobPipeline .wnjp-message {
        padding: 12px;
        margin-bottom: 14px;
        border-radius: 12px;
        background: #f5f3ff;
        color: #5941a8;
        font-size: 13px;
        line-height: 1.5;
      }

      #wnJobPipeline .wnjp-success {
        background: #f0fdf4;
        color: #166534;
        border: 1px solid #bbf7d0;
      }

      #wnJobPipeline .wnjp-error {
        background: #fef2f2;
        color: #b91c1c;
        border: 1px solid #fecaca;
      }

      #wnJobPipeline .wnjp-dragging {
        opacity: .5;
      }

      #wnJobPipeline .wnjp-drop-active {
        background: #ede9fe;
        border-color: #7540ef;
      }

      @media (max-width: 700px) {
        #wnJobPipeline .wnjp-board {
          display: flex;
          flex-direction: column;
          overflow-x: visible;
        }

        #wnJobPipeline .wnjp-column {
          width: 100%;
          max-width: 100%;
        }

        #wnJobPipeline .wnjp-column-body {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
        }

        #wnJobPipeline .wnjp-metrics {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
        }

        #wnJobPipeline
        .wnjp-metric:last-child {
          grid-column: 1 / -1;
        }
      }

      @media (max-width: 480px) {
        #wnJobPipeline {
          padding: 12px;
          border-radius: 18px;
        }

        #wnJobPipeline .wnjp-column-body {
          grid-template-columns: 1fr;
        }

        #wnJobPipeline .wnjp-header
        > .wnjp-button {
          width: 100%;
        }
      }

      @media (max-width: 340px) {
        #wnJobPipeline .wnjp-metrics {
          grid-template-columns: 1fr;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #wnJobPipeline * {
          transition: none !important;
        }
      }

      @media print {
        #wnJobPipeline {
          display: none !important;
        }
      }
    `;

    document.head.append(style);
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
        "wnJobPipelineMount"
      );
    }

    const tracker = document.getElementById(
      "wnJobTracker"
    );

    const existing = document.getElementById(
      ROOT_ID
    );

    if (existing) {
      root = existing;

    } else if (container || tracker) {
      root = node(
        "section",
        "wnjp-root"
      );

      root.id = ROOT_ID;

      if (container) {
        container.append(root);

      } else {
        tracker.insertAdjacentElement(
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
          const detail =
            event.detail || {};

          if (
            state.owner &&
            detail.userId === state.owner &&
            !state.busy
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
      !state.busy &&
      !recoveryMode
    ) {
      scheduleRefresh();
    }

    return true;
  }

  /* =========================
     PUBLIC API
  ========================= */

  window.WorknelyJobPipeline =
    Object.freeze({
      version: VERSION,

      mount,

      initialize,

      refresh,

      moveApplication,

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

          busy: state.busy,

          recoveryMode,

          language: language(),

          totalApplications:
            state.statistics?.total ?? null,

          stages: STATUSES.length,

          storageAvailable:
            Boolean(storage()),

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

  document.dispatchEvent(
    new CustomEvent(
      "worknely:jobpipelineready",
      {
        detail: {
          version: VERSION
        }
      }
    )
  );

})();
