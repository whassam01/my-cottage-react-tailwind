import React, { useLayoutEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button, Row, Col } from 'antd';
import './FullPage.scss';
import { Footer } from '../common';
import { Formik } from 'formik';
import * as Scroll from 'react-scroll';

let Link      = Scroll.Link;
let Element   = Scroll.Element;
let Events    = Scroll.Events;
let scroll    = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;

const Career = () => {
  const [index, setIndex] = useState('test1');
  return (
    <div className="home-container" style={{overflowY: 'none'}}>
      <div className="md:px-8 lg:px-6 flex flex-row">
      <Row type="flex"  className="term-container sm:pt-32 md:pt-40 lg:pt-48 xl:pt-48 w-full md:rounded-2xl xl:px-32 sm:px-12 pb-10">
          <Col xs={24} lg={8} md={8} className="px-4 pb-10">
            <div className="flex flex-col md:max-w-md nav-link-container">
              <p className="sub-header">Careers</p>
              <Link className={index==='test1'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test1'); }} >
                Front-End Developer
              </Link>
              <Link className={index==='test2'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test2'); }} >
                Back-End Developer
              </Link>
              <Link className={index==='test3'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test3'); }} >
                Head of Marketing
              </Link>
              <Link className={index==='test4'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test4'); }} >
                Customer Support
              </Link>
            </div>
          </Col>
          <Col xs={24} lg={16} className="px-4">
            <Element className={index==='test1'?'element content-show':'content-hide'} >
              <p className = "sub-header">Front-End Developer | Remote</p>
              <div className="term-content">
              <p className = "text-sm">Posted: July 10, 2020</p>
              <p>
              Donec sed odio dui. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              </p>
              </div>
              <Button className="careers-btn">Apply for this position</Button>

            </Element>

            <Element className={index==='test2'?'element content-show':'content-hide'} >
              <p className="sub-header">Back-End Developer</p>
              <div className="term-content">
              <p className = "text-sm">Posted: July 10, 2020</p>
              <p>
              Donec sed odio dui. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              </p>
              </div>
              <Button className="careers-btn rounded-md text-white border-0 my-10">Apply for this position</Button>
            </Element>
            <Element className={index==='test3'?'element content-show':'content-hide'} >
              <p className="sub-header"> Head of Marketing</p>
              <div className="term-content">
              <p>
              Cottage provides an online marketplace platform using web-based technology ("Platform") that connects Food Producers and Food Consumers, as described in these Terms for Cottage Marketplace. Cottage is not a merchant or delivery service; it is an online connection platform. Food Producer and Cottage agree they are independent businesses whose relationship is governed by the Sign-Up Sheet and these Terms. Nothing in the Parties' agreements, relationship or transactions shall create or be construed as creating an agency, partnership, fiduciary or joint venture relationship between Cottage and Food Producer (or Food Producer's employees, representatives or locations), Cottage and Courier, or Cottage and customers. Except as expressly set forth in the Sign-Up Sheet and these Terms, each Party shall be responsible for its own expenses, profits and losses.
              </p>
              </div>
            </Element>
            <Element className={index==='test4'?'element content-show':'content-hide'} >
              <p className="sub-header">Customer Support</p>
              <div className="term-content">
              <p>
              Cottage provides an online marketplace platform using web-based technology ("Platform") that connects Food Producers and Food Consumers, as described in these Terms for Cottage Marketplace. Cottage is not a merchant or delivery service; it is an online connection platform. Food Producer and Cottage agree they are independent businesses whose relationship is governed by the Sign-Up Sheet and these Terms. Nothing in the Parties' agreements, relationship or transactions shall create or be construed as creating an agency, partnership, fiduciary or joint venture relationship between Cottage and Food Producer (or Food Producer's employees, representatives or locations), Cottage and Courier, or Cottage and customers. Except as expressly set forth in the Sign-Up Sheet and these Terms, each Party shall be responsible for its own expenses, profits and losses.
              </p>
              </div>
            </Element>
          </Col>
        </Row>

      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default Career;
