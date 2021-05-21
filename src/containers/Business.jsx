import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import { Toolbar, Login } from "../components/common";
import NotFound from "./NotFound";
import AddressForm from "../components/account/address/AddressForm";
import BusinessComponent from "./../components/business/Business";
import ClearCart from "../components/business/product/cart/ClearCart";
import { CartMobileView } from "../components/business/subscription/cart/CartMobileView";
import { ScheduleCartMobileView } from "../components/business/product/cart/scheduleCartMobileView";

// Redux
import { BusinessActionType, AuthenticationActionType } from "../store/actiontypes";
import {
  getBusinessesByDomain,
  getCurrentAuthenticatedUser,
  getUserCredentials,
  getConsumer,
  signOut,
} from "../store/actions";

import { BusinessStatus, BusinessTabs } from "../constants";
import SEO from "../components/common/seo/SEO";

class Business extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoginVisible: false,
      isBusinessFound: true,
      cartVisible: false,
      scheduleCartVisible: false,
      visible: false,
    };
  }

  componentDidMount() {
    const { urlDomain, urlSubdomain } = this.props.match.params;
    this.props.getBusinessesByDomain(urlDomain, urlSubdomain);
    this.props.getCurrentAuthenticatedUser();
  }

  componentDidUpdate(prevProps) {
    const { isLoginVisible } = this.state;
    const { authentication, business } = this.props;

    if (business.status !== prevProps.business.status) {
      if (business.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS) {
        const { urlDomain, urlSubdomain } = business.value;

        // Reroute to its subdomain
        if (this.props.match.params.urlSubdomain !== urlSubdomain) {
          this.props.history.push(`/${urlDomain}/${urlSubdomain}`);
        }
        this.setState({ isLoading: false });
      } else if (business.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_ERROR) {
        this.setState({ isBusinessFound: false, isLoading: false });
      }
    }

    // Keep isLoginVisible for sign up modal
    if (authentication.status !== prevProps.authentication.status && !isLoginVisible) {
      if (
        authentication.status === AuthenticationActionType.GET_AUTHENTICATED_USER_SUCCESS ||
        authentication.status === AuthenticationActionType.SIGN_IN_SUCCESS
      ) {
        this.props.getUserCredentials();
      } else if (
        authentication.status === AuthenticationActionType.GET_USER_CREDENTIALS_SUCCESS &&
        authentication.value.isAuthenticated
      ) {
        const consumerId = authentication.value.id;
        this.props.getConsumer(consumerId);
      }
    }

    // Special case for transition from not found page to a valid page from toolbar cart
    if (
      business.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_ERROR &&
      (this.props.match.params.urlDomain !== prevProps.match.params.urlDomain ||
        this.props.match.params.urlSubdomain !== prevProps.match.params.urlSubdomain)
    ) {
      const { urlDomain, urlSubdomain } = this.props.match.params;
      this.setState(
        {
          isBusinessFound: true,
          isLoading: true,
        },
        () => this.props.getBusinessesByDomain(urlDomain, urlSubdomain)
      );
    }
  }

  onShowLogin = (step) => {
    step = typeof step === "string" ? step : undefined;
    this.setState({ isLoginVisible: true, step });
  };

  onHideLogin = () => {
    this.setState({ isLoginVisible: false });
  };

  onShowAddressForm = () => {
    this.setState({ isAddressFormVisible: true });
  };

  onHideAddressForm = () => {
    this.setState({ isAddressFormVisible: false });
  };

  onShowClearCart = () => {
    this.setState({ isClearCartVisible: true });
  };

  onHideClearCart = () => {
    this.setState({ isClearCartVisible: false });
  };

  onPlanShowCart = () => {
    this.setState({ planCartVisible: true });
  };

  onHidePlanCart = () => {
    this.setState({ planCartVisible: false });
  };

  onShowScheduleCart = () => {
    this.setState({ scheduleCartVisible: true });
  };

  onHideScheduleCart = () => {
    this.setState({ scheduleCartVisible: false });
  };

  buildImageLink = (filePath) => {
    if (process.env.REACT_APP_REGION === "us-east-1") {
      return `https://${process.env.REACT_APP_IMAGE_UPLOAD_BUCKET}.s3.amazonaws.com/public/${filePath}`;
    }

    return `https://${process.env.REACT_APP_IMAGE_UPLOAD_BUCKET}.s3-${process.env.REACT_APP_REGION}.amazonaws.com/public/${filePath}`;
  };

  render() {
    const {
      isLoading,
      isLoginVisible,
      isAddressFormVisible,
      isClearCartVisible,
      isBusinessFound,
      planCartVisible,
      scheduleCartVisible,
      step,
    } = this.state;
    const { location, isMobileView, cart, business } = this.props;
    const { selectedBusiness, edges } = location.value;
    const { selectedCart } = cart.value;

    return (
      <div className="business">
        <Toolbar
          selectedBusiness={selectedBusiness}
          businesses={edges}
          onShowCart={
            selectedCart === BusinessTabs.PRODUCT ? this.onShowScheduleCart : this.onPlanShowCart
          }
          onShowLogin={this.onShowLogin}
          onSignOut={this.props.signOut}
          isLoading={isLoading}
        />
        <>
          {isBusinessFound ? (
            <div className="body-wrapper">
              {/* {isMobileView && (
                <div className="location-selector-mobile">
                  {isLoading ? (
                    <Skeleton.Input style={{ width: "100%" }} active={isLoading} size="large" />
                  ) : (
                      <LocationSelector businesses={edges} selectedBusiness={selectedBusiness} />
                    )}
                </div>
              )} */}
              <BusinessComponent
                {...this.props}
                onShowLogin={this.onShowLogin}
                onShowAddressForm={this.onShowAddressForm}
                onShowClearCart={this.onShowClearCart}
              />
            </div>
          ) : (
            <NotFound />
          )}
        </>
        {isMobileView && <CartMobileView onClose={this.onHidePlanCart} visible={planCartVisible} />}
        {isMobileView && (
          <ScheduleCartMobileView
            onShowLogin={this.onShowLogin}
            onClose={this.onHideScheduleCart}
            visible={scheduleCartVisible}
          />
        )}
        {isLoginVisible && (
          <Login isLoginVisible={isLoginVisible} step={step} onClose={this.onHideLogin} />
        )}
        {isAddressFormVisible && (
          <AddressForm visible={isAddressFormVisible} onCancel={this.onHideAddressForm} />
        )}
        {isClearCartVisible && (
          <ClearCart visible={isClearCartVisible} onCancel={this.onHideClearCart} />
        )}
        {business.value.id !== null && (
          <SEO
            pageProps={{
              title: `${business.value.profile.title} | ${business.value.profile.location}`,
              thumbnail: this.buildImageLink(business.value.profile.avatarImage),
              image: this.buildImageLink(business.value.profile.coverImage),
              url: `https://cottage.menu/${business.value.urlDomain}/${business.value.urlSubdomain}`,
            }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    business: state.business.id,
    location: state.business.location,
    cart: state.cart,
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessesByDomain: (urlDomain, urlSubdomain) =>
      dispatch(
        getBusinessesByDomain({
          urlDomain,
          urlSubdomain,
          statuses: [BusinessStatus.ACTIVE],
        })
      ),
    getCurrentAuthenticatedUser: () => dispatch(getCurrentAuthenticatedUser()),
    getUserCredentials: () => dispatch(getUserCredentials()),
    signOut: () => dispatch(signOut()),
    getConsumer: (id) => dispatch(getConsumer({ id })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Business);
