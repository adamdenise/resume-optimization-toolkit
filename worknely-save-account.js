
/*
 * WORKNELY V7.16.8
 * Advanced Design & Account Persistence
 *
 * Atomic Resume and Design Persistence
 * International Status Messages
 * Professional Template Restoration
 * Account Ownership Validation
 * Session Change Protection
 * Persistent Document Naming
 * Success Celebration Integration
 *
 * Worknely — People Technology
 */

import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

const VERSION = "7.16.8";

/* SUPABASE CONFIGURATION */

const SUPABASE_URL =
  "https://xuyronnwsokfadnekeir.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_nr1qlZLiORejUM1JwVqciw_YRSDjnni";

const supabase =
  window.worknelySupabase ||
  createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );

window.worknelySupabase = supabase;

/* DOM ELEMENTS */

const saveButton =
  document.getElementById("saveToAccount");

const statusElement =
  document.getElementById("saveAccountStatus");

const builderFields = {
  fullName: "bName",
  professionalTitle: "bTitle",
  contact: "bContact",
  education: "bEducation",
  summary: "bSummary",
  experience: "bExperience",
  skills: "bSkills"
};

/* APPLICATION STATE */

const params =
  new URLSearchParams(window.location.search);

let editingResumeId =
  params.get("edit") || null;

let editingResumeTitle = null;
let editingOwnerId = null;
let resumeLoaded = !editingResumeId;

let isBusy = false;
let isLoading = false;
let initialized = false;

let sessionGeneration = 0;
let currentSessionOwner = null;
let pendingReload = false;
let activeStatus = null;

const LANGUAGES = [
  "en", "ro", "it", "de", "fr", "es"
];

/* INTERNATIONAL STATUS DICTIONARY */

