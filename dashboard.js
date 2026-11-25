
/*
 * WORKNELY V7.16.13
 * Professional International Dashboard
 * Unified Direct PDF Export
 * PDF Engine V7.16.12 Compatibility
 * Persistent Document Design
 * People Technology
 */

import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

const VERSION = "7.16.13";
const PDF_VERSION = "7.16.12";
const TEMPLATE_VERSION = "7.16.1";

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

/* INTERNATIONAL LOCALIZATION */

const LANGUAGES = [
  "en", "ro", "it", "de", "fr", "es"
];

const locales = {
  en: "en-GB",
  ro: "ro-RO",
  it: "it-IT",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES"
};

const dictionary = {

  checking: [
    "Checking your Worknely session...",
    "Se verifică sesiunea Worknely...",
    "Verifica della sessione Worknely...",
    "Worknely-Sitzung wird überprüft...",
    "Vérification de votre session...",
    "Verificando tu sesión..."
  ],

  sessionError: [
    "Unable to verify your session. Please try again.",
    "Sesiunea nu a putut fi verificată.",
    "Impossibile verificare la sessione.",
    "Sitzung konnte nicht überprüft werden.",
    "Impossible de vérifier la session.",
    "No se pudo verificar la sesión."
  ],

  welcome: [
    "Welcome back, {name}!",
    "Bine ai revenit, {name}!",
    "Bentornato/a, {name}!",
    "Willkommen zurück, {name}!",
    "Bon retour, {name} !",
    "¡Te damos la bienvenida, {name}!"
  ],

  user: [
    "Worknely user",
    "Utilizator Worknely",
    "Utente Worknely",
    "Worknely-Nutzer",
    "Utilisateur Worknely",
    "Usuario de Worknely"
  ],

  loading: [
    "Loading your resumes...",
    "Se încarcă CV-urile tale...",
    "Caricamento dei curriculum...",
    "Lebensläufe werden geladen...",
    "Chargement de vos CV...",
    "Cargando tus currículums..."
  ],

  loadError: [
    "Unable to load resumes. Please refresh.",
    "CV-urile nu au putut fi încărcate.",
    "Impossibile caricare i curriculum.",
    "Lebensläufe konnten nicht geladen werden.",
    "Impossible de charger les CV.",
    "No se pudieron cargar los currículums."
  ],

  save: [
    "Save Resume",
    "Salvează CV-ul",
    "Salva curriculum",
    "Lebenslauf speichern",
    "Enregistrer le CV",
    "Guardar currículum"
  ],

  update: [
    "Update Resume",
    "Actualizează CV-ul",
    "Aggiorna curriculum",
    "Lebenslauf aktualisieren",
    "Mettre à jour le CV",
    "Actualizar currículum"
  ],

  saving: [
    "Saving...",
    "Se salvează...",
    "Salvataggio...",
    "Wird gespeichert...",
    "Enregistrement...",
    "Guardando..."
  ],

  creating: [
    "Creating...",
    "Se creează...",
    "Creazione...",
    "Wird erstellt...",
    "Création...",
    "Creando..."
  ],

  deleting: [
    "Deleting...",
    "Se șterge...",
    "Eliminazione...",
    "Wird gelöscht...",
    "Suppression...",
    "Eliminando..."
  ],

  ready: [
    "Ready to create a new resume.",
    "Poți crea un CV nou.",
    "Puoi creare un nuovo curriculum.",
    "Ein neuer Lebenslauf kann erstellt werden.",
    "Vous pouvez créer un nouveau CV.",
    "Puedes crear un nuevo currículum."
  ],

  titleRequired: [
    "Please enter a resume title.",
    "Introdu un titlu pentru CV.",
    "Inserisci un titolo per il curriculum.",
    "Bitte einen Titel eingeben.",
    "Saisissez un titre pour le CV.",
    "Introduce un título para el currículum."
  ],

  nameRequired: [
    "Please enter a document name.",
    "Introdu un nume pentru document.",
    "Inserisci un nome per il documento.",
    "Bitte einen Dokumentnamen eingeben.",
    "Saisissez un nom pour le document.",
    "Introduce un nombre para el documento."
  ],

  saved: [
    "Resume saved successfully.",
    "CV-ul a fost salvat cu succes.",
    "Curriculum salvato correttamente.",
    "Lebenslauf erfolgreich gespeichert.",
    "CV enregistré avec succès.",
    "Currículum guardado correctamente."
  ],

  updated: [
    "Resume updated successfully.",
    "CV-ul a fost actualizat cu succes.",
    "Curriculum aggiornato correttamente.",
    "Lebenslauf erfolgreich aktualisiert.",
    "CV mis à jour avec succès.",
    "Currículum actualizado correctamente."
  ],

  saveError: [
    "Unable to save resume.",
    "CV-ul nu a putut fi salvat.",
    "Impossibile salvare il curriculum.",
    "Speichern fehlgeschlagen.",
    "Impossible d'enregistrer le CV.",
    "No se pudo guardar el currículum."
  ],

  renamed: [
    "Resume renamed successfully.",
    "CV-ul a fost redenumit cu succes.",
    "Curriculum rinominato correttamente.",
    "Lebenslauf erfolgreich umbenannt.",
    "CV renommé avec succès.",
    "Currículum renombrado correctamente."
  ],

  renameError: [
    "Unable to rename resume.",
    "CV-ul nu a putut fi redenumit.",
    "Impossibile rinominare il curriculum.",
    "Umbenennen fehlgeschlagen.",
    "Impossible de renommer le CV.",
    "No se pudo renombrar el currículum."
  ],

  duplicated: [
    "Resume and design duplicated successfully.",
    "CV-ul și designul au fost duplicate cu succes.",
    "Curriculum e design duplicati correttamente.",
    "Lebenslauf und Design erfolgreich dupliziert.",
    "CV et design dupliqués avec succès.",
    "Currículum y diseño duplicados correctamente."
  ],

  duplicateError: [
    "Unable to duplicate resume.",
    "CV-ul nu a putut fi duplicat.",
    "Impossibile duplicare il curriculum.",
    "Duplizieren fehlgeschlagen.",
    "Impossible de dupliquer le CV.",
    "No se pudo duplicar el currículum."
  ],

  deleted: [
    "Resume deleted successfully.",
    "CV-ul a fost șters cu succes.",
    "Curriculum eliminato correttamente.",
    "Lebenslauf erfolgreich gelöscht.",
    "CV supprimé avec succès.",
    "Currículum eliminado correctamente."
  ],

  deleteError: [
    "Unable to delete resume.",
    "CV-ul nu a putut fi șters.",
    "Impossibile eliminare il curriculum.",
    "Löschen fehlgeschlagen.",
    "Impossible de supprimer le CV.",
    "No se pudo eliminar el currículum."
  ],

  notFound: [
    "Resume not found. Please refresh.",
    "CV-ul nu a fost găsit.",
    "Curriculum non trovato.",
    "Lebenslauf nicht gefunden.",
    "CV introuvable.",
    "Currículum no encontrado."
  ],

  untitled: [
    "Untitled Resume",
    "CV fără titlu",
    "Curriculum senza titolo",
    "Unbenannter Lebenslauf",
    "CV sans titre",
    "Currículum sin título"
  ],

  unknownDate: [
    "Unknown date",
    "Dată necunoscută",
    "Data sconosciuta",
    "Unbekanntes Datum",
    "Date inconnue",
    "Fecha desconocida"
  ],

  date: [
    "Updated {date}",
    "Actualizat la {date}",
    "Aggiornato il {date}",
    "Aktualisiert am {date}",
    "Mis à jour le {date}",
    "Actualizado el {date}"
  ],

  results: [
    "{count} of {total} resumes",
    "{count} din {total} CV-uri",
    "{count} di {total} curriculum",
    "{count} von {total} Lebensläufen",
    "{count} CV sur {total}",
    "{count} de {total} currículums"
  ],

  edit: [
    "Edit in Resume Builder",
    "Editează în editorul de CV",
    "Modifica nell'editor CV",
    "Im Lebenslauf-Editor bearbeiten",
    "Modifier dans l'éditeur de CV",
    "Editar en el creador de CV"
  ],

  editName: [
    "Edit {name}",
    "Editează {name}",
    "Modifica {name}",
    "{name} bearbeiten",
    "Modifier {name}",
    "Editar {name}"
  ],

  more: [
    "More actions for {name}",
    "Mai multe acțiuni pentru {name}",
    "Altre azioni per {name}",
    "Weitere Aktionen für {name}",
    "Plus d'actions pour {name}",
    "Más acciones para {name}"
  ],

  rename: [
    "Rename", "Redenumește", "Rinomina",
    "Umbenennen", "Renommer", "Renombrar"
  ],

  duplicate: [
    "Duplicate", "Duplică", "Duplica",
    "Duplizieren", "Dupliquer", "Duplicar"
  ],

  download: [
    "Download PDF",
    "Descarcă PDF",
    "Scarica PDF",
    "PDF herunterladen",
    "Télécharger le PDF",
    "Descargar PDF"
  ],

  delete: [
    "Delete Resume",
    "Șterge CV-ul",
    "Elimina curriculum",
    "Lebenslauf löschen",
    "Supprimer le CV",
    "Eliminar currículum"
  ],

  saveName: [
    "Save Name",
    "Salvează numele",
    "Salva nome",
    "Namen speichern",
    "Enregistrer le nom",
    "Guardar nombre"
  ],

  createCopy: [
    "Create Copy",
    "Creează o copie",
    "Crea copia",
    "Kopie erstellen",
    "Créer une copie",
    "Crear copia"
  ],

  copy: [
    "Copy", "Copie", "Copia",
    "Kopie", "Copie", "Copia"
  ],

  emptyTitle: [
    "Your career starts here",
    "Cariera ta începe aici",
    "La tua carriera inizia qui",
    "Deine Karriere beginnt hier",
    "Votre carrière commence ici",
    "Tu carrera comienza aquí"
  ],

  emptyDescription: [
    "Create your first professional resume.",
    "Creează primul tău CV profesional.",
    "Crea il tuo primo curriculum professionale.",
    "Erstelle deinen ersten professionellen Lebenslauf.",
    "Créez votre premier CV professionnel.",
    "Crea tu primer currículum profesional."
  ],

  firstResume: [
    "Create Your First Resume",
    "Creează primul CV",
    "Crea il tuo primo CV",
    "Ersten Lebenslauf erstellen",
    "Créer votre premier CV",
    "Crear tu primer currículum"
  ],

  browserError: [
    "Please use an updated browser.",
    "Folosește un browser actualizat.",
    "Utilizza un browser aggiornato.",
    "Bitte einen aktuellen Browser verwenden.",
    "Utilisez un navigateur à jour.",
    "Utiliza un navegador actualizado."
  ],

  pdfPreparing: [
    "Generating your professional PDF...",
    "Se generează PDF-ul profesional...",
    "Generazione del PDF professionale...",
    "Professionelles PDF wird erstellt...",
    "Génération du PDF professionnel...",
    "Generando tu PDF profesional..."
  ],

  pdfReady: [
    "Your PDF is ready.",
    "PDF-ul tău este pregătit.",
    "Il tuo PDF è pronto.",
    "Dein PDF ist bereit.",
    "Votre PDF est prêt.",
    "Tu PDF está listo."
  ],

  pdfError: [
    "Unable to generate PDF. Please try again.",
    "PDF-ul nu a putut fi generat. Încearcă din nou.",
    "Impossibile generare il PDF. Riprova.",
    "PDF konnte nicht erstellt werden.",
    "Impossible de générer le PDF.",
    "No se pudo generar el PDF."
  ],

  pdfEmpty: [
    "This resume has no content.",
    "Acest CV nu conține informații.",
    "Questo curriculum è vuoto.",
    "Dieser Lebenslauf ist leer.",
    "Ce CV est vide.",
    "Este currículum está vacío."
  ],

  pdfLibraryError: [
    "Unable to load the PDF library. Check your connection and retry.",
    "Biblioteca PDF nu a putut fi încărcată. Verifică internetul și reîncearcă.",
    "Impossibile caricare la libreria PDF. Controlla la connessione e riprova.",
    "PDF-Bibliothek konnte nicht geladen werden. Verbindung prüfen.",
    "Impossible de charger la bibliothèque PDF. Vérifiez votre connexion.",
    "No se pudo cargar la biblioteca PDF. Comprueba tu conexión."
  ],

  pdfFontError: [
    "Unable to load the professional PDF fonts. Please retry.",
    "Fonturile PDF nu au putut fi încărcate. Încearcă din nou.",
    "Impossibile caricare i font PDF. Riprova.",
    "PDF-Schriftarten konnten nicht geladen werden.",
    "Impossible de charger les polices PDF.",
    "No se pudieron cargar las fuentes PDF."
  ],

  pdfChanged: [
    "The document context changed. Please export again.",
    "Contextul documentului s-a schimbat. Repetă exportul.",
    "Il contesto del documento è cambiato. Esporta di nuovo.",
    "Dokumentkontext geändert. Bitte erneut exportieren.",
    "Le contexte du document a changé. Exportez à nouveau.",
    "El contexto del documento cambió. Exporta de nuevo."
  ],

  share: [
    "Save / Share PDF",
    "Salvează / Partajează PDF",
    "Salva / Condividi PDF",
    "PDF speichern / teilen",
    "Enregistrer / Partager PDF",
    "Guardar / Compartir PDF"
  ],

  openPDF: [
    "Open PDF",
    "Deschide PDF",
    "Apri PDF",
    "PDF öffnen",
    "Ouvrir le PDF",
    "Abrir PDF"
  ],

  pdfHelp: [
    "Download the PDF or use Share to save it to your device.",
    "Descarcă PDF-ul sau folosește Partajare pentru a-l salva pe dispozitiv.",
    "Scarica il PDF oppure usa Condividi per salvarlo sul dispositivo.",
    "Lade das PDF herunter oder nutze die Teilen-Funktion.",
    "Téléchargez le PDF ou utilisez Partager pour l'enregistrer.",
    "Descarga el PDF o utiliza Compartir para guardarlo."
  ],

  pdfPrivate: [
    "Generated locally. No resume data is sent to a PDF service.",
    "Generat local. Datele CV-ului nu sunt trimise unui serviciu PDF.",
    "Generato localmente. Nessun dato viene inviato a un servizio PDF.",
    "Lokal erstellt. Keine Daten werden an einen PDF-Dienst gesendet.",
    "Généré localement, sans transfert vers un service PDF.",
    "Generado localmente, sin enviar datos a un servicio PDF."
  ],

  signingOut: [
    "Signing out...",
    "Se efectuează deconectarea...",
    "Disconnessione...",
    "Abmeldung...",
    "Déconnexion...",
    "Cerrando sesión..."
  ],

  logoutError: [
    "Unable to sign out. Please try again.",
    "Deconectarea nu a reușit.",
    "Impossibile disconnettersi.",
    "Abmeldung fehlgeschlagen.",
    "Impossible de se déconnecter.",
    "No se pudo cerrar la sesión."
  ],

  design: [
    "Design", "Design", "Design",
    "Design", "Design", "Diseño"
  ],

  designUnavailable: [
    "The PDF engine is unavailable. Please refresh.",
    "Motorul PDF nu este disponibil. Reîncarcă pagina.",
    "Motore PDF non disponibile. Ricarica la pagina.",
    "PDF-Engine nicht verfügbar.",
    "Moteur PDF indisponible.",
    "Motor PDF no disponible."
  ],

  close: [
    "Close", "Închide", "Chiudi",
    "Schließen", "Fermer", "Cerrar"
  ]

};

