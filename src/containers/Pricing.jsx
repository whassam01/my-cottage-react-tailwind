/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import { Footer } from '../components/common';
import './../components/home/FullPage.scss';
import './features.scss';
import './pricing.scss';
import { Topmenu } from '../components/common/TopMenu/Topmenu';

class Pricingpage extends Component {
  render() {
    return (
      <div className="relative md:mt-6 pricingpage">
        <Topmenu />

        <div className="home-container md:mt-0 px-0 md:px-6">
          <div className="featured-hero-wrapper pricing-hero-wrapper relative">
            <Row type="flex" align="top" className="md:pt-32 text-center">
              <Col xs={{ span: 20, offset: 2 }} lg={{ span: 14, offset: 5 }}>
                <div className="featurd-hero-subtitle pt-20 pb-10 md:pb-10 md:pt-0 lg:pb-20">
                  Simple pricing tailored for any size of food service
                </div>
              </Col>
              <Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 1 }} xl={{ span: 18, offset: 3 }}>
                <Row type="flex" gutter={{ xs: 0, sm: 0, md: 0, lg: 16 }}>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    md={{ span: 22, offset: 1 }}
                    lg={{ span: 12, offset: 0 }}
                    className="ant-col-lg-12-cstm ant-col-sm-offset-3-cstm">
                    <div className="h-full mx-6 md:mx-0">
                      <div className="h-full rounded-2xl cottage-standard-container p-8 md:p-12">
                        <h2>Cottage Standard</h2>
                        <p>A simple start to online meal-service ordering with affordable pricing.</p>

                        <div className="md:flex lg:block ipad-fix">
                          <div className="inner-pricing-block rounded-2xl py-8  md:mr-3 lg:mr-0">
                            <div className="px-6 lg:px-8 xl:px-20 mx-auto kitchen-innercontent">

                              <div className="py-0 text-white flex flex-nowrap flex-col md:flex-row items-center mx-auto">
                                <span className="percentage w-full md:w-2/4 text-center md:text-left lg:text-left">
                                  4.9%{' '}
                                </span>
                                <span className="md:w-2/4  text-center md:text-left greengray">
                                  No setup fees or additional costs
                                </span>
                              </div>


                              <div className="flex py-2 mt-10 items-center">
                                <div className="mr-2 w-8 text-left">
                                  <img
                                    src={require('./../assets/pricing/dashboard.svg')}
                                    className="block mx-auto"
                                    alt=""
                                  />
                                </div>
                                <div className="text-left md:text-left">
                                  Kitchen Management Dashboard
                                </div>
                              </div>
                              <div className="flex py-2 items-center">
                                <div className="mr-2 w-8 text-left">
                                  <img
                                    src={require('./../assets/pricing/cart.svg')}
                                    className="block mx-auto"
                                    alt=""
                                  />
                                </div>
                                <div className="text-left md:text-left">
                                  Online Menu Ordering System
                                </div>
                              </div>
                              <div className="flex py-2 items-center">
                                <div className="mr-2 w-8 text-left">
                                  <img
                                    src={require('./../assets/pricing/dollar.svg')}
                                    className="block mx-auto"
                                    alt=""
                                  />
                                </div>
                                <div className="text-left md:text-left">
                                  Payments with Stripe (included)
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="py-8 md:ml-2 lg:ml-0 px-3 md:px-0">
                            <div className="flex flex-col  md:flex-col lg:flex-row ipadfix">
                              <div className="flex-grow">
                                <div className="flex py-2 items-center">
                                  <div className="mr-2 w-8 text-left md:text-left items-center">
                                    <img
                                      src={require('./../assets/pricing/map-pointer.svg')}
                                      className="block mx-auto"
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-left md:text-left text-white">
                                    Up to 2 locations
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="flex py-2 items-center">
                                  <div className="mr-2 w-8 text-left md:text-center items-center">
                                    <img
                                      src={require('./../assets/pricing/open-book.svg')}
                                      className="block mx-auto"
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-left md:text-left text-white">
                                    50 menu items
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col  md:flex-col lg:flex-row ipadfix">
                              <div className="flex-grow">
                                <div className="flex py-2 items-center">
                                  <div className="mr-2 w-8 text-left md:text-center items-center">
                                    <img
                                      src={require('./../assets/pricing/tagging.svg')}
                                      className="block mx-auto"
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-left md:text-left text-white">
                                    5 active coupons
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="flex py-2 items-center">
                                  <div className="mr-2 w-8 text-left md:text-center items-center">
                                    <img
                                      src={require('./../assets/pricing/menu-list.svg')}
                                      className="block mx-auto"
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-left md:text-left text-white">
                                    3 meal plans
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row lg:justify-items-center">
                              <div className="flex py-2 lg:mx-auto lg:items-center">
                                <div className="mr-2 w-8 text-left md:text-center items-center">
                                  <img
                                    src={require('./../assets/pricing/daily-schedule.svg')}
                                    className="block mx-auto"
                                    alt=""
                                  />
                                </div>
                                <div className="text-left md:text-left text-white">
                                  Schedule meals and cutoffs
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="md:mt-6 lg:mt-0  hidden">
                          <Button className="relative z-10 slide-1-button border-0 darkGreenBg w-auto h-auto max-w-none py-3 px-6">
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    md={{ span: 22, offset: 1 }}
                    lg={{ span: 12, offset: 0 }}
                    className="mt-12 md:mt-12 lg:mt-0 ant-col-lg-12-cstm ant-col-sm-offset-3-cstm">
                    <div className="h-full mx-6 md:mx-0">
                      <div className="h-full rounded-2xl mt-10 md:mt-0 cottage-standard-container darker-bg py-12 px-6 md:px-12">
                        <h2>Cottage Premium</h2>
                        <p className="opacity-80">
                          For larger businesses with multiple locations and a wide array of product offerings.
                        </p>

