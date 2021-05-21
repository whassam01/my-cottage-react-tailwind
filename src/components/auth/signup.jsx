import React, { useLayoutEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button, Row, Col } from 'antd';
import './SingUp.scss';
import { Footer } from './Footer';
import { Parallax, useController } from 'react-scroll-parallax';
import { Formik } from 'formik';


const SignUp = () => {
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
        <div className="signup-mission relative md:rounded-2xl md:rounded-b-2xl">
          <div className="hero-content-wrapper pt-24 pb-4">
            <div className="mx-auto text-center section-body-text-info-content-description relative">
              <div className="subtitle">Be one of the first to join</div>
              <div className="subtitle">Cottage when we launch.</div>
              <div className="section-description text-center">
                <p>We're hard at work greasing wheels and polishing edes to be ready for customers by mid-2021. Add your email below and we'll send you a notification.</p>
              </div>
              <div className="input-container" >
                <div className='input-label text-white text-left px-2'>
                  Your email
                </div>
                <div className = "email-div">
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    className="joinEmail mx-2 md:my-2 sm:my-2 rounded-md px-2">
                  </input>
                  <button className = "joinList rounded-md mx-2 md:my-2 sm:my-2 text-white border-0" onClick={goConfirm}>Join the list</button>
                </div>
              </div>
            </div>
          </div>
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
export default SignUp;
