/*
 * WORKNELY V7.18.3.4.1
 * International SaaS Localization Engine
 *
 * Central Translation Dictionary
 * Persistent Language Preference
 * Cross-Page Language Synchronization
 * Dynamic Translation API
 * Six International Languages
 * Mobile First Architecture
 * Zero External Dependencies
 *
 * Compatible with GitHub Pages.
 */

(() => {

  "use strict";

  const VERSION = "7.18.3.4.1";

  const STORAGE_KEY =
    "worknely.language";

  const DEFAULT_LANGUAGE = "en";

  const SUPPORTED_LANGUAGES = Object.freeze([
    "en",
    "ro",
    "it",
    "de",
    "fr",
    "es"
  ]);

  const LANGUAGE_NAMES = Object.freeze({
    en: "English",
    ro: "Română",
    it: "Italiano",
    de: "Deutsch",
    fr: "Français",
    es: "Español"
  });

  const LANGUAGE_FLAGS = Object.freeze({
    en: "🇬🇧",
    ro: "🇷🇴",
    it: "🇮🇹",
    de: "🇩🇪",
    fr: "🇫🇷",
    es: "🇪🇸"
  });

  /* INTERNATIONAL DICTIONARY */

  const dictionary = {

    en: {

      "nav.home": "Home",
      "nav.overview": "Overview",
      "nav.dashboard": "My Dashboard",
      "nav.resumes": "My Resumes",
      "nav.builder": "Resume Builder",
      "nav.studio": "Writing Studio",
      "nav.analysis": "Career Analysis",
      "nav.pricing": "Pricing",
      "nav.account": "My Account",
      "nav.settings": "Settings",

      "auth.login": "Log In",
      "auth.signup": "Sign Up",
      "auth.logout": "Log Out",
      "auth.email": "Email address",
      "auth.password": "Password",
      "auth.confirmPassword": "Confirm password",
      "auth.forgot": "Forgot password?",
      "auth.reset": "Reset password",
      "auth.createAccount": "Create your account",
      "auth.welcome": "Welcome back",
      "auth.resend": "Resend confirmation email",

      "common.cancel": "Cancel",
      "common.confirm": "Confirm",
      "common.close": "Close",
      "common.save": "Save",
      "common.update": "Update",
      "common.delete": "Delete",
      "common.rename": "Rename",
      "common.duplicate": "Duplicate",
      "common.download": "Download",
      "common.search": "Search",
      "common.loading": "Loading...",
      "common.retry": "Try again",
      "common.language": "Language",
      "common.comingSoon": "Coming soon",

      "document.title": "Document name",
      "document.untitled": "Untitled Resume",
      "document.search": "Search resumes...",
      "document.clearSearch": "Clear search",
      "document.noResults": "No matching resumes",
      "document.edit": "Edit in Resume Builder",
      "document.pdf": "Download PDF",
      "document.rename": "Rename resume",
      "document.duplicate": "Duplicate resume",
      "document.delete": "Delete resume",
      "document.copy": "Copy",
      "document.updated": "Updated {date}",
      "document.count": "{count} resumes",
      "document.results": "{count} of {total} resumes",
      "document.deleteWarning":
        "This action cannot be undone.",
      "document.renameSuccess":
        "Resume renamed successfully.",
      "document.duplicateSuccess":
        "Resume duplicated successfully.",
      "document.deleteSuccess":
        "Resume deleted successfully.",
      "document.saveSuccess":
        "Resume saved successfully.",
      "document.updateSuccess":
        "Resume updated successfully.",

      "sort.updatedDesc": "Recently updated",
      "sort.updatedAsc": "Least recently updated",
      "sort.createdDesc": "Newest first",
      "sort.createdAsc": "Oldest first",
      "sort.titleAsc": "Name A–Z",
      "sort.titleDesc": "Name Z–A",

      "builder.saveAccount": "Save to My Account",
      "builder.create": "Create resume",
      "builder.generate": "Generate resume",
      "builder.export": "Export resume PDF",

      "dashboard.welcome": "Welcome back, {name}!",
      "dashboard.saved": "Saved resumes",
      "dashboard.plan": "Current plan",
      "dashboard.quickCreate": "Quick Create Resume",
      "dashboard.emptyTitle": "Your career starts here",
      "dashboard.emptyDescription":
        "Create your first professional resume and keep your career documents organized in one place.",

      "plan.free": "Free",
      "plan.pro": "Pro",
      "plan.premium": "Premium",
      "plan.monthly": "Monthly",
      "plan.yearly": "Yearly",
      "plan.perMonth": "per month",
      "plan.perYear": "per year",

      "status.error": "Something went wrong.",
      "status.saved": "Saved successfully.",
      "status.saving": "Saving...",
      "status.loading": "Loading...",
      "status.sessionExpired":
        "Your session has ended. Please log in again."

    },

    ro: {

      "nav.home": "Acasă",
      "nav.overview": "Prezentare generală",
      "nav.dashboard": "Panoul meu",
      "nav.resumes": "CV-urile mele",
      "nav.builder": "Editor CV",
      "nav.studio": "Atelier de redactare",
      "nav.analysis": "Analiză profesională",
      "nav.pricing": "Abonamente",
      "nav.account": "Contul meu",
      "nav.settings": "Setări",

      "auth.login": "Autentificare",
      "auth.signup": "Înregistrare",
      "auth.logout": "Deconectare",
      "auth.email": "Adresă de e-mail",
      "auth.password": "Parolă",
      "auth.confirmPassword": "Confirmă parola",
      "auth.forgot": "Ai uitat parola?",
      "auth.reset": "Resetează parola",
      "auth.createAccount": "Creează-ți contul",
      "auth.welcome": "Bine ai revenit",
      "auth.resend": "Retrimite e-mailul de confirmare",

      "common.cancel": "Anulează",
      "common.confirm": "Confirmă",
      "common.close": "Închide",
      "common.save": "Salvează",
      "common.update": "Actualizează",
      "common.delete": "Șterge",
      "common.rename": "Redenumește",
      "common.duplicate": "Duplică",
      "common.download": "Descarcă",
      "common.search": "Caută",
      "common.loading": "Se încarcă...",
      "common.retry": "Încearcă din nou",
      "common.language": "Limbă",
      "common.comingSoon": "În curând",

      "document.title": "Denumirea documentului",
      "document.untitled": "CV fără titlu",
      "document.search": "Caută CV-uri...",
      "document.clearSearch": "Șterge căutarea",
      "document.noResults": "Nu există CV-uri corespunzătoare",
      "document.edit": "Editează CV-ul",
      "document.pdf": "Descarcă PDF",
      "document.rename": "Redenumește CV-ul",
      "document.duplicate": "Duplică CV-ul",
      "document.delete": "Șterge CV-ul",
      "document.copy": "Copie",
      "document.updated": "Actualizat {date}",
      "document.count": "CV-uri: {count}",
      "document.results": "{count} din {total} CV-uri",
      "document.deleteWarning":
        "Această acțiune este ireversibilă.",
      "document.renameSuccess":
        "CV redenumit cu succes.",
      "document.duplicateSuccess":
        "CV duplicat cu succes.",
      "document.deleteSuccess":
        "CV șters cu succes.",
      "document.saveSuccess":
        "CV salvat cu succes.",
      "document.updateSuccess":
        "CV actualizat cu succes.",

      "sort.updatedDesc": "Actualizate recent",
      "sort.updatedAsc": "Actualizate mai demult",
      "sort.createdDesc": "Cele mai noi",
      "sort.createdAsc": "Cele mai vechi",
      "sort.titleAsc": "Denumire A–Z",
      "sort.titleDesc": "Denumire Z–A",

      "builder.saveAccount": "Salvează în contul meu",
      "builder.create": "Creează CV",
      "builder.generate": "Generează CV-ul",
      "builder.export": "Exportă CV PDF",

      "dashboard.welcome": "Bine ai revenit, {name}!",
      "dashboard.saved": "CV-uri salvate",
      "dashboard.plan": "Abonament actual",
      "dashboard.quickCreate": "Creare rapidă CV",
      "dashboard.emptyTitle": "Cariera ta începe aici",
      "dashboard.emptyDescription":
        "Creează primul tău CV profesional și organizează toate documentele de carieră într-un singur loc.",

      "plan.free": "Gratuit",
      "plan.pro": "Pro",
      "plan.premium": "Premium",
      "plan.monthly": "Lunar",
      "plan.yearly": "Anual",
      "plan.perMonth": "pe lună",
      "plan.perYear": "pe an",

      "status.error": "A apărut o eroare.",
      "status.saved": "Salvat cu succes.",
      "status.saving": "Se salvează...",
      "status.loading": "Se încarcă...",
      "status.sessionExpired":
        "Sesiunea ta s-a încheiat. Autentifică-te din nou."

    },

    it: {

      "nav.home": "Home",
      "nav.overview": "Panoramica",
      "nav.dashboard": "La mia dashboard",
      "nav.resumes": "I miei CV",
      "nav.builder": "Editor CV",
      "nav.studio": "Studio di scrittura",
      "nav.analysis": "Analisi professionale",
      "nav.pricing": "Abbonamenti",
      "nav.account": "Il mio account",
      "nav.settings": "Impostazioni",

      "auth.login": "Accedi",
      "auth.signup": "Registrati",
      "auth.logout": "Esci",
      "auth.email": "Indirizzo e-mail",
      "auth.password": "Password",
      "auth.confirmPassword": "Conferma password",
      "auth.forgot": "Password dimenticata?",
      "auth.reset": "Reimposta password",
      "auth.createAccount": "Crea il tuo account",
      "auth.welcome": "Bentornato",
      "auth.resend": "Invia nuovamente l’e-mail di conferma",

      "common.cancel": "Annulla",
      "common.confirm": "Conferma",
      "common.close": "Chiudi",
      "common.save": "Salva",
      "common.update": "Aggiorna",
      "common.delete": "Elimina",
      "common.rename": "Rinomina",
      "common.duplicate": "Duplica",
      "common.download": "Scarica",
      "common.search": "Cerca",
      "common.loading": "Caricamento...",
      "common.retry": "Riprova",
      "common.language": "Lingua",
      "common.comingSoon": "Prossimamente",

      "document.title": "Nome del documento",
      "document.untitled": "CV senza titolo",
      "document.search": "Cerca CV...",
      "document.clearSearch": "Cancella ricerca",
      "document.noResults": "Nessun CV corrispondente",
      "document.edit": "Modifica CV",
      "document.pdf": "Scarica PDF",
      "document.rename": "Rinomina CV",
      "document.duplicate": "Duplica CV",
      "document.delete": "Elimina CV",
      "document.copy": "Copia",
      "document.updated": "Aggiornato il {date}",
      "document.count": "{count} CV",
      "document.results": "{count} di {total} CV",
      "document.deleteWarning":
        "Questa azione è irreversibile.",
      "document.renameSuccess":
        "CV rinominato correttamente.",
      "document.duplicateSuccess":
        "CV duplicato correttamente.",
      "document.deleteSuccess":
        "CV eliminato correttamente.",
      "document.saveSuccess":
        "CV salvato correttamente.",
      "document.updateSuccess":
        "CV aggiornato correttamente.",

      "sort.updatedDesc": "Aggiornati di recente",
      "sort.updatedAsc": "Meno recenti",
      "sort.createdDesc": "Più nuovi",
      "sort.createdAsc": "Più vecchi",
      "sort.titleAsc": "Nome A–Z",
      "sort.titleDesc": "Nome Z–A",

      "builder.saveAccount": "Salva nel mio account",
      "builder.create": "Crea CV",
      "builder.generate": "Genera CV",
      "builder.export": "Esporta CV PDF",

      "dashboard.welcome": "Ti diamo il bentornato, {name}!",
      "dashboard.saved": "CV salvati",
      "dashboard.plan": "Piano attuale",
      "dashboard.quickCreate": "Creazione rapida CV",
      "dashboard.emptyTitle": "La tua carriera inizia qui",
      "dashboard.emptyDescription":
        "Crea il tuo primo CV professionale e organizza tutti i tuoi documenti in un unico posto.",

      "plan.free": "Gratuito",
      "plan.pro": "Pro",
      "plan.premium": "Premium",
      "plan.monthly": "Mensile",
      "plan.yearly": "Annuale",
      "plan.perMonth": "al mese",
      "plan.perYear": "all’anno",

      "status.error": "Si è verificato un errore.",
      "status.saved": "Salvato correttamente.",
      "status.saving": "Salvataggio...",
      "status.loading": "Caricamento...",
      "status.sessionExpired":
        "La sessione è terminata. Accedi nuovamente."

    },

    de: {

      "nav.home": "Startseite",
      "nav.overview": "Übersicht",
      "nav.dashboard": "Mein Dashboard",
      "nav.resumes": "Meine Lebensläufe",
      "nav.builder": "Lebenslauf-Editor",
      "nav.studio": "Schreibstudio",
      "nav.analysis": "Karriereanalyse",
      "nav.pricing": "Preise",
      "nav.account": "Mein Konto",
      "nav.settings": "Einstellungen",

      "auth.login": "Anmelden",
      "auth.signup": "Registrieren",
      "auth.logout": "Abmelden",
      "auth.email": "E-Mail-Adresse",
      "auth.password": "Passwort",
      "auth.confirmPassword": "Passwort bestätigen",
      "auth.forgot": "Passwort vergessen?",
      "auth.reset": "Passwort zurücksetzen",
      "auth.createAccount": "Konto erstellen",
      "auth.welcome": "Willkommen zurück",
      "auth.resend": "Bestätigungs-E-Mail erneut senden",

      "common.cancel": "Abbrechen",
      "common.confirm": "Bestätigen",
      "common.close": "Schließen",
      "common.save": "Speichern",
      "common.update": "Aktualisieren",
      "common.delete": "Löschen",
      "common.rename": "Umbenennen",
      "common.duplicate": "Duplizieren",
      "common.download": "Herunterladen",
      "common.search": "Suchen",
      "common.loading": "Wird geladen...",
      "common.retry": "Erneut versuchen",
      "common.language": "Sprache",
      "common.comingSoon": "Demnächst",

      "document.title": "Dokumentname",
      "document.untitled": "Unbenannter Lebenslauf",
      "document.search": "Lebensläufe suchen...",
      "document.clearSearch": "Suche löschen",
      "document.noResults": "Keine passenden Lebensläufe",
      "document.edit": "Lebenslauf bearbeiten",
      "document.pdf": "PDF herunterladen",
      "document.rename": "Lebenslauf umbenennen",
      "document.duplicate": "Lebenslauf duplizieren",
      "document.delete": "Lebenslauf löschen",
      "document.copy": "Kopie",
      "document.updated": "Aktualisiert am {date}",
      "document.count": "Lebensläufe: {count}",
      "document.results": "{count} von {total} Lebensläufen",
      "document.deleteWarning":
        "Diese Aktion kann nicht rückgängig gemacht werden.",
      "document.renameSuccess":
        "Lebenslauf erfolgreich umbenannt.",
      "document.duplicateSuccess":
        "Lebenslauf erfolgreich dupliziert.",
      "document.deleteSuccess":
        "Lebenslauf erfolgreich gelöscht.",
      "document.saveSuccess":
        "Lebenslauf erfolgreich gespeichert.",
      "document.updateSuccess":
        "Lebenslauf erfolgreich aktualisiert.",

      "sort.updatedDesc": "Zuletzt aktualisiert",
      "sort.updatedAsc": "Länger nicht aktualisiert",
      "sort.createdDesc": "Neueste zuerst",
      "sort.createdAsc": "Älteste zuerst",
      "sort.titleAsc": "Name A–Z",
      "sort.titleDesc": "Name Z–A",

      "builder.saveAccount": "In meinem Konto speichern",
      "builder.create": "Lebenslauf erstellen",
      "builder.generate": "Lebenslauf generieren",
      "builder.export": "PDF exportieren",

      "dashboard.welcome": "Willkommen zurück, {name}!",
      "dashboard.saved": "Gespeicherte Lebensläufe",
      "dashboard.plan": "Aktueller Tarif",
      "dashboard.quickCreate": "Lebenslauf schnell erstellen",
      "dashboard.emptyTitle": "Deine Karriere beginnt hier",
      "dashboard.emptyDescription":
        "Erstelle deinen ersten professionellen Lebenslauf und organisiere deine Karriereunterlagen an einem Ort.",

      "plan.free": "Kostenlos",
      "plan.pro": "Pro",
      "plan.premium": "Premium",
      "plan.monthly": "Monatlich",
      "plan.yearly": "Jährlich",
      "plan.perMonth": "pro Monat",
      "plan.perYear": "pro Jahr",

      "status.error": "Ein Fehler ist aufgetreten.",
      "status.saved": "Erfolgreich gespeichert.",
      "status.saving": "Wird gespeichert...",
      "status.loading": "Wird geladen...",
      "status.sessionExpired":
        "Deine Sitzung ist beendet. Bitte melde dich erneut an."

    },

    fr: {

      "nav.home": "Accueil",
      "nav.overview": "Vue d’ensemble",
      "nav.dashboard": "Mon tableau de bord",
      "nav.resumes": "Mes CV",
      "nav.builder": "Éditeur de CV",
      "nav.studio": "Atelier de rédaction",
      "nav.analysis": "Analyse professionnelle",
      "nav.pricing": "Tarifs",
      "nav.account": "Mon compte",
      "nav.settings": "Paramètres",

      "auth.login": "Connexion",
      "auth.signup": "Inscription",
      "auth.logout": "Déconnexion",
      "auth.email": "Adresse e-mail",
      "auth.password": "Mot de passe",
      "auth.confirmPassword": "Confirmer le mot de passe",
      "auth.forgot": "Mot de passe oublié ?",
      "auth.reset": "Réinitialiser le mot de passe",
      "auth.createAccount": "Créer votre compte",
      "auth.welcome": "Bon retour",
      "auth.resend": "Renvoyer l’e-mail de confirmation",

      "common.cancel": "Annuler",
      "common.confirm": "Confirmer",
      "common.close": "Fermer",
      "common.save": "Enregistrer",
      "common.update": "Mettre à jour",
      "common.delete": "Supprimer",
      "common.rename": "Renommer",
      "common.duplicate": "Dupliquer",
      "common.download": "Télécharger",
      "common.search": "Rechercher",
      "common.loading": "Chargement...",
      "common.retry": "Réessayer",
      "common.language": "Langue",
      "common.comingSoon": "Bientôt disponible",

      "document.title": "Nom du document",
      "document.untitled": "CV sans titre",
      "document.search": "Rechercher des CV...",
      "document.clearSearch": "Effacer la recherche",
      "document.noResults": "Aucun CV correspondant",
      "document.edit": "Modifier le CV",
      "document.pdf": "Télécharger le PDF",
      "document.rename": "Renommer le CV",
      "document.duplicate": "Dupliquer le CV",
      "document.delete": "Supprimer le CV",
      "document.copy": "Copie",
      "document.updated": "Mis à jour le {date}",
      "document.count": "{count} CV",
      "document.results": "{count} CV sur {total}",
      "document.deleteWarning":
        "Cette action est irréversible.",
      "document.renameSuccess":
        "CV renommé avec succès.",
      "document.duplicateSuccess":
        "CV dupliqué avec succès.",
      "document.deleteSuccess":
        "CV supprimé avec succès.",
      "document.saveSuccess":
        "CV enregistré avec succès.",
      "document.updateSuccess":
        "CV mis à jour avec succès.",

      "sort.updatedDesc": "Modifiés récemment",
      "sort.updatedAsc": "Modifiés moins récemment",
      "sort.createdDesc": "Les plus récents",
      "sort.createdAsc": "Les plus anciens",
      "sort.titleAsc": "Nom A–Z",
      "sort.titleDesc": "Nom Z–A",

      "builder.saveAccount": "Enregistrer dans mon compte",
      "builder.create": "Créer un CV",
      "builder.generate": "Générer le CV",
      "builder.export": "Exporter le CV en PDF",

      "dashboard.welcome": "Bon retour, {name} !",
      "dashboard.saved": "CV enregistrés",
      "dashboard.plan": "Abonnement actuel",
      "dashboard.quickCreate": "Création rapide de CV",
      "dashboard.emptyTitle": "Votre carrière commence ici",
      "dashboard.emptyDescription":
        "Créez votre premier CV professionnel et organisez vos documents de carrière au même endroit.",

      "plan.free": "Gratuit",
      "plan.pro": "Pro",
      "plan.premium": "Premium",
      "plan.monthly": "Mensuel",
      "plan.yearly": "Annuel",
      "plan.perMonth": "par mois",
      "plan.perYear": "par an",

      "status.error": "Une erreur est survenue.",
      "status.saved": "Enregistré avec succès.",
      "status.saving": "Enregistrement...",
      "status.loading": "Chargement...",
      "status.sessionExpired":
        "Votre session est terminée. Veuillez vous reconnecter."

    },

    es: {

      "nav.home": "Inicio",
      "nav.overview": "Resumen",
      "nav.dashboard": "Mi panel",
      "nav.resumes": "Mis currículums",
      "nav.builder": "Editor de CV",
      "nav.studio": "Estudio de redacción",
      "nav.analysis": "Análisis profesional",
      "nav.pricing": "Precios",
      "nav.account": "Mi cuenta",
      "nav.settings": "Configuración",

      "auth.login": "Iniciar sesión",
      "auth.signup": "Registrarse",
      "auth.logout": "Cerrar sesión",
      "auth.email": "Correo electrónico",
      "auth.password": "Contraseña",
      "auth.confirmPassword": "Confirmar contraseña",
      "auth.forgot": "¿Olvidaste tu contraseña?",
      "auth.reset": "Restablecer contraseña",
      "auth.createAccount": "Crea tu cuenta",
      "auth.welcome": "Te damos la bienvenida de nuevo",
      "auth.resend": "Reenviar correo de confirmación",

      "common.cancel": "Cancelar",
      "common.confirm": "Confirmar",
      "common.close": "Cerrar",
      "common.save": "Guardar",
      "common.update": "Actualizar",
      "common.delete": "Eliminar",
      "common.rename": "Renombrar",
      "common.duplicate": "Duplicar",
      "common.download": "Descargar",
      "common.search": "Buscar",
      "common.loading": "Cargando...",
      "common.retry": "Intentar de nuevo",
      "common.language": "Idioma",
      "common.comingSoon": "Próximamente",

      "document.title": "Nombre del documento",
      "document.untitled": "CV sin título",
      "document.search": "Buscar currículums...",
      "document.clearSearch": "Borrar búsqueda",
      "document.noResults": "No hay currículums coincidentes",
      "document.edit": "Editar currículum",
      "document.pdf": "Descargar PDF",
      "document.rename": "Renombrar CV",
      "document.duplicate": "Duplicar CV",
      "document.delete": "Eliminar CV",
      "document.copy": "Copia",
      "document.updated": "Actualizado el {date}",
      "document.count": "Currículums: {count}",
      "document.results": "{count} de {total} currículums",
      "document.deleteWarning":
        "Esta acción no se puede deshacer.",
      "document.renameSuccess":
        "CV renombrado correctamente.",
      "document.duplicateSuccess":
        "CV duplicado correctamente.",
      "document.deleteSuccess":
        "CV eliminado correctamente.",
      "document.saveSuccess":
        "CV guardado correctamente.",
      "document.updateSuccess":
        "CV actualizado correctamente.",

      "sort.updatedDesc": "Actualizados recientemente",
      "sort.updatedAsc": "Actualizados hace más tiempo",
      "sort.createdDesc": "Más nuevos primero",
      "sort.createdAsc": "Más antiguos primero",
      "sort.titleAsc": "Nombre A–Z",
      "sort.titleDesc": "Nombre Z–A",

      "builder.saveAccount": "Guardar en mi cuenta",
      "builder.create": "Crear currículum",
      "builder.generate": "Generar CV",
      "builder.export": "Exportar CV en PDF",

      "dashboard.welcome": "¡Te damos la bienvenida de nuevo, {name}!",
      "dashboard.saved": "Currículums guardados",
      "dashboard.plan": "Plan actual",
      "dashboard.quickCreate": "Creación rápida de CV",
      "dashboard.emptyTitle": "Tu carrera comienza aquí",
      "dashboard.emptyDescription":
        "Crea tu primer currículum profesional y organiza todos tus documentos de carrera en un solo lugar.",

      "plan.free": "Gratis",
      "plan.pro": "Pro",
      "plan.premium": "Premium",
      "plan.monthly": "Mensual",
      "plan.yearly": "Anual",
      "plan.perMonth": "al mes",
      "plan.perYear": "al año",

      "status.error": "Se ha producido un error.",
      "status.saved": "Guardado correctamente.",
      "status.saving": "Guardando...",
      "status.loading": "Cargando...",
      "status.sessionExpired":
        "Tu sesión ha terminado. Inicia sesión nuevamente."

    }

  };

  /* LOCALE CONFIGURATION */

  const locales = Object.freeze({

    en: "en-GB",
    ro: "ro-RO",
    it: "it-IT",
    de: "de-DE",
    fr: "fr-FR",
    es: "es-ES"

  });

  /* LANGUAGE VALIDATION */

  function normalizeLanguage(value) {

    const code = String(value || "")
      .trim()
      .toLowerCase()
      .split("-")[0];

    return SUPPORTED_LANGUAGES.includes(code)
      ? code
      : DEFAULT_LANGUAGE;

  }

  /* SAFE PERSISTENT STORAGE */

  function readLanguage() {

    try {

      return normalizeLanguage(
        localStorage.getItem(STORAGE_KEY)
      );

    } catch {

      return DEFAULT_LANGUAGE;

    }

  }

  function persistLanguage(code) {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        code
      );

      return true;

    } catch {

      return false;

    }

  }

  /* APPLICATION STATE */

  let currentLanguage = readLanguage();

  let initialized = false;

  let scheduled = false;
  let languageChanging = false;

  /* TRANSLATION ENGINE */

  function translate(key, variables = {}) {

    const languageDictionary =
      dictionary[currentLanguage];

    const template =

      languageDictionary?.[key] ??

      dictionary.en[key] ??

      key;

    return String(template).replace(

      /\{([a-zA-Z0-9_]+)\}/g,

      (match, name) => {

        return Object.prototype.hasOwnProperty.call(
          variables,
          name
        )

          ? String(variables[name])

          : match;

      }

    );

  }

  /* SAFE DOM TRANSLATION */

  function applyTranslations(root = document) {

    const mappings = [

      ["data-wn-i18n", "textContent"],

      ["data-wn-i18n-placeholder", "placeholder"],

      ["data-wn-i18n-title", "title"],

      ["data-wn-i18n-aria", "aria-label"]

    ];

    for (const [attribute, target] of mappings) {

      const elements = Array.from(
        root.querySelectorAll(
          `[${attribute}]`
        )
      );

      if (
        root instanceof Element &&
        root.hasAttribute(attribute)
      ) {

        elements.unshift(root);

      }

      for (const element of elements) {

        const key =
          element.getAttribute(attribute);

        if (!key) continue;

        if (
          !Object.prototype.hasOwnProperty.call(
            dictionary.en,
            key
          )
        ) {

          continue;

        }

        const value = translate(key);

        if (target === "textContent") {

          /*
           * Text translation markers must
           * be attached to text-only elements.
           *
           * Protect icons and form controls.
           */

          if (element.children.length) {

            continue;

          }

          if (element.textContent !== value) {

            element.textContent = value;

          }

        } else {

          if (
            element.getAttribute(target) !== value
          ) {

            element.setAttribute(
              target,
              value
            );

          }

        }

      }

    }

  }

  /* LANGUAGE SELECTORS */

  function getLanguageSelectors() {

    return document.querySelectorAll(

      "select#language, " +

      "select[data-wn-language]"

    );

  }

  function synchronizeSelectors() {

    getLanguageSelectors().forEach(selector => {

      const available = Array.from(
        selector.options
      ).some(option =>

        option.value === currentLanguage

      );

      if (
        available &&
        selector.value !== currentLanguage
      ) {

        selector.value = currentLanguage;

      }

    });

  }

  /* LANGUAGE FLAG */

  function updateLanguageFlag() {

    const flag =
      document.getElementById(
        "wnLanguageFlag"
      );

    if (!flag) return;

    const value =
      LANGUAGE_FLAGS[currentLanguage];

    if (flag.textContent !== value) {

      flag.textContent = value;

    }

  }

  /* DOCUMENT LANGUAGE */

  function updateDocumentLanguage() {

    document.documentElement.lang =
      currentLanguage;

    document.documentElement.dataset.wnLanguage =
      currentLanguage;

  }

  /* APPLY CURRENT LANGUAGE */

  function render() {

    scheduled = false;

    updateDocumentLanguage();

    synchronizeSelectors();

    updateLanguageFlag();

    applyTranslations();

  }

  function scheduleRender() {

    if (scheduled) return;

    scheduled = true;

    queueMicrotask(() => {
      scheduled = false;
      applyTranslations();
    });

  }

  /* LANGUAGE CHANGE EVENT */

  function notifyLanguageChange(previous) {

    document.dispatchEvent(

      new CustomEvent(

        "worknely:languagechange",

        {

          detail: {

            language: currentLanguage,

            previousLanguage: previous,

            locale: locales[currentLanguage]

          }

        }

      )

    );

  }

  /* SET LANGUAGE */

  function setLanguage(value, options = {}) {

    if (languageChanging) {
      return currentLanguage;
    }

    const next = normalizeLanguage(value);
    const previous = currentLanguage;

    languageChanging = true;

    try {

    currentLanguage = next;

    if (options.persist !== false) {

      persistLanguage(next);

    }

    render();

    if (previous !== next) {

      notifyLanguageChange(previous);

      /*
       * Synchronize the existing V3.1
       * translation system when needed.
       */

      const legacySelector =
        document.getElementById("language");

      if (
        legacySelector &&
        options.source !== legacySelector
      ) {

        legacySelector.dispatchEvent(

          new Event("change", {
            bubbles: true
          })

        );

      }

    }

    return currentLanguage;

    } finally {
      languageChanging = false;
    }

  }

  /* LOCALIZED DATE FORMATTING */

  function formatDate(value, options = {}) {

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {

      return "";

    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {

      return "";

    }

    return new Intl.DateTimeFormat(

      locales[currentLanguage],

      {

        year: "numeric",

        month: "short",

        day: "numeric",

        ...options

      }

    ).format(date);

  }

  /* LOCALIZED NUMBER FORMATTING */

  function formatNumber(value, options = {}) {

    const number = Number(value);

    if (!Number.isFinite(number)) {

      return "";

    }

    return new Intl.NumberFormat(

      locales[currentLanguage],

      options

    ).format(number);

  }

  /* PUBLIC LOCALIZATION API */

  window.WorknelyLocalization = Object.freeze({

    version: VERSION,

    languages: SUPPORTED_LANGUAGES,

    names: LANGUAGE_NAMES,

    flags: LANGUAGE_FLAGS,

    getLanguage: () => currentLanguage,

    getLocale: () => locales[currentLanguage],

    setLanguage,

    t: translate,

    apply: applyTranslations,

    formatDate,

    formatNumber

  });

  /* LANGUAGE SELECTOR EVENTS */

  document.addEventListener(

    "change",

    event => {

      const selector = event.target;

      if (
        !(selector instanceof HTMLSelectElement)
      ) {

        return;

      }

      if (
        !selector.matches(
          "#language, [data-wn-language]"
        )
      ) {

        return;

      }

      const selected = selector.value;

      if (!SUPPORTED_LANGUAGES.includes(selected)) {
        return;
      }

      if (languageChanging) return;

      if (selected !== currentLanguage) {
        setLanguage(selected, {
          source: selector
        });
      }

    },

    true

  );

  /* CROSS-TAB SYNCHRONIZATION */

  window.addEventListener(

    "storage",

    event => {

      if (
        event.key !== STORAGE_KEY &&
        event.key !== null
      ) {

        return;

      }

      setLanguage(

        readLanguage(),

        {

          persist: false

        }

      );

    }

  );

  /* DYNAMIC CONTENT OBSERVER */

  function observeDynamicContent() {

    if (!document.body) return;

    const observer = new MutationObserver(

      mutations => {

        if (languageChanging) return;

        const hasNewElements =
          mutations.some(mutation =>

            Array.from(
              mutation.addedNodes
            ).some(node =>

              node.nodeType === 1

            )

          );

        if (hasNewElements) {

          scheduleRender();

        }

      }

    );

    observer.observe(

      document.body,

      {

        childList: true,

        subtree: true

      }

    );

  }

  /* INITIALIZATION */

  function initialize() {

    if (initialized) return;

    initialized = true;

    currentLanguage = readLanguage();

    render();

    observeDynamicContent();

    document.dispatchEvent(

      new CustomEvent(

        "worknely:localizationready",

        {

          detail: {

            version: VERSION,

            language: currentLanguage

          }

        }

      )

    );

  }

  /*
   * Initialize before the existing
   * multilingual interface whenever
   * the script is loaded before V3.1.
   */

  if (document.readyState === "loading") {

    document.addEventListener(

      "DOMContentLoaded",

      initialize,

      {

        once: true

      }

    );

  } else {

    initialize();

  }

  /* RESTORE LANGUAGE ON PAGE RETURN */

  window.addEventListener(

    "pageshow",

    () => {

      setLanguage(

        readLanguage(),

        {

          persist: false

        }

      );

    }

  );

})();

/*
 * END WORKNELY V7.18.3.4.1
 * International SaaS Localization Engine
 * WORKNELY — PEOPLE TECHNOLOGY
 */
