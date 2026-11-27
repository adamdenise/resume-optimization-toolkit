
(function () {
    "use strict";

    const VERSION = "7.20.3";
    const ROOT_ID = "wnCareerPerformance";
    const STYLE_ID = "wnCareerPerformanceStyles";
    const MOUNT_ID = "wnCareerPerformanceMount";
    const SVG_NS = "http://www.w3.org/2000/svg";

    const D = Object.freeze({
        en: [
            "Career Performance",
            "Understand your saved professional results.",
            "Latest ATS score",
            "Best ATS score",
            "Average ATS score",
            "ATS score difference",
            "ATS performance history",
            "First analysis",
            "Latest analysis",
            "Save at least two ATS analyses to see your history.",
            "Application performance",
            "Active applications",
            "Interview stage",
            "Offer stage",
            "Accepted",
            "Saved ATS analyses",
            "Lowest ATS score",
            "Percentage points",
            "Different jobs and engine versions may produce different scores.",
            "These percentages describe current application statuses, not historical conversion rates.",
            "Sign in to view your performance.",
            "Loading performance data...",
            "Performance data unavailable.",
            "No saved ATS score.",
            "Based on the latest 100 saved career analyses.",
            "No saved applications.",
            "View analysis history",
            "Career intelligence",
            "Saved career analyses",
            "Saved career modules",
            "Estimated skill coverage",
            "Estimated career match",
            "Career plan progress",
            "Some data is unavailable.",
            "Complete password recovery first.",
            "Total applications",
            "Rejected applications",
            "Analysis engine",
            "Not available"
        ],

        ro: [
            "Performanța profesională",
            "Înțelege rezultatele tale profesionale salvate.",
            "Ultimul scor ATS",
            "Cel mai bun scor ATS",
            "Scor ATS mediu",
            "Diferența scorului ATS",
            "Istoricul performanței ATS",
            "Prima analiză",
            "Ultima analiză",
            "Salvează minimum două analize ATS pentru a vedea istoricul.",
            "Performanța candidaturilor",
            "Candidaturi active",
            "Etapa de interviu",
            "Etapa de ofertă",
            "Acceptate",
            "Analize ATS salvate",
            "Cel mai mic scor ATS",
            "Puncte procentuale",
            "Joburile și versiunile diferite ale motoarelor pot produce scoruri diferite.",
            "Procentele descriu statusurile actuale ale candidaturilor, nu rate istorice de conversie.",
            "Autentifică-te pentru a vedea performanța.",
            "Se încarcă datele de performanță...",
            "Datele de performanță sunt indisponibile.",
            "Niciun scor ATS salvat.",
            "Bazat pe ultimele 100 de analize profesionale salvate.",
            "Nicio candidatură salvată.",
            "Vezi istoricul analizelor",
            "Inteligență profesională",
            "Analize profesionale salvate",
            "Module profesionale salvate",
            "Acoperirea estimată a competențelor",
            "Potrivire profesională estimată",
            "Progresul planului de carieră",
            "Unele date sunt indisponibile.",
            "Finalizează mai întâi recuperarea parolei.",
            "Total candidaturi",
            "Candidaturi respinse",
            "Motor de analiză",
            "Indisponibil"
        ],

        it: [
            "Performance professionale",
            "Comprendi i tuoi risultati professionali salvati.",
            "Ultimo punteggio ATS",
            "Miglior punteggio ATS",
            "Punteggio ATS medio",
            "Differenza del punteggio ATS",
            "Storico delle performance ATS",
            "Prima analisi",
            "Ultima analisi",
            "Salva almeno due analisi ATS per vedere lo storico.",
            "Performance delle candidature",
            "Candidature attive",
            "Fase di colloquio",
            "Fase di offerta",
            "Accettate",
            "Analisi ATS salvate",
            "Punteggio ATS minimo",
            "Punti percentuali",
            "Lavori e versioni diverse del motore possono produrre punteggi differenti.",
            "Le percentuali descrivono gli stati attuali, non i tassi storici di conversione.",
            "Accedi per visualizzare le performance.",
            "Caricamento dei dati...",
            "Dati delle performance non disponibili.",
            "Nessun punteggio ATS salvato.",
            "Basato sulle ultime 100 analisi professionali salvate.",
            "Nessuna candidatura salvata.",
            "Visualizza lo storico delle analisi",
            "Intelligenza professionale",
            "Analisi professionali salvate",
            "Moduli professionali salvati",
            "Copertura stimata delle competenze",
            "Compatibilità professionale stimata",
            "Progresso del piano di carriera",
            "Alcuni dati non sono disponibili.",
            "Completa prima il recupero della password.",
            "Candidature totali",
            "Candidature rifiutate",
            "Motore di analisi",
            "Non disponibile"
        ],

        de: [
            "Berufliche Leistung",
            "Verstehe deine gespeicherten beruflichen Ergebnisse.",
            "Letzter ATS-Wert",
            "Bester ATS-Wert",
            "Durchschnittlicher ATS-Wert",
            "ATS-Wertdifferenz",
            "ATS-Leistungsverlauf",
            "Erste Analyse",
            "Letzte Analyse",
            "Speichere mindestens zwei ATS-Analysen.",
            "Bewerbungsleistung",
            "Aktive Bewerbungen",
            "Interviewphase",
            "Angebotsphase",
            "Angenommen",
            "Gespeicherte ATS-Analysen",
            "Niedrigster ATS-Wert",
            "Prozentpunkte",
            "Unterschiedliche Stellen und Engine-Versionen können unterschiedliche Werte erzeugen.",
            "Die Prozentsätze beschreiben aktuelle Statuswerte, keine historischen Konversionsraten.",
            "Melde dich an, um deine Leistung zu sehen.",
            "Leistungsdaten werden geladen...",
            "Leistungsdaten nicht verfügbar.",
            "Kein ATS-Wert gespeichert.",
            "Basierend auf den letzten 100 gespeicherten Karriereanalysen.",
            "Keine Bewerbungen gespeichert.",
            "Analyseverlauf anzeigen",
            "Karriereintelligenz",
            "Gespeicherte Karriereanalysen",
            "Gespeicherte Karrieremodule",
            "Geschätzte Kompetenzabdeckung",
            "Geschätzte Karriereübereinstimmung",
            "Fortschritt des Karriereplans",
            "Einige Daten sind nicht verfügbar.",
            "Schließe zuerst die Passwortwiederherstellung ab.",
            "Bewerbungen insgesamt",
            "Abgelehnte Bewerbungen",
            "Analyse-Engine",
            "Nicht verfügbar"
        ],

        fr: [
            "Performance professionnelle",
            "Comprenez vos résultats professionnels enregistrés.",
            "Dernier score ATS",
            "Meilleur score ATS",
            "Score ATS moyen",
            "Différence du score ATS",
            "Historique des performances ATS",
            "Première analyse",
            "Dernière analyse",
            "Enregistrez au moins deux analyses ATS.",
            "Performance des candidatures",
            "Candidatures actives",
            "Phase d'entretien",
            "Phase d'offre",
            "Acceptées",
            "Analyses ATS enregistrées",
            "Score ATS minimum",
            "Points de pourcentage",
            "Des postes et versions différents peuvent produire des scores différents.",
            "Les pourcentages décrivent les statuts actuels, pas les taux de conversion historiques.",
            "Connectez-vous pour voir vos performances.",
            "Chargement des performances...",
            "Données de performance indisponibles.",
            "Aucun score ATS enregistré.",
            "Basé sur les 100 dernières analyses professionnelles enregistrées.",
            "Aucune candidature enregistrée.",
            "Voir l'historique des analyses",
            "Intelligence professionnelle",
            "Analyses professionnelles enregistrées",
            "Modules professionnels enregistrés",
            "Couverture estimée des compétences",
            "Correspondance professionnelle estimée",
            "Progression du plan de carrière",
            "Certaines données sont indisponibles.",
            "Terminez d'abord la récupération du mot de passe.",
            "Total des candidatures",
            "Candidatures refusées",
            "Moteur d'analyse",
            "Indisponible"
        ],

        es: [
            "Rendimiento profesional",
            "Comprende tus resultados profesionales guardados.",
            "Última puntuación ATS",
            "Mejor puntuación ATS",
            "Puntuación ATS media",
            "Diferencia de puntuación ATS",
            "Historial de rendimiento ATS",
            "Primer análisis",
            "Último análisis",
            "Guarda al menos dos análisis ATS.",
            "Rendimiento de candidaturas",
            "Candidaturas activas",
            "Fase de entrevista",
            "Fase de oferta",
            "Aceptadas",
            "Análisis ATS guardados",
            "Puntuación ATS mínima",
            "Puntos porcentuales",
            "Diferentes empleos y versiones pueden producir puntuaciones diferentes.",
            "Los porcentajes describen estados actuales, no tasas históricas de conversión.",
            "Inicia sesión para ver tu rendimiento.",
            "Cargando datos de rendimiento...",
            "Datos de rendimiento no disponibles.",
            "Ninguna puntuación ATS guardada.",
            "Basado en los últimos 100 análisis profesionales guardados.",
            "Ninguna candidatura guardada.",
            "Ver historial de análisis",
            "Inteligencia profesional",
            "Análisis profesionales guardados",
            "Módulos profesionales guardados",
            "Cobertura estimada de competencias",
            "Compatibilidad profesional estimada",
            "Progreso del plan de carrera",
            "Algunos datos no están disponibles.",
            "Completa primero la recuperación de contraseña.",
            "Total de candidaturas",
            "Candidaturas rechazadas",
            "Motor de análisis",
            "No disponible"
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
    let suspended = false;
    let initialized = false;

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

    function svgNode(tag, attributes, content) {
        const element = document.createElementNS(
            SVG_NS,
            tag
        );

        Object.entries(attributes || {})
            .forEach(function (entry) {
                element.setAttribute(
                    entry[0],
                    String(entry[1])
                );
            });

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

    function round(value) {
        return Math.round(value * 100) / 100;
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

    function formatChange(value) {
        if (
            typeof value !== "number" ||
            !Number.isFinite(value)
        ) {
            return "—";
        }

        return (
            value > 0 ? "+" : ""
        ) + formatNumber(value);
    }

    function formatDate(value) {
        const date = new Date(value);

        if (
            !value ||
            !Number.isFinite(date.getTime())
        ) {
            return "—";
        }

        return new Intl.DateTimeFormat(
            locale(),
            {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        ).format(date);
    }

    function calculateATS(input) {
        const source = Array.isArray(input)
            ? input
            : [];

        const history = source
            .filter(function (item) {
                return item &&
                    validScore(item.score) &&
                    typeof item.date === "string" &&
                    Number.isFinite(
                        Date.parse(item.date)
                    );
            })
            .map(function (item) {
                return {
                    score: item.score,
                    date: new Date(
                        item.date
                    ).toISOString(),
                    engineVersion:
                        typeof item.engineVersion === "string"
                            ? item.engineVersion.slice(0, 40)
                            : ""
                };
            })
            .sort(function (a, b) {
                return Date.parse(a.date) -
                    Date.parse(b.date);
            })
            .slice(-100);

        if (!history.length) {
            return {
                count: 0,
                latest: null,
                first: null,
                best: null,
                lowest: null,
                average: null,
                difference: null,
                recentDifference: null,
                history: []
            };
        }

        const scores = history.map(
            function (item) {
                return item.score;
            }
        );

        const first = scores[0];

        const latest =
            scores[scores.length - 1];

        return {
            count: scores.length,
            latest: latest,
            first: first,
            best: Math.max(...scores),
            lowest: Math.min(...scores),
            average: round(
                scores.reduce(
                    function (sum, score) {
                        return sum + score;
                    },
                    0
                ) / scores.length
            ),
            difference:
                scores.length >= 2
                    ? round(latest - first)
                    : null,
            recentDifference:
                scores.length >= 2
                    ? round(
                        latest -
                        scores[scores.length - 2]
                    )
                    : null,
            history: history
        };
    }

    function calculateApplications(input) {
        if (
            !input ||
            !validCount(input.total)
        ) {
            return null;
        }

        const total = input.total;

        function ratio(value) {
            if (
                !validCount(value) ||
                value > total ||
                total === 0
            ) {
                return null;
            }

            return round(
                value / total * 100
            );
        }

        return {
            total: total,
            active: ratio(input.active),
            interview: ratio(input.interviews),
            offer: ratio(input.offers),
            accepted: ratio(input.accepted),
            rejected: ratio(input.rejected)
        };
    }

    function calculate(snapshot) {
        const data = snapshot &&
            typeof snapshot === "object"
                ? snapshot
                : {};

        return {
            version: VERSION,
            ats: calculateATS(
                data.career?.atsHistory
            ),
            applications: calculateApplications(
                data.applications
            ),
            career: {
                savedAnalyses:
                    validCount(
                        data.career?.savedAnalysesInWindow
                    )
                        ? data.career.savedAnalysesInWindow
                        : null,
                savedModules:
                    validCount(
                        data.career?.completedModulesInWindow
                    ) &&
                    data.career.completedModulesInWindow <= 7
                        ? data.career.completedModulesInWindow
                        : null,
                skillCoverage:
                    validScore(
                        data.career?.skillCoverage?.score
                    )
                        ? data.career.skillCoverage.score
                        : null,
                careerMatch:
                    validScore(
                        data.career?.careerMatch?.score
                    )
                        ? data.career.careerMatch.score
                        : null,
                careerPlan:
                    validScore(
                        data.career?.careerPlan?.score
                    )
                        ? data.career.careerPlan.score
                        : null
            },
            partial: Boolean(data.partial),
            historicalConversionRates: false,
            estimatedScores: true
        };
    }

    function createMetric(
        label,
        value,
        color,
        note
    ) {
        const card = node(
            "article",
            "wncp-metric wncp-" + color
        );

        card.append(
            node(
                "span",
                "wncp-label",
                label
            ),
            node(
                "strong",
                "wncp-value",
                value
            )
        );

        if (note) {
            card.appendChild(
                node(
                    "small",
                    "wncp-muted",
                    note
                )
            );
        }

        return card;
    }

    function createATSChart(history) {
        const panel = node(
            "section",
            "wncp-panel"
        );

        panel.appendChild(
            node(
                "h3",
                "wncp-title",
                tr(6)
            )
        );

        if (history.length < 2) {
            panel.appendChild(
                node(
                    "p",
                    "wncp-muted",
                    tr(9)
                )
            );

            return panel;
        }

        const width = 640;
        const height = 260;
        const left = 48;
        const right = 22;
        const top = 22;
        const bottom = 34;

        const chartWidth =
            width - left - right;

        const chartHeight =
            height - top - bottom;

        const baseline =
            height - bottom;

        const svg = svgNode("svg", {
            viewBox:
                "0 0 " + width + " " + height,
            class: "wncp-chart",
            role: "img",
            "aria-label": tr(6),
            preserveAspectRatio: "xMidYMid meet"
        });

        svg.appendChild(
            svgNode("title", {}, tr(6))
        );

        function y(value) {
            return top +
                (100 - value) / 100 *
                chartHeight;
        }

        function x(index) {
            return left +
                index /
                (history.length - 1) *
                chartWidth;
        }

        [0, 25, 50, 75, 100]
            .forEach(function (value) {
                const position = y(value);

                svg.append(
                    svgNode("line", {
                        x1: left,
                        x2: width - right,
                        y1: position,
                        y2: position,
                        stroke: "#e9e2f4",
                        "stroke-width": 1
                    }),
                    svgNode("text", {
                        x: left - 9,
                        y: position + 4,
                        "text-anchor": "end",
                        "font-size": 12,
                        fill: "#71677f"
                    }, value + "%")
                );
            });

        const points = history.map(
            function (item, index) {
                return {
                    x: x(index),
                    y: y(item.score),
                    score: item.score,
                    date: item.date,
                    engineVersion:
                        item.engineVersion
                };
            }
        );

        const coordinates = points.map(
            function (point) {
                return point.x + "," +
                    point.y;
            }
        ).join(" ");

        const area =
            points[0].x + "," +
            baseline + " " +
            coordinates + " " +
            points[points.length - 1].x +
            "," + baseline;

        svg.append(
            svgNode("polygon", {
                points: area,
                fill: "#7c3aed",
                opacity: ".09"
            }),
            svgNode("polyline", {
                points: coordinates,
                fill: "none",
                stroke: "#7c3aed",
                "stroke-width": 3,
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            })
        );

        points.forEach(
            function (point, index) {
                const circle = svgNode(
                    "circle",
                    {
                        cx: point.x,
                        cy: point.y,
                        r: points.length > 30
                            ? 2.5
                            : 4.5,
                        fill: "#7c3aed",
                        stroke: "#ffffff",
                        "stroke-width": 1.5
                    }
                );

                circle.appendChild(
                    svgNode(
                        "title",
                        {},
                        formatDate(point.date) +
                        " — " +
                        formatScore(point.score)
                    )
                );

                svg.appendChild(circle);

                if (
                    points.length <= 8 ||
                    index === 0 ||
                    index === points.length - 1
                ) {
                    svg.appendChild(
                        svgNode("text", {
                            x: point.x,
                            y: Math.max(
                                12,
                                point.y - 11
                            ),
                            "text-anchor": "middle",
                            "font-size": 12,
                            fill: "#7c3aed"
                        }, formatNumber(
                            point.score
                        ))
                    );
                }
            }
        );

        panel.appendChild(svg);

        const dates = node(
            "div",
            "wncp-chart-dates"
        );

        dates.append(
            node(
                "span",
                "",
                tr(7) + ": " +
                    formatDate(history[0].date)
            ),
            node(
                "span",
                "",
                tr(8) + ": " +
                    formatDate(
                        history[
                            history.length - 1
                        ].date
                    )
            )
        );

        panel.appendChild(dates);

        const details = node(
            "details",
            "wncp-history"
        );

        details.appendChild(
            node("summary", "", tr(26))
        );

        history.slice()
            .reverse()
            .forEach(function (item) {
                const row = node(
                    "div",
                    "wncp-history-row"
                );

                const description = node(
                    "div",
                    "wncp-history-description"
                );

                description.append(
                    node(
                        "span",
                        "",
                        formatDate(item.date)
                    ),
                    node(
                        "small",
                        "wncp-muted",
                        tr(37) + ": " +
                        (
                            item.engineVersion ||
                            tr(38)
                        )
                    )
                );

                row.append(
                    description,
                    node(
                        "strong",
                        "",
                        formatScore(item.score)
                    )
                );

                details.appendChild(row);
            });

        panel.append(
            details,
            node(
                "p",
                "wncp-muted",
                tr(18)
            )
        );

        return panel;
    }

    function createATSSection(ats) {
        const section = node(
            "section",
            "wncp-section"
        );

        const grid = node(
            "div",
            "wncp-grid"
        );

        const differenceColor =
            ats.difference === null
                ? "neutral"
                : ats.difference > 0
                    ? "green"
                    : ats.difference < 0
                        ? "red"
                        : "neutral";

        grid.append(
            createMetric(
                tr(2),
                formatScore(ats.latest),
                "purple"
            ),
            createMetric(
                tr(3),
                formatScore(ats.best),
                "pink"
            ),
            createMetric(
                tr(4),
                formatScore(ats.average),
                "cyan"
            ),
            createMetric(
                tr(5),
                formatChange(ats.difference),
                differenceColor,
                tr(17)
            ),
            createMetric(
                tr(15),
                formatNumber(ats.count),
                "purple"
            ),
            createMetric(
                tr(16),
                formatScore(ats.lowest),
                "cyan"
            )
        );

        section.append(
            grid,
            createATSChart(ats.history)
        );

        return section;
    }

    function createBar(label, value, color) {
        const wrapper = node(
            "div",
            "wncp-progress"
        );

        const header = node(
            "div",
            "wncp-progress-header"
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
            return wrapper;
        }

        const track = node(
            "div",
            "wncp-track"
        );

        track.setAttribute(
            "role",
            "progressbar"
        );

        track.setAttribute(
            "aria-label",
            label
        );

        track.setAttribute(
            "aria-valuemin",
            "0"
        );

        track.setAttribute(
            "aria-valuemax",
            "100"
        );

        track.setAttribute(
            "aria-valuenow",
            String(value)
        );

        const bar = node(
            "div",
            "wncp-bar wncp-bar-" + color
        );

        bar.style.width = value + "%";

        track.appendChild(bar);
        wrapper.appendChild(track);

        return wrapper;
    }

    function createApplicationsSection(data) {
        const section = node(
            "section",
            "wncp-panel"
        );

        section.appendChild(
            node(
                "h3",
                "wncp-title",
                tr(10)
            )
        );

        if (!data) {
            section.appendChild(
                node(
                    "p",
                    "wncp-muted",
                    tr(22)
                )
            );

            return section;
        }

        section.appendChild(
            createMetric(
                tr(35),
                formatNumber(data.total),
                "purple"
            )
        );

        if (!data.total) {
            section.appendChild(
                node(
                    "p",
                    "wncp-muted",
                    tr(25)
                )
            );

            return section;
        }

        section.append(
            createBar(
                tr(11),
                data.active,
                "purple"
            ),
            createBar(
                tr(12),
                data.interview,
                "pink"
            ),
            createBar(
                tr(13),
                data.offer,
                "cyan"
            ),
            createBar(
                tr(14),
                data.accepted,
                "green"
            ),
            createBar(
                tr(36),
                data.rejected,
                "red"
            ),
            node(
                "p",
                "wncp-muted",
                tr(19)
            )
        );

        return section;
    }

    function createCareerSection(data) {
        const section = node(
            "section",
            "wncp-panel"
        );

        section.appendChild(
            node(
                "h3",
                "wncp-title",
                tr(27)
            )
        );

        const grid = node(
            "div",
            "wncp-small-grid"
        );

        grid.append(
            createMetric(
                tr(28),
                formatNumber(
                    data.savedAnalyses
                ),
                "purple"
            ),
            createMetric(
                tr(29),
                data.savedModules === null
                    ? "—"
                    : formatNumber(
                        data.savedModules
                    ) + "/7",
                "pink"
            )
        );

        section.append(
            grid,
            createBar(
                tr(30),
                data.skillCoverage,
                "purple"
            ),
            createBar(
                tr(31),
                data.careerMatch,
                "cyan"
            ),
            createBar(
                tr(32),
                data.careerPlan,
                "pink"
            )
        );

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

        const engine =
            window.WorknelyUnifiedCareer;

        const fragment =
            document.createDocumentFragment();

        const header = node(
            "div",
            "wncp-header"
        );

        header.append(
            node(
                "h2",
                "wncp-heading",
                tr(0)
            ),
            node(
                "p",
                "wncp-muted",
                tr(1)
            )
        );

        fragment.appendChild(header);

        root.setAttribute(
            "aria-label",
            tr(0)
        );

        if (
            !engine ||
            typeof engine.getState !== "function" ||
            typeof engine.getSnapshot !== "function"
        ) {
            fragment.appendChild(
                node(
                    "p",
                    "wncp-message",
                    tr(22)
                )
            );

            root.replaceChildren(fragment);
            return false;
        }

        const state = engine.getState();

        root.setAttribute(
            "aria-busy",
            String(Boolean(state.loading))
        );

        let message = null;

        if (state.recoveryMode) {
            message = tr(34);
        } else if (state.loading) {
            message = tr(21);
        } else if (!state.authenticated) {
            message = tr(20);
        } else if (
            state.error === "DATA_UNAVAILABLE"
        ) {
            message = tr(22);
        }

        if (message) {
            const status = node(
                "p",
                "wncp-message",
                message
            );

            status.setAttribute(
                "role",
                "status"
            );

            fragment.appendChild(status);
            root.replaceChildren(fragment);

            return true;
        }

        const snapshot = engine.getSnapshot();

        if (!snapshot) {
            fragment.appendChild(
                node(
                    "p",
                    "wncp-message",
                    tr(22)
                )
            );

            root.replaceChildren(fragment);

            return false;
        }

        const data = calculate(snapshot);

        if (data.partial) {
            fragment.appendChild(
                node(
                    "p",
                    "wncp-message",
                    tr(33)
                )
            );
        }

        if (snapshot.career) {
            fragment.appendChild(
                createATSSection(data.ats)
            );
        } else {
            fragment.appendChild(
                node(
                    "p",
                    "wncp-message",
                    tr(22)
                )
            );
        }

        const grid = node(
            "div",
            "wncp-detail-grid"
        );

        grid.append(
            createApplicationsSection(
                data.applications
            ),
            createCareerSection(
                data.career
            )
        );

        fragment.append(
            grid,
            node(
                "p",
                "wncp-muted",
                tr(24)
            )
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
#wnCareerPerformance {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    display: grid;
    gap: 18px;
    color: #211936;
    font-family: inherit;
    overflow-wrap: anywhere;
    box-sizing: border-box;
}

#wnCareerPerformance *,
#wnCareerPerformance *::before,
#wnCareerPerformance *::after {
    box-sizing: border-box;
}

#wnCareerPerformance .wncp-header {
    padding: 24px;
    border-radius: 24px;
    border: 1px solid #e4d8ff;
    background: linear-gradient(
        135deg,
        #f3e8ff,
        #ffffff,
        #ecfeff
    );
}

#wnCareerPerformance .wncp-heading {
    font-size: clamp(23px, 4vw, 32px);
    font-weight: 800;
    letter-spacing: -.03em;
    margin: 0 0 8px;
    line-height: 1.25;
}

#wnCareerPerformance .wncp-section {
    display: grid;
    gap: 16px;
    min-width: 0;
}

#wnCareerPerformance .wncp-grid {
    display: grid;
    grid-template-columns:
        repeat(3, minmax(0, 1fr));
    gap: 12px;
    min-width: 0;
}

#wnCareerPerformance .wncp-small-grid,
#wnCareerPerformance .wncp-detail-grid {
    display: grid;
    grid-template-columns:
        repeat(2, minmax(0, 1fr));
    gap: 14px;
    min-width: 0;
}

#wnCareerPerformance .wncp-metric {
    display: grid;
    align-content: start;
    gap: 9px;
    min-width: 0;
    padding: 18px;
    border-radius: 18px;
    border: 1px solid #e9e2f4;
    background: #ffffff;
    box-shadow:
        0 4px 18px rgba(61,29,112,.04);
}

#wnCareerPerformance .wncp-purple {
    --wncp-accent: #7c3aed;
}

#wnCareerPerformance .wncp-pink {
    --wncp-accent: #db2777;
}

