
(function () {
    "use strict";

    const VERSION = "7.20.4";
    const ROOT_ID = "wnCareerActions";
    const MOUNT_ID = "wnCareerActionsMount";
    const STYLE_ID = "wnCareerActionsStyles";
    const DAY = 86400000;
    const SVG_NS = "http://www.w3.org/2000/svg";

    const D = Object.freeze({
        en: [
            "Quick actions",
            "Access your professional tools.",
            "Create resume",
            "Build your professional CV.",
            "ATS analysis",
            "Check your resume compatibility.",
            "Job tracker",
            "Manage your applications.",
            "Interview calendar",
            "View your professional schedule.",
            "Career intelligence",
            "Explore your professional potential.",
            "My account",
            "Access your saved work.",
            "Upcoming schedule",
            "Your next professional events.",
            "Next 24 hours",
            "Next 7 days",
            "Upcoming events",
            "Interview",
            "Follow-up",
            "No upcoming events.",
            "Sign in to view your schedule.",
            "Loading your schedule...",
            "Schedule currently unavailable.",
            "Today",
            "Tomorrow",
            "Open calendar",
            "Refresh schedule",
            "Complete password recovery first.",
            "Times are shown in your local timezone.",
            "Based on the next 10 available events.",
            "This tool is currently unavailable.",
            "Professional workspace"
        ],

        ro: [
            "Acțiuni rapide",
            "Accesează instrumentele profesionale.",
            "Creează un CV",
            "Construiește CV-ul profesional.",
            "Analiză ATS",
            "Verifică compatibilitatea CV-ului.",
            "Gestionarea candidaturilor",
            "Administrează candidaturile tale.",
            "Calendarul interviurilor",
            "Consultă programul profesional.",
            "Inteligență profesională",
            "Explorează potențialul profesional.",
            "Contul meu",
            "Accesează documentele salvate.",
            "Programul următor",
            "Următoarele tale evenimente profesionale.",
            "Următoarele 24 de ore",
            "Următoarele 7 zile",
            "Evenimente viitoare",
            "Interviu",
            "Revenire",
            "Nu există evenimente viitoare.",
            "Autentifică-te pentru a vedea programul.",
            "Se încarcă programul...",
            "Programul este momentan indisponibil.",
            "Astăzi",
            "Mâine",
            "Deschide calendarul",
            "Actualizează programul",
            "Finalizează mai întâi recuperarea parolei.",
            "Orele sunt afișate în fusul orar local.",
            "Bazat pe următoarele 10 evenimente disponibile.",
            "Acest instrument este momentan indisponibil.",
            "Spațiu profesional"
        ],

        it: [
            "Azioni rapide",
            "Accedi ai tuoi strumenti professionali.",
            "Crea CV",
            "Costruisci il tuo CV professionale.",
            "Analisi ATS",
            "Verifica la compatibilità del CV.",
            "Gestione candidature",
            "Gestisci le tue candidature.",
            "Calendario colloqui",
            "Consulta il tuo programma professionale.",
            "Intelligenza professionale",
            "Esplora il tuo potenziale professionale.",
            "Il mio account",
            "Accedi ai documenti salvati.",
            "Prossimi appuntamenti",
            "I tuoi prossimi eventi professionali.",
            "Prossime 24 ore",
            "Prossimi 7 giorni",
            "Eventi imminenti",
            "Colloquio",
            "Follow-up",
            "Nessun evento imminente.",
            "Accedi per visualizzare il programma.",
            "Caricamento del programma...",
            "Programma non disponibile.",
            "Oggi",
            "Domani",
            "Apri calendario",
            "Aggiorna programma",
            "Completa prima il recupero della password.",
            "Gli orari sono nel tuo fuso orario locale.",
            "Basato sui prossimi 10 eventi disponibili.",
            "Questo strumento non è disponibile.",
            "Spazio professionale"
        ],

        de: [
            "Schnellaktionen",
            "Greife auf deine Karrierewerkzeuge zu.",
            "Lebenslauf erstellen",
            "Erstelle deinen professionellen Lebenslauf.",
            "ATS-Analyse",
            "Prüfe die Kompatibilität deines Lebenslaufs.",
            "Bewerbungsverwaltung",
            "Verwalte deine Bewerbungen.",
            "Interviewkalender",
            "Sieh dir deine beruflichen Termine an.",
            "Karriereintelligenz",
            "Entdecke dein berufliches Potenzial.",
            "Mein Konto",
            "Greife auf gespeicherte Dokumente zu.",
            "Bevorstehende Termine",
            "Deine nächsten beruflichen Termine.",
            "Nächste 24 Stunden",
            "Nächste 7 Tage",
            "Bevorstehende Ereignisse",
            "Vorstellungsgespräch",
            "Nachverfolgung",
            "Keine bevorstehenden Termine.",
            "Melde dich an, um Termine zu sehen.",
            "Termine werden geladen...",
            "Termine derzeit nicht verfügbar.",
            "Heute",
            "Morgen",
            "Kalender öffnen",
            "Termine aktualisieren",
            "Schließe zuerst die Passwortwiederherstellung ab.",
            "Zeiten werden in deiner lokalen Zeitzone angezeigt.",
            "Basierend auf den nächsten 10 verfügbaren Terminen.",
            "Dieses Werkzeug ist derzeit nicht verfügbar.",
            "Beruflicher Arbeitsbereich"
        ],

        fr: [
            "Actions rapides",
            "Accédez à vos outils professionnels.",
            "Créer un CV",
            "Créez votre CV professionnel.",
            "Analyse ATS",
            "Vérifiez la compatibilité de votre CV.",
            "Gestion des candidatures",
            "Gérez vos candidatures.",
            "Calendrier des entretiens",
            "Consultez votre agenda professionnel.",
            "Intelligence professionnelle",
            "Explorez votre potentiel professionnel.",
            "Mon compte",
            "Accédez à vos documents enregistrés.",
            "Prochains rendez-vous",
            "Vos prochains événements professionnels.",
            "Prochaines 24 heures",
            "Prochains 7 jours",
            "Événements à venir",
            "Entretien",
            "Relance",
            "Aucun événement à venir.",
            "Connectez-vous pour consulter votre agenda.",
            "Chargement de votre agenda...",
            "Agenda actuellement indisponible.",
            "Aujourd'hui",
            "Demain",
            "Ouvrir le calendrier",
            "Actualiser l'agenda",
            "Terminez d'abord la récupération du mot de passe.",
            "Les heures sont affichées dans votre fuseau horaire.",
            "Basé sur les 10 prochains événements disponibles.",
            "Cet outil est actuellement indisponible.",
            "Espace professionnel"
        ],

        es: [
            "Acciones rápidas",
            "Accede a tus herramientas profesionales.",
            "Crear CV",
            "Crea tu CV profesional.",
            "Análisis ATS",
            "Comprueba la compatibilidad de tu CV.",
            "Gestión de candidaturas",
            "Gestiona tus candidaturas.",
            "Calendario de entrevistas",
            "Consulta tu agenda profesional.",
            "Inteligencia profesional",
            "Explora tu potencial profesional.",
            "Mi cuenta",
            "Accede a tus documentos guardados.",
            "Próximos eventos",
            "Tus próximos eventos profesionales.",
            "Próximas 24 horas",
            "Próximos 7 días",
            "Eventos próximos",
            "Entrevista",
            "Seguimiento",
            "No hay próximos eventos.",
            "Inicia sesión para consultar tu agenda.",
            "Cargando tu agenda...",
            "Agenda no disponible.",
            "Hoy",
            "Mañana",
            "Abrir calendario",
            "Actualizar agenda",
            "Completa primero la recuperación de contraseña.",
            "Las horas se muestran en tu zona horaria local.",
            "Basado en los próximos 10 eventos disponibles.",
            "Esta herramienta no está disponible.",
            "Espacio profesional"
        ]
    });

    const LOCALES = Object.freeze({
        en: "en-GB",
        ro: "ro-RO",
        it: "it-IT",
        de: "de-DE",
        fr: "fr-FR",
        es: "es-ES"
    });

    const ROUTES = Object.freeze({
        resume: [
            "resume-builder",
            "builder"
        ],
        ats: [
            "career-intelligence",
            "ats-analysis",
            "analyzer"
        ],
        jobs: [
            "job-tracker"
        ],
        calendar: [
            "job-tracker"
        ],
        intelligence: [
            "career-intelligence"
        ],
        account: [
            "account",
            "my-account"
        ]
    });

    const TARGETS = Object.freeze({
        resume: [
            "resume-builder",
            "builder"
        ],
        ats: [
            "wnCareerIntelligence"
        ],
        jobs: [
            "wnJobTrackerMount"
        ],
        calendar: [
            "wnJobCalendarMount"
        ],
        intelligence: [
            "wnCareerIntelligence"
        ],
        account: [
            "account",
            "my-account"
        ]
    });

    let root = null;
    let initialized = false;
    let suspended = false;
    let navigationGeneration = 0;

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

    function tr(index) {
        return D[language()][index] ||
            D.en[index] ||
            "";
    }

    function locale() {
        return LOCALES[language()] || "en-GB";
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

    function engine() {
        return window.WorknelyUnifiedCareer || null;
    }

    function createIcon(name) {
        const paths = {
            resume: [
                "M6 3h9l5 5v13H6z",
                "M15 3v6h5",
                "M9 14h8",
                "M13 10v8"
            ],
            ats: [
                "M4 4h5",
                "M4 4v5",
                "M20 4h-5",
                "M20 4v5",
                "M4 20h5",
                "M4 20v-5",
                "M20 20h-5",
                "M20 20v-5",
                "M8 12l3 3 5-6"
            ],
            jobs: [
                "M3 7h18v14H3z",
                "M8 7V3h8v4",
                "M3 13h18",
                "M10 13v2h4v-2"
            ],
            calendar: [
                "M3 5h18v16H3z",
                "M7 2v6",
                "M17 2v6",
                "M3 10h18",
                "M8 14h2",
                "M14 14h2",
                "M8 18h2"
            ],
            intelligence: [
                "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20",
                "M12 6a6 6 0 1 0 0 12a6 6 0 1 0 0-12",
                "M12 10a2 2 0 1 0 0 4a2 2 0 1 0 0-4"
            ],
            account: [
                "M12 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8",
                "M4 21v-3a8 8 0 0 1 16 0v3"
            ],
            clock: [
                "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20",
                "M12 6v6l4 2"
            ],
            arrow: [
                "M5 12h14",
                "M13 6l6 6-6 6"
            ],
            refresh: [
                "M20 7v5h-5",
                "M20 12a8 8 0 1 0-2 5"
            ]
        };

        const svg = document.createElementNS(
            SVG_NS,
            "svg"
        );

        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "1.8");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");

        (paths[name] || paths.arrow)
            .forEach(function (data) {
                const path = document.createElementNS(
                    SVG_NS,
                    "path"
                );

                path.setAttribute("d", data);
                svg.appendChild(path);
            });

        return svg;
    }

    function findRoute(action) {
        const candidates = ROUTES[action] || [];

        for (const id of candidates) {
            const section = document.getElementById(id);

            if (section) {
                return id;
            }
        }

        return null;
    }

    function findTarget(action) {
        const candidates = TARGETS[action] || [];

        for (const id of candidates) {
            const element = document.getElementById(id);

            if (element) {
                return element;
            }
        }

        return null;
    }

    function visible(element) {
        return Boolean(
            element &&
            element.isConnected &&
            element.getClientRects().length &&
            !element.closest("[hidden]") &&
            getComputedStyle(element).visibility !== "hidden"
        );
    }

    function scrollToTarget(element) {
        if (!visible(element)) {
            return false;
        }

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        element.scrollIntoView({
            behavior: reduceMotion
                ? "auto"
                : "smooth",
            block: "start"
        });

        return true;
    }

    function showNavigationMessage(message) {
        const status = root?.querySelector(
            ".wnca-navigation-status"
        );

        if (status) {
            status.textContent = message || "";
            status.hidden = !message;
        }
    }

    function navigate(action) {
        if (
            suspended ||
            !Object.prototype.hasOwnProperty.call(
                ROUTES,
                action
            )
        ) {
            return false;
        }

        if (engine()?.getState?.()?.recoveryMode) {
            showNavigationMessage(tr(29));
            return false;
        }

        const ticket = ++navigationGeneration;
        const route = findRoute(action);
        const target = findTarget(action);

        showNavigationMessage("");

        if (scrollToTarget(target)) {
            return true;
        }

        if (!route) {
            showNavigationMessage(tr(32));
            return false;
        }

        const hash = "#" + route;

        const links = Array.from(
            document.querySelectorAll(
                "a[href], button[data-view], [data-route]"
            )
        );

        const navigationLink = links.find(
            function (element) {
                return (
                    !root?.contains(element) &&
                    (
                        element.getAttribute("href") === hash ||
                        element.getAttribute("data-view") === route ||
                        element.getAttribute("data-route") === route
                    )
                );
            }
        );

        if (navigationLink) {
            navigationLink.click();

        } else if (window.location.hash !== hash) {
            window.location.hash = hash;
        }

        let attempts = 0;

        function completeNavigation() {
            if (
                suspended ||
                ticket !== navigationGeneration ||
                engine()?.getState?.()?.recoveryMode
            ) {
                return;
            }

            const destination =
                findTarget(action) ||
                document.getElementById(route);

            if (scrollToTarget(destination)) {
                return;
            }

            attempts++;

            if (attempts < 15) {
                setTimeout(
                    completeNavigation,
                    100
                );
            } else {
                showNavigationMessage(tr(32));
            }
        }

        setTimeout(completeNavigation, 50);

        return true;
    }

    function normalizeEvents(input, now) {
        const reference = Number.isFinite(now)
            ? now
            : Date.now();

        const source = Array.isArray(input)
            ? input
            : [];

        const unique = new Set();
        const events = [];

        source.forEach(function (item) {
            if (
                !item ||
                (
                    item.type !== "interview" &&
                    item.type !== "follow-up"
                ) ||
                typeof item.date !== "string"
            ) {
                return;
            }

            const timestamp = Date.parse(item.date);

            if (
                !Number.isFinite(timestamp) ||
                timestamp < reference
            ) {
                return;
            }

            const id =
                typeof item.id === "string"
                    ? item.id.slice(0, 64)
                    : "";

            const company =
                typeof item.company === "string"
                    ? item.company.slice(0, 200)
                    : "";

            const title =
                typeof item.title === "string"
                    ? item.title.slice(0, 200)
                    : "";

            const key = JSON.stringify([
                id,
                item.type,
                timestamp,
                company,
                title
            ]);

            if (unique.has(key)) {
                return;
            }

            unique.add(key);

            events.push({
                id: id,
                type: item.type,
                company: company,
                title: title,
                timestamp: timestamp,
                date: new Date(timestamp).toISOString()
            });
        });

        return events
            .sort(function (a, b) {
                return a.timestamp - b.timestamp;
            })
            .slice(0, 10);
    }

    function calculateSchedule(input, now) {
        const reference = Number.isFinite(now)
            ? now
            : Date.now();

        if (!Array.isArray(input)) {
            return {
                available: false,
                total: null,
                next24Hours: null,
                next7Days: null,
                interviews: null,
                followUps: null,
                events: []
            };
        }

        const events = normalizeEvents(
            input,
            reference
        );

        return {
            available: true,
            total: events.length,

            next24Hours: events.filter(
                function (event) {
                    return event.timestamp <=
                        reference + DAY;
                }
            ).length,

            next7Days: events.filter(
                function (event) {
                    return event.timestamp <=
                        reference + 7 * DAY;
                }
            ).length,

            interviews: events.filter(
                function (event) {
                    return event.type === "interview";
                }
            ).length,

            followUps: events.filter(
                function (event) {
                    return event.type === "follow-up";
                }
            ).length,

            events: events
        };
    }

    function formatCount(value) {
        return Number.isSafeInteger(value) &&
            value >= 0
            ? new Intl.NumberFormat(locale())
                .format(value)
            : "—";
    }

    function formatTime(timestamp) {
        return new Intl.DateTimeFormat(
            locale(),
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        ).format(new Date(timestamp));
    }

    function formatFullDate(timestamp) {
        return new Intl.DateTimeFormat(
            locale(),
            {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        ).format(new Date(timestamp));
    }

    function relativeDay(timestamp, now) {
        const date = new Date(timestamp);
        const today = new Date(now);

        const tomorrow = new Date(now);

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        function sameDay(a, b) {
            return (
                a.getFullYear() === b.getFullYear() &&
                a.getMonth() === b.getMonth() &&
                a.getDate() === b.getDate()
            );
        }

        if (sameDay(date, today)) {
            return tr(25);
        }

        if (sameDay(date, tomorrow)) {
            return tr(26);
        }

        return formatFullDate(timestamp);
    }

    function createAction(
        action,
        title,
        description,
        icon,
        color
    ) {
        const button = node(
            "button",
            "wnca-action wnca-" + color
        );

        button.type = "button";

        const iconBox = node(
            "span",
            "wnca-action-icon"
        );

        iconBox.appendChild(
            createIcon(icon)
        );

        const content = node(
            "span",
            "wnca-action-content"
        );

        content.append(
            node(
                "strong",
                "wnca-action-title",
                title
            ),
            node(
                "span",
                "wnca-muted",
                description
            )
        );

        const arrow = node(
            "span",
            "wnca-action-arrow"
        );

        arrow.appendChild(
            createIcon("arrow")
        );

        button.append(
            iconBox,
            content,
            arrow
        );

        button.addEventListener(
            "click",
            function () {
                navigate(action);
            }
        );

        return button;
    }

    function createQuickActions() {
        const section = node(
            "section",
            "wnca-section"
        );

        section.append(
            node(
                "h2",
                "wnca-heading",
                tr(0)
            ),
            node(
                "p",
                "wnca-muted",
                tr(1)
            )
        );

        const grid = node(
            "div",
            "wnca-action-grid"
        );

        const actions = [
            [
                "resume",
                tr(2),
                tr(3),
                "resume",
                "purple"
            ],
            [
                "ats",
                tr(4),
                tr(5),
                "ats",
                "pink"
            ],
            [
                "jobs",
                tr(6),
                tr(7),
                "jobs",
                "cyan"
            ],
            [
                "calendar",
                tr(8),
                tr(9),
                "calendar",
                "green"
            ],
            [
                "intelligence",
                tr(10),
                tr(11),
                "intelligence",
                "purple"
            ],
            [
                "account",
                tr(12),
                tr(13),
                "account",
                "pink"
            ]
        ];

        actions.forEach(function (action) {
            grid.appendChild(
                createAction(...action)
            );
        });

        const status = node(
            "p",
            "wnca-navigation-status"
        );

        status.setAttribute(
            "role",
            "status"
        );

        status.hidden = true;

        section.append(grid, status);

        return section;
    }

    function createMetric(label, value, color) {
        const card = node(
            "article",
            "wnca-metric wnca-" + color
        );

        card.append(
            node(
                "span",
                "wnca-muted",
                label
            ),
            node(
                "strong",
                "wnca-metric-value",
                formatCount(value)
            ),
            node(
                "small",
                "wnca-muted",
                tr(18)
            )
        );

        return card;
    }

    function createEvent(event, now) {
        const date = new Date(event.timestamp);

        const color = event.type === "interview"
            ? "purple"
            : "cyan";

        const article = node(
            "article",
            "wnca-event wnca-" + color
        );

        const dateBox = node(
            "div",
            "wnca-date-box"
        );

        const month = new Intl.DateTimeFormat(
            locale(),
            {
                month: "short"
            }
        ).format(date);

        dateBox.append(
            node(
                "span",
                "wnca-month",
                month
            ),
            node(
                "strong",
                "wnca-day",
                new Intl.NumberFormat(locale())
                    .format(date.getDate())
            )
        );

        const content = node(
            "div",
            "wnca-event-content"
        );

        const typeLabel =
            event.type === "interview"
                ? tr(19)
                : tr(20);

        const time = node(
            "time",
            "wnca-event-time",
            relativeDay(event.timestamp, now) +
                " · " +
                formatTime(event.timestamp)
        );

        time.dateTime = event.date;

        time.title = formatFullDate(
            event.timestamp
        );

        content.append(
            node(
                "span",
                "wnca-event-type",
                typeLabel
            ),
            node(
                "strong",
                "wnca-event-title",
                event.title || "—"
            ),
            node(
                "span",
                "wnca-muted",
                event.company || "—"
            ),
            time
        );

        article.append(
            dateBox,
            content
        );

        return article;
    }

    function createMessage(message) {
        const element = node(
            "p",
            "wnca-message",
            message
        );

        element.setAttribute(
            "role",
            "status"
        );

        return element;
    }

    function createButton(
        label,
        icon,
        handler,
        primary,
        disabled
    ) {
        const button = node(
            "button",
            "wnca-button" +
                (
                    primary
                        ? " wnca-button-primary"
                        : ""
                )
        );

        button.type = "button";
        button.disabled = Boolean(disabled);

        button.append(
            createIcon(icon),
            node("span", "", label)
        );

        button.addEventListener(
            "click",
            handler
        );

        return button;
    }

    function createSchedule() {
        const section = node(
            "section",
            "wnca-panel"
        );

        section.append(
            node(
                "h2",
                "wnca-heading",
                tr(14)
            ),
            node(
                "p",
                "wnca-muted",
                tr(15)
            )
        );

        const api = engine();

        if (
            !api ||
            typeof api.getState !== "function" ||
            typeof api.getSnapshot !== "function"
        ) {
            section.appendChild(
                createMessage(tr(24))
            );

            return section;
        }

        const state = api.getState();

        if (state.recoveryMode) {
            section.appendChild(
                createMessage(tr(29))
            );

            return section;
        }

        if (state.loading) {
            section.appendChild(
                createMessage(tr(23))
            );

            return section;
        }

        if (!state.authenticated) {
            section.appendChild(
                createMessage(tr(22))
            );

            return section;
        }

        const snapshot = api.getSnapshot();

        const now = Date.now();

        const schedule = calculateSchedule(
            snapshot?.upcomingEvents,
            now
        );

        if (!schedule.available) {
            section.appendChild(
                createMessage(tr(24))
            );

        } else {
            const metrics = node(
                "div",
                "wnca-metric-grid"
            );

            metrics.append(
                createMetric(
                    tr(16),
                    schedule.next24Hours,
                    "pink"
                ),
                createMetric(
                    tr(17),
                    schedule.next7Days,
                    "purple"
                )
            );

            section.appendChild(metrics);

            if (!schedule.events.length) {
                section.appendChild(
                    createMessage(tr(21))
                );

            } else {
                const list = node(
                    "div",
                    "wnca-event-list"
                );

                schedule.events.forEach(
                    function (event) {
                        list.appendChild(
                            createEvent(event, now)
                        );
                    }
                );

                section.appendChild(list);
            }

            section.append(
                node(
                    "p",
                    "wnca-muted",
                    tr(30)
                ),
                node(
                    "p",
                    "wnca-muted",
                    tr(31)
                )
            );
        }

        const buttons = node(
            "div",
            "wnca-button-row"
        );

        buttons.append(
            createButton(
                tr(27),
                "calendar",
                function () {
                    navigate("calendar");
                },
                true,
                false
            ),
            createButton(
                tr(28),
                "refresh",
                function () {
                    if (
                        !suspended &&
                        typeof api.refresh === "function"
                    ) {
                        api.refresh();
                    }
                },
                false,
                state.loading
            )
        );

        section.appendChild(buttons);

        return section;
    }

    function render() {
        if (
            suspended ||
            !root ||
            !root.isConnected
        ) {
            return false;
        }

        const fragment =
            document.createDocumentFragment();

        const state = engine()?.getState?.();

        root.setAttribute(
            "aria-label",
            tr(33)
        );

        root.setAttribute(
            "aria-busy",
            String(Boolean(state?.loading))
        );

        if (state?.recoveryMode) {
            fragment.appendChild(
                createMessage(tr(29))
            );

        } else {
            fragment.append(
                createQuickActions(),
                createSchedule()
            );
        }

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
#wnCareerActions {
    --wnca-text: #211936;
    --wnca-muted: #71677f;
    --wnca-border: #e9e2f4;
    display: grid;
    gap: 20px;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    color: var(--wnca-text);
    font-family: inherit;
    overflow-wrap: anywhere;
    box-sizing: border-box;
}

#wnCareerActions *,
#wnCareerActions *::before,
#wnCareerActions *::after {
    box-sizing: border-box;
}

#wnCareerActions .wnca-section {
    min-width: 0;
}

#wnCareerActions .wnca-heading {
    margin: 0 0 8px;
    font-size: clamp(22px, 4vw, 30px);
    font-weight: 800;
    line-height: 1.25;
    letter-spacing: -.025em;
    color: var(--wnca-text);
}

