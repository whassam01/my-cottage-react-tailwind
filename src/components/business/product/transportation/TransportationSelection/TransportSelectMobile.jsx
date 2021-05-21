import React, { Component } from "react";
import { TransportationType } from "../../../../../constants";
import AllProductSchedules from "../../menu/AllProductSchedules";
import { Skeleton } from "antd";
class TransportSelectMobile extends Component {
  render() {
    const {
      isLoading,
      schedules,
      pickupAddresses,
      onScheduleChange,
      selectedAddressId,
      consumerAddresses,
      transportationType,
      selectedScheduleId,
      handleAddressChange,
      addButtonContainer,
    } = this.props;

    return (
      <>
        <div className="Transportation-selection-wrapper" datalabel={"Type"}>
          <select
            className="type-selection"
            value={transportationType}
            onChange={(e) => this.props.setTransportationType(e.target.value)}>
            <option value={TransportationType.PICK_UP}>Pick up</option>
            <option value={TransportationType.DELIVERY}>Delivery</option>
          </select>
        </div>
        {transportationType === TransportationType.DELIVERY && (
          <>
            <div
              className={
                consumerAddresses.length === 0
                  ? "Transportation-selection-wrapper disabled"
                  : "Transportation-selection-wrapper"
              }
              datalabel={!isLoading ? "Where" : null}>
              {!isLoading ? (
                <div className="tranportation-address-mobile-selection">
                  {consumerAddresses.length === 0 ? (
                    <select disabled>
                      <option value="No address found">No address found</option>
                    </select>
                  ) : (
                    <select
                      onChange={(e) => handleAddressChange(e.target.value)}
                      value={selectedAddressId ? selectedAddressId : "Create New Address"}
                      className="address-selection">
                      <>
                        {consumerAddresses.map((e) => (
                          <option
                            key={e.node.id}
                            value={e.node.id}
                            className="pickup-select-options">
                            {e.node.street}
                          </option>
                        ))}
                      </>
                    </select>
                  )}
                  <div className="addButton-mobile-container">{addButtonContainer}</div>
                </div>
              ) : (
                <Skeleton.Input active={isLoading} />
              )}
            </div>
          </>
        )}
        {transportationType === TransportationType.PICK_UP && (
          <div
            className={
              pickupAddresses.length === 0
                ? "Transportation-selection-wrapper disabled"
                : "Transportation-selection-wrapper"
            }
            datalabel={!isLoading ? "Where" : null}>
            {!isLoading ? (
              <>
                {pickupAddresses.length === 0 ? (
                  <select disabled>
                    <option value="No pickup location found">No pickup location found</option>
                  </select>
                ) : (
                  <select
                    defaultValue={selectedAddressId}
                    onChange={(e) => handleAddressChange(e.target.value)}
                    className="address-selection">
                    <>
                      {pickupAddresses.edges.map((e) => (
                        <option
                          key={e.node.id}
                          value={e.node.id}
                          className="address-select-options">
                          {e.node.title && e.node.title} {`${e.node.street}, ${e.node.postalCode}`}
                        </option>
                      ))}
                    </>
                  </select>
                )}
              </>
            ) : (
              <Skeleton.Input active={isLoading} />
            )}
          </div>
        )}
        <AllProductSchedules
          isLoading={isLoading}
          selectedScheduleId={selectedScheduleId}
          schedules={schedules}
          onScheduleChange={onScheduleChange}
        />
      </>
    );
  }
}

export default TransportSelectMobile;
