import React from "react";
import { Select, Skeleton } from "antd";
import moment from "moment";
import { connect } from "react-redux";

const { Option } = Select;
function AllProductSchedules({
  selectedScheduleId,
  schedules,
  onScheduleChange,
  isMobileView,
  isLoading,
}) {
  schedules.sort((a, b) => a.node.orderReadyStart - b.node.orderReadyStart);
  return (
    <>
      {schedules && (
        <div
          className={
            schedules.length === 0
              ? "Transportation-selection-wrapper disabled"
              : "Transportation-selection-wrapper"
          }
          datalabel={!isLoading ? "When" : ""}>
          {isMobileView ? (
            <>
              {isLoading ? (
                <Skeleton.Input active={isLoading} />
              ) : (
                <>
                  {schedules.length === 0 ? (
                    <select disabled>
                      <option value="No schedules found">No schedules found</option>
                    </select>
                  ) : (
                    <select
                      defaultValue={selectedScheduleId}
                      onChange={(e) => onScheduleChange(e.key)}>
                      {schedules.map((e) => (
                        <option
                          key={e.node.id}
                          value={e.node.id}
                          className="address-select-options">
                          {moment(e.node.orderReadyStart).format("ddd, MMM D [at] h:mm a [-] ")}
                          {moment(e.node.orderReadyEnd).format("h:mm a")}
                        </option>
                      ))}
                    </select>
                  )}{" "}
                </>
              )}
            </>
          ) : (
            <>
              {isLoading ? (
                <Skeleton.Input active={isLoading} />
              ) : (
                <>
                  {schedules.length === 0 ? (
                    <Select
                      className={!isLoading ? "address-select date" : "address-select"}
                      defaultValue="No schedules found"
                      value="No schedules found"
                      disabled>
                      <Option className="address-select-options">
                        <div className="pick-up-address-title" value="No schedules found">
                          No schedules found
                        </div>
                      </Option>
                    </Select>
                  ) : (
                    <Select
                      className={!isLoading ? "address-select date" : "address-select"}
                      getPopupContainer={(trigger) => trigger.parentNode}
                      defaultValue={selectedScheduleId}
                      value={selectedScheduleId}
                      onChange={onScheduleChange}>
                      {schedules.map((e) => (
                        <Option
                          key={e.node.id}
                          value={e.node.id}
                          className="address-select-options">
                          <div className="pick-up-address-title">
                            {moment(e.node.orderReadyStart).format("ddd, MMM D [at] h:mm a [-] ")}
                            {moment(e.node.orderReadyEnd).format("h:mm a")}
                          </div>
                        </Option>
                      ))}
                    </Select>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isMobileView: state.mobileView.isMobileView,
  };
};

export default connect(mapStateToProps, null)(AllProductSchedules);
