import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col } from 'antd';

// //icons
//import { ReactComponent as HomeIcon } from './../../../assets/common/cottage-homeIcon.png';

//scss
import './Footer.scss';

export const Footer = () => {
  const history = useHistory();

  const goTerm = () => {
    history.push('./term')
  } 
  return (
    <div className="default-footer-wrapper mt-8 w-64 md:w-full mx-auto">
      <Row>
        <Col xs={24} lg={24} className="mt-4 mb-4 md:mt-0 md:mb-0">
          <div className="text-center py-6">
            <div className="footer-home-icon mx-auto"></div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <div className="text-center md:text-center text-xs text-darkgreen px-8 md:px-0 pb-4">
            Copyright © 2020 Cottage Tech LLC - All rights reserved
          </div>
        </Col>
      </Row>
      <Row className="copyrights md:py-6">
        <Col xs={24} lg={24}>
          <div className="flex md:flex-row justify-around md:justify-center my-6 md:my-0 text-xs">
            <div className="cursor-pointer px-3  text-darkgreen hover:underline text-center pb-2">
              Privacy Policy
            </div>|
            <div className="cursor-pointer px-3 text-darkgreen hover:underline text-center" onClick={goTerm}>
              Terms &amp; Conditions
            </div>
          </div>
        </Col>
      </Row>
      
    </div>
  );
};
