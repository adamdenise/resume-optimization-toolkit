
/*
 * WORKNELY V7.9.2
 * Personal SaaS Dashboard
 *
 * Supabase Authentication
 * Resume Storage
 * Dashboard Views
 * GitHub Pages Compatible
 *
 * V7.9.2:
 * - Removed duplicate Edit button
 * - Kept Edit in Resume Builder
 * - Kept Delete with confirmation
 * - Preserved resume creation
 * - Preserved Supabase operations
 * - Preserved logout and resume counting
 */

import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
  "https://xuyronnwsokfadnekeir.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_nr1qlZLiORejUM1JwVqciw_YRSDjnni";

const SITE_URL =
  "https://adamdenise.github.io/resume-optimization-toolkit/";

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

const loading =
  document.getElementById("loading");

const app =
  document.getElementById("app");

const welcome =
  document.getElementById("welcome");

const logoutButton =
  document.getElementById("logout");

const resumeForm =
  document.getElementById("resumeForm");

const resumeTitle =
  document.getElementById("resumeTitle");

const resumeCount =
  document.getElementById("resumeCount");

const resumeList =
  document.getElementById("resumeList");

const resumeStatus =
  document.getElementById("resumeStatus");

const saveButton =
  document.getElementById("saveResume");

const newButton =
  document.getElementById("newResume");

const fields = {
  fullName:
    document.getElementById("fullName"),

  professionalTitle:
    document.getElementById("professionalTitle"),

  contact:
    document.getElementById("contact"),

  education:
    document.getElementById("education"),

  summary:
    document.getElementById("summary"),

  experience:
    document.getElementById("experience"),

  skills:
    document.getElementById("skills")
};

/* APPLICATION STATE */

let currentUser = null;
let editingResumeId = null;
let savedResumes = [];
let isBusy = false;

/* HELPERS */

function setStatus(message) {
  if (resumeStatus) {
    resumeStatus.textContent = message;
  }
}

function setBusy(busy) {
  isBusy = busy;

  if (saveButton) {
    saveButton.disabled = busy;
  }

  if (newButton) {
    newButton.disabled = busy;
  }
}

function showApp() {
  loading.hidden = true;
  app.hidden = false;
}

function showLoading(message) {
  loading.hidden = false;
  loading.textContent = message;
  app.hidden = true;
}

function redirectToLogin() {
  window.location.replace(
    SITE_URL + "#worknelyAccount"
  );
}

function formatDate(date) {
  if (!date) return "Unknown date";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Unknown date";
  }

  return parsed.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric"
    }
  );
}

/* RESUME CONTENT */

function getResumeContent() {
  const content = {};

  for (const [key, element] of
    Object.entries(fields)) {

    content[key] = element
      ? element.value.trim()
      : "";
  }

  return content;
}

function fillResumeForm(content = {}) {
  for (const [key, element] of
    Object.entries(fields)) {

    if (!element) continue;

    element.value =
      typeof content[key] === "string"
        ? content[key]
        : "";
  }
}

function resetForm() {
  editingResumeId = null;

  resumeForm.reset();
  fillResumeForm({});

  saveButton.textContent =
    "Save Resume";

  setStatus(
    "Ready to create a new resume."
  );

  resumeTitle.focus();
}

/* RESUME BUILDER INTEGRATION */

function getBuilderEditURL(resumeId) {
  const url = new URL(
    "index.html",
    SITE_URL
  );

  url.searchParams.set(
    "edit",
    String(resumeId)
  );

  url.hash = "builder";

  return url.toString();
}

function openInResumeBuilder(id) {
  if (isBusy || !currentUser) return;

  const resume = savedResumes.find(
    item => String(item.id) === String(id)
  );

  if (!resume) {
    setStatus(
      "Resume not found. Please refresh your dashboard."
    );
    return;
  }

  window.location.assign(
    getBuilderEditURL(resume.id)
  );
}

/* RESUME CARDS */

function createResumeCard(resume) {
  const card =
    document.createElement("article");

  card.className = "resume-item";

  const info =
    document.createElement("div");

  const title =
    document.createElement("strong");

  title.textContent =
    resume.title || "Untitled Resume";

  const date =
    document.createElement("small");

  date.textContent =
    "Updated " +
    formatDate(resume.updated_at);

  info.append(title, date);

  const actions =
    document.createElement("div");

  actions.className = "actions";

  /* PRIMARY EDIT BUTTON */

  const builderButton =
    document.createElement("button");

  builderButton.type = "button";
  builderButton.className = "outline";

  builderButton.textContent =
    "Edit in Resume Builder ↗";

  builderButton.setAttribute(
    "aria-label",
    "Open " +
    (resume.title || "resume") +
    " in Resume Builder"
  );

  builderButton.addEventListener(
    "click",
    () => openInResumeBuilder(resume.id)
  );

  /* DELETE BUTTON */

  const deleteButton =
    document.createElement("button");

  deleteButton.type = "button";
  deleteButton.className = "outline";

  deleteButton.textContent = "Delete";

  deleteButton.setAttribute(
    "aria-label",
    "Delete " +
    (resume.title || "resume")
  );

  deleteButton.addEventListener(
    "click",
    () => deleteResume(resume.id)
  );

  actions.append(
    builderButton,
    deleteButton
  );

  card.append(info, actions);

  return card;
}

