import React from 'react';
import { useGetAddresses, useGetCards } from 'store/react-query';

import { SpoonSpinner } from 'components/common/SpoonAndForkSpinner/spoonAndFork';
import AddressTable from 'components/purchase/address/AddressTable';
import CardTable from 'components/purchase/card/CardTable';

const AddressPane = () => {
  const addressQuery = useGetAddresses();
  const cardQuery = useGetCards();

  if (addressQuery.isLoading || cardQuery.isLoading) {
    return <SpoonSpinner isLoading={true} />;
  }

  if (addressQuery.isError || cardQuery.isError) {
    return <div>Something went wrong</div>;
  }

  const { id: addressConsumerId, addresses = {} } = addressQuery?.data?.data?.consumer;
  const { edges: addressEdges = [] } = addresses;

  const { id: cardConsumerId, cards = {} } = cardQuery?.data?.data?.consumer;
  const { edges: cardEdges = [] } = cards;

  return (
    <div>
      <AddressTable consumerId={addressConsumerId} addresses={addressEdges} />
      <CardTable consumerId={cardConsumerId} cards={cardEdges} />
    </div>
  );
};

export default AddressPane;