function getLanguage() {
  let language =
    window.WorknelyLocalization?.getLanguage?.();

  if (!language) {
    try {
      language = localStorage.getItem(
        "worknely.language"
      );
    } catch {}
  }

  language = String(
    language || document.documentElement.lang || "en"
  ).toLowerCase().split("-")[0];

  return LANGUAGES.includes(language)
    ? language : "en";
}

function t(key, variables = {}) {
  const index = LANGUAGES.indexOf(getLanguage());

  const value =
    dictionary[key]?.[index] ||
    dictionary[key]?.[0] ||
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
  return new Intl.NumberFormat(locale()).format(value);
}

/* PROFESSIONAL TEMPLATE REGISTRY */

const TEMPLATE_REGISTRY = Object.freeze({
  ats: {
    name: "ATS Professional",
    accent: "#242424",
    membership: "Free"
  },
  classic: {
    name: "Classic",
    accent: "#343434",
    membership: "Free"
  },
  executive: {
    name: "Executive",
    accent: "#172b45",
    membership: "Pro"
  },
  modern: {
    name: "Modern",
    accent: "#5424ff",
    membership: "Pro"
  },
  creative: {
    name: "Creative",
    accent: "#ec22ad",
    membership: "Premium"
  }
});

const DEFAULT_DESIGN = Object.freeze({
  version: 1,
  templateId: "ats",
  accentColor: "#242424",
  customColor: null,
  documentLanguage: null,
  paperFormat: "a4"
});

