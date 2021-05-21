import React from "react";
import { Row, Col, Card } from "antd";
import errorIcon from "assets/common/errorIcon.svg";
import "./ErrorBox.scss";

export const ErrorsBox = ({ messages, style = {}, className = "" }) => (
  <div>
    <Card bordered={false} style={style} className={`dashboard-form-input-error-box ${className}`}>
      <Row>
        <Col xs={3} sm={3} md={2} lg={2} xl={2}>
          <img className="error-icon" src={errorIcon} alt="errorIcon" />
        </Col>
        <Col xs={21} sm={21} md={22} lg={22} xl={22}>
          <ul>
            {messages.map((m, i) => (
              <li key={i}> {m.message} </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Card>
  </div>
);

export default ErrorsBox;