const translations = {

  en: {
    loading: "Loading your saved resume...",
    loginOpen: "Please log in to open this saved resume.",
    loaded: "Resume and design loaded successfully. Save to My Account to update your document.",
    loadError: "Unable to open the saved resume. Please try again from My Dashboard.",
    unsafeUpdate: "The saved resume has not been loaded. Reopen it from My Dashboard.",
    empty: "Please complete your resume before saving.",
    saving: "Saving your resume and design...",
    updating: "Updating your resume and design...",
    loginSave: "Please log in to save your resume.",
    ownerError: "This document belongs to another session. Reopen it from My Dashboard.",
    sessionChanged: "Your session has changed. Please log in again.",
    savedSessionChanged: "The save was confirmed, but your session has changed. Reopen My Dashboard.",
    saved: "Resume and design saved successfully!",
    updated: "Resume and design updated successfully!",
    saveError: "Unable to save your resume. Please try again.",
    designError: "The Design Studio is unavailable. Reload Worknely before saving.",
    signedOut: "Your session has ended. Please log in again.",
    invalidId: "Invalid document identifier.",
    resume: "Resume",
    myResume: "My Resume"
  },

  ro: {
    loading: "Se încarcă CV-ul salvat...",
    loginOpen: "Autentifică-te pentru a deschide acest CV.",
    loaded: "CV-ul și designul au fost încărcate. Salvează în cont pentru a actualiza documentul.",
    loadError: "CV-ul nu a putut fi deschis. Încearcă din nou din panoul de control.",
    unsafeUpdate: "CV-ul salvat nu a fost încărcat. Redeschide-l din panoul de control.",
    empty: "Completează CV-ul înainte de salvare.",
    saving: "Se salvează CV-ul și designul...",
    updating: "Se actualizează CV-ul și designul...",
    loginSave: "Autentifică-te pentru a salva CV-ul.",
    ownerError: "Documentul aparține altei sesiuni. Redeschide-l din panoul de control.",
    sessionChanged: "Sesiunea s-a schimbat. Autentifică-te din nou.",
    savedSessionChanged: "Salvarea a fost confirmată, dar sesiunea s-a schimbat. Redeschide panoul de control.",
    saved: "CV-ul și designul au fost salvate cu succes!",
    updated: "CV-ul și designul au fost actualizate cu succes!",
    saveError: "CV-ul nu a putut fi salvat. Încearcă din nou.",
    designError: "Studioul de design nu este disponibil. Reîncarcă Worknely înainte de salvare.",
    signedOut: "Sesiunea s-a încheiat. Autentifică-te din nou.",
    invalidId: "Identificator de document invalid.",
    resume: "CV",
    myResume: "CV-ul meu"
  },

  it: {
    loading: "Caricamento del curriculum salvato...",
    loginOpen: "Accedi per aprire questo curriculum.",
    loaded: "Curriculum e design caricati. Salva nel tuo account per aggiornare il documento.",
    loadError: "Impossibile aprire il curriculum. Riprova dalla dashboard.",
    unsafeUpdate: "Il curriculum non è stato caricato. Riaprilo dalla dashboard.",
    empty: "Completa il curriculum prima di salvarlo.",
    saving: "Salvataggio del curriculum e del design...",
    updating: "Aggiornamento del curriculum e del design...",
    loginSave: "Accedi per salvare il curriculum.",
    ownerError: "Il documento appartiene a un'altra sessione. Riaprilo dalla dashboard.",
    sessionChanged: "La sessione è cambiata. Accedi nuovamente.",
    savedSessionChanged: "Salvataggio confermato, ma la sessione è cambiata. Riapri la dashboard.",
    saved: "Curriculum e design salvati con successo!",
    updated: "Curriculum e design aggiornati con successo!",
    saveError: "Impossibile salvare il curriculum. Riprova.",
    designError: "Lo studio di design non è disponibile. Ricarica Worknely.",
    signedOut: "La sessione è terminata. Accedi nuovamente.",
    invalidId: "Identificativo del documento non valido.",
    resume: "CV",
    myResume: "Il mio CV"
  },

  de: {
    loading: "Gespeicherter Lebenslauf wird geladen...",
    loginOpen: "Melde dich an, um diesen Lebenslauf zu öffnen.",
    loaded: "Lebenslauf und Design wurden geladen. Speichere im Konto, um das Dokument zu aktualisieren.",
    loadError: "Der Lebenslauf konnte nicht geöffnet werden. Versuche es erneut im Dashboard.",
    unsafeUpdate: "Der Lebenslauf wurde nicht geladen. Öffne ihn erneut im Dashboard.",
    empty: "Vervollständige deinen Lebenslauf vor dem Speichern.",
    saving: "Lebenslauf und Design werden gespeichert...",
    updating: "Lebenslauf und Design werden aktualisiert...",
    loginSave: "Melde dich an, um deinen Lebenslauf zu speichern.",
    ownerError: "Das Dokument gehört zu einer anderen Sitzung. Öffne es erneut im Dashboard.",
    sessionChanged: "Die Sitzung wurde geändert. Melde dich erneut an.",
    savedSessionChanged: "Speicherung bestätigt, aber die Sitzung wurde geändert. Öffne das Dashboard erneut.",
    saved: "Lebenslauf und Design erfolgreich gespeichert!",
    updated: "Lebenslauf und Design erfolgreich aktualisiert!",
    saveError: "Der Lebenslauf konnte nicht gespeichert werden. Versuche es erneut.",
    designError: "Das Designstudio ist nicht verfügbar. Lade Worknely erneut.",
    signedOut: "Deine Sitzung wurde beendet. Melde dich erneut an.",
    invalidId: "Ungültige Dokument-ID.",
    resume: "Lebenslauf",
    myResume: "Mein Lebenslauf"
  },

  fr: {
    loading: "Chargement de votre CV enregistré...",
    loginOpen: "Connectez-vous pour ouvrir ce CV.",
    loaded: "CV et design chargés. Enregistrez dans votre compte pour actualiser le document.",
    loadError: "Impossible d'ouvrir le CV. Réessayez depuis le tableau de bord.",
    unsafeUpdate: "Le CV n'a pas été chargé. Rouvrez-le depuis le tableau de bord.",
    empty: "Complétez votre CV avant de l'enregistrer.",
    saving: "Enregistrement du CV et du design...",
    updating: "Mise à jour du CV et du design...",
    loginSave: "Connectez-vous pour enregistrer votre CV.",
    ownerError: "Ce document appartient à une autre session. Rouvrez-le depuis le tableau de bord.",
    sessionChanged: "Votre session a changé. Reconnectez-vous.",
    savedSessionChanged: "Enregistrement confirmé, mais la session a changé. Rouvrez le tableau de bord.",
    saved: "CV et design enregistrés avec succès !",
    updated: "CV et design actualisés avec succès !",
    saveError: "Impossible d'enregistrer le CV. Réessayez.",
    designError: "Le studio de design est indisponible. Rechargez Worknely.",
    signedOut: "Votre session est terminée. Reconnectez-vous.",
    invalidId: "Identifiant de document invalide.",
    resume: "CV",
    myResume: "Mon CV"
  },

  es: {
    loading: "Cargando tu currículum guardado...",
    loginOpen: "Inicia sesión para abrir este currículum.",
    loaded: "Currículum y diseño cargados. Guarda en tu cuenta para actualizar el documento.",
    loadError: "No se pudo abrir el currículum. Inténtalo desde el panel de control.",
    unsafeUpdate: "El currículum no se ha cargado. Ábrelo desde el panel de control.",
    empty: "Completa tu currículum antes de guardarlo.",
    saving: "Guardando tu currículum y diseño...",
    updating: "Actualizando tu currículum y diseño...",
    loginSave: "Inicia sesión para guardar tu currículum.",
    ownerError: "El documento pertenece a otra sesión. Ábrelo desde el panel de control.",
    sessionChanged: "Tu sesión ha cambiado. Inicia sesión nuevamente.",
    savedSessionChanged: "Guardado confirmado, pero la sesión ha cambiado. Abre el panel de control.",
    saved: "¡Currículum y diseño guardados correctamente!",
    updated: "¡Currículum y diseño actualizados correctamente!",
    saveError: "No se pudo guardar el currículum. Inténtalo de nuevo.",
    designError: "El estudio de diseño no está disponible. Recarga Worknely.",
    signedOut: "Tu sesión ha terminado. Inicia sesión nuevamente.",
    invalidId: "Identificador de documento no válido.",
    resume: "CV",
    myResume: "Mi CV"
  }

};