function normalizeColor(value) {
  return typeof value === "string" &&
    /^#[0-9a-f]{6}$/i.test(value)
      ? value.toLowerCase()
      : null;
}

function normalizeDesign(value) {
  const source =
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
      ? value : {};

  const templateId =
    Object.prototype.hasOwnProperty.call(
      TEMPLATE_REGISTRY,
      source.templateId
    )
      ? source.templateId : "ats";

  const template = TEMPLATE_REGISTRY[templateId];

  let customColor = normalizeColor(source.customColor);

  if (
    !Object.prototype.hasOwnProperty.call(
      source, "customColor"
    )
  ) {
    const legacyColor = normalizeColor(source.accentColor);

    if (legacyColor && legacyColor !== template.accent) {
      customColor = legacyColor;
    }
  }

  return {
    version: 1,
    templateId,
    accentColor: customColor || template.accent,
    customColor,
    documentLanguage:
      LANGUAGES.includes(source.documentLanguage)
        ? source.documentLanguage : null,
    paperFormat:
      source.paperFormat === "letter"
        ? "letter" : "a4"
  };
}

function getDesign(resume) {
  return normalizeDesign(resume?.design);
}

/* VERSION-AWARE PDF ENGINE LOADER */

const modulePromises = new Map();

function isPDFEngineReady() {
  const engine = window.WorknelyPDFExport;

  return Boolean(
    engine &&
    engine.version === PDF_VERSION &&
    typeof engine.exportResume === "function"
  );
}

function isDesignEngineReady() {
  return Boolean(
    window.WorknelyTemplates?.renderResume
  );
}

function loadModule(path, validator) {
  if (validator()) {
    return Promise.resolve(true);
  }

  if (modulePromises.has(path)) {
    return modulePromises.get(path).then(success => {
      if (success && validator()) return true;

      modulePromises.delete(path);
      return false;
    });
  }

  const promise = new Promise(resolve => {
    const script = document.createElement("script");

    let completed = false;

    const finish = success => {
      if (completed) return;

      completed = true;
      clearTimeout(timer);

      script.onload = null;
      script.onerror = null;

      if (!success) script.remove();

      resolve(success);
    };

    const timer = setTimeout(
      () => finish(false),
      20000
    );

    script.src = new URL(path, SITE_URL).href;
    script.async = true;

    script.onload = () =>
      finish(Boolean(validator()));

    script.onerror = () =>
      finish(false);

    document.head.appendChild(script);
  });

  modulePromises.set(path, promise);

  promise.then(success => {
    if (!success) modulePromises.delete(path);
  });

  return promise;
}

async function loadDesignEngine() {
  return loadModule(
    "worknely-templates.js?v=" + TEMPLATE_VERSION,
    isDesignEngineReady
  );
}

async function loadPDFEngine() {
  if (!await loadDesignEngine()) {
    return false;
  }

  return loadModule(
    "worknely-pdf-export.js?v=" + PDF_VERSION,
    isPDFEngineReady
  );
}

/* APPLICATION STATE */

let currentUser = null;
let editingResumeId = null;
let savedResumes = [];
let isBusy = false;
let resumesLoaded = false;
let sessionGeneration = 0;

let selectedRenameId = null;
let selectedDuplicateId = null;
let selectedDeleteId = null;

