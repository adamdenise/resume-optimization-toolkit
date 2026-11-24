
/*
 * WORKNELY V7.15
 * International Dashboard Engine
 * EN / RO / IT / DE / FR / ES
 *
 * Supabase Authentication
 * International Document Management
 * Localized Notifications
 * Smart Search & Sorting
 * Rename / Duplicate / Delete
 * Printable PDF Export
 * Responsive SaaS Workspace
 */

import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL =
  "https://adamdenise.github.io/resume-optimization-toolkit/";

const supabase = window.worknelySupabase ||
  createClient(
    "https://xuyronnwsokfadnekeir.supabase.co",
    "sb_publishable_nr1qlZLiORejUM1JwVqciw_YRSDjnni",
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );

window.worknelySupabase = supabase;

const $ = id => document.getElementById(id);

const loading = $("loading");
const app = $("app");
const welcome = $("welcome");
const logoutButton = $("logout");
const resumeForm = $("resumeForm");
const resumeTitle = $("resumeTitle");
const resumeCount = $("resumeCount");
const workspaceResumeCount = $("workspaceResumeCount");
const resumeList = $("resumeList");
const resumeStatus = $("resumeStatus");
const saveButton = $("saveResume");
const newButton = $("newResume");
const quickCreate = $("quickCreate");

const searchInput = $("wnResumeSearch");
const sortInput = $("wnResumeSort");
const clearSearch = $("wnClearSearch");
const resetSearch = $("wnResetSearch");
const searchResultCount = $("wnSearchResultCount");
const noSearchResults = $("wnNoSearchResults");

const renameDialog = $("wnRenameDialog");
const renameForm = $("wnRenameForm");
const renameInput = $("wnRenameInput");
const renameStatus = $("wnRenameStatus");
const renameCancel = $("wnRenameCancel");
const renameConfirm = $("wnRenameConfirm");

const duplicateDialog = $("wnDuplicateDialog");
const duplicateForm = $("wnDuplicateForm");
const duplicateInput = $("wnDuplicateInput");
const duplicateStatus = $("wnDuplicateStatus");
const duplicateCancel = $("wnDuplicateCancel");
const duplicateConfirm = $("wnDuplicateConfirm");

const deleteDialog = $("wnDeleteDialog");
const deleteResumeName = $("wnDeleteResumeName");
const deleteStatus = $("wnDeleteStatus");
const deleteCancel = $("wnDeleteCancel");
const deleteConfirm = $("wnDeleteConfirm");

const fields = {
  fullName: $("fullName"),
  professionalTitle: $("professionalTitle"),
  contact: $("contact"),
  education: $("education"),
  summary: $("summary"),
  experience: $("experience"),
  skills: $("skills")
};

/* INTERNATIONAL DICTIONARY */

