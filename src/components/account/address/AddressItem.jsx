import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useArchiveConsumerAddress } from 'store/react-query';
import { createStreetString } from 'utils/index';

const AddressItem = (props) => {
  const { consumerId, address } = props;

  const archiveAddress = useArchiveConsumerAddress();
  const handleRemoveItemClick = (e) => {
    archiveAddress.mutate({ consumerId, addressId: address.id });
  };

  const { city, stateOrProvince, country, postalCode } = address;
  const streetContainer = <div datalabel="STREET AND NUMBER">{createStreetString(address)}</div>;

  const cityContainer = <div datalabel="CITY">{city}</div>;

  const stateContainer = <div datalabel="STATE">{stateOrProvince}</div>;

  const countryContainer = <div datalabel="ZIPCODE">{country}</div>;

  const zipcodeContainer = <div datalabel="COUNTRY">{postalCode}</div>;

  const menu = (
    <Menu>
      <Menu.Item className="cottage-dropdown-text" onClick={handleRemoveItemClick}>
        <DeleteOutlined /> Remove
      </Menu.Item>
    </Menu>
  );

  const addressDropdownContainer = (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <EllipsisOutlined />
    </Dropdown>
  );

  return (
    <>
      <tr className="profile-table-row" id="profile-tabs-table">
        <td>{streetContainer}</td>
        <td>{cityContainer}</td>
        <td>{stateContainer}</td>
        <td>{zipcodeContainer}</td>
        <td>{countryContainer}</td>
        <td>{addressDropdownContainer}</td>
      </tr>
    </>
  );
};

export default AddressItem;
