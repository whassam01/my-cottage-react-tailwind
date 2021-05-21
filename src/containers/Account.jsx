import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Elements } from 'react-stripe-elements';

import { Spin, Row, Col, Tabs } from 'antd';
import { useQueryClient } from 'react-query';
import { ConsumerKeys } from 'store/actiontypes';
import { useGetConsumer } from 'store/react-query';
import { Toolbar } from 'components/common';

import ProfileItem from 'components/account/profile/ProfileItem';
import ProfileForm from 'components/account/profile/ProfileForm';
import ChangePasswordForm from 'components/account/profile/ChangePasswordForm';

import AllAddresses from 'components/account/address/AllAddresses';
import AddressForm from 'components/account/address/AddressForm';

import AllCards from 'components/account/card/AllCards';
import CardForm from 'components/account/card/CardForm';

import AllSubscriptions from 'components/account/subscription/AllSubscriptions';
import SubscriptionForm from 'components/account/subscription/SubscriptionForm';

import { PageRoute } from 'constants/index';

const { TabPane } = Tabs;

const AccountTabs = {
  CARD: 'Cards',
  ADDRESS: 'Addresses',
  SUBSCRIPTION: 'Subscriptions',
};

// Temp means toa get CardForm to invalidate cache
// Refactor when ripping out react-stripe-elements for react-stripe-js
const invalidateConsumer = (queryClient) => {
  queryClient.invalidateQueries(ConsumerKeys.Consumer);
};

const Account = (props) => {
  const [addAddressVisible, setAddAddressVisible] = useState(false);
  const [addCardVisible, setAddCardVisible] = useState(false);
  const [updateSubscriptionVisible, setUpdateSubscriptionVisible] = useState(false);
  const [subscriptionItem, setSubscriptionItem] = useState(null);
  const [updateProfileVisible, setUpdateProfileVisible] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  const isMobileView = useSelector((state) => state.mobileView.isMobileView);

  const consumer = useGetConsumer();
  const queryClient = useQueryClient();

  const showEditProfile = (editProfile) => {
    setUpdateProfileVisible(true);
    setEditingProfile(editProfile);
  };

  const hideEditProfile = () => {
    setUpdateProfileVisible(false);
    setEditingProfile(null);
  };

  const showChangePassword = () => {
    setChangePasswordVisible(true);
  };

  const hideChangePassword = () => {
    setChangePasswordVisible(false);
  };

  const showAddAddress = () => {
    setAddAddressVisible(true);
  };

  const hideAddAddress = () => {
    setAddAddressVisible(false);
  };

  const showAddCard = () => {
    setAddCardVisible(true);
  };

  const hideAddCard = () => {
    setAddCardVisible(false);
  };

  const showUpdateSubscription = (subItem) => {
    setUpdateSubscriptionVisible(true);
    setSubscriptionItem(subItem);
  };

  const hideUpdateSubscription = () => {
    setUpdateSubscriptionVisible(false);
    setSubscriptionItem(null);
  };

  // Why does this work
  const signOut = () => {
    props.history.push(PageRoute.HOME);
  };

  if (consumer.isError) {
    return <Redirect to={PageRoute.HOME} />;
  }

  return (
    <div className="account">
      <Toolbar onSignOut={signOut} />
      {consumer.isLoading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
          <div className="account-container body-wrapper">
            <div className="cottage-large-title">Account</div>
            <Row type="flex" gutter={[0, 30]}>
              <Col span={isMobileView ? 24 : 7}>
                <ProfileItem
                  showEditProfile={showEditProfile}
                  showChangePassword={showChangePassword}
                />
              </Col>
              {isMobileView ? (
                <>
                  <Col span={24}>
                    <Tabs defaultActiveKey={AccountTabs.ADDRESS} id="cottage-tabs">
                      <TabPane tab={AccountTabs.ADDRESS} key={AccountTabs.ADDRESS}>
                        <AllAddresses showAddAddress={showAddAddress} />
                      </TabPane>
                      <TabPane tab={AccountTabs.CARD} key={AccountTabs.CARD}>
                        <AllCards showAddCard={showAddCard} />
                      </TabPane>
                      <TabPane tab={AccountTabs.SUBSCRIPTION} key={AccountTabs.SUBSCRIPTION}>
                        <AllSubscriptions showUpdateSubscription={showUpdateSubscription} />
                      </TabPane>
                    </Tabs>
                  </Col>
                </>
              ) : (
                <Col span={16} offset={1}>
                  <AllAddresses showAddAddress={showAddAddress} />
                  <AllCards showAddCard={showAddCard} />
                  <AllSubscriptions showUpdateSubscription={showUpdateSubscription} />
                </Col>
              )}
            </Row>
            {updateProfileVisible && (
              <ProfileForm
                visible={updateProfileVisible}
                profileToEdit={editingProfile}
                onCancel={hideEditProfile}
              />
            )}
            {changePasswordVisible && (
              <ChangePasswordForm visible={changePasswordVisible} onCancel={hideChangePassword} />
            )}
            {addAddressVisible && (
              <AddressForm visible={addAddressVisible} onCancel={hideAddAddress} />
            )}
            {addCardVisible && (
              <Elements>
                <CardForm
                  visible={addCardVisible}
                  onCancel={hideAddCard}
                  consumerId={consumer?.data?.data?.consumer?.id}
                  invalidateConsumer={() => invalidateConsumer(queryClient)}
                />
              </Elements>
            )}
            {updateSubscriptionVisible && (
              <SubscriptionForm
                visible={updateSubscriptionVisible}
                subscriptionToEdit={subscriptionItem}
                onCancel={hideUpdateSubscription}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
