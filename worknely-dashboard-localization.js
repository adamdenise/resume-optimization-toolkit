
(function () {
    "use strict";

    const VERSION = "7.20.6";

    const LANGUAGES = Object.freeze([
        "en",
        "ro",
        "it",
        "de",
        "fr",
        "es"
    ]);

    const LOCALES = Object.freeze({
        en: "en-GB",
        ro: "ro-RO",
        it: "it-IT",
        de: "de-DE",
        fr: "fr-FR",
        es: "es-ES"
    });

    const NAMES = Object.freeze({
        en: "English",
        ro: "Română",
        it: "Italiano",
        de: "Deutsch",
        fr: "Français",
        es: "Español"
    });

    const FLAGS = Object.freeze({
        en: "🇬🇧",
        ro: "🇷🇴",
        it: "🇮🇹",
        de: "🇩🇪",
        fr: "🇫🇷",
        es: "🇪🇸"
    });

    const KEYS = Object.freeze([
        "dashboard.title",
        "dashboard.subtitle",
        "dashboard.overview",
        "dashboard.performance",
        "dashboard.actions",
        "dashboard.events",
        "dashboard.insights",
        "dashboard.navigation",
        "dashboard.refresh",
        "dashboard.loading",
        "dashboard.signIn",
        "dashboard.unavailable",
        "dashboard.partial",
        "dashboard.empty",
        "dashboard.updated",
        "dashboard.estimated",
        "dashboard.privacy",
        "dashboard.language",
        "dashboard.workspace",
        "dashboard.resume",
        "dashboard.applications",
        "dashboard.interviews",
        "dashboard.followUps",
        "dashboard.savedAnalyses",
        "dashboard.ats",
        "dashboard.careerMatch",
        "dashboard.skillCoverage",
        "dashboard.careerPlan",
        "dashboard.highPriority",
        "dashboard.recommended",
        "dashboard.positive",
        "dashboard.today",
        "dashboard.tomorrow",
        "dashboard.next24Hours",
        "dashboard.next7Days",
        "dashboard.percentagePoints",
        "dashboard.recovery",
        "dashboard.readOnly",
        "dashboard.noGuarantee",
        "dashboard.open"
    ]);

    const RAW = {
        en: [
            "Professional Career Dashboard",
            "Manage your professional journey in one workspace.",
            "Career overview",
            "Career performance",
            "Quick actions",
            "Upcoming events",
            "Personalized career insights",
            "Career dashboard",
            "Refresh dashboard",
            "Loading your career data...",
            "Sign in to access your career dashboard.",
            "Career data is currently unavailable.",
            "Some career information is unavailable.",
            "No saved career data yet.",
            "Last updated",
            "Estimated results",
            "Your saved data is private to your account.",
            "Interface language",
            "Professional workspace",
            "Saved resumes",
            "Job applications",
            "Interviews",
            "Follow-ups",
            "Saved analyses",
            "Estimated ATS readiness",
            "Estimated career match",
            "Estimated skill coverage",
            "Career plan progress",
            "High priority",
            "Recommended",
            "Positive result",
            "Today",
            "Tomorrow",
            "Next 24 hours",
            "Next 7 days",
            "percentage points",
            "Complete password recovery first.",
            "Read-only dashboard",
            "Estimated results do not guarantee employment.",
            "Open"
        ],

        ro: [
            "Panou profesional de carieră",
            "Gestionează parcursul profesional într-un singur spațiu.",
            "Prezentare generală a carierei",
            "Performanță profesională",
            "Acțiuni rapide",
            "Evenimente viitoare",
            "Recomandări profesionale personalizate",
            "Panou de carieră",
            "Actualizează panoul",
            "Se încarcă datele profesionale...",
            "Autentifică-te pentru a accesa panoul de carieră.",
            "Datele profesionale sunt momentan indisponibile.",
            "Unele informații profesionale sunt indisponibile.",
            "Nu există încă date profesionale salvate.",
            "Ultima actualizare",
            "Rezultate estimate",
            "Datele salvate sunt private contului tău.",
            "Limba interfeței",
            "Spațiu profesional",
            "CV-uri salvate",
            "Candidaturi",
            "Interviuri",
            "Reveniri",
            "Analize salvate",
            "Compatibilitate ATS estimată",
            "Potrivire profesională estimată",
            "Acoperirea estimată a competențelor",
            "Progresul planului de carieră",
            "Prioritate ridicată",
            "Recomandat",
            "Rezultat pozitiv",
            "Astăzi",
            "Mâine",
            "Următoarele 24 de ore",
            "Următoarele 7 zile",
            "puncte procentuale",
            "Finalizează mai întâi recuperarea parolei.",
            "Panou destinat consultării datelor",
            "Rezultatele estimate nu garantează angajarea.",
            "Deschide"
        ],

        it: [
            "Dashboard professionale",
            "Gestisci il tuo percorso professionale in un unico spazio.",
            "Panoramica della carriera",
            "Prestazioni professionali",
            "Azioni rapide",
            "Prossimi eventi",
            "Suggerimenti professionali personalizzati",
            "Dashboard carriera",
            "Aggiorna dashboard",
            "Caricamento dei dati professionali...",
            "Accedi per consultare la dashboard.",
            "I dati professionali non sono disponibili.",
            "Alcune informazioni non sono disponibili.",
            "Nessun dato professionale salvato.",
            "Ultimo aggiornamento",
            "Risultati stimati",
            "I dati salvati sono privati del tuo account.",
            "Lingua dell'interfaccia",
            "Spazio professionale",
            "CV salvati",
            "Candidature",
            "Colloqui",
            "Follow-up",
            "Analisi salvate",
            "Compatibilità ATS stimata",
            "Compatibilità professionale stimata",
            "Copertura stimata delle competenze",
            "Progresso del piano di carriera",
            "Priorità alta",
            "Consigliato",
            "Risultato positivo",
            "Oggi",
            "Domani",
            "Prossime 24 ore",
            "Prossimi 7 giorni",
            "punti percentuali",
            "Completa prima il recupero della password.",
            "Dashboard di sola lettura",
            "I risultati stimati non garantiscono l'assunzione.",
            "Apri"
        ],

        de: [
            "Professionelles Karriere-Dashboard",
            "Verwalte deinen beruflichen Weg an einem Ort.",
            "Karriereübersicht",
            "Karriereleistung",
            "Schnellaktionen",
            "Bevorstehende Termine",
            "Personalisierte Karriereempfehlungen",
            "Karriere-Dashboard",
            "Dashboard aktualisieren",
            "Karrieredaten werden geladen...",
            "Melde dich an, um dein Dashboard zu öffnen.",
            "Karrieredaten sind derzeit nicht verfügbar.",
            "Einige Karriereinformationen fehlen.",
            "Noch keine gespeicherten Karrieredaten.",
            "Zuletzt aktualisiert",
            "Geschätzte Ergebnisse",
            "Gespeicherte Daten sind deinem Konto vorbehalten.",
            "Sprache der Benutzeroberfläche",
            "Beruflicher Arbeitsbereich",
            "Gespeicherte Lebensläufe",
            "Bewerbungen",
            "Vorstellungsgespräche",
            "Nachverfolgungen",
            "Gespeicherte Analysen",
            "Geschätzte ATS-Kompatibilität",
            "Geschätzte Karriereübereinstimmung",
            "Geschätzte Kompetenzabdeckung",
            "Fortschritt des Karriereplans",
            "Hohe Priorität",
            "Empfohlen",
            "Positives Ergebnis",
            "Heute",
            "Morgen",
            "Nächste 24 Stunden",
            "Nächste 7 Tage",
            "Prozentpunkte",
            "Schließe zuerst die Passwortwiederherstellung ab.",
            "Schreibgeschütztes Dashboard",
            "Geschätzte Ergebnisse garantieren keine Anstellung.",
            "Öffnen"
        ],

        fr: [
            "Tableau de bord professionnel",
            "Gérez votre parcours professionnel dans un seul espace.",
            "Vue d'ensemble de la carrière",
            "Performance professionnelle",
            "Actions rapides",
            "Prochains événements",
            "Conseils professionnels personnalisés",
            "Tableau de bord carrière",
            "Actualiser le tableau de bord",
            "Chargement des données professionnelles...",
            "Connectez-vous pour accéder au tableau de bord.",
            "Les données professionnelles sont indisponibles.",
            "Certaines informations sont indisponibles.",
            "Aucune donnée professionnelle enregistrée.",
            "Dernière mise à jour",
            "Résultats estimés",
            "Les données enregistrées sont privées à votre compte.",
            "Langue de l'interface",
            "Espace professionnel",
            "CV enregistrés",
            "Candidatures",
            "Entretiens",
            "Relances",
            "Analyses enregistrées",
            "Compatibilité ATS estimée",
            "Compatibilité professionnelle estimée",
            "Couverture estimée des compétences",
            "Progression du plan de carrière",
            "Priorité élevée",
            "Recommandé",
            "Résultat positif",
            "Aujourd'hui",
            "Demain",
            "Prochaines 24 heures",
            "Prochains 7 jours",
            "points de pourcentage",
            "Terminez d'abord la récupération du mot de passe.",
            "Tableau de bord en lecture seule",
            "Les résultats estimés ne garantissent pas un emploi.",
            "Ouvrir"
        ],

        es: [
            "Panel profesional de carrera",
            "Gestiona tu trayectoria profesional en un solo espacio.",
            "Resumen profesional",
            "Rendimiento profesional",
            "Acciones rápidas",
            "Próximos eventos",
            "Recomendaciones profesionales personalizadas",
            "Panel de carrera",
            "Actualizar panel",
            "Cargando datos profesionales...",
            "Inicia sesión para acceder a tu panel.",
            "Los datos profesionales no están disponibles.",
            "Falta alguna información profesional.",
            "Todavía no hay datos profesionales guardados.",
            "Última actualización",
            "Resultados estimados",
            "Los datos guardados son privados de tu cuenta.",
            "Idioma de la interfaz",
            "Espacio profesional",
            "CV guardados",
            "Candidaturas",
            "Entrevistas",
            "Seguimientos",
            "Análisis guardados",
            "Compatibilidad ATS estimada",
            "Compatibilidad profesional estimada",
            "Cobertura estimada de competencias",
            "Progreso del plan de carrera",
            "Prioridad alta",
            "Recomendado",
            "Resultado positivo",
            "Hoy",
            "Mañana",
            "Próximas 24 horas",
            "Próximos 7 días",
            "puntos porcentuales",
            "Completa primero la recuperación de contraseña.",
            "Panel de solo lectura",
            "Los resultados estimados no garantizan empleo.",
            "Abrir"
        ]
    };

    const DICTIONARY = Object.freeze(
        Object.fromEntries(
            LANGUAGES.map(function (code) {
                return [
                    code,
                    Object.freeze(
                        Object.fromEntries(
                            KEYS.map(function (key, index) {
                                return [
                                    key,
                                    RAW[code][index]
                                ];
                            })
                        )
                    )
                ];
            })
        )
    );

    const MODULES = Object.freeze([
        {
            name: "Professional Dashboard",
            global: "WorknelyProfessionalDashboard",
            root: "wnProfessionalDashboard"
        },
        {
            name: "Career Performance",
            global: "WorknelyCareerPerformance",
            root: "wnCareerPerformance"
        },
        {
            name: "Career Actions",
            global: "WorknelyCareerActions",
            root: "wnCareerActions"
        },
        {
            name: "Career Insights",
            global: "WorknelyCareerInsights",
            root: "wnCareerInsights"
        }
    ]);

    let initialized = false;
    let suspended = false;
    let scheduled = false;
    let applying = false;
    let generation = 0;
    let lastLanguage = null;

    function normalizeLanguage(value) {
        const code = String(value || "")
            .trim()
            .toLowerCase()
            .split(/[-_]/)[0];

        return LANGUAGES.includes(code)
            ? code
            : "en";
    }

    function getLanguage() {
        return normalizeLanguage(
            window.WorknelyLocalization
                ?.getLanguage?.() ||
            document.getElementById("language")
                ?.value ||
            document.documentElement.lang ||
            "en"
        );
    }

    function getLocale(code) {
        return LOCALES[
            normalizeLanguage(
                code || getLanguage()
            )
        ];
    }

    function translate(key, values, code) {
        const language = normalizeLanguage(
            code || getLanguage()
        );

        const dictionary =
            DICTIONARY[language];

        if (
            !Object.prototype.hasOwnProperty.call(
                DICTIONARY.en,
                key
            )
        ) {
            return String(key || "");
        }

        let result =
            dictionary[key] ||
            DICTIONARY.en[key] ||
            "";

        Object.entries(values || {})
            .forEach(function (entry) {
                result = result
                    .split("{" + entry[0] + "}")
                    .join(String(entry[1]));
            });

        return result;
    }

    function formatNumber(value, options, code) {
        if (
            typeof value !== "number" ||
            !Number.isFinite(value)
        ) {
            return "—";
        }

        return new Intl.NumberFormat(
            getLocale(code),
            {
                maximumFractionDigits: 2,
                ...(options || {})
            }
        ).format(value);
    }

    function formatPercent(value, code) {
        if (
            typeof value !== "number" ||
            !Number.isFinite(value) ||
            value < 0 ||
            value > 100
        ) {
            return "—";
        }

        return formatNumber(
            value / 100,
            {
                style: "percent",
                maximumFractionDigits: 2
            },
            code
        );
    }

    function formatDifference(value, code) {
        if (
            typeof value !== "number" ||
            !Number.isFinite(value) ||
            value < -100 ||
            value > 100
        ) {
            return "—";
        }

        const sign = value > 0
            ? "+"
            : value < 0
                ? "−"
                : "";

        return sign +
            formatNumber(
                Math.abs(value),
                {},
                code
            ) +
            " " +
            translate(
                "dashboard.percentagePoints",
                {},
                code
            );
    }

    function formatDate(value, options, code) {
        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "—";
        }

        const date = value instanceof Date
            ? value
            : new Date(value);

        if (!Number.isFinite(date.getTime())) {
            return "—";
        }

        return new Intl.DateTimeFormat(
            getLocale(code),
            options || {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        ).format(date);
    }

    function formatTime(value, code) {
        return formatDate(
            value,
            {
                hour: "2-digit",
                minute: "2-digit"
            },
            code
        );
    }

    function getModuleRoots() {
        const roots = new Set();

        MODULES.forEach(function (module) {
            const root = document.getElementById(
                module.root
            );

            if (root) {
                roots.add(root);
            }
        });

        const workspace =
            document.getElementById(
                "professional-dashboard"
            );

        if (workspace) {
            roots.add(workspace);
        }

        return Array.from(roots);
    }

    function applyText(element, attribute, target) {
        const key = element.getAttribute(
            attribute
        );

        if (
            !key ||
            !Object.prototype.hasOwnProperty.call(
                DICTIONARY.en,
                key
            )
        ) {
            return false;
        }

        const value = translate(key);

        if (target === "textContent") {
            if (element.children.length) {
                return false;
            }

            if (
                [
                    "INPUT",
                    "TEXTAREA",
                    "SELECT",
                    "SCRIPT",
                    "STYLE"
                ].includes(element.tagName)
            ) {
                return false;
            }

            if (element.textContent !== value) {
                element.textContent = value;
                return true;
            }

            return false;
        }

        if (
            element.getAttribute(target) !== value
        ) {
            element.setAttribute(
                target,
                value
            );

            return true;
        }

        return false;
    }

    function applyTranslations() {
        if (suspended) {
            return 0;
        }

        const attributes = [
            [
                "data-wn-dashboard-i18n",
                "textContent"
            ],
            [
                "data-wn-dashboard-title",
                "title"
            ],
            [
                "data-wn-dashboard-aria",
                "aria-label"
            ],
            [
                "data-wn-dashboard-placeholder",
                "placeholder"
            ]
        ];

        const visited = new Set();
        let updated = 0;

        getModuleRoots().forEach(
            function (root) {
                root.setAttribute(
                    "lang",
                    getLanguage()
                );

                root.setAttribute(
                    "dir",
                    "ltr"
                );

                attributes.forEach(
                    function (entry) {
                        const selector =
                            "[" + entry[0] + "]";

                        const elements = Array.from(
                            root.querySelectorAll(
                                selector
                            )
                        );

                        if (root.matches(selector)) {
                            elements.unshift(root);
                        }

                        elements.forEach(
                            function (element) {
                                if (
                                    applyText(
                                        element,
                                        entry[0],
                                        entry[1]
                                    )
                                ) {
                                    visited.add(element);
                                    updated++;
                                }
                            }
                        );
                    }
                );
            }
        );

        return updated;
    }

    function refreshPresentationModules() {
        let refreshed = 0;

        [
            "WorknelyCareerActions",
            "WorknelyCareerInsights"
        ].forEach(function (name) {
            const api = window[name];

            if (
                api &&
                typeof api.refresh === "function"
            ) {
                try {
                    api.refresh();
                    refreshed++;
                } catch (_) {
                    // A failed module must not block
                    // localization of other modules.
                }
            }
        });

        return refreshed;
    }

    function synchronize(options) {
        if (
            suspended ||
            applying
        ) {
            return false;
        }

        applying = true;

        try {
            const language = getLanguage();

            const changed =
                language !== lastLanguage;

            lastLanguage = language;

            if (
                changed ||
                options?.forcePresentation
            ) {
                refreshPresentationModules();
            }

            applyTranslations();

            if (changed) {
                document.dispatchEvent(
                    new CustomEvent(
                        "worknely:dashboardlocalizationchange",
                        {
                            detail: {
                                version: VERSION,
                                language: language,
                                locale: getLocale(
                                    language
                                )
                            }
                        }
                    )
                );
            }

            return true;

        } finally {
            applying = false;
        }
    }

    function scheduleSynchronization() {
        if (
            suspended ||
            scheduled ||
            applying
        ) {
            return;
        }

        scheduled = true;

        const ticket = generation;

        Promise.resolve().then(function () {
            if (ticket !== generation) {
                return;
            }

            scheduled = false;

            if (!suspended) {
                synchronize();
            }
        });
    }

    function setLanguage(value) {
        if (suspended) {
            return false;
        }

        const raw = String(value || "")
            .trim()
            .toLowerCase()
            .split(/[-_]/)[0];

        if (!LANGUAGES.includes(raw)) {
            return false;
        }

        const engine =
            window.WorknelyLocalization;

        if (
            !engine ||
            typeof engine.setLanguage !== "function"
        ) {
            return false;
        }

        if (getLanguage() !== raw) {
            engine.setLanguage(raw);
        }

        scheduleSynchronization();

        return getLanguage() === raw;
    }

    function inspectModules() {
        const selected = getLanguage();

        return MODULES.map(function (module) {
            const api = window[module.global];

            let state = null;

            try {
                state = api?.getState?.() || null;
            } catch (_) {
                state = null;
            }

            const reportedLanguage =
                typeof state?.language === "string"
                    ? state.language
                    : null;

            const supported =
                Array.isArray(
                    state?.supportedLanguages
                )
                    ? state.supportedLanguages
                    : null;

            return {
                name: module.name,
                available: Boolean(api),
                version: api?.version || null,

                mounted: Boolean(
                    document.getElementById(
                        module.root
                    )
                ),

                language: reportedLanguage,

                languageMatches:
                    reportedLanguage === null
                        ? null
                        : reportedLanguage === selected,

                sixLanguagesReported:
                    supported === null
                        ? null
                        : LANGUAGES.every(
                            function (code) {
                                return supported.includes(
                                    code
                                );
                            }
                        )
            };
        });
    }

    function inspect() {
        const language = getLanguage();

        const selector =
            document.getElementById("language");

        const modules = inspectModules();

        const dictionaryCoverage =
            LANGUAGES.map(function (code) {
                const translated = KEYS.filter(
                    function (key) {
                        return typeof
                            DICTIONARY[code][key] ===
                            "string" &&
                            DICTIONARY[code][key]
                                .trim().length > 0;
                    }
                ).length;

                return {
                    language: code,
                    translated: translated,
                    total: KEYS.length,
                    complete:
                        translated === KEYS.length
                };
            });

        return {
            version: VERSION,
            language: language,
            locale: getLocale(language),

            centralLocalizationAvailable:
                Boolean(
                    window.WorknelyLocalization
                ),

            selectorAvailable: Boolean(selector),

            selectorMatches: selector
                ? selector.value === language
                : null,

            supportedLanguages: [
                ...LANGUAGES
            ],

            translationKeys: KEYS.length,

            dictionaryCoverage:
                dictionaryCoverage,

            modules: modules,

            allModulesAvailable:
                modules.every(
                    function (module) {
                        return module.available;
                    }
                ),

            allModulesMounted:
                modules.every(
                    function (module) {
                        return module.mounted;
                    }
                ),

            allReportedLanguagesMatch:
                modules.every(
                    function (module) {
                        return module.languageMatches
                            === true;
                    }
                ),

            persistenceDelegatedToCore: true,
            independentLocalStorage: false,
            directDatabaseQueries: false,
            externalTranslationAPI: false
        };
    }

    function selfTest() {
        const checks = [];

        function check(name, pass) {
            checks.push({
                name: name,
                pass: Boolean(pass)
            });
        }

        check(
            "Six supported languages",
            LANGUAGES.length === 6
        );

        check(
            "Forty translation keys",
            KEYS.length === 40
        );

        LANGUAGES.forEach(function (code) {
            check(
                "Complete dictionary: " + code,
                RAW[code].length === KEYS.length &&
                KEYS.every(function (key) {
                    return typeof
                        DICTIONARY[code][key] ===
                        "string" &&
                        DICTIONARY[code][key]
                            .trim().length > 0;
                })
            );
        });

        check(
            "English fallback",
            normalizeLanguage("unknown") === "en"
        );

        check(
            "Regional language normalization",
            normalizeLanguage("ro-RO") === "ro"
        );

        check(
            "Uppercase normalization",
            normalizeLanguage("IT") === "it"
        );

        check(
            "Underscore normalization",
            normalizeLanguage("de_DE") === "de"
        );

        check(
            "Romanian translation",
            translate(
                "dashboard.actions",
                {},
                "ro"
            ) === "Acțiuni rapide"
        );

        check(
            "Italian translation",
            translate(
                "dashboard.interviews",
                {},
                "it"
            ) === "Colloqui"
        );

        check(
            "Unknown key handling",
            translate(
                "unknown.key",
                {},
                "en"
            ) === "unknown.key"
        );

        check(
            "Valid percentage",
            formatPercent(
                80,
                "en"
            ) === "80%"
        );

        check(
            "Zero percentage",
            formatPercent(
                0,
                "en"
            ) === "0%"
        );

        check(
            "Invalid percentage rejected",
            formatPercent(
                120,
                "en"
            ) === "—"
        );

        check(
            "Missing percentage rejected",
            formatPercent(
                null,
                "en"
            ) === "—"
        );

        check(
            "Positive difference",
            formatDifference(
                15,
                "en"
            ).startsWith("+15")
        );

        check(
            "Negative difference",
            formatDifference(
                -15,
                "en"
            ).startsWith("−15")
        );

        check(
            "Invalid date rejected",
            formatDate(
                "invalid"
            ) === "—"
        );

        check(
            "Missing date rejected",
            formatDate(
                null
            ) === "—"
        );

        check(
            "Locale mapping",
            getLocale("it") === "it-IT" &&
            getLocale("ro") === "ro-RO"
        );

        const passed = checks.filter(
            function (item) {
                return item.pass;
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

    function initialize() {
        if (suspended) {
            return false;
        }

        if (!initialized) {
            initialized = true;

            [
                "worknely:languagechange",
                "worknely:localizationready",
                "worknely:unifiedcareerready",
                "worknely:unifiedcareerchange",
                "worknely:professionaldashboardready",
                "worknely:careerperformanceready",
                "worknely:careeractionsready",
                "worknely:careerinsightsready",
                "worknely:workspacechange"
            ].forEach(function (eventName) {
                document.addEventListener(
                    eventName,
                    scheduleSynchronization
                );
            });

            document.addEventListener(
                "change",
                function (event) {
                    if (
                        event.target?.id ===
                        "language"
                    ) {
                        scheduleSynchronization();
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
                        scheduleSynchronization();
                    }
                }
            );

            window.addEventListener(
                "pagehide",
                function () {
                    suspended = true;
                    generation++;
                    scheduled = false;
                    lastLanguage = null;
                }
            );

            window.addEventListener(
                "pageshow",
                function () {
                    suspended = false;
                    scheduleSynchronization();
                }
            );
        }

        scheduleSynchronization();

        return true;
    }

    window.WorknelyDashboardLocalization =
        Object.freeze({
            version: VERSION,

            languages: LANGUAGES,
            names: NAMES,
            flags: FLAGS,

            getLanguage: getLanguage,
            getLocale: getLocale,
            setLanguage: setLanguage,

            t: translate,

            formatNumber: formatNumber,
            formatPercent: formatPercent,
            formatDifference: formatDifference,
            formatDate: formatDate,
            formatTime: formatTime,

            apply: applyTranslations,
            synchronize: synchronize,
            initialize: initialize,
            inspect: inspect,
            selfTest: selfTest
        });

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
            "worknely:dashboardlocalizationready",
            {
                detail: {
                    version: VERSION,
                    languages: [
                        ...LANGUAGES
                    ]
                }
            }
        )
    );

})();
