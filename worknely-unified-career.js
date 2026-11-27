
(function () {
    "use strict";

    const VERSION = "7.20.1";
    const EVENT = "worknely:unifiedcareerchange";

    let client = null;
    let subscription = null;
    let owner = null;
    let snapshot = null;
    let generation = 0;
    let loading = false;
    let recovery = false;
    let lastError = null;
    let scheduled = false;
    let suspended = false;

    function publish() {
        document.dispatchEvent(
            new CustomEvent(EVENT, {
                detail: {
                    version: VERSION,
                    available: Boolean(snapshot),
                    loading: loading
                }
            })
        );
    }

    function clear() {
        generation++;
        snapshot = null;
        loading = false;
        lastError = null;
        publish();
    }

    function getClient() {
        const instance = window.worknelySupabase;

        if (
            !instance ||
            typeof instance.auth?.getUser !== "function" ||
            typeof instance.from !== "function"
        ) {
            return null;
        }

        return instance;
    }

    function safeNumber(value) {
        if (
            value === null ||
            value === undefined ||
            value === "" ||
            typeof value === "boolean"
        ) {
            return null;
        }

        const number = Number(value);

        return Number.isFinite(number) &&
            number >= 0 &&
            number <= 100
            ? Math.round(number * 100) / 100
            : null;
    }

    function safeCount(value) {
        return Number.isSafeInteger(value) &&
            value >= 0
            ? value
            : null;
    }

    function safeText(value, max = 200) {
        return typeof value === "string"
            ? value.trim().slice(0, max)
            : "";
    }

    function safeDate(value) {
        if (!value) return null;

        const date = new Date(value);

        return Number.isFinite(date.getTime())
            ? date.toISOString()
            : null;
    }

    function scheduleRefresh() {
        if (scheduled || recovery || suspended) {
            return;
        }

        scheduled = true;

        setTimeout(function () {
            scheduled = false;

            if (!recovery && !suspended && owner) {
                refresh();
            }
        }, 0);
    }

    function bindAuthentication() {
        const next = getClient();

        if (!next) {
            if (client) {
                subscription?.unsubscribe?.();
                subscription = null;
                client = null;
                owner = null;
                recovery = false;
                clear();
            }

            return false;
        }

        if (client === next && subscription) {
            return true;
        }

        subscription?.unsubscribe?.();

        client = next;
        owner = null;
        recovery = false;

        clear();

        const response = client.auth.onAuthStateChange(
            function (event, session) {
                if (client !== next) return;

                const nextOwner = session?.user?.id || null;
                const changed = nextOwner !== owner;

                if (event === "PASSWORD_RECOVERY") {
                    recovery = true;
                    owner = nextOwner;
                    clear();
                    return;
                }

                if (event === "SIGNED_OUT") {
                    recovery = false;
                    owner = null;
                    clear();
                    return;
                }

                if (changed) {
                    owner = nextOwner;
                    clear();
                }

                if (
                    owner &&
                    !recovery &&
                    (
                        changed ||
                        event === "INITIAL_SESSION" ||
                        event === "SIGNED_IN"
                    )
                ) {
                    scheduleRefresh();
                }
            }
        );

        subscription = response?.data?.subscription || null;

        return Boolean(subscription);
    }

    async function verifyIdentity(
        instance,
        userId,
        ticket
    ) {
        if (
            ticket !== generation ||
            recovery ||
            suspended ||
            instance !== client ||
            owner !== userId
        ) {
            throw new Error("STALE_CONTEXT");
        }

        const response = await instance.auth.getUser();

        if (
            response.error ||
            response.data?.user?.id !== userId ||
            ticket !== generation ||
            recovery ||
            suspended ||
            instance !== client ||
            owner !== userId
        ) {
            throw new Error("STALE_CONTEXT");
        }
    }

    async function loadResumeCount(instance, userId) {
        const response = await instance
            .from("resumes")
            .select("id", {
                count: "exact",
                head: true
            })
            .eq("user_id", userId);

        if (response.error) {
            throw new Error("RESUME_DATA_UNAVAILABLE");
        }

        return safeCount(response.count);
    }

    async function loadCareerData(instance, userId) {
        const response = await instance
            .from("career_analyses")
            .select(
                "analysis_type,score,created_at,engine_version"
            )
            .eq("user_id", userId)
            .order("created_at", {
                ascending: false
            })
            .order("id", {
                ascending: false
            })
            .limit(100);

        if (response.error) {
            throw new Error("CAREER_DATA_UNAVAILABLE");
        }

        const records = Array.isArray(response.data)
            ? response.data
            : [];

        function latest(type) {
            const record = records.find(function (item) {
                return item.analysis_type === type &&
                    safeNumber(item.score) !== null;
            });

            return record
                ? {
                    score: safeNumber(record.score),
                    date: safeDate(record.created_at),
                    engineVersion: safeText(
                        record.engine_version,
                        40
                    )
                }
                : null;
        }

        const atsHistory = records
            .filter(function (record) {
                return record.analysis_type === "ats" &&
                    safeNumber(record.score) !== null &&
                    safeDate(record.created_at);
            })
            .map(function (record) {
                return {
                    score: safeNumber(record.score),
                    date: safeDate(record.created_at),
                    engineVersion: safeText(
                        record.engine_version,
                        40
                    )
                };
            })
            .reverse();

        const types = new Set(
            records.map(function (record) {
                return record.analysis_type;
            })
        );

        return {
            latestATS: latest("ats"),
            careerMatch: latest("career-match"),
            skillCoverage: latest("skill-gap"),
            careerPlan: latest("career-action-plan"),
            savedAnalysesInWindow: records.length,
            completedModulesInWindow: types.size,
            historyLimit: 100,
            historyLimitReached: records.length === 100,
            atsHistory: atsHistory
        };
    }

    async function loadJobStatistics(userId) {
        const engine = window.WorknelyJobStorage;

        if (
            !engine ||
            typeof engine.getStatistics !== "function"
        ) {
            throw new Error("JOB_ENGINE_UNAVAILABLE");
        }

        const data = await engine.getStatistics({
            expectedUserId: userId
        });

        return {
            total: safeCount(data.total),
            active: safeCount(data.active),
            interviews: safeCount(data.interviews),
            offers: safeCount(data.offers),
            accepted: safeCount(data.accepted),
            rejected: safeCount(data.rejected)
        };
    }

    async function loadEvents(instance, userId) {
        const now = new Date().toISOString();

        const activeStatuses = [
            "applied",
            "screening",
            "interview",
            "assessment",
            "offer"
        ];

        const fields = [
            "id",
            "company",
            "job_title",
            "interview_at",
            "follow_up_at"
        ].join(",");

        const responses = await Promise.all([
            instance
                .from("job_applications")
                .select(fields)
                .eq("user_id", userId)
                .in("status", activeStatuses)
                .gte("interview_at", now)
                .order("interview_at", {
                    ascending: true
                })
                .limit(10),

            instance
                .from("job_applications")
                .select(fields)
                .eq("user_id", userId)
                .in("status", activeStatuses)
                .gte("follow_up_at", now)
                .order("follow_up_at", {
                    ascending: true
                })
                .limit(10)
        ]);

        if (responses.some(function (item) {
            return Boolean(item.error);
        })) {
            throw new Error("EVENT_DATA_UNAVAILABLE");
        }

        const events = [];

        responses.forEach(function (response, index) {
            const records = Array.isArray(response.data)
                ? response.data
                : [];

            records.forEach(function (record) {
                const type = index === 0
                    ? "interview"
                    : "follow-up";

                const date = safeDate(
                    index === 0
                        ? record.interview_at
                        : record.follow_up_at
                );

                if (!date) return;

                events.push({
                    id: safeText(record.id, 64),
                    type: type,
                    company: safeText(record.company),
                    title: safeText(record.job_title),
                    date: date
                });
            });
        });

        return events
            .sort(function (a, b) {
                return Date.parse(a.date) -
                    Date.parse(b.date);
            })
            .slice(0, 10);
    }

    async function refresh() {
        if (
            suspended ||
            !bindAuthentication() ||
            recovery
        ) {
            return null;
        }

        const instance = client;
        const ticket = ++generation;

        snapshot = null;
        loading = true;
        lastError = null;

        publish();

        try {
            const response = await instance.auth.getUser();

            if (
                ticket !== generation ||
                instance !== client ||
                recovery ||
                suspended
            ) {
                return null;
            }

            if (response.error || !response.data?.user) {
                owner = null;
                return null;
            }

            const userId = response.data.user.id;

            if (owner && owner !== userId) {
                clear();
                return null;
            }

            owner = userId;

            await verifyIdentity(
                instance,
                userId,
                ticket
            );

            const results = await Promise.allSettled([
                loadResumeCount(instance, userId),
                loadCareerData(instance, userId),
                loadJobStatistics(userId),
                loadEvents(instance, userId)
            ]);

            await verifyIdentity(
                instance,
                userId,
                ticket
            );

            const names = [
                "resumes",
                "career",
                "jobs",
                "events"
            ];

            const sources = {};

            results.forEach(function (result, index) {
                sources[names[index]] =
                    result.status === "fulfilled"
                        ? "available"
                        : "unavailable";
            });

            function value(index) {
                return results[index].status === "fulfilled"
                    ? results[index].value
                    : null;
            }

            snapshot = {
                version: VERSION,
                generatedAt: new Date().toISOString(),
                resumeCount: value(0),
                career: value(1),
                applications: value(2),
                upcomingEvents: value(3),
                sources: sources,
                partial: results.some(function (result) {
                    return result.status === "rejected";
                }),
                estimatedScores: true,
                automaticSaving: false
            };

            if (results.every(function (result) {
                return result.status === "rejected";
            })) {
                lastError = "DATA_UNAVAILABLE";
            }

            return getSnapshot();

        } catch (error) {
            if (ticket === generation) {
                snapshot = null;

                lastError = error?.message === "STALE_CONTEXT"
                    ? "STALE_CONTEXT"
                    : "UNIFIED_DATA_UNAVAILABLE";
            }

            return null;

        } finally {
            if (ticket === generation) {
                loading = false;
                publish();
            }
        }
    }

    function getSnapshot() {
        if (
            !snapshot ||
            !owner ||
            recovery ||
            suspended
        ) {
            return null;
        }

        return JSON.parse(
            JSON.stringify(snapshot)
        );
    }

    function getState() {
        return {
            version: VERSION,
            authenticated: Boolean(owner) && !recovery,
            available: Boolean(snapshot) && !suspended,
            loading: loading,
            recoveryMode: recovery,
            error: lastError,
            readOnly: true,
            automaticSaving: false,
            localDataStorage: false
        };
    }

    function handleDataChange(event) {
        if (
            owner &&
            event.detail?.userId === owner
        ) {
            clear();
            scheduleRefresh();
        }
    }

    function initialize() {
        if (
            !suspended &&
            bindAuthentication() &&
            owner &&
            !loading &&
            !snapshot
        ) {
            scheduleRefresh();
        }
    }

    document.addEventListener(
        "worknely:careerhistorychange",
        handleDataChange
    );

    document.addEventListener(
        "worknely:jobapplicationschange",
        handleDataChange
    );

    document.addEventListener(
        "worknely:workspacechange",
        initialize
    );

    window.addEventListener("pagehide", function () {
        suspended = true;
        clear();
    });

    window.addEventListener("pageshow", function () {
        suspended = false;
        initialize();
    });

    window.WorknelyUnifiedCareer = Object.freeze({
        version: VERSION,
        refresh: refresh,
        clear: clear,
        getSnapshot: getSnapshot,
        getState: getState,
        bindAuthentication: bindAuthentication
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
            "worknely:unifiedcareerready",
            {
                detail: {
                    version: VERSION
                }
            }
        )
    );

})();
