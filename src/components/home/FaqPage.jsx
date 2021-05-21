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
              <p className="sub-header">Help Topics</p>
              <Link className={index==='test1'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test1'); }} >
                Signing Up and Setting Up
              </Link>
              <Link className={index==='test2'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test2'); }} >
                Menu and Schedules
              </Link>
              <Link className={index==='test3'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test3'); }} >
                Diposits
              </Link>
              <Link className={index==='test4'?'nav-link-active nav-link':'nav-link'} onClick={()=> {setIndex('test4'); }} >
                Getting Help
              </Link>
            </div>
          </Col>
          <Col xs={24} lg={16} className="px-4">
            <Element className={index==='test1'?'element content-show':'content-hide'} >
              <p className = "sub-header">Signing Up and Setting Up</p>

              <p className="faq-sub-header">How do I sign up for Cottage?</p>
              <p className="faq-content">Simply create an account at <a href='https://dashboard.cottage.menu'>https://dashboard.cottage.menu</a>.</p>

              <p className="faq-sub-header">How do I create a business?</p>
              <p className="faq-content">Once you've created your account, you can login</p>

              <p className="faq-sub-header">Can I create more than one business?</p>
              <p className="faq-content">Yes, Cottage can support multiple businesses, but keeps their information separate and enables you to quickly switch between them.</p>

              <p className="faq-sub-header">How do I create multiple locations?</p>
              <p className="faq-content">Treat your locations as distinct businesses. Simply create your location as a new business, but name it in a way to indicate that it is the same business. This will make it clear to your customers that these are the same business</p>

              <p className="faq-sub-header">What is the unique business URL?</p>
              <p className="faq-content">This is a user-friendly URL to create so your customers can see a memorable, recognizable URL.</p>

              <p className="faq-sub-header">What is a license ID and why do you need it?</p>
              <p className="faq-content">This is to save a license identifier from a food or restaurant authority in your locale. We'll display your license ID on your business page as a way of building trust with your customers</p>.

              <p className="faq-sub-header">Why do you need a tax ID?</p>
              <p className="faq-content">We'll use this tax ID to report your income to the government for tax purposes, and we'll send you a 1099 of your earnings.
              </p>

            </Element>

            <Element className={index==='test2'?'element content-show':'content-hide'} >
              <p className="sub-header">Menu and Schedules</p>
              <div className="term-content">
              <p className = "text-sm">Posted: July 10, 2020</p>
              <p>
              Donec sed odio dui. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              </p>
              </div>
            </Element>

            <Element className={index==='test3'?'element content-show':'content-hide'} >
              <p className="sub-header"> Diposits</p>
              <div className="term-content">
              <p>
              Cottage provides an online marketplace platform using web-based technology ("Platform") that connects Food Producers and Food Consumers, as described in these Terms for Cottage Marketplace. Cottage is not a merchant or delivery service; it is an online connection platform. Food Producer and Cottage agree they are independent businesses whose relationship is governed by the Sign-Up Sheet and these Terms. Nothing in the Parties' agreements, relationship or transactions shall create or be construed as creating an agency, partnership, fiduciary or joint venture relationship between Cottage and Food Producer (or Food Producer's employees, representatives or locations), Cottage and Courier, or Cottage and customers. Except as expressly set forth in the Sign-Up Sheet and these Terms, each Party shall be responsible for its own expenses, profits and losses.
              </p>
              </div>
            </Element>
            <Element className={index==='test4'?'element content-show':'content-hide'} >
              <p className="sub-header">Getting Help</p>
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