const translations = {

  en: {
    checking: "Checking your Worknely session...",
    sessionError: "Unable to verify your session. Please try again.",
    welcome: "Welcome back, {name}!",
    user: "Worknely user",
    loading: "Loading your resumes...",
    loadError: "Unable to load resumes. Please try again.",
    save: "Save Resume",
    update: "Update Resume",
    saving: "Saving...",
    creating: "Creating...",
    deleting: "Deleting...",
    ready: "Ready to create a new resume.",
    titleRequired: "Please enter a resume title.",
    nameRequired: "Please enter a document name.",
    saved: "Resume saved successfully.",
    updated: "Resume updated successfully.",
    savedRefresh: "Resume saved. Please refresh the dashboard.",
    saveError: "Unable to save resume. Please try again.",
    renamed: "Resume renamed successfully.",
    renameError: "Unable to rename resume. Please try again.",
    duplicated: "Resume duplicated successfully.",
    duplicateError: "Unable to duplicate resume. Please try again.",
    deleted: "Resume deleted successfully.",
    deleteError: "Unable to delete resume. Please check permissions and try again.",
    notFound: "Resume not found. Please refresh.",
    untitled: "Untitled Resume",
    unknownDate: "Unknown date",
    date: "Updated {date}",
    results: "{count} of {total} resumes",
    edit: "Edit in Resume Builder",
    editName: "Edit {name}",
    more: "More actions for {name}",
    rename: "Rename",
    duplicate: "Duplicate",
    download: "Download PDF",
    delete: "Delete Resume",
    saveName: "Save Name",
    createCopy: "Create Copy",
    copy: "Copy",
    emptyTitle: "Your career starts here",
    emptyDescription: "Create your first professional resume and keep your career documents organized in one place.",
    firstResume: "Create Your First Resume",
    browserError: "Please use an updated browser.",
    popupError: "Please allow pop-ups to export your PDF.",
    pdfReady: "PDF preview opened. Use Save / Print PDF.",
    pdfError: "Unable to prepare PDF.",
    print: "Save / Print PDF",
    printHelp: "Choose Save as PDF in your browser, or use the iOS print and share options.",
    summary: "Professional Summary",
    experience: "Professional Experience",
    education: "Education",
    skills: "Skills",
    signingOut: "Signing out...",
    logoutError: "Unable to sign out. Please try again."
  },

  ro: {
    checking: "Se verifică sesiunea Worknely...",
    sessionError: "Sesiunea nu a putut fi verificată. Încearcă din nou.",
    welcome: "Bine ai revenit, {name}!",
    user: "Utilizator Worknely",
    loading: "Se încarcă CV-urile tale...",
    loadError: "CV-urile nu au putut fi încărcate. Încearcă din nou.",
    save: "Salvează CV-ul",
    update: "Actualizează CV-ul",
    saving: "Se salvează...",
    creating: "Se creează...",
    deleting: "Se șterge...",
    ready: "Poți crea un CV nou.",
    titleRequired: "Introdu un titlu pentru CV.",
    nameRequired: "Introdu un nume pentru document.",
    saved: "CV-ul a fost salvat cu succes.",
    updated: "CV-ul a fost actualizat cu succes.",
    savedRefresh: "CV salvat. Reîncarcă panoul de control.",
    saveError: "CV-ul nu a putut fi salvat. Încearcă din nou.",
    renamed: "CV-ul a fost redenumit cu succes.",
    renameError: "CV-ul nu a putut fi redenumit. Încearcă din nou.",
    duplicated: "CV-ul a fost duplicat cu succes.",
    duplicateError: "CV-ul nu a putut fi duplicat. Încearcă din nou.",
    deleted: "CV-ul a fost șters cu succes.",
    deleteError: "CV-ul nu a putut fi șters. Verifică permisiunile și încearcă din nou.",
    notFound: "CV-ul nu a fost găsit. Reîncarcă pagina.",
    untitled: "CV fără titlu",
    unknownDate: "Dată necunoscută",
    date: "Actualizat la {date}",
    results: "{count} din {total} CV-uri",
    edit: "Editează în editorul de CV",
    editName: "Editează {name}",
    more: "Mai multe acțiuni pentru {name}",
    rename: "Redenumește",
    duplicate: "Duplică",
    download: "Descarcă PDF",
    delete: "Șterge CV-ul",
    saveName: "Salvează numele",
    createCopy: "Creează o copie",
    copy: "Copie",
    emptyTitle: "Cariera ta începe aici",
    emptyDescription: "Creează primul tău CV profesional și organizează toate documentele într-un singur loc.",
    firstResume: "Creează primul CV",
    browserError: "Folosește un browser actualizat.",
    popupError: "Permite ferestrele pop-up pentru exportul PDF.",
    pdfReady: "Previzualizarea PDF este deschisă. Folosește Salvare / Imprimare PDF.",
    pdfError: "PDF-ul nu a putut fi pregătit.",
    print: "Salvare / Imprimare PDF",
    printHelp: "Alege Salvare ca PDF în browser sau utilizează opțiunile de imprimare și partajare iOS.",
    summary: "Profil profesional",
    experience: "Experiență profesională",
    education: "Educație",
    skills: "Competențe",
    signingOut: "Se efectuează deconectarea...",
    logoutError: "Deconectarea nu a reușit. Încearcă din nou."
  },

  it: {
    checking: "Verifica della sessione Worknely...",
    sessionError: "Impossibile verificare la sessione. Riprova.",
    welcome: "Bentornato/a, {name}!",
    user: "Utente Worknely",
    loading: "Caricamento dei curriculum...",
    loadError: "Impossibile caricare i curriculum. Riprova.",
    save: "Salva curriculum",
    update: "Aggiorna curriculum",
    saving: "Salvataggio...",
    creating: "Creazione...",
    deleting: "Eliminazione...",
    ready: "Puoi creare un nuovo curriculum.",
    titleRequired: "Inserisci un titolo per il curriculum.",
    nameRequired: "Inserisci un nome per il documento.",
    saved: "Curriculum salvato correttamente.",
    updated: "Curriculum aggiornato correttamente.",
    savedRefresh: "Curriculum salvato. Aggiorna la dashboard.",
    saveError: "Impossibile salvare il curriculum. Riprova.",
    renamed: "Curriculum rinominato correttamente.",
    renameError: "Impossibile rinominare il curriculum. Riprova.",
    duplicated: "Curriculum duplicato correttamente.",
    duplicateError: "Impossibile duplicare il curriculum. Riprova.",
    deleted: "Curriculum eliminato correttamente.",
    deleteError: "Impossibile eliminare il curriculum. Verifica i permessi e riprova.",
    notFound: "Curriculum non trovato. Aggiorna la pagina.",
    untitled: "Curriculum senza titolo",
    unknownDate: "Data sconosciuta",
    date: "Aggiornato il {date}",
    results: "{count} di {total} curriculum",
    edit: "Modifica nell'editor CV",
    editName: "Modifica {name}",
    more: "Altre azioni per {name}",
    rename: "Rinomina",
    duplicate: "Duplica",
    download: "Scarica PDF",
    delete: "Elimina curriculum",
    saveName: "Salva nome",
    createCopy: "Crea copia",
    copy: "Copia",
    emptyTitle: "La tua carriera inizia qui",
    emptyDescription: "Crea il tuo primo curriculum professionale e organizza tutti i documenti in un unico posto.",
    firstResume: "Crea il tuo primo CV",
    browserError: "Utilizza un browser aggiornato.",
    popupError: "Consenti le finestre pop-up per esportare il PDF.",
    pdfReady: "Anteprima PDF aperta. Usa Salva / Stampa PDF.",
    pdfError: "Impossibile preparare il PDF.",
    print: "Salva / Stampa PDF",
    printHelp: "Seleziona Salva come PDF nel browser oppure usa le opzioni di stampa e condivisione di iOS.",
    summary: "Profilo professionale",
    experience: "Esperienza professionale",
    education: "Formazione",
    skills: "Competenze",
    signingOut: "Disconnessione...",
    logoutError: "Impossibile disconnettersi. Riprova."
  },

  de: {
    checking: "Worknely-Sitzung wird überprüft...",
    sessionError: "Sitzung konnte nicht überprüft werden. Bitte erneut versuchen.",
    welcome: "Willkommen zurück, {name}!",
    user: "Worknely-Nutzer",
    loading: "Lebensläufe werden geladen...",
    loadError: "Lebensläufe konnten nicht geladen werden. Bitte erneut versuchen.",
    save: "Lebenslauf speichern",
    update: "Lebenslauf aktualisieren",
    saving: "Wird gespeichert...",
    creating: "Wird erstellt...",
    deleting: "Wird gelöscht...",
    ready: "Ein neuer Lebenslauf kann erstellt werden.",
    titleRequired: "Bitte einen Titel eingeben.",
    nameRequired: "Bitte einen Dokumentnamen eingeben.",
    saved: "Lebenslauf erfolgreich gespeichert.",
    updated: "Lebenslauf erfolgreich aktualisiert.",
    savedRefresh: "Lebenslauf gespeichert. Bitte Dashboard aktualisieren.",
    saveError: "Speichern fehlgeschlagen. Bitte erneut versuchen.",
    renamed: "Lebenslauf erfolgreich umbenannt.",
    renameError: "Umbenennen fehlgeschlagen. Bitte erneut versuchen.",
    duplicated: "Lebenslauf erfolgreich dupliziert.",
    duplicateError: "Duplizieren fehlgeschlagen. Bitte erneut versuchen.",
    deleted: "Lebenslauf erfolgreich gelöscht.",
    deleteError: "Löschen fehlgeschlagen. Bitte Berechtigungen prüfen und erneut versuchen.",
    notFound: "Lebenslauf nicht gefunden. Bitte Seite aktualisieren.",
    untitled: "Unbenannter Lebenslauf",
    unknownDate: "Unbekanntes Datum",
    date: "Aktualisiert am {date}",
    results: "{count} von {total} Lebensläufen",
    edit: "Im Lebenslauf-Editor bearbeiten",
    editName: "{name} bearbeiten",
    more: "Weitere Aktionen für {name}",
    rename: "Umbenennen",
    duplicate: "Duplizieren",
    download: "PDF herunterladen",
    delete: "Lebenslauf löschen",
    saveName: "Namen speichern",
    createCopy: "Kopie erstellen",
    copy: "Kopie",
    emptyTitle: "Deine Karriere beginnt hier",
    emptyDescription: "Erstelle deinen ersten professionellen Lebenslauf und verwalte deine Dokumente an einem Ort.",
    firstResume: "Ersten Lebenslauf erstellen",
    browserError: "Bitte einen aktuellen Browser verwenden.",
    popupError: "Bitte Pop-ups für den PDF-Export erlauben.",
    pdfReady: "PDF-Vorschau geöffnet. PDF speichern oder drucken.",
    pdfError: "PDF konnte nicht vorbereitet werden.",
    print: "PDF speichern / drucken",
    printHelp: "Wähle Als PDF speichern im Browser oder verwende die Druck- und Freigabeoptionen von iOS.",
    summary: "Berufliches Profil",
    experience: "Berufserfahrung",
    education: "Ausbildung",
    skills: "Fähigkeiten",
    signingOut: "Abmeldung...",
    logoutError: "Abmeldung fehlgeschlagen. Bitte erneut versuchen."
  },

  fr: {
    checking: "Vérification de votre session Worknely...",
    sessionError: "Impossible de vérifier la session. Réessayez.",
    welcome: "Bon retour, {name} !",
    user: "Utilisateur Worknely",
    loading: "Chargement de vos CV...",
    loadError: "Impossible de charger les CV. Réessayez.",
    save: "Enregistrer le CV",
    update: "Mettre à jour le CV",
    saving: "Enregistrement...",
    creating: "Création...",
    deleting: "Suppression...",
    ready: "Vous pouvez créer un nouveau CV.",
    titleRequired: "Saisissez un titre pour le CV.",
    nameRequired: "Saisissez un nom de document.",
    saved: "CV enregistré avec succès.",
    updated: "CV mis à jour avec succès.",
    savedRefresh: "CV enregistré. Actualisez le tableau de bord.",
    saveError: "Impossible d'enregistrer le CV. Réessayez.",
    renamed: "CV renommé avec succès.",
    renameError: "Impossible de renommer le CV. Réessayez.",
    duplicated: "CV dupliqué avec succès.",
    duplicateError: "Impossible de dupliquer le CV. Réessayez.",
    deleted: "CV supprimé avec succès.",
    deleteError: "Impossible de supprimer le CV. Vérifiez les autorisations et réessayez.",
    notFound: "CV introuvable. Actualisez la page.",
    untitled: "CV sans titre",
    unknownDate: "Date inconnue",
    date: "Mis à jour le {date}",
    results: "{count} CV sur {total}",
    edit: "Modifier dans l'éditeur de CV",
    editName: "Modifier {name}",
    more: "Plus d'actions pour {name}",
    rename: "Renommer",
    duplicate: "Dupliquer",
    download: "Télécharger le PDF",
    delete: "Supprimer le CV",
    saveName: "Enregistrer le nom",
    createCopy: "Créer une copie",
    copy: "Copie",
    emptyTitle: "Votre carrière commence ici",
    emptyDescription: "Créez votre premier CV professionnel et organisez vos documents au même endroit.",
    firstResume: "Créer votre premier CV",
    browserError: "Utilisez un navigateur à jour.",
    popupError: "Autorisez les fenêtres contextuelles pour exporter le PDF.",
    pdfReady: "Aperçu PDF ouvert. Utilisez Enregistrer / Imprimer PDF.",
    pdfError: "Impossible de préparer le PDF.",
    print: "Enregistrer / Imprimer PDF",
    printHelp: "Choisissez Enregistrer au format PDF dans le navigateur ou utilisez les options d'impression et de partage iOS.",
    summary: "Profil professionnel",
    experience: "Expérience professionnelle",
    education: "Formation",
    skills: "Compétences",
    signingOut: "Déconnexion...",
    logoutError: "Impossible de se déconnecter. Réessayez."
  },

  es: {
    checking: "Verificando tu sesión de Worknely...",
    sessionError: "No se pudo verificar la sesión. Inténtalo de nuevo.",
    welcome: "¡Te damos la bienvenida, {name}!",
    user: "Usuario de Worknely",
    loading: "Cargando tus currículums...",
    loadError: "No se pudieron cargar los currículums. Inténtalo de nuevo.",
    save: "Guardar currículum",
    update: "Actualizar currículum",
    saving: "Guardando...",
    creating: "Creando...",
    deleting: "Eliminando...",
    ready: "Puedes crear un nuevo currículum.",
    titleRequired: "Introduce un título para el currículum.",
    nameRequired: "Introduce un nombre para el documento.",
    saved: "Currículum guardado correctamente.",
    updated: "Currículum actualizado correctamente.",
    savedRefresh: "Currículum guardado. Actualiza el panel.",
    saveError: "No se pudo guardar el currículum. Inténtalo de nuevo.",
    renamed: "Currículum renombrado correctamente.",
    renameError: "No se pudo renombrar el currículum. Inténtalo de nuevo.",
    duplicated: "Currículum duplicado correctamente.",
    duplicateError: "No se pudo duplicar el currículum. Inténtalo de nuevo.",
    deleted: "Currículum eliminado correctamente.",
    deleteError: "No se pudo eliminar el currículum. Comprueba los permisos e inténtalo de nuevo.",
    notFound: "Currículum no encontrado. Actualiza la página.",
    untitled: "Currículum sin título",
    unknownDate: "Fecha desconocida",
    date: "Actualizado el {date}",
    results: "{count} de {total} currículums",
    edit: "Editar en el creador de CV",
    editName: "Editar {name}",
    more: "Más acciones para {name}",
    rename: "Renombrar",
    duplicate: "Duplicar",
    download: "Descargar PDF",
    delete: "Eliminar currículum",
    saveName: "Guardar nombre",
    createCopy: "Crear copia",
    copy: "Copia",
    emptyTitle: "Tu carrera comienza aquí",
    emptyDescription: "Crea tu primer currículum profesional y organiza tus documentos en un solo lugar.",
    firstResume: "Crear tu primer CV",
    browserError: "Utiliza un navegador actualizado.",
    popupError: "Permite las ventanas emergentes para exportar el PDF.",
    pdfReady: "Vista previa PDF abierta. Usa Guardar / Imprimir PDF.",
    pdfError: "No se pudo preparar el PDF.",
    print: "Guardar / Imprimir PDF",
    printHelp: "Selecciona Guardar como PDF en el navegador o utiliza las opciones de impresión y compartir de iOS.",
    summary: "Perfil profesional",
    experience: "Experiencia profesional",
    education: "Formación",
    skills: "Competencias",
    signingOut: "Cerrando sesión...",
    logoutError: "No se pudo cerrar la sesión. Inténtalo de nuevo."
  }

};

