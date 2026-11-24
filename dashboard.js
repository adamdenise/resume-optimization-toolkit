/*
 * WORKNELY V7.14
 * Advanced Document Management Engine
 *
 * Supabase Authentication
 * Smart Search & Sorting
 * Document Action Menu
 * Rename & Duplicate Resume
 * Printable PDF Export
 * Custom Delete Confirmation
 * Compact Quick Create
 * Mobile First SaaS Workspace
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

const $ = id =>
  document.getElementById(id);

const loading = $("loading");
const app = $("app");
const welcome = $("welcome");
const logoutButton = $("logout");

const resumeForm = $("resumeForm");
const resumeTitle = $("resumeTitle");
const resumeCount = $("resumeCount");
const workspaceResumeCount =
  $("workspaceResumeCount");

const resumeList = $("resumeList");
const resumeStatus = $("resumeStatus");

const saveButton = $("saveResume");
const newButton = $("newResume");
const quickCreate = $("quickCreate");

/* SEARCH & SORT */

const searchInput = $("wnResumeSearch");
const sortInput = $("wnResumeSort");
const clearSearch = $("wnClearSearch");
const resetSearch = $("wnResetSearch");
const searchResultCount =
  $("wnSearchResultCount");

const noSearchResults =
  $("wnNoSearchResults");

/* RENAME DIALOG */

const renameDialog = $("wnRenameDialog");
const renameForm = $("wnRenameForm");
const renameInput = $("wnRenameInput");
const renameStatus = $("wnRenameStatus");
const renameCancel = $("wnRenameCancel");
const renameConfirm = $("wnRenameConfirm");

/* DUPLICATE DIALOG */

const duplicateDialog =
  $("wnDuplicateDialog");

const duplicateForm =
  $("wnDuplicateForm");

const duplicateInput =
  $("wnDuplicateInput");

const duplicateStatus =
  $("wnDuplicateStatus");

const duplicateCancel =
  $("wnDuplicateCancel");

const duplicateConfirm =
  $("wnDuplicateConfirm");

/* DELETE DIALOG */

const deleteDialog = $("wnDeleteDialog");

const deleteResumeName =
  $("wnDeleteResumeName");

const deleteStatus = $("wnDeleteStatus");
const deleteCancel = $("wnDeleteCancel");
const deleteConfirm = $("wnDeleteConfirm");

/* RESUME FIELDS */

const fields = {
  fullName: $("fullName"),
  professionalTitle: $("professionalTitle"),
  contact: $("contact"),
  education: $("education"),
  summary: $("summary"),
  experience: $("experience"),
  skills: $("skills")
};

/* APPLICATION STATE */

let currentUser = null;
let editingResumeId = null;
let savedResumes = [];
let isBusy = false;
let resumesLoaded = false;

let selectedRenameId = null;
let selectedDuplicateId = null;
let selectedDeleteId = null;

/* STATUS MANAGEMENT */

function setStatus(message, type = "info") {

  resumeStatus.textContent = message;

  if (message) {
    resumeStatus.dataset.status = type;
  } else {
    delete resumeStatus.dataset.status;
  }

}

function setDialogStatus(element, message) {

  if (element) {
    element.textContent = message || "";
  }

}

function errorMessage(error) {

  return error?.message || "Unknown error";

}

/* BUSY STATE */

function setBusy(busy) {

  isBusy = busy;

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

    if (element) {
      element.disabled = busy;
    }

  });

  resumeList
    .querySelectorAll("button")
    .forEach(button => {
      button.disabled = busy;
    });

  resumeForm.setAttribute(
    "aria-busy",
    String(busy)
  );

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

/* DOCUMENT UTILITIES */

function findResume(id) {

  return savedResumes.find(
    item => String(item.id) === String(id)
  );

}

