import React from "react";
import { Row, Col } from "antd";

export function Container(props) {
  const { children, style, fluid, className } = props;
  const breakpoints = fluid
    ? {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24,
        xxl: 24,
      }
    : {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 20,
        xl: 20,
        xxl: 18,
      };
  const defaultStyle = fluid
    ? { position: "relative", maxWidth: "1600px", overflow: "hidden" }
    : {
        margin: "0 auto",
        padding: "15px 15px",
        position: "relative",
        maxWidth: "1600px",
        overflow: "hidden",
      };
  return (
    <Row>
      <Col {...breakpoints} style={{ ...defaultStyle, ...style }} className={className}>
        {children}
      </Col>
    </Row>
  );
}

Container.defaultProps = {
  fluid: false,
};
