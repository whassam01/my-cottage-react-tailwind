import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, Spin } from "antd";

// Components
import CardItem from "./CardItem";

// Redux
import { ConsumerActionType, CartActionType } from "../../../store/actiontypes";

//scss
import "./AllCards.scss";
import Modal from "antd/lib/modal/Modal";
import { OrderStatus } from "../../../constants";

class AllCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      cardId: null,
      isShowCardModal: false,
    };
  }

  componentDidMount() {
    const { account } = this.props;
    if (
      account.status === ConsumerActionType.GET_CONSUMER_SUCCESS ||
      account.status === ConsumerActionType.GET_CONSUMER_ERROR
    ) {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps) {
    const { account, cart } = this.props;
    if (account.status !== prevProps.account.status) {
      if (
        account.status === ConsumerActionType.GET_CONSUMER_SUCCESS ||
        account.status === ConsumerActionType.GET_CONSUMER_ERROR
      ) {
        this.setState({ isLoading: false });
      }
    } else if (cart.status === CartActionType.GET_ACTIVE_ORDERS) {
      const { orders } = cart.value;
      const order = orders.find((o) => o.status === OrderStatus.IN_REVIEW && o.cardId !== null);
      if (this.state.cardId === null && order !== undefined) {
        this.setState(
          {
            cardId: order.cardId,
          },
          () => this.props.selectedCardId(this.state.cardId)
        );
      }
    }
  }

  showCardsModal = () => {
    this.setState({ isShowCardModal: true });
  };

  hideCardsModal = () => {
    this.setState({ isShowCardModal: false });
  };

  onCardSelectModal = () => {
    if (!this.state.cardId) return;
    this.props.selectedCardId(this.state.cardId);
    this.setState({ selectedCardId: this.state.cardId });
    this.hideCardsModal();
  };

  getAppliedCardFromProps = () => {
    // get the card that is appled to orders and plan
    const currentAppliedCardId =
      this.props.cart.value.orders[0]?.cardId || this.state.selectedCardId;
    const allCards = this.props.card.value.edges;
    // if no card is selected then return null
    if (!currentAppliedCardId) {
      return null;
    }
    const currentAppliedCard = allCards.filter((card) => card.node.id === currentAppliedCardId);
    return currentAppliedCard[0]?.node;
  };

  render() {
    const card = this.getAppliedCardFromProps();
    const { edges } = this.props.card.value;
    return (
      <Spin spinning={this.state.isLoading}>
        <div className="all-cards">
          <div className="all-cards-head">
            <div className="all-cards-head-title">Step {this.props.stepNumber}: Payment</div>
            <div className="all-cards-head-more">
              <span onClick={this.showCardsModal}>Change</span>
              <span></span>
              <span onClick={this.props.showAddCard}>Add</span>
            </div>
          </div>
          <div className="all-cards-body">
            {edges.length === 0 ? (
              <div className="all-cards-body-empty">No payments found, add a payment.</div>
            ) : !card ? (
              <div className="all-cards-body-empty">No payments selected</div>
            ) : (
              <CardItem showExpiry card={card} />
            )}
          </div>
          <Modal
            className="show-more-card-modal"
            footer={null}
            visible={this.state.isShowCardModal}
            onCancel={this.hideCardsModal}>
            <div className="card-modal-title">
              <h1>Payment</h1>
            </div>
            <div className="card-modal-body">
              {edges.map((edge, key) => (
                <CardItem
                  key={key}
                  onCardSelect={() => {
                    this.setState({ cardId: edge.node.id });
                  }}
                  selectedCardId={this.state.cardId}
                  card={edge.node}
                />
              ))}
            </div>
            <div
              className={`card-modal-select-button ${
                this.state.cardId ? "card-modal-select-button-active" : ""
              }`}>
              <Button block onClick={this.onCardSelectModal}>
                Select
              </Button>
            </div>
          </Modal>
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.consumer.account,
    card: state.consumer.card,
    cart: state.cart,
    isMobileView: state.mobileView.isMobileView,
  };
};

export default connect(mapStateToProps)(AllCards);
