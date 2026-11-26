
/**
 * WORKNELY
 * International Job Tracker Localization
 * Version: 7.19.7
 * Copyright Worknely.
 */

(function () {
  "use strict";

  const VERSION = "7.19.7";

  const LANGUAGES = Object.freeze([
    "en", "ro", "it", "de", "fr", "es"
  ]);

  const LOCALES = Object.freeze({
    en: "en-GB",
    ro: "ro-RO",
    it: "it-IT",
    de: "de-DE",
    fr: "fr-FR",
    es: "es-ES"
  });

  const KEYS = Object.freeze([
    "tracker.title",
    "tracker.subtitle",
    "tracker.add",
    "tracker.edit",
    "tracker.delete",
    "tracker.save",
    "tracker.cancel",
    "tracker.refresh",
    "tracker.search",
    "tracker.filter",
    "tracker.all",
    "tracker.empty",
    "tracker.loading",
    "tracker.signin",
    "tracker.error",
    "tracker.success",
    "tracker.confirmDelete",
    "tracker.loadMore",

    "field.company",
    "field.jobTitle",
    "field.location",
    "field.jobUrl",
    "field.employmentType",
    "field.workMode",
    "field.status",
    "field.appliedAt",
    "field.interviewAt",
    "field.followUpAt",
    "field.notes",
    "field.createdAt",
    "field.updatedAt",

    "status.saved",
    "status.applied",
    "status.screening",
    "status.interview",
    "status.assessment",
    "status.offer",
    "status.accepted",
    "status.rejected",
    "status.withdrawn",

    "employment.fullTime",
    "employment.partTime",
    "employment.contract",
    "employment.temporary",
    "employment.internship",
    "employment.freelance",
    "employment.other",

    "mode.remote",
    "mode.hybrid",
    "mode.onsite",

    "pipeline.title",
    "pipeline.subtitle",
    "pipeline.move",
    "pipeline.active",
    "pipeline.closed",

    "calendar.title",
    "calendar.subtitle",
    "calendar.today",
    "calendar.previous",
    "calendar.next",
    "calendar.interviews",
    "calendar.followUps",
    "calendar.upcoming",
    "calendar.empty",
    "calendar.localTime",

    "analytics.title",
    "analytics.subtitle",
    "analytics.total",
    "analytics.active",
    "analytics.advanced",
    "analytics.positive",
    "analytics.distribution",
    "analytics.outcomes",
    "analytics.disclaimer",

    "validation.company",
    "validation.jobTitle",
    "validation.url",
    "validation.date",
    "validation.required",

    "privacy.title",
    "privacy.description",
    "privacy.cloud",
    "privacy.accountRequired",

    "common.yes",
    "common.no",
    "common.close",
    "common.retry",
    "common.notSpecified"
  ]);

  /* =========================
     ENGLISH
  ========================= */

  const EN = [
    "Job Application Tracker",
    "Manage your professional opportunities in one place.",
    "Add application",
    "Edit application",
    "Delete application",
    "Save application",
    "Cancel",
    "Refresh",
    "Search applications",
    "Filter applications",
    "All applications",
    "No applications found.",
    "Loading applications...",
    "Sign in to manage your applications.",
    "Unable to complete the operation.",
    "Operation completed successfully.",
    "Delete this application permanently?",
    "Load more",

    "Company",
    "Job title",
    "Location",
    "Job listing URL",
    "Employment type",
    "Work mode",
    "Application status",
    "Application date",
    "Interview date and time",
    "Follow-up date and time",
    "Private notes",
    "Created",
    "Last updated",

    "Saved",
    "Applied",
    "Screening",
    "Interview",
    "Assessment",
    "Offer",
    "Accepted",
    "Rejected",
    "Withdrawn",

    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
    "Freelance",
    "Other",

    "Remote",
    "Hybrid",
    "On-site",

    "Application Pipeline",
    "Track your current recruitment stages.",
    "Change application status",
    "Active applications",
    "Closed applications",

    "Interview Calendar",
    "Organize interviews and professional follow-ups.",
    "Today",
    "Previous month",
    "Next month",
    "Interviews",
    "Follow-ups",
    "Upcoming events",
    "No scheduled events.",
    "Dates are displayed in your local time.",

    "Application Analytics",
    "Understand your job search performance.",
    "Total applications",
    "Active applications",
    "Advanced-stage share",
    "Offer and acceptance share",
    "Application distribution",
    "Application outcomes",
    "Indicators reflect current statuses, not historical conversion rates.",

    "Enter a valid company name.",
    "Enter a valid job title.",
    "Enter a valid HTTP or HTTPS URL.",
    "Enter a valid date.",
    "Complete all required fields.",

    "Privacy and security",
    "Your applications are personal to your account.",
    "Application data is stored in your cloud account.",
    "Authentication is required.",

    "Yes",
    "No",
    "Close",
    "Try again",
    "Not specified"
  ];

  /* =========================
     ROMANIAN
  ========================= */

  const RO = [
    "Gestionarea candidaturilor",
    "Gestionează oportunitățile profesionale într-un singur loc.",
    "Adaugă candidatură",
    "Editează candidatura",
    "Șterge candidatura",
    "Salvează candidatura",
    "Anulează",
    "Actualizează",
    "Caută candidaturi",
    "Filtrează candidaturile",
    "Toate candidaturile",
    "Nu există candidaturi.",
    "Se încarcă...",
    "Autentifică-te pentru a gestiona candidaturile.",
    "Operațiunea nu a putut fi finalizată.",
    "Operațiune finalizată cu succes.",
    "Ștergi definitiv această candidatură?",
    "Încarcă mai multe",

    "Companie",
    "Funcție",
    "Locație",
    "Link către anunț",
    "Tip de angajare",
    "Mod de lucru",
    "Statusul candidaturii",
    "Data candidaturii",
    "Data și ora interviului",
    "Data și ora revenirii",
    "Notițe private",
    "Data creării",
    "Ultima actualizare",

    "Salvată",
    "Trimisă",
    "Evaluare inițială",
    "Interviu",
    "Testare",
    "Ofertă",
    "Acceptată",
    "Respinsă",
    "Retrasă",

    "Normă întreagă",
    "Normă parțială",
    "Contract",
    "Temporar",
    "Stagiu",
    "Freelance",
    "Alt tip",

    "La distanță",
    "Hibrid",
    "La sediu",

    "Etapele candidaturilor",
    "Urmărește etapele actuale de recrutare.",
    "Schimbă statusul candidaturii",
    "Candidaturi active",
    "Candidaturi închise",

    "Calendarul interviurilor",
    "Organizează interviurile și revenirile profesionale.",
    "Astăzi",
    "Luna anterioară",
    "Luna următoare",
    "Interviuri",
    "Reveniri",
    "Evenimente viitoare",
    "Nu există evenimente programate.",
    "Datele sunt afișate conform orei locale.",

    "Analiza candidaturilor",
    "Înțelege performanța căutării unui loc de muncă.",
    "Total candidaturi",
    "Candidaturi active",
    "Ponderea etapelor avansate",
    "Ponderea ofertelor și acceptărilor",
    "Distribuția candidaturilor",
    "Rezultatele candidaturilor",
    "Indicatorii reflectă statusurile actuale, nu ratele istorice de conversie.",

    "Introdu un nume valid de companie.",
    "Introdu o funcție validă.",
    "Introdu un link HTTP sau HTTPS valid.",
    "Introdu o dată validă.",
    "Completează toate câmpurile obligatorii.",

    "Confidențialitate și securitate",
    "Candidaturile sunt personale contului tău.",
    "Datele candidaturilor sunt salvate în contul tău cloud.",
    "Autentificarea este obligatorie.",

    "Da",
    "Nu",
    "Închide",
    "Încearcă din nou",
    "Nespecificat"
  ];

  /* =========================
     ITALIAN
  ========================= */

  const IT = [
    "Gestione candidature",
    "Gestisci le opportunità professionali in un unico posto.",
    "Aggiungi candidatura",
    "Modifica candidatura",
    "Elimina candidatura",
    "Salva candidatura",
    "Annulla",
    "Aggiorna",
    "Cerca candidature",
    "Filtra candidature",
    "Tutte le candidature",
    "Nessuna candidatura trovata.",
    "Caricamento candidature...",
    "Accedi per gestire le candidature.",
    "Impossibile completare l'operazione.",
    "Operazione completata con successo.",
    "Eliminare definitivamente questa candidatura?",
    "Carica altre",

    "Azienda",
    "Posizione lavorativa",
    "Località",
    "Link dell'annuncio",
    "Tipo di impiego",
    "Modalità di lavoro",
    "Stato della candidatura",
    "Data della candidatura",
    "Data e ora del colloquio",
    "Data e ora del follow-up",
    "Note private",
    "Data di creazione",
    "Ultimo aggiornamento",

    "Salvata",
    "Inviata",
    "Preselezione",
    "Colloquio",
    "Valutazione",
    "Offerta",
    "Accettata",
    "Rifiutata",
    "Ritirata",

    "Tempo pieno",
    "Part-time",
    "Contratto",
    "Temporaneo",
    "Tirocinio",
    "Freelance",
    "Altro",

    "Da remoto",
    "Ibrido",
    "In sede",

    "Fasi delle candidature",
    "Monitora le fasi attuali di selezione.",
    "Modifica lo stato della candidatura",
    "Candidature attive",
    "Candidature chiuse",

    "Calendario colloqui",
    "Organizza colloqui e follow-up professionali.",
    "Oggi",
    "Mese precedente",
    "Mese successivo",
    "Colloqui",
    "Follow-up",
    "Prossimi eventi",
    "Nessun evento programmato.",
    "Le date sono visualizzate nell'ora locale.",

    "Analisi delle candidature",
    "Comprendi le prestazioni della tua ricerca di lavoro.",
    "Candidature totali",
    "Candidature attive",
    "Quota delle fasi avanzate",
    "Quota di offerte e accettazioni",
    "Distribuzione delle candidature",
    "Esiti delle candidature",
    "Gli indicatori riflettono gli stati attuali, non i tassi storici di conversione.",

    "Inserisci un nome aziendale valido.",
    "Inserisci una posizione lavorativa valida.",
    "Inserisci un URL HTTP o HTTPS valido.",
    "Inserisci una data valida.",
    "Completa tutti i campi obbligatori.",

    "Privacy e sicurezza",
    "Le candidature sono personali al tuo account.",
    "I dati sono salvati nel tuo account cloud.",
    "È richiesta l'autenticazione.",

    "Sì",
    "No",
    "Chiudi",
    "Riprova",
    "Non specificato"
  ];

  /* =========================
     GERMAN
  ========================= */

  const DE = [
    "Bewerbungsmanager",
    "Verwalte deine beruflichen Chancen an einem Ort.",
    "Bewerbung hinzufügen",
    "Bewerbung bearbeiten",
    "Bewerbung löschen",
    "Bewerbung speichern",
    "Abbrechen",
    "Aktualisieren",
    "Bewerbungen suchen",
    "Bewerbungen filtern",
    "Alle Bewerbungen",
    "Keine Bewerbungen gefunden.",
    "Bewerbungen werden geladen...",
    "Melde dich an, um Bewerbungen zu verwalten.",
    "Der Vorgang konnte nicht abgeschlossen werden.",
    "Vorgang erfolgreich abgeschlossen.",
    "Diese Bewerbung endgültig löschen?",
    "Weitere laden",

    "Unternehmen",
    "Berufsbezeichnung",
    "Standort",
    "Link zur Stellenanzeige",
    "Beschäftigungsart",
    "Arbeitsmodell",
    "Bewerbungsstatus",
    "Bewerbungsdatum",
    "Datum und Uhrzeit des Gesprächs",
    "Datum und Uhrzeit des Folgetermins",
    "Private Notizen",
    "Erstellt",
    "Zuletzt aktualisiert",

    "Gespeichert",
    "Beworben",
    "Vorauswahl",
    "Vorstellungsgespräch",
    "Bewertung",
    "Angebot",
    "Angenommen",
    "Abgelehnt",
    "Zurückgezogen",

    "Vollzeit",
    "Teilzeit",
    "Vertrag",
    "Befristet",
    "Praktikum",
    "Freiberuflich",
    "Sonstiges",

    "Remote",
    "Hybrid",
    "Vor Ort",

    "Bewerbungsphasen",
    "Verfolge deine aktuellen Bewerbungsphasen.",
    "Bewerbungsstatus ändern",
    "Aktive Bewerbungen",
    "Abgeschlossene Bewerbungen",

    "Interviewkalender",
    "Organisiere Gespräche und berufliche Folgetermine.",
    "Heute",
    "Vorheriger Monat",
    "Nächster Monat",
    "Gespräche",
    "Folgetermine",
    "Bevorstehende Termine",
    "Keine geplanten Termine.",
    "Termine werden in deiner Ortszeit angezeigt.",

    "Bewerbungsanalyse",
    "Analysiere deine Fortschritte bei der Jobsuche.",
    "Bewerbungen insgesamt",
    "Aktive Bewerbungen",
    "Anteil fortgeschrittener Phasen",
    "Anteil Angebote und Annahmen",
    "Bewerbungsverteilung",
    "Bewerbungsergebnisse",
    "Die Kennzahlen zeigen aktuelle Statuswerte, keine historischen Konversionsraten.",

    "Gib einen gültigen Unternehmensnamen ein.",
    "Gib eine gültige Berufsbezeichnung ein.",
    "Gib eine gültige HTTP- oder HTTPS-URL ein.",
    "Gib ein gültiges Datum ein.",
    "Fülle alle Pflichtfelder aus.",

    "Datenschutz und Sicherheit",
    "Deine Bewerbungen gehören zu deinem Konto.",
    "Bewerbungsdaten werden in deinem Cloud-Konto gespeichert.",
    "Eine Anmeldung ist erforderlich.",

    "Ja",
    "Nein",
    "Schließen",
    "Erneut versuchen",
    "Nicht angegeben"
  ];

  /* =========================
     FRENCH
  ========================= */

  const FR = [
    "Gestion des candidatures",
    "Gérez vos opportunités professionnelles au même endroit.",
    "Ajouter une candidature",
    "Modifier la candidature",
    "Supprimer la candidature",
    "Enregistrer la candidature",
    "Annuler",
    "Actualiser",
    "Rechercher des candidatures",
    "Filtrer les candidatures",
    "Toutes les candidatures",
    "Aucune candidature trouvée.",
    "Chargement des candidatures...",
    "Connectez-vous pour gérer vos candidatures.",
    "Impossible de terminer l'opération.",
    "Opération terminée avec succès.",
    "Supprimer définitivement cette candidature ?",
    "Charger davantage",

    "Entreprise",
    "Intitulé du poste",
    "Localisation",
    "Lien de l'offre",
    "Type d'emploi",
    "Mode de travail",
    "Statut de la candidature",
    "Date de candidature",
    "Date et heure de l'entretien",
    "Date et heure de la relance",
    "Notes privées",
    "Date de création",
    "Dernière actualisation",

    "Enregistrée",
    "Envoyée",
    "Présélection",
    "Entretien",
    "Évaluation",
    "Offre",
    "Acceptée",
    "Refusée",
    "Retirée",

    "Temps plein",
    "Temps partiel",
    "Contrat",
    "Temporaire",
    "Stage",
    "Freelance",
    "Autre",

    "Télétravail",
    "Hybride",
    "Sur site",

    "Étapes des candidatures",
    "Suivez les étapes actuelles du recrutement.",
    "Modifier le statut de la candidature",
    "Candidatures actives",
    "Candidatures clôturées",

    "Calendrier des entretiens",
    "Organisez vos entretiens et relances professionnelles.",
    "Aujourd'hui",
    "Mois précédent",
    "Mois suivant",
    "Entretiens",
    "Relances",
    "Événements à venir",
    "Aucun événement programmé.",
    "Les dates sont affichées en heure locale.",

    "Analyse des candidatures",
    "Comprenez les performances de votre recherche d'emploi.",
    "Total des candidatures",
    "Candidatures actives",
    "Part des étapes avancées",
    "Part des offres et acceptations",
    "Répartition des candidatures",
    "Résultats des candidatures",
    "Les indicateurs reflètent les statuts actuels, pas les taux historiques de conversion.",

    "Saisissez un nom d'entreprise valide.",
    "Saisissez un intitulé de poste valide.",
    "Saisissez une URL HTTP ou HTTPS valide.",
    "Saisissez une date valide.",
    "Remplissez tous les champs obligatoires.",

    "Confidentialité et sécurité",
    "Vos candidatures sont personnelles à votre compte.",
    "Les données sont enregistrées dans votre compte cloud.",
    "Une authentification est requise.",

    "Oui",
    "Non",
    "Fermer",
    "Réessayer",
    "Non précisé"
  ];

  /* =========================
     SPANISH
  ========================= */

  const ES = [
    "Gestor de candidaturas",
    "Gestiona tus oportunidades profesionales en un solo lugar.",
    "Añadir candidatura",
    "Editar candidatura",
    "Eliminar candidatura",
    "Guardar candidatura",
    "Cancelar",
    "Actualizar",
    "Buscar candidaturas",
    "Filtrar candidaturas",
    "Todas las candidaturas",
    "No se encontraron candidaturas.",
    "Cargando candidaturas...",
    "Inicia sesión para gestionar tus candidaturas.",
    "No se pudo completar la operación.",
    "Operación completada correctamente.",
    "¿Eliminar permanentemente esta candidatura?",
    "Cargar más",

    "Empresa",
    "Puesto de trabajo",
    "Ubicación",
    "Enlace de la oferta",
    "Tipo de empleo",
    "Modalidad de trabajo",
    "Estado de la candidatura",
    "Fecha de candidatura",
    "Fecha y hora de entrevista",
    "Fecha y hora de seguimiento",
    "Notas privadas",
    "Fecha de creación",
    "Última actualización",

    "Guardada",
    "Enviada",
    "Preselección",
    "Entrevista",
    "Evaluación",
    "Oferta",
    "Aceptada",
    "Rechazada",
    "Retirada",

    "Jornada completa",
    "Jornada parcial",
    "Contrato",
    "Temporal",
    "Prácticas",
    "Freelance",
    "Otro",

    "Remoto",
    "Híbrido",
    "Presencial",

    "Etapas de candidaturas",
    "Consulta las etapas actuales de selección.",
    "Cambiar estado de candidatura",
    "Candidaturas activas",
    "Candidaturas cerradas",

    "Calendario de entrevistas",
    "Organiza entrevistas y seguimientos profesionales.",
    "Hoy",
    "Mes anterior",
    "Mes siguiente",
    "Entrevistas",
    "Seguimientos",
    "Próximos eventos",
    "No hay eventos programados.",
    "Las fechas se muestran en tu hora local.",

    "Análisis de candidaturas",
    "Comprende el rendimiento de tu búsqueda de empleo.",
    "Total de candidaturas",
    "Candidaturas activas",
    "Proporción en etapas avanzadas",
    "Proporción de ofertas y aceptaciones",
    "Distribución de candidaturas",
    "Resultados de candidaturas",
    "Los indicadores reflejan los estados actuales, no las tasas históricas de conversión.",

    "Introduce un nombre de empresa válido.",
    "Introduce un puesto de trabajo válido.",
    "Introduce una URL HTTP o HTTPS válida.",
    "Introduce una fecha válida.",
    "Completa todos los campos obligatorios.",

    "Privacidad y seguridad",
    "Tus candidaturas son personales a tu cuenta.",
    "Los datos se guardan en tu cuenta en la nube.",
    "Se requiere autenticación.",

    "Sí",
    "No",
    "Cerrar",
    "Reintentar",
    "No especificado"
  ];

  /* =========================
     DICTIONARY ENGINE
  ========================= */

  const RAW = {
    en: EN,
    ro: RO,
    it: IT,
    de: DE,
    fr: FR,
    es: ES
  };

  const DICTIONARY = {};

  LANGUAGES.forEach(function (language) {
    const entries = Object.create(null);

    KEYS.forEach(function (key, index) {
      entries[key] =
        RAW[language][index] ||
        EN[index] ||
        key;
    });

    DICTIONARY[language] =
      Object.freeze(entries);
  });

  Object.freeze(DICTIONARY);

  function normalizeLanguage(value) {
    const code = String(value || "en")
      .trim()
      .toLowerCase()
      .split(/[-_]/)[0];

    return LANGUAGES.includes(code)
      ? code
      : "en";
  }

  function getLanguage() {
    return normalizeLanguage(
      window.WorknelyLocalization
        ?.getLanguage?.() ||
      document.getElementById("language")
        ?.value ||
      document.documentElement.lang ||
      "en"
    );
  }

  function getLocale(language) {
    return LOCALES[
      normalizeLanguage(
        language || getLanguage()
      )
    ];
  }

  function translate(key, language) {
    const code = normalizeLanguage(
      language || getLanguage()
    );

    return DICTIONARY[code][key] ||
      DICTIONARY.en[key] ||
      String(key);
  }

  /* =========================
     STATUS TRANSLATIONS
  ========================= */

  const STATUS_VALUES = Object.freeze([
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

  function statusLabel(status, language) {
    if (!STATUS_VALUES.includes(status)) {
      return translate(
        "common.notSpecified",
        language
      );
    }

    return translate(
      "status." + status,
      language
    );
  }

  function getStatusOptions(language) {
    return STATUS_VALUES.map(
      function (status) {
        return {
          value: status,
          label: statusLabel(
            status,
            language
          )
        };
      }
    );
  }

  /* =========================
     EMPLOYMENT TRANSLATIONS
  ========================= */

  const EMPLOYMENT_MAP = Object.freeze({
    full_time: "fullTime",
    "full-time": "fullTime",
    part_time: "partTime",
    "part-time": "partTime",
    contract: "contract",
    temporary: "temporary",
    internship: "internship",
    freelance: "freelance",
    other: "other"
  });

  function employmentLabel(value, language) {
    const normalized =
      String(value || "")
        .trim()
        .toLowerCase();

    const key = Object.hasOwn(
      EMPLOYMENT_MAP,
      normalized
    )
      ? EMPLOYMENT_MAP[normalized]
      : null;

    if (!key) {
      return value
        ? String(value)
        : translate(
            "common.notSpecified",
            language
          );
    }

    return translate(
      "employment." + key,
      language
    );
  }

  /* =========================
     WORK MODE TRANSLATIONS
  ========================= */

  function workModeLabel(value, language) {
    const normalized =
      String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[-_\s]/g, "");

    if (
      ["remote", "hybrid", "onsite"]
        .includes(normalized)
    ) {
      return translate(
        "mode." + normalized,
        language
      );
    }

    return value
      ? String(value)
      : translate(
          "common.notSpecified",
          language
        );
  }

  /* =========================
     INTERNATIONAL FORMATTING
  ========================= */

  function formatNumber(
    value,
    options,
    language
  ) {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value)
    ) {
      return "—";
    }

    return new Intl.NumberFormat(
      getLocale(language),
      options || {}
    ).format(value);
  }

  function formatPercent(value, language) {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < 0 ||
      value > 100
    ) {
      return "—";
    }

    return formatNumber(
      value / 100,
      {
        style: "percent",
        maximumFractionDigits: 1
      },
      language
    );
  }

  function parseDate(value) {
    if (!value) return null;

    if (
      typeof value === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      const parts = value
        .split("-")
        .map(Number);

      const date = new Date(0);

      date.setFullYear(
        parts[0],
        parts[1] - 1,
        parts[2]
      );

      date.setHours(12, 0, 0, 0);

      if (
        date.getFullYear() !== parts[0] ||
        date.getMonth() !== parts[1] - 1 ||
        date.getDate() !== parts[2]
      ) {
        return null;
      }

      return date;
    }

    const date = new Date(value);

    return Number.isFinite(
      date.getTime()
    ) ? date : null;
  }

  function formatDate(
    value,
    options,
    language
  ) {
    const date = parseDate(value);

    if (!date) return "—";

    return new Intl.DateTimeFormat(
      getLocale(language),
      options || {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    ).format(date);
  }

  function formatDateTime(value, language) {
    return formatDate(
      value,
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      },
      language
    );
  }

  /* =========================
     SCOPED DOM LOCALIZATION
  ========================= */

  const ROOT_IDS = Object.freeze([
    "wnJobTracker",
    "wnJobPipeline",
    "wnJobCalendar",
    "wnJobAnalytics"
  ]);

  function hasKey(key) {
    return Object.hasOwn(
      DICTIONARY.en,
      key
    );
  }

  function translateElement(element) {
    const textKey =
      element.getAttribute(
        "data-wn-job-i18n"
      );

    const placeholderKey =
      element.getAttribute(
        "data-wn-job-placeholder"
      );

    const ariaKey =
      element.getAttribute(
        "data-wn-job-aria"
      );

    const titleKey =
      element.getAttribute(
        "data-wn-job-title"
      );

    if (
      textKey &&
      hasKey(textKey) &&
      element.children.length === 0 &&
      !element.isContentEditable &&
      !element.matches(
        "input,textarea,script,style"
      )
    ) {
      const text = translate(textKey);

      if (element.textContent !== text) {
        element.textContent = text;
      }
    }

    [
      ["placeholder", placeholderKey],
      ["aria-label", ariaKey],
      ["title", titleKey]
    ].forEach(function (entry) {
      const attribute = entry[0];
      const key = entry[1];

      if (!key || !hasKey(key)) {
        return;
      }

      const value = translate(key);

      if (
        element.getAttribute(attribute)
          !== value
      ) {
        element.setAttribute(
          attribute,
          value
        );
      }
    });
  }

  function apply() {
    const elements = new Set();

    const selector = [
      "[data-wn-job-i18n]",
      "[data-wn-job-placeholder]",
      "[data-wn-job-aria]",
      "[data-wn-job-title]"
    ].join(",");

    ROOT_IDS.forEach(function (id) {
      const root =
        document.getElementById(id);

      if (!root) return;

      if (root.matches(selector)) {
        elements.add(root);
      }

      root.querySelectorAll(selector)
        .forEach(function (element) {
          elements.add(element);
        });
    });

    elements.forEach(
      translateElement
    );

    return elements.size;
  }

  /* =========================
     LANGUAGE SYNCHRONIZATION
  ========================= */

  let scheduled = false;
  let initialized = false;

  function scheduleApply() {
    if (scheduled) return;

    scheduled = true;

    Promise.resolve().then(
      function () {
        scheduled = false;
        apply();
      }
    );
  }

  function initialize() {
    if (!initialized) {
      initialized = true;

      [
        "worknely:languagechange",
        "worknely:localizationready",
        "worknely:workspacechange",
        "worknely:jobinterfaceready",
        "worknely:jobpipelineready",
        "worknely:jobcalendarready",
        "worknely:jobanalyticsready"
      ].forEach(function (event) {
        document.addEventListener(
          event,
          scheduleApply
        );
      });

      document.addEventListener(
        "change",
        function (event) {
          if (
            event.target?.id === "language"
          ) {
            scheduleApply();
          }
        }
      );

      window.addEventListener(
        "pageshow",
        scheduleApply
      );
    }

    scheduleApply();

    return true;
  }

  /* =========================
     LOCALIZATION QUALITY TEST
  ========================= */

  function selfTest() {
    const tests = [];

    LANGUAGES.forEach(function (language) {
      const values = RAW[language];

      const missing = KEYS.filter(
        function (_, index) {
          return (
            typeof values[index]
              !== "string" ||
            !values[index].trim()
          );
        }
      );

      tests.push({
        name: language.toUpperCase() +
          " dictionary completeness",

        passed:
          values.length === KEYS.length &&
          missing.length === 0,

        expected: KEYS.length,

        actual: values.length,

        missing
      });
    });

    tests.push({
      name: "Unique translation keys",
      passed:
        new Set(KEYS).size === KEYS.length
    });

    tests.push({
      name: "English fallback",
      passed:
        translate(
          "tracker.add",
          "invalid"
        ) === "Add application"
    });

    tests.push({
      name: "Romanian status",
      passed:
        statusLabel(
          "accepted",
          "ro"
        ) === "Acceptată"
    });

    tests.push({
      name: "Italian status",
      passed:
        statusLabel(
          "interview",
          "it"
        ) === "Colloquio"
    });

    tests.push({
      name: "German work mode",
      passed:
        workModeLabel(
          "onsite",
          "de"
        ) === "Vor Ort"
    });

    tests.push({
      name: "French employment type",
      passed:
        employmentLabel(
          "full_time",
          "fr"
        ) === "Temps plein"
    });

    tests.push({
      name: "Spanish status",
      passed:
        statusLabel(
          "offer",
          "es"
        ) === "Oferta"
    });

    tests.push({
      name: "Nine stable status identifiers",
      passed:
        getStatusOptions("en").length === 9
    });

    tests.push({
      name: "Invalid date protection",
      passed:
        formatDate("2026-02-30") === "—"
    });

    tests.push({
      name: "Invalid number protection",
      passed:
        formatNumber(null) === "—"
    });

    tests.push({
      name: "Invalid percentage protection",
      passed:
        formatPercent(150) === "—"
    });

    return {
      version: VERSION,

      passed: tests.every(
        test => test.passed
      ),

      languages: LANGUAGES.length,

      translationKeys: KEYS.length,

      totalTranslations:
        KEYS.length * LANGUAGES.length,

      totalTests: tests.length,

      successfulTests: tests.filter(
        test => test.passed
      ).length,

      tests
    };
  }

  /* =========================
     PUBLIC API
  ========================= */

  window.WorknelyJobLocalization =
    Object.freeze({
      version: VERSION,

      languages: LANGUAGES,

      getLanguage,

      getLocale,

      t: translate,

      statusLabel,

      getStatusOptions,

      employmentLabel,

      workModeLabel,

      formatNumber,

      formatPercent,

      formatDate,

      formatDateTime,

      apply,

      initialize,

      selfTest,

      getState: function () {
        return {
          version: VERSION,

          language: getLanguage(),

          locale: getLocale(),

          supportedLanguages:
            LANGUAGES.length,

          translationKeys:
            KEYS.length,

          totalTranslations:
            KEYS.length *
            LANGUAGES.length,

          initialized,

          independentLanguageStorage:
            false,

          databaseWrites: false
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

  document.dispatchEvent(
    new CustomEvent(
      "worknely:joblocalizationready",
      {
        detail: {
          version: VERSION,
          languages: LANGUAGES.length
        }
      }
    )
  );

})();
