import React, { useState } from 'react';
import { Card } from 'antd';
import { Elements } from 'react-stripe-elements';

import { PlusIcon, SecondaryButton } from 'components/common';
import CardForm from 'components/purchase/card/CardForm';

import CardItem from './CardItem';

const TableHeaders = ['Type', 'Card Number', 'Expires'];

const CardTable = (props) => {
  const { consumerId, cards } = props;

  const [addCardVisible, setAddCardVisible] = useState(false);

  const showAddCard = () => {
    setAddCardVisible(true);
  };

  const hideAddCard = () => {
    setAddCardVisible(false);
  };

  return (
    <div className="Profile-tabs-container">
      <div className="cottage-tabs-button">
        <h1>Cards</h1>
        <SecondaryButton icon={<PlusIcon />} text="Add card" eventHandler={showAddCard} />
      </div>
      <Card bordered={false} id="account-tabs-sections">
        <table>
          <thead className="account-table-head">
            <tr>
              {TableHeaders.map((column) => (
                <th key={column}>{column}</th>
              ))}
              {/* For config dropdown. */}
              <th />
            </tr>
          </thead>
          <tbody className="account-table-body">
            {cards.map((card) => (
              <CardItem key={card.id} consumerId={consumerId} card={card.node} />
            ))}
          </tbody>
        </table>
      </Card>
      {addCardVisible && (
        <Elements>
          <CardForm visible={addCardVisible} onCancel={hideAddCard} consumerId={consumerId} />
        </Elements>
      )}{' '}
    </div>
  );
};

export default CardTable;
