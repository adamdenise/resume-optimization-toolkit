
/*
 * WORKNELY V7.16.6
 * Supabase Template Persistence Engine
 *
 * Individual Resume Design Persistence
 * Template and Accent Color Serialization
 * Document Language Persistence
 * Paper Format Persistence
 * Backward Compatibility
 * Authenticated Ownership Verification
 * Supabase RLS Compatibility
 *
 * No additional dependencies.
 */

(() => {

  "use strict";

  const VERSION = "7.16.6";

  const DESIGN_VERSION = 1;

  const TABLE = "resumes";

  const TEMPLATE_IDS = Object.freeze([

    "ats",

    "classic",

    "executive",

    "modern",

    "creative"

  ]);

  const LANGUAGES = Object.freeze([

    "en", "ro", "it", "de", "fr", "es"

  ]);

  const PAPER_FORMATS = Object.freeze([

    "a4",

    "letter"

  ]);

  const DEFAULT_COLORS = Object.freeze({

    ats:"#242424",

    classic:"#343434",

    executive:"#172b45",

    modern:"#5424ff",

    creative:"#ec22ad"

  });

  const DEFAULT_DESIGN = Object.freeze({

    version:DESIGN_VERSION,

    templateId:"ats",

    accentColor:"#242424",

    customColor:null,

    documentLanguage:null,

    paperFormat:"a4"

  });

  let activeResumeId = null;

  let activeOwnerId = null;

  let sessionGeneration = 0;

  let busy = false;

  let restoring = false;

  let boundClient = null;

  let authSubscription = null;

  /* ENGINE ACCESS */

  function getEngine() {

    return window.WorknelyTemplates || null;

  }

  function getPreview() {

    return window.WorknelyLivePreview || null;

  }

  function getPDFEngine() {

    return window.WorknelyPDFExport || null;

  }

  function getClient() {

    return window.worknelySupabase || null;

  }

  /* VALIDATION */

  function normalizeTemplate(value) {

    return TEMPLATE_IDS.includes(value)

      ? value

      : "ats";

  }

  function normalizeColor(value) {

    if (typeof value !== "string") {

      return null;

    }

    const color = value.trim().toLowerCase();

    return /^#[0-9a-f]{6}$/.test(color)

      ? color

      : null;

  }

  function normalizeLanguage(value) {

    if (typeof value !== "string") {

      return null;

    }

    const language = value

      .toLowerCase()

      .split("-")[0];

    return LANGUAGES.includes(language)

      ? language

      : null;

  }

  function normalizePaperFormat(value) {

    return PAPER_FORMATS.includes(value)

      ? value

      : "a4";

  }

  function normalizeResumeId(value) {

    if (typeof value !== "string") {

      return null;

    }

    const id = value.trim().toLowerCase();

    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)

      ? id

      : null;

  }

  function getDefaultColor(templateId) {

    return normalizeColor(

      getEngine()?.getTemplate?.(templateId)?.accent

    ) ||

    DEFAULT_COLORS[templateId] ||

    "#242424";

  }

  /* DESIGN NORMALIZATION */

  function normalizeDesign(value) {

    const source =

      value &&

      typeof value === "object" &&

      !Array.isArray(value)

        ? value

        : {};

    const templateId = normalizeTemplate(

      source.templateId

    );

    const defaultColor = getDefaultColor(

      templateId

    );

    let customColor = normalizeColor(

      source.customColor

    );

    /*
     * Support older designs containing
     * only an accentColor property.
     */

    if (

      !Object.prototype.hasOwnProperty.call(

        source,

        "customColor"

      )

    ) {

      const legacyColor = normalizeColor(

        source.accentColor

      );

      if (

        legacyColor &&

        legacyColor !== defaultColor

      ) {

        customColor = legacyColor;

      }

    }

    return {

      version:DESIGN_VERSION,

      templateId,

      accentColor:customColor || defaultColor,

      customColor,

      documentLanguage:normalizeLanguage(

        source.documentLanguage

      ),

      paperFormat:normalizePaperFormat(

        source.paperFormat

      )

    };

  }

  /* CAPTURE CURRENT DESIGN */

  function captureDesign() {

    const engine = getEngine();

    const preview = getPreview();

    const pdf = getPDFEngine();

    const state = engine?.getState?.() || {};

    const pdfState = pdf?.getState?.() || {};

    const documentLanguage =

      preview?.getDocumentLanguage?.() ||

      pdfState.documentLanguage ||

      window.WorknelyLocalization

        ?.getLanguage?.() ||

      document.documentElement.lang ||

      "en";

    return normalizeDesign({

      templateId:state.templateId,

      accentColor:state.accentColor,

      customColor:state.customColor,

      documentLanguage,

      paperFormat:pdfState.paperFormat

    });

  }

  /* EVENT DISPATCHER */

  function emit(name, detail = {}) {

    document.dispatchEvent(

      new CustomEvent(name, {

        detail:{

          version:VERSION,

          ...detail

        }

      })

    );

  }

  /* RESTORE DESIGN */

  function restoreDesign(value, options = {}) {

    const engine = getEngine();

    if (

      !engine ||

      typeof engine.applyDesign !== "function"

    ) {

      return {

        ok:false,

        reason:"engine-unavailable"

      };

    }

    const design = normalizeDesign(value);

    restoring = true;

    try {

      /*
       * Pass customColor only.
       * A null value restores the default
       * accent without changing the template.
       */

      engine.applyDesign({

        templateId:design.templateId,

        customColor:design.customColor

      }, {

        persist:options.persist !== false

      });

      const preview = getPreview();

      const pdf = getPDFEngine();

      let languageApplied =

        design.documentLanguage === null;

      let paperFormatApplied = false;

      if (

        design.documentLanguage &&

        typeof preview?.setDocumentLanguage ===

          "function"

      ) {

        preview.setDocumentLanguage(

          design.documentLanguage

        );

        languageApplied =

          preview.getDocumentLanguage?.() ===

          design.documentLanguage;

      }

      if (

        typeof pdf?.setPaperFormat ===

          "function"

      ) {

        paperFormatApplied =

          pdf.setPaperFormat(

            design.paperFormat

          ) !== false;

      }

      window.WorknelyColorCustomization

        ?.refresh?.();

      pdf?.refresh?.();

      emit("worknely:designrestored", {

        templateId:design.templateId,

        paperFormat:design.paperFormat,

        languageApplied,

        paperFormatApplied

      });

      return {

        ok:true,

        design,

        languageApplied,

        paperFormatApplied

      };

    } catch {

      return {

        ok:false,

        reason:"restore-failed"

      };

    } finally {

      restoring = false;

    }

  }

  /* DEFAULT DESIGN */

  function resetDesign(options = {}) {

    return restoreDesign(

      DEFAULT_DESIGN,

      options

    );

  }

  /* SUPABASE AUTHENTICATION */

  async function getAuthenticatedUser(client) {

    if (!client?.auth?.getUser) {

      return null;

    }

    try {

      const {

        data,

        error

      } = await client.auth.getUser();

      if (error || !data?.user?.id) {

        return null;

      }

      return data.user;

    } catch {

      return null;

    }

  }

  /* CLEAR DOCUMENT CONTEXT */

  function clearContext() {

    activeResumeId = null;

    activeOwnerId = null;

    sessionGeneration += 1;

    emit("worknely:designcontextcleared");

  }

  /* AUTH STATE SYNCHRONIZATION */

  function bindAuthentication() {

    const client = getClient();

    if (!client?.auth?.onAuthStateChange) {

      return false;

    }

    if (boundClient === client) {

      return true;

    }

    authSubscription?.unsubscribe?.();

    if (boundClient && boundClient !== client) {

      clearContext();

    }

    boundClient = client;

    const result = client.auth.onAuthStateChange(

      (event, session) => {

        const userId = session?.user?.id || null;

        if (

          event === "SIGNED_OUT" ||

          (

            activeOwnerId &&

            activeOwnerId !== userId

          )

        ) {

          clearContext();

        }

      }

    );

    authSubscription =

      result?.data?.subscription || null;

    return true;

  }

  /* VERIFY SESSION OWNERSHIP */

  async function verifySession(

    client,

    userId,

    generation

  ) {

    if (

      generation !== sessionGeneration ||

      client !== getClient()

    ) {

      return false;

    }

    const user = await getAuthenticatedUser(

      client

    );

    return Boolean(

      user &&

      user.id === userId &&

      generation === sessionGeneration &&

      client === getClient()

    );

  }

  /* SET ACTIVE DOCUMENT */

  async function setActiveResume(resumeId) {

    const id = normalizeResumeId(resumeId);

    if (!id) {

      return {

        ok:false,

        reason:"invalid-id"

      };

    }

    const client = getClient();

    if (!client) {

      return {

        ok:false,

        reason:"client-unavailable"

      };

    }

    bindAuthentication();

    const generation = sessionGeneration;

    const user = await getAuthenticatedUser(

      client

    );

    if (!user) {

      return {

        ok:false,

        reason:"not-authenticated"

      };

    }

    try {

      const {data,error} = await client

        .from(TABLE)

        .select("id")

        .eq("id",id)

        .eq("user_id",user.id)

        .maybeSingle();

      if (error || !data) {

        return {

          ok:false,

          reason:"not-found-or-denied"

        };

      }

      if (!(await verifySession(

        client,

        user.id,

        generation

      ))) {

        return {

          ok:false,

          reason:"session-changed"

        };

      }

      activeResumeId = id;

      activeOwnerId = user.id;

      return {

        ok:true,

        resumeId:id

      };

    } catch {

      return {

        ok:false,

        reason:"request-failed"

      };

    }

  }

  /* SAVE DESIGN TO SUPABASE */

  async function saveDesign(

    resumeId = activeResumeId,

    value = null

  ) {

    if (busy) {

      return {

        ok:false,

        reason:"busy"

      };

    }

    const id = normalizeResumeId(resumeId);

    if (!id) {

      return {

        ok:false,

        reason:"invalid-id"

      };

    }

    const client = getClient();

    if (!client) {

      return {

        ok:false,

        reason:"client-unavailable"

      };

    }

    if (!value && !getEngine()) {

      return {

        ok:false,

        reason:"engine-unavailable"

      };

    }

    bindAuthentication();

    busy = true;

    const generation = sessionGeneration;

    try {

      const design = value

        ? normalizeDesign(value)

        : captureDesign();

      const user = await getAuthenticatedUser(

        client

      );

      if (!user) {

        return {

          ok:false,

          reason:"not-authenticated"

        };

      }

      if (

        activeOwnerId &&

        activeOwnerId !== user.id

      ) {

        return {

          ok:false,

          reason:"session-changed"

        };

      }

      if (!(await verifySession(

        client,

        user.id,

        generation

      ))) {

        return {

          ok:false,

          reason:"session-changed"

        };

      }

      /*
       * Update only the design column.
       * Never overwrite resume content.
       */

      const {data,error} = await client

        .from(TABLE)

        .update({

          design

        })

        .eq("id",id)

        .eq("user_id",user.id)

        .select("id,design")

        .maybeSingle();

      if (error) {

        return {

          ok:false,

          reason:"save-failed",

          code:error.code || null

        };

      }

      if (!data) {

        return {

          ok:false,

          reason:"not-found-or-denied"

        };

      }

      if (!(await verifySession(

        client,

        user.id,

        generation

      ))) {

        return {

          ok:false,

          reason:"session-changed"

        };

      }

      activeResumeId = id;

      activeOwnerId = user.id;

      emit("worknely:designsaved", {

        resumeId:id,

        templateId:design.templateId

      });

      return {

        ok:true,

        resumeId:id,

        design:normalizeDesign(data.design)

      };

    } catch {

      return {

        ok:false,

        reason:"request-failed"

      };

    } finally {

      busy = false;

    }

  }

  /* LOAD DESIGN FROM SUPABASE */

  async function loadDesign(

    resumeId,

    options = {}

  ) {

    if (busy) {

      return {

        ok:false,

        reason:"busy"

      };

    }

    const id = normalizeResumeId(resumeId);

    if (!id) {

      return {

        ok:false,

        reason:"invalid-id"

      };

    }

    const client = getClient();

    if (!client) {

      return {

        ok:false,

        reason:"client-unavailable"

      };

    }

    bindAuthentication();

    busy = true;

    const generation = sessionGeneration;

    try {

      const user = await getAuthenticatedUser(

        client

      );

      if (!user) {

        return {

          ok:false,

          reason:"not-authenticated"

        };

      }

      const {data,error} = await client

        .from(TABLE)

        .select("id,design")

        .eq("id",id)

        .eq("user_id",user.id)

        .maybeSingle();

      if (error) {

        return {

          ok:false,

          reason:"load-failed",

          code:error.code || null

        };

      }

      if (!data) {

        return {

          ok:false,

          reason:"not-found-or-denied"

        };

      }

      if (!(await verifySession(

        client,

        user.id,

        generation

      ))) {

        return {

          ok:false,

          reason:"session-changed"

        };

      }

      const design = normalizeDesign(

        data.design

      );

      let restoration = null;

      if (options.restore !== false) {

        restoration = restoreDesign(

          design,

          {

            persist:options.persist !== false

          }

        );

        if (!restoration.ok) {

          return {

            ok:false,

            reason:restoration.reason,

            design

          };

        }

      }

      activeResumeId = id;

      activeOwnerId = user.id;

      emit("worknely:designloaded", {

        resumeId:id,

        templateId:design.templateId

      });

      return {

        ok:true,

        resumeId:id,

        design,

        restoration

      };

    } catch {

      return {

        ok:false,

        reason:"request-failed"

      };

    } finally {

      busy = false;

    }

  }

  /* PREPARE ATOMIC RESUME SAVE */

  function attachDesign(payload = {}) {

    if (!getEngine()) {

      throw new Error(

        "Worknely template engine unavailable"

      );

    }

    return {

      ...payload,

      design:captureDesign()

    };

  }

  /* PREPARE DOCUMENT DUPLICATION */

  function copyDesign(value) {

    return normalizeDesign(value);

  }

  /* PREPARE NEW RESUME */

  function startNewResume(options = {}) {

    clearContext();

    if (options.reset !== false) {

      return resetDesign();

    }

    return {

      ok:true

    };

  }

  /* PUBLIC PERSISTENCE API */

  window.WorknelyTemplatePersistence =

    Object.freeze({

      version:VERSION,

      designVersion:DESIGN_VERSION,

      defaultDesign:DEFAULT_DESIGN,

      normalizeDesign,

      captureDesign,

      restoreDesign,

      resetDesign,

      attachDesign,

      copyDesign,

      saveDesign,

      loadDesign,

      setActiveResume,

      startNewResume,

      clearContext,

      bindAuthentication,

      getState:() => ({

        version:VERSION,

        activeResumeId,

        busy,

        restoring,

        authenticatedContext:

          Boolean(activeOwnerId),

        design:captureDesign()

      })

    });

  /* INITIALIZATION */

  function initialize() {

    bindAuthentication();

    emit("worknely:templatepersistenceready");

    console.info(

      "Worknely V" + VERSION +

      " Supabase Template Persistence ready."

    );

  }

  if (document.readyState === "loading") {

    document.addEventListener(

      "DOMContentLoaded",

      initialize,

      {once:true}

    );

  } else {

    initialize();

  }

  window.addEventListener(

    "pageshow",

    bindAuthentication

  );

})();

/*
 * END WORKNELY V7.16.6
 * SUPABASE TEMPLATE PERSISTENCE ENGINE
 */