let activeOperation = "";
let loadingKey = "checking";

let preparedPDF = null;
let preparedPDFURL = null;
let pdfGeneration = 0;
let lastPDFError = null;

const statusMessages = new Map();

/* DASHBOARD STYLES */

function installDesignStyles() {
  if ($("wnDashboardDesignStyles")) return;

  const style = document.createElement("style");
  style.id = "wnDashboardDesignStyles";

  style.textContent = `
    #resumeList .wn-document-design {
      display:flex;
      align-items:center;
      flex-wrap:wrap;
      gap:5px;
      margin-top:6px;
      color:#655d76;
      font-size:10px;
      line-height:1.4;
    }

    #resumeList .wn-template-label {
      display:inline-flex;
      align-items:center;
      gap:5px;
      max-width:100%;
      padding:4px 7px;
      border:1px solid #e9e2f4;
      border-radius:7px;
      background:#faf8ff;
      color:#493669;
      font-weight:650;
      overflow-wrap:anywhere;
    }

    #resumeList .wn-design-color {
      display:inline-block;
      width:10px;
      height:10px;
      flex:0 0 10px;
      border:1px solid rgba(0,0,0,.15);
      border-radius:50%;
    }

    #resumeList .wn-paper-label {
      padding:3px 6px;
      border-radius:6px;
      background:#f4f2f7;
    }

    #resumeList .wn-document-language {
      font-weight:650;
      color:#655d76;
    }

    #wnDashboardPDFDialog {
      position:fixed;
      inset:0;
      margin:auto;
      width:420px;
      max-width:calc(100% - 28px);
      max-height:calc(100vh - 32px);
      max-height:calc(100dvh - 32px);
      box-sizing:border-box;
      padding:22px;
      border:1px solid #e9e2f4;
      border-radius:20px;
      background:#fff;
      color:#261449;
      overflow:auto;
      box-shadow:0 20px 80px rgba(38,20,73,.22);
      font-family:Inter,-apple-system,
        BlinkMacSystemFont,"Segoe UI",sans-serif;
    }

    #wnDashboardPDFDialog::backdrop {
      background:rgba(25,12,55,.48);
      backdrop-filter:blur(4px);
    }

    #wnDashboardPDFDialog h2 {
      margin:14px 0 8px;
      font-size:23px;
      font-weight:800;
      color:#261449;
    }

    #wnDashboardPDFDialog p {
      margin:10px 0;
      font-size:13px;
      line-height:1.6;
      color:#746c85;
      overflow-wrap:anywhere;
    }

    .wn-pdf-success-icon {
      display:grid;
      place-items:center;
      width:54px;
      height:54px;
      border-radius:16px;
      background:#f0eaff;
      color:#5424ff;
    }

    .wn-pdf-success-icon svg {
      width:27px;
      height:27px;
    }

    .wn-dashboard-pdf-file {
      padding:13px;
      margin:14px 0;
      background:#faf8ff;
      border:1px solid #e9e2f4;
      border-radius:12px;
      overflow-wrap:anywhere;
      font-size:13px;
      font-weight:700;
    }

    .wn-dashboard-pdf-actions {
      display:grid;
      gap:9px;
      margin-top:16px;
    }

    .wn-dashboard-pdf-actions button,
    .wn-dashboard-pdf-actions a {
      display:flex;
      align-items:center;
      justify-content:center;
      gap:8px;
      min-height:48px;
      width:100%;
      padding:12px;
      box-sizing:border-box;
      border:0;
      border-radius:10px;
      background:#5424ff;
      color:#fff;
      font:inherit;
      font-size:14px;
      font-weight:750;
      text-decoration:none;
      text-align:center;
      cursor:pointer;
      touch-action:manipulation;
    }

    .wn-dashboard-pdf-actions svg {
      width:19px;
      height:19px;
      flex:0 0 19px;
    }

    .wn-dashboard-pdf-actions .wn-pdf-primary {
      background:linear-gradient(
        110deg,#5424ff,#a326e8,#ec22ad
      );
    }

    .wn-dashboard-pdf-actions .wn-pdf-secondary {
      background:#f1ebff;
      color:#5424ff;
    }

    #wnDashboardPDFDialog [hidden] {
      display:none!important;
    }

    @media(max-width:480px) {
      #wnDashboardPDFDialog {
        padding:18px;
      }

      #wnDashboardPDFDialog h2 {
        font-size:21px;
      }
    }
  `;

  document.head.appendChild(style);
}

/* STATUS MANAGEMENT */

function setStatus(key = "", type = "info") {
  statusMessages.set(resumeStatus, key);

  resumeStatus.textContent = key ? t(key) : "";

  if (key) {
    resumeStatus.dataset.status = type;
  } else {
    delete resumeStatus.dataset.status;
  }
}

function setDialogStatus(element, key = "") {
  if (!element) return;

  statusMessages.set(element, key);
  element.textContent = key ? t(key) : "";
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
      : editingResumeId ? "update" : "save"
  );

  renameConfirm.textContent = t(
    activeOperation === "rename"
      ? "saving" : "saveName"
  );

  duplicateConfirm.textContent = t(
    activeOperation === "duplicate"
      ? "creating" : "createCopy"
  );

  deleteConfirm.textContent = t(
    activeOperation === "delete"
      ? "deleting" : "delete"
  );
}

function setBusy(busy, operation = "") {
  isBusy = Boolean(busy);
  activeOperation = isBusy ? operation : "";

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
    if (element) element.disabled = isBusy;
  });

  resumeList.querySelectorAll("button")
    .forEach(button => {
      button.disabled = isBusy;
    });

  resumeForm.setAttribute(
    "aria-busy",
    String(isBusy)
  );

  updateActionLabels();
}

/* SESSION PROTECTION */

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
  sessionGeneration++;

  clearPreparedPDF();

  currentUser = null;
  editingResumeId = null;
  savedResumes = [];
  resumesLoaded = false;

  selectedRenameId = null;
  selectedDuplicateId = null;
  selectedDeleteId = null;

  lastPDFError = null;

  resumeForm.reset();
  fillResumeForm({});

  renameInput.value = "";
  duplicateInput.value = "";
  deleteResumeName.textContent = "";

  [
    renameDialog,
    duplicateDialog,
    deleteDialog
  ].forEach(dialog => {
    if (dialog.open) dialog.close();
  });

  resumeList.replaceChildren();

  resumeCount.textContent = "—";
  workspaceResumeCount.textContent = "—";

  searchInput.value = "";
  searchResultCount.textContent = "";
  welcome.textContent = "";
  resumeStatus.textContent = "";

  renameStatus.textContent = "";
  duplicateStatus.textContent = "";
  deleteStatus.textContent = "";

  statusMessages.clear();

  showLoading("signingOut");
}

function verifyOwner(userId, generation) {
  return currentUser?.id === userId &&
    sessionGeneration === generation;
}

