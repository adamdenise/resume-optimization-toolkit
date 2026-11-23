
/*
 * WORKNELY V7.9
 * Resume Builder — Supabase Save & Edit
 *
 * Compatible with:
 * - dashboard.html V7.3
 * - dashboard.js V7.3
 * - worknely-auth.js V7.6
 * - Worknely GitHub Pages
 *
 * Preserves V7.5 save and celebration features.
 */

import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

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

const params =
  new URLSearchParams(window.location.search);

let editingResumeId = params.get("edit");
let resumeLoaded = !editingResumeId;
let isBusy = false;

/* STATUS */

function showStatus(message) {
  if (statusElement) {
    statusElement.textContent = message;
  }
}

/* COLLECT BUILDER DATA */

function collectResume() {
  const content = {};

  for (const [key, id] of
    Object.entries(builderFields)) {

    const input = document.getElementById(id);

    content[key] = input
      ? input.value.trim()
      : "";
  }

  return content;
}

/* RESTORE SAVED DATA */

function fillBuilder(content = {}) {
  for (const [key, id] of
    Object.entries(builderFields)) {

    const input = document.getElementById(id);

    if (!input) continue;

    input.value =
      typeof content[key] === "string"
        ? content[key]
        : "";
  }
}

/* CELEBRATION */

function celebrateSaveSuccess() {
  document.dispatchEvent(
    new CustomEvent("worknely:success", {
      detail: {
        type: "saved"
      }
    })
  );
}

/* URL MANAGEMENT */

function setEditingResume(id) {
  editingResumeId = id;
  resumeLoaded = true;

  const url = new URL(window.location.href);

  if (id) {
    url.searchParams.set("edit", id);
  } else {
    url.searchParams.delete("edit");
  }

  window.history.replaceState(
    null,
    "",
    url.pathname + url.search + url.hash
  );
}

/* LOAD EXISTING RESUME */

async function loadExistingResume() {
  if (!editingResumeId) return;

  resumeLoaded = false;
  showStatus("Loading your saved resume...");

  if (saveButton) {
    saveButton.disabled = true;
  }

  try {
    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError || !authData?.user) {
      showStatus(
        "Please log in to open this saved resume."
      );
      return;
    }

    const { data, error } = await supabase
      .from("resumes")
      .select("id,title,content")
      .eq("id", editingResumeId)
      .eq("user_id", authData.user.id)
      .single();

    if (error) throw error;

    if (!data?.id) {
      throw new Error("Resume not found.");
    }

    const content =
      data.content &&
      typeof data.content === "object" &&
      !Array.isArray(data.content)
        ? data.content
        : {};

    fillBuilder(content);
    resumeLoaded = true;

    const generateButton =
      document.getElementById("buildResume");

    if (generateButton) {
      generateButton.click();
    }

    showStatus(
      "Resume loaded successfully. " +
      "Edit your information and select " +
      "Save to My Account to update it."
    );

  } catch (error) {
    console.error(
      "Worknely resume loading error:",
      error
    );

    showStatus(
      "Unable to open resume: " +
      (error.message || "Unknown error")
    );

  } finally {
    if (saveButton) {
      saveButton.disabled = false;
    }
  }
}

/* SAVE OR UPDATE */

async function saveToAccount() {
  if (!saveButton || isBusy) return;

  if (editingResumeId && !resumeLoaded) {
    showStatus(
      "The saved resume could not be loaded. " +
      "Please return to My Dashboard and try again."
    );
    return;
  }

  isBusy = true;
  saveButton.disabled = true;

  showStatus(
    editingResumeId
      ? "Updating your resume..."
      : "Saving your resume..."
  );

  try {
    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError || !authData?.user) {
      showStatus(
        "Please log in to save your resume. " +
        "Open My Account to sign in."
      );
      return;
    }

    const content = collectResume();

    if (
      !content.fullName &&
      !content.professionalTitle &&
      !content.summary &&
      !content.experience &&
      !content.skills
    ) {
      showStatus(
        "Please complete your resume before saving."
      );
      return;
    }

    const title =
      content.professionalTitle ||
      (content.fullName
        ? content.fullName + " Resume"
        : "My Resume");

    const payload = {
      title,
      content,
      updated_at: new Date().toISOString()
    };

    let result;

    if (editingResumeId) {
      result = await supabase
        .from("resumes")
        .update(payload)
        .eq("id", editingResumeId)
        .eq("user_id", authData.user.id)
        .select("id")
        .single();
    } else {
      result = await supabase
        .from("resumes")
        .insert({
          ...payload,
          user_id: authData.user.id
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

    setEditingResume(result.data.id);

    showStatus(
      wasEditing
        ? "Resume updated successfully! " +
          "Open My Dashboard to view your changes."
        : "Resume saved successfully! " +
          "Open My Dashboard to view it."
    );

    celebrateSaveSuccess();

  } catch (error) {
    console.error(
      "Worknely resume save error:",
      error
    );

    showStatus(
      "Unable to save resume: " +
      (error.message || "Unknown error")
    );

  } finally {
    isBusy = false;
    saveButton.disabled = false;
  }
}

/* EVENTS */

if (saveButton) {
  saveButton.addEventListener(
    "click",
    saveToAccount
  );
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    loadExistingResume,
    { once: true }
  );
} else {
  loadExistingResume();
}
