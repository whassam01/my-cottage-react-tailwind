import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { S3Image } from "aws-amplify-react";
import { Dropdown, Menu, PageHeader, Skeleton, Space } from "antd";

// Icons
import defaultImageSvg from "../../../assets/account/avatar.svg";
import Logo from "../logo/Logo";
// Redux
import { signOut, clearBusinessScheduleInCart } from "../../../store/actions";

// Utils
import { BusinessTabs, PageRoute } from "../../../constants";

// CSS
import "./Toolbar.scss";
import { UserIcon, PurchaseIcon, LogoutIcon, ArrowUpIcon } from "../";
// import { HelpIcon } from "../";
import { CartIcon } from "../icons/Icons";
import { LocationSelector } from "./ToolbarLocationSelector";
import { ToolbarCart } from "./ToolbarCart";

const profileImageStyle = {
  width: "30px",
  borderRadius: "30px",
};
const businessImageStyle = {
  height: "36px",
  width: "36px",
  borderRadius: "36px",
  marginRight: "10px",
  display: "flex",
};

class UnconnectedToolbar extends Component {
  state = {
    visible: false,
  };

  getTotalInCart = () => {
    const { cart, selectedBusiness } = this.props;
    const { selectedCart, plans, businessSchedules } = cart.value;
    if (selectedCart === BusinessTabs.PRODUCT) {
      let totalCount = 0;

      if (selectedBusiness) {
        const selectedBusinessSchedules = businessSchedules.find(
          (b) => b.id === selectedBusiness.id
        );
        if (selectedBusinessSchedules) {
          selectedBusinessSchedules.schedules.forEach((schedule) => {
            schedule.offers.forEach((offer) => {
              totalCount += offer.quantity;
            });
          });
        }
      } else {
        businessSchedules.forEach((b) => {
          b.schedules.forEach((schedule) => {
            schedule.offers.forEach((offer) => {
              totalCount += offer.quantity;
            });
          });
        });
      }

      return totalCount;
    } else if (selectedCart === BusinessTabs.SUBSCRIPTION) {
      return plans.length;
    }
  };

  render() {
    const {
      selectedBusiness,
      businesses,
      profile,
      authentication,
      isMobileView,
      cart,
      isLoading,
    } = this.props;
    const isAuthenticated = authentication.value.isAuthenticated;
    const { avatar } = profile.value.profile;
    const user = profile.value.profile;

    const totalValueInCart = this.getTotalInCart();
    const BusinessAvatar = (
      <div>
        {businesses &&
          businesses.map((b) => (
            <span key={b}>
              <S3Image
                imgKey={b.node.profile.avatarImage}
                theme={{ photoImg: businessImageStyle }}
              />
            </span>
          ))}
      </div>
    );
    const profileImageContainer = (
      <div className="profile-dropdown-avatar">
        {avatar ? (
          <S3Image imgKey={avatar} theme={{ photoImg: profileImageStyle }} />
        ) : (
          <img src={defaultImageSvg} alt="default" />
        )}
      </div>
    );

    const cartDropdown = (
      <ToolbarCart
        cart={cart}
        totalValueInCart={totalValueInCart}
        clearBusinessScheduleInCart={this.props.clearBusinessScheduleInCart}
      />
    );

    let leftToolbarContainer;

    if (selectedBusiness && businesses) {
      const locationSelect = (
        <LocationSelector
          businesses={businesses}
          selectedBusiness={selectedBusiness}
          cartDropdownContainer={cartDropdown}
        />
      );
      leftToolbarContainer = (
        <div
          className="profile-business-section"
          onClick={() =>
            this.props.history.push(
              `/${selectedBusiness.urlDomain}/${selectedBusiness.urlSubdomain}`
            )
          }>
          {BusinessAvatar}{" "}
          <div className="profile-business-title">{selectedBusiness.profile.title}</div>
          {!isMobileView && locationSelect}
        </div>
      );
    } else {
      leftToolbarContainer = (
        <div className="Dashboard-logo">
          <Logo />
        </div>
      );
    }

    const AddToCart = <CartIcon value={totalValueInCart} eventHandler={this.props.onShowCart} />;
    const signedOutMenu = (
      <Menu className="view-menu">
        <Menu.Item onClick={this.props.onShowLogin}>
          <UserIcon /> <span>Sign in / Signup</span>{" "}
        </Menu.Item>
        {/* <Menu.Item onClick={() => this.props.history.push("/help")}>
          <HelpIcon />
          <span>Help</span>
        </Menu.Item> */}
      </Menu>
    );

    const signedInMenu = (
      <Menu className="view-menu">
        <Menu.Item onClick={() => this.props.history.push(PageRoute.ACCOUNT)}>
          <UserIcon />
          <span>Account</span>
        </Menu.Item>
        <Menu.Item onClick={() => this.props.history.push(PageRoute.PURCHASES)}>
          <PurchaseIcon />
          <span>Purchases</span>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            this.props.signOut();
            this.props.onSignOut();
            this.setState({ visible: false });
          }}>
          <LogoutIcon /> <span>Sign out</span>
        </Menu.Item>
      </Menu>
    );

    const signedInDropdown = (
      <>
        <Dropdown
          overlay={isAuthenticated && user.firstName ? signedInMenu : signedOutMenu}
          trigger={["click"]}
          overlayClassName={"overlay-view-menu"}
          onVisibleChange={(e) => this.setState({ visible: e })}>
          <span className="profile-signin-dropdown">
            {isAuthenticated && user.firstName ? (
              <span className="signin-title">
                Logged in as {user.firstName} {user.lastName.charAt(0)}.
              </span>
            ) : (
              <span className="not-signin"> Sign in</span>
            )}
            <div className="flex">
              {profileImageContainer} <ArrowUpIcon visible={this.state.visible} />
            </div>
          </span>
        </Dropdown>
      </>
    );

    const userContainer = <>{signedInDropdown}</>;
    const cartDropdownContainer = <> {cartDropdown} </>;

    return (
      <div>
        {isLoading ? (
          <PageHeader
            className="dashboard-profile-header"
            extra={
              <div key="1" className="profile-dropdown-container">
                {!isMobileView && (
                  <Space style={{ marginTop: "6px" }}>
                    <Skeleton.Input style={{ width: 100 }} active={isLoading} size="small" />
                    <Skeleton.Avatar active={isLoading} size="large" />
                  </Space>
                )}
              </div>
            }
            title={
              <Space>
                <Skeleton.Avatar active={isLoading} size="large" shape="square" />
                <Skeleton.Input style={{ width: 180 }} active={isLoading} size="default" />
                {!isMobileView && (
                  <Skeleton.Input style={{ width: 110 }} active={isLoading} size="default" />
                )}
              </Space>
            }
          />
        ) : (
          <PageHeader
            className="dashboard-profile-header"
            extra={
              <div key="1" className="profile-dropdown-container">
                {userContainer} {!isMobileView && cartDropdownContainer}
              </div>
            }
            title={leftToolbarContainer}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.consumer.profile,
    authentication: state.authentication,
    isMobileView: state.mobileView.isMobileView,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    clearBusinessScheduleInCart: (businessId) =>
      dispatch(clearBusinessScheduleInCart({ businessId })),
  };
};

export const Toolbar = withRouter(connect(mapStateToProps, mapDispatchToProps)(UnconnectedToolbar));

Toolbar.defaultProps = {
  fluid: true,
};