/* RENDER RESUMES */

function renderResumes() {
  resumeList.replaceChildren();

  resumeCount.textContent =
    String(savedResumes.length);

  if (!savedResumes.length) {
    const empty =
      document.createElement("p");

    empty.textContent =
      "No saved resumes yet. Create your first resume.";

    resumeList.appendChild(empty);
    return;
  }

  for (const resume of savedResumes) {
    resumeList.appendChild(
      createResumeCard(resume)
    );
  }
}

/* FETCH USER RESUMES */

async function loadResumes() {
  if (!currentUser) return false;

  setStatus("Loading your resumes...");

  const { data, error } = await supabase
    .from("resumes")
    .select(
      "id,title,content,created_at,updated_at"
    )
    .eq("user_id", currentUser.id)
    .order("updated_at", {
      ascending: false
    });

  if (error) {
    setStatus(
      "Unable to load resumes: " +
      error.message
    );
    return false;
  }

  savedResumes = data || [];

  renderResumes();
  setStatus("");

  return true;
}

/* SAVE OR UPDATE RESUME */

async function saveResume(event) {
  event.preventDefault();

  if (isBusy || !currentUser) return;

  const title = resumeTitle.value.trim();

  if (!title) {
    setStatus(
      "Please enter a resume title."
    );

    resumeTitle.focus();
    return;
  }

  setBusy(true);
  setStatus("Saving your resume...");

  const payload = {
    title,
    content: getResumeContent(),
    updated_at: new Date().toISOString()
  };

  try {
    let result;

    if (editingResumeId) {
      result = await supabase
        .from("resumes")
        .update(payload)
        .eq("id", editingResumeId)
        .eq("user_id", currentUser.id)
        .select("id")
        .single();
    } else {
      result = await supabase
        .from("resumes")
        .insert({
          ...payload,
          user_id: currentUser.id
        })
        .select("id")
        .single();
    }

    if (result.error) {
      throw result.error;
    }

    if (!result.data?.id) {
      throw new Error(
        "Save confirmation was not received."
      );
    }

    const wasEditing =
      Boolean(editingResumeId);

    editingResumeId = result.data.id;

    const refreshed =
      await loadResumes();

    setStatus(
      refreshed
        ? (
            wasEditing
              ? "Resume updated successfully."
              : "Resume saved successfully."
          )
        : (
            wasEditing
              ? "Resume updated, but the list could not refresh."
              : "Resume saved, but the list could not refresh."
          )
    );

    saveButton.textContent =
      "Update Resume";

  } catch (error) {
    setStatus(
      "Unable to save resume: " +
      (error.message || "Unknown error")
    );

  } finally {
    setBusy(false);
  }
}

/* DELETE RESUME */

async function deleteResume(id) {
  if (isBusy || !currentUser) return;

  const resume = savedResumes.find(
    item => item.id === id
  );

  if (!resume) return;

  const confirmed = window.confirm(
    'Delete "' +
    resume.title +
    '" permanently?'
  );

  if (!confirmed) return;

  setBusy(true);
  setStatus("Deleting resume...");

  try {
    const { data, error } = await supabase
      .from("resumes")
      .delete()
      .eq("id", id)
      .eq("user_id", currentUser.id)
      .select("id");

    if (error) throw error;

    if (!data || data.length === 0) {
      throw new Error(
        "Resume was not deleted. Check permissions."
      );
    }

    if (editingResumeId === id) {
      resetForm();
    }

    const refreshed =
      await loadResumes();

    setStatus(
      refreshed
        ? "Resume deleted successfully."
        : "Resume deleted, but the list could not refresh."
    );

  } catch (error) {
    setStatus(
      "Unable to delete resume: " +
      (error.message || "Unknown error")
    );

  } finally {
    setBusy(false);
  }
}

/* LOG OUT */

async function logOut() {
  if (isBusy) return;

  logoutButton.disabled = true;

  try {
    const { error } =
      await supabase.auth.signOut();

    if (error) throw error;

    currentUser = null;
    savedResumes = [];

    showLoading("Signing out...");
    redirectToLogin();

  } catch (error) {
    logoutButton.disabled = false;

    setStatus(
      "Unable to sign out: " +
      (error.message || "Unknown error")
    );
  }
}

/* INITIALIZATION */

async function initializeDashboard() {
  showLoading(
    "Checking your Worknely session..."
  );

  try {
    const { data, error } =
      await supabase.auth.getUser();

    if (error || !data?.user) {
      redirectToLogin();
      return;
    }

    currentUser = data.user;

    welcome.textContent =
      "Welcome back, " +
      (currentUser.email || "Worknely user") +
      "!";

    showApp();

    await loadResumes();

  } catch (error) {
    showLoading(
      "Unable to verify your session. Please try again."
    );
  }
}

/* EVENTS */

resumeForm.addEventListener(
  "submit",
  saveResume
);

newButton.addEventListener(
  "click",
  resetForm
);

logoutButton.addEventListener(
  "click",
  logOut
);

supabase.auth.onAuthStateChange(
  event => {
    if (
      event === "SIGNED_OUT" &&
      currentUser
    ) {
      currentUser = null;
      redirectToLogin();
    }
  }
);

initializeDashboard();
