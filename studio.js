
/*
 * Worknely — Resume Writing Studio
 * Guided, rule-based resume drafting.
 * No generative AI or remote processing.
 */

(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);

  const ui = {
    en: [
      'Resume Writing Studio',
      'Transform your experience into professional resume content. Use guided writing tools to highlight your real skills, achievements, and career potential.',
      'Target role',
      'Writing style',
      'Verified experience',
      'Verified skills',
      'Create structured draft',
      'Copy draft to Resume Builder',
      'Guided writing templates, not generative AI. Review every statement and include only genuine qualifications.'
    ],

    ro: [
      'Atelier de redactare CV',
      'Transformă-ți experiența în conținut profesional pentru CV. Folosește instrumentele de redactare ghidată pentru a evidenția competențele, realizările și potențialul tău profesional.',
      'Rol vizat',
      'Stil de redactare',
      'Experiență verificată',
      'Competențe reale',
      'Creează un model structurat',
      'Copiază în editorul CV',
      'Șabloane de redactare ghidată, nu inteligență artificială generativă. Verifică fiecare afirmație și include doar calificări reale.'
    ],

    it: [
      'Studio di scrittura CV',
      'Trasforma la tua esperienza in contenuti professionali per il curriculum. Utilizza strumenti di scrittura guidata per valorizzare competenze, risultati e potenziale professionale.',
      'Ruolo desiderato',
      'Stile di scrittura',
      'Esperienza verificata',
      'Competenze verificate',
      'Crea una bozza strutturata',
      'Copia nel CV Builder',
      'Modelli di scrittura guidata, non intelligenza artificiale generativa. Verifica ogni affermazione e inserisci solo qualifiche reali.'
    ],

    de: [
      'Lebenslauf-Schreibstudio',
      'Verwandle deine Berufserfahrung in professionelle Lebenslauftexte. Nutze angeleitete Schreibwerkzeuge, um deine tatsächlichen Fähigkeiten, Erfolge und beruflichen Stärken hervorzuheben.',
      'Zielposition',
      'Schreibstil',
      'Bestätigte Erfahrung',
      'Bestätigte Fähigkeiten',
      'Strukturierten Entwurf erstellen',
      'In den Lebenslauf-Builder kopieren',
      'Angeleitete Schreibvorlagen, keine generative KI. Überprüfe alle Aussagen und gib nur tatsächliche Qualifikationen an.'
    ],

    fr: [
      'Atelier de rédaction de CV',
      'Transformez votre expérience en contenu professionnel pour votre CV. Utilisez des outils de rédaction guidée pour mettre en valeur vos compétences réelles, vos réalisations et votre potentiel professionnel.',
      'Poste visé',
      'Style de rédaction',
      'Expérience vérifiée',
      'Compétences vérifiées',
      'Créer un brouillon structuré',
      'Copier vers le créateur de CV',
      'Modèles de rédaction guidée, sans IA générative. Vérifiez chaque affirmation et indiquez uniquement vos qualifications réelles.'
    ],

    es: [
      'Estudio de redacción de CV',
      'Transforma tu experiencia en contenido profesional para tu currículum. Utiliza herramientas de redacción guiada para destacar tus habilidades reales, logros y potencial profesional.',
      'Puesto objetivo',
      'Estilo de redacción',
      'Experiencia verificada',
      'Habilidades verificadas',
      'Crear borrador estructurado',
      'Copiar al editor de CV',
      'Plantillas de redacción guiada, no inteligencia artificial generativa. Revisa cada afirmación e incluye solo cualificaciones reales.'
    ]
  };

  let draft = '';

  function translate() {
    const lang = $('language')?.value || 'en';
    const values = ui[lang] || ui.en;

    const ids = [
      'studioHeading',
      'studioIntro',
      'studioRoleLabel',
      'studioToneLabel',
      'studioExperienceLabel',
      'studioSkillsLabel',
      'studioDraft',
      'studioToBuilder',
      'studioNotice'
    ];

    ids.forEach((id, index) => {
      const element = $(id);
      if (element) {
        element.textContent = values[index];
      }
    });
  }

  function clean(value) {
    return value
      .replace(/[\u0000-\u001f]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function make() {
    const role = clean($('studioRole').value);
    const experience = clean($('studioExperience').value);
    const skills = clean($('studioSkills').value);

    if (!role || !experience) {
      $('studioStatus').textContent =
        'Enter a target role and your verified experience first.';
      return;
    }

    const items = skills
      .split(/[,;]+/)
      .map(clean)
      .filter(Boolean)
      .slice(0, 25);

    const lines = [
      'TARGET ROLE',
      role,
      '',
      'PROFESSIONAL SUMMARY',
      `Experience relevant to ${role}. ${experience}`,
      '',
      'EXPERIENCE',
      experience,
      '',
      'SKILLS',
      items.length ? items.join(' • ') : '[Add verified skills]',
      '',
      'EDITOR NOTE: This is a structured template, not AI-generated content. Verify all claims and adapt to the job posting.'
    ];

    draft = lines.join('\n');

    $('studioOutput').textContent = draft;
    $('studioStatus').textContent =
      'Draft created locally. Review it before using.';
  }

  function copy() {
    if (!draft) {
      $('studioStatus').textContent = 'Create a draft first.';
      return;
    }

    const role = clean($('studioRole').value);
    const experience = clean($('studioExperience').value);
    const skills = clean($('studioSkills').value);

    $('bTitle').value = role;
    $('bSummary').value =
      `Experience relevant to ${role}. ${experience}`;
    $('bExperience').value = experience;
    $('bSkills').value = skills;

    $('studioStatus').textContent =
      'Copied to Resume Builder. Add your name and education, then review the content.';

    $('builder').scrollIntoView({
      behavior: 'smooth'
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!$('studioDraft')) return;

    $('studioDraft').addEventListener('click', make);
    $('studioToBuilder').addEventListener('click', copy);
    $('language')?.addEventListener('change', translate);

    translate();
  });
})();


