import { MobileViewActionType } from "../actiontypes/index";

const mobileViewReducer = (
  mobileViewState = {
    isMobileView: false,
    showMobileMenu: false,
  },
  action
) => {
  switch (action.type) {
    case MobileViewActionType.SET_MOBILE_VIEW: {
      return {
        ...mobileViewState,
        isMobileView: action.payload,
      };
    }
    case MobileViewActionType.SET_SHOW_MOBILE_VIEW: {
      return {
        ...mobileViewState,
        showMobileMenu: action.payload,
      };
    }
    default:
      return mobileViewState;
  }
};

export default mobileViewReducer;
