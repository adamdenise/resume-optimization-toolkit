
/**
 * WORKNELY
 * Interview & Follow-up Calendar
 * Version: 7.19.5
 * Copyright Worknely.
 */

(function () {
  "use strict";

  const VERSION = "7.19.5";
  const ROOT_ID = "wnJobCalendar";
  const STYLE_ID = "wnJobCalendarStyles";

  const DICTIONARY = {
    en: [
      "Interview Calendar",
      "Organize your interviews and professional follow-ups.",
      "Today", "Previous month", "Next month",
      "Interviews", "Follow-ups", "Upcoming events",
      "No scheduled events", "Sign in to view your calendar.",
      "Loading calendar...", "Refresh calendar",
      "Unable to load calendar.", "Interview", "Follow-up",
      "Events on selected day", "Calendar unavailable.",
      "All events", "Dates are displayed in your local time.",
      "Loaded applications", "Load more applications",
      "No upcoming events", "Selected day"
    ],
    ro: [
      "Calendarul interviurilor",
      "Organizează interviurile și revenirile profesionale.",
      "Astăzi", "Luna anterioară", "Luna următoare",
      "Interviuri", "Reveniri", "Evenimente viitoare",
      "Nu există evenimente programate",
      "Autentifică-te pentru a vedea calendarul.",
      "Se încarcă...", "Actualizează calendarul",
      "Calendarul nu a putut fi încărcat.",
      "Interviu", "Revenire",
      "Evenimentele zilei selectate",
      "Calendar indisponibil.",
      "Toate evenimentele",
      "Datele sunt afișate conform orei locale.",
      "Candidaturi încărcate",
      "Încarcă mai multe candidaturi",
      "Nu există evenimente viitoare",
      "Ziua selectată"
    ],
    it: [
      "Calendario colloqui",
      "Organizza colloqui e follow-up professionali.",
      "Oggi", "Mese precedente", "Mese successivo",
      "Colloqui", "Follow-up", "Prossimi eventi",
      "Nessun evento programmato",
      "Accedi per visualizzare il calendario.",
      "Caricamento...", "Aggiorna calendario",
      "Impossibile caricare il calendario.",
      "Colloquio", "Follow-up",
      "Eventi del giorno selezionato",
      "Calendario non disponibile.",
      "Tutti gli eventi",
      "Le date sono visualizzate nell'ora locale.",
      "Candidature caricate",
      "Carica altre candidature",
      "Nessun evento futuro",
      "Giorno selezionato"
    ],
    de: [
      "Interviewkalender",
      "Organisiere Gespräche und berufliche Folgetermine.",
      "Heute", "Vorheriger Monat", "Nächster Monat",
      "Gespräche", "Folgetermine", "Bevorstehende Termine",
      "Keine geplanten Termine",
      "Melde dich an, um den Kalender zu sehen.",
      "Wird geladen...", "Kalender aktualisieren",
      "Kalender konnte nicht geladen werden.",
      "Gespräch", "Folgetermin",
      "Termine am ausgewählten Tag",
      "Kalender nicht verfügbar.",
      "Alle Termine",
      "Termine werden in deiner Ortszeit angezeigt.",
      "Geladene Bewerbungen",
      "Weitere Bewerbungen laden",
      "Keine bevorstehenden Termine",
      "Ausgewählter Tag"
    ],
    fr: [
      "Calendrier des entretiens",
      "Organisez vos entretiens et relances professionnelles.",
      "Aujourd'hui", "Mois précédent", "Mois suivant",
      "Entretiens", "Relances", "Événements à venir",
      "Aucun événement programmé",
      "Connectez-vous pour consulter le calendrier.",
      "Chargement...", "Actualiser le calendrier",
      "Impossible de charger le calendrier.",
      "Entretien", "Relance",
      "Événements du jour sélectionné",
      "Calendrier indisponible.",
      "Tous les événements",
      "Les dates sont affichées en heure locale.",
      "Candidatures chargées",
      "Charger plus de candidatures",
      "Aucun événement à venir",
      "Jour sélectionné"
    ],
    es: [
      "Calendario de entrevistas",
      "Organiza entrevistas y seguimientos profesionales.",
      "Hoy", "Mes anterior", "Mes siguiente",
      "Entrevistas", "Seguimientos", "Próximos eventos",
      "No hay eventos programados",
      "Inicia sesión para ver el calendario.",
      "Cargando...", "Actualizar calendario",
      "No se pudo cargar el calendario.",
      "Entrevista", "Seguimiento",
      "Eventos del día seleccionado",
      "Calendario no disponible.",
      "Todos los eventos",
      "Las fechas se muestran en tu hora local.",
      "Candidaturas cargadas",
      "Cargar más candidaturas",
      "No hay próximos eventos",
      "Día seleccionado"
    ]
  };

  const COLORS = {
    interview: "#7540ef",
    followup: "#0891b2"
  };

  const PAGE_SIZE = 100;

  let root = null;
  let authClient = null;
  let authSubscription = null;
  let initialized = false;
  let recoveryMode = false;
  let generation = 0;
  let refreshScheduled = false;

  const state = {
    owner: null,
    records: [],
    events: [],
    loading: false,
    error: false,
    hasMore: false,
    limit: PAGE_SIZE,
    filter: "all",
    month: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ),
    selected: dateKey(new Date())
  };

  /* =========================
     LOCALIZATION
  ========================= */

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

  function tr(index) {
    return DICTIONARY[language()][index] ||
      DICTIONARY.en[index] || "";
  }

  /* =========================
     SAFE DOM UTILITIES
  ========================= */

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

  function button(text, handler, className) {
    const element = node(
      "button",
      className || "wnjc-button",
      text
    );

    element.type = "button";

    if (handler) {
      element.addEventListener("click", handler);
    }

    return element;
  }

  function storage() {
    return window.WorknelyJobStorage;
  }

  /* =========================
     DATE MANAGEMENT
  ========================= */

  function dateKey(date) {
    const pad = value =>
      String(value).padStart(2, "0");

    return (
      date.getFullYear() + "-" +
      pad(date.getMonth() + 1) + "-" +
      pad(date.getDate())
    );
  }

  function parseDate(value) {
    if (!value) return null;

    const date = new Date(value);

    return Number.isFinite(date.getTime())
      ? date
      : null;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat(
      language(),
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    ).format(date);
  }

  function formatTime(date) {
    return new Intl.DateTimeFormat(
      language(),
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    ).format(date);
  }

  function formatMonth(date) {
    return new Intl.DateTimeFormat(
      language(),
      {
        month: "long",
        year: "numeric"
      }
    ).format(date);
  }

  function weekdayLabels() {
    const monday = new Date(2024, 0, 1);

    return Array.from(
      { length: 7 },
      function (_, index) {
        const date = new Date(monday);

        date.setDate(
          monday.getDate() + index
        );

        return new Intl.DateTimeFormat(
          language(),
          { weekday: "short" }
        ).format(date);
      }
    );
  }

  /* =========================
     PRIVATE STATE
  ========================= */

  function clearPrivateState() {
    generation += 1;

    state.owner = null;
    state.records = [];
    state.events = [];
    state.loading = false;
    state.error = false;
    state.hasMore = false;
    state.limit = PAGE_SIZE;
    state.filter = "all";

    const today = new Date();

    state.month = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    state.selected = dateKey(today);

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
     CALENDAR EVENT ENGINE
  ========================= */

  function buildEvents(records) {
    const events = [];

    const inactive = [
      "accepted",
      "rejected",
      "withdrawn"
    ];

    records.forEach(function (record) {
      if (
        !record ||
        record.user_id !== state.owner
      ) {
        return;
      }

      const interview =
        parseDate(record.interview_at);

      const followup =
        parseDate(record.follow_up_at);

      if (interview) {
        events.push({
          id: record.id + "-interview",
          applicationId: record.id,
          company: record.company,
          jobTitle: record.job_title,
          location: record.location,
          status: record.status,
          type: "interview",
          date: interview,
          day: dateKey(interview),
          inactive: inactive.includes(
            record.status
          )
        });
      }

      if (followup) {
        events.push({
          id: record.id + "-followup",
          applicationId: record.id,
          company: record.company,
          jobTitle: record.job_title,
          location: record.location,
          status: record.status,
          type: "followup",
          date: followup,
          day: dateKey(followup),
          inactive: inactive.includes(
            record.status
          )
        });
      }
    });

    return events.sort(
      (a, b) =>
        a.date.getTime() -
        b.date.getTime()
    );
  }

  function filteredEvents() {
    return state.events.filter(
      function (event) {
        return (
          state.filter === "all" ||
          event.type === state.filter
        );
      }
    );
  }

  function eventsForDay(key) {
    return filteredEvents().filter(
      event => event.day === key
    );
  }

  function upcomingEvents() {
    const now = Date.now();

    return filteredEvents()
      .filter(function (event) {
        return (
          event.date.getTime() >= now &&
          !event.inactive
        );
      })
      .slice(0, 20);
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

      const records = [];

      const limit = state.limit;

      let offset = 0;
      let exhausted = false;

      while (offset < limit) {
        const batch = await engine.list({
          expectedUserId: owner,
          limit: Math.min(
            PAGE_SIZE,
            limit - offset
          ),
          offset
        });

        if (!isCurrent(ticket, owner)) {
          return;
        }

        records.push(...batch);

        offset += batch.length;

        if (batch.length < PAGE_SIZE) {
          exhausted = true;
          break;
        }
      }

      let hasMore = false;

      if (!exhausted) {
        const extra = await engine.list({
          expectedUserId: owner,
          limit: 1,
          offset: records.length
        });

        if (!isCurrent(ticket, owner)) {
          return;
        }

        hasMore = extra.length > 0;
      }

      const unique = new Map(
        records.map(record => [
          record.id,
          record
        ])
      );

      state.records =
        Array.from(unique.values());

      state.events =
        buildEvents(state.records);

      state.hasMore = hasMore;

    } catch {
      if (ticket !== generation) return;

      state.records = [];
      state.events = [];
      state.hasMore = false;
      state.error = true;

    } finally {
      if (ticket === generation) {
        state.loading = false;
        render();
      }
    }
  }

  /* =========================
     MONTH NAVIGATION
  ========================= */

  function changeMonth(direction) {
    state.month = new Date(
      state.month.getFullYear(),
      state.month.getMonth() + direction,
      1
    );

    state.selected =
      dateKey(state.month);

    render();
  }

  function goToday() {
    const today = new Date();

    state.month = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    state.selected = dateKey(today);

    render();
  }

  /* =========================
     CALENDAR METRICS
  ========================= */

  function metric(label, count, color) {
    const card = node(
      "div",
      "wnjc-metric"
    );

    const value = node(
      "strong",
      "wnjc-number",
      new Intl.NumberFormat(
        language()
      ).format(count)
    );

    value.style.color = color;

    card.append(
      value,
      node("span", "wnjc-muted", label)
    );

    return card;
  }

  function renderMetrics() {
    const grid = node(
      "div",
      "wnjc-metrics"
    );

    const monthPrefix =
      dateKey(state.month).slice(0, 7);

    const monthEvents =
      state.events.filter(
        event =>
          event.day.startsWith(monthPrefix)
      );

    grid.append(
      metric(
        tr(5),
        monthEvents.filter(
          event =>
            event.type === "interview"
        ).length,
        COLORS.interview
      ),

      metric(
        tr(6),
        monthEvents.filter(
          event =>
            event.type === "followup"
        ).length,
        COLORS.followup
      )
    );

    return grid;
  }

  /* =========================
     EVENT FILTER
  ========================= */

  function renderFilters() {
    const filters = node(
      "div",
      "wnjc-filters"
    );

    [
      ["all", tr(17)],
      ["interview", tr(5)],
      ["followup", tr(6)]
    ].forEach(function (item) {
      const control = button(
        item[1],
        function () {
          state.filter = item[0];
          render();
        },
        "wnjc-button wnjc-filter"
      );

      control.setAttribute(
        "aria-pressed",
        String(state.filter === item[0])
      );

      if (state.filter === item[0]) {
        control.classList.add(
          "wnjc-filter-active"
        );
      }

      filters.append(control);
    });

    return filters;
  }

  /* =========================
     MONTHLY CALENDAR GRID
  ========================= */

  function renderCalendar() {
    const panel = node(
      "section",
      "wnjc-calendar"
    );

    const navigation = node(
      "div",
      "wnjc-navigation"
    );

    const previous = button(
      "‹",
      () => changeMonth(-1)
    );

    previous.setAttribute(
      "aria-label",
      tr(3)
    );

    const next = button(
      "›",
      () => changeMonth(1)
    );

    next.setAttribute(
      "aria-label",
      tr(4)
    );

    navigation.append(
      previous,

      node(
        "h3",
        "wnjc-month",
        formatMonth(state.month)
      ),

      next
    );

    panel.append(navigation);

    const grid = node(
      "div",
      "wnjc-grid"
    );

    weekdayLabels().forEach(
      function (label) {
        grid.append(
          node(
            "span",
            "wnjc-weekday",
            label
          )
        );
      }
    );

    const year =
      state.month.getFullYear();

    const month =
      state.month.getMonth();

    const first =
      new Date(year, month, 1);

    const offset =
      (first.getDay() + 6) % 7;

    const days =
      new Date(
        year,
        month + 1,
        0
      ).getDate();

    const cells =
      Math.ceil(
        (offset + days) / 7
      ) * 7;

    const today = dateKey(new Date());

    for (let index = 0; index < cells; index++) {
      const date = new Date(
        year,
        month,
        index - offset + 1
      );

      const key = dateKey(date);

      const events =
        eventsForDay(key);

      const cell = button(
        "",
        function () {
          state.month = new Date(
            date.getFullYear(),
            date.getMonth(),
            1
          );

          state.selected = key;

          render();
        },
        "wnjc-day"
      );

      cell.setAttribute(
        "aria-label",
        formatDate(date) +
          " — " +
          events.length +
          " " +
          tr(17)
      );

      cell.setAttribute(
        "aria-pressed",
        String(
          key === state.selected
        )
      );

      if (date.getMonth() !== month) {
        cell.classList.add(
          "wnjc-outside"
        );
      }

      if (key === today) {
        cell.classList.add(
          "wnjc-today"
        );

        cell.setAttribute(
          "aria-current",
          "date"
        );
      }

      if (key === state.selected) {
        cell.classList.add(
          "wnjc-selected"
        );
      }

      cell.append(
        node(
          "span",
          "wnjc-day-number",
          date.getDate()
        )
      );

      const indicators = node(
        "span",
        "wnjc-indicators"
      );

      [
        "interview",
        "followup"
      ].forEach(function (type) {
        if (
          events.some(
            event => event.type === type
          )
        ) {
          const dot = node(
            "span",
            "wnjc-dot"
          );

          dot.style.backgroundColor =
            COLORS[type];

          dot.setAttribute(
            "aria-hidden",
            "true"
          );

          indicators.append(dot);
        }
      });

      if (events.length) {
        indicators.append(
          node(
            "span",
            "wnjc-count",
            events.length
          )
        );
      }

      cell.append(indicators);
      grid.append(cell);
    }

    panel.append(grid);

    return panel;
  }

  /* =========================
     EVENT CARDS
  ========================= */

  function renderEvent(event, showDate) {
    const card = node(
      "article",
      "wnjc-event"
    );

    const color = COLORS[event.type];

    card.style.setProperty(
      "--wnjc-event-color",
      color
    );

    if (event.inactive) {
      card.classList.add(
        "wnjc-inactive"
      );
    }

    const time = node(
      "div",
      "wnjc-event-time"
    );

    time.append(
      node(
        "strong",
        "",
        formatTime(event.date)
      )
    );

    if (showDate) {
      time.append(
        node(
          "span",
          "wnjc-muted",
          formatDate(event.date)
        )
      );
    }

    const details = node(
      "div",
      "wnjc-event-details"
    );

    const badge = node(
      "span",
      "wnjc-event-type",
      event.type === "interview"
        ? tr(13)
        : tr(14)
    );

    badge.style.color = color;

    details.append(
      badge,

      node(
        "strong",
        "wnjc-company",
        event.company
      ),

      node(
        "span",
        "wnjc-position",
        event.jobTitle
      )
    );

    if (event.location) {
      details.append(
        node(
          "span",
          "wnjc-muted",
          event.location
        )
      );
    }

    card.append(time, details);

    return card;
  }

  function renderEventList(
    title,
    events,
    emptyText,
    showDate
  ) {
    const panel = node(
      "section",
      "wnjc-event-panel"
    );

    panel.append(
      node(
        "h3",
        "wnjc-section-title",
        title
      )
    );

    if (!events.length) {
      panel.append(
        node(
          "div",
          "wnjc-empty",
          emptyText
        )
      );

      return panel;
    }

    const list = node(
      "div",
      "wnjc-event-list"
    );

    events.forEach(function (event) {
      list.append(
        renderEvent(event, showDate)
      );
    });

    panel.append(list);

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
      "wnjc-header"
    );

    header.append(
      node(
        "span",
        "wnjc-brand",
        "WORKNELY"
      ),

      node(
        "h2",
        "wnjc-title",
        tr(0)
      ),

      node(
        "p",
        "wnjc-subtitle",
        tr(1)
      )
    );

    content.append(header);

    root.setAttribute(
      "aria-label",
      tr(0)
    );

    root.setAttribute(
      "aria-busy",
      String(state.loading)
    );

    if (!storage()) {
      content.append(
        node(
          "div",
          "wnjc-empty",
          tr(16)
        )
      );

      root.replaceChildren(content);
      return;
    }

    if (!state.owner || recoveryMode) {
      content.append(
        node(
          "div",
          "wnjc-empty",
          state.loading
            ? tr(10)
            : tr(9)
        )
      );

      root.replaceChildren(content);
      return;
    }

    const actions = node(
      "div",
      "wnjc-actions"
    );

    const today = button(
      tr(2),
      goToday
    );

    const reload = button(
      "↻ " + tr(11),
      refresh
    );

    reload.disabled = state.loading;

    actions.append(today, reload);
    content.append(actions);

    if (state.loading) {
      content.append(
        node(
          "div",
          "wnjc-empty",
          tr(10)
        )
      );

      root.replaceChildren(content);
      return;
    }

    if (state.error) {
      const error = node(
        "div",
        "wnjc-error",
        tr(12)
      );

      error.setAttribute(
        "role",
        "alert"
      );

      content.append(error);

      root.replaceChildren(content);
      return;
    }

    content.append(
      renderMetrics(),
      renderFilters(),
      renderCalendar()
    );

    const selectedDate = new Date(
      state.selected + "T00:00:00"
    );

    content.append(
      renderEventList(
        tr(15) +
          " — " +
          formatDate(selectedDate),

        eventsForDay(state.selected),

        tr(8),

        false
      ),

      renderEventList(
        tr(7),

        upcomingEvents(),

        tr(21),

        true
      )
    );

    const footer = node(
      "div",
      "wnjc-footer"
    );

    footer.append(
      node(
        "p",
        "wnjc-muted",
        tr(18)
      ),

      node(
        "p",
        "wnjc-muted",
        tr(19) +
          ": " +
          state.records.length
      )
    );

    if (state.hasMore) {
      footer.append(
        button(
          tr(20),

          function () {
            state.limit += PAGE_SIZE;
            refresh();
          }
        )
      );
    }

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
      #wnJobCalendar {
        --wnjc-purple: #7540ef;
        --wnjc-cyan: #0891b2;
        --wnjc-text: #1e293b;
        --wnjc-muted: #64748b;

        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        margin: 24px 0;
        padding: clamp(12px, 3vw, 28px);
        border: 1px solid #e9e3fb;
        border-radius: 24px;
        color: var(--wnjc-text);
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

      #wnJobCalendar *,
      #wnJobCalendar *::before,
      #wnJobCalendar *::after {
        box-sizing: border-box;
        min-width: 0;
      }

      #wnJobCalendar h2,
      #wnJobCalendar h3,
      #wnJobCalendar p {
        margin: 0;
        overflow-wrap: anywhere;
      }

      #wnJobCalendar .wnjc-header {
        margin-bottom: 20px;
      }

      #wnJobCalendar .wnjc-brand {
        display: inline-block;
        color: #7540ef;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 2px;
        margin-bottom: 10px;
      }

      #wnJobCalendar .wnjc-title {
        color: #20183d;
        font-size: clamp(23px, 5vw, 34px);
        font-weight: 800;
        line-height: 1.2;
      }

      #wnJobCalendar .wnjc-subtitle {
        margin-top: 8px;
        color: #64748b;
        font-size: 14px;
        line-height: 1.5;
      }

      #wnJobCalendar .wnjc-actions,
      #wnJobCalendar .wnjc-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      #wnJobCalendar .wnjc-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
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

      #wnJobCalendar .wnjc-button:disabled {
        opacity: .55;
        cursor: not-allowed;
      }

      #wnJobCalendar .wnjc-filter-active {
        color: #ffffff;
        background: #7540ef;
        border-color: #7540ef;
      }

      #wnJobCalendar .wnjc-metrics {
        display: grid;
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 18px;
      }

      #wnJobCalendar .wnjc-metric {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 16px;
        border: 1px solid #e5e7ef;
        border-radius: 16px;
        background: #ffffff;
      }

      #wnJobCalendar .wnjc-number {
        font-size: clamp(24px, 5vw, 36px);
        font-weight: 800;
        font-variant-numeric: tabular-nums;
      }

      #wnJobCalendar .wnjc-muted {
        color: #64748b;
        font-size: 12px;
        line-height: 1.5;
        overflow-wrap: anywhere;
      }

      #wnJobCalendar .wnjc-calendar {
        padding: 14px;
        border: 1px solid #e5e7ef;
        border-radius: 18px;
        background: #ffffff;
        margin-bottom: 18px;
      }

      #wnJobCalendar .wnjc-navigation {
        display: grid;
        grid-template-columns:
          44px minmax(0, 1fr) 44px;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
      }

      #wnJobCalendar .wnjc-navigation button {
        padding: 4px;
        font-size: 24px;
      }

      #wnJobCalendar .wnjc-month {
        font-size: clamp(14px, 4vw, 20px);
        font-weight: 750;
        text-align: center;
        text-transform: capitalize;
      }

      #wnJobCalendar .wnjc-grid {
        display: grid;
        grid-template-columns:
          repeat(7, minmax(0, 1fr));
        gap: 4px;
        width: 100%;
      }

      #wnJobCalendar .wnjc-weekday {
        padding: 8px 0;
        color: #64748b;
        font-size: 11px;
        font-weight: 650;
        text-align: center;
        overflow-wrap: anywhere;
      }

      #wnJobCalendar .wnjc-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        min-height: 60px;
        width: 100%;
        max-width: 100%;
        padding: 4px 1px;
        border: 1px solid #eef0f5;
        border-radius: 10px;
        background: #fafbff;
        color: #334155;
        font: inherit;
        cursor: pointer;
        touch-action: manipulation;
      }

      #wnJobCalendar .wnjc-day-number {
        font-size: 13px;
        font-weight: 650;
      }

      #wnJobCalendar .wnjc-outside {
        color: #94a3b8;
        background: #ffffff;
      }

      #wnJobCalendar .wnjc-today {
        border-color: #7540ef;
        color: #7540ef;
      }

      #wnJobCalendar .wnjc-selected {
        background: #ede9fe;
        border-color: #7540ef;
        color: #5941a8;
      }

      #wnJobCalendar .wnjc-indicators {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 3px;
        min-height: 12px;
      }

      #wnJobCalendar .wnjc-dot {
        width: 6px;
        height: 6px;
        flex: 0 0 6px;
        border-radius: 50%;
      }

      #wnJobCalendar .wnjc-count {
        font-size: 10px;
        font-weight: 750;
      }

      #wnJobCalendar .wnjc-event-panel {
        padding: 16px;
        margin-bottom: 16px;
        border: 1px solid #e5e7ef;
        border-radius: 18px;
        background: #ffffff;
      }

      #wnJobCalendar .wnjc-section-title {
        font-size: 16px;
        font-weight: 750;
        line-height: 1.5;
        margin-bottom: 14px;
      }

      #wnJobCalendar .wnjc-event-list {
        display: grid;
        gap: 10px;
      }

      #wnJobCalendar .wnjc-event {
        display: grid;
        grid-template-columns:
          minmax(65px, .7fr)
          minmax(0, 2fr);
        gap: 14px;
        padding: 14px;
        border: 1px solid #e5e7ef;
        border-left: 4px solid
          var(--wnjc-event-color);
        border-radius: 12px;
        background: #fafbff;
        overflow-wrap: anywhere;
      }

      #wnJobCalendar .wnjc-event-time,
      #wnJobCalendar .wnjc-event-details {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      #wnJobCalendar .wnjc-event-time strong {
        font-size: 17px;
        font-weight: 800;
        color: #334155;
      }

      #wnJobCalendar .wnjc-event-type {
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
      }

      #wnJobCalendar .wnjc-company {
        font-size: 15px;
        font-weight: 750;
      }

      #wnJobCalendar .wnjc-position {
        font-size: 13px;
        color: #475569;
        line-height: 1.5;
      }

      #wnJobCalendar .wnjc-inactive {
        background: #f1f5f9;
      }

      #wnJobCalendar .wnjc-empty {
        padding: 24px 12px;
        border: 1px dashed #ddd6fe;
        border-radius: 12px;
        color: #64748b;
        background: #ffffff;
        font-size: 13px;
        text-align: center;
        overflow-wrap: anywhere;
      }

      #wnJobCalendar .wnjc-error {
        padding: 14px;
        border: 1px solid #fecaca;
        border-radius: 12px;
        color: #b91c1c;
        background: #fef2f2;
      }

      #wnJobCalendar .wnjc-footer {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      #wnJobCalendar button:focus-visible {
        outline: 3px solid #c4b5fd;
        outline-offset: 2px;
      }

      @media (max-width: 480px) {
        #wnJobCalendar {
          padding: 10px;
          border-radius: 18px;
        }

        #wnJobCalendar .wnjc-calendar {
          padding: 7px;
        }

        #wnJobCalendar .wnjc-grid {
          gap: 2px;
        }

        #wnJobCalendar .wnjc-day {
          min-height: 48px;
          border-radius: 7px;
        }

        #wnJobCalendar .wnjc-weekday {
          font-size: 10px;
        }

        #wnJobCalendar .wnjc-event-panel {
          padding: 12px;
        }

        #wnJobCalendar .wnjc-event {
          padding: 10px;
          gap: 8px;
        }
      }

      @media (max-width: 340px) {
        #wnJobCalendar .wnjc-event {
          grid-template-columns: 1fr;
        }

        #wnJobCalendar .wnjc-day-number {
          font-size: 11px;
        }
      }

      @media print {
        #wnJobCalendar {
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
        "wnJobCalendarMount"
      );
    }

    const anchor =
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
        "wnjc-root"
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

  window.WorknelyJobCalendar =
    Object.freeze({
      version: VERSION,

      mount,

      initialize,

      refresh,

      goToday,

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

          loadedApplications:
            state.records.length,

          scheduledEvents:
            state.events.length,

          hasMore: state.hasMore,

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

  document.addEventListener(
    "worknely:jobpipelineready",
    initialize
  );

  document.dispatchEvent(
    new CustomEvent(
      "worknely:jobcalendarready",
      {
        detail: {
          version: VERSION
        }
      }
    )
  );

})();