async function verifyAuthenticatedOwner(
  userId,
  generation
) {
  if (!verifyOwner(userId, generation)) {
    return false;
  }

  const { data, error } =
    await supabase.auth.getUser();

  return !error &&
    data?.user?.id === userId &&
    verifyOwner(userId, generation);
}

/* DOCUMENT UTILITIES */

function findResume(id) {
  return savedResumes.find(
    item => String(item.id) === String(id)
  );
}

function getDocumentTitle(resume) {
  return String(resume?.title || t("untitled"));
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

  return Number.isFinite(value) ? value : 0;
}

function normalizeSearch(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizeContent(content) {
  const result = {};

  Object.keys(fields).forEach(key => {
    result[key] =
      typeof content?.[key] === "string"
        ? content[key] : "";
  });

  return result;
}

function hasContent(content) {
  return Object.values(content).some(
    value =>
      typeof value === "string" &&
      value.trim().length > 0
  );
}

/* SVG ICON SYSTEM */

const SVG_NS = "http://www.w3.org/2000/svg";

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
    ],
    check: [
      "M5 12l4 4L19 6"
    ],
    share: [
      "M12 16V3",
      "M7 8l5-5 5 5",
      "M5 12v8h14v-8"
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
      content[key] = element?.value.trim() || "";
    });

  return content;
}

function fillResumeForm(content = {}) {
  const safeContent = normalizeContent(content);

  Object.entries(fields)
    .forEach(([key, element]) => {
      if (element) {
        element.value = safeContent[key];
      }
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

  url.searchParams.set("edit", String(resumeId));
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

/* SEARCH AND SORT */

function getFilteredResumes() {
  const words = normalizeSearch(
    searchInput.value
  ).split(/\s+/).filter(Boolean);

  const results = savedResumes.filter(resume => {
    if (!words.length) return true;

    const content = normalizeContent(resume.content);
    const design = getDesign(resume);
    const template = TEMPLATE_REGISTRY[design.templateId];

    const searchable = normalizeSearch([
      resume.title,
      content.fullName,
      content.professionalTitle,
      content.education,
      content.summary,
      content.experience,
      content.skills,
      template.name,
      design.paperFormat,
      design.documentLanguage
    ].join(" "));

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
        return getDocumentTitle(a).localeCompare(
          getDocumentTitle(b),
          locale(),
          { sensitivity: "base" }
        );

      case "title-desc":
        return getDocumentTitle(b).localeCompare(
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

function closeDocumentMenus(restoreFocus = false) {
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
        button.setAttribute("aria-expanded", "false");

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
        trigger.setAttribute("aria-expanded", "true");
        panel.querySelector("button")?.focus();
      }
    },
    true
  );

  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", panel.id);

  function menuAction(key, icon, handler, danger = false) {
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
    menuAction("rename", "rename", openRenameDialog),
    menuAction("duplicate", "duplicate", openDuplicateDialog),
    menuAction("download", "download", downloadResumePDF),
    divider,
    menuAction("delete", "trash", openDeleteDialog, true)
  );

  wrapper.append(trigger, panel);

  return wrapper;
}

/* DESIGN METADATA */

function createDesignMetadata(resume) {
  const design = getDesign(resume);
  const template = TEMPLATE_REGISTRY[design.templateId];

  const wrapper = document.createElement("div");
  wrapper.className = "wn-document-design";
  wrapper.setAttribute("aria-label", t("design"));

  const templateLabel = document.createElement("span");
  templateLabel.className = "wn-template-label";

  const color = document.createElement("span");
  color.className = "wn-design-color";
  color.style.backgroundColor = design.accentColor;
  color.title = design.accentColor;
  color.setAttribute("aria-hidden", "true");

  templateLabel.append(
    color,
    document.createTextNode(template.name)
  );

  const paper = document.createElement("span");
  paper.className = "wn-paper-label";

  paper.textContent =
    design.paperFormat === "letter"
      ? "US Letter" : "A4";

  wrapper.append(templateLabel, paper);

  if (design.documentLanguage) {
    const language = document.createElement("span");

    language.className = "wn-document-language";
    language.textContent =
      design.documentLanguage.toUpperCase();

    wrapper.appendChild(language);
  }

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

  details.append(
    title,
    date,
    createDesignMetadata(resume)
  );

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

  empty.append(icon, heading, description, link);

  return empty;
}

/* DOCUMENT COUNTERS */

function updateResumeCounters() {
  const count = formatNumber(savedResumes.length);

  resumeCount.textContent = count;
  workspaceResumeCount.textContent = count;
}

/* WORKSPACE RENDERING */

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

  searchResultCount.textContent = t("results", {
    count: formatNumber(filtered.length),
    total: formatNumber(savedResumes.length)
  });

  if (!savedResumes.length) {
    resumeList.appendChild(createEmptyState());
    return;
  }

  if (!filtered.length) {
    noSearchResults.hidden = false;
    return;
  }

  const fragment = document.createDocumentFragment();

  filtered.forEach(resume => {
    fragment.appendChild(createResumeCard(resume));
  });

  resumeList.appendChild(fragment);
}

/* SUPABASE DOCUMENT STORAGE */

const DOCUMENT_COLUMNS =
  "id,title,content,design,created_at,updated_at";

function storeDocument(documentData) {
  savedResumes = savedResumes.filter(
    item => String(item.id) !== String(documentData.id)
  );

  savedResumes.unshift(documentData);
  resumesLoaded = true;
}

async function loadResumes() {
  if (!currentUser) return false;

  const userId = currentUser.id;
  const generation = sessionGeneration;

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

    if (!verifyOwner(userId, generation)) {
      return false;
    }

    savedResumes = Array.isArray(data) ? data : [];
    resumesLoaded = true;

    renderResumes();
    setStatus("");

    return true;

  } catch (error) {
    reportError("load", error);

    if (verifyOwner(userId, generation)) {
      setStatus("loadError", "error");
    }

    return false;
  }
}

/* SAVE OR UPDATE DOCUMENT */

async function saveResume(event) {
  event.preventDefault();

  if (isBusy || !currentUser) return;

  const title = resumeTitle.value.trim().slice(0, 120);

  if (!title) {
    setStatus("titleRequired", "error");
    resumeTitle.focus();
    return;
  }

  const userId = currentUser.id;
  const generation = sessionGeneration;
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
    if (!await verifyAuthenticatedOwner(userId, generation)) {
      throw new Error("Session changed");
    }

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
          user_id: userId,
          design: {
            ...DEFAULT_DESIGN,
            documentLanguage: getLanguage()
          }
        })
        .select(DOCUMENT_COLUMNS)
        .single();
    }

    if (result.error) throw result.error;

    if (!verifyOwner(userId, generation)) return;

    if (!result.data?.id) {
      throw new Error("Missing save confirmation");
    }

    storeDocument(result.data);
    editingResumeId = result.data.id;

    renderResumes();

    setStatus(
      wasEditing ? "updated" : "saved",
      "success"
    );

    quickCreate.open = false;

  } catch (error) {
    reportError("save", error);

    if (verifyOwner(userId, generation)) {
      setStatus("saveError", "error");
    }
  } finally {
    if (verifyOwner(userId, generation)) {
      setBusy(false);
    }
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
  if (dialog?.open) dialog.close();
}

