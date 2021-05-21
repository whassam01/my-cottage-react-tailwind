import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";

// Components
import { Container } from "./../common";
import ProfilePanel from "../../components/business/profile/ProfilePanel";
import ProductPanel from "../../components/business/product/ProductPanel";
import SubscriptionPanel from "../../components/business/subscription/SubscriptionPanel";
// styles
import "./Business.scss";
import MobileViewBusinessActions from "./MobileViewBusinessActions/MobileViewBusinessActions";

// Redux
import { setSelectedCart } from "../../store/actions";

// Utils
import { BusinessTabs } from "../../constants";
import BusinessFooter from "./BusinessFooter/BusinessFooter";
import { OrderActionType, OrderItemActionType } from "../../store/actiontypes";

const { TabPane } = Tabs;

class Business extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoginVisible: false,
      visible: false,
      isCheckoutDisabled: false,
    };
  }

  onTabChange = (tab) => {
    this.setState({ activeTab: tab }, () => this.props.setSelectedCart(tab));
  };
  componentDidMount = () => {
    const { cart } = this.props;
    if (
      cart.status === OrderActionType.CREATE_ORDERS_REQUESTED ||
      cart.status === OrderItemActionType.CREATE_ORDER_ITEM_REQUESTED ||
      cart.status === OrderActionType.TRANSITION_ORDER_REQUESTED
    ) {
      this.setState({
        isCheckoutDisabled: true,
      });
    } else if (
      cart.status === OrderActionType.CREATE_ORDERS_ERROR ||
      cart.status === OrderItemActionType.CREATE_ORDER_ITEM_ERROR ||
      cart.status === OrderActionType.TRANSITION_ORDER_ERROR
    ) {
      this.setState({
        isCheckoutDisabled: false,
      });
    }
  };

  componentDidUpdate = (prevProps) => {
    const { cart } = this.props;
    if (cart.status !== prevProps.cart.status) {
      if (
        cart.status === OrderActionType.CREATE_ORDERS_REQUESTED ||
        cart.status === OrderItemActionType.CREATE_ORDER_ITEM_REQUESTED ||
        cart.status === OrderActionType.TRANSITION_ORDER_REQUESTED
      ) {
        this.setState({
          isCheckoutDisabled: true,
        });
      } else if (
        cart.status === OrderActionType.CREATE_ORDERS_ERROR ||
        cart.status === OrderItemActionType.CREATE_ORDER_ITEM_ERROR ||
        cart.status === OrderActionType.TRANSITION_ORDER_ERROR
      ) {
        this.setState({
          isCheckoutDisabled: false,
        });
      }
    }
  };

  render() {
    const { isCheckoutDisabled } = this.state;
    const { profile } = this.props;
    return (
      <div>
        <div>
          {!this.props.isMobileView && <ProfilePanel />}
          <Container style={{ minHeight: "calc(100vh - 582px)" }}>
            {this.props.isMobileView && (
              <MobileViewBusinessActions
                profile={profile}
                onShowLogin={this.props.onShowLogin}
                onShowAddressForm={this.props.onShowAddressForm}
              />
            )}
            <Tabs
              id="cottage-tabs"
              defaultActiveKey={BusinessTabs.PRODUCT}
              onChange={this.onTabChange}>
              <TabPane tab={BusinessTabs.PRODUCT} key={BusinessTabs.PRODUCT}>
                <ProductPanel
                  onShowLogin={this.props.onShowLogin}
                  isCheckoutDisabled={isCheckoutDisabled}
                  onShowAddressForm={this.props.onShowAddressForm}
                  onShowClearCart={this.props.onShowClearCart}
                />
              </TabPane>
              <TabPane tab={BusinessTabs.SUBSCRIPTION} key={BusinessTabs.SUBSCRIPTION}>
                <SubscriptionPanel onShowLogin={this.props.onShowLogin} />
              </TabPane>
            </Tabs>
          </Container>
        </div>
        <BusinessFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    profile: state.business.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCart: (selectedCart) => dispatch(setSelectedCart({ selectedCart })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Business);
