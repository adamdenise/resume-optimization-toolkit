/*
 * WORKNELY V7.14
 * Advanced Resume Persistence Engine
 *
 * Persistent Document Naming
 * Smart Resume Updates
 * Duplicate Document Compatibility
 * Supabase Authentication
 * Account Ownership Validation
 * Safe Resume Loading
 * Save Protection
 * Success Celebration Integration
 *
 * Compatible with:
 * - dashboard.html V7.14
 * - dashboard.css V7.14
 * - dashboard.js V7.14
 * - worknely-auth.js V7.6
 * - Worknely Resume Builder
 * - Worknely GitHub Pages
 */

import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

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
  new URLSearchParams(
    window.location.search
  );

let editingResumeId =
  params.get("edit") || null;

let editingResumeTitle = null;

let editingOwnerId = null;

let resumeLoaded =
  !editingResumeId;

let isBusy = false;

let isLoading = false;

let initialized = false;

/* STATUS MANAGEMENT */

function showStatus(
  message,
  type = "info"
) {

  if (!statusElement) return;

  statusElement.textContent =
    message || "";

  if (message) {

    statusElement.dataset.status =
      type;

    statusElement.dataset.wnStatus =
      type;

  } else {

    delete statusElement.dataset.status;

    delete statusElement.dataset.wnStatus;

  }

}

function getErrorMessage(error) {

  return error?.message ||
    "Unknown error";

}

/* SAVE BUTTON STATE */

function syncSaveButton() {

  if (!saveButton) return;

  const disabled =
    isBusy || isLoading;

  saveButton.disabled =
    disabled;

  saveButton.setAttribute(
    "aria-busy",
    String(disabled)
  );

}

/* RESUME DATA COLLECTION */

function collectResume() {

  const content = {};

  for (const [key, id] of
    Object.entries(builderFields)) {

    const input =
      document.getElementById(id);

    content[key] =
      input
        ? input.value.trim()
        : "";

  }

  return content;

}

/* VALIDATE RESUME CONTENT */

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

/* SAFE CONTENT NORMALIZATION */

function normalizeContent(content) {

  if (
    !content ||
    typeof content !== "object" ||
    Array.isArray(content)
  ) {

    return {};

  }

  return content;

}

/* RESTORE SAVED RESUME */

function fillBuilder(content = {}) {

  const safeContent =
    normalizeContent(content);

  for (const [key, id] of
    Object.entries(builderFields)) {

    const input =
      document.getElementById(id);

    if (!input) continue;

    input.value =
      typeof safeContent[key] === "string"
        ? safeContent[key]
        : "";

  }

}

/* DOCUMENT TITLE MANAGEMENT */

/*
 * Document names and professional
 * resume titles are separate values.
 *
 * Existing document names are never
 * regenerated during content updates.
 */

function generateDocumentTitle(content) {

  const professionalTitle =
    String(
      content.professionalTitle || ""
    ).trim();

  const fullName =
    String(
      content.fullName || ""
    ).trim();

  let title;

  if (professionalTitle) {

    title = professionalTitle;

  } else if (fullName) {

    title = fullName + " Resume";

  } else {

    title = "My Resume";

  }

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

/* URL & DOCUMENT STATE */

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

      url.searchParams.delete(
        "edit"
      );

    }

    window.history.replaceState(
      window.history.state,
      "",
      url.pathname +
      url.search +
      url.hash
    );

  } catch (error) {

    console.warn(
      "Worknely URL update warning:",
      error
    );

  }

}

/* AUTHENTICATED USER */

async function getAuthenticatedUser() {

  const {
    data,
    error
  } = await supabase.auth.getUser();

  if (error || !data?.user) {

    return null;

  }

  return data.user;

}

/* GENERATE RESUME PREVIEW */

function refreshResumePreview() {

  const generateButton =
    document.getElementById(
      "buildResume"
    );

  if (generateButton) {

    generateButton.click();

  }

}

/* LOAD EXISTING DOCUMENT */

