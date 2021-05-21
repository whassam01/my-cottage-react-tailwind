import React from "react";
import errorIcon from "../../../assets/common/errorIcon.svg";
import { Row, Col, Card } from "antd";
import "./ErrorBox.scss";

export const ErrorBox = (props) => {
  return (
    <Card
      bordered={false}
      style={props.style}
      className={`dashboard-form-input-error-box ${props.className}`}>
      <Row>
        <Col xs={3} sm={3} md={2} lg={2} xl={2}>
          <img className="error-icon" src={errorIcon} alt="errorIcon" />
        </Col>
        <Col xs={21} sm={21} md={22} lg={22} xl={22}>
          {props.message ? (
            <div className="error-message">{props.message}</div>
          ) : (
            <ul>{props.messages && props.messages.map((m, i) => <li key={i}> {m} </li>)}</ul>
          )}
        </Col>
      </Row>
    </Card>
  );
};
