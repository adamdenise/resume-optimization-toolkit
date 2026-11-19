# ResumePilot V4.3 — International Edition

Browser-based resume builder, keyword comparison, and **estimated** ATS readiness heuristic.

## Features
- Interface language selector: English (default), Romanian, Italian, German, French, Spanish. **Core interface labels are localized; analysis recommendations, generated CV headings and PDF report text remain in English in this release.**
- Upload text-based PDF and DOCX documents; extraction uses PDF.js and Mammoth downloaded from CDN, executed locally in the browser. Internet access required for the parser libraries on first use.
- Legacy `.doc` and scanned/image PDFs are **not** supported.
- Build a single-column resume from verified user-entered information; export basic PDF.
- Keyword match and an **estimated ATS readiness heuristic** (55% recognized skill coverage, 30% section headings, 15% rough evidence signal). Not a verified ATS score, hiring probability, or format audit.
- Export comparison report PDF and TXT.

## Privacy and limitations
Resume text is processed in-browser, without an application backend. Third-party parser scripts are loaded from a CDN; deploy self-hosted, reviewed copies before handling sensitive documents in production. Do not enter confidential personal details in demos. The AI Resume Writer is **not implemented**: adding real AI requires a secure backend, consent, data-retention policy and appropriate costs. PDF generator uses built-in Helvetica and ASCII transliteration, so diacritics and non-Latin characters may not be preserved in exports.

## Deploy
Upload `index.html`, `style.css`, `script.js`, and `README.md` to the root of the existing GitHub Pages repository. The existing `pdf-addon.js` is unused and can remain without affecting this release.
