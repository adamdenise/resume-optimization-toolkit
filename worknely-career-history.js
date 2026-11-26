
/*
 * WORKNELY V7.18.2
 * International Career History Interface
 * Responsive Cloud History
 * Six International Languages
 */

(function () {
  "use strict";

  const VERSION = "7.18.2";
  const ROOT_ID = "wnCareerHistory";

  const TYPES = [
    "ats",
    "skill-gap",
    "resume-optimizer",
    "career-match",
    "interview-preparation",
    "cover-letter",
    "career-action-plan"
  ];

  const dictionary = {
    en: [
      "My Career History",
      "Your saved professional analyses",
      "Sign in to access your career history.",
      "No saved analyses yet.",
      "Loading your history...",
      "Unable to load history. Please try again.",
      "Refresh",
      "Delete",
      "Delete this saved analysis?",
      "Analysis deleted.",
      "Unable to delete this analysis.",
      "All analyses",
      "Saved analyses",
      "Estimated score",
      "No score",
      "ATS Analysis",
      "Skill Gap Analysis",
      "Resume Optimization",
      "Career Matching",
      "Interview Preparation",
      "Cover Letter",
      "Career Action Plan",
      "Only selected analysis summaries are saved.",
      "Latest 100 analyses"
    ],

    ro: [
      "Istoricul meu profesional",
      "Analizele tale profesionale salvate",
      "Autentifică-te pentru a accesa istoricul.",
      "Nu ai încă analize salvate.",
      "Se încarcă istoricul...",
      "Istoricul nu a putut fi încărcat. Încearcă din nou.",
      "Actualizează",
      "Șterge",
      "Ștergi această analiză salvată?",
      "Analiza a fost ștearsă.",
      "Analiza nu a putut fi ștearsă.",
      "Toate analizele",
      "Analize salvate",
      "Scor estimativ",
      "Fără scor",
      "Analiză ATS",
      "Analiza competențelor",
      "Optimizare CV",
      "Compatibilitate profesională",
      "Pregătire pentru interviu",
      "Scrisoare de intenție",
      "Plan de carieră",
      "Sunt salvate doar rezumatele analizelor selectate.",
      "Ultimele 100 de analize"
    ],

    it: [
      "La mia cronologia professionale",
      "Le tue analisi professionali salvate",
      "Accedi per visualizzare la cronologia.",
      "Nessuna analisi salvata.",
      "Caricamento della cronologia...",
      "Impossibile caricare la cronologia. Riprova.",
      "Aggiorna",
      "Elimina",
      "Eliminare questa analisi salvata?",
      "Analisi eliminata.",
      "Impossibile eliminare questa analisi.",
      "Tutte le analisi",
      "Analisi salvate",
      "Punteggio stimato",
      "Nessun punteggio",
      "Analisi ATS",
      "Analisi delle competenze",
      "Ottimizzazione CV",
      "Compatibilità professionale",
      "Preparazione al colloquio",
      "Lettera di presentazione",
      "Piano di carriera",
      "Vengono salvati solo i riepiloghi selezionati.",
      "Ultime 100 analisi"
    ],

    de: [
      "Mein Karriereverlauf",
      "Deine gespeicherten Karriereanalysen",
      "Melde dich an, um deinen Verlauf zu sehen.",
      "Noch keine gespeicherten Analysen.",
      "Verlauf wird geladen...",
      "Verlauf konnte nicht geladen werden.",
      "Aktualisieren",
      "Löschen",
      "Diese Analyse löschen?",
      "Analyse gelöscht.",
      "Analyse konnte nicht gelöscht werden.",
      "Alle Analysen",
      "Gespeicherte Analysen",
      "Geschätzter Wert",
      "Keine Bewertung",
      "ATS-Analyse",
      "Kompetenzanalyse",
      "Lebenslaufoptimierung",
      "Karriere-Matching",
      "Interviewvorbereitung",
      "Anschreiben",
      "Karriereplan",
      "Nur ausgewählte Analyseübersichten werden gespeichert.",
      "Letzte 100 Analysen"
    ],

    fr: [
      "Mon historique professionnel",
      "Vos analyses professionnelles enregistrées",
      "Connectez-vous pour accéder à votre historique.",
      "Aucune analyse enregistrée.",
      "Chargement de votre historique...",
      "Impossible de charger votre historique. Réessayez.",
      "Actualiser",
      "Supprimer",
      "Supprimer cette analyse enregistrée ?",
      "Analyse supprimée.",
      "Impossible de supprimer cette analyse.",
      "Toutes les analyses",
      "Analyses enregistrées",
      "Score estimé",
      "Aucun score",
      "Analyse ATS",
      "Analyse des compétences",
      "Optimisation du CV",
      "Compatibilité professionnelle",
      "Préparation à l'entretien",
      "Lettre de motivation",
      "Plan de carrière",
      "Seuls les résumés sélectionnés sont enregistrés.",
      "100 dernières analyses"
    ],

    es: [
      "Mi historial profesional",
      "Tus análisis profesionales guardados",
      "Inicia sesión para acceder a tu historial.",
      "Todavía no hay análisis guardados.",
      "Cargando tu historial...",
      "No se pudo cargar el historial. Inténtalo de nuevo.",
      "Actualizar",
      "Eliminar",
      "¿Eliminar este análisis guardado?",
      "Análisis eliminado.",
      "No se pudo eliminar este análisis.",
      "Todos los análisis",
      "Análisis guardados",
      "Puntuación estimada",
      "Sin puntuación",
      "Análisis ATS",
      "Análisis de competencias",
      "Optimización del CV",
      "Compatibilidad profesional",
      "Preparación de entrevistas",
      "Carta de presentación",
      "Plan de carrera",
      "Solo se guardan los resúmenes seleccionados.",
      "Últimos 100 análisis"
    ]
  };

  let root = null;
  let rows = [];
  let ownerId = null;
  let filter = "";
  let revision = 0;
  let busy = false;
  let authenticated = false;
  let statusIndex = null;
  let authSubscription = null;
  let boundClient = null;

  function language() {
    const value =
      window.WorknelyLocalization
        ?.getLanguage() ||
      document.documentElement.lang ||
      "en";

    return dictionary[value]
      ? value
      : "en";
  }

  function t(index) {
    return dictionary[language()][index];
  }

  function element(tag, className, text) {
    const node =
      document.createElement(tag);

    if (className) {
      node.className = className;
    }

    if (text !== undefined) {
      node.textContent = String(text);
    }

    return node;
  }

  function typeLabel(type) {
    const index = TYPES.indexOf(type);

    return index >= 0
      ? t(15 + index)
      : type;
  }

  function formatDate(value) {
    const date = new Date(value);

    if (!Number.isFinite(date.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat(
      language(),
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    ).format(date);
  }

  function formatScore(value) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return t(14);
    }

    const score = Number(value);

    if (
      !Number.isFinite(score) ||
      score < 0 ||
      score > 100
    ) {
      return t(14);
    }

    return new Intl.NumberFormat(
      language(),
      {
        maximumFractionDigits: 2
      }
    ).format(score) + "%";
  }

  function installStyles() {
    if (
      document.getElementById(
        "wnCareerHistoryStyle"
      )
    ) return;

    const style =
      document.createElement("style");

    style.id = "wnCareerHistoryStyle";

    style.textContent = `
      #wnCareerHistory {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        box-sizing: border-box;
        margin: 20px 0;
        padding: clamp(14px, 3vw, 24px);
        border: 1px solid rgba(115,70,255,.16);
        border-radius: 20px;
        background: var(--card, #ffffff);
        color: var(--text, #17142b);
        box-shadow: 0 8px 28px rgba(80,40,160,.06);
      }

      #wnCareerHistory *,
      #wnCareerHistory *::before,
      #wnCareerHistory *::after {
        box-sizing: border-box;
        min-width: 0;
      }

      #wnCareerHistory .wnh-title {
        margin: 0 0 6px;
        font-size: clamp(20px, 3vw, 26px);
        font-weight: 800;
        overflow-wrap: anywhere;
      }

      #wnCareerHistory .wnh-muted {
        font-size: 13px;
        line-height: 1.6;
        color: #716b85;
        overflow-wrap: anywhere;
      }

      #wnCareerHistory .wnh-toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        margin: 18px 0;
      }

      #wnCareerHistory .wnh-filter {
        flex: 1 1 180px;
        width: auto;
        max-width: 100%;
        padding: 11px;
        border: 1px solid #e2dcf5;
        border-radius: 11px;
        background: #fff;
        color: #30234d;
        font: inherit;
      }

      #wnCareerHistory .wnh-button {
        min-height: 44px;
        padding: 10px 16px;
        border: 1px solid #e2dcf5;
        border-radius: 11px;
        background: #f6f2ff;
        color: #6338e8;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        overflow-wrap: anywhere;
      }

      #wnCareerHistory .wnh-button:disabled {
        opacity: .5;
        cursor: wait;
      }

      #wnCareerHistory .wnh-list {
        display: grid;
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
        gap: 12px;
      }

      #wnCareerHistory .wnh-item {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 16px;
        border: 1px solid #e9e3f8;
        border-radius: 15px;
        background: #fcfaff;
        overflow-wrap: anywhere;
      }

      #wnCareerHistory .wnh-item-title {
        font-size: 15px;
        font-weight: 750;
        color: #30234d;
      }

      #wnCareerHistory .wnh-score {
        font-size: 26px;
        font-weight: 800;
        color: #693bfa;
      }

      #wnCareerHistory .wnh-delete {
        align-self: flex-start;
        background: #fff3f5;
        color: #a52c4a;
        border-color: #f4d5de;
      }

      #wnCareerHistory .wnh-status {
        margin: 12px 0;
        font-size: 14px;
        line-height: 1.5;
        overflow-wrap: anywhere;
      }

      @media (max-width: 700px) {
        #wnCareerHistory .wnh-list {
          grid-template-columns:
            minmax(0, 1fr);
        }

        #wnCareerHistory .wnh-toolbar {
          flex-direction: column;
          align-items: stretch;
        }

        #wnCareerHistory .wnh-filter {
          flex: none;
          width: 100%;
        }

        #wnCareerHistory .wnh-toolbar
        .wnh-button {
          width: 100%;
        }
      }

      @media print {
        #wnCareerHistory {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function clearPrivateData() {
    revision++;
    rows = [];
    ownerId = null;
    authenticated = false;
    busy = false;
    filter = "";
    statusIndex = null;

    render();
  }

  function render() {
    if (!root) return;

    root.replaceChildren();

    root.append(
      element("h2", "wnh-title", t(0)),
      element("p", "wnh-muted", t(1))
    );

    if (!authenticated) {
      root.append(
        element(
          "p",
          "wnh-status",
          busy ? t(4) : t(2)
        )
      );

      return;
    }

    const toolbar =
      element("div", "wnh-toolbar");

    const select =
      element("select", "wnh-filter");

    select.setAttribute(
      "aria-label",
      t(11)
    );

    const all =
      element("option", "", t(11));

    all.value = "";
    select.appendChild(all);

    TYPES.forEach(type => {
      const option =
        element(
          "option",
          "",
          typeLabel(type)
        );

      option.value = type;
      select.appendChild(option);
    });

    select.value = filter;
    select.disabled = busy;

    select.addEventListener(
      "change",
      () => {
        filter = select.value;
        refresh();
      }
    );

    const refreshButton =
      element(
        "button",
        "wnh-button",
        t(6)
      );

    refreshButton.type = "button";
    refreshButton.disabled = busy;

    refreshButton.addEventListener(
      "click",
      () => refresh()
    );

    toolbar.append(
      select,
      refreshButton
    );

    root.appendChild(toolbar);

    const status =
      element(
        "p",
        "wnh-status",
        busy
          ? t(4)
          : statusIndex !== null
            ? t(statusIndex)
            : t(12) + ": " + rows.length
      );

    status.setAttribute(
      "role",
      "status"
    );

    status.setAttribute(
      "aria-live",
      "polite"
    );

    root.appendChild(status);

    if (!busy && rows.length === 0 &&
        statusIndex === null) {
      root.append(
        element(
          "p",
          "wnh-muted",
          t(3)
        )
      );
    }

    const list =
      element("div", "wnh-list");

    rows.forEach(row => {
      const item =
        element("article", "wnh-item");

      item.append(
        element(
          "div",
          "wnh-item-title",
          typeLabel(row.analysis_type)
        ),
        element(
          "div",
          "wnh-muted",
          formatDate(row.created_at)
        )
      );

      if (row.target_role) {
        item.append(
          element(
            "div",
            "wnh-muted",
            row.target_role
          )
        );
      }

      item.append(
        element(
          "div",
          "wnh-muted",
          t(13)
        ),
        element(
          "div",
          "wnh-score",
          formatScore(row.score)
        )
      );

      const removeButton =
        element(
          "button",
          "wnh-button wnh-delete",
          t(7)
        );

      removeButton.type = "button";
      removeButton.disabled = busy;

      removeButton.addEventListener(
        "click",
        () => removeAnalysis(row.id)
      );

      item.appendChild(removeButton);
      list.appendChild(item);
    });

    root.append(
      list,
      element("p", "wnh-muted", t(23)),
      element("p", "wnh-muted", t(22))
    );
  }

  async function refresh() {
    const request = ++revision;

    busy = true;
    rows = [];
    statusIndex = null;

    render();

    try {
      const client =
        window.worknelySupabase;

      const storage =
        window.WorknelyCareerStorage;

      if (!client?.auth || !storage) {
        throw new Error("NOT_READY");
      }

      const { data, error } =
        await client.auth.getUser();

      if (request !== revision) return;

      if (error || !data?.user?.id) {
        clearPrivateData();
        return;
      }

      ownerId = data.user.id;
      authenticated = true;

      const expectedOwner = ownerId;

      render();

      const result =
        await storage.list({
          limit: 100,
          type: filter || undefined
        });

      if (
        request !== revision ||
        ownerId !== expectedOwner
      ) return;

      rows = result;

    } catch {
      if (request !== revision) return;

      rows = [];
      statusIndex = 5;

    } finally {
      if (request === revision) {
        busy = false;
        render();
      }
    }
  }

  async function removeAnalysis(id) {
    if (!authenticated || busy) return;

    if (!window.confirm(t(8))) return;

    const request = ++revision;
    const expectedOwner = ownerId;

    busy = true;
    statusIndex = null;

    render();

    try {
      await window.WorknelyCareerStorage
        .remove(id);

      if (
        request !== revision ||
        ownerId !== expectedOwner
      ) return;

      await refresh();

      if (
        ownerId === expectedOwner &&
        authenticated &&
        statusIndex === null
      ) {
        statusIndex = 9;
        render();
      }

    } catch {
      if (request !== revision) return;

      statusIndex = 10;

    } finally {
      if (request === revision) {
        busy = false;
        render();
      }
    }
  }

  function bindAuthentication() {
    const client =
      window.worknelySupabase;

    if (!client?.auth) return false;

    if (
      boundClient === client &&
      authSubscription
    ) return true;

    authSubscription?.unsubscribe();

    clearPrivateData();

    boundClient = client;

    const { data } =
      client.auth.onAuthStateChange(
        (event, session) => {
          const nextOwner =
            session?.user?.id || null;

          if (
            event === "SIGNED_OUT" ||
            event === "PASSWORD_RECOVERY" ||
            !nextOwner
          ) {
            clearPrivateData();
            return;
          }

          if (nextOwner !== ownerId) {
            clearPrivateData();

            ownerId = nextOwner;
            authenticated = true;

            render();

            setTimeout(
              () => refresh(),
              0
            );
          }
        }
      );

    authSubscription =
      data?.subscription || null;

    return true;
  }

  function mount() {
    const careerRoot =
      document.getElementById(
        "wnCareerIntelligence"
      );

    if (!careerRoot) return false;

    root =
      document.getElementById(ROOT_ID);

    if (!root) {
      root = element("section", "");

      root.id = ROOT_ID;

      root.setAttribute(
        "aria-label",
        t(0)
      );

      careerRoot.insertAdjacentElement(
        "afterend",
        root
      );
    }

    installStyles();
    render();

    return true;
  }

  function initialize() {
    if (!mount()) return;

    if (bindAuthentication()) {
      refresh();
    }
  }

  document.addEventListener(
    "worknely:careerhistorychange",
    event => {
      if (
        authenticated &&
        event.detail?.userId === ownerId
      ) {
        refresh();
      }
    }
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
    "worknely:workspacechange",
    event => {
      if (
        event.detail?.view ===
        "career-intelligence"
      ) {
        initialize();
      }
    }
  );

  window.addEventListener(
    "pagehide",
    clearPrivateData
  );

  window.addEventListener(
    "pageshow",
    initialize
  );

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      { once: true }
    );
  } else {
    initialize();
  }

  window.WorknelyCareerHistory =
    Object.freeze({
      version: VERSION,
      mount,
      refresh,
      clear: clearPrivateData
    });

  console.info(
    "Worknely V7.18.2 Career History ready."
  );

})();

/*
 * END WORKNELY V7.18.2
 * INTERNATIONAL CAREER HISTORY
 * WORKNELY — PEOPLE TECHNOLOGY
 */