#wnCareerPerformance .wncp-cyan {
    --wncp-accent: #0891b2;
}

#wnCareerPerformance .wncp-green {
    --wncp-accent: #059669;
}

#wnCareerPerformance .wncp-red {
    --wncp-accent: #dc2626;
}

#wnCareerPerformance .wncp-neutral {
    --wncp-accent: #64748b;
}

#wnCareerPerformance .wncp-value {
    color: var(--wncp-accent, #7c3aed);
    font-size: clamp(24px, 4vw, 34px);
    font-weight: 800;
    line-height: 1.2;
    font-variant-numeric: tabular-nums;
}

#wnCareerPerformance .wncp-label {
    color: #71677f;
    font-size: 12px;
    font-weight: 650;
    line-height: 1.5;
}

#wnCareerPerformance .wncp-muted {
    color: #71677f;
    font-size: 12px;
    line-height: 1.65;
}

#wnCareerPerformance .wncp-panel {
    min-width: 0;
    max-width: 100%;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #e9e2f4;
    border-radius: 22px;
    box-shadow:
        0 5px 20px rgba(61,29,112,.04);
}

#wnCareerPerformance .wncp-title {
    margin: 0 0 18px;
    font-size: 18px;
    line-height: 1.4;
    font-weight: 750;
}