/* LANGUAGE MANAGEMENT */

function getLanguage() {

  let stored = null;

  try {
    stored = localStorage.getItem(
      "worknely.language"
    );
  } catch {}

  const language = String(
    window.WorknelyLocalization
      ?.getLanguage?.() ||
    stored ||
    document.documentElement.lang ||
    "en"
  ).toLowerCase().split("-")[0];

  return LANGUAGES.includes(language)
    ? language
    : "en";

}

function t(key) {

  return translations[getLanguage()]?.[key] ||
    translations.en[key] ||
    key;

}

/* STATUS MANAGEMENT */

function renderStatus() {

  if (!statusElement) return;

  if (!activeStatus) {

    statusElement.textContent = "";

    delete statusElement.dataset.status;
    delete statusElement.dataset.wnStatus;

    return;

  }

  statusElement.dataset.status =
    activeStatus.type;

  statusElement.dataset.wnStatus =
    activeStatus.type;

  statusElement.textContent =
    t(activeStatus.key);

}

function showStatus(key, type = "info") {

  activeStatus = key
    ? { key, type }
    : null;

  renderStatus();

}

document.addEventListener(
  "worknely:languagechange",
  renderStatus
);

document.addEventListener(
  "worknely:localizationready",
  renderStatus
);

window.addEventListener(
  "pageshow",
  renderStatus
);

/* SAVE BUTTON PROTECTION */