function getDocumentTitle(resume) {

  return String(
    resume?.title || "Untitled Resume"
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
    SVG_NS,
    "svg"
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

    more: [
      "M5 12h.01",
      "M12 12h.01",
      "M19 12h.01"
    ]

  };

  const selected =
    paths[name] || paths.document;

  if (name === "more") {

    [5, 12, 19].forEach(x => {

      const circle =
        document.createElementNS(
          SVG_NS,
          "circle"
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

/* BUTTON FACTORY */

function createButton(
  className,
  label,
  iconName,
  handler,
  iconOnly = false
) {

  const button =
    document.createElement("button");

  button.type = "button";
  button.className = className;
  button.disabled = isBusy;

  button.setAttribute(
    "aria-label",
    label
  );

  button.title = label;

  if (iconName) {

    button.appendChild(
      createIcon(iconName)
    );

  }

  if (!iconOnly) {

    button.appendChild(
      document.createTextNode(label)
    );

  }

  button.addEventListener(
    "click",
    handler
  );

  return button;

}

/* RESUME CONTENT */

function getResumeContent() {

  const content = {};

  for (const [key, element] of
    Object.entries(fields)) {

    content[key] =
      element?.value.trim() || "";

  }

  return content;

}

function fillResumeForm(content = {}) {

  for (const [key, element] of
    Object.entries(fields)) {

    if (!element) continue;

    element.value =
      typeof content?.[key] === "string"
        ? content[key]
        : "";

  }

}

/* QUICK CREATE RESET */

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

    quickCreate.open = true;
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

  const resume = findResume(id);

  if (!resume) {

    setStatus(
      "Resume not found. Please refresh.",
      "error"
    );

    return;

  }

  window.location.assign(
    getBuilderEditURL(resume.id)
  );

}

/* SMART SEARCH */

function getFilteredResumes() {

  const query = normalizeSearch(
    searchInput.value
  );

  const words = query
    .split(/\s+/)
    .filter(Boolean);

  let results = savedResumes.filter(
    resume => {

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

    }
  );

  /* SMART SORTING */

  const sort = sortInput.value;

  results.sort((a, b) => {

    switch (sort) {

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
            undefined,
            { sensitivity: "base" }
          );

      case "title-desc":

        return getDocumentTitle(b)
          .localeCompare(
            getDocumentTitle(a),
            undefined,
            { sensitivity: "base" }
          );

      case "updated-desc":
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

/* CLEAR SEARCH */

function clearDocumentSearch() {

  searchInput.value = "";

  renderResumes();

  searchInput.focus();

}

/* DOCUMENT MENU MANAGEMENT */

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

      const wasOpen =
        panel && !panel.hidden;

      if (panel) panel.hidden = true;

      if (button) {

        button.setAttribute(
          "aria-expanded",
          "false"
        );

        if (restoreFocus && wasOpen) {
          button.focus();
        }

      }

    });

}

function createDocumentMenu(resume) {

  const wrapper =
    document.createElement("div");

  wrapper.className =
    "wn-document-menu";

  const panel =
    document.createElement("div");

  panel.className =
    "wn-document-menu-panel";

  panel.id =
    "wn-menu-" + String(resume.id);

  panel.hidden = true;

  const trigger = createButton(
    "outline wn-document-menu-button",
    "More actions for " +
      getDocumentTitle(resume),
    "more",
    event => {

      event.stopPropagation();

      if (isBusy) return;

      const wasOpen = !panel.hidden;

      closeDocumentMenus();

      if (!wasOpen) {

        panel.hidden = false;

        trigger.setAttribute(
          "aria-expanded",
          "true"
        );

        const first =
          panel.querySelector("button");

        first?.focus();

      }

    },
    true
  );

  trigger.setAttribute(
    "aria-expanded",
    "false"
  );

  trigger.setAttribute(
    "aria-controls",
    panel.id
  );

  function menuAction(
    label,
    icon,
    handler,
    danger = false
  ) {

    return createButton(
      danger ? "wn-danger-action" : "",
      label,
      icon,
      () => {

        closeDocumentMenus(true);
        handler(resume.id);

      }
    );

  }

  const rename = menuAction(
    "Rename",
    "rename",
    openRenameDialog
  );

  const duplicate = menuAction(
    "Duplicate",
    "duplicate",
    openDuplicateDialog
  );

  const download = menuAction(
    "Download PDF",
    "download",
    downloadResumePDF
  );

  const divider =
    document.createElement("div");

  divider.className =
    "wn-document-menu-divider";

  divider.setAttribute(
    "aria-hidden",
    "true"
  );

  const remove = menuAction(
    "Delete resume",
    "trash",
    openDeleteDialog,
    true
  );

  panel.append(
    rename,
    duplicate,
    download,
    divider,
    remove
  );

  wrapper.append(trigger, panel);

  return wrapper;

}

/* V7.14 DOCUMENT CARDS */

function createResumeCard(resume) {

  const card =
    document.createElement("article");

  card.className = "resume-item";

  card.dataset.resumeId =
    String(resume.id);

  const info =
    document.createElement("div");

  info.className = "resume-info";

  const icon =
    document.createElement("span");

  icon.className = "resume-icon";

  icon.appendChild(
    createIcon("document")
  );

  const details =
    document.createElement("div");

  details.className = "resume-details";

  const title =
    document.createElement("strong");

  title.textContent =
    getDocumentTitle(resume);

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

  const actions =
    document.createElement("div");

  actions.className = "actions";

  const editButton = createButton(
    "outline resume-edit-button",
    "Edit in Resume Builder ↗",
    null,
    () => openInResumeBuilder(resume.id)
  );

  editButton.setAttribute(
    "aria-label",
    "Edit " + getDocumentTitle(resume)
  );

  const pdfButton = createButton(
    "outline wn-document-pdf-button",
    "Download PDF",
    "download",
    () => downloadResumePDF(resume.id),
    true
  );

  const documentMenu =
    createDocumentMenu(resume);

  actions.append(
    editButton,
    pdfButton,
    documentMenu
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

  icon.className = "resume-empty-icon";

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

/* DOCUMENT COUNTERS */

function updateResumeCounters() {

  const count =
    String(savedResumes.length);

  resumeCount.textContent = count;

  workspaceResumeCount.textContent =
    count;

}

/* RENDER DOCUMENT WORKSPACE */

function renderResumes() {

  closeDocumentMenus();

  resumeList.replaceChildren();

  clearSearch.hidden =
    !searchInput.value.length;

  noSearchResults.hidden = true;

  if (!resumesLoaded) {

    searchResultCount.textContent = "";

    return;

  }

  updateResumeCounters();

  const filtered = getFilteredResumes();

  searchResultCount.textContent =
    filtered.length +
    " of " +
    savedResumes.length +
    " resumes";

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

  const fragment =
    document.createDocumentFragment();

  filtered.forEach(resume => {

    fragment.appendChild(
      createResumeCard(resume)
    );

  });

  resumeList.appendChild(fragment);

}

/* FETCH USER RESUMES */

async function loadResumes() {

  if (!currentUser) return false;

  const userId = currentUser.id;

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
      .eq("user_id", userId)
      .order("updated_at", {
        ascending: false
      });

    if (error) throw error;

    if (currentUser?.id !== userId) {
      return false;
    }

    savedResumes = data || [];

    resumesLoaded = true;

    renderResumes();

    setStatus("");

    return true;

  } catch (error) {

    setStatus(
      "Unable to load resumes: " +
      errorMessage(error),
      "error"
    );

    return false;

  }

}

/* SAVE OR UPDATE RESUME */

async function saveResume(event) {

  event.preventDefault();

  if (isBusy || !currentUser) return;

  const title = resumeTitle.value.trim();

  if (!title) {

    setStatus(
      "Please enter a resume title.",
      "error"
    );

    resumeTitle.focus();

    return;

  }

  const wasEditing =
    Boolean(editingResumeId);

  const payload = {
    title,
    content: getResumeContent(),
    updated_at: new Date().toISOString()
  };

  setBusy(true);

  setStatus(
    "Saving your resume...",
    "info"
  );

  try {

    let result;

    if (editingResumeId) {

      result = await supabase
        .from("resumes")
        .update(payload)
        .eq("id", editingResumeId)
        .eq("user_id", currentUser.id)
        .select(
          "id,title,content,created_at,updated_at"
        )
        .single();

    } else {

      result = await supabase
        .from("resumes")
        .insert({
          ...payload,
          user_id: currentUser.id
        })
        .select(
          "id,title,content,created_at,updated_at"
        )
        .single();

    }

    if (result.error) throw result.error;

    if (!result.data?.id) {

      throw new Error(
        "Save confirmation was not received."
      );

    }

    savedResumes = savedResumes.filter(
      item =>
        String(item.id) !==
        String(result.data.id)
    );

    savedResumes.unshift(result.data);

    editingResumeId = result.data.id;

    saveButton.textContent =
      "Update Resume";

    renderResumes();

    const refreshed =
      await loadResumes();

    setStatus(
      refreshed
        ? (
          wasEditing
            ? "Resume updated successfully."
            : "Resume saved successfully."
        )
        : "Resume saved. Please refresh the dashboard.",
      refreshed ? "success" : "info"
    );

    quickCreate.open = false;

  } catch (error) {

    setStatus(
      "Unable to save resume: " +
      errorMessage(error),
      "error"
    );

  } finally {

    setBusy(false);

  }

}

/* DIALOG MANAGEMENT */

function showDialog(dialog) {

  if (dialog.open) return true;

  if (typeof dialog.showModal !== "function") {

    setStatus(
      "Please use an updated browser.",
      "error"
    );

    return false;

  }

  dialog.showModal();

  return true;

}

function closeDialog(dialog) {

  if (dialog.open) {
    dialog.close();
  }

}

/* RENAME RESUME */

function openRenameDialog(id) {

  if (isBusy || !currentUser) return;

  const resume = findResume(id);

  if (!resume) return;

  selectedRenameId = resume.id;

  renameInput.value =
    getDocumentTitle(resume);

  setDialogStatus(renameStatus, "");

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

  const title = renameInput.value.trim();

  if (!title) {

    setDialogStatus(
      renameStatus,
      "Please enter a document name."
    );

    return;

  }

  setBusy(true);

  setDialogStatus(renameStatus, "");

  renameConfirm.textContent =
    "Saving...";

  try {

    const { data, error } = await supabase
      .from("resumes")
      .update({
        title,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .eq("user_id", currentUser.id)
      .select(
        "id,title,content,created_at,updated_at"
      )
      .single();

    if (error) throw error;

    if (!data?.id) {

      throw new Error(
        "Rename confirmation was not received."
      );

    }

    savedResumes = savedResumes.map(
      item =>
        String(item.id) === String(id)
          ? data
          : item
    );

    if (
      String(editingResumeId) === String(id)
    ) {

      resumeTitle.value = title;

    }

    closeDialog(renameDialog);

    selectedRenameId = null;

    renderResumes();

    setStatus(
      "Resume renamed successfully.",
      "success"
    );

  } catch (error) {

    setDialogStatus(
      renameStatus,
      "Unable to rename: " +
      errorMessage(error)
    );

  } finally {

    renameConfirm.textContent =
      "Save Name";

    setBusy(false);

  }

}

/* DUPLICATE RESUME */

function openDuplicateDialog(id) {

  if (isBusy || !currentUser) return;

  const resume = findResume(id);

  if (!resume) return;

  selectedDuplicateId = resume.id;

  const originalTitle =
    getDocumentTitle(resume);

  duplicateInput.value =
    originalTitle.slice(0, 113) + " (Copy)";

  setDialogStatus(
    duplicateStatus,
    ""
  );

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

  const original =
    findResume(selectedDuplicateId);

  const title =
    duplicateInput.value.trim();

  if (!original) {

    setDialogStatus(
      duplicateStatus,
      "Original resume not found."
    );

    return;

  }

  if (!title) {

    setDialogStatus(
      duplicateStatus,
      "Please enter a document name."
    );

    return;

  }

  setBusy(true);

  setDialogStatus(
    duplicateStatus,
    ""
  );

  duplicateConfirm.textContent =
    "Creating...";

  try {

    const content = JSON.parse(
      JSON.stringify(
        original.content || {}
      )
    );

    const { data, error } = await supabase
      .from("resumes")
      .insert({
        user_id: currentUser.id,
        title,
        content,
        updated_at: new Date().toISOString()
      })
      .select(
        "id,title,content,created_at,updated_at"
      )
      .single();

    if (error) throw error;

    if (!data?.id) {

      throw new Error(
        "Copy confirmation was not received."
      );

    }

    savedResumes.unshift(data);

    closeDialog(duplicateDialog);

    selectedDuplicateId = null;

    searchInput.value = "";

    renderResumes();

    setStatus(
      "Resume duplicated successfully.",
      "success"
    );

  } catch (error) {

    setDialogStatus(
      duplicateStatus,
      "Unable to duplicate: " +
      errorMessage(error)
    );

  } finally {

    duplicateConfirm.textContent =
      "Create Copy";

    setBusy(false);

  }

}

/* CUSTOM DELETE CONFIRMATION */

function openDeleteDialog(id) {

  if (isBusy || !currentUser) return;

  const resume = findResume(id);

  if (!resume) return;

  selectedDeleteId = resume.id;

  deleteResumeName.textContent =
    getDocumentTitle(resume);

  setDialogStatus(deleteStatus, "");

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

  setBusy(true);

  setDialogStatus(deleteStatus, "");

  deleteConfirm.textContent =
    "Deleting...";

  try {

    const { data, error } = await supabase
      .from("resumes")
      .delete()
      .eq("id", id)
      .eq("user_id", currentUser.id)
      .select("id");

    if (error) throw error;

    if (!data?.length) {

      throw new Error(
        "Resume was not deleted. Check permissions."
      );

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
      item =>
        String(item.id) !== String(id)
    );

    closeDialog(deleteDialog);

    selectedDeleteId = null;

    renderResumes();

    setStatus(
      "Resume deleted successfully.",
      "success"
    );

  } catch (error) {

    setDialogStatus(
      deleteStatus,
      "Unable to delete: " +
      errorMessage(error)
    );

  } finally {

    deleteConfirm.textContent =
      "Delete Resume";

    setBusy(false);

  }

}

/* PDF EXPORT — PRINTABLE RESUME */

/*
 * Uses the browser's native print system.
 * No external PDF service.
 * Resume data remains in the browser.
 */

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

    setStatus(
      "Resume not found.",
      "error"
    );

    return;

  }

  const content = resume.content || {};

  const title =
    getDocumentTitle(resume);

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
        <div class="content">
          ${escapeHTML(value.trim())}
        </div>
      </section>
    `)
    .join("");

  const printWindow = window.open(
    "",
    "_blank"
  );

  if (!printWindow) {

    setStatus(
      "Please allow pop-ups to export your PDF.",
      "error"
    );

    return;

  }

  try {

    printWindow.opener = null;

    printWindow.document.open();

    printWindow.document.write(`
<!doctype html>
<html lang="en">
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
    Save / Print PDF
  </button>

  <p>
    Choose Save as PDF in your browser,
    or use the iOS print and share options.
  </p>

</div>

<main class="resume">

  <header>

    <h1>
      ${escapeHTML(
        content.fullName || title
      )}
    </h1>

    ${
      content.professionalTitle
        ? `
          <div class="professional-title">
            ${escapeHTML(
              content.professionalTitle
            )}
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

    setStatus(
      "PDF preview opened. Use Save / Print PDF.",
      "success"
    );

  } catch (error) {

    printWindow.close();

    setStatus(
      "Unable to prepare PDF: " +
      errorMessage(error),
      "error"
    );

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
    resumesLoaded = false;

    resumeList.replaceChildren();

    showLoading("Signing out...");

    redirectToLogin();

  } catch (error) {

    setBusy(false);

    const message =
      "Unable to sign out: " +
      errorMessage(error);

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
      (
        currentUser.email ||
        "Worknely user"
      ) +
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

/* SEARCH EVENTS */

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

    if (!isBusy) {
      closeDialog(renameDialog);
    }

  }
);

renameDialog.addEventListener(
  "close",
  () => {

    selectedRenameId = null;

    setDialogStatus(
      renameStatus,
      ""
    );

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

    if (!isBusy) {
      closeDialog(duplicateDialog);
    }

  }
);

duplicateDialog.addEventListener(
  "close",
  () => {

    selectedDuplicateId = null;

    setDialogStatus(
      duplicateStatus,
      ""
    );

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

    if (!isBusy) {
      closeDialog(deleteDialog);
    }

  }
);

deleteDialog.addEventListener(
  "close",
  () => {

    selectedDeleteId = null;

    setDialogStatus(
      deleteStatus,
      ""
    );

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

      if (isBusy) {
        event.preventDefault();
      }

    }
  );

});

/* CLOSE MENUS OUTSIDE DOCUMENT CARD */

document.addEventListener(
  "click",
  event => {

    if (
      !event.target.closest(
        ".wn-document-menu"
      )
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
  event => {

    if (
      event === "SIGNED_OUT" &&
      currentUser
    ) {

      currentUser = null;
      savedResumes = [];
      resumesLoaded = false;

      resumeList.replaceChildren();

      showLoading("Signing out...");

      redirectToLogin();

    }

  }
);

/* START WORKNELY V7.14 */

initializeDashboard();

/*
 * END WORKNELY V7.14
 * ADVANCED DOCUMENT MANAGEMENT
 */