#wnCareerActions .wnca-muted {
    color: var(--wnca-muted);
    font-size: 12px;
    line-height: 1.65;
}

#wnCareerActions .wnca-purple {
    --wnca-accent: #7c3aed;
    --wnca-soft: #f3e8ff;
}

#wnCareerActions .wnca-pink {
    --wnca-accent: #db2777;
    --wnca-soft: #fce7f3;
}

#wnCareerActions .wnca-cyan {
    --wnca-accent: #0891b2;
    --wnca-soft: #cffafe;
}

#wnCareerActions .wnca-green {
    --wnca-accent: #059669;
    --wnca-soft: #d1fae5;
}

#wnCareerActions .wnca-action-grid {
    display: grid;
    grid-template-columns:
        repeat(3, minmax(0, 1fr));
    gap: 12px;
    min-width: 0;
    margin-top: 18px;
}

#wnCareerActions .wnca-action {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    min-width: 0;
    min-height: 145px;
    padding: 18px;
    background: #ffffff;
    color: var(--wnca-text);
    border: 1px solid var(--wnca-border);
    border-radius: 20px;
    font-family: inherit;
    text-align: left;
    white-space: normal;
    cursor: pointer;
    box-shadow:
        0 4px 18px rgba(61,29,112,.04);
    transition:
        border-color .18s ease,
        box-shadow .18s ease;
}

