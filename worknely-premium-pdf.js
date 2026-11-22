
/*
 * WORKNELY V7.5 — Premium Compatibility PDF Export
 * Original PDF engine preserved from V6.2.
 * Added success celebration event after PDF delivery.
 * No celebration on cancellation or errors.
 */
(() => {
  'use strict';

  const button = document.getElementById('printPdf');
  if (!button) return;

  const C = {
    purple: [91, 37, 245],
    dark: [36, 24, 72],
    muted: [95, 91, 115],
    light: [246, 243, 255],
    white: [255, 255, 255],
    border: [224, 218, 242]
  };

  const encoder = new TextEncoder();
  const el = id => document.getElementById(id);

  const plain = value => String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7e]/g, '-');

  const escaped = value => plain(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');

  const rgb = color =>
    color.map(n => (n / 255).toFixed(3)).join(' ');

  const number = value =>
    Number.isFinite(Number(value)) ? Number(value) : 0;

  const status = message => {
    if (el('exportMessage')) {
      el('exportMessage').textContent = message;
    }
  };

  // WORKNELY V7.5 — SUCCESS EVENT
  function celebratePdfSuccess() {
    document.dispatchEvent(
      new CustomEvent('worknely:success', {
        detail: {
          type: 'pdf'
        }
      })
    );
  }

  function readResult() {
    const results = el('results');

    if (
      !results ||
      results.classList.contains('hidden')
    ) {
      return null;
    }

    const score = parseInt(
      el('score')?.textContent || '',
      10
    );

    const ats = parseInt(
      el('atsScore')?.textContent || '',
      10
    );

    if (
      !Number.isFinite(score) ||
      !Number.isFinite(ats)
    ) {
      return null;
    }

    const chips = id => [
      ...(el(id)?.querySelectorAll('.chip') || [])
    ]
      .map(item => item.textContent.trim())
      .filter(Boolean);

    const findings = [
      ...(el('structureFindings')?.children || [])
    ].map(item => {
      const content = item.textContent
        .trim()
        .replace(/^[✓○+\-]\s*/, '');

      const label = content
        .split(/\s+[—-]\s+/)[0]
        .trim();

      return {
        label,
        found: item.classList.contains('found')
      };
    });

    const rec = [
      ...(el('recommendations')
        ?.querySelectorAll('li') || [])
    ]
      .map(item => item.textContent.trim())
      .filter(Boolean);

    const words = parseInt(
      el('wordCount')?.textContent || '',
      10
    );

    return {
      score: Math.max(0, Math.min(100, score)),
      ats: Math.max(0, Math.min(100, ats)),
      words: Number.isFinite(words) ? words : 0,
      matched: chips('matched'),
      missing: chips('missing'),
      findings,
      rec
    };
  }

  function makePdf(data) {
    const pages = [];
    let commands = [];
    let y = 730;

    const left = 44;
    const right = 551;

    const text = (
      x,
      baseline,
      value,
      size = 10,
      color = C.dark,
      bold = false
    ) => {
      commands.push(
        `${rgb(color)} rg BT /${bold ? 'F2' : 'F1'} ` +
        `${size} Tf 1 0 0 1 ${x} ${baseline} Tm ` +
        `(${escaped(value)}) Tj ET`
      );
    };

    const rect = (
      x,
      bottom,
      width,
      height,
      color
    ) => {
      commands.push(
        `${rgb(color)} rg ${x} ${bottom} ` +
        `${width} ${height} re f`
      );
    };

    const line = (
      x1,
      yy,
      x2,
      color = C.border
    ) => {
      commands.push(
        `${rgb(color)} RG 0.8 w ` +
        `${x1} ${yy} m ${x2} ${yy} l S`
      );
    };

    function header() {
      rect(0, 812, 595, 30, C.purple);
      rect(left, 769, 32, 32, C.purple);

      text(53, 778, 'W', 17, C.white, true);
      text(88, 785, 'WORKNELY', 17, C.dark, true);
      text(
        89,
        770,
        'PEOPLE TECHNOLOGY',
        8,
        C.muted
      );

      line(left, 755, right);
    }

    function footer(pageNo, total) {
      line(left, 53, right);

      text(
        left,
        35,
        'WORKNELY  |  PEOPLE TECHNOLOGY',
        8,
        C.muted
      );

      text(
        467,
        35,
        `PAGE ${pageNo} / ${total}`,
        8,
        C.muted
      );
    }

    function newPage() {
      if (commands.length) {
        pages.push(commands);
      }

      commands = [];
      y = 730;
      header();
    }

    function ensure(height) {
      if (y - height < 78) {
        newPage();
      }
    }

    // Helvetica is proportional.
    // Approximate character widths conservatively.
    function wrap(value, maxChars = 82) {
      const words = plain(value)
        .split(/\s+/)
        .filter(Boolean);

      const output = [];
      let current = '';

      for (let word of words) {
        while (word.length > maxChars) {
          if (current) {
            output.push(current);
            current = '';
          }

          output.push(word.slice(0, maxChars));
          word = word.slice(maxChars);
        }

        if (!word) continue;

        const next = current
          ? `${current} ${word}`
          : word;

        if (
          next.length > maxChars &&
          current
        ) {
          output.push(current);
          current = word;
        } else {
          current = next;
        }
      }

      if (current) {
        output.push(current);
      }

      return output.length
        ? output
        : [''];
    }

    function paragraph(
      value,
      indent = left,
      size = 10,
      color = C.dark
    ) {
      const width = indent > left ? 78 : 84;

      for (const item of wrap(value, width)) {
        ensure(17);

        text(
          indent,
          y,
          item,
          size,
          color
        );

        y -= 16;
      }

      y -= 5;
    }

    function heading(value) {
      ensure(62);

      y -= 17;

      text(
        left,
        y,
        value,
        12,
        C.purple,
        true
      );

      y -= 11;
      line(left, y, right);
      y -= 19;
    }

    newPage();

    text(
      left,
      y,
      'CAREER COMPATIBILITY REPORT',
      19,
      C.dark,
      true
    );

    y -= 21;

    text(
      left,
      y,
      'Private, rule-based browser analysis',
      10,
      C.muted
    );

    y -= 30;

    ensure(120);

    rect(
      left,
      y - 96,
      right - left,
      104,
      C.light
    );

    text(
      61,
      y - 23,
      'RECOGNIZED SKILL COVERAGE',
      9,
      C.muted,
      true
    );

    text(
      61,
      y - 72,
      `${data.score}%`,
      34,
      C.purple,
      true
    );

    text(
      315,
      y - 23,
      'ESTIMATED READINESS',
      9,
      C.muted,
      true
    );

    text(
      315,
      y - 69,
      `${data.ats}/100`,
      27,
      C.dark,
      true
    );

    y -= 122;

    paragraph(
      'Estimated readiness is a heuristic, not an official ATS score or hiring prediction.',
      left,
      9,
      C.muted
    );

    paragraph(
      `Resume length: ${data.words} words`,
      left,
      10,
      C.muted
    );

    heading('MATCHED SKILLS');

    for (
      const skill of (
        data.matched.length
          ? data.matched
          : ['None identified']
      )
    ) {
      paragraph(`+  ${skill}`, 55);
    }

    heading('SKILLS TO REVIEW');

    for (
      const skill of (
        data.missing.length
          ? data.missing
          : ['No missing recognized skills']
      )
    ) {
      paragraph(`-  ${skill}`, 55);
    }

    heading('CV STRUCTURE REVIEW');

    for (const item of data.findings) {
      paragraph(
        `${item.found ? '+' : '-'}  ` +
        `${item.label}: ` +
        `${
          item.found
            ? 'Heading detected'
            : 'Heading not clearly identified'
        }`,
        55
      );
    }

    heading('PERSONALIZED RECOMMENDATIONS');

    data.rec.forEach((recommendation, i) => {
      paragraph(
        `${i + 1}. ${recommendation}`,
        55
      );
    });

    ensure(65);

    y -= 8;
    line(left, y, right);
    y -= 22;

    paragraph(
      'This report uses a limited skills dictionary. It cannot assess actual proficiency, suitability or recruitment outcomes. Verify every claim manually.',
      left,
      9,
      C.muted
    );

    pages.push(commands);

    pages.forEach((page, i) => {
      commands = page;
      footer(i + 1, pages.length);
    });

    const objects = [null];

    const add = content => {
      objects.push(content);
      return objects.length - 1;
    };

    const catalog = add('');
    const pagesRoot = add('');

    const regular = add(
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
    );

    const bold = add(
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>'
    );

    const pageIds = [];

    for (const page of pages) {
      const stream = page.join('\n');

      const contentId = add(
        `<< /Length ${encoder.encode(stream).length} >>\n` +
        `stream\n${stream}\nendstream`
      );

      pageIds.push(
        add(
          `<< /Type /Page /Parent ${pagesRoot} 0 R ` +
          `/MediaBox [0 0 595 842] ` +
          `/Resources << /Font << ` +
          `/F1 ${regular} 0 R ` +
          `/F2 ${bold} 0 R >> >> ` +
          `/Contents ${contentId} 0 R >>`
        )
      );
    }

    objects[catalog] =
      `<< /Type /Catalog /Pages ${pagesRoot} 0 R >>`;

    objects[pagesRoot] =
      `<< /Type /Pages /Kids [` +
      pageIds.map(id => `${id} 0 R`).join(' ') +
      `] /Count ${pageIds.length} >>`;

    let pdf = '%PDF-1.4\n';
    const offsets = [0];

    for (let i = 1; i < objects.length; i++) {
      offsets[i] = encoder.encode(pdf).length;

      pdf +=
        `${i} 0 obj\n` +
        `${objects[i]}\nendobj\n`;
    }

    const xref = encoder.encode(pdf).length;

    pdf +=
      `xref\n0 ${objects.length}\n` +
      `0000000000 65535 f \n`;

    for (let i = 1; i < objects.length; i++) {
      pdf +=
        `${String(offsets[i]).padStart(10, '0')} ` +
        `00000 n \n`;
    }

    pdf +=
      `trailer\n` +
      `<< /Size ${objects.length} ` +
      `/Root ${catalog} 0 R >>\n` +
      `startxref\n${xref}\n%%EOF`;

    return new Blob(
      [encoder.encode(pdf)],
      { type: 'application/pdf' }
    );
  }

  async function deliver(blob, filename) {
    const file = new File(
      [blob],
      filename,
      { type: 'application/pdf' }
    );

    if (
      navigator.share &&
      navigator.canShare?.({
        files: [file]
      })
    ) {
      try {
        await navigator.share({
          files: [file]
        });

        return 'shared';
      } catch (error) {
        if (error.name === 'AbortError') {
          return 'cancelled';
        }

        console.warn(
          'Share failed; using download fallback.',
          error
        );
      }
    }

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);

    try {
      anchor.click();
    } finally {
      anchor.remove();

      setTimeout(
        () => URL.revokeObjectURL(url),
        60000
      );
    }

    return 'downloaded';
  }

  let busy = false;

  // Capture handler runs before the legacy
  // click listener registered in script.js.
  button.addEventListener(
    'click',
    async event => {
      event.stopImmediatePropagation();
      event.preventDefault();

      if (busy) return;

      const data = readResult();

      if (!data) {
        status(
          'Run a compatibility analysis before exporting the premium PDF.'
        );
        return;
      }

      busy = true;
      button.disabled = true;

      try {
        const blob = makePdf(data);

        const result = await deliver(
          blob,
          'worknely-premium-compatibility-report.pdf'
        );

        if (result === 'shared') {
          status(
            'Premium PDF prepared. Save it from the iPhone share menu.'
          );
        } else if (result === 'downloaded') {
          status(
            'Premium PDF download started. Check your browser downloads.'
          );
        } else {
          status(
            'PDF sharing cancelled. You can try again.'
          );
        }

        // WORKNELY V7.5
        // Celebrate only successful delivery initiation.
        if (
          result === 'shared' ||
          result === 'downloaded'
        ) {
          celebratePdfSuccess();
        }

      } catch (error) {
        console.error(
          'Worknely premium PDF error:',
          error
        );

        status(
          'Premium PDF export failed. Please retry in Safari.'
        );

      } finally {
        busy = false;
        button.disabled = false;
      }
    },
    true
  );
})();