const locales = {
  en: "en-GB",
  ro: "ro-RO",
  it: "it-IT",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES"
};

function getLanguage() {

  let language =
    window.WorknelyLocalization?.getLanguage?.();

  if (!language) {
    try {
      language = localStorage.getItem(
        "worknely.language"
      );
    } catch {
      language = document.documentElement.lang;
    }
  }

  language = String(language || "en")
    .toLowerCase()
    .split("-")[0];

  return translations[language]
    ? language
    : "en";

}

function t(key, variables = {}) {

  const dictionary = translations[getLanguage()];

  const value =
    dictionary[key] ||
    translations.en[key] ||
    key;

  return value.replace(
    /\{([a-zA-Z0-9_]+)\}/g,
    (match, name) =>
      Object.prototype.hasOwnProperty.call(
        variables, name
      )
        ? String(variables[name])
        : match
  );

}

function locale() {
  return locales[getLanguage()];
}

function formatNumber(value) {
  return new Intl.NumberFormat(locale())
    .format(value);
}

/* APPLICATION STATE */

let currentUser = null;
let editingResumeId = null;
let savedResumes = [];
let isBusy = false;
let resumesLoaded = false;

let selectedRenameId = null;
let selectedDuplicateId = null;
let selectedDeleteId = null;

let activeOperation = "";
let loadingKey = "checking";