#wnCareerActions .wnca-action:hover {
    border-color: var(--wnca-accent);
    box-shadow:
        0 6px 22px rgba(61,29,112,.09);
}

#wnCareerActions .wnca-action-icon {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border-radius: 14px;
    background: var(--wnca-soft);
    color: var(--wnca-accent);
}

#wnCareerActions svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
}

#wnCareerActions .wnca-action-content {
    display: grid;
    gap: 5px;
    min-width: 0;
    max-width: 100%;
}

#wnCareerActions .wnca-action-title {
    font-size: 14px;
    font-weight: 750;
    line-height: 1.4;
}

#wnCareerActions .wnca-action-arrow {
    align-self: flex-end;
    margin-top: auto;
    color: var(--wnca-accent);
}

#wnCareerActions .wnca-action-arrow svg {
    width: 18px;
    height: 18px;
}

#wnCareerActions .wnca-panel {
    min-width: 0;
    max-width: 100%;
    padding: 22px;
    background: #ffffff;
    border: 1px solid var(--wnca-border);
    border-radius: 24px;
    box-shadow:
        0 5px 20px rgba(61,29,112,.04);
}

#wnCareerActions .wnca-metric-grid {
    display: grid;
    grid-template-columns:
        repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin: 20px 0;
}

#wnCareerActions .wnca-metric {
    display: grid;
    gap: 8px;
    min-width: 0;
    padding: 18px;
    border: 1px solid var(--wnca-border);
    border-radius: 18px;
    background: var(--wnca-soft);
}