/* RENAME DOCUMENT */

function openRenameDialog(id) {
  if (isBusy || !currentUser) return;

  const resume = findResume(id);

  if (!resume) {
    setStatus("notFound", "error");
    return;
  }

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
  const generation = sessionGeneration;

  const title = renameInput.value.trim().slice(0, 120);

  if (!title) {
    setDialogStatus(renameStatus, "nameRequired");
    return;
  }

  setBusy(true, "rename");
  setDialogStatus(renameStatus);

  try {
    if (!await verifyAuthenticatedOwner(userId, generation)) {
      throw new Error("Session changed");
    }

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

    if (!verifyOwner(userId, generation)) return;

    if (!data?.id) {
      throw new Error("Missing rename confirmation");
    }

    storeDocument(data);

    if (String(editingResumeId) === String(id)) {
      resumeTitle.value = title;
    }

    closeDialog(renameDialog);
    selectedRenameId = null;

    renderResumes();
    setStatus("renamed", "success");

  } catch (error) {
    reportError("rename", error);

    if (verifyOwner(userId, generation)) {
      setDialogStatus(renameStatus, "renameError");
    }
  } finally {
    if (verifyOwner(userId, generation)) {
      setBusy(false);
    }
  }
}

/* DESIGN-AWARE DUPLICATION */

function openDuplicateDialog(id) {
  if (isBusy || !currentUser) return;

  const resume = findResume(id);

  if (!resume) {
    setStatus("notFound", "error");
    return;
  }

  selectedDuplicateId = resume.id;

  const suffix = " (" + t("copy") + ")";

  duplicateInput.value =
    getDocumentTitle(resume)
      .slice(0, 120 - suffix.length) + suffix;

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
  const generation = sessionGeneration;
  const originalId = selectedDuplicateId;

  const title =
    duplicateInput.value.trim().slice(0, 120);

  if (!title) {
    setDialogStatus(duplicateStatus, "nameRequired");
    return;
  }

  setBusy(true, "duplicate");
  setDialogStatus(duplicateStatus);

  try {
    if (!await verifyAuthenticatedOwner(userId, generation)) {
      throw new Error("Session changed");
    }

    const originalResult = await supabase
      .from("resumes")
      .select(DOCUMENT_COLUMNS)
      .eq("id", originalId)
      .eq("user_id", userId)
      .single();

    if (originalResult.error) {
      throw originalResult.error;
    }

    if (!verifyOwner(userId, generation)) return;

    const original = originalResult.data;

    if (!original?.id) {
      throw new Error("Original document not found");
    }

    const content = JSON.parse(
      JSON.stringify(original.content || {})
    );

    const design = normalizeDesign(original.design);

    const { data, error } = await supabase
      .from("resumes")
      .insert({
        user_id: userId,
        title,
        content,
        design,
        updated_at: new Date().toISOString()
      })
      .select(DOCUMENT_COLUMNS)
      .single();

    if (error) throw error;

    if (!verifyOwner(userId, generation)) return;

    if (!data?.id) {
      throw new Error("Missing copy confirmation");
    }

    storeDocument(data);

    closeDialog(duplicateDialog);
    selectedDuplicateId = null;

    searchInput.value = "";

    renderResumes();
    setStatus("duplicated", "success");

  } catch (error) {
    reportError("duplicate", error);

    if (verifyOwner(userId, generation)) {
      setDialogStatus(duplicateStatus, "duplicateError");
    }
  } finally {
    if (verifyOwner(userId, generation)) {
      setBusy(false);
    }
  }
}

/* DOCUMENT DELETE */

function openDeleteDialog(id) {
  if (isBusy || !currentUser) return;

  const resume = findResume(id);

  if (!resume) {
    setStatus("notFound", "error");
    return;
  }

  selectedDeleteId = resume.id;

  deleteResumeName.textContent = getDocumentTitle(resume);

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
  const generation = sessionGeneration;

  setBusy(true, "delete");
  setDialogStatus(deleteStatus);

  try {
    if (!await verifyAuthenticatedOwner(userId, generation)) {
      throw new Error("Session changed");
    }

    const { data, error } = await supabase
      .from("resumes")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
      .select("id");

    if (error) throw error;

    if (!verifyOwner(userId, generation)) return;

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

    if (String(preparedPDF?.resumeId) === String(id)) {
      clearPreparedPDF();
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

    if (verifyOwner(userId, generation)) {
      setDialogStatus(deleteStatus, "deleteError");
    }
  } finally {
    if (verifyOwner(userId, generation)) {
      setBusy(false);
    }
  }
}

/* DIRECT PDF FILE MANAGEMENT */

function releasePDFResources() {
  if (preparedPDFURL) {
    URL.revokeObjectURL(preparedPDFURL);
  }

  preparedPDFURL = null;
  preparedPDF = null;
}

function clearPreparedPDF() {
  pdfGeneration++;

  const dialog = $("wnDashboardPDFDialog");

  releasePDFResources();

  if (dialog?.open) {
    dialog.close();
  }

  if (dialog) {
    dialog.replaceChildren();
  }

  window.WorknelyPDFExport?.clearPreparedFile?.();
}

function normalizePDFFilename(value) {
  const name = String(value || t("untitled"))
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, " ")
    .replace(/\.pdf$/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);

  return (name || "Worknely Resume") + ".pdf";
}

function canSharePDF(file) {
  try {
    return typeof navigator.share === "function" &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({
        files: [file]
      });
  } catch {
    return false;
  }
}

function isPreparedPDFValid() {
  return Boolean(
    preparedPDF &&
    preparedPDFURL &&
    currentUser &&
    preparedPDF.ownerId === currentUser.id &&
    preparedPDF.sessionGeneration === sessionGeneration &&
    preparedPDF.pdfGeneration === pdfGeneration
  );
}

/* NATIVE PDF SHARING */

async function sharePreparedPDF() {
  if (!isPreparedPDFValid()) {
    clearPreparedPDF();
    return;
  }

  const file = preparedPDF.file;

  if (!canSharePDF(file)) {
    $("wnDashboardPDFDownload")?.focus();
    return;
  }

  try {
    await navigator.share({
      files: [file],
      title: file.name
    });

  } catch (error) {
    if (error?.name === "AbortError") return;

    reportError("share", error);

    const message = $("wnDashboardPDFMessage");

    if (message) {
      message.textContent = t("pdfHelp");
    }

    $("wnDashboardPDFDownload")?.focus();
  }
}

