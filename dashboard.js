
/*
 * WORKNELY V7.11.1
 * Premium Resume Workspace
 * Compact UI Edition
 *
 * Supabase Authentication
 * Professional Document Management
 * Compact Resume Cards
 * Icon Only Delete Action
 * Accessible SVG Icons
 * Quick Create Resume
 * Empty State Experience
 *
 * Compatible with GitHub Pages.
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

const workspaceResumeCount =
  document.getElementById("workspaceResumeCount");

const resumeList =
  document.getElementById("resumeList");

const resumeStatus =
  document.getElementById("resumeStatus");

const saveButton =
  document.getElementById("saveResume");

const newButton =
  document.getElementById("newResume");

const quickCreate =
  document.getElementById("quickCreate");

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

/* STATUS MANAGEMENT */

function setStatus(message, type = "info") {
  if (!resumeStatus) return;

  resumeStatus.textContent = message;

  if (message) {
    resumeStatus.dataset.status = type;
  } else {
    delete resumeStatus.dataset.status;
  }
}

/* BUSY STATE */

function setBusy(busy) {
  isBusy = busy;

  if (saveButton) {
    saveButton.disabled = busy;
  }

  if (newButton) {
    newButton.disabled = busy;
  }

  if (logoutButton) {
    logoutButton.disabled = busy;
  }

  if (resumeList) {
    resumeList
      .querySelectorAll("button")
      .forEach(button => {
        button.disabled = busy;
      });
  }

  if (resumeForm) {
    resumeForm.setAttribute(
      "aria-busy",
      String(busy)
    );
  }
}

/* SESSION DISPLAY */

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

/* DATE FORMATTING */

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

/* SVG ICON SYSTEM */

const SVG_NS =
  "http://www.w3.org/2000/svg";

function createIcon(name = "document") {
  const svg =
    document.createElementNS(
      SVG_NS,
      "svg"
    );

  svg.setAttribute(
    "viewBox",
    "0 0 24 24"
  );

  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.7");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

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
    ]

  };

  const selected =
    paths[name] || paths.document;

  selected.forEach(value => {

    const path =
      document.createElementNS(
        SVG_NS,
        "path"
      );

    path.setAttribute("d", value);

    svg.appendChild(path);

  });

  return svg;
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

/* RESET QUICK CREATE FORM */

function resetForm(options = {}) {

  const {
    focus = true,
    announce = true
  } = options;

  editingResumeId = null;

  resumeForm.reset();

  fillResumeForm({});

  saveButton.textContent =
    "Save Resume";

  if (announce) {

    setStatus(
      "Ready to create a new resume.",
      "info"
    );

  }

  if (focus) {

    if (quickCreate) {
      quickCreate.open = true;
    }

    resumeTitle.focus();

  }
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

function getNewResumeURL() {

  const url = new URL(
    "index.html",
    SITE_URL
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
      "Resume not found. Please refresh your dashboard.",
      "error"
    );

    return;
  }

  window.location.assign(
    getBuilderEditURL(resume.id)
  );
}

/* V7.11.1 COMPACT RESUME CARDS */

function createResumeCard(resume) {

  const card =
    document.createElement("article");

  card.className = "resume-item";

  const displayTitle =
    resume.title || "Untitled Resume";

  const info =
    document.createElement("div");

  info.className = "resume-info";

  /* DOCUMENT ICON */

  const icon =
    document.createElement("span");

  icon.className = "resume-icon";

  icon.appendChild(
    createIcon("document")
  );

  /* DOCUMENT DETAILS */

  const details =
    document.createElement("div");

  details.className = "resume-details";

  const title =
    document.createElement("strong");

  title.textContent = displayTitle;

  const date =
    document.createElement("small");

  date.textContent =
    "Updated " +
    formatDate(
      resume.updated_at ||
      resume.created_at
    );

  details.append(title, date);

  info.append(icon, details);

  /* DOCUMENT ACTIONS */

  const actions =
    document.createElement("div");

  actions.className = "actions";

  /* PRIMARY EDIT ACTION */

  const builderButton =
    document.createElement("button");

  builderButton.type = "button";

  builderButton.className =
    "outline resume-edit-button";

  builderButton.disabled = isBusy;

  builderButton.textContent =
    "Edit in Resume Builder ↗";

  builderButton.setAttribute(
    "aria-label",
    "Open " +
    displayTitle +
    " in Resume Builder"
  );

  builderButton.addEventListener(
    "click",
    () => openInResumeBuilder(resume.id)
  );

  /* V7.11.1 ICON ONLY DELETE ACTION */

  const deleteButton =
    document.createElement("button");

  deleteButton.type = "button";

  deleteButton.className =
    "outline resume-delete-button";

  deleteButton.disabled = isBusy;

  /*
   * Only the trash icon is rendered.
   * No visible Delete text.
   */

  deleteButton.appendChild(
    createIcon("trash")
  );

  /*
   * Accessibility label and tooltip.
   */

  deleteButton.setAttribute(
    "aria-label",
    "Delete " + displayTitle
  );

  deleteButton.title =
    "Delete resume";

  deleteButton.addEventListener(
    "click",
    () => deleteResume(resume.id)
  );

  /* ASSEMBLE DOCUMENT CARD */

  actions.append(
    builderButton,
    deleteButton
  );

  card.append(info, actions);

  return card;
}

/* EMPTY STATE */

