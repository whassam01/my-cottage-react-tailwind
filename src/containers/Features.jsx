import React from 'react';
import { Row, Col, Divider } from 'antd';
import { Footer } from '../components/common';
import 'components/home/FullPage.scss';
import './features.scss';
import { Topmenu } from '../components/common/TopMenu/Topmenu';
import PowerupSection from '../components/home/FullPageSections/PowerupSection';

const FeaturePage = () => {
  return (
    <div className="relative md:mt-6 featurepage">
      <Topmenu />

      <div className="home-container mt-0 md:mt-0 px-0 md:px-6">
        <div className="featured-hero-wrapper relative">
          <Row type="flex" align="top" className="pt-16 md:pt-20 lg:pt-32">
            <Col xs={{ span: 24 }} lg={{ span: 9, offset: 1 }}>
              <div className="featured-hero-title text-xl mt-12 text-center md:text-center lg:text-left">
                Features for Business Owners
              </div>
              <Divider className="w-14 mx-auto my-6 md:my-10 md:my-6 lg:ml-0" />
              <div className="featurd-hero-subtitle text-center md:text-center lg:text-left mobileblue md:mb-6 mb-0">
                Meet your new <br /> kitchen dashboard
              </div>
            </Col>
            <Col lg={14} className="mx-3 md:mx-0 mt-4 md:mt-0">
              <img src={require('./../assets/features/hero_dashboard_overview@2x.png')} alt="" />
            </Col>
          </Row>
        </div>
        <Row>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 1 }} className="px-4 md:px-0">
            <Row>
              <Col xs={24} md={24} lg={24}>
                <div className="text-center feature-subtitle mx-auto mt-16 mb-12">
                  Designed to keep your kitchen humming with easy menu creation, scheduling and
                  delivery/pickup settings and more.
                </div>
              </Col>
            </Row>
            <Row type="flex" align="middle" className="features-content-wrapper py-12">
              <Col lg={12}>
                <img src={require('./../assets/features/feature_dashboard_menu@2x.jpg')} alt="" />
              </Col>
              <Col
                md={{ span: 20, offset: 2 }}
                lg={{ span: 10, offset: 2 }}
                className="px-4 md:px-0 lg:pr-6">
                <div className="featured-title mb-4">
                  Organize your menu items with full nutritional details
                </div>
                <div className="featured-content">
                  Build a beautiful looking menu complete with photos nutritional info, ingredients
                  lists, and dietary tags to satisfy even the most health-conscious eaters.
                </div>
              </Col>
            </Row>
            <Row type="flex" align="middle" className="features-content-wrapper py-12">
              <Col lg={12}>
                <img
                  src={require('./../assets/features/feature-dashboard-scheduling.png')}
                  alt=""
                  className="md:ml-4 lg:ml-0"
                />
              </Col>
              <Col
                md={{ span: 20, offset: 2 }}
                lg={{ span: 10, offset: 2 }}
                className="px-6 md:px-0 lg:pr-6">
                <div className="featured-title mb-4">
                  Create flexible, dynamic ordering schedules
                </div>
                <div className="featured-content">
                  Only deliver on Tuesday’s and Friday’s? Breakfast options available for pickup
                  before 11am? We give you full flexibility to create dynamic schedules that fit
                  however you do business.
                </div>
              </Col>
            </Row>
            <Row type="flex" align="middle" className="features-content-wrapper py-12 pb-0 lg:pb-4">
              <Col lg={12}>
                <img
                  src={require('./../assets/features/feature_dashboard_delivery@2x.jpg')}
                  alt=""
                />
              </Col>
              <Col
                md={{ span: 20, offset: 2 }}
                lg={{ span: 10, offset: 2 }}
                className="px-6 md:px-0 lg:pr-6">
                <div className="featured-title mb-4">
                  Set multiple pickup locations and custom delivery options
                </div>
                <div className="featured-content">
                  With no limit on pickup locations and the ability to set up zones that
                  automatically calculate delivery charges, you can be sure you’re earning enough
                  without crunching numbers.
                </div>
              </Col>
            </Row>
            <Row
              type="flex"
              align="middle"
              className="features-content-wrapper pb-24 items-stretch px-3 md:px-10"
              gutter={24}>
              <Col lg={12}>
                <div className="rounded-xl pt-6 pb-2 md:py-3 px-6 md:px-10 flex-col md:flex md:flex-row items-center h-full featured-content-org featured-content-blue mt-8">
                  <div className="flex mb-3 md:md-0">
                    <div className="w-14 md:w-10 mr-3 md:mr-10">
                      <img src={require('./../assets/features/deal-paper.svg')} alt="" />
                    </div>
                    <h4 className="m-0 block md:hidden">An easier way to deal with paperwork</h4>
                  </div>
                  <div>
                    <h4 className="m-0 hidden md:block pb-2">
                      An easier way to deal with paperwork
                    </h4>
                    <p>
                      Get a full breakdown of your orders for each day, so you can stay organized
                      and focused on cooking great food.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={12} className="mt-6 lg:mt-0">
                <div className="rounded-xl pt-6 pb-2 md:py-3 px-6 md:px-10 flex-col md:flex md:flex-row items-center h-full featured-content-org featured-content-blue mt-8">
                  <div className="flex mb-3 md:md-0">
                    <div className="w-14 md:w-10 mr-3 md:mr-10">
                      <img src={require('./../assets/features/trending-up.svg')} alt="" />
                    </div>
                    <h4 className="m-0 block md:hidden">Track trends and figure out what sells</h4>
                  </div>
                  <div>
                    <h4 className="m-0 hidden md:block pb-2">
                      Track trends and figure out what sells
                    </h4>
                    <p>
                      Get to know your customers purchaing patterns with insights into which of your
                      products are most popular.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <div id="customer-features" style={{ paddingBottom: '2rem' }} />
        <div className="featured-hero-wrapper featured-hero-wrapper-orange relative mt-12 mx-0 md:mx-0">
          <Row type="flex">
            <Col xs={{ span: 24 }} lg={{ span: 9, offset: 1 }} className="md:px-10 lg:px-0 ">
              <div className="featured-hero-title text-xl mt-12 md:mt-20 lg:mt-12 text-center md:text-center lg:text-left">
                Features for Customers
              </div>
              <Divider className="w-14 mx-auto my-6 md:my-10 md:my-6 lg:ml-0" />
              <div className="featurd-hero-subtitle text-center md:text-center lg:text-left mobileblue md:mb-6 mb-0 mb-4 md:mb-0">
                Integrated online menu <br /> for taking orders
              </div>
            </Col>
            <Col lg={13} className="mx-3 md:mx-0">
              <img src={require('./../assets/features/hero_ecomm_overview@2x.png')} alt="" />
            </Col>
          </Row>
        </div>

        <Row>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 1 }} className="px-4 md:px-0">
            <Row>
              <Col xs={24} md={24} lg={24}>
                <div className="text-center feature-subtitle mx-auto mt-16 mb-12">
                  A modern menu ordering experience built specifically with food producers and meal
                  services in mind.
                </div>
              </Col>
            </Row>
            <Row type="flex" align="middle" className="features-content-wrapper py-12">
              <Col lg={12}>
                <img src={require('./../assets/features/feature_ecomm_multiday@2x.jpg')} alt="" />
              </Col>

              <Col
                md={{ span: 20, offset: 2 }}
                lg={{ span: 10, offset: 2 }}
                className="px-6 md:px-0 lg:pr-6">
                <div className="featured-title mb-4">
                  A flexible checkout flow for building multi-day orders
                </div>
                <div className="featured-content">
                  Ordering a meal doesn’t just happen every once in a while anymore. We make it easy
                  for customers to build complex orders at once without any hurdles.
                </div>
              </Col>
            </Row>
            <Row type="flex" align="middle" className="features-content-wrapper py-12">
              <Col lg={12}>
                <img
                  src={require('./../assets/features/feature_ecomm_subscription@2x.jpg')}
                  alt=""
                />
              </Col>
              <Col
                md={{ span: 20, offset: 2 }}
                lg={{ span: 10, offset: 2 }}
                className="px-6 md:px-0 lg:pr-6">
                <div className="featured-title mb-4">
                  Create subscriptions, discount codes, and coupons
                </div>
                <div className="featured-content">
                  Promote your service with a coupon, treat a loyal customer to a free meal, or let
                  diehard eaters purchase subscriptions for quick and easy return business.
                </div>
              </Col>
            </Row>
            <Row type="flex" align="middle" className="features-content-wrapper pt-12">
              <Col lg={12}>
                <img src={require('./../assets/features/feature_ecomm_userprofile.png')} alt="" />
              </Col>
              <Col
                md={{ span: 20, offset: 2 }}
                lg={{ span: 10, offset: 2 }}
                className="px-6 md:px-0 lg:pr-6">
                <div className="featured-title mb-4">
                  Customer accounts for quick order checkout
                </div>
                <div className="featured-content">
                  A loyal customer base is essential to any food service. Users can save their
                  account details, addresses and payment methods to streamline their next purchase.
                </div>
              </Col>
            </Row>
            <Row
              type="flex"
              align="middle"
              className="features-content-wrapper pt-0 pb-32 px-3 md:px-10"
              gutter={24}>
              <Col lg={12}>
                <div className="rounded-xl pt-6 pb-2 md:py-6 px-6 md:px-10 flex-col md:flex md:flex-row items-center featured-content-org mt-8">
                  <div className="flex mb-3 md:md-0 items-center content-center">
                    <div className="w-14 md:w-10 mr-3 md:mr-8">
                      <img src={require('./../assets/features/secure-icon.svg')} alt="" />
                    </div>
                    <h4 className="m-0 block md:hidden">Secure payment processing built in</h4>
                  </div>
                  <div>
                    <h4 className="m-0 hidden md:block md:mb-1">
                      Secure payment processing built in
                    </h4>
                    <p>
                      We use Stripe™ to manage every transaction securely and keep customer data
                      safe, with funds automatically deposited direct to your bank account.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={12}>
                <div className="rounded-xl pt-6 pb-2 md:py-6 px-6 md:px-10 flex-col md:flex md:flex-row items-center featured-content-org mt-8">
                  <div className="flex mb-3 md:md-0 items-center content-center">
                    <div className="w-14 md:w-10 mr-3 md:mr-8">
                      <img src={require('./../assets/features/host-icon.svg')} alt="" />
                    </div>
                    <h4 className="m-0 block md:hidden">
                      Host with us or directly on your own site
                    </h4>
                  </div>
                  <div>
                    <h4 className="m-0 hidden md:block md:mb-1">
                      Host with us or directly on your own site
                    </h4>
                    <p>
                      We give businesses of any size the option to host their customer ordering on
                      Cottage for free or hosted directly on your own website using a-record
                      support.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <PowerupSection />
      <Footer />
    </div>
  );
};

export default FeaturePage;
