
/* Worknely V7.18.0 — Career Intelligence Dashboard */

(() => {
  'use strict';

  const VERSION = '7.18.0';

  const dictionaries = {

    en:[
      'Career Intelligence Dashboard',
      'Your career. Your next move.',
      'ATS readiness',
      'Career match',
      'Skills to develop',
      'Career progress',
      'Not yet available',
      'Career toolkit',
      'Open Career Intelligence',
      'Advanced ATS analysis',
      'Skill gap analysis',
      'Resume optimization',
      'Career matching',
      'Interview preparation',
      'Cover letter studio',
      'Career action plan',
      'Your progress',
      'Completed tools',
      'No analysis history connected yet.'
    ],

    ro:[
      'Panou de inteligență profesională',
      'Cariera ta. Următorul tău pas.',
      'Pregătire ATS',
      'Compatibilitate profesională',
      'Competențe de dezvoltat',
      'Progres profesional',
      'Indisponibil momentan',
      'Instrumente profesionale',
      'Deschide Career Intelligence',
      'Analiză ATS avansată',
      'Analiza competențelor',
      'Optimizarea CV-ului',
      'Compatibilitate profesională',
      'Pregătire pentru interviu',
      'Scrisoare de intenție',
      'Plan de carieră',
      'Progresul tău',
      'Instrumente finalizate',
      'Istoricul analizelor nu este încă conectat.'
    ],

    it:[
      'Dashboard di carriera',
      'La tua carriera. Il tuo prossimo passo.',
      'Preparazione ATS',
      'Compatibilità professionale',
      'Competenze da sviluppare',
      'Progresso professionale',
      'Non ancora disponibile',
      'Strumenti professionali',
      'Apri Career Intelligence',
      'Analisi ATS avanzata',
      'Analisi delle competenze',
      'Ottimizzazione CV',
      'Compatibilità professionale',
      'Preparazione ai colloqui',
      'Lettera di presentazione',
      'Piano di carriera',
      'I tuoi progressi',
      'Strumenti completati',
      'Lo storico delle analisi non è ancora collegato.'
    ],

    de:[
      'Karriere-Dashboard',
      'Deine Karriere. Dein nächster Schritt.',
      'ATS-Bereitschaft',
      'Karriere-Match',
      'Zu entwickelnde Fähigkeiten',
      'Karrierefortschritt',
      'Noch nicht verfügbar',
      'Karrierewerkzeuge',
      'Karriere-Intelligenz öffnen',
      'Erweiterte ATS-Analyse',
      'Kompetenzlückenanalyse',
      'Lebenslaufoptimierung',
      'Karriere-Matching',
      'Interviewvorbereitung',
      'Anschreiben',
      'Karriereplan',
      'Dein Fortschritt',
      'Abgeschlossene Werkzeuge',
      'Der Analyseverlauf ist noch nicht verbunden.'
    ],

    fr:[
      'Tableau de bord professionnel',
      'Votre carrière. Votre prochaine étape.',
      'Préparation ATS',
      'Compatibilité professionnelle',
      'Compétences à développer',
      'Progression professionnelle',
      'Pas encore disponible',
      'Outils de carrière',
      'Ouvrir Career Intelligence',
      'Analyse ATS avancée',
      'Analyse des compétences',
      'Optimisation du CV',
      'Compatibilité professionnelle',
      'Préparation aux entretiens',
      'Lettre de motivation',
      'Plan de carrière',
      'Votre progression',
      'Outils terminés',
      'Historique des analyses non connecté.'
    ],

    es:[
      'Panel de inteligencia profesional',
      'Tu carrera. Tu próximo paso.',
      'Preparación ATS',
      'Compatibilidad profesional',
      'Habilidades por desarrollar',
      'Progreso profesional',
      'Aún no disponible',
      'Herramientas profesionales',
      'Abrir Career Intelligence',
      'Análisis ATS avanzado',
      'Análisis de habilidades',
      'Optimización del CV',
      'Compatibilidad profesional',
      'Preparación de entrevistas',
      'Carta de presentación',
      'Plan de carrera',
      'Tu progreso',
      'Herramientas completadas',
      'El historial de análisis aún no está conectado.'
    ]

  };

  const tools = [
    'ats',
    'skills',
    'optimization',
    'matching',
    'interview',
    'coverLetter',
    'actionPlan'
  ];

  let root;

  function node(tag, cls, value) {

    const el = document.createElement(tag);

    if (cls) {
      el.className = cls;
    }

    if (value !== undefined) {
      el.textContent = value;
    }

    return el;

  }

  function render() {

    if (!root || !root.isConnected) return;

    const d =
      dictionaries[
        document.getElementById('language')?.value
      ] || dictionaries.en;

    const fragment =
      document.createDocumentFragment();

    fragment.append(
      node('h3','wnd-title',d[0]),
      node('p','wnd-muted',d[1])
    );

    const grid = node('div','wnd-grid');

    for (let i = 2; i <= 5; i++) {

      const card = node('div','wnd-card');

      card.append(
        node('span','wnd-muted',d[i]),
        node('strong','wnd-value','—'),
        node('small','wnd-muted',d[6])
      );

      grid.append(card);

    }

    fragment.append(
      grid,
      node('h4','wnd-heading',d[7])
    );

    const list = node('ul','wnd-tools');

    tools.forEach((key,i) => {

      const item =
        node('li','wnd-tool',d[9+i]);

      item.dataset.tool = key;

      list.append(item);

    });

    fragment.append(list);

    const link =
      node('a','wnd-launch',d[8]+' →');

    link.href = '#wnCareerIntelligence';

    link.addEventListener('click',event => {

      const target =
        document.getElementById(
          'wnCareerIntelligence'
        );

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        block:'start',
        behavior:'auto'
      });

    });

    fragment.append(
      link,
      node('h4','wnd-heading',d[16]),
      node('p','wnd-muted',d[18])
    );

    root.replaceChildren(fragment);

  }

  function mount() {

    const target =
      document.getElementById(
        'wnCareerIntelligence'
      );

    if (!target) return false;

    if (root?.isConnected) return true;

    root = document.createElement('section');

    root.id = 'wnCareerDashboard';

    root.setAttribute(
      'aria-label',
      'Career Intelligence Dashboard'
    );

    target.before(root);

    if (
      !document.getElementById(
        'wnCareerDashboardStyle'
      )
    ) {

      const style =
        document.createElement('style');

      style.id = 'wnCareerDashboardStyle';

      style.textContent = `

        #wnCareerDashboard {
          box-sizing:border-box;
          min-width:0;
          margin:16px 0;
          padding:20px;
          border:1px solid #e5d9ff;
          border-radius:18px;
          background:linear-gradient(
            135deg,
            #f6f1ff,
            #fff,
            #fff0fa
          );
          color:#20123f;
        }

        #wnCareerDashboard * {
          box-sizing:border-box;
          overflow-wrap:anywhere;
        }

        #wnCareerDashboard .wnd-title {
          font-size:clamp(20px,4vw,28px);
          margin:0 0 8px;
        }

        #wnCareerDashboard .wnd-muted {
          color:#746c85;
          font-size:13px;
          line-height:1.5;
        }

        #wnCareerDashboard .wnd-grid {
          display:grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap:10px;
          margin:16px 0;
        }

        #wnCareerDashboard .wnd-card {
          display:flex;
          flex-direction:column;
          gap:5px;
          background:white;
          border:1px solid #e9e2f4;
          border-radius:12px;
          padding:12px;
          min-width:0;
        }

        #wnCareerDashboard .wnd-value {
          font-size:28px;
          color:#5424ff;
        }

        #wnCareerDashboard .wnd-heading {
          margin:18px 0 10px;
        }

        #wnCareerDashboard .wnd-tools {
          display:grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap:8px;
          list-style:none;
          padding:0;
          margin:0 0 14px;
        }

        #wnCareerDashboard .wnd-tool {
          padding:10px;
          background:white;
          border:1px solid #e9e2f4;
          border-radius:9px;
          font-size:13px;
        }

        #wnCareerDashboard .wnd-launch {
          display:inline-flex;
          align-items:center;
          justify-content:center;
          min-height:44px;
          padding:10px 16px;
          border-radius:10px;
          background:linear-gradient(
            105deg,
            #5424ff,
            #a326e8,
            #ec22ad
          );
          color:white;
          text-decoration:none;
          font-weight:750;
          font-size:13px;
        }

        @media(max-width:700px) {

          #wnCareerDashboard {
            padding:14px;
          }

          #wnCareerDashboard .wnd-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

        }

        @media(max-width:340px) {

          #wnCareerDashboard .wnd-tools {
            grid-template-columns:1fr;
          }

        }

      `;

      document.head.append(style);

    }

    render();

    return true;

  }

  function initialize() {

    if (!mount()) return;

    document.getElementById('language')
      ?.addEventListener('change',render);

    document.addEventListener(
      'worknely:languagechange',
      render
    );

    document.addEventListener(
      'worknely:localizationready',
      render
    );

    window.addEventListener(
      'pageshow',
      () => {
        mount();
        render();
      }
    );

  }

  window.WorknelyCareerDashboard =
    Object.freeze({

      version:VERSION,

      refresh:render,

      mount

    });

  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      initialize,
      {once:true}
    );

  } else {

    initialize();

  }

})();
