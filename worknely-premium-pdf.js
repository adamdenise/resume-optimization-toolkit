
/* Worknely V6.1 — Premium PDF report presentation only. */
(() => {
  'use strict';
  const button = document.getElementById('printPdf');
  if (!button) return;

  const PURPLE = [91, 37, 245];
  const DARK = [36, 24, 72];
  const MUTED = [95, 91, 115];
  const LIGHT = [246, 243, 255];
  const WHITE = [255, 255, 255];

  const ascii = value => String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7e]/g, '-');

  const escapePdf = value => ascii(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');

  const rgb = c => c.map(n => (n / 255).toFixed(3)).join(' ');

  function makePdf(data) {
    const pages = [];
    let commands = [];
    let y = 730;

    function text(x, baseline, value, size = 11, color = DARK, bold = false) {
      commands.push(
        `${rgb(color)} rg BT /${bold ? 'F2' : 'F1'} ${size} Tf 1 0 0 1 ${x} ${baseline} Tm (${escapePdf(value)}) Tj ET`
      );
    }

    function rect(x, bottom, w, h, color) {
      commands.push(`${rgb(color)} rg ${x} ${bottom} ${w} ${h} re f`);
    }

    function line(x1, yy, x2, color = [225, 219, 242]) {
      commands.push(`${rgb(color)} RG 0.8 w ${x1} ${yy} m ${x2} ${yy} l S`);
    }

    function header() {
      rect(0, 812, 595, 30, PURPLE);
      rect(44, 767, 34, 34, PURPLE);
      text(53, 778, 'W', 18, WHITE, true);
      text(89, 785, 'WORKNELY', 17, DARK, true);
      text(90, 770, 'PEOPLE TECHNOLOGY', 8, MUTED);
      line(44, 755, 551);
    }

    function footer(pageNumber) {
      line(44, 53, 551);
      text(44, 35, 'WORKNELY  |  PEOPLE TECHNOLOGY', 8, MUTED);
      text(490, 35, `PAGE ${pageNumber}`, 8, MUTED);
    }

    function newPage() {
      if (commands.length) pages.push(commands);
      commands = [];
      y = 730;
      header();
    }

    function space(height) {
      if (y - height < 78) newPage();
    }

    function heading(value) {
      space(39);
      y -= 20;
      text(44, y, value, 12, PURPLE, true);
      y -= 10;
      line(44, y, 551);
      y -= 19;
    }

    function wrap(value, maxWidth = 89) {
      const words = ascii(value).split(/\s+/);
      const result = [];
      let current = '';

      for (let word of words) {
        while (word.length > maxWidth) {
          if (current) {
            result.push(current);
            current = '';
          }
          result.push(word.slice(0, maxWidth));
          word = word.slice(maxWidth);
        }

        if (!word) continue;

        if ((current + ' ' + word).trim().length > maxWidth && current) {
          result.push(current);
          current = word;
        } else {
          current = (current + ' ' + word).trim();
        }
      }

      if (current) result.push(current);
      return result.length ? result : [''];
    }

    function paragraph(value, indent = 44, size = 10, color = DARK) {
      const lines = wrap(value, indent === 44 ? 94 : 86);

      for (const item of lines) {
        space(16);
        text(indent, y, item, size, color);
        y -= 16;
      }
      y -= 5;
    }

    newPage();

    text(44, y, 'CAREER COMPATIBILITY REPORT', 19, DARK, true);
    y -= 21;
    text(44, y, 'Private, rule-based browser analysis', 10, MUTED);
    y -= 30;

    space(104);
    rect(44, y - 96, 507, 104, LIGHT);

    text(61, y - 23, 'RECOGNIZED SKILL COVERAGE', 9, MUTED, true);
    text(61, y - 72, `${data.score}%`, 34, PURPLE, true);

    text(315, y - 23, 'ESTIMATED READINESS', 9, MUTED, true);
    text(315, y - 69, `${data.ats}/100`, 27, DARK, true);

    y -= 121;

    paragraph(
      'Estimated readiness is a heuristic, not an official ATS score or hiring prediction.',
      44, 9, MUTED
    );

    paragraph(`Resume length: ${data.words} words`, 44, 10, MUTED);

    heading('MATCHED SKILLS');
    for (const skill of (data.matched.length ? data.matched : ['None identified'])) {
      paragraph(`+  ${skill}`, 55);
    }

    heading('SKILLS TO REVIEW');
    for (const skill of (data.missing.length ? data.missing : ['No missing recognized skills'])) {
      paragraph(`-  ${skill}`, 55);
    }

    heading('CV STRUCTURE REVIEW');
    for (const f of data.findings) {
      paragraph(
        `${f.found ? '+' : '-'}  ${f.label}: ${f.found ? 'Heading detected' : 'Heading not clearly identified'}`,
        55
      );
    }

    heading('PERSONALIZED RECOMMENDATIONS');
    data.rec.forEach((rec, index) => {
      paragraph(`${index + 1}. ${rec}`, 55);
    });

    space(42);
    y -= 8;
    line(44, y, 551);
    y -= 22;

    paragraph(
      'This report uses a limited skills dictionary and cannot assess actual proficiency, suitability, or recruitment outcomes. Verify every claim manually.',
      44, 9, MUTED
    );

    pages.push(commands);

    pages.forEach((page, i) => {
      commands = page;
      footer(i + 1);
    });

    const objects = [null];
    const add = s => {
      objects.push(s);
      return objects.length - 1;
    };

    const catalog = add('');
    const root = add('');

    const regular = add(
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
    );
    const bold = add(
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>'
    );

    const ids = [];
    const encoder = new TextEncoder();

    for (const page of pages) {
      const stream = page.join('\n');
      const bytes = encoder.encode(stream);

      const streamId = add(
        `<< /Length ${bytes.length} >>\nstream\n${stream}\nendstream`
      );

      ids.push(add(
        `<< /Type /Page /Parent ${root} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${regular} 0 R /F2 ${bold} 0 R >> >> /Contents ${streamId} 0 R >>`
      ));
    }

    objects[catalog] = `<< /Type /Catalog /Pages ${root} 0 R >>`;
    objects[root] =
      `<< /Type /Pages /Kids [${ids.map(id => id + ' 0 R').join(' ')}] /Count ${ids.length} >>`;

    let pdf = '%PDF-1.4\n';
    const offsets = [0];

    for (let i = 1; i < objects.length; i++) {
      offsets[i] = encoder.encode(pdf).length;
      pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
    }

    const start = encoder.encode(pdf).length;

    pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;

    for (let i = 1; i < objects.length; i++) {
      pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${objects.length} /Root ${catalog} 0 R >>\nstartxref\n${start}\n%%EOF`;

    return new Blob([encoder.encode(pdf)], {
      type: 'application/pdf'
    });
  }

  button.addEventListener('click', async event => {
    if (typeof lastResult === 'undefined' || !lastResult) return;

    event.stopImmediatePropagation();

    const status = document.getElementById('exportMessage');

    try {
      const blob = makePdf(lastResult);

      if (typeof saveBlob === 'function') {
        await saveBlob(
          blob,
          'worknely-premium-compatibility-report.pdf'
        );
      } else {
        throw new Error('Existing export handler unavailable');
      }

      if (status) {
        status.textContent =
          'Premium PDF prepared. Use Share > Save to Files on iPhone.';
      }
    } catch (error) {
      console.error(error);

      if (status) {
        status.textContent =
          'Premium PDF export failed. Please retry in Safari.';
      }
    }
  }, true);
})();
