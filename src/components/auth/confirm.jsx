import React, { useLayoutEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button, Row, Col } from 'antd';
import './SingUp.scss';
import { Footer } from './Footer';
import { Parallax, useController } from 'react-scroll-parallax';
import { Formik } from 'formik';


const Confirm = () => {
  const [email, setEmail] = useState('');
  const history  = useHistory();

  const { parallaxController } = useController();
  useLayoutEffect(() => {
    const handler = () => parallaxController.update();
    window.addEventListener('load', handler);
    return () => window.removeEventListener('load', handler);
  }, [parallaxController]);

  const updateOpacity = (e) => {
    console.log(e)
  }
  const goConfirm = () => {
    history.push('/confirm')
  }
  return (
    <div className="home-container">
      <div className="section themission sm:px-6 md:px-8 lg:px-6">
        <div className="confirm-mission relative md:rounded-2xl md:rounded-b-2xl">
          <Row type="flex" align="middle">
            <Col lg={24}>
              <div className="hero-content-wrapper pt-20 pb-10">
                  <div className="lg:w-3/6 mx-auto text-center section-body-text-info-content-description relative">
                    <div className="inline-flex pt-10 pb-7">
                      <img
                        src = {require('./../../assets/common/Check.svg')}
                        className="content-center"
                        style={{ width: 132, height: 91}}
                      />
                    </div>
                    <div className="subtitle md:pr-2">You're on the list</div>
                    <div className="section-description px-20 content-center">
                    We'll send you an email as soon as we are ready to start onboarding our first users.
                    </div>
                    <div className="input-container" >

                    </div>

                  </div>
              </div>
            </Col>
          </Row>
          <div className="">
            <img
              src={require('./../../assets/home/landscape_light_square.png')}
              alt=""
              className="mx-auto w-full rounded-b-2xl"
            />
            <img
              src={require('./../../assets/home/ourmission-hills.png')}
              alt=""
              className="mx-auto w-full colored-landscape hidden md:rounded-b-2xl"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Confirm;
