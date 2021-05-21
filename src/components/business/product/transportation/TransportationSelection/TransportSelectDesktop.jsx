import React, { Component } from "react";
import { Select, Row, Col, Skeleton } from "antd";
import { TransportationType } from "../../../../../constants";
import AllProductSchedules from "../../menu/AllProductSchedules";
const { Option } = Select;
class TransportSelectDesktop extends Component {
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
      setTransportationType,
      handleAddressChange,
      addButtonContainer,
    } = this.props;
    return (
      <Row type="flex" gutter={[5, 5]} align="middle" className="Transport-desktop-wrapper">
        <Col xs={24} sm={24} xl={3} lg={4}>
          <div className="Transportation-selection-wrapper" datalabel={"Type"}>
            <Select
              size={"large"}
              defaultValue={transportationType}
              value={transportationType}
              onChange={(e) => setTransportationType(e)}
              className="address-select type">
              <Option value={TransportationType.PICK_UP} className="address-select-options">
                <div className="pick-up-address-title center"> Pick up</div>
              </Option>
              <Option value={TransportationType.DELIVERY} className="address-select-options">
                <div className="pick-up-address-title center">Delivery</div>
              </Option>
            </Select>
          </div>
        </Col>
        {transportationType === TransportationType.DELIVERY && (
          <Col xs={24} sm={24} xl={11} lg={10}>
            <div className="transport-address-add-button">{!isLoading && addButtonContainer}</div>
            <div
              className={
                consumerAddresses.length === 0
                  ? "Transportation-selection-wrapper  disabled"
                  : "Transportation-selection-wrapper"
              }
              datalabel={!isLoading && "Where"}>
              {isLoading ? (
                <Skeleton.Input active={isLoading} />
              ) : (
                <>
                  {consumerAddresses.length === 0 ? (
                    <Select
                      className={!isLoading ? "address-select date" : "address-select"}
                      defaultValue="No address found"
                      value="No address found"
                      disabled>
                      <Option className="address-select-options">
                        <div className="pick-up-address-title" value="No address found">
                          No address found
                        </div>
                      </Option>
                    </Select>
                  ) : (
                    <Select
                      value={selectedAddressId}
                      defaultValue={selectedAddressId}
                      className="address-select"
                      getPopupContainer={(trigger) => trigger.parentNode}
                      onSelect={handleAddressChange}>
                      {consumerAddresses.map((e) => (
                        <Option
                          key={e.node.id}
                          value={e.node.id}
                          className="address-select-options">
                          <div className="pick-up-address-title"> {e.node.street}</div>
                        </Option>
                      ))}
                    </Select>
                  )}
                </>
              )}
            </div>
          </Col>
        )}
        {transportationType === TransportationType.PICK_UP && (
          <Col xs={24} sm={24} xl={11} lg={10}>
            <div
              className={
                !pickupAddresses
                  ? "Transportation-selection-wrapper  disabled"
                  : "Transportation-selection-wrapper"
              }
              datalabel={!isLoading && "Where"}>
              {isLoading ? (
                <Skeleton.Input active={isLoading} />
              ) : (
                <>
                  {pickupAddresses.length === 0 ? (
                    <Select
                      className={!isLoading ? "address-select date" : "address-select"}
                      defaultValue=" No pickup location found"
                      value=" No pickup location found"
                      disabled>
                      <Option className="address-select-options">
                        <div className="pick-up-address-title" value=" No pickup location found">
                          No pickup location found
                        </div>
                      </Option>
                    </Select>
                  ) : (
                    <Select
                      value={selectedAddressId}
                      defaultValue={selectedAddressId}
                      className="address-select"
                      getPopupContainer={(trigger) => trigger.parentNode}
                      onChange={handleAddressChange}>
                      {pickupAddresses.edges.map((e) => (
                        <Option
                          key={e.node.id}
                          value={e.node.id}
                          className="address-select-options">
                          <div className="pick-up-address-title">
                            {" "}
                            {e.node.title && ` ${e.node.title}, `}
                            {e.node.street}
                          </div>
                          <div>{`${e.node.postalCode}`}</div>
                        </Option>
                      ))}
                    </Select>
                  )}{" "}
                </>
              )}
            </div>
          </Col>
        )}
        <Col xs={24} sm={24} xl={10} lg={10}>
          <AllProductSchedules
            isLoading={isLoading}
            selectedScheduleId={selectedScheduleId}
            schedules={schedules}
            onScheduleChange={onScheduleChange}
          />
        </Col>
      </Row>
    );
  }
}

export default TransportSelectDesktop;
