
/**
 * WORKNELY
 * Job Application Tracker Interface
 * Version: 7.19.3
 *
 * Responsive career management workspace.
 * Copyright Worknely.
 */

(function () {
  "use strict";

  const VERSION = "7.19.3";
  const ROOT_ID = "wnJobTracker";
  const STYLE_ID = "wnJobTrackerStyles";

  const STATUSES = [
    "saved",
    "applied",
    "screening",
    "interview",
    "assessment",
    "offer",
    "accepted",
    "rejected",
    "withdrawn"
  ];

  const STATUS_COLORS = {
    saved: "#64748b",
    applied: "#7540ef",
    screening: "#9333ea",
    interview: "#0891b2",
    assessment: "#d97706",
    offer: "#059669",
    accepted: "#15803d",
    rejected: "#dc2626",
    withdrawn: "#64748b"
  };

  const DICTIONARY = {
    en: [
      "Job Application Tracker",
      "Your career. Your next opportunity.",
      "Total applications",
      "Active applications",
      "Interviews",
      "Job offers",
      "Add new application",
      "Search applications",
      "All statuses",
      "No applications yet",
      "Start tracking your next career opportunity.",
      "Company",
      "Job title",
      "Location",
      "Job URL",
      "Employment type",
      "Work mode",
      "Status",
      "Application date",
      "Interview date",
      "Follow-up date",
      "Notes",
      "Save application",
      "Cancel",
      "Edit",
      "Delete",
      "Edit application",
      "Sign in to manage your applications.",
      "Loading applications...",
      "Unable to complete the operation.",
      "Application saved.",
      "Application updated.",
      "Application deleted.",
      "Delete this application?",
      "Refresh",
      "No matching applications.",
      "Previous",
      "Next",
      "Open job listing",
      "Job Tracker is unavailable.",
      "Saving...",
      "Page",
      "Select an option"
    ],

    ro: [
      "Monitorizarea candidaturilor",
      "Cariera ta. Următoarea ta oportunitate.",
      "Total candidaturi",
      "Candidaturi active",
      "Interviuri",
      "Oferte de muncă",
      "Adaugă o candidatură",
      "Caută candidaturi",
      "Toate statusurile",
      "Nu există candidaturi",
      "Începe să îți urmărești oportunitățile profesionale.",
      "Companie",
      "Poziție",
      "Locație",
      "Link anunț",
      "Tip contract",
      "Mod de lucru",
      "Status",
      "Data candidaturii",
      "Data interviului",
      "Data revenirii",
      "Notițe",
      "Salvează candidatura",
      "Anulează",
      "Editează",
      "Șterge",
      "Editează candidatura",
      "Autentifică-te pentru a gestiona candidaturile.",
      "Se încarcă...",
      "Operațiunea nu a putut fi finalizată.",
      "Candidatură salvată.",
      "Candidatură actualizată.",
      "Candidatură ștearsă.",
      "Ștergi această candidatură?",
      "Actualizează",
      "Nu există rezultate.",
      "Anterior",
      "Următor",
      "Deschide anunțul",
      "Job Tracker nu este disponibil.",
      "Se salvează...",
      "Pagina",
      "Selectează o opțiune"
    ],

    it: [
      "Gestione candidature",
      "La tua carriera. La tua prossima opportunità.",
      "Candidature totali",
      "Candidature attive",
      "Colloqui",
      "Offerte di lavoro",
      "Aggiungi candidatura",
      "Cerca candidature",
      "Tutti gli stati",
      "Nessuna candidatura",
      "Inizia a monitorare le tue opportunità.",
      "Azienda",
      "Posizione",
      "Località",
      "Link annuncio",
      "Tipo di contratto",
      "Modalità di lavoro",
      "Stato",
      "Data candidatura",
      "Data colloquio",
      "Data follow-up",
      "Note",
      "Salva candidatura",
      "Annulla",
      "Modifica",
      "Elimina",
      "Modifica candidatura",
      "Accedi per gestire le candidature.",
      "Caricamento...",
      "Impossibile completare l'operazione.",
      "Candidatura salvata.",
      "Candidatura aggiornata.",
      "Candidatura eliminata.",
      "Eliminare questa candidatura?",
      "Aggiorna",
      "Nessun risultato.",
      "Precedente",
      "Successivo",
      "Apri annuncio",
      "Job Tracker non disponibile.",
      "Salvataggio...",
      "Pagina",
      "Seleziona un'opzione"
    ],

    de: [
      "Bewerbungsmanager",
      "Deine Karriere. Deine nächste Chance.",
      "Bewerbungen insgesamt",
      "Aktive Bewerbungen",
      "Vorstellungsgespräche",
      "Jobangebote",
      "Bewerbung hinzufügen",
      "Bewerbungen suchen",
      "Alle Status",
      "Noch keine Bewerbungen",
      "Verfolge deine beruflichen Möglichkeiten.",
      "Unternehmen",
      "Position",
      "Standort",
      "Stellenlink",
      "Beschäftigungsart",
      "Arbeitsmodell",
      "Status",
      "Bewerbungsdatum",
      "Gesprächstermin",
      "Nachfassdatum",
      "Notizen",
      "Bewerbung speichern",
      "Abbrechen",
      "Bearbeiten",
      "Löschen",
      "Bewerbung bearbeiten",
      "Melde dich an, um Bewerbungen zu verwalten.",
      "Wird geladen...",
      "Vorgang konnte nicht abgeschlossen werden.",
      "Bewerbung gespeichert.",
      "Bewerbung aktualisiert.",
      "Bewerbung gelöscht.",
      "Diese Bewerbung löschen?",
      "Aktualisieren",
      "Keine passenden Ergebnisse.",
      "Zurück",
      "Weiter",
      "Stellenanzeige öffnen",
      "Job Tracker nicht verfügbar.",
      "Wird gespeichert...",
      "Seite",
      "Option auswählen"
    ],

    fr: [
      "Suivi des candidatures",
      "Votre carrière. Votre prochaine opportunité.",
      "Total des candidatures",
      "Candidatures actives",
      "Entretiens",
      "Offres d'emploi",
      "Ajouter une candidature",
      "Rechercher des candidatures",
      "Tous les statuts",
      "Aucune candidature",
      "Commencez à suivre vos opportunités.",
      "Entreprise",
      "Poste",
      "Lieu",
      "Lien de l'annonce",
      "Type de contrat",
      "Mode de travail",
      "Statut",
      "Date de candidature",
      "Date d'entretien",
      "Date de relance",
      "Notes",
      "Enregistrer",
      "Annuler",
      "Modifier",
      "Supprimer",
      "Modifier la candidature",
      "Connectez-vous pour gérer vos candidatures.",
      "Chargement...",
      "Impossible de terminer l'opération.",
      "Candidature enregistrée.",
      "Candidature mise à jour.",
      "Candidature supprimée.",
      "Supprimer cette candidature ?",
      "Actualiser",
      "Aucun résultat.",
      "Précédent",
      "Suivant",
      "Ouvrir l'annonce",
      "Job Tracker indisponible.",
      "Enregistrement...",
      "Page",
      "Sélectionner une option"
    ],

    es: [
      "Seguimiento de candidaturas",
      "Tu carrera. Tu próxima oportunidad.",
      "Total de candidaturas",
      "Candidaturas activas",
      "Entrevistas",
      "Ofertas de empleo",
      "Añadir candidatura",
      "Buscar candidaturas",
      "Todos los estados",
      "Todavía no hay candidaturas",
      "Empieza a seguir tus oportunidades.",
      "Empresa",
      "Puesto",
      "Ubicación",
      "Enlace de la oferta",
      "Tipo de contrato",
      "Modalidad de trabajo",
      "Estado",
      "Fecha de candidatura",
      "Fecha de entrevista",
      "Fecha de seguimiento",
      "Notas",
      "Guardar candidatura",
      "Cancelar",
      "Editar",
      "Eliminar",
      "Editar candidatura",
      "Inicia sesión para gestionar tus candidaturas.",
      "Cargando...",
      "No se pudo completar la operación.",
      "Candidatura guardada.",
      "Candidatura actualizada.",
      "Candidatura eliminada.",
      "¿Eliminar esta candidatura?",
      "Actualizar",
      "No hay resultados.",
      "Anterior",
      "Siguiente",
      "Abrir oferta",
      "Job Tracker no disponible.",
      "Guardando...",
      "Página",
      "Seleccionar una opción"
    ]
  };

  const STATUS_LABELS = {
    en: [
      "Saved", "Applied", "Screening",
      "Interview", "Assessment", "Offer",
      "Accepted", "Rejected", "Withdrawn"
    ],

    ro: [
      "Salvată", "Trimisă", "Evaluare inițială",
      "Interviu", "Testare", "Ofertă",
      "Acceptată", "Respinsă", "Retrasă"
    ],

    it: [
      "Salvata", "Inviata", "Selezione",
      "Colloquio", "Valutazione", "Offerta",
      "Accettata", "Rifiutata", "Ritirata"
    ],

    de: [
      "Gespeichert", "Beworben", "Vorauswahl",
      "Gespräch", "Bewertung", "Angebot",
      "Angenommen", "Abgelehnt", "Zurückgezogen"
    ],

    fr: [
      "Enregistrée", "Envoyée", "Présélection",
      "Entretien", "Évaluation", "Offre",
      "Acceptée", "Refusée", "Retirée"
    ],

    es: [
      "Guardada", "Enviada", "Preselección",
      "Entrevista", "Evaluación", "Oferta",
      "Aceptada", "Rechazada", "Retirada"
    ]
  };

  const PAGE_SIZE = 25;

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
    statistics: null,
    loading: false,
    busy: false,
    search: "",
    filter: "",
    page: 0,
    hasNext: false,
    editing: null,
    formOpen: false,
    draft: null,
    message: null,
    messageType: "",
    error: false
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

  function statusLabel(status) {
    const index = STATUSES.indexOf(status);

    return STATUS_LABELS[language()][index] ||
      STATUS_LABELS.en[index] ||
      status;
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

  function button(text, className, handler) {
    const element = node(
      "button",
      className || "wnj-button",
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

  function safeUrl(value) {
    try {
      const url = new URL(value);

      if (
        !["https:", "http:"].includes(url.protocol) ||
        url.username ||
        url.password
      ) {
        return null;
      }

      return url.href;

    } catch {
      return null;
    }
  }

  function formatDate(value) {
    if (!value) return "";

    try {
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

    } catch {
      return "";
    }
  }

  function localDateTime(value) {
    if (!value) return "";

    const date = new Date(value);

    if (!Number.isFinite(date.getTime())) {
      return "";
    }

    const pad = number =>
      String(number).padStart(2, "0");

    return (
      date.getFullYear() + "-" +
      pad(date.getMonth() + 1) + "-" +
      pad(date.getDate()) + "T" +
      pad(date.getHours()) + ":" +
      pad(date.getMinutes())
    );
  }

  /* =========================
     PRIVATE STATE
  ========================= */

  function clearPrivateState() {
    generation += 1;

    state.owner = null;
    state.records = [];
    state.statistics = null;
    state.loading = false;
    state.busy = false;
    state.search = "";
    state.filter = "";
    state.page = 0;
    state.hasNext = false;
    state.editing = null;
    state.formOpen = false;
    state.draft = null;
    state.message = null;
    state.messageType = "";
    state.error = false;

    if (root) {
      root.replaceChildren();
    }
  }

  function isCurrent(ticket, owner) {
    return (
      ticket === generation &&
      state.owner === owner &&
      !recoveryMode
    );
  }

  function setMessage(index, type = "") {
    state.message = index;
    state.messageType = type;
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
     CLOUD DATA
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
      recoveryMode ||
      state.busy
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

      if (state.owner && state.owner !== owner) {
        clearPrivateState();
        state.owner = owner;
        scheduleRefresh();
        return;
      }

      state.owner = owner;

      const options = {
        expectedUserId: owner,
        limit: PAGE_SIZE + 1,
        offset: state.page * PAGE_SIZE
      };

      if (state.filter) {
        options.status = state.filter;
      }

      const results = await Promise.all([
        engine.list(options),
        engine.getStatistics({
          expectedUserId: owner
        })
      ]);

      if (!isCurrent(ticket, owner)) {
        return;
      }

      state.hasNext =
        results[0].length > PAGE_SIZE;

      state.records =
        results[0].slice(0, PAGE_SIZE);

      state.statistics = results[1];

    } catch {
      if (ticket !== generation) return;

      state.records = [];
      state.statistics = null;
      state.hasNext = false;
      state.error = true;

      setMessage(29, "error");

    } finally {
      if (ticket === generation) {
        state.loading = false;
        render();
      }
    }
  }

  /* =========================
     FORM MANAGEMENT
  ========================= */

  function createDraft(record) {
    const source = record || {};

    return {
      company: source.company || "",
      job_title: source.job_title || "",
      location: source.location || "",
      job_url: source.job_url || "",
      employment_type:
        source.employment_type || "",
      work_mode: source.work_mode || "",
      status: source.status || "saved",
      applied_at: source.applied_at || "",
      interview_at:
        localDateTime(source.interview_at),
      follow_up_at:
        localDateTime(source.follow_up_at),
      notes: source.notes || ""
    };
  }

  function openForm(record = null) {
    if (!state.owner || state.busy) return;

    state.editing = record?.id || null;
    state.draft = createDraft(record);
    state.formOpen = true;
    state.message = null;

    render();

    root.querySelector(
      "#wnj-company"
    )?.focus();
  }

  function closeForm() {
    if (state.busy) return;

    state.formOpen = false;
    state.editing = null;
    state.draft = null;

    render();
  }

  function formField(
    label,
    key,
    type = "text",
    required = false,
    maxLength = null
  ) {
    const wrapper = node(
      "div",
      "wnj-field"
    );

    const id = "wnj-" + key;

    const fieldLabel = node(
      "label",
      "",
      label
    );

    fieldLabel.htmlFor = id;

    const input = node(
      type === "textarea"
        ? "textarea"
        : "input",
      "wnj-input"
    );

    input.id = id;
    input.name = key;

    if (type !== "textarea") {
      input.type = type;
    }

    if (type === "textarea") {
      input.rows = 4;
    }

    input.required = required;

    if (maxLength) {
      input.maxLength = maxLength;
    }

    input.value =
      state.draft?.[key] || "";

    input.addEventListener(
      "input",
      function () {
        if (state.draft) {
          state.draft[key] = input.value;
        }
      }
    );

    wrapper.append(fieldLabel, input);

    return wrapper;
  }

  function createStatusSelect(
    selected,
    includeAll = false
  ) {
    const select = node(
      "select",
      "wnj-input"
    );

    if (includeAll) {
      const option = node(
        "option",
        "",
        tr(8)
      );

      option.value = "";
      select.append(option);
    }

    STATUSES.forEach(function (status) {
      const option = node(
        "option",
        "",
        statusLabel(status)
      );

      option.value = status;
      select.append(option);
    });

    select.value = selected;

    return select;
  }

  function renderForm() {
    const panel = node(
      "section",
      "wnj-form-panel"
    );

    panel.append(
      node(
        "h3",
        "wnj-section-title",
        state.editing ? tr(26) : tr(6)
      )
    );

    const form = node(
      "form",
      "wnj-form"
    );

    const grid = node(
      "div",
      "wnj-form-grid"
    );

    grid.append(
      formField(
        tr(11), "company",
        "text", true, 200
      ),

      formField(
        tr(12), "job_title",
        "text", true, 200
      ),

      formField(
        tr(13), "location",
        "text", false, 250
      ),

      formField(
        tr(14), "job_url",
        "url", false, 2048
      ),

      formField(
        tr(15), "employment_type",
        "text", false, 100
      ),

      formField(
        tr(16), "work_mode",
        "text", false, 100
      )
    );

    const statusField = node(
      "div",
      "wnj-field"
    );

    const statusLabelNode = node(
      "label",
      "",
      tr(17)
    );

    statusLabelNode.htmlFor =
      "wnj-form-status";

    const statusSelect =
      createStatusSelect(
        state.draft.status
      );

    statusSelect.id = "wnj-form-status";

    statusSelect.addEventListener(
      "change",
      function () {
        if (state.draft) {
          state.draft.status =
            statusSelect.value;
        }
      }
    );

    statusField.append(
      statusLabelNode,
      statusSelect
    );

    grid.append(
      statusField,

      formField(
        tr(18),
        "applied_at",
        "date"
      ),

      formField(
        tr(19),
        "interview_at",
        "datetime-local"
      ),

      formField(
        tr(20),
        "follow_up_at",
        "datetime-local"
      )
    );

    form.append(
      grid,

      formField(
        tr(21),
        "notes",
        "textarea",
        false,
        10000
      )
    );

    const actions = node(
      "div",
      "wnj-actions"
    );

    const save = node(
      "button",
      "wnj-button wnj-primary",
      state.busy ? tr(40) : tr(22)
    );

    save.type = "submit";
    save.disabled = state.busy;

    const cancel = button(
      tr(23),
      "wnj-button wnj-secondary",
      closeForm
    );

    cancel.disabled = state.busy;

    actions.append(save, cancel);
    form.append(actions);

    if (state.busy) {
      form.querySelectorAll(
        "input, select, textarea"
      ).forEach(function (element) {
        element.disabled = true;
      });
    }

    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        if (!form.reportValidity()) return;

        saveApplication();
      }
    );

    panel.append(form);

    return panel;
  }

  async function saveApplication() {
    if (
      !state.owner ||
      !state.draft ||
      state.busy
    ) {
      return;
    }

    const owner = state.owner;
    const ticket = ++generation;
    const editing = state.editing;

    const payload = {
      ...state.draft
    };

    state.busy = true;
    state.loading = false;
    state.message = null;

    render();

    try {
      const options = {
        expectedUserId: owner
      };

      if (editing) {
        await storage().update(
          editing,
          payload,
          options
        );
      } else {
        await storage().create(
          payload,
          options
        );
      }

      if (!isCurrent(ticket, owner)) {
        return;
      }

      state.formOpen = false;
      state.editing = null;
      state.draft = null;
      state.page = 0;
      state.filter = "";
      state.search = "";

      setMessage(
        editing ? 31 : 30,
        "success"
      );

    } catch {
      if (isCurrent(ticket, owner)) {
        setMessage(29, "error");
      }

    } finally {
      if (isCurrent(ticket, owner)) {
        state.busy = false;
        render();
        scheduleRefresh();
      }
    }
  }

  /* =========================
     DELETE APPLICATION
  ========================= */

  async function deleteApplication(record) {
    if (
      !state.owner ||
      state.busy ||
      !record?.id
    ) {
      return;
    }

    if (!window.confirm(tr(33))) {
      return;
    }

    const owner = state.owner;
    const ticket = ++generation;

    state.busy = true;
    state.loading = false;
    state.message = null;

    render();

    try {
      await storage().remove(
        record.id,
        {
          expectedUserId: owner
        }
      );

      if (!isCurrent(ticket, owner)) {
        return;
      }

      if (state.editing === record.id) {
        state.formOpen = false;
        state.editing = null;
        state.draft = null;
      }

      if (
        state.records.length === 1 &&
        state.page > 0
      ) {
        state.page -= 1;
      }

      setMessage(32, "success");

    } catch {
      if (isCurrent(ticket, owner)) {
        setMessage(29, "error");
      }

    } finally {
      if (isCurrent(ticket, owner)) {
        state.busy = false;
        render();
        scheduleRefresh();
      }
    }
  }

  /* =========================
     STATUS MANAGEMENT
  ========================= */

  async function changeStatus(record, status) {
    if (
      !state.owner ||
      state.busy ||
      !STATUSES.includes(status)
    ) {
      return;
    }

    const owner = state.owner;
    const ticket = ++generation;

    state.busy = true;
    state.loading = false;
    state.message = null;

    render();

    try {
      await storage().updateStatus(
        record.id,
        status,
        {
          expectedUserId: owner
        }
      );

      if (!isCurrent(ticket, owner)) {
        return;
      }

      if (
        state.editing === record.id &&
        state.draft
      ) {
        state.draft.status = status;
      }

      setMessage(31, "success");

    } catch {
      if (isCurrent(ticket, owner)) {
        setMessage(29, "error");
      }

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

  function metric(
    label,
    value,
    symbol,
    color
  ) {
    const card = node(
      "div",
      "wnj-metric"
    );

    const icon = node(
      "span",
      "wnj-metric-icon",
      symbol
    );

    icon.style.color = color;
    icon.setAttribute("aria-hidden", "true");

    const number = node(
      "strong",
      "wnj-metric-value",
      value == null ? "—" : value
    );

    number.style.color = color;

    card.append(
      icon,
      number,
      node(
        "span",
        "wnj-muted",
        label
      )
    );

    return card;
  }

  function renderMetrics() {
    const grid = node(
      "div",
      "wnj-metrics"
    );

    const stats = state.statistics;

    grid.append(
      metric(
        tr(2),
        stats?.total,
        "▤",
        "#7540ef"
      ),

      metric(
        tr(3),
        stats?.active,
        "↗",
        "#db2777"
      ),

      metric(
        tr(4),
        stats?.interviews,
        "◷",
        "#0891b2"
      ),

      metric(
        tr(5),
        stats?.offers,
        "☆",
        "#059669"
      )
    );

    return grid;
  }

  /* =========================
     APPLICATION CARDS
  ========================= */

  function renderApplication(record) {
    const card = node(
      "article",
      "wnj-application"
    );

    const header = node(
      "div",
      "wnj-application-header"
    );

    const logo = node(
      "div",
      "wnj-company-logo",
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
      "wnj-identity"
    );

    identity.append(
      node(
        "h3",
        "wnj-company",
        record.company
      ),

      node(
        "p",
        "wnj-job-title",
        record.job_title
      )
    );

    if (record.location) {
      identity.append(
        node(
          "p",
          "wnj-muted",
          record.location
        )
      );
    }

    header.append(logo, identity);

    const badge = node(
      "span",
      "wnj-status",
      statusLabel(record.status)
    );

    const color =
      STATUS_COLORS[record.status] ||
      "#64748b";

    badge.style.color = color;
    badge.style.backgroundColor =
      color + "15";

    header.append(badge);
    card.append(header);

    const details = node(
      "div",
      "wnj-details"
    );

    [
      [tr(15), record.employment_type],
      [tr(16), record.work_mode],
      [tr(18), formatDate(record.applied_at)],
      [tr(19), formatDate(record.interview_at)],
      [tr(20), formatDate(record.follow_up_at)]
    ].forEach(function (item) {
      if (!item[1]) return;

      const detail = node(
        "div",
        "wnj-detail"
      );

      detail.append(
        node(
          "span",
          "wnj-muted",
          item[0]
        ),

        node(
          "strong",
          "",
          item[1]
        )
      );

      details.append(detail);
    });

    if (details.childElementCount) {
      card.append(details);
    }

    if (record.notes) {
      const notes = node(
        "details",
        "wnj-notes"
      );

      notes.append(
        node("summary", "", tr(21)),
        node("p", "", record.notes)
      );

      card.append(notes);
    }

    const url = safeUrl(record.job_url);

    if (url) {
      const link = node(
        "a",
        "wnj-link",
        tr(38) + " ↗"
      );

      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      card.append(link);
    }

    const actions = node(
      "div",
      "wnj-application-actions"
    );

    const select = createStatusSelect(
      record.status
    );

    select.setAttribute(
      "aria-label",
      tr(17) + ": " + record.company
    );

    select.disabled =
      state.busy || state.loading;

    select.addEventListener(
      "change",
      function () {
        changeStatus(
          record,
          select.value
        );
      }
    );

    const edit = button(
      tr(24),
      "wnj-button wnj-secondary",
      function () {
        openForm(record);
      }
    );

    const remove = button(
      tr(25),
      "wnj-button wnj-danger",
      function () {
        deleteApplication(record);
      }
    );

    edit.disabled =
      state.busy || state.loading;

    remove.disabled =
      state.busy || state.loading;

    actions.append(
      select,
      edit,
      remove
    );

    card.append(actions);

    return card;
  }

  /* =========================
     SEARCH AND FILTER
  ========================= */

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function visibleRecords() {
    const search = normalize(
      state.search
    );

    if (!search) {
      return state.records;
    }

    return state.records.filter(
      function (record) {
        return normalize([
          record.company,
          record.job_title,
          record.location,
          record.employment_type,
          record.work_mode
        ].join(" ")).includes(search);
      }
    );
  }

  function renderList(container) {
    container.replaceChildren();

    if (state.loading) {
      container.append(
        node(
          "div",
          "wnj-empty",
          tr(28)
        )
      );

      return;
    }

    if (state.error) return;

    const records = visibleRecords();

    if (!records.length) {
      const empty = node(
        "div",
        "wnj-empty"
      );

      empty.append(
        node(
          "span",
          "wnj-empty-icon",
          "▤"
        ),

        node(
          "strong",
          "",
          state.search || state.filter
            ? tr(35)
            : tr(9)
        )
      );

      if (!state.search && !state.filter) {
        empty.append(
          node(
            "p",
            "wnj-muted",
            tr(10)
          )
        );
      }

      container.append(empty);
      return;
    }

    records.forEach(function (record) {
      container.append(
        renderApplication(record)
      );
    });
  }

  function renderToolbar(list) {
    const toolbar = node(
      "div",
      "wnj-toolbar"
    );

    const search = node(
      "input",
      "wnj-input"
    );

    search.type = "search";
    search.placeholder = tr(7);
    search.value = state.search;

    search.setAttribute(
      "aria-label",
      tr(7)
    );

    search.addEventListener(
      "input",
      function () {
        state.search = search.value;
        renderList(list);
      }
    );

    const filter = createStatusSelect(
      state.filter,
      true
    );

    filter.setAttribute(
      "aria-label",
      tr(8)
    );

    filter.disabled = state.busy;

    filter.addEventListener(
      "change",
      function () {
        state.filter = filter.value;
        state.page = 0;
        refresh();
      }
    );

    const reload = button(
      tr(34),
      "wnj-button wnj-secondary",
      refresh
    );

    reload.disabled =
      state.busy || state.loading;

    toolbar.append(
      search,
      filter,
      reload
    );

    return toolbar;
  }

  function renderPagination() {
    const wrapper = node(
      "div",
      "wnj-pagination"
    );

    const previous = button(
      tr(36),
      "wnj-button wnj-secondary",
      function () {
        if (state.page > 0) {
          state.page -= 1;
          refresh();
        }
      }
    );

    previous.disabled =
      state.page === 0 ||
      state.loading ||
      state.busy;

    const next = button(
      tr(37),
      "wnj-button wnj-secondary",
      function () {
        if (state.hasNext) {
          state.page += 1;
          refresh();
        }
      }
    );

    next.disabled =
      !state.hasNext ||
      state.loading ||
      state.busy;

    wrapper.append(
      previous,

      node(
        "span",
        "wnj-muted",
        tr(41) + " " + (state.page + 1)
      ),

      next
    );

    return wrapper;
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
      "wnj-header"
    );

    const brand = node(
      "span",
      "wnj-brand",
      "WORKNELY"
    );

    header.append(
      brand,

      node(
        "h2",
        "wnj-title",
        tr(0)
      ),

      node(
        "p",
        "wnj-subtitle",
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
      String(
        state.loading || state.busy
      )
    );

    if (!storage()) {
      content.append(
        node(
          "div",
          "wnj-empty",
          tr(39)
        )
      );

      root.replaceChildren(content);
      return;
    }

    if (!state.owner || recoveryMode) {
      content.append(
        node(
          "div",
          "wnj-empty",
          state.loading
            ? tr(28)
            : tr(27)
        )
      );

      root.replaceChildren(content);
      return;
    }

    content.append(renderMetrics());

    const add = button(
      "+ " + tr(6),
      "wnj-button wnj-primary wnj-add",
      function () {
        openForm();
      }
    );

    add.disabled =
      state.busy || state.loading;

    content.append(add);

    if (state.message != null) {
      const message = node(
        "div",
        "wnj-message " +
          (
            state.messageType === "error"
              ? "wnj-message-error"
              : "wnj-message-success"
          ),
        tr(state.message)
      );

      message.setAttribute(
        "role",
        state.messageType === "error"
          ? "alert"
          : "status"
      );

      content.append(message);
    }

    if (
      state.formOpen &&
      state.draft
    ) {
      content.append(renderForm());
    }

    const list = node(
      "div",
      "wnj-list"
    );

    content.append(
      renderToolbar(list),
      list
    );

    renderList(list);

    if (
      state.page > 0 ||
      state.hasNext
    ) {
      content.append(
        renderPagination()
      );
    }

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
      #wnJobTracker {
        --wnj-purple: #7540ef;
        --wnj-pink: #ec4899;
        --wnj-cyan: #06b6d4;
        --wnj-text: #182033;
        --wnj-muted: #64748b;
        --wnj-border: #e5e7ef;

        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        padding: clamp(14px, 3vw, 28px);
        margin: 24px 0;
        border: 1px solid #e9e3fb;
        border-radius: 24px;
        color: var(--wnj-text);
        background:
          linear-gradient(
            145deg,
            #faf7ff 0%,
            #ffffff 48%,
            #f0fdff 100%
          );
        font-family:
          Inter, -apple-system,
          BlinkMacSystemFont,
          "Segoe UI", sans-serif;
      }

      #wnJobTracker *,
      #wnJobTracker *::before,
      #wnJobTracker *::after {
        box-sizing: border-box;
        min-width: 0;
      }

      #wnJobTracker h2,
      #wnJobTracker h3,
      #wnJobTracker p {
        margin: 0;
        overflow-wrap: anywhere;
      }

      #wnJobTracker .wnj-header {
        margin-bottom: 24px;
      }

      #wnJobTracker .wnj-brand {
        display: inline-block;
        color: var(--wnj-purple);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 2px;
        margin-bottom: 10px;
      }

      #wnJobTracker .wnj-title {
        font-size: clamp(24px, 5vw, 36px);
        font-weight: 800;
        line-height: 1.15;
        color: #20183d;
      }

      #wnJobTracker .wnj-subtitle {
        color: var(--wnj-muted);
        margin-top: 8px;
        line-height: 1.5;
        font-size: 14px;
      }

      #wnJobTracker .wnj-metrics {
        display: grid;
        grid-template-columns:
          repeat(4, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 20px;
      }

      #wnJobTracker .wnj-metric {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
        border: 1px solid var(--wnj-border);
        border-radius: 18px;
        background: #ffffff;
        box-shadow:
          0 5px 20px rgba(53, 32, 98, .04);
        overflow-wrap: anywhere;
      }

      #wnJobTracker .wnj-metric-icon {
        font-size: 24px;
        font-weight: 800;
        line-height: 1;
      }

      #wnJobTracker .wnj-metric-value {
        font-size: clamp(24px, 4vw, 36px);
        font-weight: 800;
        font-variant-numeric: tabular-nums;
      }

      #wnJobTracker .wnj-muted {
        color: var(--wnj-muted);
        font-size: 13px;
        line-height: 1.5;
        overflow-wrap: anywhere;
      }

      #wnJobTracker .wnj-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        max-width: 100%;
        padding: 11px 16px;
        border: 1px solid transparent;
        border-radius: 12px;
        font: inherit;
        font-size: 14px;
        font-weight: 650;
        line-height: 1.35;
        cursor: pointer;
        text-align: center;
        white-space: normal;
        overflow-wrap: anywhere;
        touch-action: manipulation;
      }

      #wnJobTracker .wnj-button:disabled {
        opacity: .55;
        cursor: not-allowed;
      }

      #wnJobTracker .wnj-primary {
        color: #ffffff;
        background:
          linear-gradient(
            110deg,
            #7540ef,
            #a43de8
          );
        box-shadow:
          0 6px 16px rgba(117, 64, 239, .18);
      }

      #wnJobTracker .wnj-secondary {
        color: #5941a8;
        background: #ffffff;
        border-color: #e6dff7;
      }

      #wnJobTracker .wnj-danger {
        color: #b91c1c;
        background: #fff5f5;
        border-color: #fee2e2;
      }

      #wnJobTracker .wnj-add {
        width: 100%;
        margin-bottom: 18px;
      }

      #wnJobTracker .wnj-toolbar {
        display: grid;
        grid-template-columns:
          minmax(0, 2fr)
          minmax(0, 1fr)
          auto;
        gap: 10px;
        margin: 18px 0;
      }

      #wnJobTracker .wnj-input {
        display: block;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        min-height: 44px;
        padding: 11px 12px;
        border: 1px solid #dfe2eb;
        border-radius: 12px;
        background: #ffffff;
        color: var(--wnj-text);
        font: inherit;
        font-size: 16px;
      }

      #wnJobTracker .wnj-input:focus,
      #wnJobTracker .wnj-button:focus-visible,
      #wnJobTracker a:focus-visible {
        outline: 3px solid #c4b5fd;
        outline-offset: 2px;
      }

      #wnJobTracker .wnj-form-panel {
        background: #ffffff;
        border: 1px solid #e6dff7;
        border-radius: 20px;
        padding: clamp(14px, 3vw, 22px);
        margin-bottom: 18px;
      }

      #wnJobTracker .wnj-section-title {
        font-size: 20px;
        font-weight: 750;
        margin-bottom: 20px;
      }

      #wnJobTracker .wnj-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      #wnJobTracker .wnj-form-grid {
        display: grid;
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
        gap: 16px;
      }

      #wnJobTracker .wnj-field {
        display: flex;
        flex-direction: column;
        gap: 7px;
      }

      #wnJobTracker .wnj-field label {
        font-size: 13px;
        font-weight: 650;
        color: #334155;
      }

      #wnJobTracker textarea {
        resize: vertical;
        min-height: 110px;
      }

      #wnJobTracker .wnj-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      #wnJobTracker .wnj-actions > button {
        flex: 1 1 140px;
      }

      #wnJobTracker .wnj-list {
        display: grid;
        gap: 14px;
      }

      #wnJobTracker .wnj-application {
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 18px;
        background: #ffffff;
        border: 1px solid var(--wnj-border);
        border-radius: 18px;
        box-shadow:
          0 4px 16px rgba(31, 24, 64, .04);
        overflow-wrap: anywhere;
      }

      #wnJobTracker .wnj-application-header {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        flex-wrap: wrap;
      }

      #wnJobTracker .wnj-company-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 48px;
        width: 48px;
        height: 48px;
        border-radius: 14px;
        background:
          linear-gradient(
            135deg,
            #ede9fe,
            #cffafe
          );
        color: #7540ef;
        font-size: 23px;
        font-weight: 800;
      }

      #wnJobTracker .wnj-identity {
        flex: 1 1 120px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      #wnJobTracker .wnj-company {
        font-size: 17px;
        font-weight: 750;
        color: #1e293b;
      }

      #wnJobTracker .wnj-job-title {
        font-size: 14px;
        color: #475569;
        line-height: 1.5;
      }

      #wnJobTracker .wnj-status {
        display: inline-block;
        padding: 7px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
        max-width: 100%;
        overflow-wrap: anywhere;
      }

      #wnJobTracker .wnj-details {
        display: grid;
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
        gap: 12px;
        padding: 12px;
        border-radius: 12px;
        background: #f8fafc;
      }

      #wnJobTracker .wnj-detail {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 13px;
      }

      #wnJobTracker .wnj-notes {
        font-size: 14px;
        color: #475569;
        line-height: 1.6;
      }

      #wnJobTracker .wnj-notes summary {
        cursor: pointer;
        font-weight: 650;
      }

      #wnJobTracker .wnj-notes p {
        margin-top: 8px;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }

      #wnJobTracker .wnj-link {
        color: #7540ef;
        font-size: 13px;
        font-weight: 650;
        text-decoration: underline;
      }

      #wnJobTracker .wnj-application-actions {
        display: grid;
        grid-template-columns:
          minmax(0, 1fr) auto auto;
        gap: 8px;
        padding-top: 12px;
        border-top: 1px solid #eef0f5;
      }

      #wnJobTracker .wnj-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 34px 16px;
        border: 1px dashed #ddd6fe;
        border-radius: 18px;
        background: #ffffff;
        color: #475569;
        text-align: center;
        overflow-wrap: anywhere;
      }

      #wnJobTracker .wnj-empty-icon {
        font-size: 38px;
        color: #a78bfa;
      }

      #wnJobTracker .wnj-message {
        padding: 13px;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 14px;
      }

      #wnJobTracker .wnj-message-success {
        color: #166534;
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
      }

      #wnJobTracker .wnj-message-error {
        color: #b91c1c;
        background: #fef2f2;
        border: 1px solid #fecaca;
      }

      #wnJobTracker .wnj-pagination {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 18px;
      }

      @media (max-width: 760px) {
        #wnJobTracker .wnj-metrics {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
        }

        #wnJobTracker .wnj-toolbar {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
        }

        #wnJobTracker
        .wnj-toolbar input[type="search"] {
          grid-column: 1 / -1;
        }
      }

      @media (max-width: 480px) {
        #wnJobTracker {
          border-radius: 18px;
          padding: 12px;
        }

        #wnJobTracker .wnj-form-grid {
          grid-template-columns: 1fr;
        }

        #wnJobTracker .wnj-application {
          padding: 12px;
        }

        #wnJobTracker .wnj-metric {
          padding: 12px;
        }

        #wnJobTracker
        .wnj-application-actions {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
        }

        #wnJobTracker
        .wnj-application-actions select {
          grid-column: 1 / -1;
        }
      }

      @media (max-width: 340px) {
        #wnJobTracker .wnj-metrics,
        #wnJobTracker .wnj-details,
        #wnJobTracker .wnj-toolbar {
          grid-template-columns: 1fr;
        }
      }

      @media print {
        #wnJobTracker {
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
        "wnJobTrackerMount"
      );
    }

    if (!container) {
      return false;
    }

    const existing =
      document.getElementById(ROOT_ID);

    if (existing) {
      root = existing;

    } else {
      root = node(
        "section",
        "wnj-root"
      );

      root.id = ROOT_ID;

      container.append(root);
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
    const mounted = mount();

    if (!mounted) return false;

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
            detail.userId === state.owner &&
            !state.busy &&
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
          render();
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

  window.WorknelyJobInterface =
    Object.freeze({
      version: VERSION,

      mount,

      initialize,

      refresh,

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
          page: state.page,
          visibleRecords:
            state.records.length,
          storageAvailable: Boolean(
            storage()
          )
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

  document.dispatchEvent(
    new CustomEvent(
      "worknely:jobinterfaceready",
      {
        detail: {
          version: VERSION
        }
      }
    )
  );

})();