#wnCareerActions .wnca-metric-value {
    color: var(--wnca-accent);
    font-size: 34px;
    font-weight: 800;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
}

#wnCareerActions .wnca-event-list {
    display: grid;
    gap: 10px;
    margin: 18px 0;
}

#wnCareerActions .wnca-event {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    min-width: 0;
    padding: 14px;
    background: #faf8ff;
    border: 1px solid #eee7fa;
    border-radius: 18px;
}

#wnCareerActions .wnca-date-box {
    display: grid;
    place-items: center;
    align-content: center;
    flex-shrink: 0;
    width: 64px;
    min-height: 70px;
    padding: 8px;
    background: var(--wnca-soft);
    color: var(--wnca-accent);
    border-radius: 14px;
}

#wnCareerActions .wnca-month {
    font-size: 11px;
    font-weight: 750;
    text-transform: uppercase;
}

#wnCareerActions .wnca-day {
    font-size: 26px;
    line-height: 1.2;
    font-weight: 800;
}

#wnCareerActions .wnca-event-content {
    display: grid;
    flex: 1;
    gap: 5px;
    min-width: 0;
}

#wnCareerActions .wnca-event-type {
    color: var(--wnca-accent);
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .06em;
}

#wnCareerActions .wnca-event-title {
    font-size: 15px;
    font-weight: 750;
    line-height: 1.4;
}

