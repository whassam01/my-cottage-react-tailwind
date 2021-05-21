import React, { useState } from 'react';
import { Card } from 'antd';

import { PlusIcon, SecondaryButton } from 'components/common';
import AddressForm from 'components/purchase/address/AddressForm';

import AddressItem from './AddressItem';

const TableHeaders = ['Street', 'City', 'State', 'Zipcode', 'Country'];

const AddressTable = (props) => {
  const { consumerId, addresses } = props;

  const [addAddressVisible, setAddAddressVisible] = useState(false);

  const showAddAddress = () => {
    setAddAddressVisible(true);
  };

  const hideAddAddress = () => {
    setAddAddressVisible(false);
  };

  return (
    <div className="Profile-tabs-container" style={{ marginBottom: 50 }}>
      <div className="cottage-tabs-button">
        <h1>Addresses</h1>
        <SecondaryButton icon={<PlusIcon />} text="Add address" eventHandler={showAddAddress} />
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
            {addresses.map((address) => (
              <AddressItem key={address.id} consumerId={consumerId} address={address.node} />
            ))}
          </tbody>
        </table>
      </Card>
      {addAddressVisible && (
        <AddressForm
          visible={addAddressVisible}
          onCancel={hideAddAddress}
          consumerId={consumerId}
        />
      )}
    </div>
  );
};

export default AddressTable;
