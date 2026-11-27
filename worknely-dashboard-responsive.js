
(function () {
    "use strict";

    const VERSION = "7.20.7";

    const STYLE_ID =
        "wnDashboardResponsiveStyles";

    const BREAKPOINTS = Object.freeze({
        compact: 360,
        mobile: 600,
        tablet: 900,
        laptop: 1200
    });

    const ROOT_IDS = Object.freeze([
        "wnProfessionalDashboard",
        "wnCareerPerformance",
        "wnCareerActions",
        "wnCareerInsights"
    ]);

    const MOUNT_IDS = Object.freeze([
        "wnProfessionalDashboardMount",
        "wnCareerPerformanceMount",
        "wnCareerActionsMount",
        "wnCareerInsightsMount"
    ]);

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

    const TOLERANCE = 2;

    let initialized = false;
    let suspended = false;
    let scheduled = false;
    let generation = 0;
    let frameId = null;
    let resizeObserver = null;
    let lastLayout = null;

    const observedRoots = new Set();

    function getViewportWidth() {
        return Math.max(
            0,
            document.documentElement.clientWidth ||
            window.innerWidth ||
            0
        );
    }

    function getViewportHeight() {
        return Math.max(
            0,
            document.documentElement.clientHeight ||
            window.innerHeight ||
            0
        );
    }

    function classify(width) {
        if (
            typeof width !== "number" ||
            !Number.isFinite(width) ||
            width <= 0
        ) {
            return "unknown";
        }

        if (width < BREAKPOINTS.compact) {
            return "compact";
        }

        if (width < BREAKPOINTS.mobile) {
            return "mobile";
        }

        if (width < BREAKPOINTS.tablet) {
            return "tablet";
        }

        if (width < BREAKPOINTS.laptop) {
            return "laptop";
        }

        return "desktop";
    }

    function getLayout() {
        const width = getViewportWidth();
        const height = getViewportHeight();

        return {
            width: width,
            height: height,
            device: classify(width),

            orientation:
                width > height
                    ? "landscape"
                    : "portrait",

            touch: window.matchMedia(
                "(pointer: coarse)"
            ).matches,

            reducedMotion: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches,

            devicePixelRatio:
                window.devicePixelRatio || 1
        };
    }

    function getRoots() {
        return ROOT_IDS.map(
            function (id) {
                return document.getElementById(id);
            }
        ).filter(Boolean);
    }

    function getMounts() {
        return MOUNT_IDS.map(
            function (id) {
                return document.getElementById(id);
            }
        ).filter(Boolean);
    }

    function getWorkspace() {
        return document.getElementById(
            "professional-dashboard"
        );
    }

    function isVisible(element) {
        if (
            !element ||
            !element.isConnected ||
            element.closest("[hidden]")
        ) {
            return false;
        }

        const style =
            window.getComputedStyle(element);

        if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            style.visibility === "collapse"
        ) {
            return false;
        }

        return element.getClientRects().length > 0;
    }

    function installStyles() {
        if (
            document.getElementById(STYLE_ID)
        ) {
            return true;
        }

        const style =
            document.createElement("style");

        style.id = STYLE_ID;

        style.textContent = `
/* Worknely V7.20.7
   Scoped Professional Dashboard Responsive Layer */

#professional-dashboard,
[data-wn-dashboard-responsive="true"],
[data-wn-dashboard-mount="true"] {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
}

[data-wn-dashboard-responsive="true"] *,
[data-wn-dashboard-responsive="true"] *::before,
[data-wn-dashboard-responsive="true"] *::after {
    box-sizing: border-box;
}

[data-wn-dashboard-responsive="true"] {
    overflow-wrap: anywhere;
    word-break: normal;
    scroll-margin-top: 90px;
}

[data-wn-dashboard-responsive="true"] > *,
[data-wn-dashboard-responsive="true"] article,
[data-wn-dashboard-responsive="true"] section,
[data-wn-dashboard-responsive="true"] header,
[data-wn-dashboard-responsive="true"] footer,
[data-wn-dashboard-responsive="true"] figure,
[data-wn-dashboard-responsive="true"] fieldset {
    min-width: 0;
    max-width: 100%;
}

[data-wn-dashboard-responsive="true"] h1,
[data-wn-dashboard-responsive="true"] h2,
[data-wn-dashboard-responsive="true"] h3,
[data-wn-dashboard-responsive="true"] h4,
[data-wn-dashboard-responsive="true"] p,
[data-wn-dashboard-responsive="true"] li,
[data-wn-dashboard-responsive="true"] label {
    overflow-wrap: anywhere;
    word-break: normal;
}

[data-wn-dashboard-responsive="true"] img,
[data-wn-dashboard-responsive="true"] video,
[data-wn-dashboard-responsive="true"] canvas {
    max-width: 100%;
    height: auto;
}

[data-wn-dashboard-responsive="true"] svg {
    max-width: 100%;
    flex-shrink: 0;
}

[data-wn-dashboard-responsive="true"] svg[viewBox] {
    height: auto;
}

[data-wn-dashboard-responsive="true"] input,
[data-wn-dashboard-responsive="true"] select,
[data-wn-dashboard-responsive="true"] textarea {
    min-width: 0;
    max-width: 100%;
    font-family: inherit;
}

[data-wn-dashboard-responsive="true"] button,
[data-wn-dashboard-responsive="true"] a[role="button"] {
    min-width: 0;
    max-width: 100%;
    white-space: normal;
    overflow-wrap: anywhere;
    touch-action: manipulation;
}

[data-wn-dashboard-responsive="true"] button:focus-visible,
[data-wn-dashboard-responsive="true"] a:focus-visible,
[data-wn-dashboard-responsive="true"] input:focus-visible,
[data-wn-dashboard-responsive="true"] select:focus-visible,
[data-wn-dashboard-responsive="true"] textarea:focus-visible {
    outline: 3px solid #a78bfa;
    outline-offset: 3px;
}

[data-wn-dashboard-responsive="true"] [hidden] {
    display: none !important;
}

[data-wn-dashboard-responsive="true"] pre {
    max-width: 100%;
    overflow-x: auto;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
}

[data-wn-dashboard-responsive="true"] .wn-responsive-table {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    -webkit-overflow-scrolling: touch;
}

[data-wn-dashboard-responsive="true"] .wn-responsive-table table {
    width: 100%;
    border-collapse: collapse;
}

[data-wn-dashboard-responsive="true"] .wn-responsive-table th,
[data-wn-dashboard-responsive="true"] .wn-responsive-table td {
    overflow-wrap: anywhere;
}

[data-wn-dashboard-responsive="true"] .wn-responsive-grid {
    display: grid;
    grid-template-columns:
        repeat(
            auto-fit,
            minmax(min(100%, 220px), 1fr)
        );
    gap: 16px;
    min-width: 0;
    max-width: 100%;
}

[data-wn-dashboard-responsive="true"] .wn-responsive-grid > * {
    min-width: 0;
    max-width: 100%;
}

[data-wn-dashboard-responsive="true"] .wn-responsive-flex {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    min-width: 0;
    max-width: 100%;
}

[data-wn-dashboard-responsive="true"] .wn-responsive-flex > * {
    min-width: 0;
    max-width: 100%;
}

[data-wn-dashboard-responsive="true"] .wn-responsive-chart {
    width: 100%;
    min-width: 0;
    max-width: 100%;
}

[data-wn-dashboard-responsive="true"] .wn-responsive-chart svg {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
}

#wnCareerInsights .wnci-grid,
#wnCareerInsights .wnci-metrics,
#wnCareerInsights .wnci-header,
#wnCareerInsights .wnci-card,
#wnCareerInsights .wnci-footer {
    min-width: 0;
    max-width: 100%;
}

#wnCareerInsights .wnci-card-title,
#wnCareerInsights .wnci-description,
#wnCareerInsights .wnci-priority {
    overflow-wrap: anywhere;
}

@media (max-width: 899px) {

    [data-wn-dashboard-responsive="true"] .wn-responsive-grid {
        gap: 12px;
    }

    [data-wn-dashboard-responsive="true"] .wn-responsive-flex {
        gap: 10px;
    }
}

@media (max-width: 599px) {

    [data-wn-dashboard-responsive="true"] {
        scroll-margin-top: 76px;
    }

    [data-wn-dashboard-responsive="true"] .wn-responsive-grid {
        grid-template-columns:
            minmax(0, 1fr);
        gap: 12px;
    }

    [data-wn-dashboard-responsive="true"] .wn-responsive-flex {
        align-items: stretch;
    }

    [data-wn-dashboard-responsive="true"] .wn-responsive-flex > * {
        max-width: 100%;
    }

    [data-wn-dashboard-responsive="true"] input:not([type="checkbox"]):not([type="radio"]):not([type="range"]),
    [data-wn-dashboard-responsive="true"] select,
    [data-wn-dashboard-responsive="true"] textarea {
        font-size: 16px;
    }

    [data-wn-dashboard-responsive="true"] button,
    [data-wn-dashboard-responsive="true"] a[role="button"] {
        min-height: 44px;
    }

    #wnCareerInsights .wnci-header {
        padding: 16px;
        gap: 12px;
    }

    #wnCareerInsights .wnci-header-symbol {
        width: 40px;
        height: 40px;
        font-size: 22px;
    }

    #wnCareerInsights .wnci-grid {
        grid-template-columns:
            minmax(0, 1fr);
    }

    #wnCareerInsights .wnci-metrics {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }

    #wnCareerInsights .wnci-metric:last-child {
        grid-column: 1 / -1;
    }

    #wnCareerInsights .wnci-card {
        padding: 16px;
    }

    #wnCareerInsights .wnci-action {
        width: 100%;
    }
}

@media (max-width: 359px) {

    #wnCareerInsights .wnci-metrics {
        grid-template-columns:
            minmax(0, 1fr);
    }

    #wnCareerInsights .wnci-header {
        padding: 12px;
    }

    #wnCareerInsights .wnci-card {
        padding: 12px;
    }

    #wnCareerInsights .wnci-heading {
        font-size: 20px;
    }
}

@media (pointer: coarse) {

    [data-wn-dashboard-responsive="true"] button,
    [data-wn-dashboard-responsive="true"] a[role="button"] {
        min-height: 44px;
    }
}

@media (prefers-reduced-motion: reduce) {

    [data-wn-dashboard-responsive="true"],
    [data-wn-dashboard-responsive="true"] * {
        scroll-behavior: auto !important;
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: .01ms !important;
    }
}

@media print {

    #professional-dashboard,
    [data-wn-dashboard-responsive="true"],
    [data-wn-dashboard-mount="true"] {
        display: none !important;
    }
}
`;

        document.head.appendChild(style);

        return true;
    }

    function prepareRoots(layout) {
        const roots = getRoots();
        const mounts = getMounts();

        roots.forEach(function (root) {
            root.setAttribute(
                "data-wn-dashboard-responsive",
                "true"
            );

            root.setAttribute(
                "data-wn-layout",
                layout.device
            );
        });

        mounts.forEach(function (mount) {
            mount.setAttribute(
                "data-wn-dashboard-mount",
                "true"
            );
        });

        const workspace = getWorkspace();

        if (workspace) {
            workspace.setAttribute(
                "data-wn-layout",
                layout.device
            );
        }

        return roots;
    }

    function observeRoots(roots) {
        if (
            typeof ResizeObserver !== "function"
        ) {
            return;
        }

        if (!resizeObserver) {
            resizeObserver =
                new ResizeObserver(
                    scheduleRefresh
                );
        }

        observedRoots.forEach(
            function (element) {
                if (
                    !element.isConnected ||
                    !roots.includes(element)
                ) {
                    resizeObserver.unobserve(
                        element
                    );

                    observedRoots.delete(
                        element
                    );
                }
            }
        );

        roots.forEach(function (root) {
            if (!observedRoots.has(root)) {
                observedRoots.add(root);

                resizeObserver.observe(root);
            }
        });
    }

    function refresh() {
        if (suspended) {
            return false;
        }

        installStyles();

        const layout = getLayout();

        const roots = prepareRoots(layout);

        observeRoots(roots);

        const layoutChanged =
            !lastLayout ||
            lastLayout.width !== layout.width ||
            lastLayout.height !== layout.height ||
            lastLayout.device !== layout.device ||
            lastLayout.orientation !==
                layout.orientation;

        lastLayout = layout;

        if (layoutChanged) {
            document.dispatchEvent(
                new CustomEvent(
                    "worknely:dashboardlayoutchange",
                    {
                        detail: {
                            version: VERSION,
                            width: layout.width,
                            height: layout.height,
                            device: layout.device,
                            orientation:
                                layout.orientation
                        }
                    }
                )
            );
        }

        return roots.length > 0;
    }

    function scheduleRefresh() {
        if (
            suspended ||
            scheduled
        ) {
            return;
        }

        scheduled = true;

        const ticket = generation;

        frameId = window.requestAnimationFrame(
            function () {
                frameId = null;
                scheduled = false;

                if (
                    suspended ||
                    ticket !== generation
                ) {
                    return;
                }

                refresh();
            }
        );
    }

    function isIntentionalScroll(element) {
        let current = element;

        while (
            current &&
            current !== document.body
        ) {
            const style =
                window.getComputedStyle(current);

            if (
                (
                    style.overflowX === "auto" ||
                    style.overflowX === "scroll"
                ) &&
                current.scrollWidth >
                    current.clientWidth + TOLERANCE
            ) {
                const rect =
                    current.getBoundingClientRect();

                const viewport =
                    getViewportWidth();

                if (
                    rect.left >= -TOLERANCE &&
                    rect.right <=
                        viewport + TOLERANCE
                ) {
                    return true;
                }
            }

            current = current.parentElement;
        }

        return false;
    }

    function describeElement(element) {
        const tag =
            element.tagName.toLowerCase();

        const id =
            element.id
                ? "#" + element.id
                : "";

        const classes =
            typeof element.className === "string"
                ? element.className
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 3)
                    .map(function (name) {
                        return "." + name;
                    })
                    .join("")
                : "";

        return (
            tag + id + classes
        ).slice(0, 180);
    }

    function round(value) {
        return Math.round(value * 100) / 100;
    }

    function inspectRoot(root, viewport) {
        if (!isVisible(root)) {
            return {
                id: root.id,
                visible: false,
                width: null,
                scrollWidth: null,
                horizontalOverflow: null,
                offenders: [],
                smallTouchTargets: []
            };
        }

        const rect =
            root.getBoundingClientRect();

        const offenders = [];

        const elements = [
            root,
            ...root.querySelectorAll("*")
        ];

        elements.forEach(function (element) {
            if (
                offenders.length >= 30 ||
                !isVisible(element)
            ) {
                return;
            }

            if (
                element instanceof SVGElement
            ) {
                return;
            }

            const bounds =
                element.getBoundingClientRect();

            const outsideViewport =
                bounds.right >
                    viewport + TOLERANCE ||
                bounds.left < -TOLERANCE;

            const outsideRoot =
                bounds.right >
                    rect.right + TOLERANCE ||
                bounds.left <
                    rect.left - TOLERANCE;

            if (
                !outsideViewport &&
                !outsideRoot
            ) {
                return;
            }

            if (
                isIntentionalScroll(element)
            ) {
                return;
            }

            offenders.push({
                element:
                    describeElement(element),

                width:
                    round(bounds.width),

                left:
                    round(bounds.left),

                right:
                    round(bounds.right),

                outsideViewport:
                    outsideViewport,

                outsideRoot:
                    outsideRoot
            });
        });

        const smallTouchTargets = [];

        root.querySelectorAll(
            'button, a[role="button"], select, input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="range"])'
        ).forEach(function (element) {
            if (
                smallTouchTargets.length >= 30 ||
                !isVisible(element) ||
                element.disabled
            ) {
                return;
            }

            const bounds =
                element.getBoundingClientRect();

            if (
                bounds.height < 44 ||
                bounds.width < 44
            ) {
                smallTouchTargets.push({
                    element:
                        describeElement(element),

                    width:
                        round(bounds.width),

                    height:
                        round(bounds.height)
                });
            }
        });

        return {
            id: root.id,
            visible: true,

            width:
                round(rect.width),

            scrollWidth:
                root.scrollWidth,

            horizontalOverflow:
                root.scrollWidth >
                    root.clientWidth + TOLERANCE ||
                rect.right >
                    viewport + TOLERANCE ||
                rect.left < -TOLERANCE ||
                offenders.length > 0,

            offenders: offenders,

            smallTouchTargets:
                smallTouchTargets
        };
    }

    function inspect() {
        const layout = getLayout();

        const documentWidth = Math.max(
            document.documentElement.scrollWidth,
            document.body?.scrollWidth || 0
        );

        const roots = getRoots().map(
            function (root) {
                return inspectRoot(
                    root,
                    layout.width
                );
            }
        );

        const visibleRoots = roots.filter(
            function (root) {
                return root.visible;
            }
        );

        const modules = MODULES.map(
            function (module) {
                return {
                    name: module.name,

                    available:
                        Boolean(
                            window[module.global]
                        ),

                    version:
                        window[module.global]
                            ?.version || null,

                    mounted:
                        Boolean(
                            document.getElementById(
                                module.root
                            )
                        )
                };
            }
        );

        const overflowCount =
            visibleRoots.filter(
                function (root) {
                    return root.horizontalOverflow;
                }
            ).length;

        const touchTargetWarnings =
            visibleRoots.reduce(
                function (total, root) {
                    return total +
                        root.smallTouchTargets.length;
                },
                0
            );

        const documentOverflow =
            documentWidth >
                layout.width + TOLERANCE;

        const complete =
            visibleRoots.length ===
                ROOT_IDS.length;

        return {
            version: VERSION,

            viewportWidth:
                layout.width,

            viewportHeight:
                layout.height,

            documentWidth:
                documentWidth,

            device:
                layout.device,

            orientation:
                layout.orientation,

            touch:
                layout.touch,

            reducedMotion:
                layout.reducedMotion,

            documentHorizontalOverflow:
                documentOverflow,

            dashboardHorizontalOverflow:
                visibleRoots.length
                    ? overflowCount > 0
                    : null,

            visibleModules:
                visibleRoots.length,

            expectedModules:
                ROOT_IDS.length,

            overflowModules:
                overflowCount,

            touchTargetWarnings:
                touchTargetWarnings,

            modules:
                modules,

            roots:
                roots,

            stylesInstalled:
                Boolean(
                    document.getElementById(
                        STYLE_ID
                    )
                ),

            resizeObserverAvailable:
                typeof ResizeObserver ===
                    "function",

            complete:
                complete,

            passed:
                complete &&
                !documentOverflow &&
                overflowCount === 0,

            touchTargetAuditPassed:
                complete
                    ? touchTargetWarnings === 0
                    : null,

            inspectedAt:
                new Date().toISOString()
        };
    }

    function selfTest() {
        const cases = [
            [320, "compact"],
            [359, "compact"],
            [360, "mobile"],
            [375, "mobile"],
            [390, "mobile"],
            [430, "mobile"],
            [599, "mobile"],
            [600, "tablet"],
            [768, "tablet"],
            [899, "tablet"],
            [900, "laptop"],
            [1024, "laptop"],
            [1199, "laptop"],
            [1200, "desktop"],
            [1440, "desktop"],
            [1920, "desktop"],
            [2560, "desktop"],
            [0, "unknown"],
            [-100, "unknown"],
            [NaN, "unknown"]
        ];

        const checks = cases.map(
            function (item) {
                const actual =
                    classify(item[0]);

                return {
                    name:
                        "Viewport " +
                        String(item[0]),

                    expected:
                        item[1],

                    actual:
                        actual,

                    pass:
                        actual === item[1]
                };
            }
        );

        checks.push({
            name:
                "Four dashboard modules",

            pass:
                ROOT_IDS.length === 4
        });

        checks.push({
            name:
                "Four unique module roots",

            pass:
                new Set(ROOT_IDS).size ===
                    ROOT_IDS.length
        });

        checks.push({
            name:
                "Four unique mount points",

            pass:
                new Set(MOUNT_IDS).size ===
                    MOUNT_IDS.length
        });

        checks.push({
            name:
                "Ordered breakpoints",

            pass:
                BREAKPOINTS.compact <
                    BREAKPOINTS.mobile &&
                BREAKPOINTS.mobile <
                    BREAKPOINTS.tablet &&
                BREAKPOINTS.tablet <
                    BREAKPOINTS.laptop
        });

        const passed = checks.filter(
            function (check) {
                return check.pass;
            }
        ).length;

        return {
            version: VERSION,

            passed:
                passed,

            total:
                checks.length,

            ok:
                passed === checks.length,

            checks:
                checks,

            browserLayoutTested:
                false
        };
    }

    function suspend() {
        suspended = true;
        generation++;

        if (frameId !== null) {
            window.cancelAnimationFrame(
                frameId
            );

            frameId = null;
        }

        scheduled = false;

        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
        }

        observedRoots.clear();

        lastLayout = null;
    }

    function resume() {
        suspended = false;

        scheduleRefresh();
    }

    function installListeners() {
        if (initialized) {
            return;
        }

        initialized = true;

        [
            "worknely:unifiedcareerready",
            "worknely:unifiedcareerchange",
            "worknely:professionaldashboardready",
            "worknely:careerperformanceready",
            "worknely:careeractionsready",
            "worknely:careerinsightsready",
            "worknely:dashboardlocalizationready",
            "worknely:dashboardlocalizationchange",
            "worknely:workspacechange",
            "worknely:languagechange",
            "worknely:localizationready"
        ].forEach(function (eventName) {
            document.addEventListener(
                eventName,
                scheduleRefresh
            );
        });

        window.addEventListener(
            "resize",
            scheduleRefresh,
            { passive: true }
        );

        window.addEventListener(
            "orientationchange",
            scheduleRefresh,
            { passive: true }
        );

        if (window.visualViewport) {
            window.visualViewport.addEventListener(
                "resize",
                scheduleRefresh,
                { passive: true }
            );
        }

        document.addEventListener(
            "visibilitychange",
            function () {
                if (
                    document.visibilityState ===
                    "visible"
                ) {
                    scheduleRefresh();
                }
            }
        );

        document.addEventListener(
            "change",
            function (event) {
                if (
                    event.target?.id ===
                        "language"
                ) {
                    scheduleRefresh();
                }
            }
        );

        window.addEventListener(
            "pagehide",
            suspend
        );

        window.addEventListener(
            "pageshow",
            resume
        );
    }

    function initialize() {
        if (suspended) {
            return false;
        }

        installListeners();

        installStyles();

        scheduleRefresh();

        return true;
    }

    window.WorknelyDashboardResponsive =
        Object.freeze({
            version: VERSION,

            breakpoints:
                BREAKPOINTS,

            classify:
                classify,

            getLayout:
                getLayout,

            initialize:
                initialize,

            refresh:
                refresh,

            inspect:
                inspect,

            selfTest:
                selfTest,

            getState: function () {
                return {
                    version: VERSION,

                    initialized:
                        initialized,

                    suspended:
                        suspended,

                    layout:
                        getLayout(),

                    mountedModules:
                        getRoots().length,

                    expectedModules:
                        ROOT_IDS.length,

                    stylesInstalled:
                        Boolean(
                            document.getElementById(
                                STYLE_ID
                            )
                        ),

                    scopedStyles:
                        true,

                    globalOverflowHidden:
                        false,

                    databaseQueries:
                        false,

                    localDataStorage:
                        false,

                    externalDependencies:
                        false
                };
            }
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
            "worknely:dashboardresponsiveready",
            {
                detail: {
                    version: VERSION
                }
            }
        )
    );

})();
