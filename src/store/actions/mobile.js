import { MobileViewActionType } from "../actiontypes/index";

export const setMobileView = (isMobileView) => {
  return {
    type: MobileViewActionType.SET_MOBILE_VIEW,
    payload: isMobileView,
  };
};

export const setShowMobileMenu = (showMobileMenu) => {
  return {
    type: MobileViewActionType.SET_SHOW_MOBILE_VIEW,
    payload: showMobileMenu,
  };
};