/* PROFESSIONAL PDF DELIVERY DIALOG */

function getPDFDialog() {
  let dialog = $("wnDashboardPDFDialog");

  if (dialog) return dialog;

  dialog = document.createElement("dialog");

  dialog.id = "wnDashboardPDFDialog";

  dialog.setAttribute(
    "aria-labelledby",
    "wnDashboardPDFHeading"
  );

  dialog.addEventListener("close", () => {
    if (dialog.open) return;

    pdfGeneration++;

    releasePDFResources();
    dialog.replaceChildren();

    window.WorknelyPDFExport?.clearPreparedFile?.();
  });

  document.body.appendChild(dialog);

  return dialog;
}

function renderPDFDialog() {
  if (!isPreparedPDFValid()) return false;

  const dialog = getPDFDialog();

  const { file, design } = preparedPDF;

  dialog.replaceChildren();

  const icon = document.createElement("div");
  icon.className = "wn-pdf-success-icon";
  icon.appendChild(createIcon("check"));

  const heading = document.createElement("h2");
  heading.id = "wnDashboardPDFHeading";
  heading.textContent = t("pdfReady");

  const filename = document.createElement("div");
  filename.className = "wn-dashboard-pdf-file";
  filename.textContent = file.name;

  const metadata = document.createElement("p");

  metadata.textContent = [
    TEMPLATE_REGISTRY[design.templateId].name,
    design.paperFormat === "letter" ? "US Letter" : "A4",
    (design.documentLanguage || "en").toUpperCase(),
    Math.max(1, Math.round(file.size / 1024)) + " KB"
  ].join(" · ");

  const message = document.createElement("p");
  message.id = "wnDashboardPDFMessage";
  message.textContent = t("pdfHelp");

  const actions = document.createElement("div");
  actions.className = "wn-dashboard-pdf-actions";

  const shareButton = createButton(
    "wn-pdf-primary",
    t("share"),
    "share",
    sharePreparedPDF
  );

  shareButton.disabled = false;
  shareButton.hidden = !canSharePDF(file);

  const download = document.createElement("a");

  download.id = "wnDashboardPDFDownload";

  download.className = shareButton.hidden
    ? "wn-pdf-primary"
    : "wn-pdf-secondary";

  download.href = preparedPDFURL;
  download.download = file.name;

  download.append(
    createIcon("download"),
    document.createTextNode(t("download"))
  );

  download.addEventListener("click", event => {
    if (!isPreparedPDFValid()) {
      event.preventDefault();
      clearPreparedPDF();
    }
  });

  const open = document.createElement("a");

  open.className = "wn-pdf-secondary";
  open.href = preparedPDFURL;
  open.target = "_blank";
  open.rel = "noopener noreferrer";
  open.textContent = t("openPDF");

  open.addEventListener("click", event => {
    if (!isPreparedPDFValid()) {
      event.preventDefault();
      clearPreparedPDF();
    }
  });

  const closeButton = createButton(
    "wn-pdf-secondary",
    t("close"),
    null,
    clearPreparedPDF
  );

  closeButton.disabled = false;

  actions.append(
    shareButton,
    download,
    open,
    closeButton
  );

  const privacy = document.createElement("p");
  privacy.textContent = t("pdfPrivate");

  dialog.append(
    icon,
    heading,
    filename,
    metadata,
    message,
    actions,
    privacy
  );

  return true;
}

/* PDF ERROR DIAGNOSTICS */

function getPDFErrorKey(reason) {
  switch (reason) {
    case "libraryError":
      return "pdfLibraryError";

    case "fontError":
      return "pdfFontError";

    case "empty":
      return "pdfEmpty";

    case "changed":
      return "pdfChanged";

    case "unavailable":
      return "designUnavailable";

    default:
      return "pdfError";
  }
}

function normalizePDFError(reason) {
  const allowed = [
    "libraryError",
    "fontError",
    "empty",
    "changed",
    "unavailable",
    "busy",
    "failed"
  ];

  return allowed.includes(reason)
    ? reason : "failed";
}

/* UNIFIED PROFESSIONAL PDF EXPORT */

async function downloadResumePDF(id) {
  if (isBusy || !currentUser) return;

  if (!findResume(id)) {
    setStatus("notFound", "error");
    return;
  }

  const userId = currentUser.id;
  const generation = sessionGeneration;

  clearPreparedPDF();

  const exportGeneration = pdfGeneration;

  lastPDFError = null;

  setBusy(true, "pdf");
  setStatus("pdfPreparing");

  const validContext = () =>
    verifyOwner(userId, generation) &&
    exportGeneration === pdfGeneration;

  try {
    if (!await verifyAuthenticatedOwner(userId, generation)) {
      throw new Error("Session changed");
    }

    if (!validContext()) return;

    /*
     * Always fetch the latest saved document
     * and its persistent design.
     */

    const { data: resume, error } = await supabase
      .from("resumes")
      .select(DOCUMENT_COLUMNS)
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    if (!validContext()) return;

    if (!resume?.id) {
      setStatus("notFound", "error");
      return;
    }

    const content = normalizeContent(resume.content);

    if (!hasContent(content)) {
      lastPDFError = "empty";
      setStatus("pdfEmpty", "error");
      return;
    }

    const savedDesign = getDesign(resume);

    const design = {
      ...savedDesign,
      documentLanguage:
        savedDesign.documentLanguage || "en"
    };

    const engineReady = await loadPDFEngine();

    if (!validContext()) return;

    if (!engineReady || !isPDFEngineReady()) {
      lastPDFError = "unavailable";
      setStatus("designUnavailable", "error");
      return;
    }

    const engine = window.WorknelyPDFExport;

    const filename = normalizePDFFilename(
      getDocumentTitle(resume)
    );

    /*
     * Shared professional PDF engine V7.16.12.
     * Direct file generation.
     * No window.print().
     * No HTML print popup.
     * No changes to the saved document design.
     */

    const result = await engine.exportResume({
      content,
      templateId: design.templateId,
      accentColor: design.accentColor,
      documentLanguage: design.documentLanguage,
      paperFormat: design.paperFormat,
      filename,
      returnFile: true
    });

    if (!validContext()) return;

    if (!await verifyAuthenticatedOwner(userId, generation)) {
      engine.clearPreparedFile?.();
      setStatus("sessionError", "error");
      return;
    }

    if (!validContext()) return;

    if (!result?.ok) {
      lastPDFError = normalizePDFError(
        result?.reason ||
        engine.getState?.()?.lastError
      );

      setStatus(
        getPDFErrorKey(lastPDFError),
        "error"
      );

      return;
    }

    const blob =
      result.file instanceof Blob
        ? result.file : result.blob;

    if (!(blob instanceof Blob) || blob.size < 5) {
      throw new Error("Missing PDF file");
    }

    /*
     * Verify the generated PDF signature.
     */

    const signature = await blob.slice(0, 5).text();

    if (signature !== "%PDF-") {
      throw new Error("Invalid PDF signature");
    }

    if (!validContext()) return;

    const file = new File(
      [blob],
      filename,
      {
        type: "application/pdf",
        lastModified: Date.now()
      }
    );

    preparedPDF = {
      file,
      design,
      ownerId: userId,
      resumeId: resume.id,
      sessionGeneration: generation,
      pdfGeneration: exportGeneration
    };

    preparedPDFURL = URL.createObjectURL(file);

    if (!renderPDFDialog()) {
      throw new Error("PDF dialog rendering failed");
    }

    const dialog = getPDFDialog();

    if (!showDialog(dialog)) {
      clearPreparedPDF();
      return;
    }

    lastPDFError = null;

    setStatus("pdfReady", "success");

    document.dispatchEvent(
      new CustomEvent(
        "worknely:dashboardpdfready",
        {
          detail: {
            version: VERSION,
            pdfEngineVersion: PDF_VERSION,
            templateId: design.templateId,
            paperFormat: design.paperFormat,
            documentLanguage: design.documentLanguage
          }
        }
      )
    );

  } catch (error) {
    reportError("pdf", error);

    if (validContext()) {
      lastPDFError = "failed";

      clearPreparedPDF();
      setStatus("pdfError", "error");
    }

  } finally {
    if (verifyOwner(userId, generation)) {
      setBusy(false);

      if (
        exportGeneration !== pdfGeneration &&
        statusMessages.get(resumeStatus) === "pdfPreparing"
      ) {
        setStatus("");
      }
    }
  }
}