#wnCareerPerformance .wncp-chart {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    min-width: 0;
}

#wnCareerPerformance .wncp-chart-dates {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    color: #71677f;
    font-size: 11px;
    line-height: 1.6;
}

#wnCareerPerformance .wncp-history {
    margin-top: 18px;
    padding: 12px;
    border: 1px solid #eee7fa;
    border-radius: 13px;
    background: #faf8ff;
}

#wnCareerPerformance .wncp-history summary {
    color: #7c3aed;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    padding: 8px 0;
}

#wnCareerPerformance .wncp-history-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-width: 0;
    padding: 12px 0;
    border-top: 1px solid #eee7fa;
    font-size: 12px;
}

#wnCareerPerformance .wncp-history-description {
    display: grid;
    gap: 4px;
    min-width: 0;
}

#wnCareerPerformance .wncp-history-row strong {
    color: #7c3aed;
    flex-shrink: 0;
}

#wnCareerPerformance .wncp-progress {
    display: grid;
    gap: 10px;
    margin: 20px 0;
}

#wnCareerPerformance .wncp-progress-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    line-height: 1.5;
}

#wnCareerPerformance .wncp-progress-header strong {
    color: #211936;
    flex-shrink: 0;
}

#wnCareerPerformance .wncp-track {
    width: 100%;
    height: 9px;
    background: #eee9f5;
    border-radius: 999px;
    overflow: hidden;
}

