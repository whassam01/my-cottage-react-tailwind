import React from 'react';
import { Tabs } from 'antd';

import SubscriptionPane from './subscription/SubscriptionPane';
import OrderPane from './order/OrderPane';
import AccountPane from './account/AccountPane';
import './Purchase.scss';

const { TabPane } = Tabs;

const AccountTabs = {
  ORDERS: 'Meal Orders',
  SUBSCRIPTIONS: 'Subscriptions',
  PAYMENT_METHODS: 'Payment methods',
  ADDRESSES: 'My Addresses',
  ACCOUNT_SETTINGS: 'Account Settings',
};

const Purchase = () => (
  <div className="purchase-wrapper">
    <div className="cottage-large-title">My Account</div>
    <Tabs id="cottage-tabs">
      <TabPane tab={AccountTabs.ORDERS} key={AccountTabs.ORDERS}>
        <OrderPane />
      </TabPane>
      <TabPane tab={AccountTabs.SUBSCRIPTIONS} key={AccountTabs.SUBSCRIPTIONS}>
        <SubscriptionPane />
      </TabPane>
      <TabPane tab={AccountTabs.ACCOUNT_SETTINGS} key={AccountTabs.ACCOUNT_SETTINGS}>
        <AccountPane />
      </TabPane>
    </Tabs>
  </div>
);

export default Purchase;