#wnCareerActions .wnca-event-time {
    color: var(--wnca-accent);
    font-size: 12px;
    font-weight: 650;
    line-height: 1.5;
}

#wnCareerActions .wnca-button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
}

#wnCareerActions .wnca-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-height: 44px;
    max-width: 100%;
    padding: 12px 17px;
    border: 1px solid #ddd0f8;
    border-radius: 13px;
    background: #ffffff;
    color: #7c3aed;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    white-space: normal;
    cursor: pointer;
}

#wnCareerActions .wnca-button-primary {
    border-color: transparent;
    background: linear-gradient(
        135deg,
        #7c3aed,
        #9333ea
    );
    color: #ffffff;
}

#wnCareerActions .wnca-button svg {
    width: 18px;
    height: 18px;
}

#wnCareerActions .wnca-button:disabled {
    opacity: .55;
    cursor: wait;
}

#wnCareerActions .wnca-message,
#wnCareerActions .wnca-navigation-status {
    padding: 14px;
    border-radius: 14px;
    background: #f5f3ff;
    border: 1px solid #e9d5ff;
    color: #5b21b6;
    font-size: 13px;
    line-height: 1.6;
}

#wnCareerActions [hidden] {
    display: none !important;
}

#wnCareerActions button:focus-visible {
    outline: 3px solid #a78bfa;
    outline-offset: 3px;
}