#wnCareerPerformance .wncp-bar {
    height: 100%;
    border-radius: inherit;
}

#wnCareerPerformance .wncp-bar-purple {
    background: linear-gradient(
        90deg, #7c3aed, #a78bfa
    );
}

#wnCareerPerformance .wncp-bar-pink {
    background: linear-gradient(
        90deg, #db2777, #ec4899
    );
}

#wnCareerPerformance .wncp-bar-cyan {
    background: linear-gradient(
        90deg, #0891b2, #22d3ee
    );
}

#wnCareerPerformance .wncp-bar-green {
    background: linear-gradient(
        90deg, #059669, #34d399
    );
}

#wnCareerPerformance .wncp-bar-red {
    background: linear-gradient(
        90deg, #dc2626, #fb7185
    );
}

#wnCareerPerformance .wncp-message {
    padding: 15px;
    margin: 0;
    background: #f5f3ff;
    border: 1px solid #e9d5ff;
    border-radius: 14px;
    color: #5b21b6;
    font-size: 13px;
    line-height: 1.6;
}

#wnCareerPerformance summary:focus-visible {
    outline: 3px solid #a78bfa;
    outline-offset: 3px;
}

@media (max-width: 850px) {
    #wnCareerPerformance .wncp-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 700px) {
    #wnCareerPerformance .wncp-detail-grid {
        grid-template-columns:
            minmax(0, 1fr);
    }

    #wnCareerPerformance .wncp-panel {
        padding: 15px;
    }

    #wnCareerPerformance .wncp-metric {
        padding: 14px;
    }

    #wnCareerPerformance .wncp-header {
        padding: 20px;
    }
}