const statusMessages = new Map();

/* LOCALIZED STATUS MANAGEMENT */

function setStatus(key = "", type = "info") {

  statusMessages.set(resumeStatus, key);

  resumeStatus.textContent =
    key ? t(key) : "";

  if (key) {
    resumeStatus.dataset.status = type;
  } else {
    delete resumeStatus.dataset.status;
  }

}

function setDialogStatus(element, key = "") {

  if (!element) return;

  statusMessages.set(element, key);

  element.textContent =
    key ? t(key) : "";

}

function reportError(operation, error) {

  console.error(
    "Worknely dashboard:",
    operation,
    error?.code || error?.name || "Error"
  );

}

function updateActionLabels() {

  saveButton.textContent = t(
    activeOperation === "save"
      ? "saving"
      : editingResumeId
        ? "update"
        : "save"
  );

  renameConfirm.textContent = t(
    activeOperation === "rename"
      ? "saving"
      : "saveName"
  );

  duplicateConfirm.textContent = t(
    activeOperation === "duplicate"
      ? "creating"
      : "createCopy"
  );

  deleteConfirm.textContent = t(
    activeOperation === "delete"
      ? "deleting"
      : "delete"
  );

}

function setBusy(busy, operation = "") {

  isBusy = busy;
  activeOperation = busy ? operation : "";

  const controls = [
    saveButton,
    newButton,
    logoutButton,
    searchInput,
    sortInput,
    clearSearch,
    resetSearch,
    renameInput,
    renameConfirm,
    renameCancel,
    duplicateInput,
    duplicateConfirm,
    duplicateCancel,
    deleteConfirm,
    deleteCancel,
    resumeTitle,
    ...Object.values(fields)
  ];

  controls.forEach(element => {
    if (element) element.disabled = busy;
  });

  resumeList.querySelectorAll("button")
    .forEach(button => {
      button.disabled = busy;
    });

  resumeForm.setAttribute(
    "aria-busy",
    String(busy)
  );

  updateActionLabels();

}

/* SESSION DISPLAY */

function showApp() {

  loading.hidden = true;
  app.hidden = false;

}

function showLoading(key) {

  loadingKey = key;
  loading.hidden = false;
  loading.textContent = t(key);
  app.hidden = true;

}

function redirectToLogin() {

  window.location.replace(
    SITE_URL + "#worknelyAccount"
  );

}

function clearSession() {

  currentUser = null;
  editingResumeId = null;
  savedResumes = [];
  resumesLoaded = false;

  resumeForm.reset();
  fillResumeForm({});

  renameInput.value = "";
  duplicateInput.value = "";
  deleteResumeName.textContent = "";

  [renameDialog, duplicateDialog, deleteDialog]
    .forEach(dialog => {
      if (dialog.open) dialog.close();
    });

  resumeList.replaceChildren();
  welcome.textContent = "";
  statusMessages.clear();

  showLoading("signingOut");

}

function verifyOwner(userId) {

  return currentUser?.id === userId;

}

/* DOCUMENT UTILITIES */

function findResume(id) {

  return savedResumes.find(
    item => String(item.id) === String(id)
  );

}

function getDocumentTitle(resume) {

  return String(
    resume?.title || t("untitled")
  );

}

function formatDate(date) {

  if (!date) return t("unknownDate");

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return t("unknownDate");
  }

  return parsed.toLocaleDateString(
    locale(),
    {
      year: "numeric",
      month: "short",
      day: "numeric"
    }
  );

}

function timestamp(date) {

  const value = Date.parse(date || "");

  return Number.isFinite(value)
    ? value
    : 0;

}

function normalizeSearch(value) {

  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

}

/* SVG ICON SYSTEM */

const SVG_NS =
  "http://www.w3.org/2000/svg";

function createIcon(name = "document") {

  const svg = document.createElementNS(
    SVG_NS, "svg"
  );

  const attributes = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.7",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
    focusable: "false"
  };

  Object.entries(attributes)
    .forEach(([key, value]) => {
      svg.setAttribute(key, value);
    });

  const paths = {

    document: [
      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z",
      "M14 2v6h6",
      "M8 13h8",
      "M8 17h8"
    ],

    plus: [
      "M12 5v14",
      "M5 12h14"
    ],

    filePlus: [
      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z",
      "M14 2v6h6",
      "M12 11v6",
      "M9 14h6"
    ],

    trash: [
      "M3 6h18",
      "M8 6V4h8v2",
      "M19 6l-1 14H6L5 6",
      "M10 10v6",
      "M14 10v6"
    ],

    rename: [
      "M16 3l5 5",
      "M4 20l4-1L21 6a2.8 2.8 0 0 0-4-4L4 15Z"
    ],

    duplicate: [
      "M9 9h11v11H9Z",
      "M15 9V4H4v11h5"
    ],

    download: [
      "M12 3v12",
      "M7 10l5 5 5-5",
      "M4 17v4h16v-4"
    ]

  };

  if (name === "more") {

    [5, 12, 19].forEach(x => {

      const circle = document.createElementNS(
        SVG_NS, "circle"
      );

      circle.setAttribute("cx", x);
      circle.setAttribute("cy", "12");
      circle.setAttribute("r", "1.7");
      circle.setAttribute("fill", "currentColor");
      circle.setAttribute("stroke", "none");

      svg.appendChild(circle);

    });

    return svg;

  }

  (paths[name] || paths.document)
    .forEach(value => {

      const path = document.createElementNS(
        SVG_NS, "path"
      );

      path.setAttribute("d", value);
      svg.appendChild(path);

    });

  return svg;

}

