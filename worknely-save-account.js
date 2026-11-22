
/*
 * WORKNELY V7.1
 * Save Resume Builder data to Supabase
 * GitHub Pages compatible
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

function showSaveStatus(message) {
  if (statusElement) {
    statusElement.textContent = message;
  }
}

function collectResume() {
  const content = {};

  for (const [key, id] of
    Object.entries(builderFields)) {
    const element = document.getElementById(id);

    content[key] = element
      ? element.value.trim()
      : "";
  }

  return content;
}

async function saveToAccount() {
  if (!saveButton) return;

  saveButton.disabled = true;
  showSaveStatus("Saving your resume...");

  try {
    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError || !authData.user) {
      showSaveStatus(
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
      showSaveStatus(
        "Please complete your resume before saving."
      );
      return;
    }

    const title =
      content.professionalTitle ||
      (content.fullName
        ? content.fullName + " Resume"
        : "My Resume");

    const { data, error } = await supabase
      .from("resumes")
      .insert({
        user_id: authData.user.id,
        title,
        content,
        updated_at: new Date().toISOString()
      })
      .select("id")
      .single();

    if (error) throw error;

    showSaveStatus(
      "Resume saved successfully! " +
      "Open My Dashboard to view it."
    );

    console.info(
      "Worknely resume saved:",
      data.id
    );

  } catch (error) {
    showSaveStatus(
      "Unable to save resume: " +
      (error.message || "Unknown error")
    );
  } finally {
    saveButton.disabled = false;
  }
}

if (saveButton) {
  saveButton.addEventListener(
    "click",
    saveToAccount
  );
}