function syncSaveButton() {

  if (!saveButton) return;

  const disabled = isBusy || isLoading;

  saveButton.disabled = disabled;

  saveButton.setAttribute(
    "aria-busy",
    String(disabled)
  );

}

/* DOCUMENT ID VALIDATION */

function validResumeId(value) {

  return typeof value === "string" &&

    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      .test(value);

}

/* RESUME CONTENT */

function normalizeContent(content) {

  const source =

    content &&
    typeof content === "object" &&
    !Array.isArray(content)

      ? content
      : {};

  const normalized = {};

  for (const key of Object.keys(builderFields)) {

    normalized[key] =
      typeof source[key] === "string"
        ? source[key]
        : "";

  }

  return normalized;

}

function collectResume() {

  const content = {};

  for (const [key, id] of
    Object.entries(builderFields)) {

    const input =
      document.getElementById(id);

    content[key] =
      input ? input.value.trim() : "";

  }

  return normalizeContent(content);

}

function hasResumeContent(content) {

  return [

    content.fullName,
    content.professionalTitle,
    content.summary,
    content.experience,
    content.skills,
    content.education

  ].some(value =>

    typeof value === "string" &&
    value.trim().length > 0

  );

}

function fillBuilder(content = {}) {

  const safeContent =
    normalizeContent(content);

  for (const [key, id] of
    Object.entries(builderFields)) {

    const input =
      document.getElementById(id);

    if (!input) continue;

    input.value = safeContent[key];

  }

  notifyResumeChange();

}

/* DESIGN STUDIO INTEGRATION */

function getDesignEngine() {

  return window.WorknelyTemplatePersistence ||
    null;

}

function designEngineAvailable() {

  const engine = getDesignEngine();

  return Boolean(

    engine &&
    window.WorknelyTemplates &&
    window.WorknelyLivePreview &&
    window.WorknelyPDFExport &&

    typeof engine.captureDesign === "function" &&
    typeof engine.normalizeDesign === "function" &&
    typeof engine.restoreDesign === "function"

  );

}

function captureResumeDesign() {

  if (!designEngineAvailable()) {

    throw new Error("DESIGN_UNAVAILABLE");

  }

  const engine = getDesignEngine();

  return engine.normalizeDesign(
    engine.captureDesign()
  );

}

function restoreResumeDesign(value) {

  if (!designEngineAvailable()) {

    throw new Error("DESIGN_UNAVAILABLE");

  }

  const engine = getDesignEngine();

  const design =
    engine.normalizeDesign(value);

  /*
   * Legacy documents may not contain
   * an explicit document language.
   *
   * Use the current interface language
   * rather than inheriting another CV's
   * document language.
   */

  if (!design.documentLanguage) {

    design.documentLanguage =
      getLanguage();

  }

  const result = engine.restoreDesign(
    design,
    { persist: true }
  );

  if (result === false || result?.ok === false) {

    throw new Error("DESIGN_UNAVAILABLE");

  }

  window.WorknelyColorCustomization
    ?.refresh?.();

  window.WorknelyPDFExport
    ?.refresh?.();

  return design;

}

/* PREVIEW SYNCHRONIZATION */

function notifyResumeChange() {

  document.dispatchEvent(

    new CustomEvent(
      "worknely:resumechange",
      {
        detail: {
          source: "account-persistence",
          version: VERSION
        }
      }
    )

  );

  window.WorknelyLivePreview
    ?.refresh?.();

}

function refreshResumePreview() {

  const generateButton =
    document.getElementById("buildResume");

  if (generateButton) {

    generateButton.click();

  }

  notifyResumeChange();

}

/* DOCUMENT NAMING */

function generateDocumentTitle(content) {

  const professionalTitle =
    String(
      content.professionalTitle || ""
    ).trim();

  const fullName =
    String(
      content.fullName || ""
    ).trim();

  const title =

    professionalTitle ||

    (fullName
      ? fullName + " · " + t("resume")
      : t("myResume"));

  return Array.from(title)
    .slice(0, 120)
    .join("");

}

