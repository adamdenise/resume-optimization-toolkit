# ResumePilot V5.0 — Zero-Budget Foundation

This package extends the working V4.3 International Edition. The original builder, PDF/DOCX importer, ATS readiness estimate and exports remain in place.

## New in V5.0
- Writing Studio: local rule-based structured draft from **verified** experience and skills.
- Copy draft to existing Resume Builder.
- Studio headings, buttons and disclaimers in six languages (English default). Generated draft content remains English in this preview.
- No API keys, backend, accounts, telemetry, or server requests from the Writing Studio.

**IMPORTANT:** This is NOT generative AI. It does not make semantic recommendations. Existing PDF/DOCX import uses third-party CDN libraries as in V4.3. Do not present the application as AI-powered yet.

## iPhone / GitHub installation
1. Keep V4.3 working. Ideally create a `v4.3-backup` branch or download a copy of the repository first.
2. Unzip the package in Files.
3. Upload all **five** files to the existing repository root: `index.html`, `style.css`, `script.js`, `studio.js`, `README.md`.
4. Commit to `main`, wait for GitHub Pages to publish, and reload in Safari.
5. Test: V5.0 badge, Writing Studio draft, Copy to Resume Builder, Generate resume, PDF export, existing ATS demo and import.

## Roadmap to real AI
A secure backend (e.g. Cloudflare Worker) can be introduced when a funded API or carefully evaluated free provider is available. Add abuse prevention, request limits, consent and privacy notices before public access. Never embed an API secret in GitHub Pages.
