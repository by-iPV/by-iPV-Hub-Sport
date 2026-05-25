// [REL-LSK-01][A01][NEW] Hub Sport LSK ultra light MVP
(function () {
  const config = window.HUB_SPORT_LSK_CONFIG || {};
  const IPV_LOGO = "assets/logo-ipv-oficial.png";
  const DEMO_BADGE_SESSION_KEY = "hubSportDemoBadgeState";
  const LOADING_STEP_COUNT = 5;
  const STORY_PHASES = [
    { key: "portada", title: "Portada", caption: "Abriendo escaparate del evento..." },
    { key: "equipo", title: "Equipo", caption: "Conectando identidad de equipo..." },
    { key: "rama", title: "Rama", caption: "Ajustando rama principal..." },
    { key: "categoria", title: "Categoría", caption: "Armando categorías activas..." },
    { key: "calendario", title: "Calendario", caption: "Sincronizando tiempos..." },
    { key: "confirmacion", title: "Confirmación", caption: "Validando consistencia visual..." },
    { key: "matching", title: "Matching", caption: "Preparando cruces del evento..." },
    { key: "match", title: "Match", caption: "Afinando enfrentamientos..." },
    { key: "cierre", title: "Cierre", caption: "Finalizando narrativa del evento..." }
  ];
  const STORY_TEXT_MAP = {
    base: {
      portada: { title: "Portada", caption: "Abriendo escaparate del evento..." },
      equipo: { title: "Equipo", caption: "Conectando identidad de equipo..." },
      rama: { title: "Rama", caption: "Ajustando rama principal..." },
      categoria: { title: "Categoría", caption: "Armando categorías activas..." },
      calendario: { title: "Calendario", caption: "Sincronizando tiempos..." },
      confirmacion: { title: "Confirmación", caption: "Validando consistencia visual..." },
      matching: { title: "Matching", caption: "Preparando cruces del evento..." },
      match: { title: "Match", caption: "Afinando enfrentamientos..." },
      cierre: { title: "Cierre", caption: "Finalizando narrativa del evento..." }
    },
    categoria: {
      "i4-1": { title: "Categoría", caption: "Configurando iniciación..." },
      "i4-2": { title: "Categoría", caption: "Configurando infantil..." },
      "i4-3": { title: "Categoría", caption: "Configurando secundaria femenil..." },
      "i4-4": { title: "Categoría", caption: "Configurando secundaria varonil..." },
      "i4-5": { title: "Categoría", caption: "Configurando preparatoria femenil..." },
      "i4-6": { title: "Categoría", caption: "Configurando preparatoria varonil..." },
      "i4-7": { title: "Categoría", caption: "Configurando 3ª fuerza..." },
      "i4-8": { title: "Categoría", caption: "Configurando alto rendimiento..." }
    }
  };
  const STORY_ASSET_MAP = {
    base: {
      portada: "assets/base/ipf_img01_portada.webp",
      equipo: "assets/base/ipf_img02_equipo.webp",
      calendario: "assets/base/ipf_img05_calendario.webp",
      confirmacion: "assets/base/ipf_img06_confirmacion.webp",
      matching: "assets/base/ipf_img07_matching.webp",
      match: "assets/base/ipf_img08_match.webp",
      cierre: "assets/base/ipf_img09_cierre.webp"
    },
    rama: {
      femenil: "assets/base/ipf_img03_rama_femenil_mixed.webp",
      varonil: "assets/base/ipf_img03_rama_varonil_mixed.webp",
      mixto: "assets/base/ipf_img03_rama_mixto.webp"
    },
    categoria: {
      "i4-1": "assets/categoria/ipf_img04_cat_iniciacion.webp",
      "i4-2": "assets/categoria/ipf_img04_cat_infantil.webp",
      "i4-3": "assets/categoria/ipf_img04_cat_secundaria_femenil.webp",
      "i4-4": "assets/categoria/ipf_img04_cat_secundaria_varonil.webp",
      "i4-5": "assets/categoria/ipf_img04_cat_prepa_femenil.webp",
      "i4-6": "assets/categoria/ipf_img04_cat_prepa_varonil.webp",
      "i4-7": {
        femenil: "assets/categoria/ipf_img04_cat_prepa_femenil.webp",
        varonil: "assets/categoria/ipf_img04_cat_prepa_varonil.webp"
      },
      "i4-8": {
        mixto: "assets/categoria/ipf_img04_cat_alto_mixto.webp",
        femenil: "assets/categoria/ipf_img04_cat_competitivo_fem.webp",
        varonil: "assets/categoria/ipf_img04_cat_competitivo_var.webp"
      },
      iniciacion: "assets/categoria/ipf_img04_cat_iniciacion.webp",
      infantil: "assets/categoria/ipf_img04_cat_infantil.webp",
      secundaria_femenil: "assets/categoria/ipf_img04_cat_secundaria_femenil.webp",
      secundaria_varonil: "assets/categoria/ipf_img04_cat_secundaria_varonil.webp",
      prepa_femenil: "assets/categoria/ipf_img04_cat_prepa_femenil.webp",
      prepa_varonil: "assets/categoria/ipf_img04_cat_prepa_varonil.webp",
      competitivo: {
        femenil: "assets/categoria/ipf_img04_cat_competitivo_fem.webp",
        varonil: "assets/categoria/ipf_img04_cat_competitivo_var.webp"
      },
      alto: {
        mixto: "assets/categoria/ipf_img04_cat_alto_mixto.webp",
        femenil: "assets/categoria/ipf_img04_cat_competitivo_fem.webp",
        varonil: "assets/categoria/ipf_img04_cat_competitivo_var.webp"
      },
      alto_mixto: "assets/categoria/ipf_img04_cat_alto_mixto.webp"
    }
  };
  const CATEGORY_ORDER = [
    "Menores (Cachi/Mini/Micro)",
    "Infantil Menor",
    "Secundaria Femenil",
    "Secundaria Varonil",
    "Preparatoria Femenil",
    "Preparatoria Varonil",
    "3ª Fuerza Femenil",
    "3ª Fuerza Varonil",
    "2ª Fuerza Femenil",
    "2ª Fuerza Varonil",
    "2ª Fuerza Libre Femenil",
    "1ª Fuerza Varonil",
    "Mixto Libre"
  ];

  // [REL-LSK-01][A01][NEW] Snapshot base de fuentes reales verificadas
  const PRE_REGISTERED_SOURCE = [
    {
      email: "maklon@me.com",
      branches: "Femenil",
      categories: "Preparatoria",
      logos: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl",
      lastName: "Hernandez Carrillo",
      firstName: "Miguel Alonso",
      phone: "5518529034",
      teamName: ""
    },
    {
      email: "lfrguez@hotmail.com",
      branches: "Femenil",
      categories: "Preparatoria",
      logos: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs",
      lastName: "Rodriguez May",
      firstName: "Luis Felipe",
      phone: "9991273915",
      teamName: ""
    },
    {
      email: "miguel.merida.jet.tcl@gmail.com",
      branches: "Femenil, Varonil y Mixto",
      categories: "Menores (Cachi/Micro/Mini), Infantil Menor, Secundaria, Preparatoria, 3ª Fuerza, 2ª Fuerza, Mixto Libre",
      logos: "https://drive.google.com/open?id=1K_aJTtpwPhEVqeA4y5lW6PJ8f7IRoHx-, https://drive.google.com/open?id=1GuX0x9HJi3lyw5QBJqlKf6OFL5cL2kAi, https://drive.google.com/open?id=13sbiEkLNRKb2P6oDpzG4-FNEXuYFZ3HG",
      lastName: "Morales Koh",
      firstName: "Elias Manaces",
      phone: "9991632676",
      teamName: "Centinelas - CDK"
    }
  ];

  const TEAMS_SOURCE = [
    {
      id: "1",
      name: "Centinelas",
      branch: "Femenil",
      category: "Preparatoria",
      ownerEmail: "maklonlesama@gmail.com"
    }
  ];

  const state = {
    sourceProfiles: [],
    showcaseEntries: [],
    loggedUser: null,
    activeSourceEmail: "",
    activeCategories: [],
    activeCategoryIndex: 0,
    activeDeckOffset: 0,
    secondaryCategories: [],
    activeSectionBIndex: 0,
    activeSectionBDeckOffset: 0,
    deckCache: {},
    lastMissingLiveSignature: "",
    sponsorLogoUrls: [],
    externalLogoEntries: [],
    viewMode: "real",
    presenceRuntime: {
      sessionId: "",
      connected: false,
      heartbeatTimer: null,
      countTimer: null
    },
    // [REL-HUB-01][A16.0.2][NEW] Config de presencia preparada para integración gradual del contador.
    presence: resolvePresenceConfig(config.presence || {}),
    glassOpacity: String((config.settings && config.settings.glassOpacity) || "0.08"),
    googleReady: false,
    tooltipHideTimer: null,
    brandTooltipHideTimer: null,
    runtime: {
      urlParams: { eventAlias: "", urlEmail: "", pudzle: "" },
      eventAlias: "ipv",
      eventName: "IPV",
      eventActive: 1,
      eventLogo: IPV_LOGO,
      eventsCatalog: [],
      dataMode: "",
      demoBadgeMap: null,
      puzzleMode: false,
      puzzleVariant: "default",
      puzzleStarted: false,
      puzzleTimer: null,
      puzzlePhaseIndex: 0
    },
    summaryHover: {
      node: null,
      hideTimer: null,
      activeType: ""
    },
    rotation: {
      sectionATimer: null,
      sectionBTimer: null,
      pausedA: false,
      pausedB: false
    },
    loadingStory: {
      tilesBuilt: false,
      lastFrameSignature: "",
      currentFrame: null,
      currentStorySrc: ""
    }
  };
  const curatedFallback = buildCuratedFallbackEntries();

  const el = {
    loadingOverlay: document.getElementById("loadingOverlay"),
    loadingLabel: document.getElementById("loadingLabel"),
    loadingProgressTrack: document.getElementById("loadingProgressTrack"),
    loadingPercent: document.getElementById("loadingPercent"),
    loadingStoryPanel: document.getElementById("loadingStoryPanel"),
    loadingStoryImage: document.getElementById("loadingStoryImage"),
    loadingStoryStage: document.getElementById("loadingStoryStage"),
    loadingStoryCaption: document.getElementById("loadingStoryCaption"),
    loadingStoryPuzzle: document.getElementById("loadingStoryPuzzle"),
    sidebar: document.getElementById("sidebar"),
    brandMark: document.getElementById("brandMark"),
    brandMarkTooltip: document.getElementById("brandMarkTooltip"),
    sidebarToggle: document.getElementById("sidebarToggle"),
    sourceEmailSelect: document.getElementById("sourceEmailSelect"),
    eventSelect: document.getElementById("eventSelect"),
    sourceEmailValue: document.getElementById("sourceEmailValue"),
    sourceModeValue: document.getElementById("sourceModeValue"),
    glassOpacityRange: document.getElementById("glassOpacityRange"),
    glassOpacityValue: document.getElementById("glassOpacityValue"),
    heroLoginBtn: document.getElementById("heroLoginBtn"),
    heroLoginTooltip: document.getElementById("heroLoginTooltip"),
    heroLoginTooltipText: document.getElementById("heroLoginTooltipText"),
    heroLoginTooltipLogout: document.getElementById("heroLoginTooltipLogout"),
    loginDropdown: document.getElementById("loginDropdown"),
    authStatus: document.getElementById("authStatus"),
    googleLoginButton: document.getElementById("googleLoginButton"),
    userSession: document.getElementById("userSession"),
    userName: document.getElementById("userName"),
    userEmail: document.getElementById("userEmail"),
    logoutBtn: document.getElementById("logoutBtn"),
    sponsorsCarousel: document.getElementById("sponsorsCarousel"),
    inscribedLogosRail: document.getElementById("inscribedLogosRail"),
    preCount: document.getElementById("preCount"),
    preLabel: document.getElementById("preLabel"),
    inscribedCount: document.getElementById("inscribedCount"),
    insLabel: document.getElementById("insLabel"),
    categoryCount: document.getElementById("categoryCount"),
    catLabel: document.getElementById("catLabel"),
    onlineCount: document.getElementById("onlineCount"),
    onlineStatus: document.getElementById("onlineStatus"),
    viewModePreBtn: document.getElementById("viewModePreBtn"),
    viewModeDemoBtn: document.getElementById("viewModeDemoBtn"),
    sectionANav: document.getElementById("sectionANav"),
    sectionAPrevBtn: document.getElementById("sectionAPrevBtn"),
    sectionANextBtn: document.getElementById("sectionANextBtn"),
    sectionAEyebrow: document.getElementById("sectionAEyebrow"),
    sectionATitle: document.getElementById("sectionATitle"),
    sectionAStatus: document.getElementById("sectionAStatus"),
    sectionADescription: document.getElementById("sectionADescription"),
    activeCategoryName: document.getElementById("activeCategoryName"),
    activeCategoryMeta: document.getElementById("activeCategoryMeta"),
    sectionADeck: document.getElementById("sectionADeck"),
    sectionBTitle: document.getElementById("sectionBTitle"),
    sectionBStatus: document.getElementById("sectionBStatus"),
    sectionBNav: document.getElementById("sectionBNav"),
    sectionBPrevBtn: document.getElementById("sectionBPrevBtn"),
    sectionBNextBtn: document.getElementById("sectionBNextBtn"),
    sectionBCategoryName: document.getElementById("sectionBCategoryName"),
    sectionBCategoryMeta: document.getElementById("sectionBCategoryMeta"),
    sectionBDeck: document.getElementById("sectionBDeck")
  };

  init();

  async function init() {
    document.body.classList.add("app-loading");
    try {
      setLoadingProgress(0);
      state.runtime.urlParams = getUrlParams();
      state.runtime.puzzleMode = isPuzzleModeEnabled();
      state.runtime.puzzleVariant = resolvePuzzleVariant();
      await resolveEventContext();
      await hydrateEventLogo();
      applyEventBranding();
      state.loggedUser = getSessionUser();
      state.viewMode = getInitialViewMode();
      await loadShowcaseSources();
      setLoadingProgress(1);
      await hydrateLogoCatalogs();
      setLoadingProgress(2);
      await waitForFonts();
      setLoadingProgress(3);
      state.activeSourceEmail = getInitialSourceEmail();
      syncUrl();
      hydrateVisualControls();
      applyGlass();
      bindEvents();
      await loadBackgroundFromDrive();
      setLoadingProgress(4);
      renderAll();
      announcePresenceConfig();
      initPresenceLayer();
      startRotation();
      setLoadingProgress(5);
      await waitMs(140);
    } finally {
      if (!state.runtime.puzzleMode) {
        hideLoader();
      } else {
        showPuzzleStartButton();
        startPuzzleModeSequence(5000, false);
      }
    }
  }

  async function loadShowcaseSources() {
    const result = await resolveDataPipeline();
    applyShowcaseSources(result.preRegisteredRows || [], result.teamRows || [], result.mode || "unknown");
    state.runtime.eventActive = Number(result.eventActive == null ? 1 : result.eventActive) ? 1 : 0;
  }

  function shouldUseDemoData() {
    return Boolean(config.dataSource && config.dataSource.useDemoData);
  }

  function getUrlParams() {
    const params = new URLSearchParams(window.location.search || "");
    return {
      eventAlias: String(params.get("event") || "").trim().toLowerCase(),
      urlEmail: normalizeEmail(params.get("email") || ""),
      demoMode: String(params.get("demoMode") || "").trim().toLowerCase(),
      pudzle: String(params.get("pudzle") || "").trim().toLowerCase()
    };
  }

  function isPuzzleModeEnabled() {
    const mode = String(state.runtime.urlParams && state.runtime.urlParams.pudzle || "").trim().toLowerCase();
    return mode === "on" || mode === "categoria";
  }

  function resolvePuzzleVariant() {
    const mode = String(state.runtime.urlParams && state.runtime.urlParams.pudzle || "").trim().toLowerCase();
    if (mode === "categoria") return "categoria";
    return "default";
  }

  async function resolveEventContext() {
    const urlAlias = String(state.runtime.urlParams.eventAlias || "").trim().toLowerCase();
    const sheetsData = await loadEventsFromSheets();
    const sheetsAlias = String(sheetsData.defaultEventAlias || "").trim().toLowerCase();
    const configAlias = String((config.events && config.events.defaultEventAlias) || "").trim().toLowerCase();
    const fallbackAlias = "ipv";
    const resolvedAlias = urlAlias || sheetsAlias || configAlias || fallbackAlias;
    state.runtime.eventAlias = resolvedAlias;
    state.runtime.eventsCatalog = Array.isArray(sheetsData.events) ? sheetsData.events : [];
    const activeEvent = state.runtime.eventsCatalog.find(function (item) {
      return String(item.event_alias || "").trim().toLowerCase() === resolvedAlias;
    }) || null;
    state.runtime.eventName = String(
      (activeEvent && activeEvent.event_name) ||
      (config.events && config.events.namesByAlias && config.events.namesByAlias[resolvedAlias]) ||
      resolvedAlias.toUpperCase()
    ).trim();
    const activeFlag = activeEvent && activeEvent.event_active;
    state.runtime.eventActive = Number(activeFlag == null ? 1 : activeFlag) ? 1 : 0;
  }

  async function loadEventsFromSheets() {
    const spreadsheetId = String((config.events && config.events.spreadsheetId) || "").trim();
    const settingsSheet = String((config.events && config.events.settingsSheet) || "Settings").trim();
    const appsUrl = String(config.appsScriptUrl || "").trim();
    if (!appsUrl || !spreadsheetId) return { defaultEventAlias: "", events: [] };
    try {
      const url = appsUrl
        + "?action=getSettings"
        + "&spreadsheetId=" + encodeURIComponent(spreadsheetId)
        + "&sheet=" + encodeURIComponent(settingsSheet);
      const response = await fetch(url);
      if (!response.ok) throw new Error("settings http " + response.status);
      const raw = await response.json();
      const payload = unwrapResponse(raw);
      const rows = Array.isArray(payload && payload.settings) ? payload.settings
        : Array.isArray(payload && payload.rows) ? payload.rows
          : Array.isArray(payload) ? payload : [];
      const defaultRow = rows.find(function (row) {
        return normalizeKey(getField(row, ["key", "Key", "clave"])) === "event";
      }) || null;
      const defaultEventAlias = String(getField(defaultRow, ["value", "Value", "valor"]) || "").trim().toLowerCase();
      const events = Array.isArray(payload && payload.events) ? payload.events : [];
      return { defaultEventAlias: defaultEventAlias, events: events };
    } catch (error) {
      console.warn("[HubSport] settings de eventos no disponibles:", error);
      return { defaultEventAlias: "", events: [] };
    }
  }

  function resolveViewMode(mode) {
    if (mode === "demo") return "demo";
    return "real";
  }

  async function resolveDataPipeline() {
    const mode = resolveViewMode(state.viewMode);
    const eventAlias = String(state.runtime.eventAlias || "ipv").trim().toLowerCase();
    if (eventAlias === "ipv") {
      if (mode === "demo" || shouldUseDemoData()) {
        const demoIpv = await resolveDemoDataset();
        return { preRegisteredRows: demoIpv.preRegisteredRows, teamRows: demoIpv.teamRows, mode: "demo-ipv", eventActive: 1 };
      }
      try {
        const remoteIpv = await fetchRemoteShowcaseSources(eventAlias);
        const preRowsIpv = remoteIpv.preRegisteredRows || [];
        const teamRowsIpv = remoteIpv.teamRows || [];
        if (!preRowsIpv.length && !teamRowsIpv.length) throw new Error("bootstrap sin filas para evento");
        return { preRegisteredRows: preRowsIpv, teamRows: teamRowsIpv, mode: "apps-script-bootstrap-ipv", eventActive: 1 };
      } catch (error) {
        console.warn("[HubSport] fallback IPV a dataset demo por error de fuente remota:", error);
        return { preRegisteredRows: PRE_REGISTERED_SOURCE, teamRows: TEAMS_SOURCE, mode: "demo-fallback-ipv", eventActive: 1 };
      }
    }
    if (mode === "real") {
      try {
        const remote = await fetchRemoteShowcaseSources(eventAlias);
        const preRows = remote.preRegisteredRows || [];
        const teamRows = remote.teamRows || [];
        if (!preRows.length && !teamRows.length) throw new Error("bootstrap sin filas para evento");
        return { preRegisteredRows: preRows, teamRows: teamRows, mode: "apps-script-bootstrap-real", eventActive: state.runtime.eventActive };
      } catch (error) {
        console.warn("[HubSport] modo REAL sin datos remotos. fallback seguro a vacío:", error);
        return { preRegisteredRows: [], teamRows: [], mode: "real-empty-fallback", eventActive: state.runtime.eventActive };
      }
    }
    const demo = await resolveDemoDataset();
    return { preRegisteredRows: demo.preRegisteredRows, teamRows: demo.teamRows, mode: "demo-non-ipv", eventActive: 1 };
  }

  function applyShowcaseSources(preRegisteredRows, teamRows, mode) {
    state.runtime.dataMode = String(mode || "");
    state.sourceProfiles = (preRegisteredRows || []).map(normalizePreRegisteredRecord).filter(function (item) { return item.email; });
    state.showcaseEntries = buildShowcaseEntries(state.sourceProfiles, (teamRows || []).map(normalizeTeamRecord));
    console.info("[HubSportDataSource]", {
      mode: mode,
      preRegisteredCount: state.sourceProfiles.length,
      teamsCount: uniqueBy((teamRows || []).map(normalizeTeamRecord), function (team) { return String(team.id || team.name || ""); }).length,
      sheets: config.dataSource && config.dataSource.sheets ? config.dataSource.sheets : {}
    });
  }

  async function fetchRemoteShowcaseSources(eventAlias) {
    const url = String(config.appsScriptUrl || "").trim();
    if (!url) throw new Error("appsScriptUrl no configurado");
    const alias = String(eventAlias || state.runtime.eventAlias || "ipv").trim().toLowerCase();
    const spreadsheetId = String((config.events && config.events.spreadsheetId) || "").trim();
	const preRegisteredSheet = String((config.dataSource && config.dataSource.sheets && config.dataSource.sheets.preRegistered) || "").trim();
	const teamsSheet = String((config.dataSource && config.dataSource.sheets && config.dataSource.sheets.teams) || "").trim();

	const query = [
	  "action=bootstrap",
	  "event=" + encodeURIComponent(alias),
	  spreadsheetId ? "spreadsheetId=" + encodeURIComponent(spreadsheetId) : "",
	  preRegisteredSheet ? "preRegisteredSheet=" + encodeURIComponent(preRegisteredSheet) : "",
	  teamsSheet ? "teamsSheet=" + encodeURIComponent(teamsSheet) : ""
	].filter(Boolean).join("&");

	const response = await fetch(url + "?" + query);
    const json = await response.json();
    const payload = unwrapResponse(json);
    const preRowsRaw = (payload.preRegisteredTeams || payload.equiposInscritos || payload.preRegistered || payload.inscritos || []).filter(function (row) {
      return rowMatchesEventAlias(row, alias);
    });
    const teamRowsRaw = (payload.teams || payload.Teams || payload.teamsRows || []).filter(function (row) {
      return rowMatchesEventAlias(row, alias);
    });
    return {
      preRegisteredRows: (preRowsRaw || []).map(normalizeIncomingPreRegisteredRow),
      teamRows: (teamRowsRaw || []).map(normalizeIncomingTeamRow)
    };
  }

  function rowMatchesEventAlias(row, eventAlias) {
    const target = String(eventAlias || "").trim().toLowerCase();
    if (!target) return true;
    const rowAlias = normalizeEventAliasFromRow(row);
    if (!rowAlias) return true;
    return rowAlias === target;
  }

  function normalizeEventAliasFromRow(row) {
    const alias = getField(row, ["eventAlias", "event_alias", "event", "alias", "evento", "eventName", "event_name"]);
    const clean = String(alias || "").trim().toLowerCase();
    if (!clean) return "";
    return clean.replace(/\s+/g, "-");
  }

  function resolvePresenceConfig(input) {
    const requestedEnv = String(input.env || "auto").trim() || "auto";
    const env = detectPresenceEnv(requestedEnv);
    const endpointByEnv = input.endpointByEnv || {};
    return {
      enabled: input.enabled !== false,
      env: env,
      roomId: String(input.roomId || "hub-sport-global").trim() || "hub-sport-global",
      heartbeatMs: Number(input.heartbeatMs) || 15000,
      countRefreshMs: Number(input.countRefreshMs) || 10000,
      staleTtlMs: Number(input.staleTtlMs) || 35000,
      endpointBase: String(endpointByEnv[env] || endpointByEnv.prod || "").trim(),
      tracking: {
        enabled: !input.tracking || input.tracking.enabled !== false,
        mode: String(input.tracking && input.tracking.mode || "hash-only"),
        requireConsent: !input.tracking || input.tracking.requireConsent !== false
      }
    };
  }

  function detectPresenceEnv(requestedEnv) {
    if (requestedEnv && requestedEnv !== "auto") return requestedEnv;
    const hostname = String(window.location.hostname || "").toLowerCase();
    if (!hostname || hostname === "localhost" || hostname === "127.0.0.1") return "local";
    if (hostname.endsWith(".workers.dev") || hostname.includes("staging")) return "staging";
    return "prod";
  }

  function announcePresenceConfig() {
    if (!state.presence.enabled) return;
    // [REL-HUB-01][A16.0.2][NEW] Punto estratégico: dejar visible en consola la configuración activa para pruebas.
    console.info("[HubPresenceConfig]", {
      env: state.presence.env,
      roomId: state.presence.roomId,
      endpointBase: state.presence.endpointBase || "(sin endpoint configurado)",
      tracking: state.presence.tracking
    });
  }

  function bindEvents() {
    el.sidebarToggle.addEventListener("click", toggleSidebar);
    if (el.viewModePreBtn) {
      el.viewModePreBtn.addEventListener("click", function () { setViewMode("real"); });
    }
    if (el.viewModeDemoBtn) {
      el.viewModeDemoBtn.addEventListener("click", function () { setViewMode("demo"); });
    }
    if (el.sectionAPrevBtn) {
      el.sectionAPrevBtn.addEventListener("click", function () {
        moveSectionACategory(-1);
      });
    }
    if (el.sectionANextBtn) {
      el.sectionANextBtn.addEventListener("click", function () {
        moveSectionACategory(1);
      });
    }
    if (el.sectionBPrevBtn) {
      el.sectionBPrevBtn.addEventListener("click", function () {
        moveSectionBCategory(-1);
      });
    }
    if (el.sectionBNextBtn) {
      el.sectionBNextBtn.addEventListener("click", function () {
        moveSectionBCategory(1);
      });
    }
    if (el.eventSelect) {
      el.eventSelect.addEventListener("change", async function () {
        const alias = String(el.eventSelect.value || "").trim().toLowerCase();
        if (!alias || alias === state.runtime.eventAlias) return;
        state.runtime.eventAlias = alias;
        state.runtime.eventName = alias.toUpperCase();
        state.activeCategoryIndex = 0;
        state.activeDeckOffset = 0;
        state.activeSectionBIndex = 0;
        state.activeSectionBDeckOffset = 0;
        state.deckCache = {};
        await loadShowcaseSources();
        state.activeSourceEmail = getInitialSourceEmail();
        syncUrl();
        renderAll();
      });
    }
    el.heroLoginBtn.addEventListener("click", function () {
      toggleLoginDropdown();
    });
    if (el.brandMark && el.brandMarkTooltip) {
      el.brandMark.addEventListener("mouseenter", showBrandTooltip);
      el.brandMark.addEventListener("mouseleave", scheduleHideBrandTooltip);
      el.brandMarkTooltip.addEventListener("mouseenter", showBrandTooltip);
      el.brandMarkTooltip.addEventListener("mouseleave", scheduleHideBrandTooltip);
    }
    el.heroLoginBtn.addEventListener("mouseenter", renderLoginTooltip);
    el.heroLoginBtn.addEventListener("mouseleave", function () {
      scheduleHideLoginTooltip();
    });
    el.heroLoginTooltip.addEventListener("mouseenter", function () {
      if (state.loggedUser && state.loggedUser.email) {
        showLoginTooltip();
      }
    });
    el.heroLoginTooltip.addEventListener("mouseleave", function () {
      scheduleHideLoginTooltip();
    });
    el.heroLoginTooltipLogout.addEventListener("click", function (event) {
      event.stopPropagation();
      logout();
    });
    el.glassOpacityRange.addEventListener("input", function () {
      state.glassOpacity = String(el.glassOpacityRange.value || "0.08");
      window.localStorage.setItem("hubSportLskGlassOpacity", state.glassOpacity);
      updateOpacityValue();
      applyGlass();
    });
    el.logoutBtn.addEventListener("click", function () {
      logout();
    });
    el.sourceEmailSelect.addEventListener("change", function () {
      if (resolveViewMode(state.viewMode) === "demo") {
        state.activeSourceEmail = "";
        syncUrl();
        renderAll();
        return;
      }
      state.activeSourceEmail = el.sourceEmailSelect.value || "";
      state.activeCategoryIndex = 0;
      state.activeDeckOffset = 0;
      state.activeSectionBIndex = 0;
      state.activeSectionBDeckOffset = 0;
      syncUrl();
      renderAll();
    });
    if (el.sectionADeck) {
      el.sectionADeck.addEventListener("mouseenter", function () {
        state.rotation.pausedA = true;
        el.sectionADeck.classList.add("is-paused");
      });
      el.sectionADeck.addEventListener("mouseleave", function () {
        state.rotation.pausedA = false;
        el.sectionADeck.classList.remove("is-paused");
      });
    }
    if (el.sectionBDeck) {
      el.sectionBDeck.addEventListener("mouseenter", function () {
        state.rotation.pausedB = true;
        el.sectionBDeck.classList.add("is-paused");
      });
      el.sectionBDeck.addEventListener("mouseleave", function () {
        state.rotation.pausedB = false;
        el.sectionBDeck.classList.remove("is-paused");
      });
    }
    initSummaryHover();
    document.addEventListener("click", function (event) {
      if (el.loginDropdown.classList.contains("hidden")) return;
      if (!el.loginDropdown.contains(event.target) && !el.heroLoginBtn.contains(event.target)) {
        closeLoginDropdown();
      }
    });
    window.addEventListener("beforeunload", function () {
      presenceLeaveBestEffort("beforeunload");
    });
  }

  function initPresenceLayer() {
    if (!el.onlineCount || !el.onlineStatus) return;
    if (!state.presence.enabled || !state.presence.endpointBase) {
      el.onlineCount.textContent = "--";
      el.onlineStatus.textContent = "PCL off";
      return;
    }
    state.presenceRuntime.sessionId = createId("pcl");
    presenceJoinAndStart().catch(function () {
      el.onlineCount.textContent = "--";
      el.onlineStatus.textContent = "PCL error";
    });
  }

  async function presenceJoinAndStart() {
    await presencePost("join");
    state.presenceRuntime.connected = true;
    el.onlineStatus.textContent = "conectado";
    await refreshPresenceCount();
    if (state.presenceRuntime.heartbeatTimer) window.clearInterval(state.presenceRuntime.heartbeatTimer);
    if (state.presenceRuntime.countTimer) window.clearInterval(state.presenceRuntime.countTimer);
    state.presenceRuntime.heartbeatTimer = window.setInterval(function () {
      if (document.hidden) return;
      presencePost("heartbeat").catch(function () {
        el.onlineStatus.textContent = "reintentando";
      });
    }, state.presence.heartbeatMs || 15000);
    state.presenceRuntime.countTimer = window.setInterval(function () {
      if (document.hidden) return;
      refreshPresenceCount();
    }, state.presence.countRefreshMs || 10000);
  }

  async function refreshPresenceCount() {
    try {
      const response = await fetch(buildPresenceUrl("count"));
      if (!response.ok) throw new Error("count http " + response.status);
      const data = await response.json();
      const count = Number(data.activeCount);
      el.onlineCount.textContent = Number.isFinite(count) ? String(count) : "--";
      el.onlineStatus.textContent = "en vivo";
    } catch (_) {
      el.onlineCount.textContent = "--";
      el.onlineStatus.textContent = "sin señal";
    }
  }

  async function presencePost(eventType) {
    const response = await fetch(buildPresenceUrl(eventType), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId: state.presenceRuntime.sessionId,
        roomId: state.presence.roomId,
        eventAlias: state.runtime.eventAlias,
        eventName: state.runtime.eventName,
        eventType: eventType,
        sourceApp: "hub-sport-ultralight",
        processType: "hub-presence",
        now: Date.now()
      })
    });
    if (!response.ok) throw new Error(eventType + " http " + response.status);
    return response.json();
  }

  function buildPresenceUrl(eventType) {
    const base = String(state.presence.endpointBase || "").replace(/\/+$/, "");
    return base
      + "/presence/" + eventType
      + "?roomId=" + encodeURIComponent(state.presence.roomId || "hub-sport-global")
      + "&event=" + encodeURIComponent(state.runtime.eventAlias || "ipv");
  }

  function presenceLeaveBestEffort(reason) {
    if (!state.presenceRuntime.sessionId || !state.presence.endpointBase) return;
    const payload = JSON.stringify({
      sessionId: state.presenceRuntime.sessionId,
      roomId: state.presence.roomId,
      eventAlias: state.runtime.eventAlias,
      eventName: state.runtime.eventName,
      eventType: "leave",
      sourceApp: "hub-sport-ultralight",
      processType: "hub-presence",
      reason: String(reason || "leave"),
      now: Date.now()
    });
    const url = buildPresenceUrl("leave");
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon(url, blob);
        return;
      }
    } catch (_) {
    }
  }

  function renderAll() {
    applyEventBranding();
    applyHeroConfigVisibility();
    updateOpacityValue();
    renderModeSwitch();
    renderEventsCombo();
    renderSourceSelector();
    renderAuthPanel();
    renderSummary();
    renderSponsorsCarousel();
    renderInscribedRail();
    renderSectionA();
    renderSectionB();
  }

  function applyHeroConfigVisibility() {
    const isBaseEvent = String(state.runtime.eventAlias || "").trim().toLowerCase() === "ipv";
    const blocks = document.querySelectorAll(".hero-config-block");
    blocks.forEach(function (block) {
      block.style.display = isBaseEvent ? "" : "none";
    });
  }

  function renderSourceSelector() {
    const options = ["<option value=''>Catalogo general</option>"].concat(
      state.sourceProfiles.map(function (profile) {
        return "<option value='" + esc(profile.email) + "'>" + esc(profile.email) + "</option>";
      })
    );

    el.sourceEmailSelect.innerHTML = options.join("");
    el.sourceEmailSelect.value = state.activeSourceEmail;
    el.sourceEmailSelect.disabled = resolveViewMode(state.viewMode) === "demo";

    const sourceProfile = getActiveSourceProfile();
    el.sourceEmailValue.textContent = sourceProfile ? sourceProfile.email : "Catalogo general";
    if (resolveViewMode(state.viewMode) === "demo") {
      el.sourceModeValue.textContent = "Demo curado";
    } else {
      el.sourceModeValue.textContent = sourceProfile ? "Categorias del correo origen" : "Rotacion completa";
    }
  }

  function renderModeSwitch() {
    if (!el.viewModePreBtn || !el.viewModeDemoBtn) return;
    el.viewModePreBtn.classList.toggle("is-active", resolveViewMode(state.viewMode) === "real");
    el.viewModeDemoBtn.classList.toggle("is-active", state.viewMode === "demo");
  }

  async function setViewMode(mode) {
    const next = mode === "demo" ? "demo" : "real";
    if (state.viewMode === next) return;
    state.viewMode = next;
    window.localStorage.setItem("viewMode", next);
    state.activeCategoryIndex = 0;
    state.activeDeckOffset = 0;
    state.activeSectionBIndex = 0;
    state.activeSectionBDeckOffset = 0;
    state.deckCache = {};
    await loadShowcaseSources();
    state.activeSourceEmail = getInitialSourceEmail();
    renderAll();
  }

  function renderEventsCombo() {
    if (!el.eventSelect) return;
    const resolvedAlias = String(state.runtime.eventAlias || "ipv").trim().toLowerCase();
    const rows = (state.runtime.eventsCatalog || []).filter(function (item) {
      return String(item && item.event_alias || "").trim();
    });
    const normalizedRows = rows.length ? rows : [{
      event_alias: resolvedAlias,
      event_name: state.runtime.eventName || resolvedAlias.toUpperCase(),
      event_active: state.runtime.eventActive
    }];
    el.eventSelect.innerHTML = normalizedRows.map(function (item) {
      const alias = String(item.event_alias || "").trim().toLowerCase();
      const name = String(item.event_name || alias.toUpperCase()).trim();
      const active = Number(item.event_active == null ? 1 : item.event_active) ? "" : " (inactivo)";
      return "<option value='" + esc(alias) + "'>" + esc(name + " [" + alias.toUpperCase() + "]" + active) + "</option>";
    }).join("");
    el.eventSelect.value = resolvedAlias;
  }

  function renderAuthPanel() {
    const saved = state.loggedUser;
    el.heroLoginBtn.classList.toggle("is-google-icon", Boolean(saved && saved.email));
    el.heroLoginBtn.innerHTML = saved && saved.email ? "<span class='google-mark' aria-hidden='true'>G</span>" : "Acceso con Google";
    el.heroLoginBtn.setAttribute("aria-label", saved && saved.email ? "Cuenta de Google" : "Acceso con Google");
    if (saved) {
      el.authStatus.textContent = "Sesion de Google activa para personalizar la experiencia del hub.";
      el.userSession.classList.remove("hidden");
      el.googleLoginButton.classList.add("hidden");
      el.userName.textContent = saved.name || "Usuario";
      el.userEmail.textContent = saved.email || "";
      renderLoginTooltip();
      return;
    }

    el.authStatus.textContent = String(config.googleClientId || "").trim() ? "Inicia sesión con Google para personalizar la categoría origen del enlace." : "Agrega tu Google Client ID en config.js.";
    el.userSession.classList.add("hidden");
    el.googleLoginButton.classList.remove("hidden");
    hideLoginTooltipImmediate();
    initGoogleAuth(false);
  }

  function renderSummary() {
    const preCount = state.showcaseEntries.filter(function (entry) { return entry.status === "Pre-inscrito"; }).length;
    const inscribedCount = state.showcaseEntries.filter(function (entry) { return entry.status === "Inscrito"; }).length;
    const categories = buildCategorySummaryMatrix();

    el.preCount.textContent = String(preCount);
    el.inscribedCount.textContent = String(inscribedCount);
    el.categoryCount.textContent = String(categories.length || CATEGORY_ORDER.length);
  }

  function initSummaryHover() {
    bindSummaryHoverTarget(el.catLabel, "cat");
    bindSummaryHoverTarget(el.categoryCount, "cat");
    bindSummaryHoverTarget(el.preLabel, "pre");
    bindSummaryHoverTarget(el.preCount, "pre");
    bindSummaryHoverTarget(el.insLabel, "ins");
    bindSummaryHoverTarget(el.inscribedCount, "ins");
  }

  function bindSummaryHoverTarget(target, type) {
    if (!target) return;
    target.setAttribute("tabindex", "0");
    target.addEventListener("mouseenter", function () {
      showSummaryHover(type, target);
    });
    target.addEventListener("mouseleave", scheduleHideSummaryHover);
    target.addEventListener("focus", function () {
      showSummaryHover(type, target);
    });
    target.addEventListener("blur", scheduleHideSummaryHover);
  }

  function showSummaryHover(type, anchor) {
    const dialog = ensureSummaryHoverNode();
    clearSummaryHoverTimer();
    state.summaryHover.activeType = String(type || "");
    dialog.innerHTML = renderSummaryHoverDialog(state.summaryHover.activeType);
    dialog.classList.remove("hidden");
    positionSummaryHover(dialog, anchor);
  }

  function scheduleHideSummaryHover() {
    clearSummaryHoverTimer();
    state.summaryHover.hideTimer = window.setTimeout(function () {
      hideSummaryHover();
    }, 120);
  }

  function clearSummaryHoverTimer() {
    if (state.summaryHover.hideTimer) {
      window.clearTimeout(state.summaryHover.hideTimer);
      state.summaryHover.hideTimer = null;
    }
  }

  function hideSummaryHover() {
    if (!state.summaryHover.node) return;
    state.summaryHover.node.classList.add("hidden");
    state.summaryHover.activeType = "";
  }

  function ensureSummaryHoverNode() {
    if (state.summaryHover.node) return state.summaryHover.node;
    const node = document.createElement("div");
    node.id = "summaryHoverDialog";
    node.className = "summary-hover-dialog hidden";
    node.setAttribute("role", "dialog");
    node.setAttribute("aria-live", "polite");
    node.addEventListener("mouseenter", clearSummaryHoverTimer);
    node.addEventListener("mouseleave", scheduleHideSummaryHover);
    document.body.appendChild(node);
    state.summaryHover.node = node;
    return node;
  }

  function positionSummaryHover(node, anchor) {
    if (!node || !anchor) return;
    const rect = anchor.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const margin = 12;
    let left = rect.right + margin;
    let top = rect.top - 4;
    if (left + nodeRect.width > window.innerWidth - margin) {
      left = Math.max(margin, rect.left - nodeRect.width - margin);
    }
    if (top + nodeRect.height > window.innerHeight - margin) {
      top = Math.max(margin, window.innerHeight - nodeRect.height - margin);
    }
    node.style.left = String(Math.round(left)) + "px";
    node.style.top = String(Math.round(top)) + "px";
  }

  function renderSummaryHoverDialog(type) {
    const rows = buildCategorySummaryMatrix();
    let filtered = rows.slice();
    let title = "Categorias";
    let columns = [
      { key: "ins", label: "Inscritos" },
      { key: "pre", label: "Pre-inscritos" },
      { key: "categoryDisplay", label: "Categoría" }
    ];
    if (type === "pre") {
      title = "Pre-inscritos por categoria";
      filtered = rows.filter(function (item) { return item.pre > 0; });
      columns = [
        { key: "pre", label: "Pre-inscritos" },
        { key: "categoryDisplay", label: "Categoría" }
      ];
    } else if (type === "ins") {
      title = "Inscritos por categoria";
      filtered = rows.filter(function (item) { return item.ins > 0; });
      columns = [
        { key: "ins", label: "Inscritos" },
        { key: "categoryDisplay", label: "Categoría" }
      ];
    } else {
      title = "Categorias del evento";
    }
    if (!filtered.length) {
      return "<div class='summary-hover-head'><strong>" + esc(title) + "</strong></div><div class='summary-hover-empty'>Sin incidencias.</div>";
    }
    const header = columns.map(function (col) {
      return "<th>" + esc(col.label) + "</th>";
    }).join("");
    const tableRows = filtered.map(function (item) {
      const cells = columns.map(function (col) {
        return renderSummaryCell(item[col.key], col.key);
      }).join("");
      return "<tr>" + cells + "</tr>";
    }).join("");
    const totals = buildSummaryTotals(filtered, columns);
    const totalCells = columns.map(function (col) {
      if (col.key === "categoryDisplay") return "<td class='summary-total-label'>TOTAL</td>";
      return renderSummaryCell(totals[col.key], col.key);
    }).join("");
    return ""
      + "<div class='summary-hover-head'><strong>" + esc(title) + "</strong></div>"
      + "<table class='summary-hover-table'>"
      + "<thead><tr>" + header + "</tr></thead>"
      + "<tbody>" + tableRows + "<tr class='summary-hover-total-row'>" + totalCells + "</tr></tbody>"
      + "</table>";
  }

  function buildSummaryTotals(rows, columns) {
    const list = Array.isArray(rows) ? rows : [];
    const totals = {};
    (Array.isArray(columns) ? columns : []).forEach(function (col) {
      if (!col || !col.key) return;
      if (col.key === "ins" || col.key === "pre") {
        totals[col.key] = list.reduce(function (acc, item) {
          return acc + (Number(item && item[col.key]) || 0);
        }, 0);
      } else {
        totals[col.key] = "";
      }
    });
    return totals;
  }

  function renderSummaryCell(value, key) {
    const isNumeric = key === "ins" || key === "pre";
    if (!isNumeric) return "<td>" + esc(value) + "</td>";
    const number = Number(value) || 0;
    const cls = number > 0 ? "summary-cell-positive" : "summary-cell-zero";
    return "<td class='" + cls + "'>" + esc(number) + "</td>";
  }

  function buildCategorySummaryMatrix() {
    const categories = CATEGORY_ORDER.slice();
    const dynamicCategories = unique(state.showcaseEntries.map(function (entry) {
      return String(entry && entry.categoryDisplay || "").trim();
    }).filter(Boolean));
    dynamicCategories.forEach(function (category) {
      if (!categories.includes(category)) categories.push(category);
    });
    const matrix = {};
    categories.forEach(function (category) {
      matrix[category] = { categoryDisplay: category, ins: 0, pre: 0 };
    });
    const seenPre = new Set();
    const seenIns = new Set();
    state.showcaseEntries.forEach(function (entry) {
      const category = String(entry && entry.categoryDisplay || "").trim();
      if (!category) return;
      if (!matrix[category]) matrix[category] = { categoryDisplay: category, ins: 0, pre: 0 };
      const teamKey = normalizeKey(entry && entry.teamName || entry && entry.id || "equipo");
      const status = String(entry && entry.status || "").toLowerCase();
      const signature = category + "|" + teamKey;
      if (status === "inscrito") {
        if (seenIns.has(signature)) return;
        seenIns.add(signature);
        matrix[category].ins += 1;
        return;
      }
      if (seenPre.has(signature)) return;
      seenPre.add(signature);
      matrix[category].pre += 1;
    });
    return categories.map(function (category) {
      return matrix[category];
    });
  }

  function renderSponsorsCarousel() {
    const urls = state.sponsorLogoUrls.length
      ? state.sponsorLogoUrls
      : [
          "assets/logo-ipv-oficial.png",
          "assets/logo-ipv-oficial.png"
        ];

    el.sponsorsCarousel.innerHTML = renderCarousel(urls, "sponsor-logo", "Patrocinador");
  }

  function renderInscribedRail() {
    const entries = uniqueBy(state.showcaseEntries.filter(function (entry) {
      return entry.status === "Inscrito" && hasRenderableLogo(entry);
    }), function (entry) {
      return entry.teamName + "|" + entry.logoUrl + "|" + entry.categoryDisplay;
    });

    if (!entries.length) {
      el.inscribedLogosRail.innerHTML = "<div class='empty-state'>Todavía no hay equipos pre-inscritos/inscritos para mostrar.</div>";
      return;
    }

    const urls = entries.slice(0, 8).map(function (entry) {
      return entry.logoUrl || IPV_LOGO;
    });
    el.inscribedLogosRail.innerHTML = renderCarousel(urls, "team-logo-item", "Equipo inscrito");
  }

  function renderSectionA() {
    const categories = getSectionACategories();
    state.activeCategories = categories;
    if (state.activeCategoryIndex >= categories.length) state.activeCategoryIndex = 0;

    const activeCategory = categories[state.activeCategoryIndex] || "";
    const sourceProfile = getActiveSourceProfile();
    let entries = state.showcaseEntries.filter(function (entry) {
      return entry.categoryDisplay === activeCategory && (!sourceProfile || entry.sourceEmail === sourceProfile.email);
    });
    entries = entries.filter(hasRenderableLogo);
    if (!entries.length) entries = getRenderableCategoryEntriesFromFallback(activeCategory);
    const uniqueTeamsCount = countUniqueTeams(entries);
    const displayEntries = uniqueTeamsCount === 1 && entries.length ? [entries[0]] : entries;

    el.sectionATitle.textContent = getSectionATitle(entries);
    el.sectionAStatus.textContent = "";
    el.sectionAStatus.classList.add("hidden");
    el.sectionADescription.textContent = "";
    el.activeCategoryName.textContent = activeCategory || "Sin categoria";
    if (el.sectionAEyebrow) {
      el.sectionAEyebrow.textContent = uniqueTeamsCount === 1 ? "Mi categoría" : "Mis categorías";
    }
    el.activeCategoryMeta.textContent = formatActiveTeamsAndCategoriesLabel(uniqueTeamsCount, categories.length);
    if (el.sectionANav) {
      el.sectionANav.classList.remove("hidden");
      const canNavigate = categories.length > 1;
      el.sectionANav.classList.toggle("is-disabled", !canNavigate);
      if (el.sectionAPrevBtn) el.sectionAPrevBtn.disabled = !canNavigate;
      if (el.sectionANextBtn) el.sectionANextBtn.disabled = !canNavigate;
    }

    if (!displayEntries.length) {
      el.sectionADeck.innerHTML = "<div class='empty-state'>No hay equipos disponibles para la categoría actual.</div>";
      return;
    }

    el.sectionADeck.innerHTML = renderCardCarousel(displayEntries, {
      forceMarquee: true,
      minItems: uniqueTeamsCount === 1 ? 0 : 8,
      trackClass: "section-marquee-track",
      singularTravel: uniqueTeamsCount === 1 && displayEntries.length === 1
    });
  }

  function getSectionATitle(entries) {
    const list = Array.isArray(entries) ? entries : [];
    if (!list.length) return "Equipos Pre-inscritos/Inscritos";

    const uniqueTeams = collectUniqueTeams(list);

    if (uniqueTeams.size <= 1) {
      const firstStatus = String(list[0] && list[0].status || "").toLowerCase();
      if (firstStatus === "inscrito") return "Equipo inscrito";
      return "Equipo pre-inscrito";
    }

    return "Equipos Pre-inscritos/Inscritos";
  }

  function formatCategoryCountLabel(count) {
    const total = Number(count) || 0;
    if (total === 1) return "1 categoría activa";
    return total + " categorías activas";
  }

  function formatActiveTeamsAndCategoriesLabel(teamCount, categoryCount) {
    const teams = Number(teamCount) || 0;
    const categories = Number(categoryCount) || 0;
    const teamsLabel = teams === 1 ? "1 equipo" : teams + " equipos";
    const categoriesLabel = categories === 1 ? "1 categoría activa" : categories + " categorías activas";
    return teamsLabel + " / " + categoriesLabel;
  }

  function countUniqueTeams(entries) {
    return collectUniqueTeams(entries).size;
  }

  function collectUniqueTeams(entries) {
    const list = Array.isArray(entries) ? entries : [];
    return new Set(
      list.map(function (entry) {
        const teamName = String(entry && entry.teamName || "").trim().toLowerCase();
        const fallback = String(entry && entry.id || "").split("|")[0];
        return teamName || fallback || "equipo";
      })
    );
  }

  function renderSectionB() {
    const missingLive = CATEGORY_ORDER.filter(function (category) {
      return getRenderableCategoryEntries(category).length === 0;
    });
    const missingSig = missingLive.join("|");
    if (missingSig !== state.lastMissingLiveSignature) {
      state.lastMissingLiveSignature = missingSig;
      if (missingLive.length) {
        console.info("[HubSport] categorias sin logos en fuente activa (cubiertas por fallback curado):", missingLive);
      }
    }

    const categories = CATEGORY_ORDER.filter(function (category) {
      return getRenderableCategoryEntries(category).length > 0 || getRenderableCategoryEntriesFromFallback(category).length > 0;
    });

    state.secondaryCategories = categories;
    if (el.sectionBNav) {
      el.sectionBNav.classList.remove("hidden");
      const canNavigate = categories.length > 1;
      el.sectionBNav.classList.toggle("is-disabled", !canNavigate);
      if (el.sectionBPrevBtn) el.sectionBPrevBtn.disabled = !canNavigate;
      if (el.sectionBNextBtn) el.sectionBNextBtn.disabled = !canNavigate;
    }
    if (!categories.length) {
      console.warn("[HubSport] Seccion B sin logos. Revisar categorias:", CATEGORY_ORDER.slice());
      el.sectionBTitle.textContent = "Categorías disponibles del evento";
      el.sectionBCategoryName.textContent = "Catálogo completo";
      el.sectionBCategoryMeta.textContent = "Categorías disponibles";
      el.sectionBStatus.classList.add("hidden");
      el.sectionBDeck.innerHTML = getRenderableEntries(curatedFallback).length
        ? renderCardCarousel(getRenderableEntries(curatedFallback), {
            forceMarquee: true,
            minItems: 8,
            trackClass: "section-marquee-track"
          })
        : "<div class='empty-state'>Revisar dataset curado de logos por categoria.</div>";
      return;
    }
    if (state.activeSectionBIndex >= categories.length) state.activeSectionBIndex = 0;
    const activeSecondary = categories[state.activeSectionBIndex] || categories[0];
    const sectionBPool = getRenderableCategoryEntries(activeSecondary);
    const stablePool = sectionBPool.length ? getStableDeck("sectionB|" + activeSecondary, sectionBPool) : getRenderableCategoryEntriesFromFallback(activeSecondary);
    const entries = stablePool.length ? stablePool : getRenderableEntries(curatedFallback);

    el.sectionBTitle.textContent = "Categorías disponibles del evento";
    el.sectionBCategoryName.textContent = activeSecondary;
    el.sectionBCategoryMeta.textContent = "Categorías disponibles";
    el.sectionBStatus.textContent = "";
    el.sectionBStatus.classList.add("hidden");
    const sectionBCopy = document.querySelector("#sectionBStatus").closest(".panel").querySelector(".section-copy");
    if (sectionBCopy) sectionBCopy.textContent = "";
    el.sectionBDeck.innerHTML = renderCardCarousel(entries, {
      forceMarquee: true,
      minItems: 8,
      trackClass: "section-marquee-track",
      statusBadgeResolver: shouldRenderSectionBStatusBadge
    });
  }

  function shouldRenderSectionBStatusBadge(entry) {
    if (resolveViewMode(state.viewMode) !== "real") {
      return resolveDemoBadgeState(entry);
    }
    const mode = String(state.runtime.dataMode || "");
    const hasRealSheetsData = mode === "apps-script-bootstrap-real" || mode === "apps-script-bootstrap-ipv";
    if (!hasRealSheetsData) return { showBadge: false };
    return hasRealStatusBacking(entry)
      ? { showBadge: true, statusText: entry.status || "Pre-inscrito", isInscribed: entry.status === "Inscrito" }
      : { showBadge: false };
  }

  function hasRealStatusBacking(entry) {
    const existsInTeams = existsEntryInSource(entry, "teams");
    const existsInInscritos = existsEntryInSource(entry, "preRegistered");
    return existsInTeams || existsInInscritos;
  }

  function existsEntryInSource(entry, sourceName) {
    const source = String(sourceName || "").trim();
    if (!source) return false;
    const targetSignature = buildEntrySignature(entry);
    return state.showcaseEntries.some(function (item) {
      if (String(item && item.source || "") !== source) return false;
      return buildEntrySignature(item) === targetSignature;
    });
  }

  function buildEntrySignature(entry) {
    const team = normalizeKey(entry && entry.teamName || "");
    const category = normalizeKey(entry && entry.categoryDisplay || "");
    const logo = normalizeAssetPath(entry && entry.logoUrl || "");
    return [team, category, logo].join("|");
  }

  function resolveDemoBadgeState(entry) {
    const map = getDemoBadgeStateMap();
    const key = buildDemoBadgeKey(entry);
    if (!map[key]) {
      map[key] = pickDemoBadgeState();
      persistDemoBadgeStateMap(map);
    }
    const stateValue = String(map[key] || "pre");
    if (stateValue === "none") {
      return { showBadge: false, statusText: "", isInscribed: entry && entry.status === "Inscrito" };
    }
    if (stateValue === "ins") {
      return { showBadge: true, statusText: "Inscrito", isInscribed: true };
    }
    return { showBadge: true, statusText: "Pre-inscrito", isInscribed: false };
  }

  function getDemoBadgeStateMap() {
    if (state.runtime.demoBadgeMap && typeof state.runtime.demoBadgeMap === "object") {
      return state.runtime.demoBadgeMap;
    }
    try {
      const raw = window.sessionStorage.getItem(DEMO_BADGE_SESSION_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      state.runtime.demoBadgeMap = parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
      state.runtime.demoBadgeMap = {};
    }
    return state.runtime.demoBadgeMap;
  }

  function persistDemoBadgeStateMap(map) {
    try {
      window.sessionStorage.setItem(DEMO_BADGE_SESSION_KEY, JSON.stringify(map || {}));
    } catch (_) {
    }
  }

  function buildDemoBadgeKey(entry) {
    const id = String(entry && entry.id || "").trim();
    if (id) return id;
    return [
      String(state.runtime.eventAlias || "ipv").trim().toLowerCase(),
      normalizeKey(entry && entry.teamName || ""),
      normalizeKey(entry && entry.categoryDisplay || ""),
      normalizeAssetPath(entry && entry.logoUrl || "")
    ].join("|");
  }

  function pickDemoBadgeState() {
    const states = ["pre", "pre", "pre", "ins", "ins", "none"];
    const randomIndex = Math.floor(Math.random() * states.length);
    return states[randomIndex] || "pre";
  }

  function startRotation() {
    startSectionARotation();
    startSectionBRotation();
  }

  function startSectionARotation() {
    if (state.rotation.sectionATimer) window.clearInterval(state.rotation.sectionATimer);
    state.rotation.sectionATimer = window.setInterval(function () {
      if (document.hidden || state.rotation.pausedA) return;
      if (state.activeCategories.length > 1) {
        state.activeCategoryIndex = (state.activeCategoryIndex + 1) % state.activeCategories.length;
        renderSectionA();
      }
    }, 24000);
  }

  function startSectionBRotation() {
    if (state.rotation.sectionBTimer) window.clearInterval(state.rotation.sectionBTimer);
    state.rotation.sectionBTimer = window.setInterval(function () {
      if (document.hidden || state.rotation.pausedB) return;
      if (state.secondaryCategories.length > 1) {
        state.activeSectionBIndex = (state.activeSectionBIndex + 1) % state.secondaryCategories.length;
        renderSectionB();
      }
    }, 24000);
  }

  function moveSectionACategory(delta) {
    if (!state.activeCategories.length) return;
    state.activeCategoryIndex = (state.activeCategoryIndex + delta + state.activeCategories.length) % state.activeCategories.length;
    renderSectionA();
  }

  function moveSectionBCategory(delta) {
    if (!state.secondaryCategories.length) return;
    state.activeSectionBIndex = (state.activeSectionBIndex + delta + state.secondaryCategories.length) % state.secondaryCategories.length;
    renderSectionB();
  }

  function getStableDeck(cacheKey, entries) {
    const incoming = entries || [];
    const fingerprint = incoming.map(function (entry) { return String(entry.id || ""); }).join("|");
    const cached = state.deckCache[cacheKey];
    if (cached && cached.fingerprint === fingerprint) return cached.items.slice();
    const shuffled = shuffle(incoming.slice());
    state.deckCache[cacheKey] = {
      fingerprint: fingerprint,
      items: shuffled.slice()
    };
    return shuffled;
  }

  function buildShowcaseEntries(preRegisteredProfiles, teams) {
    const entries = [];
    const consumedTeamIds = new Set();

    preRegisteredProfiles.forEach(function (profile) {
      profile.displayCategories.forEach(function (category) {
        const teamMatch = findTeamMatch(profile, category, teams);
        const logos = profile.logoUrls.length ? profile.logoUrls : [IPV_LOGO];
        logos.forEach(function (logoUrl, index) {
          entries.push({
            id: profile.email + "|" + category + "|" + index,
            sourceEmail: profile.email,
            teamName: profile.teamName || displayNameFromProfile(profile),
            categoryDisplay: category,
            branch: inferBranchFromCategory(category),
            logoUrl: logoUrl || IPV_LOGO,
            status: teamMatch ? "Inscrito" : "Pre-inscrito",
            statusVariant: teamMatch ? "conciliado" : "pre",
            source: "preRegistered"
          });
        });
        if (teamMatch) consumedTeamIds.add(teamMatch.id);
      });
    });

    teams.forEach(function (team) {
      if (consumedTeamIds.has(team.id)) return;
      entries.push({
        id: "team|" + team.id,
        sourceEmail: team.ownerEmail || "",
        teamName: team.name || "Equipo inscrito",
        categoryDisplay: mapTeamCategory(team.branch, team.category),
        branch: team.branch,
        logoUrl: IPV_LOGO,
        status: "Inscrito",
        statusVariant: "directo",
        source: "teams"
      });
    });

    return entries.sort(function (a, b) {
      return CATEGORY_ORDER.indexOf(a.categoryDisplay) - CATEGORY_ORDER.indexOf(b.categoryDisplay);
    });
  }

  function normalizePreRegisteredRecord(record) {
    const branches = splitMultiValue(record.branches).flatMap(splitAndWord);
    const categories = splitMultiValue(record.categories);
    return {
      email: String(record.email || "").trim().toLowerCase(),
      branches: unique(branches.map(normalizeBranchLabel).filter(Boolean)),
      categories: unique(categories.map(cleanCategoryLabel).filter(Boolean)),
      logoUrls: unique(splitMultiValue(record.logos).map(toDriveThumbnail).filter(Boolean)),
      teamName: String(record.teamName || "").trim(),
      contactName: [record.firstName, record.lastName].filter(Boolean).join(" ").trim(),
      phone: String(record.phone || "").trim(),
      displayCategories: expandDisplayCategories(categories, branches)
    };
  }

  function normalizeTeamRecord(record) {
    return {
      id: String(record.id || "").trim() || createId("team"),
      name: String(record.name || "").trim(),
      branch: String(record.branch || "").trim(),
      category: String(record.category || "").trim(),
      ownerEmail: normalizeEmail(record.ownerEmail || "")
    };
  }

  function buildDemoShowcaseSources() {
    const logoPool = unique(
      PRE_REGISTERED_SOURCE
        .map(function (row) { return splitMultiValue(row.logos || ""); })
        .reduce(function (acc, list) { return acc.concat(list); }, [])
        .map(toDriveThumbnail)
        .filter(Boolean)
    );
    const safeLogos = logoPool.length ? logoPool : [IPV_LOGO];
    const shuffledCategories = shuffle(CATEGORY_ORDER.slice());
    const demoPre = [];
    const demoTeams = [];
    shuffledCategories.forEach(function (category, idx) {
      const mapping = toDemoRawCategory(category);
      const baseName = "Demo " + String(idx + 1).padStart(2, "0");
      const email = "demo" + String(idx + 1).padStart(2, "0") + "@hub-sport.local";
      const logoA = safeLogos[idx % safeLogos.length];
      demoPre.push({
        email: email,
        branches: mapping.branch,
        categories: mapping.categoryRaw,
        logos: logoA,
        firstName: "Equipo",
        lastName: baseName,
        phone: "",
        teamName: baseName + " " + category
      });
      if (idx % 3 === 0 || idx % 5 === 0) {
        demoTeams.push({
          id: "demo-team-" + idx,
          name: baseName + " " + category,
          branch: mapping.branch,
          category: mapping.categoryRaw,
          ownerEmail: "inscrito" + idx + "@hub-sport.local"
        });
      }
    });
    return {
      preRegisteredRows: demoPre,
      teamRows: demoTeams
    };
  }

  async function resolveDemoDataset() {
    if (String(state.runtime.eventAlias || "").trim().toLowerCase() === "ipv") {
      return buildDemoShowcaseSources();
    }
    if (String(state.runtime.urlParams && state.runtime.urlParams.demoMode || "").trim().toLowerCase() === "premium") {
      return await buildPremiumDemoDataset();
    }
    return await buildGlobalDemoShowcaseSources();
  }

  async function buildPremiumDemoDataset() {
    const alias = String(state.runtime.eventAlias || "demo").trim().toLowerCase();
    const universe = await buildPremiumDemoUniverse(alias);
    return {
      preRegisteredRows: universe.preRegisteredRows,
      teamRows: universe.teamRows
    };
  }

  async function buildPremiumDemoUniverse(alias) {
    const categories = CATEGORY_ORDER.slice();
    const logoPool = await getPremiumDemoLogoPool(alias);
    const teams = buildPremiumDemoTeams(logoPool, alias);
    const assignments = assignPremiumTeamsToCategories(teams, categories);
    return {
      preRegisteredRows: curatePremiumSectionA(assignments.teams, alias),
      teamRows: curatePremiumSectionB(assignments.teams, alias)
    };
  }

  async function getPremiumDemoLogoPool(alias) {
    const folderId = normalizeFolderId(String((config.settings && config.settings.teamLogosFolderId) || ""));
    let images = [];
    if (folderId) {
      try {
        images = await getImages(folderId);
      } catch (_) {
        images = [];
      }
    }
    const normalized = uniqueBy(
      (images || []).map(normalizeImage).filter(function (item) { return item && item.url; }),
      function (item) { return safeImageUrl(item.url) || String(item.url || "").trim(); }
    );
    const derived = normalized.map(function (item, idx) {
      const label = guessTeamName(item.name || ("Equipo " + (idx + 1)));
      return {
        id: "logo-" + idx,
        name: label,
        logoUrl: safeImageUrl(item.url) || IPV_LOGO
      };
    });
    if (derived.length) return derived;
    const fallbackBase = buildDemoShowcaseSources();
    const fallbackLogos = unique(
      (fallbackBase.preRegisteredRows || [])
        .map(function (row) { return splitMultiValue(row.logos || ""); })
        .reduce(function (acc, list) { return acc.concat(list); }, [])
        .map(toDriveThumbnail)
        .filter(Boolean)
    );
    return fallbackLogos.map(function (url, idx) {
      return {
        id: "fallback-logo-" + idx,
        name: "Equipo " + String(idx + 1).padStart(2, "0"),
        logoUrl: url
      };
    });
  }

  function buildPremiumDemoTeams(logoPool, alias) {
    const MAX_CATEGORIES_PER_TEAM = 2;
    const categoriesCount = CATEGORY_ORDER.length || 13;
    const minTeams = Math.max(52, categoriesCount * 6);
    const base = (Array.isArray(logoPool) ? logoPool : []).slice();
    const teams = [];
    let index = 0;

    while (index < base.length) {
      const item = base[index];
      teams.push({
        id: "t-" + index,
        name: makeUniqueTeamName(item.name || ("Equipo " + (index + 1)), index),
        logoUrl: item.logoUrl || IPV_LOGO,
        status: "pre",
        categories: [],
        maxCategories: MAX_CATEGORIES_PER_TEAM
      });
      index += 1;
    }

    // Fallback premium si el pool real no alcanza densidad creíble.
    while (teams.length < minTeams) {
      const idx = teams.length;
      teams.push({
        id: "t-fallback-" + idx,
        name: makeUniqueTeamName("Escuadra " + (idx + 1), idx),
        logoUrl: buildDemoPlaceholderLogo(alias, "Escuadra " + (idx + 1), idx),
        status: "pre",
        categories: [],
        maxCategories: MAX_CATEGORIES_PER_TEAM
      });
    }

    const shuffled = shuffle(teams.slice());
    const insTarget = Math.round(shuffled.length * 0.6);
    shuffled.forEach(function (team, idx) {
      team.status = idx < insTarget ? "ins" : "pre";
    });
    return shuffled;
  }

  function assignPremiumTeamsToCategories(teams, categories) {
    const categoryList = Array.isArray(categories) ? categories.slice() : [];
    const workingTeams = Array.isArray(teams) ? teams.slice() : [];
    const perCategoryTarget = Math.max(6, Math.min(10, Math.floor((workingTeams.length * 1.18) / Math.max(1, categoryList.length))));
    const buckets = {};
    categoryList.forEach(function (category) { buckets[category] = []; });

    function pickLeastLoadedCategory(exclude) {
      const blocked = new Set(Array.isArray(exclude) ? exclude : []);
      return categoryList
        .filter(function (category) { return !blocked.has(category); })
        .sort(function (a, b) { return buckets[a].length - buckets[b].length; })[0] || categoryList[0];
    }

    // Asignación primaria (todos tienen al menos una categoría).
    workingTeams.forEach(function (team) {
      const cat = pickLeastLoadedCategory([]);
      team.categories = [cat];
      buckets[cat].push(team.id);
    });

    // Minoría con segunda categoría (realismo).
    const secondaryCount = Math.floor(workingTeams.length * 0.22);
    const candidates = shuffle(workingTeams.slice()).slice(0, secondaryCount);
    candidates.forEach(function (team) {
      if (team.categories.length >= team.maxCategories) return;
      const second = pickLeastLoadedCategory(team.categories);
      if (!second || team.categories.includes(second)) return;
      team.categories.push(second);
      buckets[second].push(team.id);
    });

    // Refuerzo de categorías subpobladas.
    categoryList.forEach(function (category) {
      while (buckets[category].length < perCategoryTarget) {
        const donor = workingTeams.find(function (team) {
          return team.categories.length < team.maxCategories && !team.categories.includes(category);
        });
        if (!donor) break;
        donor.categories.push(category);
        buckets[category].push(donor.id);
      }
    });

    // Orden visual curado para evitar repetición inmediata por categoría.
    categoryList.forEach(function (category) {
      const ids = buckets[category].slice();
      const teamById = {};
      workingTeams.forEach(function (team) { teamById[team.id] = team; });
      const ordered = [];
      let lastLogo = "";
      ids.forEach(function (id) {
        const sameLogoIndex = ids.findIndex(function (candidateId) {
          const team = teamById[candidateId];
          return team && team.logoUrl !== lastLogo && !ordered.includes(candidateId);
        });
        const chosenId = sameLogoIndex >= 0 ? ids[sameLogoIndex] : id;
        const chosen = teamById[chosenId];
        if (chosen) {
          ordered.push(chosenId);
          lastLogo = chosen.logoUrl || "";
        }
      });
      buckets[category] = unique(ordered);
    });

    return {
      teams: workingTeams,
      categories: buckets
    };
  }

  function curatePremiumSectionA(teams, alias) {
    const normalizedTeams = Array.isArray(teams) ? teams : [];
    return normalizedTeams.map(function (team, idx) {
      const mapped = (team.categories || []).map(function (category) { return toDemoRawCategory(category); });
      const branches = unique(mapped.map(function (item) { return item.branch; }));
      const categoriesRaw = unique(mapped.map(function (item) { return item.categoryRaw; }));
      return {
        email: "demo" + String(idx + 1).padStart(3, "0") + "@" + alias + ".hub-sport.local",
        branches: branches.join(", "),
        categories: categoriesRaw.join(", "),
        logos: team.logoUrl || IPV_LOGO,
        firstName: "Equipo",
        lastName: String(alias || "demo").toUpperCase(),
        phone: "",
        teamName: team.name
      };
    });
  }

  function curatePremiumSectionB(teams, alias) {
    const normalizedTeams = Array.isArray(teams) ? teams : [];
    const rows = [];
    normalizedTeams.forEach(function (team, idx) {
      if (team.status !== "ins") return;
      (team.categories || []).forEach(function (category, catIdx) {
        const mapped = toDemoRawCategory(category);
        rows.push({
          id: alias + "-premium-team-" + idx + "-" + catIdx,
          name: team.name,
          branch: mapped.branch,
          category: mapped.categoryRaw,
          ownerEmail: "inscrito" + idx + "@" + alias + ".hub-sport.local"
        });
      });
    });
    return rows;
  }

  function makeUniqueTeamName(baseName, index) {
    const safeBase = String(baseName || "Equipo")
      .replace(/\s+/g, " ")
      .trim() || "Equipo";
    return safeBase + " " + String(index + 1).padStart(2, "0");
  }

  async function buildGlobalDemoShowcaseSources() {
    const alias = String(state.runtime.eventAlias || "demo").trim().toLowerCase();
    const aliasLabel = alias.toUpperCase();
    const folderId = normalizeFolderId(String((config.settings && config.settings.teamLogosFolderId) || ""));
    let images = [];
    if (folderId) {
      try {
        images = await getImages(folderId);
      } catch (_) {
        images = [];
      }
    }

    const fallbackBase = buildDemoShowcaseSources();
    const fallbackLogos = unique(
      (fallbackBase.preRegisteredRows || [])
        .map(function (row) { return splitMultiValue(row.logos || ""); })
        .reduce(function (acc, list) { return acc.concat(list); }, [])
        .map(toDriveThumbnail)
        .filter(Boolean)
    );

    const logoEntries = uniqueBy(
      (images || []).map(normalizeImage).filter(function (item) { return item && item.url; }),
      function (item) { return safeImageUrl(item.url) || String(item.url || "").trim(); }
    );

    const categoryLogoPool = {};
    CATEGORY_ORDER.forEach(function (category) { categoryLogoPool[category] = []; });
    logoEntries.forEach(function (item, index) {
      const category = classifyLogoCategory(item.name || "", index);
      const url = safeImageUrl(item.url) || "";
      if (url && categoryLogoPool[category]) categoryLogoPool[category].push(url);
    });

    const allCatalogLogos = unique(
      logoEntries.map(function (item) { return safeImageUrl(item.url) || ""; }).filter(Boolean)
    );
    const allLogos = unique(allCatalogLogos.concat(fallbackLogos).filter(Boolean));
    const safeLogos = allLogos.length ? allLogos : [IPV_LOGO];

    const categories = shuffle(CATEGORY_ORDER.slice());
    const demoPre = [];
    const demoTeams = [];
    let lastLogoUsed = "";
    const logoUsage = {};
    const maxUsagePerLogo = Math.max(2, Math.ceil(categories.length / Math.max(1, safeLogos.length)));

    categories.forEach(function (category, idx) {
      const mapping = toDemoRawCategory(category);
      const teamName = aliasLabel + " Demo " + String(idx + 1).padStart(2, "0") + " " + category;
      const email = "demo" + String(idx + 1).padStart(2, "0") + "@" + alias + ".hub-sport.local";
      const preferredPool = categoryLogoPool[category] && categoryLogoPool[category].length
        ? shuffle(categoryLogoPool[category].slice())
        : shuffle(safeLogos.slice());
      let logoUrl = preferredPool[idx % preferredPool.length] || safeLogos[idx % safeLogos.length] || IPV_LOGO;
      const curated = preferredPool.concat(safeLogos).find(function (url) {
        const normalized = String(url || "");
        return normalized
          && normalized !== lastLogoUsed
          && (logoUsage[normalized] || 0) < maxUsagePerLogo;
      });
      if (curated) logoUrl = curated;
      if (logoUrl === lastLogoUsed && safeLogos.length > 1) {
        const alternative = safeLogos.find(function (url) { return url !== lastLogoUsed; });
        if (alternative) logoUrl = alternative;
      }
      lastLogoUsed = logoUrl;
      logoUsage[logoUrl] = (logoUsage[logoUrl] || 0) + 1;

      demoPre.push({
        email: email,
        branches: mapping.branch,
        categories: mapping.categoryRaw,
        logos: logoUrl,
        firstName: "Equipo",
        lastName: aliasLabel,
        phone: "",
        teamName: teamName
      });

      if (idx % 2 === 0 || idx % 5 === 0) {
        demoTeams.push({
          id: alias + "-demo-team-" + idx,
          name: teamName,
          branch: mapping.branch,
          category: mapping.categoryRaw,
          ownerEmail: "inscrito" + idx + "@" + alias + ".hub-sport.local"
        });
      }
    });

    if (safeLogos.length <= 2 && demoPre.length > 2) {
      demoPre.forEach(function (row, idx) {
        row.logos = buildDemoPlaceholderLogo(alias, row.teamName || row.categories, idx);
      });
    }

    return {
      preRegisteredRows: demoPre,
      teamRows: demoTeams
    };
  }

  function buildDemoPlaceholderLogo(alias, label, index) {
    const palette = ["#1a1426", "#2a1f3f", "#20314f", "#1f3d35", "#4f2e1d", "#2a2f5f"];
    const accent = ["#fbb400", "#ffd96a", "#f2c97f", "#e8b44d", "#f6d38f"];
    const bg = palette[index % palette.length];
    const fg = accent[index % accent.length];
    const safeAlias = escXml(String(alias || "EV").toUpperCase());
    const safeLabel = escXml(String(label || "Equipo").slice(0, 22));
    const svg = ""
      + "<svg xmlns='http://www.w3.org/2000/svg' width='900' height='680' viewBox='0 0 900 680'>"
      + "<rect width='900' height='680' fill='" + bg + "'/>"
      + "<circle cx='740' cy='126' r='170' fill='rgba(255,255,255,0.08)'/>"
      + "<text x='52' y='112' fill='" + fg + "' font-family='Manrope,Arial' font-size='54' font-weight='700'>" + safeAlias + "</text>"
      + "<text x='52' y='196' fill='rgba(255,255,255,0.92)' font-family='Rajdhani,Arial' font-size='66' font-weight='700'>" + safeLabel + "</text>"
      + "</svg>";
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function toDemoRawCategory(category) {
    if (/Menores/i.test(category)) return { branch: "Femenil", categoryRaw: "Menores (Cachi/Micro/Mini)" };
    if (/Infantil Menor/i.test(category)) return { branch: "Femenil", categoryRaw: "Infantil Menor" };
    if (/Secundaria Femenil/i.test(category)) return { branch: "Femenil", categoryRaw: "Secundaria" };
    if (/Secundaria Varonil/i.test(category)) return { branch: "Varonil", categoryRaw: "Secundaria" };
    if (/Preparatoria Femenil/i.test(category)) return { branch: "Femenil", categoryRaw: "Preparatoria" };
    if (/Preparatoria Varonil/i.test(category)) return { branch: "Varonil", categoryRaw: "Preparatoria" };
    if (/3[ªa]\s*Fuerza Femenil/i.test(category)) return { branch: "Femenil", categoryRaw: "3a Fuerza" };
    if (/3[ªa]\s*Fuerza Varonil/i.test(category)) return { branch: "Varonil", categoryRaw: "3a Fuerza" };
    if (/2[ªa]\s*Fuerza Libre Femenil/i.test(category)) return { branch: "Femenil", categoryRaw: "2a Fuerza" };
    if (/2[ªa]\s*Fuerza Femenil/i.test(category)) return { branch: "Femenil", categoryRaw: "2a Fuerza" };
    if (/2[ªa]\s*Fuerza Varonil/i.test(category)) return { branch: "Varonil", categoryRaw: "2a Fuerza" };
    if (/1[ªa]\s*Fuerza Varonil/i.test(category)) return { branch: "Varonil", categoryRaw: "Libre Var" };
    if (/Mixto Libre/i.test(category)) return { branch: "Mixto", categoryRaw: "Mixto Libre" };
    return { branch: "Femenil", categoryRaw: "Preparatoria" };
  }

  function normalizeIncomingPreRegisteredRow(row) {
    return {
      email: getField(row, ["email", "Direccion de correo electronico", "Dirección de correo electrónico", "correo", "Correo"]),
      branches: getField(row, ["branches", "branch", "Rama", "Rama (si aplica)"]),
      categories: getField(row, ["categories", "category", "Categoria(s)", "Categoría(s)"]),
      logos: getField(row, ["logos", "logo", "Logo(s)", "logoUrl", "logo_url"]),
      firstName: getField(row, ["firstName", "Nombres(s)", "Nombres", "nombre"]),
      lastName: [
        getField(row, ["lastName", "A. Paterno", "Apellido paterno"]),
        getField(row, ["A. Materno", "Apellido materno"])
      ].filter(Boolean).join(" ").trim(),
      phone: getField(row, ["phone", "Telefono de contacto", "Teléfono de contacto", "telefono"]),
      teamName: getField(row, ["teamName", "Nombre(s) de equipo", "Nombre del equipo", "team"])
    };
  }

  function normalizeIncomingTeamRow(row) {
    return {
      id: getField(row, ["id", "ID", "Id"]),
      name: getField(row, ["name", "Name", "Nombre", "teamName", "team"]),
      branch: getField(row, ["branch", "Branch", "Rama"]),
      category: getField(row, ["category", "Category", "Categoria", "Categoría"]),
      ownerEmail: getField(row, ["ownerEmail", "owneremail", "email", "Correo", "Dirección de correo electrónico"])
    };
  }

  function renderCarousel(urls, itemClass, altLabel) {
    if (!urls.length) {
      return "<div class='empty-state'>Sin elementos para mostrar.</div>";
    }

    const items = urls.map(function (url, index) {
      return "<div class='" + itemClass + "'><img src='" + esc(url) + "' alt='" + esc(altLabel + " " + (index + 1)) + "' onerror=\"this.src='" + IPV_LOGO + "'\"></div>";
    }).join("");

    return "<div class='carousel-track'><div class='carousel-group'>" + items + "</div><div class='carousel-group' aria-hidden='true'>" + items + "</div></div>";
  }

  function applyGlass() {
    const value = String(state.glassOpacity || "0.08").trim();
    document.documentElement.style.setProperty("--glass-opacity", value);
  }

  function hydrateVisualControls() {
    const savedOpacity = String(window.localStorage.getItem("hubSportLskGlassOpacity") || state.glassOpacity || "0.08");
    state.glassOpacity = savedOpacity;
    if (el.glassOpacityRange) el.glassOpacityRange.value = savedOpacity;
    updateOpacityValue();
  }

  function updateOpacityValue() {
    if (!el.glassOpacityValue) return;
    el.glassOpacityValue.textContent = Number(state.glassOpacity || "0.08").toFixed(2);
  }

  function toggleSidebar() {
    if (!el.sidebar) return;
    el.sidebar.classList.toggle("is-collapsed");
    const collapsed = el.sidebar.classList.contains("is-collapsed");
    el.sidebarToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
    el.sidebarToggle.innerHTML = "<span class='sidebar-toggle-icon' aria-hidden='true'>" + (collapsed ? "❯" : "❮") + "</span>";
  }

  function toggleLoginDropdown() {
    const next = el.loginDropdown.classList.contains("hidden");
    el.loginDropdown.classList.toggle("hidden", !next);
    if (next) renderAuthPanel();
  }

  function closeLoginDropdown() {
    el.loginDropdown.classList.add("hidden");
  }

  function initGoogleAuth(promptUser) {
    const clientId = String(config.googleClientId || "").trim();
    if (!clientId || !el.googleLoginButton) return;
    waitForGoogle().then(function () {
      if (!window.google || !window.google.accounts || !window.google.accounts.id) return;
      if (!state.googleReady) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse
        });
        state.googleReady = true;
      }
      el.googleLoginButton.innerHTML = "";
      window.google.accounts.id.renderButton(el.googleLoginButton, {
        theme: "outline",
        size: "large",
        shape: "pill",
        locale: "es"
      });
      if (promptUser) return;
    }).catch(function () {});
  }

  function handleCredentialResponse(response) {
    try {
      const payload = decodeJwt(response && response.credential);
      if (!payload || !payload.email) return;
      state.loggedUser = {
        email: String(payload.email || "").trim().toLowerCase(),
        name: payload.name || payload.email
      };
      localStorage.setItem(config.sessionStorageKey || "hub-sport-session", JSON.stringify(state.loggedUser));
      adoptLoggedUserAsSource();
      closeLoginDropdown();
      renderAll();
    } catch (_) {}
  }

  function logout() {
    state.loggedUser = null;
    localStorage.removeItem(config.sessionStorageKey || "hub-sport-session");
    state.activeSourceEmail = getInitialSourceEmail();
    hideLoginTooltipImmediate();
    closeLoginDropdown();
    renderAll();
  }

  function adoptLoggedUserAsSource() {
    const email = normalizeEmail(state.loggedUser && state.loggedUser.email);
    if (!email) return;
    if (state.sourceProfiles.some(function (profile) { return profile.email === email; })) {
      state.activeSourceEmail = email;
      syncUrl();
      return;
    }
    state.activeSourceEmail = "";
    syncUrl();
  }

  async function hydrateLogoCatalogs() {
    const sponsorsFolderId = normalizeFolderId(String((config.settings && config.settings.sponsorsFolderId) || ""));
    if (sponsorsFolderId) {
      try {
        const sponsorImages = await getImages(sponsorsFolderId);
        // Se conservan todas las imágenes entregadas por la carpeta (sin deduplicar)
        // para respetar el inventario visual completo de patrocinadores.
        state.sponsorLogoUrls = sponsorImages
          .map(function (item) { return safeImageUrl(item.url); })
          .filter(Boolean);
      } catch (error) {
        console.warn("[HubSport] no se pudieron cargar logos de patrocinadores", error);
      }
    }

    const teamLogosFolderId = normalizeFolderId(String((config.settings && config.settings.teamLogosFolderId) || ""));
    if (teamLogosFolderId) {
      try {
        const teamImages = await getImages(teamLogosFolderId);
        state.externalLogoEntries = buildExternalLogoEntries(teamImages);
      } catch (error) {
        console.warn("[HubSport] no se pudo cargar catálogo masivo de logos", error);
      }
    }
  }

  function buildExternalLogoEntries(images) {
    const rows = Array.isArray(images) ? images : [];
    const byCategory = {};
    CATEGORY_ORDER.forEach(function (category) { byCategory[category] = 0; });
    const entries = rows.map(function (item, index) {
      const rawName = String(item.name || "");
      const category = classifyLogoCategory(rawName, index);
      byCategory[category] = (byCategory[category] || 0) + 1;
      return {
        id: "drive|" + index + "|" + rawName,
        sourceEmail: "",
        teamName: guessTeamName(rawName),
        categoryDisplay: category,
        branch: inferBranchFromCategory(category),
        logoUrl: safeImageUrl(item.url) || IPV_LOGO,
        status: "Pre-inscrito",
        statusVariant: "drive",
        source: "driveCatalog"
      };
    }).filter(function (entry) { return Boolean(entry.logoUrl); });

    const missing = CATEGORY_ORDER.filter(function (category) {
      return !byCategory[category];
    });
    if (missing.length) {
      console.info("[HubSport] categorías sin logos clasificados en catálogo masivo:", missing);
    }
    return entries;
  }

  function classifyLogoCategory(fileName, index) {
    const cleaned = String(fileName || "").toLowerCase();
    const rules = ((config.settings && config.settings.logoCategoryRules) || []);
    for (let i = 0; i < rules.length; i += 1) {
      const rule = rules[i] || {};
      if (!rule.pattern || !rule.category) continue;
      if (cleaned.indexOf(String(rule.pattern).toLowerCase()) >= 0 && CATEGORY_ORDER.includes(rule.category)) {
        return rule.category;
      }
    }
    return CATEGORY_ORDER[index % CATEGORY_ORDER.length];
  }

  function guessTeamName(fileName) {
    return String(fileName || "Equipo")
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Equipo";
  }

  function normalizeFolderId(input) {
    const raw = String(input || "").trim();
    if (!raw) return "";
    const match = raw.match(/\/folders\/([^/?#]+)/i);
    if (match && match[1]) return match[1];
    return raw;
  }

  async function loadBackgroundFromDrive() {
    const folderId = String((config.settings && config.settings.backgroundFolderId) || "").trim();
    if (!folderId) return;
    try {
      const images = await getImages(folderId);
      if (!images.length) return;
      const preferred = normalizePreferredImageName(String((config.settings && config.settings.backgroundPreferredName) || ""));
      const selected = images.find(function (item) {
        return normalizePreferredImageName(item.name || "") === preferred;
      }) || images[0];
      applyBackground(selected.url);
    } catch (error) {
      console.warn("No se pudo cargar fondo de Drive", error);
    }
  }

  function applyEventBranding() {
    const alias = String(state.runtime.eventAlias || "ipv").trim().toLowerCase();
    const aliasUpper = alias.toUpperCase();
    document.title = "Hub Sport " + aliasUpper;
    const heroTitle = document.getElementById("heroEventTitle");
    if (heroTitle) heroTitle.textContent = "Hub Sport " + aliasUpper;
    const heroEyebrow = document.getElementById("heroEventEyebrow");
    if (heroEyebrow) heroEyebrow.textContent = "Temporada 2026 · " + aliasUpper;
    const loadingLogo = document.getElementById("loadingEventLogo");
    if (loadingLogo) {
      const resolved = state.runtime.eventLogo || resolveEventLogo(alias);
      loadingLogo.onerror = function () {
        this.onerror = null;
        this.src = IPV_LOGO;
      };
      loadingLogo.src = resolved || IPV_LOGO;
      loadingLogo.alt = "Logo " + aliasUpper;
    }
  }

  function resolveEventLogo(eventAlias) {
    const alias = String(eventAlias || state.runtime.eventAlias || "ipv").trim().toLowerCase();
    const map = (config.events && config.events.logosByAlias) || {};
    const direct = String(map[alias] || "").trim();
    if (direct) return safeImageUrl(direct) || direct;
    const conventional = "assets/logo-" + alias + ".png";
    if (alias && alias !== "ipv") return conventional;
    const fallback = String((config.events && config.events.fallbackLogo) || IPV_LOGO).trim();
    return fallback || IPV_LOGO;
  }

  async function hydrateEventLogo() {
    const alias = String(state.runtime.eventAlias || "ipv").trim().toLowerCase();
    const folderId = normalizeFolderId(String((config.events && config.events.logosFolderId) || "").trim());
    state.runtime.eventLogo = resolveEventLogo(alias);
    if (!folderId) return;
    try {
      const images = await getImages(folderId);
      const byAlias = images.find(function (item) {
        const name = normalizeKey(item && item.name || "");
        return name.indexOf(normalizeKey(alias)) >= 0;
      });
      if (byAlias && byAlias.url) {
        state.runtime.eventLogo = safeImageUrl(byAlias.url) || state.runtime.eventLogo;
      }
    } catch (_) {
    }
  }

  function waitForFonts() {
    if (!document.fonts || !document.fonts.ready) {
      return Promise.resolve();
    }
    return document.fonts.ready.catch(function () {
      return null;
    });
  }

  function setLoadingProgress(completedSteps) {
    const safeSteps = Math.max(0, Math.min(LOADING_STEP_COUNT, Number(completedSteps) || 0));
    const percentage = Math.round((safeSteps / LOADING_STEP_COUNT) * 100);
    if (el.loadingLabel) {
      el.loadingLabel.textContent = "... by iPV";
    }
    if (el.loadingPercent) {
      el.loadingPercent.textContent = String(percentage) + "%";
    }
    if (!el.loadingProgressTrack) return;
    const slots = Array.from(el.loadingProgressTrack.querySelectorAll(".loading-progress-slot"));
    slots.forEach(function (slot, index) {
      const isFilled = index < safeSteps;
      slot.textContent = isFilled ? "π" : "";
      slot.classList.toggle("is-filled", isFilled);
    });
    if (!state.runtime.puzzleMode || state.runtime.puzzleStarted) {
      updateLoadingStorytelling(percentage);
    }
  }

  function updateLoadingStorytelling(percentage) {
    if (!el.loadingStoryPanel || !el.loadingStoryImage || !el.loadingStoryPuzzle) return;
    ensureLoadingStoryPuzzleTiles();
    const phaseIndex = resolveStoryPhaseIndexByProgress(percentage);
    const phase = STORY_PHASES[phaseIndex] || STORY_PHASES[0];
    if (!phase) return;
    const sequence = resolveStoryVisualSequence();
    const panelFrame = sequence[Math.min(phaseIndex, sequence.length - 1)] || sequence[0];
    const backgroundIndex = Math.max(0, Math.min(sequence.length - 1, phaseIndex - 1));
    const backgroundFrame = sequence[backgroundIndex] || panelFrame;
    const panelText = resolveStoryFrameText(panelFrame, phase);
    const storySrc = resolveStoryFrameAsset(panelFrame, phase);
    if (storySrc) {
      const fallbackVisual = resolveStoryFallbackVisual(phase);
      el.loadingStoryImage.onerror = function () {
        this.onerror = null;
        this.src = fallbackVisual;
      };
      const frameSignature = resolveStoryFrameSignature(panelFrame);
      if (state.loadingStory.lastFrameSignature !== frameSignature) {
        el.loadingStoryImage.classList.add("is-updating");
        window.setTimeout(function () {
          applyLoadingStoryText(panelText);
          el.loadingStoryImage.src = storySrc;
          el.loadingStoryImage.classList.remove("is-updating");
        }, 80);
      } else if (!el.loadingStoryImage.getAttribute("src")) {
        applyLoadingStoryText(panelText);
        el.loadingStoryImage.src = storySrc;
      } else {
        applyLoadingStoryText(panelText);
      }
      const backgroundSrc = resolveStoryFrameAsset(backgroundFrame, phase) || fallbackVisual;
      applyLoadingStoryBackground(backgroundSrc);
      state.loadingStory.currentFrame = panelFrame;
      state.loadingStory.currentStorySrc = storySrc;
      state.loadingStory.lastFrameSignature = frameSignature;
    }
    const tiles = Array.from(el.loadingStoryPuzzle.querySelectorAll(".loading-story-tile"));
    const revealCount = Math.max(1, Math.min(tiles.length, Math.ceil((Number(percentage) / 100) * tiles.length)));
    tiles.forEach(function (tile, index) {
      tile.classList.toggle("is-revealed", index < revealCount);
    });
  }

  function ensureLoadingStoryPuzzleTiles() {
    if (state.loadingStory.tilesBuilt) return;
    if (!el.loadingStoryPuzzle) return;
    const tiles = [];
    for (let i = 0; i < 9; i += 1) {
      tiles.push("<span class='loading-story-tile'></span>");
    }
    el.loadingStoryPuzzle.innerHTML = tiles.join("");
    state.loadingStory.tilesBuilt = true;
  }

  function resolveStoryPhaseIndexByProgress(percentage) {
    const pct = Math.max(0, Math.min(100, Number(percentage) || 0));
    return Math.min(STORY_PHASES.length - 1, Math.floor((pct / 100) * (STORY_PHASES.length - 1)));
  }

  function resolveStoryPhaseByProgress(percentage) {
    const index = resolveStoryPhaseIndexByProgress(percentage);
    return STORY_PHASES[index] || STORY_PHASES[0];
  }

  function resolveStoryVisualSequence() {
    if (state.runtime.puzzleVariant !== "categoria") {
      return STORY_PHASES.map(function (phase) {
        return { type: "phase", key: phase.key };
      });
    }
    return [
      { type: "category", categoryKey: "iniciacion", branchKey: "mixto" },
      { type: "category", categoryKey: "infantil", branchKey: "mixto" },
      { type: "category", categoryKey: "secundaria_femenil", branchKey: "femenil" },
      { type: "category", categoryKey: "secundaria_varonil", branchKey: "varonil" },
      { type: "category", categoryKey: "prepa_femenil", branchKey: "femenil" },
      { type: "category", categoryKey: "prepa_varonil", branchKey: "varonil" },
      { type: "category", categoryKey: "competitivo", branchKey: "femenil" },
      { type: "category", categoryKey: "competitivo", branchKey: "varonil" },
      { type: "category", categoryKey: "alto", branchKey: "mixto" }
    ];
  }

  function resolveStoryFrameSignature(frame) {
    const item = frame || {};
    if (item.type === "category") return ["category", item.categoryKey || "", item.branchKey || ""].join("|");
    return ["phase", item.key || ""].join("|");
  }

  function resolveStoryFrameAsset(frame, phaseRef) {
    const item = frame || {};
    if (item.type === "category") {
      const branchKey = normalizeStoryBranchKey(item.branchKey || resolvePrimaryBranchForStory());
      const ramaAsset = resolveStoryRamaAsset(branchKey) || STORY_ASSET_MAP.base.portada;
      return resolveStoryCategoryAsset(item.categoryKey, ramaAsset, branchKey)
        || resolveStoryFallbackVisual(phaseRef || STORY_PHASES[0]);
    }
    return resolveStoryPhaseAsset(item.key || "portada");
  }

  function resolveStoryFrameText(frame, phaseRef) {
    const item = frame || {};
    if (item.type === "category") {
      const i4Key = normalizeStoryCategoryKey(item.categoryKey);
      const categoryText = STORY_TEXT_MAP.categoria[i4Key];
      if (categoryText) return categoryText;
    }
    const phaseKey = String(item.key || phaseRef && phaseRef.key || "portada").toLowerCase();
    const baseText = STORY_TEXT_MAP.base[phaseKey];
    if (baseText) return baseText;
    return {
      title: String(phaseRef && phaseRef.title || "Hub Sport"),
      caption: String(phaseRef && phaseRef.caption || "Preparando experiencia del evento...")
    };
  }

  function applyLoadingStoryText(text) {
    const safe = text || {};
    if (el.loadingStoryStage) el.loadingStoryStage.textContent = String(safe.title || "Hub Sport");
    if (el.loadingStoryCaption) el.loadingStoryCaption.textContent = String(safe.caption || "Preparando experiencia del evento...");
  }

  function resolveStoryPhaseAsset(phaseKey) {
    const key = String(phaseKey || "portada").trim().toLowerCase();
    const fallbackLogo = state.runtime.eventLogo || IPV_LOGO;
    if (key === "rama") {
      return resolveStoryRamaAsset(resolvePrimaryBranchForStory()) || fallbackLogo;
    }
    if (key === "categoria") {
      const branchKey = normalizeStoryBranchKey(resolvePrimaryBranchForStory());
      const ramaAsset = resolveStoryRamaAsset(branchKey) || STORY_ASSET_MAP.base.portada;
      return resolveStoryCategoryAsset(resolveNormalizedCategoryForStory(), ramaAsset, branchKey) || fallbackLogo;
    }
    return STORY_ASSET_MAP.base[key] || fallbackLogo;
  }

  function resolvePrimaryBranchForStory() {
    const fromProfiles = state.sourceProfiles
      .map(function (profile) { return (profile.branches || [])[0]; })
      .map(normalizeBranchLabel)
      .find(Boolean);
    if (fromProfiles) return fromProfiles.toLowerCase();
    const fromEntries = state.showcaseEntries
      .map(function (entry) { return inferBranchFromCategory(entry.categoryDisplay || ""); })
      .find(Boolean);
    return String(fromEntries || "mixto").toLowerCase();
  }

  function resolvePrimaryCategoryForStory() {
    const fromEntries = state.showcaseEntries
      .map(function (entry) { return String(entry && entry.categoryDisplay || "").trim(); })
      .find(Boolean);
    if (fromEntries) return fromEntries;
    const fromSource = state.sourceProfiles
      .map(function (profile) { return (profile.displayCategories || [])[0]; })
      .find(Boolean);
    return fromSource || CATEGORY_ORDER[0] || "";
  }

  function resolveNormalizedCategoryForStory() {
    const raw = String(resolvePrimaryCategoryForStory() || "").toLowerCase();
    return normalizeStoryCategoryKey(raw) || "i4-1";
  }

  function normalizeStoryBranchKey(branchKey) {
    const key = String(branchKey || "").toLowerCase();
    if (/fem|femenil/.test(key)) return "femenil";
    if (/var|varonil/.test(key)) return "varonil";
    if (/mix|mixto|mixed/.test(key)) return "mixto";
    return "mixto";
  }

  function resolveStoryRamaAsset(branchKey) {
    const key = normalizeStoryBranchKey(branchKey);
    if (/femenil/.test(key)) return STORY_ASSET_MAP.rama.femenil;
    if (/varonil/.test(key)) return STORY_ASSET_MAP.rama.varonil;
    return STORY_ASSET_MAP.rama.mixto;
  }

  function normalizeStoryCategoryKey(categoryKey) {
    const raw = String(categoryKey || "").toLowerCase().trim();
    if (!raw) return "";
    if (/^i4-[1-8]$/.test(raw)) return raw;
    if (raw === "iniciacion") return "i4-1";
    if (raw === "infantil") return "i4-2";
    if (raw === "secundaria_femenil") return "i4-3";
    if (raw === "secundaria_varonil") return "i4-4";
    if (raw === "prepa_femenil") return "i4-5";
    if (raw === "prepa_varonil") return "i4-6";
    if (/menores|iniciaci|cachi|micro/.test(raw)) return "i4-1";
    if (/infantil/.test(raw)) return "i4-2";
    if (/secundaria/.test(raw) && /femenil|fem/.test(raw)) return "i4-3";
    if (/secundaria/.test(raw) && /varonil|var/.test(raw)) return "i4-4";
    if (/preparatoria|prepa/.test(raw) && /femenil|fem/.test(raw)) return "i4-5";
    if (/preparatoria|prepa/.test(raw) && /varonil|var/.test(raw)) return "i4-6";
    if (/(3a|3ª|3ra|tercera)/.test(raw) && /fuerza|competitivo|libre/.test(raw)) return "i4-7";
    if (/(1a|1ª|2a|2ª|1ra|2da|primera|segunda)/.test(raw) && /fuerza|competitivo|libre|alto/.test(raw)) return "i4-8";
    if (/alto|competitivo|libre|fuerza/.test(raw)) return "i4-8";
    return raw;
  }

  function resolveStoryCategoryAsset(categoryKey, fallbackAsset, branchKey) {
    const key = normalizeStoryCategoryKey(categoryKey);
    const rawKey = String(categoryKey || "").toLowerCase().trim();
    const branch = normalizeStoryBranchKey(branchKey);
    const byCategory = STORY_ASSET_MAP.categoria[key] || STORY_ASSET_MAP.categoria[rawKey];
    if (byCategory && typeof byCategory === "object") {
      const byBranch = byCategory[branch];
      if (byBranch) return byBranch;
      if (byCategory.default) return byCategory.default;
    }
    if (typeof byCategory === "string" && byCategory) return byCategory;
    const ramaFallback = resolveStoryRamaAsset(branch) || fallbackAsset;
    if (ramaFallback) return ramaFallback;
    return fallbackAsset || STORY_ASSET_MAP.base.portada || IPV_LOGO;
  }

  function resolveStoryFallbackVisual(phase) {
    const candidate = state.runtime.eventLogo || IPV_LOGO;
    if (candidate && candidate !== IPV_LOGO) return candidate;
    return buildStoryPlaceholderDataUrl(phase);
  }

  function buildStoryPlaceholderDataUrl(phase) {
    const item = phase || STORY_PHASES[0];
    const alias = String(state.runtime.eventAlias || "ipv").trim().toUpperCase();
    const title = String(item.title || "Hub Sport");
    const caption = String(item.caption || "").slice(0, 64);
    const svg = ""
      + "<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'>"
      + "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>"
      + "<stop offset='0%' stop-color='#1a1426'/>"
      + "<stop offset='100%' stop-color='#2b1f3f'/>"
      + "</linearGradient></defs>"
      + "<rect width='1600' height='900' fill='url(#g)'/>"
      + "<circle cx='1320' cy='130' r='260' fill='rgba(251,180,0,0.20)'/>"
      + "<circle cx='280' cy='760' r='320' fill='rgba(255,255,255,0.08)'/>"
      + "<text x='84' y='122' fill='#FFE7A2' font-family='Manrope,Arial' font-size='36'>HUB SPORT " + escXml(alias) + "</text>"
      + "<text x='84' y='188' fill='#FFFFFF' font-family='Rajdhani,Arial' font-size='72' font-weight='700'>" + escXml(title) + "</text>"
      + "<text x='84' y='238' fill='rgba(245,238,220,0.9)' font-family='Manrope,Arial' font-size='26'>" + escXml(caption) + "</text>"
      + "</svg>";
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function waitMs(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, Number(ms) || 0);
    });
  }

  function hideLoader() {
    clearPuzzleModeTimer();
    syncLoadingStoryBackgroundToCurrentFrame();
    window.requestAnimationFrame(function () {
      document.body.classList.remove("app-loading");
    });
  }

  function applyLoadingStoryBackground(imageUrl) {
    if (!el.loadingOverlay) return;
    const safeUrl = safeImageUrl(imageUrl || "");
    if (!safeUrl) return;
    el.loadingOverlay.style.backgroundImage =
      "linear-gradient(180deg, rgba(10, 7, 18, 0.62), rgba(10, 7, 18, 0.86)), " +
      "radial-gradient(circle at top center, rgba(251, 180, 0, 0.16), transparent 34%), " +
      "url('" + safeUrl + "')";
    el.loadingOverlay.style.backgroundSize = "cover";
    el.loadingOverlay.style.backgroundPosition = "center";
    el.loadingOverlay.style.backgroundRepeat = "no-repeat";
  }

  function syncLoadingStoryBackgroundToCurrentFrame() {
    const currentSrc = safeImageUrl(state.loadingStory.currentStorySrc || "");
    if (currentSrc) {
      applyLoadingStoryBackground(currentSrc);
      return;
    }
    const currentFrame = state.loadingStory.currentFrame;
    if (!currentFrame) return;
    const phase = STORY_PHASES[Math.max(0, state.runtime.puzzlePhaseIndex)] || STORY_PHASES[STORY_PHASES.length - 1];
    const resolved = resolveStoryFrameAsset(currentFrame, phase);
    if (resolved) applyLoadingStoryBackground(resolved);
  }

  function showPuzzleStartButton() {
    const loader = document.querySelector("#loader") || el.loadingOverlay || document.querySelector("#loadingOverlay");
    if (!loader) return;
    if (loader.querySelector(".puzzle-start-btn")) return;
    const btn = document.createElement("button");
    btn.innerText = "Ir";
    btn.className = "puzzle-start-btn";
    btn.onclick = function () {
      startPuzzleModeSequence(180, true);
    };
    loader.appendChild(btn);
  }

  function clearPuzzleModeTimer() {
    if (state.runtime.puzzleTimer) {
      window.clearInterval(state.runtime.puzzleTimer);
      state.runtime.puzzleTimer = null;
    }
  }

  function startPuzzleModeSequence(intervalMs, forceFast) {
    const duration = Number(intervalMs) > 0 ? Number(intervalMs) : 5000;
    const fast = Boolean(forceFast);
    clearPuzzleModeTimer();
    state.runtime.puzzleStarted = true;
    if (fast) {
      const btn = document.querySelector(".puzzle-start-btn");
      if (btn) btn.remove();
    }
    const totalPhases = resolveStoryVisualSequence().length || STORY_PHASES.length;
    let index = fast ? state.runtime.puzzlePhaseIndex : 0;
    if (index >= totalPhases) index = 0;
    state.runtime.puzzlePhaseIndex = index;

    function renderPhase(phaseIndex) {
      const pct = Math.round(((phaseIndex + 1) / totalPhases) * 100);
      updateLoadingStorytelling(pct);
      if (el.loadingPercent) el.loadingPercent.textContent = String(pct) + "%";
      if (el.loadingProgressTrack) {
        const slots = Array.from(el.loadingProgressTrack.querySelectorAll(".loading-progress-slot"));
        const filled = Math.round((pct / 100) * LOADING_STEP_COUNT);
        slots.forEach(function (slot, i) {
          const isFilled = i < filled;
          slot.textContent = isFilled ? "π" : "";
          slot.classList.toggle("is-filled", isFilled);
        });
      }
    }

    renderPhase(index);
    state.runtime.puzzleTimer = window.setInterval(function () {
      index += 1;
      state.runtime.puzzlePhaseIndex = index;
      if (index >= totalPhases) {
        clearPuzzleModeTimer();
        hideLoader();
        return;
      }
      renderPhase(index);
    }, duration);
  }

  function startStorytellingSequence() {
    startPuzzleModeSequence(180, true);
  }

  async function getImages(folderId) {
    if (!folderId) return [];
    const cacheKey = (config.imageCachePrefix || "hub_sport_cache_") + folderId;
    const ttl = Number(config.imageCacheTtlMs || 300000);
    const cache = readJson(cacheKey, null);
    if (cache && Date.now() - cache.timestamp < ttl) return cache.images || [];
    const url = String(config.appsScriptUrl || "").trim();
    if (!url) return [];
    const response = await fetch(url + "?action=getImages&folderId=" + encodeURIComponent(folderId));
    const json = await response.json();
    const payload =
      Array.isArray(json) ? json :
      Array.isArray(json.data) ? json.data :
      Array.isArray(json.images) ? json.images :
      json.data && Array.isArray(json.data.images) ? json.data.images :
      [];
    const images = payload.map(normalizeImage).filter(function (item) { return item.url; });
    window.localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), images: images }));
    return images;
  }

  function applyBackground(url) {
    const target = document.querySelector(".app-background");
    const imageUrl = safeImageUrl(url || "");
    if (!target || !imageUrl) return;
    target.style.backgroundImage =
      "linear-gradient(180deg, rgba(13, 10, 20, 0.18), rgba(13, 10, 20, 0.58)), " +
      "radial-gradient(circle at top center, rgba(251, 180, 0, 0.18), transparent 25%), " +
      "url('" + imageUrl + "')";
    target.style.backgroundSize = "cover";
    target.style.backgroundPosition = "center";
    target.style.backgroundRepeat = "no-repeat";
  }

  function renderCardCarousel(entries, options) {
      const opts = options || {};
      const forceMarquee = Boolean(opts.forceMarquee);
      const minItems = Number(opts.minItems) > 0 ? Number(opts.minItems) : 0;
      const trackClass = String(opts.trackClass || "").trim();
      const singularTravel = Boolean(opts.singularTravel);
      const statusBadgeResolver = typeof opts.statusBadgeResolver === "function" ? opts.statusBadgeResolver : null;
      if (!entries || !entries.length) {
        return "<div class='empty-state'>Sin elementos para mostrar.</div>";
      }
      if (entries.length === 1 && singularTravel) {
        const travelItem = renderCardCarouselItem(entries[0], statusBadgeResolver ? statusBadgeResolver(entries[0]) : true);
        return "<div class='logo-carousel-single-travel'>" + travelItem + "</div>";
      }
      if (entries.length === 1 && !forceMarquee) {
        return "<div class='logo-carousel-single'>" + renderCardCarouselItem(entries[0], statusBadgeResolver ? statusBadgeResolver(entries[0]) : true) + "</div>";
      }

    const baseEntries = entries.slice();
    const renderEntries = (forceMarquee && minItems > baseEntries.length)
      ? repeatEntriesToLength(baseEntries, minItems)
      : baseEntries;

      const items = renderEntries.map(function (entry) {
        return renderCardCarouselItem(entry, statusBadgeResolver ? statusBadgeResolver(entry) : true);
      }).join("");
      const trackClasses = ["carousel-track"];
      if (trackClass) trackClasses.push(trackClass);
      return "<div class='" + trackClasses.join(" ") + "'><div class='carousel-group'>" + items + "</div><div class='carousel-group' aria-hidden='true'>" + items + "</div></div>";
    }

  function renderCardCarouselItem(entry, badgeConfig) {
      let showStatusBadge = true;
      let statusText = entry.status || "Pre-inscrito";
      let isInscribed = entry.status === "Inscrito";
      if (typeof badgeConfig === "boolean") {
        showStatusBadge = badgeConfig;
      } else if (badgeConfig && typeof badgeConfig === "object") {
        if (badgeConfig.showBadge === false) showStatusBadge = false;
        if (badgeConfig.statusText) statusText = String(badgeConfig.statusText);
        if (typeof badgeConfig.isInscribed === "boolean") isInscribed = badgeConfig.isInscribed;
      }
      const itemClass = "team-logo-item section-logo-item" + (isInscribed ? " is-inscribed" : " is-pre");
      const label = [entry.teamName, entry.categoryDisplay, statusText].filter(Boolean).join(" · ");
      const badge = showStatusBadge === false
        ? ""
        : "<span class='section-logo-badge'>" + esc(statusText) + "</span>";
      return "<div class='" + itemClass + "' title='" + esc(label) + "'><img src='" + esc(entry.logoUrl || IPV_LOGO) + "' alt='" + esc(entry.teamName || "Equipo") + "' onerror=\"this.src='" + IPV_LOGO + "'\">" + badge + "</div>";
    }

  function repeatEntriesToLength(entries, targetLength) {
    const source = Array.isArray(entries) ? entries : [];
    if (!source.length) return [];
    const output = [];
    for (let i = 0; i < targetLength; i += 1) {
      output.push(source[i % source.length]);
    }
    return output;
  }

  function buildCuratedFallbackEntries() {
    const demo = buildDemoShowcaseSources();
    const normalizedPre = (demo.preRegisteredRows || []).map(normalizePreRegisteredRecord);
    const normalizedTeams = (demo.teamRows || []).map(normalizeTeamRecord);
    return buildShowcaseEntries(normalizedPre, normalizedTeams);
  }

  function findTeamMatch(profile, category, teams) {
    const sourceName = normalizeKey(profile.teamName || displayNameFromProfile(profile));
    return teams.find(function (team) {
      const teamCategory = mapTeamCategory(team.branch, team.category);
      if (teamCategory !== category) return false;
      if (!sourceName) return false;
      const teamName = normalizeKey(team.name || "");
      return sourceName.indexOf(teamName) >= 0 || teamName.indexOf(sourceName) >= 0;
    }) || null;
  }

  function expandDisplayCategories(rawCategories, rawBranches) {
    const categories = [];
    const branches = unique(rawBranches.map(normalizeBranchLabel));

    rawCategories.map(cleanCategoryLabel).forEach(function (category) {
      if (category === "Menores (Cachi/Mini/Micro)") {
        categories.push("Menores (Cachi/Mini/Micro)");
        return;
      }
      if (category === "Infantil Menor") {
        categories.push("Infantil Menor");
        return;
      }
      if (category === "Secundaria") {
        if (branches.includes("Femenil")) categories.push("Secundaria Femenil");
        if (branches.includes("Varonil")) categories.push("Secundaria Varonil");
        return;
      }
      if (category === "Preparatoria") {
        if (branches.includes("Femenil")) categories.push("Preparatoria Femenil");
        if (branches.includes("Varonil")) categories.push("Preparatoria Varonil");
        return;
      }
      if (category === "3ª Fuerza") {
        if (branches.includes("Femenil")) categories.push("3ª Fuerza Femenil");
        if (branches.includes("Varonil")) categories.push("3ª Fuerza Varonil");
        return;
      }
      if (category === "2ª Fuerza") {
        if (branches.includes("Femenil")) categories.push("2ª Fuerza Femenil");
        if (branches.includes("Varonil")) categories.push("2ª Fuerza Varonil");
        return;
      }
      if (category === "Mixto Libre") {
        categories.push("Mixto Libre");
      }
    });

    return unique(categories).filter(function (item) {
      return CATEGORY_ORDER.includes(item);
    });
  }

  function mapTeamCategory(branch, category) {
    const cleanCategory = cleanCategoryLabel(category);
    const cleanBranch = normalizeBranchLabel(branch);
    if (cleanCategory === "Preparatoria") return cleanBranch === "Femenil" ? "Preparatoria Femenil" : "Preparatoria Varonil";
    if (cleanCategory === "Secundaria") return cleanBranch === "Femenil" ? "Secundaria Femenil" : "Secundaria Varonil";
    if (cleanCategory === "3ª Fuerza") return cleanBranch === "Femenil" ? "3ª Fuerza Femenil" : "3ª Fuerza Varonil";
    if (cleanCategory === "2ª Fuerza") return cleanBranch === "Femenil" ? "2ª Fuerza Femenil" : "2ª Fuerza Varonil";
    if (cleanCategory === "Libre Var") return "1ª Fuerza Varonil";
    return cleanCategory;
  }

  function inferBranchFromCategory(category) {
    if (/Femenil/i.test(category)) return "Femenil";
    if (/Varonil/i.test(category)) return "Varonil";
    if (/Mixto/i.test(category)) return "Mixto";
    return "General";
  }

  function getSectionACategories() {
    const profile = getActiveSourceProfile();
    if (profile && profile.displayCategories.length) return profile.displayCategories;
    if (resolveViewMode(state.viewMode) === "real" && String(state.runtime.eventAlias || "ipv").toLowerCase() !== "ipv") {
      return [];
    }
    const fromLive = CATEGORY_ORDER.filter(function (category) {
      return getRenderableCategoryEntries(category).length > 0;
    });
    if (fromLive.length) return fromLive;
    return CATEGORY_ORDER.filter(function (category) {
      return getRenderableCategoryEntriesFromFallback(category).length > 0;
    });
  }

  function getCategoryEntries(category) {
    return state.showcaseEntries.filter(function (entry) {
      return entry.categoryDisplay === category;
    });
  }

  function getRenderableCategoryEntries(category) {
    return getCategoryEntries(category).filter(hasRenderableLogo);
  }

  function getCategoryEntriesFromFallback(category) {
    const allFallback = curatedFallback.concat(state.externalLogoEntries || []);
    return allFallback.filter(function (entry) {
      return entry.categoryDisplay === category;
    });
  }

  function getRenderableCategoryEntriesFromFallback(category) {
    return getCategoryEntriesFromFallback(category).filter(hasRenderableLogo);
  }

  function getRenderableEntries(entries) {
    return (Array.isArray(entries) ? entries : []).filter(hasRenderableLogo);
  }

  function getActiveSourceProfile() {
    if (resolveViewMode(state.viewMode) === "demo") return null;
    return state.sourceProfiles.find(function (profile) {
      return profile.email === state.activeSourceEmail;
    }) || null;
  }

  function getInitialSourceEmail() {
    if (resolveViewMode(state.viewMode) === "demo") return "";
    const urlEmail = normalizeEmail(state.runtime.urlParams && state.runtime.urlParams.urlEmail);
    if (urlEmail && state.sourceProfiles.some(function (profile) { return profile.email === urlEmail; })) {
      return urlEmail;
    }
    const sessionEmail = normalizeEmail(state.loggedUser && state.loggedUser.email);
    if (sessionEmail && state.sourceProfiles.some(function (profile) { return profile.email === sessionEmail; })) {
      return sessionEmail;
    }
    return "";
  }

  function getInitialViewMode() {
    const saved = String(window.localStorage.getItem("viewMode") || "").trim().toLowerCase();
    if (saved === "real" || saved === "demo") return saved;
    return shouldUseDemoData() ? "demo" : "real";
  }

  function syncUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("event", String(state.runtime.eventAlias || "ipv").trim().toLowerCase());
    if (resolveViewMode(state.viewMode) === "real" && state.activeSourceEmail) url.searchParams.set("email", state.activeSourceEmail);
    else url.searchParams.delete("email");
    window.history.replaceState({}, "", url.toString());
  }

  function displayNameFromProfile(profile) {
    if (profile.teamName) return profile.teamName;
    if (profile.contactName) return profile.contactName;
    return profile.email.split("@")[0];
  }

  function getSessionUser() {
    return readJson(config.sessionStorageKey || "hub-sport-session", null);
  }

  function renderLoginTooltip() {
    if (!el.heroLoginTooltip) return;
    if (state.loggedUser && state.loggedUser.email) {
      el.heroLoginTooltipText.textContent = state.loggedUser.email;
      showLoginTooltip();
      return;
    }
    hideLoginTooltipImmediate();
  }

  function showLoginTooltip() {
    clearLoginTooltipTimer();
    el.heroLoginTooltip.classList.remove("hidden");
  }

  function scheduleHideLoginTooltip() {
    clearLoginTooltipTimer();
    state.tooltipHideTimer = window.setTimeout(function () {
      hideLoginTooltipImmediate();
    }, 180);
  }

  function hideLoginTooltipImmediate() {
    clearLoginTooltipTimer();
    el.heroLoginTooltip.classList.add("hidden");
  }

  function clearLoginTooltipTimer() {
    if (state.tooltipHideTimer) {
      window.clearTimeout(state.tooltipHideTimer);
      state.tooltipHideTimer = null;
    }
  }

  function showBrandTooltip() {
    clearBrandTooltipTimer();
    if (el.brandMarkTooltip) el.brandMarkTooltip.classList.remove("hidden");
  }

  function scheduleHideBrandTooltip() {
    clearBrandTooltipTimer();
    state.brandTooltipHideTimer = window.setTimeout(function () {
      if (el.brandMarkTooltip) el.brandMarkTooltip.classList.add("hidden");
    }, 180);
  }

  function clearBrandTooltipTimer() {
    if (state.brandTooltipHideTimer) {
      window.clearTimeout(state.brandTooltipHideTimer);
      state.brandTooltipHideTimer = null;
    }
  }

  function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
  }

  function normalizePreferredImageName(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "_")
      .trim();
  }

  function cleanCategoryLabel(value) {
    const normalized = normalizeSpaces(value)
      .replace(/3ª/gi, "3a")
      .replace(/2ª/gi, "2a")
      .replace(/prepa[r]?atoria/gi, "Preparatoria")
      .replace(/menores\s*\(cachi\/micro\/mini\)/i, "Menores (Cachi/Mini/Micro)")
      .replace(/menores\s*\(cachi\/mini\/micro\)/i, "Menores (Cachi/Mini/Micro)");

    if (/menores/i.test(normalized)) return "Menores (Cachi/Mini/Micro)";
    if (/infantil\s+menor/i.test(normalized)) return "Infantil Menor";
    if (/secundaria/i.test(normalized)) return "Secundaria";
    if (/preparatoria/i.test(normalized)) return "Preparatoria";
    if (/3a\s+fuerza/i.test(normalized)) return "3ª Fuerza";
    if (/2a\s+fuerza/i.test(normalized)) return "2ª Fuerza";
    if (/1a\s+fuerza\s+var/i.test(normalized)) return "1ª Fuerza Varonil";
    if (/mixto\s+libre/i.test(normalized)) return "Mixto Libre";
    if (/libre\s+var/i.test(normalized)) return "Libre Var";
    return normalized.trim();
  }

  function normalizeBranchLabel(value) {
    const normalized = normalizeSpaces(value);
    if (/femenil/i.test(normalized)) return "Femenil";
    if (/varonil/i.test(normalized)) return "Varonil";
    if (/mixto/i.test(normalized)) return "Mixto";
    return normalized.trim();
  }

  function splitMultiValue(value) {
    return String(value || "").split(",").map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }

  function splitAndWord(value) {
    return String(value || "").split(/\sy\s/i).map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }

  function toDriveThumbnail(url) {
    const text = String(url || "").trim();
    if (!text) return "";
    const match = text.match(/id=([a-zA-Z0-9_-]+)/) || text.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const id = match ? match[1] : "";
    return id ? "https://drive.google.com/thumbnail?id=" + id + "&sz=w1000" : text;
  }

  function normalizeImage(item) {
    if (typeof item === "string") return { url: safeImageUrl(item), name: "Imagen Drive" };
    return {
      url: safeImageUrl(item.url || item.imageUrl || item.thumbnail || item.src || ""),
      name: item.name || item.title || "Imagen Drive"
    };
  }

  function safeImageUrl(url) {
    const value = String(url || "").trim();
    if (!value) return "";
    const match = value.match(/[?&]id=([a-zA-Z0-9_-]+)/) || value.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const id = match ? match[1] : "";
    return id ? "https://drive.google.com/thumbnail?id=" + id + "&sz=w1600" : value;
  }

  function hasRenderableLogo(entry) {
    const logoUrl = String(entry && entry.logoUrl || "").trim();
    if (!logoUrl) return false;
    const normalized = normalizeAssetPath(logoUrl);
    const placeholder = normalizeAssetPath(IPV_LOGO);
    return normalized !== placeholder;
  }

  function normalizeAssetPath(value) {
    return String(value || "")
      .trim()
      .replace(/\\/g, "/")
      .replace(/^\.\//, "")
      .replace(/^\.\.\//, "")
      .toLowerCase();
  }

  function getField(row, aliases) {
    const source = row && typeof row === "object" ? row : {};
    const map = {};
    Object.keys(source).forEach(function (key) {
      map[normalizeKey(key)] = source[key];
    });
    for (let i = 0; i < aliases.length; i += 1) {
      const probe = normalizeKey(aliases[i]);
      if (!Object.prototype.hasOwnProperty.call(map, probe)) continue;
      const value = map[probe];
      if (value == null) continue;
      const text = String(value).trim();
      if (text) return text;
    }
    return "";
  }

  function normalizeKey(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  }

  function normalizeSpaces(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function uniqueBy(items, mapper) {
    const seen = new Set();
    return items.filter(function (item) {
      const key = mapper(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function rotate(items, offset) {
    if (!items.length) return [];
    const safeOffset = offset % items.length;
    return items.slice(safeOffset).concat(items.slice(0, safeOffset));
  }

  function shuffle(items) {
    const clone = items.slice();
    for (let i = clone.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = clone[i];
      clone[i] = clone[j];
      clone[j] = temp;
    }
    return clone;
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escXml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function readJson(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function unwrapResponse(json) {
    if (json && json.ok && json.data) return json.data;
    if (json && json.data) return json.data;
    return json || {};
  }

  function createId(prefix) {
    return String(prefix || "id") + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }

  function decodeJwt(token) {
    try {
      const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(decodeURIComponent(atob(payload).split("").map(function (char) {
        return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
      }).join("")));
    } catch (_) {
      return null;
    }
  }

  function waitForGoogle() {
    return new Promise(function (resolve, reject) {
      let tries = 30;
      (function check() {
        if (window.google && window.google.accounts && window.google.accounts.id) return resolve();
        tries -= 1;
        if (!tries) return reject(new Error("GIS no disponible"));
        setTimeout(check, 250);
      })();
    });
  }
})();