/* SUCCESS CELEBRATION */

function celebrateSaveSuccess() {

  document.dispatchEvent(

    new CustomEvent(
      "worknely:success",
      {
        detail: {
          type: "saved"
        }
      }
    )

  );

}

/* DOCUMENT IDENTITY */

function setEditingResume(
  id,
  title,
  ownerId
) {

  editingResumeId =
    id ? String(id) : null;

  editingResumeTitle =
    typeof title === "string"
      ? title
      : null;

  editingOwnerId =
    ownerId || null;

  resumeLoaded = true;

  try {

    const url =
      new URL(window.location.href);

    if (editingResumeId) {

      url.searchParams.set(
        "edit",
        editingResumeId
      );

    } else {

      url.searchParams.delete("edit");

    }

    window.history.replaceState(
      window.history.state,
      "",
      url.pathname +
      url.search +
      url.hash
    );

  } catch {

    console.warn(
      "Worknely: URL synchronization unavailable."
    );

  }

}

/* AUTHENTICATION */

async function getAuthenticatedUser() {

  const { data, error } =
    await supabase.auth.getUser();

  if (error || !data?.user) {

    return null;

  }

  return data.user;

}

async function verifySession(
  ownerId,
  generation
) {

  if (generation !== sessionGeneration) {

    return false;

  }

  const user =
    await getAuthenticatedUser();

  return Boolean(

    user &&
    user.id === ownerId &&
    generation === sessionGeneration

  );

}

/* SESSION DATA CLEANUP */

function clearPrivateDocument() {

  resumeLoaded = !editingResumeId;

  editingOwnerId = null;
  editingResumeTitle = null;

  fillBuilder({});

  const preview =
    document.getElementById("builderPreview");

  if (preview) {

    preview.textContent = "";

  }

  getDesignEngine()
    ?.clearContext?.();

  try {

    if (designEngineAvailable()) {

      restoreResumeDesign(null);

    }

  } catch {

    console.warn(
      "Worknely: design reset unavailable."
    );

  }

  notifyResumeChange();

}

/* LOAD EXISTING DOCUMENT */

async function loadExistingResume() {

  if (
    !editingResumeId ||
    isLoading ||
    isBusy
  ) {

    return false;

  }

  if (!validResumeId(editingResumeId)) {

    resumeLoaded = false;

    showStatus(
      "invalidId",
      "error"
    );

    return false;

  }

  const requestedId =
    editingResumeId;

  const generation =
    sessionGeneration;

  resumeLoaded = false;
  isLoading = true;

  syncSaveButton();

  showStatus("loading");

  try {

    if (!designEngineAvailable()) {

      throw new Error("DESIGN_UNAVAILABLE");

    }

    const user =
      await getAuthenticatedUser();

    if (!user) {

      showStatus(
        "loginOpen",
        "error"
      );

      return false;

    }

    if (generation !== sessionGeneration) {

      return false;

    }

    const { data, error } =
      await supabase

        .from("resumes")

        .select(
          "id,title,content,design"
        )

        .eq("id", requestedId)

        .eq("user_id", user.id)

        .single();

    if (error) throw error;

    if (!data?.id) {

      throw new Error("DOCUMENT_NOT_FOUND");

    }

    if (

      editingResumeId !== requestedId ||

      !(await verifySession(
        user.id,
        generation
      ))

    ) {

      return false;

    }

    /*
     * Restore design and content
     * from the same database row.
     */

    restoreResumeDesign(data.design);

    fillBuilder(data.content);

    setEditingResume(
      data.id,
      data.title,
      user.id
    );

    currentSessionOwner = user.id;

    refreshResumePreview();

    showStatus(
      "loaded",
      "success"
    );

    document.dispatchEvent(

      new CustomEvent(
        "worknely:accountresumeloaded",
        {
          detail: {
            resumeId: data.id,
            version: VERSION
          }
        }
      )

    );

    return true;

  } catch (error) {

    if (generation !== sessionGeneration) {

      return false;

    }

    resumeLoaded = false;

    console.error(
      "Worknely resume loading error:",
      error?.code || error?.name || "Error"
    );

    showStatus(

      error?.message === "DESIGN_UNAVAILABLE"
        ? "designError"
        : "loadError",

      "error"

    );

    return false;

  } finally {

    isLoading = false;

    syncSaveButton();

    processPendingReload();

  }

}