/* BUTTON FACTORY */

function createButton(
  className,
  label,
  iconName,
  handler,
  iconOnly = false
) {

  const button = document.createElement("button");

  button.type = "button";
  button.className = className;
  button.disabled = isBusy;
  button.title = label;

  button.setAttribute("aria-label", label);

  if (iconName) {
    button.appendChild(createIcon(iconName));
  }

  if (!iconOnly) {
    button.appendChild(
      document.createTextNode(label)
    );
  }

  button.addEventListener("click", handler);

  return button;

}

/* RESUME CONTENT */

function getResumeContent() {

  const content = {};

  Object.entries(fields)
    .forEach(([key, element]) => {

      content[key] =
        element?.value.trim() || "";

    });

  return content;

}

function fillResumeForm(content = {}) {

  Object.entries(fields)
    .forEach(([key, element]) => {

      if (!element) return;

      element.value =
        typeof content?.[key] === "string"
          ? content[key]
          : "";

    });

}

function resetForm(options = {}) {

  const {
    focus = true,
    announce = true
  } = options;

  editingResumeId = null;

  resumeForm.reset();
  fillResumeForm({});
  updateActionLabels();

  if (announce) {
    setStatus("ready");
  }

  if (focus) {
    quickCreate.open = true;
    resumeTitle.focus();
  }

}

/* BUILDER INTEGRATION */

function getBuilderEditURL(resumeId) {

  const url = new URL("index.html", SITE_URL);

  url.searchParams.set(
    "edit",
    String(resumeId)
  );

  url.hash = "builder";

  return url.toString();

}

function getNewResumeURL() {

  const url = new URL("index.html", SITE_URL);

  url.hash = "builder";

  return url.toString();

}

function openInResumeBuilder(id) {

  if (isBusy || !currentUser) return;

  const resume = findResume(id);

  if (!resume) {
    setStatus("notFound", "error");
    return;
  }

  window.location.assign(
    getBuilderEditURL(resume.id)
  );

}

/* SMART SEARCH AND SORT */

function getFilteredResumes() {

  const words = normalizeSearch(
    searchInput.value
  ).split(/\s+/).filter(Boolean);

  const results = savedResumes.filter(resume => {

    if (!words.length) return true;

    const content = resume.content || {};

    const searchable = normalizeSearch(
      [
        resume.title,
        content.fullName,
        content.professionalTitle,
        content.education,
        content.summary,
        content.experience,
        content.skills
      ].join(" ")
    );

    return words.every(
      word => searchable.includes(word)
    );

  });

  results.sort((a, b) => {

    switch (sortInput.value) {

      case "updated-asc":

        return timestamp(
          a.updated_at || a.created_at
        ) - timestamp(
          b.updated_at || b.created_at
        );

      case "created-desc":

        return timestamp(b.created_at) -
          timestamp(a.created_at);

      case "created-asc":

        return timestamp(a.created_at) -
          timestamp(b.created_at);

      case "title-asc":

        return getDocumentTitle(a)
          .localeCompare(
            getDocumentTitle(b),
            locale(),
            { sensitivity: "base" }
          );

      case "title-desc":

        return getDocumentTitle(b)
          .localeCompare(
            getDocumentTitle(a),
            locale(),
            { sensitivity: "base" }
          );

      default:

        return timestamp(
          b.updated_at || b.created_at
        ) - timestamp(
          a.updated_at || a.created_at
        );

    }

  });

  return results;

}

function clearDocumentSearch() {

  searchInput.value = "";
  renderResumes();
  searchInput.focus();

}

/* DOCUMENT MENUS */

function closeDocumentMenus(
  restoreFocus = false
) {

  resumeList
    .querySelectorAll(".wn-document-menu")
    .forEach(menu => {

      const panel = menu.querySelector(
        ".wn-document-menu-panel"
      );

      const button = menu.querySelector(
        ".wn-document-menu-button"
      );

      const wasOpen = panel && !panel.hidden;

      if (panel) panel.hidden = true;

      if (button) {

        button.setAttribute(
          "aria-expanded", "false"
        );

        if (restoreFocus && wasOpen) {
          button.focus();
        }

      }

    });

}

function createDocumentMenu(resume) {

  const wrapper = document.createElement("div");

  wrapper.className = "wn-document-menu";

  const panel = document.createElement("div");

  panel.className = "wn-document-menu-panel";
  panel.id = "wn-menu-" + String(resume.id);
  panel.hidden = true;

  const trigger = createButton(
    "outline wn-document-menu-button",
    t("more", {
      name: getDocumentTitle(resume)
    }),
    "more",
    event => {

      event.stopPropagation();

      if (isBusy) return;

      const wasOpen = !panel.hidden;

      closeDocumentMenus();

      if (!wasOpen) {

        panel.hidden = false;

        trigger.setAttribute(
          "aria-expanded", "true"
        );

        panel.querySelector("button")?.focus();

      }

    },
    true
  );

  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", panel.id);

  function menuAction(
    key, icon, handler, danger = false
  ) {

    return createButton(
      danger ? "wn-danger-action" : "",
      t(key),
      icon,
      () => {

        closeDocumentMenus(true);
        handler(resume.id);

      }
    );

  }

  const divider = document.createElement("div");

  divider.className = "wn-document-menu-divider";
  divider.setAttribute("aria-hidden", "true");

  panel.append(

    menuAction(
      "rename",
      "rename",
      openRenameDialog
    ),

    menuAction(
      "duplicate",
      "duplicate",
      openDuplicateDialog
    ),

    menuAction(
      "download",
      "download",
      downloadResumePDF
    ),

    divider,

    menuAction(
      "delete",
      "trash",
      openDeleteDialog,
      true
    )

  );

  wrapper.append(trigger, panel);

  return wrapper;

}

/* DOCUMENT CARDS */

function createResumeCard(resume) {

  const card = document.createElement("article");

  card.className = "resume-item";
  card.dataset.resumeId = String(resume.id);

  const info = document.createElement("div");
  info.className = "resume-info";

  const icon = document.createElement("span");
  icon.className = "resume-icon";
  icon.appendChild(createIcon("document"));

  const details = document.createElement("div");
  details.className = "resume-details";

  const title = document.createElement("strong");
  title.textContent = getDocumentTitle(resume);

  const date = document.createElement("small");

  date.textContent = t("date", {
    date: formatDate(
      resume.updated_at || resume.created_at
    )
  });

  details.append(title, date);
  info.append(icon, details);

  const actions = document.createElement("div");

  actions.className = "actions";

  const editButton = createButton(
    "outline resume-edit-button",
    t("edit") + " ↗",
    null,
    () => openInResumeBuilder(resume.id)
  );

  editButton.setAttribute(
    "aria-label",
    t("editName", {
      name: getDocumentTitle(resume)
    })
  );

  const pdfButton = createButton(
    "outline wn-document-pdf-button",
    t("download"),
    "download",
    () => downloadResumePDF(resume.id),
    true
  );

  actions.append(
    editButton,
    pdfButton,
    createDocumentMenu(resume)
  );

  card.append(info, actions);

  return card;

}