/* INTERNATIONAL INTERFACE REFRESH */

function refreshLanguage() {
  if (currentUser) {
    welcome.textContent = t("welcome", {
      name: currentUser.email || t("user")
    });
  }

  if (!loading.hidden) {
    loading.textContent = t(loadingKey);
  }

  statusMessages.forEach((key, element) => {
    element.textContent = key ? t(key) : "";
  });

  updateActionLabels();
  renderResumes();

  if (
    isPreparedPDFValid() &&
    $("wnDashboardPDFDialog")?.open
  ) {
    renderPDFDialog();
  }

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

window.addEventListener("pageshow", event => {
  refreshLanguage();

  if (
    event.persisted &&
    currentUser &&
    !isBusy
  ) {
    const userId = currentUser.id;
    const generation = sessionGeneration;

    clearPreparedPDF();

    setBusy(true, "load");

    verifyAuthenticatedOwner(userId, generation)
      .then(valid => {
        if (!verifyOwner(userId, generation)) {
          return;
        }

        if (!valid) {
          clearSession();
          redirectToLogin();
          return;
        }

        return loadResumes();
      })
      .catch(error => {
        reportError("session", error);

        if (verifyOwner(userId, generation)) {
          setStatus("sessionError", "error");
        }
      })
      .finally(() => {
        if (verifyOwner(userId, generation)) {
          setBusy(false);
        }
      });
  }
});

window.addEventListener("storage", event => {
  if (
    event.key === "worknely.language" ||
    event.key === null
  ) {
    refreshLanguage();
  }
});

/* LOGOUT */

async function logOut() {
  if (isBusy) return;

  setBusy(true, "logout");

  try {
    const { error } = await supabase.auth.signOut();

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

  installDesignStyles();

  const generation = sessionGeneration;

  try {
    const { data, error } = await supabase.auth.getUser();

    if (generation !== sessionGeneration) return;

    if (error || !data?.user) {
      redirectToLogin();
      return;
    }

    currentUser = data.user;

    refreshLanguage();
    showApp();

    /*
     * Preload the current PDF engine only
     * after successful authentication.
     */

    loadPDFEngine().catch(() => {});

    const userId = currentUser.id;

    setBusy(true, "load");

    try {
      await loadResumes();

    } finally {
      if (verifyOwner(userId, generation)) {
        setBusy(false);
      }
    }

  } catch (error) {
    reportError("session", error);

    if (generation === sessionGeneration) {
      showLoading("sessionError");
    }
  }
}

/* FORM EVENTS */

resumeForm.addEventListener(
  "submit",
  saveResume
);

newButton.addEventListener(
  "click",
  () => {
    if (!isBusy && currentUser) {
      resetForm();
    }
  }
);

logoutButton.addEventListener(
  "click",
  logOut
);

/* SEARCH AND SORT */

searchInput.addEventListener(
  "input",
  renderResumes
);

sortInput.addEventListener(
  "change",
  renderResumes
);

clearSearch.addEventListener(
  "click",
  clearDocumentSearch
);

resetSearch.addEventListener(
  "click",
  clearDocumentSearch
);

/* RENAME EVENTS */

renameForm.addEventListener(
  "submit",
  renameResume
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
  "submit",
  duplicateResume
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
  "click",
  deleteResume
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
  dialog.addEventListener("cancel", event => {
    if (isBusy) {
      event.preventDefault();
    }
  });
});

/* DOCUMENT MENU EVENTS */

document.addEventListener("click", event => {
  if (
    event.target instanceof Element &&
    !event.target.closest(".wn-document-menu")
  ) {
    closeDocumentMenus();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeDocumentMenus(true);
  }
});

window.addEventListener("hashchange", () => {
  closeDocumentMenus();
  clearPreparedPDF();
});

/* PRIVATE DOCUMENT LIFECYCLE */

window.addEventListener("pagehide", () => {
  clearPreparedPDF();
});

/* SUPABASE AUTH STATE */

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_OUT") {
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
});

/* PUBLIC DASHBOARD API */

window.WorknelyDashboard = Object.freeze({

  version: VERSION,

  normalizeDesign,

  downloadResumePDF,

  clearPreparedPDF,

  getTemplates: () =>
    Object.entries(TEMPLATE_REGISTRY)
      .map(([id, template]) => ({
        id,
        ...template
      })),

  getState: () => ({
    version: VERSION,

    authenticated: Boolean(currentUser),

    resumesLoaded,

    resumeCount: savedResumes.length,

    busy: isBusy,

    activeOperation,

    designEngineReady: isDesignEngineReady(),

    pdfEngineReady: isPDFEngineReady(),

    expectedPDFEngineVersion: PDF_VERSION,

    actualPDFEngineVersion:
      window.WorknelyPDFExport?.version || null,

    pdfPrepared: isPreparedPDFValid(),

    lastPDFError
  })

});

/* START WORKNELY */

initializeDashboard();

console.info(
  "Worknely V" + VERSION +
  " Professional Dashboard initialized."
);

/*
 * END WORKNELY V7.16.13
 *
 * PDF Engine V7.16.12 Compatibility
 * Direct Professional PDF Export
 * International SaaS Workspace
 * Persistent Document Design
 * Native iOS File Sharing
 * Session-Aware PDF Lifecycle
 * People Technology
 */