/* ATOMIC DOCUMENT CREATION */

async function createResume(
  userId,
  content,
  design
) {

  const payload = {

    user_id: userId,

    title: generateDocumentTitle(content),

    content,

    design,

    updated_at:
      new Date().toISOString()

  };

  const { data, error } =
    await supabase

      .from("resumes")

      .insert(payload)

      .select("id,title")

      .single();

  if (error) throw error;

  if (!data?.id) {

    throw new Error(
      "SAVE_CONFIRMATION_MISSING"
    );

  }

  return data;

}

/* ATOMIC DOCUMENT UPDATE */

/*
 * Existing document titles are
 * deliberately excluded.
 *
 * Content and design are saved
 * together in one database update.
 */

async function updateResume(
  resumeId,
  userId,
  content,
  design
) {

  if (!validResumeId(resumeId)) {

    throw new Error("INVALID_DOCUMENT_ID");

  }

  const payload = {

    content,

    design,

    updated_at:
      new Date().toISOString()

  };

  const { data, error } =
    await supabase

      .from("resumes")

      .update(payload)

      .eq("id", resumeId)

      .eq("user_id", userId)

      .select("id,title")

      .single();

  if (error) throw error;

  if (!data?.id) {

    throw new Error(
      "UPDATE_CONFIRMATION_MISSING"
    );

  }

  return data;

}

/* SAVE CONTROLLER */

async function saveToAccount(event) {

  event?.preventDefault?.();

  if (
    !saveButton ||
    isBusy ||
    isLoading
  ) {

    return false;

  }

  if (

    editingResumeId &&
    !resumeLoaded

  ) {

    showStatus(
      "unsafeUpdate",
      "error"
    );

    return false;

  }

  if (

    editingResumeId &&
    !validResumeId(editingResumeId)

  ) {

    showStatus(
      "invalidId",
      "error"
    );

    return false;

  }

  const content = collectResume();

  if (!hasResumeContent(content)) {

    showStatus("empty", "error");

    return false;

  }

  if (!designEngineAvailable()) {

    showStatus(
      "designError",
      "error"
    );

    return false;

  }

  const targetId = editingResumeId;

  const wasEditing = Boolean(targetId);

  const generation = sessionGeneration;

  isBusy = true;

  syncSaveButton();

  showStatus(
    wasEditing ? "updating" : "saving"
  );

  try {

    /*
     * Capture a consistent snapshot
     * of content and design.
     */

    const design =
      captureResumeDesign();

    const user =
      await getAuthenticatedUser();

    if (!user) {

      showStatus(
        "loginSave",
        "error"
      );

      return false;

    }

    if (

      wasEditing &&
      editingOwnerId !== user.id

    ) {

      showStatus(
        "ownerError",
        "error"
      );

      return false;

    }

    if (

      targetId !== editingResumeId ||

      !(await verifySession(
        user.id,
        generation
      ))

    ) {

      if (generation === sessionGeneration) {

        showStatus(
          "sessionChanged",
          "error"
        );

      }

      return false;

    }

    const savedDocument = wasEditing

      ? await updateResume(
          targetId,
          user.id,
          content,
          design
        )

      : await createResume(
          user.id,
          content,
          design
        );

    if (!(await verifySession(
      user.id,
      generation
    ))) {

      if (generation === sessionGeneration) {

        resumeLoaded = false;

        showStatus(
          "savedSessionChanged",
          "info"
        );

      }

      return false;

    }

    setEditingResume(
      savedDocument.id,
      savedDocument.title,
      user.id
    );

    currentSessionOwner = user.id;

    showStatus(

      wasEditing
        ? "updated"
        : "saved",

      "success"

    );

    document.dispatchEvent(

      new CustomEvent(
        "worknely:accountresumesaved",
        {
          detail: {
            resumeId: savedDocument.id,
            updated: wasEditing,
            version: VERSION
          }
        }
      )

    );

    celebrateSaveSuccess();

    return true;

  } catch (error) {

    if (generation !== sessionGeneration) {

      return false;

    }

    console.error(
      "Worknely resume save error:",
      error?.code || error?.name || "Error"
    );

    showStatus(

      error?.message === "DESIGN_UNAVAILABLE"
        ? "designError"
        : "saveError",

      "error"

    );

    return false;

  } finally {

    isBusy = false;

    syncSaveButton();

    processPendingReload();

  }

}