                        <div className="md:flex lg:block ipad-fix">
                          <div className="inner-pricing-block darkercolor rounded-2xl py-8 mr-3">
                            <div className="py-3 kitchen-innercontent px-6 lg:px-8 xl:px-20">
                              <div className="py-0 text-white flex flex-nowrap flex-col md:flex-row items-center mx-auto">
                                <span className="percentage w-full md:w-2/4 text-center md:text-left lg:text-left">
                                  7.9%{' '}
                                </span>
                                <span className="md:w-2/4 text-center md:text-left greengray">
                                  No setup fees or additional costs
                                </span>
                              </div>
                              <div className="flex py-2 md:mt-6 items-center">
                                <div className="mr-2 w-8">
                                  <img
                                    src={require('./../assets/pricing/kitchen-mngmnt.svg')}
                                    className="block mx-auto"
                                    alt=""
                                  />
                                </div>
                                <div className="text-white font-normal text-left md:text-left">
                                  Kitchen Management Dashboard
                                </div>
                              </div>
                              <div className="flex py-2 items-center">
                                <div className="mr-2 w-8">
                                  <img
                                    src={require('./../assets/pricing/basket.svg')}
                                    className="block mx-auto"
                                    alt=""
                                  />
                                </div>
                                <div className="text-white font-normal text-left md:text-left">
                                  Online Menu Ordering System
                                </div>
                              </div>
                              <div className="flex py-2 items-center">
                                <div className="mr-2 w-8">
                                  <img
                                    src={require('./../assets/pricing/dollar-light.svg')}
                                    className="block mx-auto"
                                    alt=""
                                  />
                                </div>
                                <div className="text-white font-normal text-left md:text-left">
                                  Payments with Stripe (included)
                                </div>
                              </div>
                              <div className="flex py-2 items-center">
                                <div className="mr-2 w-8">
                                  <img
                                    src={require('./../assets/pricing/use-domain.svg')}
                                    className="block mx-auto"
                                    alt=""
                                  />
                                </div>
                                <div className="text-white font-normal text-left md:text-left">
                                  Use your own domain
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="py-8 px-3 md:px-0 md:ml-2 lg:ml-0">
                            <div className="flex flex-col md:flex-col lg:flex-row ipadfix">
                              <div className="flex-grow">
                                <div className="flex py-2 items-center">
                                  <div className="mr-2 w-8 text-left md:text-center items-center">
                                    <img
                                      src={require('./../assets/pricing/map-pointer.svg')}
                                      className="block mx-auto"
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-left md:text-left text-white text-base">
                                    Up to 10 locations
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="flex py-2 items-center">
                                  <div className="mr-2 w-8 text-left md:text-center items-center">
                                    <img
                                      src={require('./../assets/pricing/open-book.svg')}
                                      className="block mx-auto"
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-left md:text-left text-white text-base">
                                    Unlimited menu items
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-col lg:flex-row ipadfix">
                              <div className="flex-grow">
                                <div className="flex py-2 items-center">
                                  <div className="mr-2 w-8 text-left md:text-center items-center">
                                    <img
                                      src={require('./../assets/pricing/tagging.svg')}
                                      className="block mx-auto"
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-left md:text-left text-white text-base">
                                    Unlimited active coupons
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="flex py-2 items-center">
                                  <div className="mr-2 w-8 text-left md:text-center items-center">
                                    <img
                                      src={require('./../assets/pricing/menu-list.svg')}
                                      className="block mx-auto"
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-left md:text-left text-white text-base">
                                    Unlimited meal plans
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-items-center">
                              <div className="flex py-2 lg:mx-auto lg:items-center">
                                <div className="mr-2 w-8 text-left lg:text-center items-center">
                                  <img
                                    src={require('./../assets/pricing/daily-schedule.svg')}
                                    className="block mx-auto"
                                    alt=""
                                  />
                                </div>
                                <div className="text-left md:text-left text-white text-base">
                                  Multiple daily schedules
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="md:mt-6 lg:mt-0 hidden">
                          <Button className="relative z-10 slide-1-button lighterGreen border-0 w-auto h-auto max-w-none py-3 px-6">
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="flex flex-col md:flex-col lg:flex-row items-stretch  pricing-content-wrapper mx-10 hidden">
                  <div>
                    <div className="rounded-2xl cottage-standard-container p-8 md:p-12">
                      <h2>Cottage Standard</h2>
                      <p>A complete online meal-service platform with affordable pricing.</p>
                      <div className="inner-pricing-block rounded-2xl py-8 md:mr-3 lg:mr-3">
                        <div className="py-0  px-6 md:px-6">
                          <span className="block text-left md:text-center">7.9% </span>per
                          successful order
                        </div>
                        <div className="w-10/12 md:w-9/12 lg:w-9/12 mx-auto mt-6 kitchen-innercontent">
                          <div className="flex py-2">
                            <div className="mr-2 w-8 text-left md:text-center">
                              <img
                                src={require('./../assets/pricing/kitchen-management.svg')}
                                className="block mx-auto"
                                alt=""
                              />
                            </div>
                            <div className="text-left md:text-left">
                              Kitchen Management Dashboard
                            </div>
                          </div>
                          <div className="flex py-2">
                            <div className="mr-2 w-8 text-left md:text-center">
                              <img
                                src={require('./../assets/pricing/online-menu.svg')}
                                className="block mx-auto"
                                alt=""
                              />
                            </div>
                            <div className="text-left md:text-left">
                              Online Menu Ordering System
                            </div>
                          </div>
                          <div className="flex py-2">
                            <div className="mr-2 w-8 text-left md:text-center">
                              <img
                                src={require('./../assets/pricing/dollar.svg')}
                                className="block mx-auto"
                                alt=""
                              />
                            </div>
                            <div className="text-left md:text-left">
                              Payment Processing via Stripe
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-8">
                        <div className="flex flex-col md:flex-row">
                          <div className="flex-grow">
                            <div className="flex py-2 items-center">
                              <div className="mr-2 w-8 text-left md:text-left items-center">
                                <img
                                  src={require('./../assets/pricing/map-pointer.svg')}
                                  className="block mx-auto"
                                  alt=""
                                />
                              </div>
                              <div className="text-left md:text-left text-white">
                                Up to 2 locations
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex py-2 items-center">
                              <div className="mr-2 w-8 text-left md:text-center items-center">
                                <img
                                  src={require('./../assets/pricing/open-book.svg')}
                                  className="block mx-auto"
                                  alt=""
                                />
                              </div>
                              <div className="text-left md:text-left text-white">50 menu items</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                          <div className="flex-grow">
                            <div className="flex py-2 items-center">
                              <div className="mr-2 w-8 text-left md:text-center items-center">
                                <img
                                  src={require('./../assets/pricing/tagging.svg')}
                                  className="block mx-auto"
                                  alt=""
                                />
                              </div>
                              <div className="text-left md:text-left text-white">
                                Up to 2 locations
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex py-2 items-center">
                              <div className="mr-2 w-8 text-left md:text-center items-center">
                                <img
                                  src={require('./../assets/pricing/menu-list.svg')}
                                  className="block mx-auto"
                                  alt=""
                                />
                              </div>
                              <div className="text-left md:text-left text-white">50 menu items</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-items-center">
                          <div className="flex py-2 md:mx-auto md:items-center">
                            <div className="mr-2 w-8 text-left md:text-center items-center">
                              <img
                                src={require('./../assets/pricing/daily-schedule.svg')}
                                className="block mx-auto"
                                alt=""
                              />
                            </div>
                            <div className="text-left md:text-left text-white">50 menu items</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button className="relative z-10 slide-1-button border-0 darkGreenBg w-auto h-auto max-w-none py-3 px-6">
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="md:ml-4">
                    <div className="rounded-2xl mt-10 md:mt-0 cottage-standard-container darker-bg py-12 px-6 md:px-12">
                      <h2>Custom Plans</h2>
                      <p className="opacity-80">
                        For larger businesses who require tailored solutions and pricing models.
                      </p>
                      <div className="inner-pricing-block darkercolor rounded-2xl  py-8">
                        <div className="py-0 text-white">
                          <span className="block text-white d-flex">7.9% </span>per successful order
                        </div>
                        <div className="w-5/6  md:w-9/12 lg:w-9/12 mx-auto mt-4 py-3 kitchen-innercontent">
                          <div className="flex py-2">
                            <div className="mr-2 w-8">
                              <img
                                src={require('./../assets/pricing/kitchen-dash.png')}
                                className="block mx-auto"
                                alt=""
                              />
                            </div>
                            <div className="text-white font-normal text-left md:text-left">
                              Kitchen Management Dashboard
                            </div>
                          </div>
                          <div className="flex py-2">
                            <div className="mr-2 w-8">
                              <img
                                src={require('./../assets/pricing/white-cart.png')}
                                className="block mx-auto"
                                alt=""
                              />
                            </div>
                            <div className="text-white font-normal text-left md:text-left">
                              Online Menu Ordering System
                            </div>
                          </div>
                          <div className="flex py-2">
                            <div className="mr-2 w-8">
                              <img
                                src={require('./../assets/pricing/wrench.svg')}
                                className="block mx-auto"
                                alt=""
                              />
                            </div>
                            <div className="text-white font-normal text-left md:text-left">
                              Payment Processing via Stripe
                            </div>
                          </div>
                          <div className="flex py-2">
                            <div className="mr-2 w-8">
                              <img
                                src={require('./../assets/pricing/wrench.svg')}
                                className="block mx-auto"
                                alt=""
                              />
                            </div>
                            <div className="text-white font-normal text-left md:text-left">
                              Use your own domain
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-8">
                        <div className="flex flex-col md:flex-row">
                          <div className="flex-grow">
                            <div className="flex py-2 items-center">
                              <div className="mr-2 w-8 text-left md:text-center items-center">
                                <img
                                  src={require('./../assets/pricing/map-pointer.svg')}
                                  className="block mx-auto"
                                  alt=""
                                />
                              </div>
                              <div className="text-left md:text-left text-white text-base">
                                Up to 10 locations
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex py-2 items-center">
                              <div className="mr-2 w-8 text-left md:text-center items-center">
                                <img
                                  src={require('./../assets/pricing/open-book.svg')}
                                  className="block mx-auto"
                                  alt=""
                                />
                              </div>
                              <div className="text-left md:text-left text-white text-base">
                                Unlimited menu items
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                          <div className="flex-grow">
                            <div className="flex py-2 items-center">
                              <div className="mr-2 w-8 text-left md:text-center items-center">
                                <img
                                  src={require('./../assets/pricing/tagging.svg')}
                                  className="block mx-auto"
                                  alt=""
                                />
                              </div>
                              <div className="text-left md:text-left text-white text-base">
                                Unlimited active coupons
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex py-2 items-center">
                              <div className="mr-2 w-8 text-left md:text-center items-center">
                                <img
                                  src={require('./../assets/pricing/menu-list.svg')}
                                  className="block mx-auto"
                                  alt=""
                                />
                              </div>
                              <div className="text-left md:text-left text-white text-base">
                                Unlimited meal plans
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-items-center">
                          <div className="flex py-2 lg:mx-auto md:items-center">
                            <div className="mr-2 w-8 text-left md:text-center items-center">
                              <img
                                src={require('./../assets/pricing/daily-schedule.svg')}
                                className="block mx-auto"
                                alt=""
                              />
                            </div>
                            <div className="text-left md:text-left text-white text-base">
                              Multiple daily schedules
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button className="relative z-10 slide-1-button lighterGreen border-0 w-auto h-auto max-w-none py-3 px-6">
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={{ span: 20, offset: 2 }} lg={{ span: 14, offset: 5 }}>
                <div className="featurd-hero-subtitle pt-20 pb-10 md:pb-10 md:pt-0 lg:pb-20 get-ready-to-signup md:mt-16">
                  <h3>Ready to get started?</h3>
                  <p>
                    No hidden fees, no risk. It costs nothing<br/>to create your online store today.
                  </p>
                  <Button className="relative z-10 slide-1-button border-0 darkGreenBg w-auto h-auto max-w-none py-3 px-6">
                    Sign Up Now
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Pricingpage;
