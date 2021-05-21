import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Row, Col } from 'antd';

export default class PowerupSection extends Component {
  render() {
    return (
      <div className="section sectionhome px-0 md:px-0 md:px-0">
        <div className="power-up-section rounded-b-0 lg:rounded-b-0 relative mx-auto overflow-hidden flex justify-center items-center py-10 md:py-0">
          <Row type="flex" justify="space-between" className="block">
            <Col span={24} lg={24}>
              <Row className="block">
                <Col lg={24}>
                  <h2 className="text-center launching-title mx-auto mb-6 py-2">
                    LAUNCHING MID-2021
                  </h2>
                </Col>
              </Row>
            </Col>
            <Col lg={24}>
              <div className="text-center">
                <div className="powerup-content mx-auto px-6 md:px-0 pb-4 mb-6 md:mb-0">
                  Power up your meal service with Cottage
                </div>
              </div>
            </Col>
            <Col lg={24}>
              <div className="flex-col md:flex md:flex-row justify-center mx-auto mt-4">
                <div className="text-center">
                  <Button className="rounded-lg text-lg book-demo border-0 py-4 px-6 h-auto slide-1-button md:ml-6">
                    Get Started
                  </Button>
                </div>
                <div className="text-center">
                  <NavLink
                    to="/pricing"
                    className="flex justify-center items-center bg-transparent border-0 pt-6 md:py-4 h-auto mx-auto px-8 hover:opacity-60">
                    <span className="text-lg text-white">View pricing</span>{' '}
                    <img
                      src={require('../../../assets/home/chevron_right.svg')}
                      className="ml-2"
                      alt=""
                    />
                  </NavLink>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