/* EMPTY STATE */

function createEmptyState() {

  const empty = document.createElement("div");

  empty.className = "resume-empty";

  const icon = document.createElement("div");

  icon.className = "resume-empty-icon";
  icon.appendChild(createIcon("filePlus"));

  const heading = document.createElement("h3");

  heading.textContent = t("emptyTitle");

  const description = document.createElement("p");

  description.textContent = t("emptyDescription");

  const link = document.createElement("a");

  link.className = "button";
  link.href = getNewResumeURL();

  link.append(
    createIcon("plus"),
    document.createTextNode(t("firstResume"))
  );

  empty.append(
    icon,
    heading,
    description,
    link
  );

  return empty;

}

/* DOCUMENT COUNTERS */

function updateResumeCounters() {

  const count = formatNumber(
    savedResumes.length
  );

  resumeCount.textContent = count;
  workspaceResumeCount.textContent = count;

}

/* RENDER WORKSPACE */

function renderResumes() {

  closeDocumentMenus();
  resumeList.replaceChildren();

  clearSearch.hidden = !searchInput.value.length;
  noSearchResults.hidden = true;

  if (!resumesLoaded) {

    searchResultCount.textContent = "";
    return;

  }

  updateResumeCounters();

  const filtered = getFilteredResumes();

  searchResultCount.textContent = t(
    "results",
    {
      count: formatNumber(filtered.length),
      total: formatNumber(savedResumes.length)
    }
  );

  if (!savedResumes.length) {

    resumeList.appendChild(
      createEmptyState()
    );

    return;

  }

  if (!filtered.length) {

    noSearchResults.hidden = false;
    return;

  }

  const fragment = document.createDocumentFragment();

  filtered.forEach(resume => {

    fragment.appendChild(
      createResumeCard(resume)
    );

  });

  resumeList.appendChild(fragment);

}

/* FETCH USER RESUMES */

const DOCUMENT_COLUMNS =
  "id,title,content,created_at,updated_at";

async function loadResumes() {

  if (!currentUser) return false;

  const userId = currentUser.id;

  setStatus("loading");

  try {

    const { data, error } = await supabase
      .from("resumes")
      .select(DOCUMENT_COLUMNS)
      .eq("user_id", userId)
      .order("updated_at", {
        ascending: false
      });

    if (error) throw error;

    if (!verifyOwner(userId)) return false;

    savedResumes = data || [];
    resumesLoaded = true;

    renderResumes();
    setStatus("");

    return true;

  } catch (error) {

    reportError("load", error);

    if (verifyOwner(userId)) {
      setStatus("loadError", "error");
    }

    return false;

  }

}

/* SAVE OR UPDATE RESUME */

async function saveResume(event) {

  event.preventDefault();

  if (isBusy || !currentUser) return;

  const title = resumeTitle.value.trim();

  if (!title) {

    setStatus("titleRequired", "error");
    resumeTitle.focus();
    return;

  }

  const userId = currentUser.id;
  const documentId = editingResumeId;
  const wasEditing = Boolean(documentId);

  const payload = {
    title,
    content: getResumeContent(),
    updated_at: new Date().toISOString()
  };

  setBusy(true, "save");
  setStatus("saving");

  try {

    let result;

    if (documentId) {

      result = await supabase
        .from("resumes")
        .update(payload)
        .eq("id", documentId)
        .eq("user_id", userId)
        .select(DOCUMENT_COLUMNS)
        .single();

    } else {

      result = await supabase
        .from("resumes")
        .insert({
          ...payload,
          user_id: userId
        })
        .select(DOCUMENT_COLUMNS)
        .single();

    }

    if (result.error) throw result.error;

    if (!verifyOwner(userId)) return;

    if (!result.data?.id) {
      throw new Error("Missing save confirmation");
    }

    savedResumes = savedResumes.filter(
      item =>
        String(item.id) !== String(result.data.id)
    );

    savedResumes.unshift(result.data);

    resumesLoaded = true;
    editingResumeId = result.data.id;

    renderResumes();

    const refreshed = await loadResumes();

    if (!verifyOwner(userId)) return;

    setStatus(
      refreshed
        ? wasEditing
          ? "updated"
          : "saved"
        : "savedRefresh",
      refreshed ? "success" : "info"
    );

    quickCreate.open = false;

  } catch (error) {

    reportError("save", error);

    if (verifyOwner(userId)) {
      setStatus("saveError", "error");
    }

  } finally {

    setBusy(false);

  }

}

/* DIALOG MANAGEMENT */

function showDialog(dialog) {

  if (dialog.open) return true;

  try {

    if (typeof dialog.showModal !== "function") {
      throw new Error("Dialog unsupported");
    }

    dialog.showModal();

    return true;

  } catch (error) {

    reportError("dialog", error);
    setStatus("browserError", "error");

    return false;

  }

}

function closeDialog(dialog) {

  if (dialog.open) dialog.close();

}

/* RENAME DOCUMENT */

function openRenameDialog(id) {

  if (isBusy || !currentUser) return;

  const resume = findResume(id);

  if (!resume) return;

  selectedRenameId = resume.id;

  renameInput.value = getDocumentTitle(resume);

  setDialogStatus(renameStatus);

  if (showDialog(renameDialog)) {

    renameInput.focus();
    renameInput.select();

  }

}