/* DEFERRED SESSION RELOAD */

function processPendingReload() {

  if (

    !pendingReload ||
    isLoading ||
    isBusy

  ) {

    return;

  }

  pendingReload = false;

  if (

    editingResumeId &&
    !resumeLoaded &&
    currentSessionOwner

  ) {

    window.setTimeout(
      loadExistingResume,
      0
    );

  }

}

/* AUTHENTICATION STATE PROTECTION */

supabase.auth.onAuthStateChange(

  (event, session) => {

    const nextOwner =
      session?.user?.id || null;

    if (event === "SIGNED_OUT") {

      sessionGeneration++;

      currentSessionOwner = null;

      pendingReload = false;

      clearPrivateDocument();

      showStatus(
        "signedOut",
        "info"
      );

      return;

    }

    if (

      nextOwner &&
      currentSessionOwner &&
      nextOwner !== currentSessionOwner

    ) {

      sessionGeneration++;

      clearPrivateDocument();

    }

    if (

      nextOwner &&
      editingOwnerId &&
      nextOwner !== editingOwnerId

    ) {

      sessionGeneration++;

      clearPrivateDocument();

    }

    if (nextOwner) {

      currentSessionOwner = nextOwner;

    }

    if (

      (
        event === "SIGNED_IN" ||
        event === "INITIAL_SESSION"
      ) &&

      nextOwner &&
      editingResumeId &&
      !resumeLoaded

    ) {

      pendingReload = true;

      window.setTimeout(
        processPendingReload,
        0
      );

    }

  }

);

/* PUBLIC ACCOUNT PERSISTENCE API */

window.WorknelyAccountPersistence =
  Object.freeze({

    version: VERSION,

    save: saveToAccount,

    reload: loadExistingResume,

    getState: () => ({

      version: VERSION,

      resumeId: editingResumeId,

      resumeTitle: editingResumeTitle,

      loaded: resumeLoaded,

      busy: isBusy,

      loading: isLoading,

      editing: Boolean(editingResumeId)

    })

  });

/* INITIALIZATION */

function initializePersistenceEngine() {

  if (initialized) return;

  initialized = true;

  if (saveButton) {

    saveButton.addEventListener(
      "click",
      saveToAccount
    );

  }

  syncSaveButton();

  getDesignEngine()
    ?.bindAuthentication?.();

  if (editingResumeId) {

    loadExistingResume();

  }

  document.dispatchEvent(

    new CustomEvent(
      "worknely:accountpersistenceready",
      {
        detail: {
          version: VERSION
        }
      }
    )

  );

  console.info(
    "Worknely V" + VERSION +
    " Advanced Account Persistence ready."
  );

}

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initializePersistenceEngine,
    { once: true }
  );

} else {

  initializePersistenceEngine();

}

/*
 * END WORKNELY V7.16.8
 *
 * Advanced Design & Account Persistence
 * International SaaS Architecture
 * Worknely — People Technology
 */
