
(function () {
    "use strict";

    const VERSION = "7.20.5";
    const ROOT_ID = "wnCareerInsights";
    const MOUNT_ID = "wnCareerInsightsMount";
    const STYLE_ID = "wnCareerInsightsStyles";
    const DAY = 86400000;

    const LOCALES = Object.freeze({
        en: "en-GB",
        ro: "ro-RO",
        it: "it-IT",
        de: "de-DE",
        fr: "fr-FR",
        es: "es-ES"
    });

    const D = Object.freeze({
        en: [
            "Personalized career insights",
            "Discover your next professional steps based on your saved results.",
            "Recommendations",
            "High priority",
            "Recommended",
            "Positive progress",
            "Sign in to receive personalized recommendations.",
            "Analyzing your saved results...",
            "Career insights are currently unavailable.",
            "Complete password recovery first.",
            "Refresh insights",
            "Recommendations are rule-based suggestions, not predictions or guarantees of employment.",
            "Some information is unavailable. Recommendations may be incomplete.",
            "Create your professional resume",
            "Build or review your resume before applying for your next role.",
            "Open resume builder",
            "Improve your ATS readiness",
            "Your latest estimated ATS score is {score}. Review your resume structure and relevant keywords.",
            "Analyze resume",
            "Review your ATS compatibility",
            "Your latest estimated ATS score is {score}. Tailor your resume to the requirements of your target role.",
            "Strong estimated ATS readiness",
            "Your latest estimated ATS score is {score}. Continue adapting your resume to each vacancy.",
            "Strengthen your skills",
            "Your latest estimated skill coverage is {score}. Review the identified skill gaps.",
            "Explore career tools",
            "Review your career match",
            "Your latest estimated career match is {score}. Compare your experience with the target role.",
            "Continue your career plan",
            "Your latest saved career plan progress is {score}. Review your remaining tasks.",
            "Prepare for your interview",
            "You have an interview scheduled within the next 24 hours.",
            "Open interview calendar",
            "Upcoming interview",
            "You have an interview scheduled within the next 7 days. Prepare relevant examples and questions.",
            "Follow up on your application",
            "A scheduled follow-up is due within the next 24 hours.",
            "Open job tracker",
            "Start tracking your applications",
            "You have no saved applications. Add relevant opportunities to organize your job search.",
            "Review your saved opportunities",
            "You have saved opportunities but no applications in active stages. Review the roles that interest you.",
            "Review your ATS results",
            "Your latest estimated ATS score is {points} percentage points lower than your previous result. Compare the job requirements before drawing conclusions.",
            "Your ATS results have increased",
            "Your latest estimated ATS score is {points} percentage points higher than your previous result. Different roles and engine versions may affect this comparison.",
            "Review your job offer",
            "You have an application in the offer stage. Review the employment conditions before making a decision.",
            "No additional recommendations",
            "Continue using your career tools to generate relevant saved results.",
            "Save your first ATS analysis",
            "Save an ATS analysis to unlock recommendations based on your estimated results.",
            "Based on available saved data",
            "Action currently unavailable.",
            "Open career intelligence",
            "Review performance",
            "Updated",
            "Saved scores are estimates, not employer decisions.",
            "Review your professional activity"
        ],

        ro: [
            "Recomandări profesionale personalizate",
            "Descoperă următorii pași profesionali pe baza rezultatelor salvate.",
            "Recomandări",
            "Prioritate ridicată",
            "Recomandat",
            "Progres pozitiv",
            "Autentifică-te pentru a primi recomandări personalizate.",
            "Se analizează rezultatele salvate...",
            "Recomandările profesionale sunt momentan indisponibile.",
            "Finalizează mai întâi recuperarea parolei.",
            "Actualizează recomandările",
            "Recomandările sunt sugestii bazate pe reguli, nu predicții sau garanții de angajare.",
            "Unele informații sunt indisponibile. Recomandările pot fi incomplete.",
            "Creează CV-ul profesional",
            "Construiește sau revizuiește CV-ul înainte de următoarea candidatură.",
            "Deschide editorul CV",
            "Îmbunătățește compatibilitatea ATS",
            "Ultimul scor ATS estimat este {score}. Revizuiește structura CV-ului și cuvintele-cheie relevante.",
            "Analizează CV-ul",
            "Revizuiește compatibilitatea ATS",
            "Ultimul scor ATS estimat este {score}. Adaptează CV-ul la cerințele postului vizat.",
            "Compatibilitate ATS estimată ridicată",
            "Ultimul scor ATS estimat este {score}. Continuă să adaptezi CV-ul fiecărui post.",
            "Consolidează-ți competențele",
            "Acoperirea estimată a competențelor este {score}. Revizuiește competențele identificate ca lipsă.",
            "Explorează instrumentele profesionale",
            "Revizuiește potrivirea profesională",
            "Ultima potrivire profesională estimată este {score}. Compară experiența ta cu postul vizat.",
            "Continuă planul de carieră",
            "Ultimul progres salvat al planului de carieră este {score}. Revizuiește sarcinile rămase.",
            "Pregătește-te pentru interviu",
            "Ai un interviu programat în următoarele 24 de ore.",
            "Deschide calendarul interviurilor",
            "Interviu apropiat",
            "Ai un interviu programat în următoarele 7 zile. Pregătește exemple și întrebări relevante.",
            "Revino asupra candidaturii",
            "Ai o revenire programată în următoarele 24 de ore.",
            "Deschide gestionarea candidaturilor",
            "Începe monitorizarea candidaturilor",
            "Nu ai candidaturi salvate. Adaugă oportunități relevante pentru a-ți organiza căutarea.",
            "Revizuiește oportunitățile salvate",
            "Ai oportunități salvate, dar nicio candidatură în etapele active. Revizuiește posturile care te interesează.",
            "Revizuiește rezultatele ATS",
            "Ultimul scor ATS estimat este cu {points} puncte procentuale mai mic decât rezultatul anterior. Compară cerințele posturilor înainte de a trage concluzii.",
            "Rezultatele ATS au crescut",
            "Ultimul scor ATS estimat este cu {points} puncte procentuale mai mare decât rezultatul anterior. Posturile și versiunile diferite ale motoarelor pot influența comparația.",
            "Revizuiește oferta de muncă",
            "Ai o candidatură în etapa de ofertă. Analizează condițiile de angajare înainte de a lua o decizie.",
            "Nicio recomandare suplimentară",
            "Continuă să utilizezi instrumentele profesionale pentru a genera rezultate relevante.",
            "Salvează prima analiză ATS",
            "Salvează o analiză ATS pentru a primi recomandări bazate pe rezultatele estimate.",
            "Bazat pe datele salvate disponibile",
            "Acțiunea este momentan indisponibilă.",
            "Deschide inteligența profesională",
            "Revizuiește performanța",
            "Actualizat",
            "Scorurile salvate sunt estimări, nu decizii ale angajatorilor.",
            "Revizuiește activitatea profesională"
        ],

        it: [
            "Suggerimenti professionali personalizzati",
            "Scopri i prossimi passi professionali in base ai risultati salvati.",
            "Suggerimenti",
            "Priorità alta",
            "Consigliato",
            "Progresso positivo",
            "Accedi per ricevere suggerimenti personalizzati.",
            "Analisi dei risultati salvati...",
            "Suggerimenti professionali non disponibili.",
            "Completa prima il recupero della password.",
            "Aggiorna suggerimenti",
            "I suggerimenti si basano su regole, non su previsioni o garanzie di assunzione.",
            "Alcune informazioni non sono disponibili. I suggerimenti potrebbero essere incompleti.",
            "Crea il tuo CV professionale",
            "Crea o rivedi il CV prima della prossima candidatura.",
            "Apri editor CV",
            "Migliora la compatibilità ATS",
            "L'ultimo punteggio ATS stimato è {score}. Rivedi la struttura del CV e le parole chiave pertinenti.",
            "Analizza CV",
            "Rivedi la compatibilità ATS",
            "L'ultimo punteggio ATS stimato è {score}. Adatta il CV ai requisiti del ruolo.",
            "Compatibilità ATS stimata elevata",
            "L'ultimo punteggio ATS stimato è {score}. Continua ad adattare il CV a ogni posizione.",
            "Rafforza le tue competenze",
            "La copertura stimata delle competenze è {score}. Rivedi le competenze mancanti.",
            "Esplora gli strumenti professionali",
            "Rivedi la compatibilità professionale",
            "L'ultima compatibilità professionale stimata è {score}. Confronta la tua esperienza con il ruolo.",
            "Continua il piano di carriera",
            "L'ultimo progresso salvato del piano è {score}. Rivedi le attività rimanenti.",
            "Preparati al colloquio",
            "Hai un colloquio programmato nelle prossime 24 ore.",
            "Apri calendario colloqui",
            "Colloquio imminente",
            "Hai un colloquio nei prossimi 7 giorni. Prepara esempi e domande pertinenti.",
            "Segui la tua candidatura",
            "Hai un follow-up programmato nelle prossime 24 ore.",
            "Apri gestione candidature",
            "Inizia a monitorare le candidature",
            "Non hai candidature salvate. Aggiungi opportunità pertinenti per organizzare la ricerca.",
            "Rivedi le opportunità salvate",
            "Hai opportunità salvate ma nessuna candidatura in fase attiva. Rivedi le posizioni interessanti.",
            "Rivedi i risultati ATS",
            "L'ultimo punteggio ATS stimato è inferiore di {points} punti percentuali al precedente. Confronta i requisiti prima di trarre conclusioni.",
            "I risultati ATS sono aumentati",
            "L'ultimo punteggio ATS stimato è superiore di {points} punti percentuali. Ruoli e versioni diverse possono influenzare il confronto.",
            "Valuta la tua offerta di lavoro",
            "Hai una candidatura in fase di offerta. Valuta le condizioni prima di decidere.",
            "Nessun suggerimento aggiuntivo",
            "Continua a utilizzare gli strumenti professionali per generare risultati pertinenti.",
            "Salva la prima analisi ATS",
            "Salva un'analisi ATS per ricevere suggerimenti basati sui risultati stimati.",
            "Basato sui dati salvati disponibili",
            "Azione non disponibile.",
            "Apri intelligenza professionale",
            "Rivedi performance",
            "Aggiornato",
            "I punteggi salvati sono stime, non decisioni dei datori di lavoro.",
            "Rivedi la tua attività professionale"
        ],

        de: [
            "Personalisierte Karriereempfehlungen",
            "Entdecke deine nächsten beruflichen Schritte anhand gespeicherter Ergebnisse.",
            "Empfehlungen",
            "Hohe Priorität",
            "Empfohlen",
            "Positiver Fortschritt",
            "Melde dich für personalisierte Empfehlungen an.",
            "Gespeicherte Ergebnisse werden analysiert...",
            "Karriereempfehlungen derzeit nicht verfügbar.",
            "Schließe zuerst die Passwortwiederherstellung ab.",
            "Empfehlungen aktualisieren",
            "Die Empfehlungen sind regelbasiert und keine Vorhersagen oder Beschäftigungsgarantien.",
            "Einige Informationen fehlen. Empfehlungen können unvollständig sein.",
            "Erstelle deinen Lebenslauf",
            "Erstelle oder überprüfe deinen Lebenslauf vor der nächsten Bewerbung.",
            "Lebenslaufeditor öffnen",
            "Verbessere deine ATS-Kompatibilität",
            "Dein letzter geschätzter ATS-Wert ist {score}. Überprüfe Struktur und relevante Schlüsselwörter.",
            "Lebenslauf analysieren",
            "Überprüfe deine ATS-Kompatibilität",
            "Dein letzter geschätzter ATS-Wert ist {score}. Passe den Lebenslauf an die Zielstelle an.",
            "Hohe geschätzte ATS-Kompatibilität",
            "Dein letzter geschätzter ATS-Wert ist {score}. Passe deinen Lebenslauf weiterhin an jede Stelle an.",
            "Stärke deine Kompetenzen",
            "Deine geschätzte Kompetenzabdeckung ist {score}. Überprüfe fehlende Kompetenzen.",
            "Karrierewerkzeuge entdecken",
            "Überprüfe deine Karriereübereinstimmung",
            "Deine letzte geschätzte Übereinstimmung ist {score}. Vergleiche deine Erfahrung mit der Zielstelle.",
            "Setze deinen Karriereplan fort",
            "Dein zuletzt gespeicherter Planfortschritt ist {score}. Überprüfe verbleibende Aufgaben.",
            "Bereite dich auf dein Interview vor",
            "Du hast innerhalb der nächsten 24 Stunden ein Vorstellungsgespräch.",
            "Interviewkalender öffnen",
            "Bevorstehendes Interview",
            "Du hast in den nächsten 7 Tagen ein Interview. Bereite Beispiele und Fragen vor.",
            "Verfolge deine Bewerbung",
            "Eine geplante Nachverfolgung ist innerhalb der nächsten 24 Stunden fällig.",
            "Bewerbungsverwaltung öffnen",
            "Beginne mit der Bewerbungsverfolgung",
            "Du hast keine gespeicherten Bewerbungen. Füge relevante Stellen hinzu.",
            "Überprüfe gespeicherte Stellen",
            "Du hast gespeicherte Stellen, aber keine aktiven Bewerbungen. Überprüfe interessante Angebote.",
            "Überprüfe deine ATS-Ergebnisse",
            "Dein letzter geschätzter ATS-Wert liegt {points} Prozentpunkte unter dem vorherigen. Vergleiche die Stellenanforderungen.",
            "Deine ATS-Ergebnisse sind gestiegen",
            "Dein letzter geschätzter ATS-Wert liegt {points} Prozentpunkte höher. Stellen und Engine-Versionen können den Vergleich beeinflussen.",
            "Überprüfe dein Stellenangebot",
            "Eine Bewerbung befindet sich in der Angebotsphase. Prüfe die Arbeitsbedingungen.",
            "Keine weiteren Empfehlungen",
            "Nutze weiterhin deine Karrierewerkzeuge für relevante Ergebnisse.",
            "Speichere deine erste ATS-Analyse",
            "Speichere eine ATS-Analyse für Empfehlungen auf Basis geschätzter Ergebnisse.",
            "Basierend auf verfügbaren gespeicherten Daten",
            "Aktion derzeit nicht verfügbar.",
            "Karriereintelligenz öffnen",
            "Leistung überprüfen",
            "Aktualisiert",
            "Gespeicherte Werte sind Schätzungen, keine Arbeitgeberentscheidungen.",
            "Überprüfe deine berufliche Aktivität"
        ],

        fr: [
            "Conseils professionnels personnalisés",
            "Découvrez vos prochaines étapes professionnelles selon vos résultats enregistrés.",
            "Recommandations",
            "Priorité élevée",
            "Recommandé",
            "Progression positive",
            "Connectez-vous pour recevoir des recommandations personnalisées.",
            "Analyse des résultats enregistrés...",
            "Recommandations professionnelles indisponibles.",
            "Terminez d'abord la récupération du mot de passe.",
            "Actualiser les recommandations",
            "Ces suggestions reposent sur des règles, sans prédiction ni garantie d'emploi.",
            "Certaines informations sont indisponibles. Les recommandations peuvent être incomplètes.",
            "Créez votre CV professionnel",
            "Créez ou révisez votre CV avant votre prochaine candidature.",
            "Ouvrir l'éditeur de CV",
            "Améliorez votre compatibilité ATS",
            "Votre dernier score ATS estimé est {score}. Révisez la structure du CV et les mots-clés pertinents.",
            "Analyser le CV",
            "Révisez votre compatibilité ATS",
            "Votre dernier score ATS estimé est {score}. Adaptez votre CV aux exigences du poste.",
            "Compatibilité ATS estimée élevée",
            "Votre dernier score ATS estimé est {score}. Continuez à adapter votre CV à chaque poste.",
            "Renforcez vos compétences",
            "Votre couverture estimée des compétences est {score}. Examinez les compétences manquantes.",
            "Explorer les outils professionnels",
            "Révisez votre compatibilité professionnelle",
            "Votre dernière compatibilité estimée est {score}. Comparez votre expérience au poste ciblé.",
            "Poursuivez votre plan de carrière",
            "La dernière progression enregistrée est {score}. Examinez les tâches restantes.",
            "Préparez votre entretien",
            "Vous avez un entretien prévu dans les prochaines 24 heures.",
            "Ouvrir le calendrier",
            "Entretien à venir",
            "Vous avez un entretien dans les 7 prochains jours. Préparez des exemples et des questions.",
            "Effectuez le suivi de votre candidature",
            "Une relance est prévue dans les prochaines 24 heures.",
            "Ouvrir la gestion des candidatures",
            "Commencez à suivre vos candidatures",
            "Vous n'avez aucune candidature enregistrée. Ajoutez des opportunités pertinentes.",
            "Révisez les opportunités enregistrées",
            "Vous avez des opportunités enregistrées mais aucune candidature active. Examinez les postes intéressants.",
            "Révisez vos résultats ATS",
            "Votre dernier score ATS estimé est inférieur de {points} points de pourcentage. Comparez les exigences des postes.",
            "Vos résultats ATS ont augmenté",
            "Votre dernier score ATS estimé a augmenté de {points} points de pourcentage. Les postes et versions peuvent influencer la comparaison.",
            "Examinez votre offre d'emploi",
            "Une candidature est en phase d'offre. Examinez les conditions avant de décider.",
            "Aucune recommandation supplémentaire",
            "Continuez à utiliser vos outils professionnels pour générer des résultats pertinents.",
            "Enregistrez votre première analyse ATS",
            "Enregistrez une analyse ATS pour obtenir des conseils basés sur les résultats estimés.",
            "Basé sur les données enregistrées disponibles",
            "Action actuellement indisponible.",
            "Ouvrir l'intelligence professionnelle",
            "Examiner les performances",
            "Actualisé",
            "Les scores enregistrés sont des estimations, pas des décisions des employeurs.",
            "Examinez votre activité professionnelle"
        ],

        es: [
            "Recomendaciones profesionales personalizadas",
            "Descubre tus próximos pasos profesionales según tus resultados guardados.",
            "Recomendaciones",
            "Prioridad alta",
            "Recomendado",
            "Progreso positivo",
            "Inicia sesión para recibir recomendaciones personalizadas.",
            "Analizando los resultados guardados...",
            "Recomendaciones profesionales no disponibles.",
            "Completa primero la recuperación de contraseña.",
            "Actualizar recomendaciones",
            "Las sugerencias se basan en reglas, no en predicciones ni garantías de empleo.",
            "Falta alguna información. Las recomendaciones pueden estar incompletas.",
            "Crea tu CV profesional",
            "Crea o revisa tu CV antes de tu próxima candidatura.",
            "Abrir editor de CV",
            "Mejora tu compatibilidad ATS",
            "Tu última puntuación ATS estimada es {score}. Revisa la estructura y las palabras clave relevantes.",
            "Analizar CV",
            "Revisa tu compatibilidad ATS",
            "Tu última puntuación ATS estimada es {score}. Adapta tu CV a los requisitos del puesto.",
            "Compatibilidad ATS estimada alta",
            "Tu última puntuación ATS estimada es {score}. Sigue adaptando tu CV a cada puesto.",
            "Refuerza tus competencias",
            "Tu cobertura estimada de competencias es {score}. Revisa las competencias que faltan.",
            "Explorar herramientas profesionales",
            "Revisa tu compatibilidad profesional",
            "Tu última compatibilidad estimada es {score}. Compara tu experiencia con el puesto objetivo.",
            "Continúa tu plan de carrera",
            "El último progreso guardado es {score}. Revisa las tareas pendientes.",
            "Prepárate para tu entrevista",
            "Tienes una entrevista programada en las próximas 24 horas.",
            "Abrir calendario de entrevistas",
            "Próxima entrevista",
            "Tienes una entrevista en los próximos 7 días. Prepara ejemplos y preguntas relevantes.",
            "Realiza el seguimiento de tu candidatura",
            "Tienes un seguimiento programado en las próximas 24 horas.",
            "Abrir gestión de candidaturas",
            "Empieza a gestionar tus candidaturas",
            "No tienes candidaturas guardadas. Añade oportunidades relevantes para organizar tu búsqueda.",
            "Revisa las oportunidades guardadas",
            "Tienes oportunidades guardadas pero ninguna candidatura activa. Revisa los puestos interesantes.",
            "Revisa tus resultados ATS",
            "Tu última puntuación ATS estimada es {points} puntos porcentuales inferior a la anterior. Compara los requisitos antes de sacar conclusiones.",
            "Tus resultados ATS han aumentado",
            "Tu última puntuación ATS estimada es {points} puntos porcentuales superior. Los puestos y versiones pueden influir en la comparación.",
            "Revisa tu oferta de empleo",
            "Tienes una candidatura en fase de oferta. Revisa las condiciones antes de decidir.",
            "No hay recomendaciones adicionales",
            "Sigue utilizando tus herramientas profesionales para generar resultados relevantes.",
            "Guarda tu primer análisis ATS",
            "Guarda un análisis ATS para recibir recomendaciones basadas en resultados estimados.",
            "Basado en los datos guardados disponibles",
            "Acción no disponible.",
            "Abrir inteligencia profesional",
            "Revisar rendimiento",
            "Actualizado",
            "Las puntuaciones guardadas son estimaciones, no decisiones de empleadores.",
            "Revisa tu actividad profesional"
        ]
    });

    const PRIORITY = Object.freeze({
        high: 3,
        recommended: 2,
        positive: 1
    });

    const THRESHOLDS = Object.freeze({
        atsLow: 60,
        atsStrong: 80,
        skillCoverage: 70,
        careerMatch: 65,
        atsDifference: 10,
        recommendationLimit: 8
    });

    let root = null;
    let initialized = false;
    let suspended = false;

    function language() {
        const value =
            window.WorknelyLocalization?.getLanguage?.() ||
            document.getElementById("language")?.value ||
            document.documentElement.lang ||
            "en";

        const code = String(value)
            .toLowerCase()
            .split("-")[0];

        return D[code] ? code : "en";
    }

    function locale() {
        return LOCALES[language()] || "en-GB";
    }

    function tr(index, values) {
        let text =
            D[language()][index] ||
            D.en[index] ||
            "";

        Object.entries(values || {})
            .forEach(function (entry) {
                text = text
                    .split("{" + entry[0] + "}")
                    .join(String(entry[1]));
            });

        return text;
    }

    function node(tag, className, content) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (
            content !== undefined &&
            content !== null
        ) {
            element.textContent = String(content);
        }

        return element;
    }

    function validScore(value) {
        return typeof value === "number" &&
            Number.isFinite(value) &&
            value >= 0 &&
            value <= 100;
    }

    function validCount(value) {
        return Number.isSafeInteger(value) &&
            value >= 0;
    }

    function formatNumber(value) {
        if (
            typeof value !== "number" ||
            !Number.isFinite(value)
        ) {
            return "—";
        }

        return new Intl.NumberFormat(
            locale(),
            {
                maximumFractionDigits: 2
            }
        ).format(value);
    }

    function formatScore(value) {
        if (!validScore(value)) {
            return "—";
        }

        return new Intl.NumberFormat(
            locale(),
            {
                style: "percent",
                maximumFractionDigits: 2
            }
        ).format(value / 100);
    }

    function getEngine() {
        return window.WorknelyUnifiedCareer || null;
    }

    function normalizeATS(input) {
        if (!Array.isArray(input)) {
            return [];
        }

        return input.filter(
            function (item) {
                return item &&
                    validScore(item.score) &&
                    typeof item.date === "string" &&
                    Number.isFinite(
                        Date.parse(item.date)
                    );
            }
        ).map(function (item) {
            return {
                score: item.score,
                timestamp: Date.parse(item.date)
            };
        }).sort(function (a, b) {
            return a.timestamp - b.timestamp;
        }).slice(-100);
    }

    function normalizeEvents(input, now) {
        if (!Array.isArray(input)) {
            return [];
        }

        return input.filter(
            function (item) {
                return item &&
                    (
                        item.type === "interview" ||
                        item.type === "follow-up"
                    ) &&
                    typeof item.date === "string" &&
                    Number.isFinite(
                        Date.parse(item.date)
                    ) &&
                    Date.parse(item.date) >= now;
            }
        ).map(function (item) {
            return {
                type: item.type,
                timestamp: Date.parse(item.date)
            };
        }).sort(function (a, b) {
            return a.timestamp - b.timestamp;
        }).slice(0, 10);
    }

    function createInsight(
        id,
        priority,
        rank,
        title,
        description,
        action,
        actionLabel,
        values
    ) {
        return {
            id: id,
            priority: priority,
            rank: rank,
            titleKey: title,
            descriptionKey: description,
            action: action,
            actionLabelKey: actionLabel,
            values: values || {}
        };
    }

    function calculate(snapshot, options) {
        const data = snapshot &&
            typeof snapshot === "object"
                ? snapshot
                : {};

        const now = Number.isFinite(options?.now)
            ? options.now
            : Date.now();

        const career = data.career || null;
        const jobs = data.applications || null;

        const history = normalizeATS(
            career?.atsHistory
        );

        const events = normalizeEvents(
            data.upcomingEvents,
            now
        );

        const insights = [];
        const ids = new Set();

        function add(item) {
            if (!ids.has(item.id)) {
                ids.add(item.id);
                insights.push(item);
            }
        }

        const urgentInterview = events.some(
            function (event) {
                return event.type === "interview" &&
                    event.timestamp <= now + DAY;
            }
        );

        const upcomingInterview = events.some(
            function (event) {
                return event.type === "interview" &&
                    event.timestamp <= now + 7 * DAY;
            }
        );

        const urgentFollowUp = events.some(
            function (event) {
                return event.type === "follow-up" &&
                    event.timestamp <= now + DAY;
            }
        );

        if (urgentInterview) {
            add(createInsight(
                "urgent-interview",
                "high",
                100,
                30,
                31,
                "calendar",
                32
            ));

        } else if (upcomingInterview) {
            add(createInsight(
                "upcoming-interview",
                "recommended",
                80,
                33,
                34,
                "calendar",
                32
            ));
        }

        if (urgentFollowUp) {
            add(createInsight(
                "urgent-follow-up",
                "high",
                95,
                35,
                36,
                "jobs",
                37
            ));
        }

        if (
            jobs &&
            validCount(jobs.offers) &&
            jobs.offers > 0
        ) {
            add(createInsight(
                "review-offer",
                "high",
                90,
                46,
                47,
                "jobs",
                37
            ));
        }

        if (career && history.length) {
            const latest =
                history[history.length - 1].score;

            if (latest < THRESHOLDS.atsLow) {
                add(createInsight(
                    "ats-low",
                    "high",
                    85,
                    16,
                    17,
                    "ats",
                    18,
                    { score: latest }
                ));

            } else if (
                latest < THRESHOLDS.atsStrong
            ) {
                add(createInsight(
                    "ats-review",
                    "recommended",
                    70,
                    19,
                    20,
                    "ats",
                    18,
                    { score: latest }
                ));

            } else {
                add(createInsight(
                    "ats-strong",
                    "positive",
                    30,
                    21,
                    22,
                    "ats",
                    18,
                    { score: latest }
                ));
            }

            if (history.length >= 2) {
                const previous =
                    history[
                        history.length - 2
                    ].score;

                const difference =
                    Math.round(
                        (latest - previous) * 100
                    ) / 100;

                if (
                    difference <=
                    -THRESHOLDS.atsDifference
                ) {
                    add(createInsight(
                        "ats-decrease",
                        "recommended",
                        65,
                        42,
                        43,
                        "performance",
                        55,
                        {
                            points: Math.abs(
                                difference
                            )
                        }
                    ));

                } else if (
                    difference >=
                    THRESHOLDS.atsDifference
                ) {
                    add(createInsight(
                        "ats-increase",
                        "positive",
                        35,
                        44,
                        45,
                        "performance",
                        55,
                        { points: difference }
                    ));
                }
            }

        } else if (
            career &&
            Array.isArray(career.atsHistory)
        ) {
            add(createInsight(
                "first-ats",
                "recommended",
                75,
                50,
                51,
                "ats",
                18
            ));
        }

        const skillCoverage =
            career?.skillCoverage?.score;

        if (
            validScore(skillCoverage) &&
            skillCoverage <
                THRESHOLDS.skillCoverage
        ) {
            add(createInsight(
                "skill-development",
                "recommended",
                72,
                23,
                24,
                "intelligence",
                25,
                { score: skillCoverage }
            ));
        }

        const careerMatch =
            career?.careerMatch?.score;

        if (
            validScore(careerMatch) &&
            careerMatch <
                THRESHOLDS.careerMatch
        ) {
            add(createInsight(
                "career-match",
                "recommended",
                68,
                26,
                27,
                "intelligence",
                54,
                { score: careerMatch }
            ));
        }

        const careerPlan =
            career?.careerPlan?.score;

        if (
            validScore(careerPlan) &&
            careerPlan < 100
        ) {
            add(createInsight(
                "career-plan",
                "recommended",
                60,
                28,
                29,
                "intelligence",
                54,
                { score: careerPlan }
            ));
        }

        if (
            jobs &&
            validCount(jobs.total)
        ) {
            if (jobs.total === 0) {
                add(createInsight(
                    "first-application",
                    "recommended",
                    58,
                    38,
                    39,
                    "jobs",
                    37
                ));

            } else if (
                jobs.active === 0 &&
                validCount(jobs.byStatus?.saved) &&
                jobs.byStatus.saved > 0
            ) {
                add(createInsight(
                    "saved-opportunities",
                    "recommended",
                    55,
                    40,
                    41,
                    "jobs",
                    37
                ));
            }
        }

        const recommendations = insights.sort(
            function (a, b) {
                return (
                    PRIORITY[b.priority] -
                    PRIORITY[a.priority]
                ) || b.rank - a.rank;
            }
        ).slice(
            0,
            THRESHOLDS.recommendationLimit
        );

        return {
            version: VERSION,

            recommendations: recommendations,

            total: recommendations.length,

            highPriority: recommendations.filter(
                function (item) {
                    return item.priority === "high";
                }
            ).length,

            positive: recommendations.filter(
                function (item) {
                    return item.priority === "positive";
                }
            ).length,

            partial:
                Boolean(data.partial) ||
                !career ||
                !jobs ||
                !Array.isArray(data.upcomingEvents),

            available: Boolean(
                career ||
                jobs ||
                Array.isArray(data.upcomingEvents)
            ),

            generatedAt: new Date(now).toISOString(),

            ruleBased: true,
            predictive: false,
            estimatedScores: true
        };
    }

    function priorityLabel(priority) {
        if (priority === "high") {
            return tr(3);
        }

        if (priority === "positive") {
            return tr(5);
        }

        return tr(4);
    }

    function formatValues(values) {
        const result = {};

        if (validScore(values?.score)) {
            result.score = formatScore(
                values.score
            );
        }

        if (
            typeof values?.points === "number" &&
            Number.isFinite(values.points)
        ) {
            result.points = formatNumber(
                values.points
            );
        }

        return result;
    }

    function createMessage(text) {
        const element = node(
            "p",
            "wnci-message",
            text
        );

        element.setAttribute(
            "role",
            "status"
        );

        return element;
    }

    function showActionMessage(text) {
        const message = root?.querySelector(
            ".wnci-action-message"
        );

        if (message) {
            message.textContent = text || "";
            message.hidden = !text;
        }
    }

    function navigate(action) {
        if (
            suspended ||
            getEngine()?.getState?.()?.recoveryMode ||
            !getEngine()?.getState?.()?.authenticated
        ) {
            return false;
        }

        showActionMessage("");

        if (action === "performance") {
            const target = document.getElementById(
                "wnCareerPerformance"
            );

            if (
                target &&
                target.getClientRects().length &&
                !target.closest("[hidden]")
            ) {
                const reduceMotion =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;

                target.scrollIntoView({
                    behavior: reduceMotion
                        ? "auto"
                        : "smooth",
                    block: "start"
                });

                return true;
            }
        }

        const actions =
            window.WorknelyCareerActions;

        if (
            actions &&
            typeof actions.navigate === "function" &&
            [
                "resume",
                "ats",
                "jobs",
                "calendar",
                "intelligence",
                "account"
            ].includes(action)
        ) {
            const result = actions.navigate(action);

            if (result) {
                return true;
            }
        }

        showActionMessage(tr(53));

        return false;
    }

    function createMetric(label, value, type) {
        const card = node(
            "article",
            "wnci-metric wnci-" + type
        );

        card.append(
            node(
                "span",
                "wnci-muted",
                label
            ),
            node(
                "strong",
                "wnci-metric-value",
                formatNumber(value)
            )
        );

        return card;
    }

    function createInsightCard(insight) {
        const card = node(
            "article",
            "wnci-card wnci-" +
                insight.priority
        );

        const header = node(
            "div",
            "wnci-card-header"
        );

        const symbol = node(
            "span",
            "wnci-symbol",
            insight.priority === "high"
                ? "!"
                : insight.priority === "positive"
                    ? "↗"
                    : "✦"
        );

        symbol.setAttribute(
            "aria-hidden",
            "true"
        );

        header.append(
            symbol,
            node(
                "span",
                "wnci-priority",
                priorityLabel(insight.priority)
            )
        );

        const values = formatValues(
            insight.values
        );

        const title = node(
            "h3",
            "wnci-card-title",
            tr(insight.titleKey, values)
        );

        const description = node(
            "p",
            "wnci-description",
            tr(insight.descriptionKey, values)
        );

        const button = node(
            "button",
            "wnci-action",
            tr(insight.actionLabelKey) + " →"
        );

        button.type = "button";

        button.addEventListener(
            "click",
            function () {
                navigate(insight.action);
            }
        );

        card.append(
            header,
            title,
            description,
            button
        );

        return card;
    }

    function createHeader() {
        const header = node(
            "div",
            "wnci-header"
        );

        const symbol = node(
            "span",
            "wnci-header-symbol",
            "✦"
        );

        symbol.setAttribute(
            "aria-hidden",
            "true"
        );

        const content = node(
            "div",
            "wnci-header-content"
        );

        content.append(
            node(
                "h2",
                "wnci-heading",
                tr(0)
            ),
            node(
                "p",
                "wnci-muted",
                tr(1)
            )
        );

        header.append(
            symbol,
            content
        );

        return header;
    }

    function createRefreshButton(api) {
        const button = node(
            "button",
            "wnci-refresh",
            tr(10)
        );

        button.type = "button";

        button.disabled =
            typeof api?.refresh !== "function";

        button.addEventListener(
            "click",
            function () {
                if (
                    !suspended &&
                    !api.getState?.()?.recoveryMode &&
                    api.getState?.()?.authenticated
                ) {
                    api.refresh();
                }
            }
        );

        return button;
    }

    function render() {
        if (
            suspended ||
            !root ||
            !root.isConnected
        ) {
            return false;
        }

        const api = getEngine();

        const fragment =
            document.createDocumentFragment();

        fragment.appendChild(
            createHeader()
        );

        root.setAttribute(
            "aria-label",
            tr(0)
        );

        if (
            !api ||
            typeof api.getState !== "function" ||
            typeof api.getSnapshot !== "function"
        ) {
            fragment.appendChild(
                createMessage(tr(8))
            );

            root.replaceChildren(fragment);

            return false;
        }

        const state = api.getState();

        root.setAttribute(
            "aria-busy",
            String(Boolean(state.loading))
        );

        let message = null;

        if (state.recoveryMode) {
            message = tr(9);

        } else if (state.loading) {
            message = tr(7);

        } else if (!state.authenticated) {
            message = tr(6);
        }

        if (message) {
            fragment.appendChild(
                createMessage(message)
            );

            root.replaceChildren(fragment);

            return true;
        }

        const snapshot = api.getSnapshot();

        if (!snapshot) {
            fragment.append(
                createMessage(tr(8)),
                createRefreshButton(api)
            );

            root.replaceChildren(fragment);

            return false;
        }

        const result = calculate(snapshot);

        if (!result.available) {
            fragment.append(
                createMessage(tr(8)),
                createRefreshButton(api)
            );

            root.replaceChildren(fragment);

            return false;
        }

        if (result.partial) {
            fragment.appendChild(
                createMessage(tr(12))
            );
        }

        const metrics = node(
            "div",
            "wnci-metrics"
        );

        metrics.append(
            createMetric(
                tr(2),
                result.total,
                "recommended"
            ),
            createMetric(
                tr(3),
                result.highPriority,
                "high"
            ),
            createMetric(
                tr(5),
                result.positive,
                "positive"
            )
        );

        fragment.appendChild(metrics);

        if (!result.recommendations.length) {
            const empty = node(
                "div",
                "wnci-empty"
            );

            empty.append(
                node(
                    "strong",
                    "",
                    tr(48)
                ),
                node(
                    "p",
                    "wnci-muted",
                    tr(49)
                )
            );

            fragment.appendChild(empty);

        } else {
            const grid = node(
                "div",
                "wnci-grid"
            );

            result.recommendations.forEach(
                function (insight) {
                    grid.appendChild(
                        createInsightCard(insight)
                    );
                }
            );

            fragment.appendChild(grid);
        }

        const actionMessage = node(
            "p",
            "wnci-action-message wnci-message"
        );

        actionMessage.hidden = true;

        actionMessage.setAttribute(
            "role",
            "status"
        );

        const footer = node(
            "div",
            "wnci-footer"
        );

        footer.append(
            node(
                "p",
                "wnci-muted",
                tr(52)
            ),
            node(
                "p",
                "wnci-muted",
                tr(57)
            ),
            node(
                "p",
                "wnci-muted",
                tr(11)
            ),
            createRefreshButton(api)
        );

        fragment.append(
            actionMessage,
            footer
        );

        root.replaceChildren(fragment);

        return true;
    }

    function installStyles() {
        if (
            document.getElementById(STYLE_ID)
        ) {
            return;
        }

        const style = node("style");

        style.id = STYLE_ID;

        style.textContent = `
#wnCareerInsights {
    display: grid;
    gap: 18px;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    color: #211936;
    font-family: inherit;
    overflow-wrap: anywhere;
    box-sizing: border-box;
}

#wnCareerInsights *,
#wnCareerInsights *::before,
#wnCareerInsights *::after {
    box-sizing: border-box;
}

#wnCareerInsights .wnci-header {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    min-width: 0;
    padding: 24px;
    border: 1px solid #e4d8ff;
    border-radius: 24px;
    background: linear-gradient(
        135deg,
        #f3e8ff,
        #ffffff,
        #fce7f3,
        #ecfeff
    );
}

#wnCareerInsights .wnci-header-symbol {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 15px;
    background: #7c3aed;
    color: #ffffff;
    font-size: 28px;
}

#wnCareerInsights .wnci-header-content {
    min-width: 0;
    flex: 1;
}

#wnCareerInsights .wnci-heading {
    margin: 0 0 8px;
    font-size: clamp(22px, 4vw, 30px);
    line-height: 1.25;
    font-weight: 800;
    letter-spacing: -.025em;
}

#wnCareerInsights .wnci-muted {
    color: #71677f;
    font-size: 12px;
    line-height: 1.65;
}

#wnCareerInsights .wnci-high {
    --wnci-accent: #be185d;
    --wnci-soft: #fce7f3;
    --wnci-border: #f9a8d4;
}

#wnCareerInsights .wnci-recommended {
    --wnci-accent: #7c3aed;
    --wnci-soft: #f3e8ff;
    --wnci-border: #ddd6fe;
}

#wnCareerInsights .wnci-positive {
    --wnci-accent: #047857;
    --wnci-soft: #d1fae5;
    --wnci-border: #a7f3d0;
}

#wnCareerInsights .wnci-metrics {
    display: grid;
    grid-template-columns:
        repeat(3, minmax(0, 1fr));
    gap: 12px;
    min-width: 0;
}

#wnCareerInsights .wnci-metric {
    display: grid;
    gap: 8px;
    min-width: 0;
    padding: 18px;
    border: 1px solid var(--wnci-border);
    border-radius: 18px;
    background: var(--wnci-soft);
}

#wnCareerInsights .wnci-metric-value {
    color: var(--wnci-accent);
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 800;
    line-height: 1.2;
    font-variant-numeric: tabular-nums;
}

#wnCareerInsights .wnci-grid {
    display: grid;
    grid-template-columns:
        repeat(2, minmax(0, 1fr));
    gap: 14px;
    min-width: 0;
}

#wnCareerInsights .wnci-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    padding: 20px;
    border: 1px solid #e9e2f4;
    border-top: 3px solid var(--wnci-accent);
    border-radius: 20px;
    background: #ffffff;
    box-shadow:
        0 5px 20px rgba(61,29,112,.04);
}

#wnCareerInsights .wnci-card-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

#wnCareerInsights .wnci-symbol {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: var(--wnci-soft);
    color: var(--wnci-accent);
    font-size: 22px;
    font-weight: 800;
}

#wnCareerInsights .wnci-priority {
    color: var(--wnci-accent);
    font-size: 11px;
    font-weight: 750;
    line-height: 1.4;
}

#wnCareerInsights .wnci-card-title {
    margin: 0;
    font-size: 17px;
    font-weight: 750;
    line-height: 1.4;
}

#wnCareerInsights .wnci-description {
    margin: 0 0 4px;
    color: #625970;
    font-size: 13px;
    line-height: 1.75;
}

#wnCareerInsights .wnci-action {
    align-self: flex-start;
    margin-top: auto;
    min-height: 44px;
    max-width: 100%;
    padding: 11px 14px;
    border: 1px solid var(--wnci-border);
    border-radius: 12px;
    background: var(--wnci-soft);
    color: var(--wnci-accent);
    font-family: inherit;
    font-size: 12px;
    font-weight: 750;
    text-align: left;
    white-space: normal;
    cursor: pointer;
}

#wnCareerInsights .wnci-action:hover {
    border-color: var(--wnci-accent);
}

#wnCareerInsights .wnci-message {
    margin: 0;
    padding: 15px;
    border: 1px solid #e9d5ff;
    border-radius: 14px;
    background: #f5f3ff;
    color: #5b21b6;
    font-size: 13px;
    line-height: 1.65;
}

#wnCareerInsights .wnci-empty {
    padding: 20px;
    border: 1px solid #e9e2f4;
    border-radius: 18px;
    background: #faf8ff;
}

#wnCareerInsights .wnci-footer {
    display: grid;
    gap: 5px;
    min-width: 0;
    padding: 16px;
    border: 1px solid #eee7fa;
    border-radius: 18px;
    background: #faf8ff;
}

#wnCareerInsights .wnci-footer p {
    margin: 0;
}

#wnCareerInsights .wnci-refresh {
    justify-self: start;
    min-height: 44px;
    max-width: 100%;
    margin-top: 8px;
    padding: 12px 18px;
    border: 1px solid #ddd6fe;
    border-radius: 12px;
    background: #ffffff;
    color: #7c3aed;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    white-space: normal;
    cursor: pointer;
}

#wnCareerInsights .wnci-refresh:disabled {
    opacity: .55;
    cursor: default;
}

#wnCareerInsights button:focus-visible {
    outline: 3px solid #a78bfa;
    outline-offset: 3px;
}

#wnCareerInsights [hidden] {
    display: none !important;
}

@media (max-width: 700px) {
    #wnCareerInsights .wnci-grid {
        grid-template-columns:
            minmax(0, 1fr);
    }

    #wnCareerInsights .wnci-header {
        padding: 18px;
    }

    #wnCareerInsights .wnci-card {
        padding: 16px;
    }

    #wnCareerInsights .wnci-metric {
        padding: 13px;
    }
}

@media (max-width: 480px) {
    #wnCareerInsights .wnci-metrics {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }

    #wnCareerInsights .wnci-metric:last-child {
        grid-column: 1 / -1;
    }

    #wnCareerInsights .wnci-action {
        width: 100%;
    }
}

@media (max-width: 340px) {
    #wnCareerInsights .wnci-metrics {
        grid-template-columns:
            minmax(0, 1fr);
    }
}

@media print {
    #wnCareerInsights {
        display: none !important;
    }
}
`;

        document.head.appendChild(style);
    }

    function mount(target) {
        if (suspended) {
            return false;
        }

        const container =
            typeof target === "string"
                ? document.querySelector(target)
                : target instanceof HTMLElement
                    ? target
                    : document.getElementById(MOUNT_ID);

        const fallback =
            document.getElementById(
                "wnCareerActions"
            ) ||
            document.getElementById(
                "wnCareerPerformance"
            ) ||
            document.getElementById(
                "wnProfessionalDashboard"
            );

        if (
            !container &&
            !fallback?.parentElement
        ) {
            return false;
        }

        installStyles();

        root = document.getElementById(ROOT_ID);

        if (!root) {
            root = node(
                "section",
                "wnci-insights"
            );

            root.id = ROOT_ID;
        }

        if (container) {
            if (
                root.parentElement !== container
            ) {
                container.appendChild(root);
            }

        } else if (
            fallback.nextElementSibling !== root
        ) {
            fallback.insertAdjacentElement(
                "afterend",
                root
            );
        }

        render();

        return true;
    }

    function initialize() {
        if (suspended) {
            return false;
        }

        return mount();
    }

    function handleUpdate() {
        if (suspended) {
            return;
        }

        if (!root?.isConnected) {
            initialize();

        } else {
            render();
        }
    }

    function selfTest() {
        const now = Date.parse(
            "2026-11-27T12:00:00Z"
        );

        const options = { now: now };

        function has(result, id) {
            return result.recommendations.some(
                function (item) {
                    return item.id === id;
                }
            );
        }

        function ats(score) {
            return {
                score: score,
                date: new Date(
                    now - DAY
                ).toISOString()
            };
        }

        const low = calculate({
            career: {
                atsHistory: [ats(41)]
            }
        }, options);

        const medium = calculate({
            career: {
                atsHistory: [ats(72)]
            }
        }, options);

        const strong = calculate({
            career: {
                atsHistory: [ats(88)]
            }
        }, options);

        const empty = calculate({
            career: {
                atsHistory: []
            },
            applications: {
                total: 0,
                active: 0
            },
            upcomingEvents: []
        }, options);

        const unavailable = calculate(
            null,
            options
        );

        const skills = calculate({
            career: {
                skillCoverage: {
                    score: 55
                },
                careerMatch: {
                    score: 48
                },
                careerPlan: {
                    score: 30
                }
            }
        }, options);

        const urgent = calculate({
            upcomingEvents: [
                {
                    type: "interview",
                    date: new Date(
                        now + 3600000
                    ).toISOString()
                },
                {
                    type: "follow-up",
                    date: new Date(
                        now + 7200000
                    ).toISOString()
                }
            ]
        }, options);

        const future = calculate({
            upcomingEvents: [
                {
                    type: "interview",
                    date: new Date(
                        now + 3 * DAY
                    ).toISOString()
                }
            ]
        }, options);

        const increase = calculate({
            career: {
                atsHistory: [
                    {
                        score: 41,
                        date: new Date(
                            now - 2 * DAY
                        ).toISOString()
                    },
                    ats(81)
                ]
            }
        }, options);

        const decrease = calculate({
            career: {
                atsHistory: [
                    {
                        score: 81,
                        date: new Date(
                            now - 2 * DAY
                        ).toISOString()
                    },
                    ats(36)
                ]
            }
        }, options);

        const offers = calculate({
            applications: {
                total: 2,
                active: 1,
                offers: 1
            }
        }, options);

        const saved = calculate({
            applications: {
                total: 2,
                active: 0,
                byStatus: {
                    saved: 2
                }
            }
        }, options);

        const expired = calculate({
            upcomingEvents: [
                {
                    type: "interview",
                    date: new Date(
                        now - DAY
                    ).toISOString()
                }
            ]
        }, options);

        const invalid = calculate({
            career: {
                atsHistory: [
                    ats(150),
                    ats(-20),
                    ats(null)
                ],
                skillCoverage: {
                    score: 200
                }
            }
        }, options);

        const checks = [
            {
                name: "Low ATS recommendation",
                pass: has(low, "ats-low")
            },
            {
                name: "Medium ATS recommendation",
                pass: has(medium, "ats-review")
            },
            {
                name: "Strong ATS recommendation",
                pass: has(strong, "ats-strong")
            },
            {
                name: "First ATS analysis",
                pass: has(empty, "first-ats")
            },
            {
                name: "First application",
                pass: has(
                    empty,
                    "first-application"
                )
            },
            {
                name: "Unavailable data",
                pass:
                    !unavailable.available &&
                    unavailable.total === 0
            },
            {
                name: "Skill development",
                pass: has(
                    skills,
                    "skill-development"
                )
            },
            {
                name: "Career match",
                pass: has(
                    skills,
                    "career-match"
                )
            },
            {
                name: "Career plan",
                pass: has(
                    skills,
                    "career-plan"
                )
            },
            {
                name: "Urgent interview",
                pass: has(
                    urgent,
                    "urgent-interview"
                )
            },
            {
                name: "Urgent follow-up",
                pass: has(
                    urgent,
                    "urgent-follow-up"
                )
            },
            {
                name: "Upcoming interview",
                pass: has(
                    future,
                    "upcoming-interview"
                )
            },
            {
                name: "ATS increase",
                pass: has(
                    increase,
                    "ats-increase"
                )
            },
            {
                name: "ATS decrease",
                pass: has(
                    decrease,
                    "ats-decrease"
                )
            },
            {
                name: "Offer recommendation",
                pass: has(
                    offers,
                    "review-offer"
                )
            },
            {
                name: "Saved opportunities",
                pass: has(
                    saved,
                    "saved-opportunities"
                )
            },
            {
                name: "Expired events ignored",
                pass: expired.total === 0
            },
            {
                name: "Invalid scores ignored",
                pass:
                    !has(invalid, "ats-low") &&
                    !has(
                        invalid,
                        "skill-development"
                    )
            },
            {
                name: "Priority ordering",
                pass:
                    urgent.recommendations[0]?.id ===
                    "urgent-interview"
            },
            {
                name: "Six language dictionaries",
                pass:
                    Object.keys(D).length === 6 &&
                    Object.values(D).every(
                        function (dictionary) {
                            return dictionary.length ===
                                D.en.length;
                        }
                    )
            }
        ];

        const passed = checks.filter(
            function (check) {
                return check.pass;
            }
        ).length;

        return {
            version: VERSION,
            passed: passed,
            total: checks.length,
            ok: passed === checks.length,
            checks: checks
        };
    }

    function installListeners() {
        if (initialized) {
            return;
        }

        initialized = true;

        [
            "worknely:unifiedcareerchange",
            "worknely:unifiedcareerready",
            "worknely:professionaldashboardready",
            "worknely:careerperformanceready",
            "worknely:careeractionsready",
            "worknely:workspacechange",
            "worknely:languagechange",
            "worknely:localizationready"
        ].forEach(function (eventName) {
            document.addEventListener(
                eventName,
                handleUpdate
            );
        });

        document.addEventListener(
            "change",
            function (event) {
                if (
                    event.target?.id === "language"
                ) {
                    handleUpdate();
                }
            }
        );

        document.addEventListener(
            "visibilitychange",
            function () {
                if (
                    document.visibilityState ===
                    "visible"
                ) {
                    handleUpdate();
                }
            }
        );

        window.addEventListener(
            "pagehide",
            function () {
                suspended = true;

                if (root) {
                    root.replaceChildren();

                    root.setAttribute(
                        "aria-busy",
                        "false"
                    );
                }
            }
        );

        window.addEventListener(
            "pageshow",
            function () {
                suspended = false;
                initialize();
            }
        );
    }

    window.WorknelyCareerInsights =
        Object.freeze({
            version: VERSION,
            calculate: calculate,
            mount: mount,
            initialize: initialize,
            refresh: render,
            selfTest: selfTest,

            getState: function () {
                return {
                    version: VERSION,

                    mounted: Boolean(
                        root?.isConnected
                    ),

                    engineAvailable: Boolean(
                        getEngine()
                    ),

                    language: language(),

                    supportedLanguages:
                        Object.keys(D),

                    thresholds: {
                        ...THRESHOLDS
                    },

                    ruleBased: true,
                    predictive: false,
                    readOnly: true,
                    localDataStorage: false,
                    automaticSaving: false,
                    additionalDatabaseQueries: false,
                    externalAI: false
                };
            }
        });

    installListeners();

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );

    } else {
        initialize();
    }

    window.addEventListener(
        "load",
        initialize,
        { once: true }
    );

    document.dispatchEvent(
        new CustomEvent(
            "worknely:careerinsightsready",
            {
                detail: {
                    version: VERSION
                }
            }
        )
    );

})();
