import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import { Footer } from '../components/common';
import './features.scss';
import './about.scss';
import { Topmenu } from '../components/common/TopMenu/Topmenu';
import PowerupSection from '../components/home/FullPageSections/PowerupSection';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="contactForm">
        <Row className="pb-6 mt-8">
          <Col xs={24} md={24} className="text-base pb-1">
            Your name
          </Col>
          <Col xs={24} md={24}>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              className="w-full"
            />
          </Col>
        </Row>
        <Row className="pb-6">
          <Col xs={24} md={24} className="text-base pb-1">
            Your e-mail
          </Col>
          <Col xs={24} md={24}>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              className="w-full"
            />
          </Col>
        </Row>
        <Row className="pb-6">
          <Col xs={24} md={24} className="text-base pb-1">
            Your message
          </Col>
          <Col xs={24} md={24}>
            <textarea
              value={this.state.value}
              onChange={this.handleChange}
              className="w-full h-52"></textarea>
          </Col>
        </Row>
        <Row className="pb-6">
          <Col xs={24} md={24}>
            <Button type="submit" className="text-white h-auto py-0 slide-1-button">
              {' '}
              Send Message
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

class About extends Component {
  render() {
    return (
      <div className="relative md:mt-6 aboutuspage">
        <Topmenu />

        <div className="home-container lg:pt-0 md:mt-0 md:pt-0 md:mt-0 px-0">
          <div className="featured-hero-wrapper about-hero-wrapper relative md:rounded-2xl md:mx-6 md:mx-0">
            <Row type="flex" align="top" className="pt-24 md:pt-24">
              <Col xs={{ span: 22, offset: 1 }} lg={{ span: 14, offset: 5 }}>
                <div className="featurd-hero-subtitle text-center darkColor font-normal">
                  The best food is made close to home.
                </div>
              </Col>
              <Col xs={{ span: 22, offset: 1 }} lg={{ span: 12, offset: 6 }} className="pt-8 pb-16">
                <div className="text-center md:px-8">
                  <p>
                    We grew up in communities where people often cooked out of their homes
                    for local families. Whether you were having people over, celebrating a wedding, or just
                    helping out in a difficult situation, people would break out the big pots.
                    It was food cooked from the heart and the influence it had
                    on the people in our neighbourhood was powerful.
                  </p>
                  <p>
                    We want Cottage to empower and inspire a thriving movement of local food growers, producers and kitchens to
                    connect their communities with amazing food.
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 22, offset: 1 }} lg={{ span: 20, offset: 2 }}>
                <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }} className="connecting-people">
                  <Col lg={24}>
                    <div className="text-center connecting-people-title pb-12">
                      Connecting people everywhere with good food
                    </div>
                  </Col>
                  <Col md={24} lg={8}>
                    <div className="relative overflow-hidden rounded-2xl connecting-block flex justify-center items-center">
                      <img
                        src={require('./../assets/about/fromFarm.png')}
                        className="block mx-auto absolute"
                        alt=""
                      />
                      <div className="z-10 connecting-subtitle text-white uppercase font-normal top-2/4 px-3 py-1">
                        From Farm
                      </div>
                    </div>
                    <div className="text-center text-xl px-8 py-4 pb-6 leading-7 pr-2">
                      Local growers who produce great ingredients
                    </div>
                  </Col>
                  <Col md={24} lg={8}>
                    <div className="relative overflow-hidden rounded-2xl connecting-block flex justify-center items-center">
                      <img
                        src={require('./../assets/about/toKitchen.png')}
                        className="block mx-auto absolute"
                        alt=""
                      />
                      <div className="z-10 connecting-subtitle text-white uppercase font-normal px-3 py-1">
                        To Kitchen
                      </div>
                    </div>
                    <div className="text-center text-xl px-12 py-4 pb-6 leading-7">
                      Talented chefs cooking amazing food
                    </div>
                  </Col>
                  <Col md={24} lg={8}>
                    <div className="relative overflow-hidden rounded-2xl connecting-block flex justify-center items-center">
                      <img
                        src={require('./../assets/about/toTable.png')}
                        className="block mx-auto absolute"
                        alt=""
                      />
                      <div className="z-10 connecting-subtitle text-white uppercase font-normal px-3 py-1">
                        To Table
                      </div>
                    </div>
                    <div className="text-center text-xl px-12 py-4 pb-6 leading-7">
                      Hardworking people in every community
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col lg={24}>
                <img
                  src={require('./../assets/about/theMissionBg.png')}
                  className="block mx-auto w-full"
                  alt=""
                />
              </Col>
            </Row>
          </div>
          <div className="py-16 contactFormWrapper">
            <Row>
              <Col xs={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }}>
                <Row>
                  <Col
                    xs={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 10 }}
                    className="float-none lg:float-left">
                    <div className="contact-title">Contact Us</div>
                    <div className="pr-6 md:pr-10 text-xl font-normal leading-7">
                      Have a question about Cottage? Or maybe just want to reach out to say hello?
                      Drop us a line!
                    </div>
                  </Col>
                  <Col md={{ span: 24 }} lg={{ span: 14 }}>
                    <Row>
                      <Col md={{ span: 24 }}>
                        <ContactForm />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <PowerupSection />
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
