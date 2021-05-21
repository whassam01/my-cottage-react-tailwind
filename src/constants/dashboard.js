export const DASHBOARD_LINK = process.env.REACT_APP_STAGE === "prod" 
? "https://dashboard.cottage.menu": "https://dashboard-dev.cottage.menu";
export const DASHBOARD_LOGIN_LINK = process.env.REACT_APP_STAGE === "prod" ? 
"https://dashboard.cottage.menu/login": "https://dashboard-dev.cottage.menu/login";
export const DASHBOARD_TERMS_AND_CONDITIONS_LINK = process.env.REACT_APP_STAGE === "prod" ? 
"https://dashboard.cottage.menu/legal": "https://dashboard-dev.cottage.menu/legal";
export const DASHBOARD_PRIVACY_LINK = process.env.REACT_APP_STAGE === "prod" ? 
"https://dashboard.cottage.menu/legal/privacy": "https://dashboard-dev.cottage.menu/privacy";
export const DASHBOARD_HELP_PAGE_LINK = process.env.REACT_APP_STAGE === "prod" ? 
"https://dashboard.cottage.menu/help": "https://dashboard-dev.cottage.menu/help";
