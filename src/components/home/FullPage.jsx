import React, { useLayoutEffect, useRef, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button, Row, Col } from 'antd';
import './FullPage.scss';
import { Footer } from '../common';
import FullPageSection from './FullPageSections/FullPageSection';
import FullPageImageSection from './FullPageSections/FullPageImageSection/FullPageImageSection';
import FullPageTextSection from './FullPageSections/FullPageTextSection/FullPageTextSection';
import ZenDeskScript from '../zendesk/ZendeskScript';
import SimpleSlider from './FullPageSections/Simpleslider';
import PowerupSection from './FullPageSections/PowerupSection';
import { Parallax, useController } from 'react-scroll-parallax';

const Fullpage = () => {
  const { parallaxController } = useController();
  const scrollElementRef = useRef();
  useLayoutEffect(() => {
    const handler = () => parallaxController.update();
    window.addEventListener('load', handler);
    return () => window.removeEventListener('load', handler);
  }, [parallaxController]);
  useEffect(()=>{
    // scrollElementRef.addEventListener('scroll', (e) => {
    //   console.log(e)
    // })
  })

  function handleWheel(e) {
    console.log(e)
  }
  return (
    <div className="home-container">
      <div className="md:px-8 lg:px-6">
        <div className="header-bg relative md:rounded-2xl md:rounded-b-none">
          <Row type="flex" align="middle">
            <Col
              xs={{ span: 24, offset: 0 }}
              md={{ span: 11, offset: 1 }}
              lg={{ span: 11, offset: 1 }}>
              <div className="hero-content-wrapper py-8">
                <div className="hero-title px-6 md:px-0">
                  <div className="md:pr-2">
                    Simplify your meal business with Cottage kitchen software
                  </div>
                </div>
                <div className="hero-description mt-4 px-6 md:px-0 md:pr-3">
                  <div>
                    Create an online storefront in minutes! Cottage lets you schedule your menus, take online orders, offer plans and subscriptions, and more. No hidden charges and no monthly fee. It costs nothing to try!
                  </div>
                </div>
                <div className="hero-button mt-8 md:mt-6 lg:mt-16 flex-col text-center md:text-left md:justify-items-start md:flex md:flex-row items-center">
                  <Button className="slide-1-button px-4 w-auto mx-auto md:ml-0">
                    Get Started
                  </Button>
                  <p className="uppercase text-base block md:hidden text-white mt-4 mb-20">
                    Launching mid-2021
                  </p>
                </div>
              </div>
            </Col>
            <Col md={12} lg={12} className="homebanner-right overflow-hidden">
              <img src={require('./../../assets/home/home-banner.jpg')} alt="" className="w-full" />
            </Col>
          </Row>
          <div className="absolute bottom-0 launch-block text-center hidden md:block">
            <div className="px-5 uppercase text-base pt-4 lg:pt-8">Launching mid-2021</div>
          </div>
        </div>

        <Row>
          <Col xs={24} md={24} lg={24} className=" flexitems-end justify-center">
            <h2 className="text-center text-xl mt-4">How It Works</h2>
          </Col>
        </Row>

        <FullPageSection
          textSection={
            <FullPageTextSection
              title={
                <div>
                  <div>Kitchen dashboard</div>
                </div>
              }
              description={
                <div>
                  <div className="subtitle mb-4">Manage your meal inventory and scheduling</div>
                  <div className="mb-8 lg:max-w-sm section-description">
                    Set up menus with pictures and nutritional information. Use schedules to control when menu items are available for purchase.
                    Choose your delivery areas and pickup locations.
                  </div>
                  <div className="section-body-text-info-content-buttons">
                    <NavLink to="/features" className="ant-btn slide-1-button leading-10">
                      Learn More
                    </NavLink>
                  </div>
                  <div className="rounded-xl pt-6 pb-2 md:py-6 px-6 lg:px-10 flex-col md:flex md:flex-row items-center featured-content mt-8">
                    <div className="flex mb-3 items-center content-center md:md-0">
                      <div className="w-14 md:w-10 mr-3 md:mr-10">
                        <img src={require('./../../assets/home/refresh-cw.svg')} alt="" />
                      </div>
                      <h4 className="m-0 block md:hidden">
                        Create subscriptions with full cost analysis
                      </h4>
                    </div>
                    <div>
                      <h4 className="m-0 hidden md:block">
                        Create subscriptions
                      </h4>
                      <p>
                        Offer recurring meal plans and use Cottage's cost analysis to figure out how
                        profitable your plans are.
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
          }
          imageSection={
            <FullPageImageSection
              image={
                <div className="orange-cloud md:pt-0 blue-cloud lg:pl-8">
                  <img
                    src={require('./../../assets/home/home_dashboard@2x.jpg')}
                    alt=""
                    className="relative z-10"
                  />
                </div>
              }
            />
          }
          reverse
        />

        <FullPageSection
          textSection={
            <FullPageTextSection
              title={
                <div>
                  <div>Online orders</div>
                </div>
              }
              description={
                <div>
                  <div className="subtitle mb-4">
                    Sell online without worrying about tech
                  </div>
                  <div className="mb-8 lg:max-w-sm section-description">
                    Simply create your store and your menu. Online credit card payments using Stripe is included with Cottage. Offer your customers subscriptions at no extra cost.
                  </div>
                  <div className="section-body-text-info-content-buttons">
                    <HashLink
                      to="/features#customer-features"
                      className="ant-btn slide-1-button leading-10">
                      Learn More
                    </HashLink>
                  </div>
                  <div className="rounded-xl pt-6 pb-2 md:py-6 px-6 md:px-10 flex-col md:flex md:flex-row items-center featured-content featured-content-org mt-8">
                    <div className="flex mb-3 md:md-0">
                      <div className="w-14 md:w-10 mr-3 md:mr-10">
                        <img src={require('./../../assets/home/calendar.svg')} alt="" />
                      </div>
                      <h4 className="m-0 block md:hidden">Multi-order checkout flow</h4>
                    </div>
                    <div>
                      <h4 className="m-0 hidden md:block">Multi-order checkout flow</h4>
                      <p>Customers can pay for meals across multiple days in a single order.</p>
                    </div>
                  </div>
                </div>
              }
            />
          }
          imageSection={
            <FullPageImageSection
              image={
                <div className="orange-cloud pt-8">
                  <img
                    src={require('./../../assets/home/home_ecomm@2x.jpg')}
                    alt=""
                    className="relative z-10"
                  />
                </div>
              }
            />
          }
        />

        <FullPageSection
          textSection={
            <FullPageTextSection
              title={
                <div>
                  <div>sales Analytics</div>
                </div>
              }
              description={
                <div>
                  <div className="subtitle mb-4 md:w-3/4">
                    Stay on top of your orders and grow your business
                  </div>
                  <div className="mb-8 lg:max-w-sm section-description">
                    Get a realtime look at your orders as they come in, see revenue metrics, and
                    monitor exactly how your business is doing each day.
                  </div>
                </div>
              }
            />
          }
          imageSection={
            <FullPageImageSection
              image={
                <div className="orange-cloud pt-8 yellow-cloud md:pl-0 lg:pl-8">
                  <img
                    src={require('./../../assets/home/home_analytics@2x.jpg')}
                    alt=""
                    className="relative z-10"
                  />
                </div>
              }
            />
          }
          reverse
        />
        <div className="section my-10 md:my-0">
          <div className="why-choose rounded-2xl pb-14 relative mx-auto overflow-hidden">
            <Row type="flex" className="justify-center relative z-10">
              <Col lg={24} className="hidden">
                <Row>
                  <Col lg={24}>
                    <h2 className="text-center">Why Use Cottage?</h2>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="pt-10">
              <SimpleSlider />
            </div>
            <Row type="flex" className="my-10 md:my-0">
              <Col xs={24} md={24} lg={24}>
                <Row className="block md:flex">
                  <Col md={24} lg={8}>
                    <div className="text-center">
                      <div className="py-8">
                        <img
                          src={require('./../../assets/home/tools.svg')}
                          alt=""
                          className="mx-auto"
                        />
                      </div>
                      <div className="why-content mx-auto">
                        Tools that make it easier to do what you do best.
                      </div>
                    </div>
                  </Col>
                  <Col md={24} lg={8}>
                    <div className="text-center">
                      <div className="py-8">
                        <img
                          src={require('./../../assets/home/scale.svg')}
                          alt=""
                          className="mx-auto"
                        />
                      </div>
                      <div className="why-content mx-auto">
                        Scale your business with an automated order workflow
                      </div>
                    </div>
                  </Col>
                  <Col md={24} lg={8}>
                    <div className="text-center">
                      <div className="py-8">
                        <img
                          src={require('./../../assets/home/calc.svg')}
                          alt=""
                          className="mx-auto"
                        />
                      </div>
                      <div className="why-content mx-auto">
                        User-friendly, no technical skills required
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <div className="section fp-auto-height pt-12 pb-16 hidden">
          <div className="who-uses-cottage flex justify-center">
            <Row type="flex" justify="center">
              <Col lg={24} className="flex items-end justify-center">
                <h2 className="text-center text-xl pb-4">Cottage works for:</h2>
              </Col>
              <Col lg={24}></Col>
              <Col lg={24}>
                <Row type="flex" justify="center">
                  <Col lg={12}>
                    <SimpleSlider />
                    <div className="section-box lg:w-72 text-center mx-auto">
                      <div>
                        <img src={require('./../../assets/home/meal-services.jpg')} alt="" />
                      </div>
                      <div className="p-4">
                        <div className="why-sub-title">Meal Services</div>
                        <div className="why-description font-normal">
                          For kitchens big and small, we offer tools that give your food service a
                          simple way to process online orders.
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="section-box lg:w-72 text-center mx-auto">
                      <div>
                        <img src={require('./../../assets/home/personal-chef.jpg')} alt="" />
                      </div>
                      <div className="p-4">
                        <div className="why-sub-title">Personal Chefs</div>
                        <div className="why-description font-normal">
                          Tools for planning and preparing a menu that suits clients with particular
                          dietary needs and preferences.
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="section-box lg:w-72 text-center mx-auto">
                      <div>
                        <img src={require('./../../assets/home/caterers.jpg')} alt="" />
                      </div>
                      <div className="p-4">
                        <div className="why-sub-title">Caterers</div>
                        <div className="why-description font-normal">
                          A painless way to let your customers build catering orders online and
                          send it over to you for review and approval.
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="section-box lg:w-72 text-center mx-auto">
                      <div>
                        <img src={require('./../../assets/home/local-growers.jpg')} alt="" />
                      </div>
                      <div className="p-4">
                        <div className="why-sub-title">Local Growers</div>
                        <div className="why-description font-normal">
                          The perfect tool for small farmers and producers who sell food in their
                          community or at local markets.
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <div className="section mt-8 themission lg:px-0">
        <div className="our-mission flex flex-col justify-center rounded-b-none overflow-hidden md:rounded-t-none relative">
          <Row type="flex" className="h-full mx-0">
            <Col lg={24}>
              <div className="our-mission-content lg:rounded-t-0">
                <div id="background-wrap" style={{zIndex: 'auto'}}>
                  <Parallax
                    x={[95, 65]}
                    tagOuter="figure"
                    opacity={[1, 0]}
                    className = "animate-fadeIn"
                  >
                    <div className="x1" data-aos='fade-up'>
                      <div className="cloud"></div>
                    </div>
                  </Parallax>
                  <Parallax  x={[-20, 15]} tagOuter="figure">
                    <div className="x2">
                      <div className="cloud2"></div>
                    </div>
                  </Parallax>
                  <Parallax  x={[80, 50]} tagOuter="figure" >
                    <div className="x3">
                      <div className="cloud3"></div>
                    </div>
                  </Parallax>
                </div>
                <Parallax y={[50, -30]} >
                  <div className="cloud-hero-container lg:w-4/6 md:w-3/6 mx-auto text-center section-body-text-info-content-description relative z-10" ref={scrollElementRef}>
                    <div className="subtitle">The Cottage Mission</div>
                    <div className="section-description m-2 px-6 lg:px-0">
                      Cottage isn’t just a tool that lets you build a better business, our goal is to
                      help create a thriving community of local food producers in every city across
                      our country and throughout the world.
                    </div>
                    <div>
                      <NavLink to="/about" className="ant-btn slide-1-button mt-8 mb-16 leading-10">
                        Our story...
                      </NavLink>
                    </div>
                    <div>
                      <img
                        src={require('./../../assets/home/union.svg')}
                        alt=""
                        className="mx-auto"
                      />
                    </div>
                  </div>
                </Parallax>

              </div>
              <div className="our-mission-content-mobile lg:rounded-t-0">
                <div id="background-wrap" style={{zIndex: 'auto'}}>
                  <div className="x1" data-aos='fade-up'>
                    <div className="cloud"></div>
                  </div>
                  <div className="x2">
                    <div className="cloud2"></div>
                  </div>
                  <div className="x3">
                    <div className="cloud3"></div>
                  </div>
                </div>
                <div className="cloud-hero-container lg:w-4/6 md:w-3/6 mx-auto text-center section-body-text-info-content-description relative z-10" ref={scrollElementRef}>
                  <div className="subtitle">The Cottage Mission</div>
                  <div className="section-description m-2 px-6 lg:px-0">
                    Cottage isn’t just a tool that lets you build a better business, our goal is to
                    help create a thriving community of local food producers in every city across
                    our country and throughout the world.
                  </div>
                  <div>
                    <NavLink to="/about" className="ant-btn slide-1-button mt-8 mb-16 leading-10">
                      Our story...
                    </NavLink>
                  </div>
                  <div>
                    <img
                      src={require('./../../assets/home/union.svg')}
                      alt=""
                      className="mx-auto"
                    />
                  </div>
                </div>

              </div>
            </Col>
          </Row>
          {/* <Parallax y={[50, -50]}> */}
            <div className="our-mission-hills absolute bottom-0 z-10 w-full relative inline-flex rounded-full h-3 w-3">
              <img
                  src={require('./../../assets/home/landscape_light_square.png')}
                  alt=""
                  className="mx-auto w-full normal-landscape"
                />
                <img
                  src={require('./../../assets/home/ourmission-hills.png')}
                  alt=""
                  className="mx-auto w-full colored-landscape hidden"
                />
            </div>
          {/* </Parallax> */}
        </div>
        <PowerupSection />
      </div>

      <Footer />
      <ZenDeskScript />
    </div>
  );
};
export default Fullpage;