async function renameResume(event) {

  event.preventDefault();

  if (
    isBusy ||
    !currentUser ||
    selectedRenameId === null
  ) return;

  const id = selectedRenameId;
  const userId = currentUser.id;
  const title = renameInput.value.trim();

  if (!title) {

    setDialogStatus(
      renameStatus, "nameRequired"
    );

    return;

  }

  setBusy(true, "rename");
  setDialogStatus(renameStatus);

  try {

    const { data, error } = await supabase
      .from("resumes")
      .update({
        title,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select(DOCUMENT_COLUMNS)
      .single();

    if (error) throw error;

    if (!verifyOwner(userId)) return;

    if (!data?.id) {
      throw new Error("Missing rename confirmation");
    }

    savedResumes = savedResumes.map(
      item =>
        String(item.id) === String(id)
          ? data
          : item
    );

    if (String(editingResumeId) === String(id)) {
      resumeTitle.value = title;
    }

    closeDialog(renameDialog);

    selectedRenameId = null;

    renderResumes();

    setStatus("renamed", "success");

  } catch (error) {

    reportError("rename", error);

    if (verifyOwner(userId)) {
      setDialogStatus(renameStatus, "renameError");
    }

  } finally {

    setBusy(false);

  }

}

/* DUPLICATE DOCUMENT */

function openDuplicateDialog(id) {

  if (isBusy || !currentUser) return;

  const resume = findResume(id);

  if (!resume) return;

  selectedDuplicateId = resume.id;

  const suffix = " (" + t("copy") + ")";

  duplicateInput.value =
    getDocumentTitle(resume)
      .slice(0, 120 - suffix.length) +
    suffix;

  setDialogStatus(duplicateStatus);

  if (showDialog(duplicateDialog)) {

    duplicateInput.focus();
    duplicateInput.select();

  }

}

async function duplicateResume(event) {

  event.preventDefault();

  if (
    isBusy ||
    !currentUser ||
    selectedDuplicateId === null
  ) return;

  const userId = currentUser.id;

  const original = findResume(
    selectedDuplicateId
  );

  const title = duplicateInput.value.trim();

  if (!original) {

    setDialogStatus(
      duplicateStatus, "notFound"
    );

    return;

  }

  if (!title) {

    setDialogStatus(
      duplicateStatus, "nameRequired"
    );

    return;

  }

  setBusy(true, "duplicate");
  setDialogStatus(duplicateStatus);

  try {

    const content = JSON.parse(
      JSON.stringify(original.content || {})
    );

    const { data, error } = await supabase
      .from("resumes")
      .insert({
        user_id: userId,
        title,
        content,
        updated_at: new Date().toISOString()
      })
      .select(DOCUMENT_COLUMNS)
      .single();

    if (error) throw error;

    if (!verifyOwner(userId)) return;

    if (!data?.id) {
      throw new Error("Missing copy confirmation");
    }

    savedResumes.unshift(data);

    closeDialog(duplicateDialog);

    selectedDuplicateId = null;
    searchInput.value = "";

    renderResumes();

    setStatus("duplicated", "success");

  } catch (error) {

    reportError("duplicate", error);

    if (verifyOwner(userId)) {

      setDialogStatus(
        duplicateStatus,
        "duplicateError"
      );

    }

  } finally {

    setBusy(false);

  }

}

/* SECURE DELETE CONFIRMATION */

function openDeleteDialog(id) {

  if (isBusy || !currentUser) return;

  const resume = findResume(id);

  if (!resume) return;

  selectedDeleteId = resume.id;

  deleteResumeName.textContent =
    getDocumentTitle(resume);

  setDialogStatus(deleteStatus);

  if (showDialog(deleteDialog)) {
    deleteCancel.focus();
  }

}

async function deleteResume() {

  if (
    isBusy ||
    !currentUser ||
    selectedDeleteId === null
  ) return;

  const id = selectedDeleteId;
  const userId = currentUser.id;

  setBusy(true, "delete");
  setDialogStatus(deleteStatus);

  try {

    const { data, error } = await supabase
      .from("resumes")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
      .select("id");

    if (error) throw error;

    if (!verifyOwner(userId)) return;

    if (!data?.some(
      item => String(item.id) === String(id)
    )) {
      throw new Error("Missing delete confirmation");
    }

    if (
      editingResumeId !== null &&
      String(editingResumeId) === String(id)
    ) {

      resetForm({
        focus: false,
        announce: false
      });

    }

    savedResumes = savedResumes.filter(
      item => String(item.id) !== String(id)
    );

    closeDialog(deleteDialog);

    selectedDeleteId = null;

    renderResumes();

    setStatus("deleted", "success");

  } catch (error) {

    reportError("delete", error);

    if (verifyOwner(userId)) {
      setDialogStatus(deleteStatus, "deleteError");
    }

  } finally {

    setBusy(false);

  }

}

/* PRINTABLE PDF EXPORT */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

}

function downloadResumePDF(id) {

  if (isBusy || !currentUser) return;

  const resume = findResume(id);

  if (!resume) {

    setStatus("notFound", "error");
    return;

  }

  const content = resume.content || {};
  const title = getDocumentTitle(resume);

  /*
   * Preserve original resume content and
   * English document section headings.
   * Only the print interface is localized.
   */

  const sections = [

    ["Professional Summary", content.summary],
    ["Professional Experience", content.experience],
    ["Education", content.education],
    ["Skills", content.skills]

  ];

  const sectionHTML = sections
    .filter(([, value]) =>
      typeof value === "string" &&
      value.trim()
    )
    .map(([heading, value]) => `
      <section>
        <h2>${escapeHTML(heading)}</h2>
        <div class="content">${escapeHTML(
          value.trim()
        )}</div>
      </section>
    `)
    .join("");

  const printWindow = window.open("", "_blank");

  if (!printWindow) {

    setStatus("popupError", "error");
    return;

  }

  try {

    printWindow.opener = null;

    printWindow.document.open();

    printWindow.document.write(`
<!doctype html>
<html lang="${getLanguage()}">
<head>
<meta charset="utf-8">
<meta name="viewport"
      content="width=device-width, initial-scale=1">

<title>${escapeHTML(title)}</title>

<style>

* {
  box-sizing:border-box;
}

body {
  margin:0;
  background:#f4f1fa;
  color:#202124;
  font-family:Arial,Helvetica,sans-serif;
  font-size:11pt;
  line-height:1.55;
}

.toolbar {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:center;
  gap:10px;
  padding:14px;
  background:#fff;
  border-bottom:1px solid #e9e2f4;
}

.toolbar button {
  min-height:44px;
  padding:10px 20px;
  border:0;
  border-radius:9px;
  background:#5424ff;
  color:#fff;
  font-size:14px;
  font-weight:700;
  cursor:pointer;
}

.toolbar p {
  flex-basis:100%;
  margin:0;
  text-align:center;
  font-size:12px;
  color:#655d76;
}

.resume {
  width:100%;
  max-width:210mm;
  min-height:260mm;
  margin:18px auto;
  padding:18mm;
  background:#fff;
  overflow-wrap:anywhere;
}

h1 {
  margin:0 0 5px;
  font-size:25pt;
  line-height:1.2;
  color:#161616;
}

.professional-title {
  margin:0 0 8px;
  font-size:13pt;
  font-weight:600;
}

.contact {
  white-space:pre-wrap;
  font-size:10pt;
  margin:0 0 18px;
}

section {
  margin:18px 0 0;
}

h2 {
  font-size:12pt;
  margin:0 0 7px;
  padding-bottom:4px;
  border-bottom:1px solid #b8b8b8;
  break-after:avoid;
  page-break-after:avoid;
}

.content {
  white-space:pre-wrap;
  overflow-wrap:anywhere;
  orphans:3;
  widows:3;
}

@media(max-width:700px) {

  .resume {
    margin:0;
    padding:22px;
    min-height:0;
  }

  h1 {
    font-size:22pt;
  }

}

@page {
  size:A4;
  margin:15mm;
}

@media print {

  body {
    background:#fff;
  }

  .toolbar {
    display:none!important;
  }

  .resume {
    width:auto;
    max-width:none;
    min-height:0;
    padding:0;
    margin:0;
  }

}

</style>
</head>

<body>

<div class="toolbar">

  <button id="printResume" type="button">
    ${escapeHTML(t("print"))}
  </button>

  <p>${escapeHTML(t("printHelp"))}</p>

</div>

<main class="resume">

  <header>

    <h1>${escapeHTML(
      content.fullName || title
    )}</h1>

    ${
      content.professionalTitle
        ? `
          <div class="professional-title">
            ${escapeHTML(content.professionalTitle)}
          </div>
        `
        : ""
    }

    ${
      content.contact
        ? `
          <div class="contact">${escapeHTML(
            content.contact
          )}</div>
        `
        : ""
    }

  </header>

  ${sectionHTML}

</main>

</body>
</html>
    `);

    printWindow.document.close();

    printWindow.document
      .getElementById("printResume")
      .addEventListener(
        "click",
        () => printWindow.print()
      );

    setStatus("pdfReady", "success");

  } catch (error) {

    reportError("pdf", error);

    printWindow.close();

    setStatus("pdfError", "error");

  }

}

/* INTERNATIONAL INTERFACE REFRESH */

function refreshLanguage() {

  if (currentUser) {

    welcome.textContent = t(
      "welcome",
      {
        name: currentUser.email || t("user")
      }
    );

  }

  if (!loading.hidden) {
    loading.textContent = t(loadingKey);
  }

  statusMessages.forEach((key, element) => {

    element.textContent =
      key ? t(key) : "";

  });

  updateActionLabels();

  renderResumes();

  if (selectedDeleteId !== null) {

    const resume = findResume(selectedDeleteId);

    if (resume) {

      deleteResumeName.textContent =
        getDocumentTitle(resume);

    }

  }

}

/* LANGUAGE EVENTS */

document.addEventListener(
  "worknely:languagechange",
  refreshLanguage
);

document.addEventListener(
  "worknely:localizationready",
  refreshLanguage
);

window.addEventListener(
  "pageshow",
  refreshLanguage
);

window.addEventListener(
  "storage",
  event => {

    if (
      event.key === "worknely.language" ||
      event.key === null
    ) {

      refreshLanguage();

    }

  }
);

/* LOGOUT */

async function logOut() {

  if (isBusy) return;

  setBusy(true, "logout");

  try {

    const { error } =
      await supabase.auth.signOut();

    if (error) throw error;

    clearSession();

    redirectToLogin();

  } catch (error) {

    reportError("logout", error);

    setBusy(false);

    setStatus("logoutError", "error");

    window.alert(t("logoutError"));

  }

}

/* INITIALIZATION */

async function initializeDashboard() {

  showLoading("checking");

  try {

    const { data, error } =
      await supabase.auth.getUser();

    if (error || !data?.user) {

      redirectToLogin();
      return;

    }

    currentUser = data.user;

    refreshLanguage();

    showApp();

    setBusy(true, "load");

    try {

      await loadResumes();

    } finally {

      setBusy(false);

    }

  } catch (error) {

    reportError("session", error);

    showLoading("sessionError");

  }

}

/* FORM EVENTS */

resumeForm.addEventListener(
  "submit", saveResume
);

newButton.addEventListener(
  "click", () => resetForm()
);

logoutButton.addEventListener(
  "click", logOut
);

/* SEARCH AND SORT EVENTS */

searchInput.addEventListener(
  "input", renderResumes
);

sortInput.addEventListener(
  "change", renderResumes
);

clearSearch.addEventListener(
  "click", clearDocumentSearch
);

resetSearch.addEventListener(
  "click", clearDocumentSearch
);

/* RENAME EVENTS */

renameForm.addEventListener(
  "submit", renameResume
);

renameCancel.addEventListener(
  "click",
  () => {

    if (!isBusy) closeDialog(renameDialog);

  }
);

renameDialog.addEventListener(
  "close",
  () => {

    selectedRenameId = null;
    setDialogStatus(renameStatus);

  }
);

/* DUPLICATE EVENTS */

duplicateForm.addEventListener(
  "submit", duplicateResume
);

duplicateCancel.addEventListener(
  "click",
  () => {

    if (!isBusy) closeDialog(duplicateDialog);

  }
);

duplicateDialog.addEventListener(
  "close",
  () => {

    selectedDuplicateId = null;
    setDialogStatus(duplicateStatus);

  }
);

/* DELETE EVENTS */

deleteConfirm.addEventListener(
  "click", deleteResume
);

deleteCancel.addEventListener(
  "click",
  () => {

    if (!isBusy) closeDialog(deleteDialog);

  }
);

deleteDialog.addEventListener(
  "close",
  () => {

    selectedDeleteId = null;
    setDialogStatus(deleteStatus);

  }
);

/* DIALOG PROTECTION */

[
  renameDialog,
  duplicateDialog,
  deleteDialog
].forEach(dialog => {

  dialog.addEventListener(
    "cancel",
    event => {

      if (isBusy) event.preventDefault();

    }
  );

});

/* DOCUMENT MENU EVENTS */

document.addEventListener(
  "click",
  event => {

    if (
      event.target instanceof Element &&
      !event.target.closest(".wn-document-menu")
    ) {

      closeDocumentMenus();

    }

  }
);

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeDocumentMenus(true);

    }

  }
);

window.addEventListener(
  "hashchange",
  () => closeDocumentMenus()
);

/* SUPABASE AUTH STATE */

supabase.auth.onAuthStateChange(
  (event, session) => {

    if (
      event === "SIGNED_OUT" &&
      currentUser
    ) {

      clearSession();

      redirectToLogin();

      return;

    }

    if (
      currentUser &&
      session?.user &&
      session.user.id !== currentUser.id
    ) {

      clearSession();

      window.location.reload();

    }

  }
);

/* START WORKNELY V7.15 */

initializeDashboard();

console.info(
  "Worknely V7.15 International Dashboard initialized."
);

/*
 * END WORKNELY V7.15
 * INTERNATIONAL DASHBOARD ENGINE
 */