@media (max-width: 850px) {
    #wnCareerActions .wnca-action-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 600px) {
    #wnCareerActions .wnca-panel {
        padding: 16px;
    }

    #wnCareerActions .wnca-action {
        padding: 14px;
    }

    #wnCareerActions .wnca-metric {
        padding: 14px;
    }

    #wnCareerActions .wnca-button {
        flex: 1 1 100%;
    }

    #wnCareerActions .wnca-event {
        gap: 10px;
        padding: 12px;
    }

    #wnCareerActions .wnca-date-box {
        width: 52px;
    }
}

@media (max-width: 360px) {
    #wnCareerActions .wnca-action-grid,
    #wnCareerActions .wnca-metric-grid {
        grid-template-columns:
            minmax(0, 1fr);
    }
}

@media (prefers-reduced-motion: reduce) {
    #wnCareerActions * {
        transition: none !important;
    }
}

@media print {
    #wnCareerActions {
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
                "wnca-workspace"
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

        if (
            engine()?.getState?.()?.recoveryMode ||
            !engine()?.getState?.()?.authenticated
        ) {
            navigationGeneration++;
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

        const sample = [
            {
                id: "test-1",
                type: "interview",
                company: "Example",
                title: "Developer",
                date: new Date(
                    now + 3600000
                ).toISOString()
            },
            {
                id: "test-2",
                type: "follow-up",
                company: "Example",
                title: "Designer",
                date: new Date(
                    now + 2 * DAY
                ).toISOString()
            },
            {
                id: "test-3",
                type: "interview",
                company: "Example",
                title: "Manager",
                date: new Date(
                    now + 9 * DAY
                ).toISOString()
            }
        ];

        const result = calculateSchedule(
            sample,
            now
        );

        const empty = calculateSchedule(
            [],
            now
        );

        const unavailable = calculateSchedule(
            null,
            now
        );

        const invalid = normalizeEvents(
            [
                {
                    type: "interview",
                    date: "invalid"
                },
                {
                    type: "unknown",
                    date: sample[0].date
                },
                {
                    type: "interview",
                    date: new Date(
                        now - DAY
                    ).toISOString()
                }
            ],
            now
        );

        const duplicate = normalizeEvents(
            [
                sample[0],
                sample[0]
            ],
            now
        );

        const reversed = normalizeEvents(
            sample.slice().reverse(),
            now
        );

        const large = normalizeEvents(
            Array.from(
                { length: 20 },
                function (_, index) {
                    return {
                        id: "test-" + index,
                        type: "interview",
                        date: new Date(
                            now + (index + 1) * 3600000
                        ).toISOString()
                    };
                }
            ),
            now
        );

        const checks = [
            {
                name: "Upcoming events",
                pass: result.total === 3
            },
            {
                name: "Next 24 hours",
                pass: result.next24Hours === 1
            },
            {
                name: "Next 7 days",
                pass: result.next7Days === 2
            },
            {
                name: "Interview count",
                pass: result.interviews === 2
            },
            {
                name: "Follow-up count",
                pass: result.followUps === 1
            },
            {
                name: "Empty schedule",
                pass:
                    empty.available &&
                    empty.total === 0
            },
            {
                name: "Unavailable schedule",
                pass:
                    !unavailable.available &&
                    unavailable.total === null
            },
            {
                name: "Invalid and past events",
                pass: invalid.length === 0
            },
            {
                name: "Duplicate prevention",
                pass: duplicate.length === 1
            },
            {
                name: "Chronological ordering",
                pass:
                    reversed[0]?.id === "test-1" &&
                    reversed[2]?.id === "test-3"
            },
            {
                name: "Event limit",
                pass: large.length === 10
            },
            {
                name: "Six quick actions",
                pass: Object.keys(ROUTES).length === 6
            },
            {
                name: "Six languages",
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
                    document.visibilityState === "visible"
                ) {
                    handleUpdate();
                }
            }
        );

        window.addEventListener(
            "pagehide",
            function () {
                suspended = true;
                navigationGeneration++;

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

    window.WorknelyCareerActions =
        Object.freeze({
            version: VERSION,
            mount: mount,
            initialize: initialize,
            refresh: render,
            navigate: navigate,
            calculateSchedule: calculateSchedule,
            normalizeEvents: normalizeEvents,
            selfTest: selfTest,

            getState: function () {
                return {
                    version: VERSION,
                    mounted: Boolean(
                        root?.isConnected
                    ),
                    engineAvailable: Boolean(
                        engine()
                    ),
                    language: language(),
                    supportedLanguages:
                        Object.keys(D),
                    availableRoutes:
                        Object.keys(ROUTES).filter(
                            function (action) {
                                return Boolean(
                                    findRoute(action) ||
                                    findTarget(action)
                                );
                            }
                        ),
                    quickActions: 6,
                    eventLimit: 10,
                    readOnly: true,
                    localDataStorage: false,
                    automaticSaving: false,
                    additionalDatabaseQueries: false
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
            "worknely:careeractionsready",
            {
                detail: {
                    version: VERSION
                }
            }
        )
    );

})();
