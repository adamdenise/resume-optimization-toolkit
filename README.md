# ResumePilot — Resume Optimization Toolkit V4 Premium Demo

A responsive, browser-based CV-to-job comparison demo built with HTML, CSS, and vanilla JavaScript.

## Features
- Premium responsive interface
- CV and job description comparison
- Estimated keyword match based on recognized skills
- Basic synonym matching and skill gap analysis
- Actionable, rule-based recommendations
- Downloadable text report
- Example data, clear button, word counters
- No accounts, API keys, analytics, or server-side processing

## How to publish on GitHub Pages
1. Upload `index.html`, `style.css`, `script.js`, and `README.md` into the root of the `resume-optimization-toolkit` repository, replacing older versions.
2. Commit the changes to the `main` branch.
3. Under **Settings → Pages**, configure **Deploy from a branch**, `main`, `/(root)` if not already configured.
4. Open `https://adamdenise.github.io/resume-optimization-toolkit/` after deployment.

## Important limitations
This is not an AI product or ATS simulator. The score is simply the percentage of job skills recognized by the built-in dictionary that also appear in the resume. It cannot assess qualifications, job suitability, or hiring probability. Skill synonyms are incomplete. Users should not add unearned skills.

The tool processes text locally in the browser and does not intentionally transmit resume text. For privacy, test with anonymized resumes. Review privacy, accessibility, security, and applicable laws before any commercial launch. There are no subscriptions or payment features yet.

## License
All rights reserved. No open-source license is granted by this repository unless its owner adds one.