function createEmptyState() {

  const empty =
    document.createElement("div");

  empty.className = "resume-empty";

  const icon =
    document.createElement("div");

  icon.className =
    "resume-empty-icon";

  icon.appendChild(
    createIcon("filePlus")
  );

  const heading =
    document.createElement("h3");

  heading.textContent =
    "Your career starts here";

  const description =
    document.createElement("p");

  description.textContent =
    "Create your first professional resume " +
    "and keep your career documents " +
    "organized in one place.";

  const createButton =
    document.createElement("a");

  createButton.className = "button";

  createButton.href =
    getNewResumeURL();

  createButton.append(
    createIcon("plus"),
    document.createTextNode(
      "Create Your First Resume"
    )
  );

  empty.append(
    icon,
    heading,
    description,
    createButton
  );

  return empty;
}

/* RESUME COUNTERS */

function updateResumeCounters() {

  const count =
    String(savedResumes.length);

  if (resumeCount) {

    resumeCount.textContent = count;

  }

  if (workspaceResumeCount) {

    workspaceResumeCount.textContent =
      count;

  }
}

/* RENDER RESUME WORKSPACE */

function renderResumes() {

  resumeList.replaceChildren();

  updateResumeCounters();

  if (!savedResumes.length) {

    resumeList.appendChild(
      createEmptyState()
    );

    return;
  }

  const fragment =
    document.createDocumentFragment();

  for (const resume of savedResumes) {

    fragment.appendChild(
      createResumeCard(resume)
    );

  }

  resumeList.appendChild(fragment);
}

/* FETCH USER RESUMES */

async function loadResumes() {

  if (!currentUser) return false;

  setStatus(
    "Loading your resumes...",
    "info"
  );

  try {

    const { data, error } = await supabase
      .from("resumes")
      .select(
        "id,title,content,created_at,updated_at"
      )
      .eq("user_id", currentUser.id)
      .order("updated_at", {
        ascending: false
      });

    if (error) throw error;

    savedResumes = data || [];

    renderResumes();

    setStatus("");

    return true;

  } catch (error) {

    setStatus(
      "Unable to load resumes: " +
      (error.message || "Unknown error"),
      "error"
    );

    return false;

  }
}

/* SAVE OR UPDATE RESUME */

async function saveResume(event) {

  event.preventDefault();

  if (isBusy || !currentUser) return;

  const title =
    resumeTitle.value.trim();

  if (!title) {

    setStatus(
      "Please enter a resume title.",
      "error"
    );

    resumeTitle.focus();

    return;
  }

  setBusy(true);

  setStatus(
    "Saving your resume...",
    "info"
  );

  const payload = {
    title,
    content: getResumeContent(),
    updated_at:
      new Date().toISOString()
  };

  try {

    let result;

    const wasEditing =
      Boolean(editingResumeId);

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

    editingResumeId =
      result.data.id;

    const refreshed =
      await loadResumes();

    saveButton.textContent =
      "Update Resume";

    if (refreshed) {

      setStatus(
        wasEditing
          ? "Resume updated successfully."
          : "Resume saved successfully.",
        "success"
      );

      if (quickCreate) {

        quickCreate.open = false;

      }

    } else {

      setStatus(
        "Resume saved, but the list could not refresh. " +
        "Please reload your dashboard.",
        "info"
      );

    }

  } catch (error) {

    setStatus(
      "Unable to save resume: " +
      (error.message || "Unknown error"),
      "error"
    );

  } finally {

    setBusy(false);

  }
}

/* DELETE RESUME WITH CONFIRMATION */

async function deleteResume(id) {

  if (isBusy || !currentUser) return;

  const resume = savedResumes.find(
    item => String(item.id) === String(id)
  );

  if (!resume) return;

  const confirmed = window.confirm(
    'Delete "' +
    (resume.title || "Untitled Resume") +
    '" permanently?'
  );

  if (!confirmed) return;

  setBusy(true);

  setStatus(
    "Deleting resume...",
    "info"
  );

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

    if (
      editingResumeId &&
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

    renderResumes();

    const refreshed =
      await loadResumes();

    setStatus(
      refreshed
        ? "Resume deleted successfully."
        : "Resume deleted, but the list could not refresh.",
      refreshed
        ? "success"
        : "info"
    );

  } catch (error) {

    setStatus(
      "Unable to delete resume: " +
      (error.message || "Unknown error"),
      "error"
    );

  } finally {

    setBusy(false);

  }
}

/* LOG OUT */

async function logOut() {

  if (isBusy) return;

  setBusy(true);

  try {

    const { error } =
      await supabase.auth.signOut();

    if (error) throw error;

    currentUser = null;

    savedResumes = [];

    showLoading("Signing out...");

    redirectToLogin();

  } catch (error) {

    setBusy(false);

    const message =
      "Unable to sign out: " +
      (error.message || "Unknown error");

    setStatus(message, "error");

    window.alert(message);

  }
}

/* DASHBOARD INITIALIZATION */

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
      (currentUser.email ||
        "Worknely user") +
      "!";

    showApp();

    setBusy(true);

    try {

      await loadResumes();

    } finally {

      setBusy(false);

    }

  } catch (error) {

    showLoading(
      "Unable to verify your session. " +
      "Please try again."
    );

  }
}

/* APPLICATION EVENTS */

resumeForm.addEventListener(
  "submit",
  saveResume
);

newButton.addEventListener(
  "click",
  () => resetForm()
);

logoutButton.addEventListener(
  "click",
  logOut
);

/* SUPABASE AUTH STATE */

supabase.auth.onAuthStateChange(
  event => {

    if (
      event === "SIGNED_OUT" &&
      currentUser
    ) {

      currentUser = null;

      savedResumes = [];

      showLoading("Signing out...");

      redirectToLogin();

    }

  }
);

/* START WORKNELY V7.11.1 */

initializeDashboard();
