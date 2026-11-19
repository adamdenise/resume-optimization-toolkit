"use strict";
// Transparent, limited keyword dictionary. This is NOT an ATS or AI evaluation.
const skillGroups = {
  "Excel": ["excel", "microsoft excel", "spreadsheets"],
  "Communication": ["communication", "communicating"],
  "Customer Service": ["customer service", "customer support"],
  "Data Analysis": ["data analysis", "data analytics"],
  "Project Management": ["project management", "project manager"],
  "Teamwork": ["teamwork", "collaboration", "collaborative"],
  "Problem Solving": ["problem solving", "problem-solving"],
  "Python": ["python"], "JavaScript": ["javascript"], "HTML": ["html"],
  "CSS": ["css"], "SQL": ["sql"], "Git": ["git", "github"],
  "SEO": ["seo", "search engine optimization"],
  "Marketing": ["marketing"], "Leadership": ["leadership"],
  "Sales": ["sales"], "Writing": ["writing", "copywriting"],
  "Microsoft Word": ["microsoft word", "ms word"],
  "Power BI": ["power bi"], "Tableau": ["tableau"],
  "Figma": ["figma"], "Canva": ["canva"]
};
const $ = id => document.getElementById(id);
function containsTerm(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp("(^|[^a-z0-9])" + escaped + "(?=$|[^a-z0-9])", "i").test(text);
}
function findSkills(text) {
  return Object.keys(skillGroups).filter(name => skillGroups[name].some(term => containsTerm(text, term)));
}
function fillList(id, entries, emptyText) {
  const list = $(id); list.replaceChildren();
  (entries.length ? entries : [emptyText]).forEach(item => { const li = document.createElement("li"); li.textContent = item; list.append(li); });
}
function analyze() {
  const resume = $("resume").value.trim();
  const job = $("job").value.trim();
  $("error").textContent = "";
  if (!resume || !job) { $("results").hidden = true; $("error").textContent = "Please paste both a resume and a job description."; return; }
  const required = findSkills(job), present = findSkills(resume);
  const matched = required.filter(s => present.includes(s));
  const missing = required.filter(s => !present.includes(s));
  const score = required.length ? Math.round(matched.length / required.length * 100) : null;
  $("score").textContent = score === null ? "N/A" : score + "%";
  $("bar").style.width = (score ?? 0) + "%";
  fillList("matched", matched, "No recognized skill matches yet.");
  fillList("missing", missing, required.length ? "No missing skills from the recognized list." : "No skills from our limited dictionary were recognized in the job description.");
  const tips = [];
  if (!required.length) tips.push("The job ad contains no skills from our limited dictionary. Try a more detailed description; no score can be calculated.");
  if (missing.length) tips.push("If you genuinely have these skills, describe where you used them: " + missing.join(", ") + ".");
  if (matched.length) tips.push("Support matched skills with specific achievements and measurable results where possible.");
  if (!/\b(experience|employment|work history)\b/i.test(resume)) tips.push("Consider adding a clearly labeled Experience section.");
  if (!/\b(education|degree|qualification)\b/i.test(resume)) tips.push("Consider adding an Education section.");
  tips.push("Review the complete job description manually; keyword matching cannot assess seniority, qualifications, or fit.");
  fillList("tips", tips, "Review your resume carefully.");
  $("results").hidden = false;
  $("results").scrollIntoView({behavior:"smooth",block:"start"});
}
$("analyze").addEventListener("click", analyze);
$("clear").addEventListener("click", () => { $("resume").value = ""; $("job").value = ""; $("results").hidden = true; $("error").textContent = ""; });
$("demo").addEventListener("click", () => {
  $("resume").value = "Professional Summary: Motivated professional in customer service. Experience: Two years helping customers. Education: Bachelor's Degree in Business Administration. Skills: Excel, Communication, Customer Service, Data Analysis, Teamwork.";
  $("job").value = "We are hiring a Customer Support Analyst. Required skills: Customer Service, Excel, Communication, Data Analysis, SQL and Problem Solving. Experience in teamwork is valuable.";
  $("results").hidden = true;
});
