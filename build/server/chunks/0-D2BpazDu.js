import { C as CONSTANTS } from './constants-CBgeUOhQ.js';
import { X as writable } from './index-CqD0WFBk.js';

const initialUiState = {
  currentTheme: "dark",
  // Always default to 'dark' to prevent hydration mismatch
  showJournalModal: false,
  showChangelogModal: false,
  showGuideModal: false,
  showSettingsModal: false,
  showCopyFeedback: false,
  showSaveFeedback: false,
  errorMessage: "",
  showErrorMessage: false,
  isPriceFetching: false,
  symbolSuggestions: [],
  showSymbolSuggestions: false
};
function createUiStore() {
  const { subscribe, update, set } = writable(initialUiState);
  return {
    subscribe,
    update,
    set,
    setTheme: (themeName) => {
      update((state) => ({ ...state, currentTheme: themeName }));
    },
    toggleJournalModal: (show) => update((state) => ({ ...state, showJournalModal: show })),
    toggleChangelogModal: (show) => update((state) => ({ ...state, showChangelogModal: show })),
    toggleGuideModal: (show) => update((state) => ({ ...state, showGuideModal: show })),
    toggleSettingsModal: (show) => update((state) => ({ ...state, showSettingsModal: show })),
    showFeedback: (type, duration = 2e3) => {
      const key = type === "copy" ? "showCopyFeedback" : "showSaveFeedback";
      update((state) => ({ ...state, [key]: true }));
      setTimeout(() => update((state) => ({ ...state, [key]: false })), duration);
    },
    showError: (message) => update((state) => ({ ...state, errorMessage: message, showErrorMessage: true })),
    hideError: () => update((state) => ({ ...state, errorMessage: "", showErrorMessage: false }))
  };
}
createUiStore();

const initialTradeState = {
  tradeType: CONSTANTS.TRADE_TYPE_LONG,
  accountSize: 1e3,
  riskPercentage: 1,
  entryPrice: null,
  stopLossPrice: null,
  leverage: parseFloat(CONSTANTS.DEFAULT_LEVERAGE),
  fees: parseFloat(CONSTANTS.DEFAULT_FEES),
  symbol: "",
  atrValue: null,
  atrMultiplier: parseFloat(CONSTANTS.DEFAULT_ATR_MULTIPLIER),
  useAtrSl: false,
  atrMode: "manual",
  atrTimeframe: "1d",
  tradeNotes: "",
  targets: [
    { price: null, percent: 50, isLocked: false },
    { price: null, percent: 25, isLocked: false },
    { price: null, percent: 25, isLocked: false }
  ],
  isPositionSizeLocked: false,
  lockedPositionSize: null,
  isRiskAmountLocked: false,
  riskAmount: null,
  journalSearchQuery: "",
  journalFilterStatus: "all",
  currentTradeData: null
};

const prerender = true;
const load = async ({ cookies }) => {
  const theme = cookies.get(CONSTANTS.LOCAL_STORAGE_THEME_KEY) || "dark";
  return {
    theme,
    initialTradeState
    // Pass initialTradeState to the layout
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  prerender: prerender
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-FifEVOs5.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.B58lSqfb.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CJpVuRZm.js","_app/immutable/chunks/DrPk-dOv.js"];
const stylesheets = ["_app/immutable/assets/0.CE-hBUjz.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-D2BpazDu.js.map