async function loadExistingResume() {

  if (
    !editingResumeId ||
    isLoading ||
    isBusy
  ) {

    return;

  }

  const requestedId =
    editingResumeId;

  resumeLoaded = false;

  isLoading = true;

  syncSaveButton();

  showStatus(
    "Loading your saved resume...",
    "info"
  );

  try {

    const user =
      await getAuthenticatedUser();

    if (!user) {

      showStatus(
        "Please log in to open this saved resume.",
        "error"
      );

      return;

    }

    const {
      data,
      error
    } = await supabase

      .from("resumes")

      .select(
        "id,title,content"
      )

      .eq(
        "id",
        requestedId
      )

      .eq(
        "user_id",
        user.id
      )

      .single();

    if (error) {

      throw error;

    }

    if (!data?.id) {

      throw new Error(
        "Resume not found."
      );

    }

    if (
      editingResumeId !== requestedId
    ) {

      return;

    }

    /* VERIFY SESSION AGAIN */

    const verifiedUser =
      await getAuthenticatedUser();

    if (
      !verifiedUser ||
      verifiedUser.id !== user.id
    ) {

      throw new Error(
        "Your session has changed. " +
        "Please log in again."
      );

    }

    /* RESTORE DOCUMENT CONTENT */

    fillBuilder(
      normalizeContent(data.content)
    );

    /* PRESERVE DOCUMENT IDENTITY */

    setEditingResume(
      data.id,
      data.title,
      user.id
    );

    /* GENERATE BUILDER PREVIEW */

    refreshResumePreview();

    showStatus(
      "Resume loaded successfully. " +
      "Edit your information and select " +
      "Save to My Account to update it.",
      "success"
    );

  } catch (error) {

    resumeLoaded = false;

    console.error(
      "Worknely resume loading error:",
      error
    );

    showStatus(
      "Unable to open resume: " +
      getErrorMessage(error),
      "error"
    );

  } finally {

    isLoading = false;

    syncSaveButton();

  }

}

/* SAVE NEW DOCUMENT */

async function createResume(
  userId,
  content
) {

  const title =
    generateDocumentTitle(content);

  const payload = {

    user_id: userId,

    title,

    content,

    updated_at:
      new Date().toISOString()

  };

  const result = await supabase

    .from("resumes")

    .insert(payload)

    .select(
      "id,title"
    )

    .single();

  if (result.error) {

    throw result.error;

  }

  if (!result.data?.id) {

    throw new Error(
      "Save confirmation was not received."
    );

  }

  return result.data;

}

/* UPDATE EXISTING DOCUMENT */

/*
 * IMPORTANT V7.14:
 *
 * The title column is deliberately
 * excluded from the update payload.
 *
 * This preserves:
 *
 * - Custom document names
 * - Renamed documents
 * - Duplicate document names
 * - Names changed in another tab
 *
 * Only resume content and the
 * updated_at timestamp are modified.
 */

async function updateResume(
  resumeId,
  userId,
  content
) {

  const payload = {

    content,

    updated_at:
      new Date().toISOString()

  };

  const result = await supabase

    .from("resumes")

    .update(payload)

    .eq(
      "id",
      resumeId
    )

    .eq(
      "user_id",
      userId
    )

    .select(
      "id,title"
    )

    .single();

  if (result.error) {

    throw result.error;

  }

  if (!result.data?.id) {

    throw new Error(
      "Update confirmation was not received."
    );

  }

  return result.data;

}

/* SAVE OR UPDATE CONTROLLER */