@media (max-width: 360px) {
    #wnCareerPerformance .wncp-grid,
    #wnCareerPerformance .wncp-small-grid {
        grid-template-columns:
            minmax(0, 1fr);
    }
}

@media print {
    #wnCareerPerformance {
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

        const dashboard =
            document.getElementById(
                "wnProfessionalDashboard"
            );

        if (
            !container &&
            !dashboard?.parentElement
        ) {
            return false;
        }

        installStyles();

        root = document.getElementById(
            ROOT_ID
        );

        if (!root) {
            root = node(
                "section",
                "wncp-performance"
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
            dashboard.nextElementSibling !== root
        ) {
            dashboard.insertAdjacentElement(
                "afterend",
                root
            );
        }

        render();

        return true;
    }

    function initialize() {
        if (suspended) return false;

        return mount();
    }

    function handleUpdate() {
        if (suspended) return;

        if (!root?.isConnected) {
            initialize();
        } else {
            render();
        }
    }

    function selfTest() {
        const sample = [
            {
                score: 41,
                date: "2026-11-24T10:00:00Z"
            },
            {
                score: 65,
                date: "2026-11-25T10:00:00Z"
            },
            {
                score: 81,
                date: "2026-11-26T10:00:00Z"
            }
        ];

        const ats = calculateATS(sample);

        const empty = calculateATS([]);

        const single = calculateATS([
            sample[0]
        ]);

        const invalid = calculateATS([
            {
                score: 150,
                date: sample[0].date
            },
            {
                score: -5,
                date: sample[0].date
            },
            {
                score: null,
                date: sample[0].date
            },
            {
                score: 50,
                date: "invalid"
            }
        ]);

        const jobs = calculateApplications({
            total: 10,
            active: 6,
            interviews: 2,
            offers: 1,
            accepted: 2,
            rejected: 1
        });

        const noJobs = calculateApplications({
            total: 0,
            active: 0
        });

        const inconsistent =
            calculateApplications({
                total: 2,
                active: 5
            });

        const reversed = calculateATS(
            sample.slice().reverse()
        );

        const checks = [
            {
                name: "Latest ATS score",
                pass: ats.latest === 81
            },
            {
                name: "Best ATS score",
                pass: ats.best === 81
            },
            {
                name: "Lowest ATS score",
                pass: ats.lowest === 41
            },
            {
                name: "Average ATS score",
                pass: ats.average === 62.33
            },
            {
                name: "ATS score difference",
                pass: ats.difference === 40
            },
            {
                name: "Recent score difference",
                pass: ats.recentDifference === 16
            },
            {
                name: "Empty history",
                pass:
                    empty.count === 0 &&
                    empty.latest === null
            },
            {
                name: "Single analysis",
                pass:
                    single.count === 1 &&
                    single.difference === null
            },
            {
                name: "Invalid scores rejected",
                pass: invalid.count === 0
            },
            {
                name: "Active applications",
                pass: jobs.active === 60
            },
            {
                name: "Interview stage",
                pass: jobs.interview === 20
            },
            {
                name: "Offer stage",
                pass: jobs.offer === 10
            },
            {
                name: "Zero denominator",
                pass: noJobs.active === null
            },
            {
                name: "Invalid ratio rejected",
                pass: inconsistent.active === null
            },
            {
                name: "Chronological sorting",
                pass:
                    reversed.first === 41 &&
                    reversed.latest === 81
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
        if (initialized) return;

        initialized = true;

        [
            "worknely:unifiedcareerchange",
            "worknely:unifiedcareerready",
            "worknely:professionaldashboardready",
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

    window.WorknelyCareerPerformance =
        Object.freeze({
            version: VERSION,
            calculate: calculate,
            calculateATS: calculateATS,
            calculateApplications:
                calculateApplications,
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
                        window.WorknelyUnifiedCareer
                    ),
                    language: language(),
                    supportedLanguages:
                        Object.keys(D),
                    readOnly: true,
                    localDataStorage: false,
                    automaticSaving: false,
                    historyLimit: 100
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
            "worknely:careerperformanceready",
            {
                detail: {
                    version: VERSION
                }
            }
        )
    );

})();
