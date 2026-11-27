
(function () {
    "use strict";

    const VERSION = "7.20.2";
    const ROOT_ID = "wnProfessionalDashboard";
    const MOUNT_ID = "wnProfessionalDashboardMount";
    const STYLE_ID = "wnProfessionalDashboardStyles";

    const DICTIONARY = Object.freeze({
        en: [
            "Professional Career Dashboard",
            "Your career. Your future.",
            "Your professional journey, all in one place.",
            "Saved resumes",
            "Estimated ATS readiness",
            "Estimated career match",
            "Applications",
            "Active applications",
            "Interview stage",
            "Career development",
            "Skill coverage",
            "Career plan progress",
            "Upcoming events",
            "Interview",
            "Follow-up",
            "No upcoming events.",
            "Refresh dashboard",
            "Loading your professional data...",
            "Sign in to view your career dashboard.",
            "Some professional data is unavailable.",
            "Professional data is currently unavailable.",
            "Last updated",
            "Estimated scores are not hiring guarantees.",
            "No saved score",
            "Offers",
            "Accepted",
            "Your professional overview",
            "Complete your password recovery first.",
            "Dashboard engine unavailable.",
            "Based on the latest 100 saved analyses."
        ],
        ro: [
            "Panou profesional de carieră",
            "Cariera ta. Viitorul tău.",
            "Parcursul tău profesional, într-un singur loc.",
            "CV-uri salvate",
            "Compatibilitate ATS estimată",
            "Potrivire profesională estimată",
            "Candidaturi",
            "Candidaturi active",
            "Etapa de interviu",
            "Dezvoltare profesională",
            "Acoperirea competențelor",
            "Progresul planului de carieră",
            "Evenimente viitoare",
            "Interviu",
            "Revenire",
            "Nu există evenimente viitoare.",
            "Actualizează panoul",
            "Se încarcă datele profesionale...",
            "Autentifică-te pentru a vedea panoul profesional.",
            "Unele date profesionale sunt indisponibile.",
            "Datele profesionale sunt momentan indisponibile.",
            "Ultima actualizare",
            "Scorurile estimate nu garantează angajarea.",
            "Niciun scor salvat",
            "Oferte",
            "Acceptate",
            "Prezentarea ta profesională",
            "Finalizează mai întâi recuperarea parolei.",
            "Motorul panoului este indisponibil.",
            "Bazat pe ultimele 100 de analize salvate."
        ],
        it: [
            "Dashboard professionale",
            "La tua carriera. Il tuo futuro.",
            "Il tuo percorso professionale, in un unico posto.",
            "CV salvati",
            "Compatibilità ATS stimata",
            "Compatibilità professionale stimata",
            "Candidature",
            "Candidature attive",
            "Fase di colloquio",
            "Sviluppo professionale",
            "Copertura delle competenze",
            "Progresso del piano di carriera",
            "Prossimi eventi",
            "Colloquio",
            "Follow-up",
            "Nessun evento imminente.",
            "Aggiorna dashboard",
            "Caricamento dei dati professionali...",
            "Accedi per visualizzare la dashboard.",
            "Alcuni dati professionali non sono disponibili.",
            "Dati professionali non disponibili.",
            "Ultimo aggiornamento",
            "I punteggi stimati non garantiscono l'assunzione.",
            "Nessun punteggio salvato",
            "Offerte",
            "Accettate",
            "La tua panoramica professionale",
            "Completa prima il recupero della password.",
            "Motore della dashboard non disponibile.",
            "Basato sulle ultime 100 analisi salvate."
        ],
        de: [
            "Professionelles Karriere-Dashboard",
            "Deine Karriere. Deine Zukunft.",
            "Dein beruflicher Weg an einem Ort.",
            "Gespeicherte Lebensläufe",
            "Geschätzte ATS-Kompatibilität",
            "Geschätzte Karriereübereinstimmung",
            "Bewerbungen",
            "Aktive Bewerbungen",
            "Interviewphase",
            "Berufliche Entwicklung",
            "Kompetenzabdeckung",
            "Fortschritt des Karriereplans",
            "Bevorstehende Termine",
            "Vorstellungsgespräch",
            "Nachverfolgung",
            "Keine bevorstehenden Termine.",
            "Dashboard aktualisieren",
            "Berufliche Daten werden geladen...",
            "Melde dich an, um dein Dashboard zu sehen.",
            "Einige berufliche Daten sind nicht verfügbar.",
            "Berufliche Daten derzeit nicht verfügbar.",
            "Letzte Aktualisierung",
            "Geschätzte Werte garantieren keine Einstellung.",
            "Kein gespeicherter Wert",
            "Angebote",
            "Angenommen",
            "Dein beruflicher Überblick",
            "Schließe zuerst die Passwortwiederherstellung ab.",
            "Dashboard-Engine nicht verfügbar.",
            "Basierend auf den letzten 100 gespeicherten Analysen."
        ],
        fr: [
            "Tableau de bord professionnel",
            "Votre carrière. Votre avenir.",
            "Votre parcours professionnel en un seul endroit.",
            "CV enregistrés",
            "Compatibilité ATS estimée",
            "Correspondance professionnelle estimée",
            "Candidatures",
            "Candidatures actives",
            "Phase d'entretien",
            "Développement professionnel",
            "Couverture des compétences",
            "Progression du plan de carrière",
            "Événements à venir",
            "Entretien",
            "Relance",
            "Aucun événement à venir.",
            "Actualiser le tableau de bord",
            "Chargement des données professionnelles...",
            "Connectez-vous pour afficher votre tableau de bord.",
            "Certaines données professionnelles sont indisponibles.",
            "Données professionnelles actuellement indisponibles.",
            "Dernière mise à jour",
            "Les scores estimés ne garantissent pas un recrutement.",
            "Aucun score enregistré",
            "Offres",
            "Acceptées",
            "Votre aperçu professionnel",
            "Terminez d'abord la récupération du mot de passe.",
            "Moteur du tableau de bord indisponible.",
            "Basé sur les 100 dernières analyses enregistrées."
        ],
        es: [
            "Panel profesional de carrera",
            "Tu carrera. Tu futuro.",
            "Tu trayectoria profesional en un solo lugar.",
            "CV guardados",
            "Compatibilidad ATS estimada",
            "Compatibilidad profesional estimada",
            "Candidaturas",
            "Candidaturas activas",
            "Fase de entrevista",
            "Desarrollo profesional",
            "Cobertura de competencias",
            "Progreso del plan de carrera",
            "Próximos eventos",
            "Entrevista",
            "Seguimiento",
            "No hay próximos eventos.",
            "Actualizar panel",
            "Cargando tus datos profesionales...",
            "Inicia sesión para ver tu panel profesional.",
            "Algunos datos profesionales no están disponibles.",
            "Datos profesionales no disponibles.",
            "Última actualización",
            "Las puntuaciones estimadas no garantizan la contratación.",
            "Ninguna puntuación guardada",
            "Ofertas",
            "Aceptadas",
            "Tu resumen profesional",
            "Completa primero la recuperación de contraseña.",
            "Motor del panel no disponible.",
            "Basado en los últimos 100 análisis guardados."
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

    let root = null;
    let initialized = false;
    let suspended = false;

    function getLanguage() {
        const value =
            window.WorknelyLocalization?.getLanguage?.() ||
            document.getElementById("language")?.value ||
            document.documentElement.lang ||
            "en";

        const language = String(value)
            .toLowerCase()
            .split("-")[0];

        return DICTIONARY[language]
            ? language
            : "en";
    }

    function tr(index) {
        return DICTIONARY[getLanguage()][index] ||
            DICTIONARY.en[index] ||
            "";
    }

    function getLocale() {
        return LOCALES[getLanguage()] || "en-GB";
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

    function formatCount(value) {
        if (!validCount(value)) {
            return "—";
        }

        return new Intl.NumberFormat(
            getLocale()
        ).format(value);
    }

    function formatScore(value) {
        if (!validScore(value)) {
            return "—";
        }

        return new Intl.NumberFormat(
            getLocale(),
            {
                style: "percent",
                maximumFractionDigits: 2
            }
        ).format(value / 100);
    }

    function formatDate(value) {
        if (!value) return "—";

        const date = new Date(value);

        if (!Number.isFinite(date.getTime())) {
            return "—";
        }

        return new Intl.DateTimeFormat(
            getLocale(),
            {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        ).format(date);
    }

    function createIcon(name) {
        const namespace =
            "http://www.w3.org/2000/svg";

        const paths = {
            resume: [
                "M6 3h9l5 5v13H6z",
                "M15 3v6h5",
                "M9 13h8",
                "M9 17h8"
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
            target: [
                "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20",
                "M12 6a6 6 0 1 0 0 12a6 6 0 1 0 0-12",
                "M12 10a2 2 0 1 0 0 4a2 2 0 1 0 0-4"
            ],
            jobs: [
                "M3 7h18v14H3z",
                "M8 7V3h8v4",
                "M3 13h18",
                "M10 13v2h4v-2"
            ],
            activity: [
                "M2 12h5l3-8 4 16 3-8h5"
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
            offer: [
                "M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"
            ],
            accepted: [
                "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20",
                "M7 12l3 3 7-7"
            ],
            refresh: [
                "M20 7v5h-5",
                "M20 12a8 8 0 1 0-2 5"
            ]
        };

        const svg = document.createElementNS(
            namespace,
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

        (paths[name] || paths.activity)
            .forEach(function (data) {
                const path = document.createElementNS(
                    namespace,
                    "path"
                );

                path.setAttribute("d", data);
                svg.appendChild(path);
            });

        return svg;
    }

    function createHeader() {
        const header = node(
            "div",
            "wnpd-hero"
        );

        header.append(
            node("div", "wnpd-eyebrow", tr(0)),
            node("h2", "wnpd-title", tr(1)),
            node("p", "wnpd-subtitle", tr(2))
        );

        return header;
    }

    function createMessage(message, type) {
        const element = node(
            "div",
            "wnpd-message wnpd-message-" +
                (type || "info"),
            message
        );

        element.setAttribute(
            "role",
            type === "error" ? "alert" : "status"
        );

        return element;
    }

    function createRefreshButton(disabled) {
        const button = node(
            "button",
            "wnpd-refresh"
        );

        button.type = "button";
        button.disabled = Boolean(disabled);

        button.append(
            createIcon("refresh"),
            node("span", "", tr(16))
        );

        button.addEventListener(
            "click",
            function () {
                if (
                    !suspended &&
                    typeof engine()?.refresh === "function"
                ) {
                    engine().refresh();
                }
            }
        );

        return button;
    }

    function createMetric(
        label,
        value,
        icon,
        color,
        isScore
    ) {
        const card = node(
            "article",
            "wnpd-metric wnpd-" + color
        );

        const iconBox = node(
            "div",
            "wnpd-metric-icon"
        );

        iconBox.appendChild(createIcon(icon));

        const formatted = isScore
            ? formatScore(value)
            : formatCount(value);

        card.append(
            iconBox,
            node(
                "strong",
                "wnpd-metric-value",
                formatted
            ),
            node(
                "span",
                "wnpd-metric-label",
                label
            )
        );

        if (isScore && !validScore(value)) {
            card.appendChild(
                node(
                    "small",
                    "wnpd-muted",
                    tr(23)
                )
            );
        }

        return card;
    }

    function createMetrics(data) {
        const section = node(
            "section",
            "wnpd-section"
        );

        section.appendChild(
            node("h3", "wnpd-section-title", tr(26))
        );

        const grid = node(
            "div",
            "wnpd-metric-grid"
        );

        const career = data.career;
        const jobs = data.applications;

        const metrics = [
            [
                tr(3),
                data.resumeCount,
                "resume",
                "purple",
                false
            ],
            [
                tr(4),
                career?.latestATS?.score,
                "ats",
                "pink",
                true
            ],
            [
                tr(5),
                career?.careerMatch?.score,
                "target",
                "cyan",
                true
            ],
            [
                tr(6),
                jobs?.total,
                "jobs",
                "purple",
                false
            ],
            [
                tr(7),
                jobs?.active,
                "activity",
                "pink",
                false
            ],
            [
                tr(8),
                jobs?.interviews,
                "calendar",
                "cyan",
                false
            ],
            [
                tr(24),
                jobs?.offers,
                "offer",
                "purple",
                false
            ],
            [
                tr(25),
                jobs?.accepted,
                "accepted",
                "green",
                false
            ]
        ];

        metrics.forEach(function (item) {
            grid.appendChild(
                createMetric(...item)
            );
        });

        section.appendChild(grid);

        return section;
    }

    function createProgress(
        label,
        value,
        color
    ) {
        const wrapper = node(
            "div",
            "wnpd-progress-item"
        );

        const header = node(
            "div",
            "wnpd-progress-header"
        );

        header.append(
            node("span", "", label),
            node(
                "strong",
                "",
                formatScore(value)
            )
        );

        wrapper.appendChild(header);

        if (!validScore(value)) {
            wrapper.appendChild(
                node(
                    "small",
                    "wnpd-muted",
                    tr(23)
                )
            );

            return wrapper;
        }

        const track = node(
            "div",
            "wnpd-progress-track"
        );

        track.setAttribute("role", "progressbar");
        track.setAttribute("aria-label", label);
        track.setAttribute("aria-valuemin", "0");
        track.setAttribute("aria-valuemax", "100");
        track.setAttribute(
            "aria-valuenow",
            String(value)
        );

        const bar = node(
            "div",
            "wnpd-progress-bar wnpd-bar-" + color
        );

        bar.style.width = value + "%";

        track.appendChild(bar);
        wrapper.appendChild(track);

        return wrapper;
    }

    function createDevelopment(data) {
        const section = node(
            "section",
            "wnpd-section wnpd-panel"
        );

        section.append(
            node(
                "h3",
                "wnpd-section-title",
                tr(9)
            ),
            createProgress(
                tr(10),
                data.career?.skillCoverage?.score,
                "purple"
            ),
            createProgress(
                tr(11),
                data.career?.careerPlan?.score,
                "pink"
            )
        );

        return section;
    }

    function createEvent(event) {
        const article = node(
            "article",
            "wnpd-event"
        );

        const icon = node(
            "div",
            "wnpd-event-icon"
        );

        icon.appendChild(
            createIcon(
                event.type === "interview"
                    ? "calendar"
                    : "activity"
            )
        );

        const content = node(
            "div",
            "wnpd-event-content"
        );

        const type = event.type === "interview"
            ? tr(13)
            : tr(14);

        const date = node(
            "time",
            "wnpd-event-date",
            formatDate(event.date)
        );

        const parsedDate = new Date(event.date);

        if (
            Number.isFinite(
                parsedDate.getTime()
            )
        ) {
            date.dateTime =
                parsedDate.toISOString();
        }

        content.append(
            node(
                "span",
                "wnpd-event-type",
                type
            ),
            node(
                "strong",
                "wnpd-event-title",
                event.title || "—"
            ),
            node(
                "span",
                "wnpd-event-company",
                event.company || "—"
            ),
            date
        );

        article.append(icon, content);

        return article;
    }

    function createEvents(data) {
        const section = node(
            "section",
            "wnpd-section wnpd-panel"
        );

        section.appendChild(
            node(
                "h3",
                "wnpd-section-title",
                tr(12)
            )
        );

        if (
            !Array.isArray(
                data.upcomingEvents
            )
        ) {
            section.appendChild(
                createMessage(tr(19), "info")
            );

            return section;
        }

        if (!data.upcomingEvents.length) {
            section.appendChild(
                node(
                    "p",
                    "wnpd-muted",
                    tr(15)
                )
            );

            return section;
        }

        const list = node(
            "div",
            "wnpd-event-list"
        );

        data.upcomingEvents
            .slice(0, 10)
            .forEach(function (event) {
                if (
                    event &&
                    (
                        event.type === "interview" ||
                        event.type === "follow-up"
                    )
                ) {
                    list.appendChild(
                        createEvent(event)
                    );
                }
            });

        section.appendChild(list);

        return section;
    }

    function createFooter(data) {
        const footer = node(
            "footer",
            "wnpd-footer"
        );

        if (data?.generatedAt) {
            footer.appendChild(
                node(
                    "p",
                    "",
                    tr(21) + ": " +
                        formatDate(data.generatedAt)
                )
            );
        }

        footer.append(
            node("p", "", tr(22)),
            node("p", "", tr(29))
        );

        return footer;
    }

    function render() {
        if (
            suspended ||
            !root ||
            !root.isConnected
        ) {
            return false;
        }

        const api = engine();

        const fragment =
            document.createDocumentFragment();

        fragment.appendChild(createHeader());

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
                createMessage(tr(28), "error")
            );

            root.replaceChildren(fragment);

            return false;
        }

        const state = api.getState();

        root.setAttribute(
            "aria-busy",
            String(Boolean(state.loading))
        );

        if (state.recoveryMode) {
            fragment.appendChild(
                createMessage(tr(27), "info")
            );

        } else if (state.loading) {
            fragment.appendChild(
                createMessage(tr(17), "info")
            );

        } else if (!state.authenticated) {
            fragment.appendChild(
                createMessage(tr(18), "info")
            );

        } else {
            const data = api.getSnapshot();

            if (
                !data ||
                state.error === "DATA_UNAVAILABLE"
            ) {
                fragment.appendChild(
                    createMessage(tr(20), "error")
                );

            } else {
                if (data.partial) {
                    fragment.appendChild(
                        createMessage(
                            tr(19),
                            "warning"
                        )
                    );
                }

                fragment.appendChild(
                    createMetrics(data)
                );

                const detailGrid = node(
                    "div",
                    "wnpd-detail-grid"
                );

                detailGrid.append(
                    createDevelopment(data),
                    createEvents(data)
                );

                fragment.append(
                    detailGrid,
                    createFooter(data)
                );
            }
        }

        if (
            state.authenticated &&
            !state.recoveryMode
        ) {
            fragment.appendChild(
                createRefreshButton(
                    state.loading
                )
            );
        }

        root.replaceChildren(fragment);

        return true;
    }

    function installStyles() {
        if (
            document.getElementById(
                STYLE_ID
            )
        ) {
            return;
        }

        const style = node("style");

        style.id = STYLE_ID;

        style.textContent = `
#wnProfessionalDashboard {
    --wnpd-purple: #7c3aed;
    --wnpd-pink: #db2777;
    --wnpd-cyan: #0891b2;
    --wnpd-green: #059669;
    --wnpd-text: #211936;
    --wnpd-muted: #71677f;
    --wnpd-border: #e9e2f4;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    display: grid;
    gap: 18px;
    padding: 0;
    color: var(--wnpd-text);
    font-family: inherit;
    box-sizing: border-box;
    overflow-wrap: anywhere;
}

#wnProfessionalDashboard *,
#wnProfessionalDashboard *::before,
#wnProfessionalDashboard *::after {
    box-sizing: border-box;
}

#wnProfessionalDashboard .wnpd-hero {
    position: relative;
    min-width: 0;
    overflow: hidden;
    padding: clamp(22px, 5vw, 40px);
    border: 1px solid #e4d8ff;
    border-radius: 26px;
    background:
        radial-gradient(
            circle at 95% 5%,
            rgba(34,211,238,.19),
            transparent 45%
        ),
        radial-gradient(
            circle at 80% 100%,
            rgba(236,72,153,.14),
            transparent 50%
        ),
        linear-gradient(
            135deg,
            #f4edff,
            #fff,
            #fdf2f8
        );
}

#wnProfessionalDashboard .wnpd-eyebrow {
    color: var(--wnpd-purple);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .11em;
    text-transform: uppercase;
    margin-bottom: 14px;
}

#wnProfessionalDashboard .wnpd-title {
    color: var(--wnpd-text);
    font-size: clamp(26px, 5vw, 42px);
    line-height: 1.12;
    letter-spacing: -.04em;
    font-weight: 800;
    margin: 0 0 12px;
}

#wnProfessionalDashboard .wnpd-subtitle {
    color: var(--wnpd-muted);
    font-size: 14px;
    line-height: 1.65;
    margin: 0;
}

#wnProfessionalDashboard .wnpd-section {
    min-width: 0;
    max-width: 100%;
}

#wnProfessionalDashboard .wnpd-section-title {
    color: var(--wnpd-text);
    font-size: 18px;
    font-weight: 750;
    margin: 0 0 16px;
    line-height: 1.35;
}

#wnProfessionalDashboard .wnpd-metric-grid {
    display: grid;
    grid-template-columns:
        repeat(4, minmax(0, 1fr));
    gap: 12px;
    min-width: 0;
}

#wnProfessionalDashboard .wnpd-metric {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    gap: 9px;
    padding: 18px;
    background: #fff;
    border: 1px solid var(--wnpd-border);
    border-radius: 20px;
    box-shadow:
        0 5px 20px rgba(61,29,112,.04);
}

#wnProfessionalDashboard .wnpd-purple {
    --wnpd-accent: #7c3aed;
    --wnpd-soft: #f3e8ff;
}

#wnProfessionalDashboard .wnpd-pink {
    --wnpd-accent: #db2777;
    --wnpd-soft: #fce7f3;
}

#wnProfessionalDashboard .wnpd-cyan {
    --wnpd-accent: #0891b2;
    --wnpd-soft: #cffafe;
}

#wnProfessionalDashboard .wnpd-green {
    --wnpd-accent: #059669;
    --wnpd-soft: #d1fae5;
}

#wnProfessionalDashboard .wnpd-metric-icon {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 13px;
    color: var(--wnpd-accent);
    background: var(--wnpd-soft);
}

#wnProfessionalDashboard svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
}

#wnProfessionalDashboard .wnpd-metric-value {
    display: block;
    color: var(--wnpd-accent);
    font-size: clamp(24px, 4vw, 34px);
    font-weight: 800;
    line-height: 1.15;
    font-variant-numeric: tabular-nums;
    max-width: 100%;
}

#wnProfessionalDashboard .wnpd-metric-label {
    color: var(--wnpd-muted);
    font-size: 12px;
    font-weight: 650;
    line-height: 1.5;
}

#wnProfessionalDashboard .wnpd-detail-grid {
    display: grid;
    grid-template-columns:
        repeat(2, minmax(0, 1fr));
    gap: 16px;
    min-width: 0;
}

#wnProfessionalDashboard .wnpd-panel {
    background: #fff;
    border: 1px solid var(--wnpd-border);
    border-radius: 22px;
    padding: 20px;
    box-shadow:
        0 5px 20px rgba(61,29,112,.04);
}

#wnProfessionalDashboard .wnpd-progress-item {
    display: grid;
    gap: 10px;
    margin: 18px 0;
}

#wnProfessionalDashboard .wnpd-progress-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    font-size: 13px;
    line-height: 1.5;
}

#wnProfessionalDashboard .wnpd-progress-header strong {
    flex-shrink: 0;
    color: var(--wnpd-purple);
}

#wnProfessionalDashboard .wnpd-progress-track {
    width: 100%;
    height: 9px;
    background: #eee9f5;
    border-radius: 999px;
    overflow: hidden;
}

#wnProfessionalDashboard .wnpd-progress-bar {
    height: 100%;
    border-radius: inherit;
}

#wnProfessionalDashboard .wnpd-bar-purple {
    background: linear-gradient(
        90deg,
        #7c3aed,
        #a78bfa
    );
}

#wnProfessionalDashboard .wnpd-bar-pink {
    background: linear-gradient(
        90deg,
        #db2777,
        #ec4899
    );
}

#wnProfessionalDashboard .wnpd-event-list {
    display: grid;
    gap: 10px;
}

#wnProfessionalDashboard .wnpd-event {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    min-width: 0;
    padding: 14px;
    background: #faf8ff;
    border: 1px solid #eee7fa;
    border-radius: 16px;
}

#wnProfessionalDashboard .wnpd-event-icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    color: #7c3aed;
    background: #ede9fe;
    border-radius: 12px;
}

#wnProfessionalDashboard .wnpd-event-content {
    display: grid;
    gap: 4px;
    min-width: 0;
    flex: 1;
}

#wnProfessionalDashboard .wnpd-event-type {
    color: #7c3aed;
    font-size: 11px;
    font-weight: 750;
    text-transform: uppercase;
}

#wnProfessionalDashboard .wnpd-event-title {
    font-size: 14px;
    line-height: 1.4;
}

#wnProfessionalDashboard .wnpd-event-company,
#wnProfessionalDashboard .wnpd-event-date,
#wnProfessionalDashboard .wnpd-muted {
    color: var(--wnpd-muted);
    font-size: 12px;
    line-height: 1.6;
}

#wnProfessionalDashboard .wnpd-message {
    padding: 16px;
    border-radius: 15px;
    background: #f5f3ff;
    border: 1px solid #e9d5ff;
    color: #5b21b6;
    font-size: 13px;
    line-height: 1.6;
}

#wnProfessionalDashboard .wnpd-message-warning {
    background: #fffbeb;
    border-color: #fde68a;
    color: #92400e;
}

#wnProfessionalDashboard .wnpd-message-error {
    background: #fff1f2;
    border-color: #fecdd3;
    color: #9f1239;
}

#wnProfessionalDashboard .wnpd-footer {
    color: var(--wnpd-muted);
    font-size: 11px;
    line-height: 1.65;
    padding: 0 4px;
}

#wnProfessionalDashboard .wnpd-footer p {
    margin: 4px 0;
}

#wnProfessionalDashboard .wnpd-refresh {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-height: 44px;
    width: fit-content;
    max-width: 100%;
    padding: 12px 20px;
    border: 0;
    border-radius: 13px;
    color: #fff;
    background: linear-gradient(
        135deg,
        #7c3aed,
        #9333ea
    );
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    white-space: normal;
}

#wnProfessionalDashboard .wnpd-refresh svg {
    width: 18px;
    height: 18px;
}

#wnProfessionalDashboard .wnpd-refresh:disabled {
    opacity: .55;
    cursor: wait;
}

#wnProfessionalDashboard button:focus-visible {
    outline: 3px solid #a78bfa;
    outline-offset: 3px;
}

@media (max-width: 900px) {
    #wnProfessionalDashboard .wnpd-metric-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 700px) {
    #wnProfessionalDashboard .wnpd-detail-grid {
        grid-template-columns: minmax(0, 1fr);
    }

    #wnProfessionalDashboard .wnpd-panel {
        padding: 16px;
    }

    #wnProfessionalDashboard .wnpd-metric {
        padding: 15px;
    }
}

@media (max-width: 360px) {
    #wnProfessionalDashboard .wnpd-metric-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}

@media print {
    #wnProfessionalDashboard {
        display: none !important;
    }
}
`;

        document.head.appendChild(style);
    }

    function mount(target) {
        if (suspended) return false;

        const container =
            typeof target === "string"
                ? document.querySelector(target)
                : target instanceof HTMLElement
                    ? target
                    : document.getElementById(
                        MOUNT_ID
                    );

        if (!container) {
            return false;
        }

        installStyles();

        root = document.getElementById(
            ROOT_ID
        );

        if (!root) {
            root = node(
                "section",
                "wnpd-dashboard"
            );

            root.id = ROOT_ID;
        }

        if (root.parentElement !== container) {
            container.appendChild(root);
        }

        render();

        return true;
    }

    function initialize() {
        if (suspended) return false;

        const mounted = mount();

        if (!mounted) {
            return false;
        }

        const api = engine();

        if (
            api &&
            typeof api.getState === "function"
        ) {
            const state = api.getState();

            if (
                state.authenticated &&
                !state.loading &&
                !state.available &&
                !state.recoveryMode &&
                !state.error
            ) {
                api.refresh();
            }
        }

        return true;
    }

    function clearPrivateView() {
        if (root) {
            root.replaceChildren();
            root.setAttribute(
                "aria-busy",
                "false"
            );
        }
    }

    function installListeners() {
        if (initialized) return;

        initialized = true;

        document.addEventListener(
            "worknely:unifiedcareerchange",
            render
        );

        document.addEventListener(
            "worknely:unifiedcareerready",
            initialize
        );

        document.addEventListener(
            "worknely:languagechange",
            render
        );

        document.addEventListener(
            "worknely:localizationready",
            render
        );

        document.addEventListener(
            "change",
            function (event) {
                if (
                    event.target?.id === "language"
                ) {
                    render();
                }
            }
        );

        document.addEventListener(
            "worknely:workspacechange",
            initialize
        );

        window.addEventListener(
            "pagehide",
            function () {
                suspended = true;
                clearPrivateView();
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

    window.WorknelyProfessionalDashboard =
        Object.freeze({
            version: VERSION,
            mount: mount,
            initialize: initialize,
            refresh: render,
            getState: function () {
                return {
                    version: VERSION,
                    mounted: Boolean(
                        root?.isConnected
                    ),
                    language: getLanguage(),
                    engineAvailable: Boolean(
                        engine()
                    ),
                    responsive: true,
                    readOnly: true,
                    localDataStorage: false,
                    supportedLanguages:
                        Object.keys(DICTIONARY)
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
            "worknely:professionaldashboardready",
            {
                detail: {
                    version: VERSION
                }
            }
        )
    );

})();