async function saveToAccount(event) {

  if (event) {

    event.preventDefault();

  }

  if (
    !saveButton ||
    isBusy ||
    isLoading
  ) {

    return;

  }

  /* BLOCK UNSAFE UPDATES */

  if (
    editingResumeId &&
    !resumeLoaded
  ) {

    showStatus(
      "The saved resume could not be loaded. " +
      "Please return to My Dashboard " +
      "and try again.",
      "error"
    );

    return;

  }

  const content =
    collectResume();

  if (!hasResumeContent(content)) {

    showStatus(
      "Please complete your resume before saving.",
      "error"
    );

    return;

  }

  const targetId =
    editingResumeId;

  const wasEditing =
    Boolean(targetId);

  isBusy = true;

  syncSaveButton();

  showStatus(
    wasEditing
      ? "Updating your resume..."
      : "Saving your resume...",
    "info"
  );

  try {

    /* VERIFY AUTHENTICATION */

    const user =
      await getAuthenticatedUser();

    if (!user) {

      showStatus(
        "Please log in to save your resume. " +
        "Open My Account to sign in.",
        "error"
      );

      return;

    }

    /* VERIFY DOCUMENT OWNERSHIP */

    if (
      wasEditing &&
      editingOwnerId !== user.id
    ) {

      showStatus(
        "This resume belongs to a different " +
        "session. Please reopen it from " +
        "My Dashboard.",
        "error"
      );

      return;

    }

    let savedDocument;

    /* EXISTING DOCUMENT */

    if (wasEditing) {

      savedDocument =
        await updateResume(
          targetId,
          user.id,
          content
        );

    } else {

      /* NEW DOCUMENT */

      savedDocument =
        await createResume(
          user.id,
          content
        );

    }

    /* VERIFY SESSION AFTER SAVE */

    const verifiedUser =
      await getAuthenticatedUser();

    if (
      !verifiedUser ||
      verifiedUser.id !== user.id
    ) {

      resumeLoaded = false;

      showStatus(
        "The save was confirmed, but your " +
        "session has changed. Please reopen " +
        "My Dashboard.",
        "info"
      );

      return;

    }

    /* STORE CONFIRMED DOCUMENT IDENTITY */

    setEditingResume(
      savedDocument.id,
      savedDocument.title,
      user.id
    );

    /* SUCCESS STATUS */

    if (wasEditing) {

      showStatus(
        "Resume updated successfully! " +
        "Open My Dashboard to view your changes.",
        "success"
      );

    } else {

      showStatus(
        "Resume saved successfully! " +
        "Open My Dashboard to view it.",
        "success"
      );

    }

    /* CELEBRATION ANIMATION */

    celebrateSaveSuccess();

  } catch (error) {

    console.error(
      "Worknely resume save error:",
      error
    );

    showStatus(
      "Unable to save resume: " +
      getErrorMessage(error),
      "error"
    );

  } finally {

    isBusy = false;

    syncSaveButton();

  }

}

/* AUTHENTICATION STATE PROTECTION */

supabase.auth.onAuthStateChange(

  event => {

    if (event === "SIGNED_OUT") {

      if (editingResumeId) {

        resumeLoaded = false;

        editingOwnerId = null;

        editingResumeTitle = null;

        fillBuilder({});

        const preview =
          document.getElementById(
            "builderPreview"
          );

        if (preview) {

          preview.textContent = "";

        }

        showStatus(
          "Your session has ended. " +
          "Please log in to reopen this resume.",
          "info"
        );

      }

    }

    /*
     * Defer the database request outside
     * the Supabase authentication callback.
     */

    if (
      event === "SIGNED_IN" &&
      editingResumeId &&
      !resumeLoaded &&
      !isLoading &&
      !isBusy
    ) {

      window.setTimeout(
        () => {

          loadExistingResume();

        },
        0
      );

    }

  }

);

/* INITIALIZATION */

function initializePersistenceEngine() {

  if (initialized) {

    return;

  }

  initialized = true;

  if (saveButton) {

    saveButton.addEventListener(
      "click",
      saveToAccount
    );

  }

  syncSaveButton();

  if (editingResumeId) {

    loadExistingResume();

  }

}

/* START WORKNELY V7.14 */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializePersistenceEngine,
    {
      once: true
    }
  );

} else {

  initializePersistenceEngine();

}

/*
 * END WORKNELY V7.14
 *
 * Advanced Resume Persistence Engine
 * Persistent Document Naming
 * People Technology
 */
