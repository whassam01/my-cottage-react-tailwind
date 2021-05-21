import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
// //icons

import { Button, Divider } from 'antd';
import './topmenu.scss';

export const Topmenu = (props) => {
  const history = useHistory();
  const [scrolled, setScrolled] = React.useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let x = ['navbar'];
  if (scrolled) {
    x.push('scrolled z-50');
  }

  const goSignup = () => {
    history.push("signup");
  }
  return (
    <header
      className={
        'site-page-header-ghost-wrapper fixed mx-auto w-full z-10 lg:px-16  md:mt-6 px-6 bg-white md:bg-transparent flex flex-wrap items-center lg:py-0 py-2 ' +
        x.join(' ')
      }>
      <div className="w-full nav-inner md:mx-8 lg:mx-auto">
        <div className="md:mx-auto flex md:flex-nowrap md:items-center py-3 md:py-0">
          <div className="flex-grow md:flex-auto flex justify-between items-center">
            <a className="text-white no-underline hover:text-white hover:no-underline" href="/">
              <img
                src={require('./../../../assets/home/logo.svg')}
                className='greenlogo hidden md:block'
                alt=""
              />
              <img
                src={require('./../../../assets/home/logo.svg')}
                className={props.colorClass? 'whitelogo': ' whitelogo hidden'}
                alt=""
              />
              <img
                src={require('./../../../assets/home/white-logo.svg')}
                className={props.colorClass? "whitelogo hidden":"whitelogo"}
                alt=""
              />
            </a>
          </div>

          <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block mt-2">
            <svg
              className="fill-current text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20">
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>
          <input className="opacity-0" type="checkbox" id="menu-toggle" />

          <div
            className="absolute md:relative h-full z-30 hidden md:flex md:flex-grow md:items-center inset-0 md:w-auto brandcolor md:content-center justify-between"
            id="menu">
            <div className="flex px-4 pt-6 md:hidden">
              <div className="flex-1 flex justify-between items-center">
                <a className="text-white no-underline hover:text-white hover:no-underline" href="/">
                  <img
                    src={require('./../../../assets/common/cottage-menu-white.svg')}
                    className="cottage-menu-clicked"
                    alt="img"
                  />
                </a>
              </div>

              <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
                <svg
                  className="fill-current text-gray-900"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.63605 6.63599L18.364 19.3639"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.364 6.63599L5.63603 19.3639"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <input className="opacity-0" type="checkbox" id="menu-toggle" />
            </div>

            <nav className="ml-4">
              <ul className="md:flex md:mx-auto items-center content-center justify-between text-base text-gray-700 pt-4 md:pt-0 mb-0">
                <li className="mr-3">
                  <NavLink
                    to="/features"
                    activeClassName="nav-active"
                    className={props.colorClass? 'text-dark sm:text-white block md:inline-block no-underline hover:text-underline py-2 px-4': 'block md:inline-block no-underline hover:text-underline py-2 px-4'}
                    >
                    Features
                  </NavLink>
                </li>
                <li className="mr-3">
                  <NavLink
                    to="/pricing"
                    activeClassName="nav-active"
                    className={props.colorClass? 'text-dark sm:text-white block md:inline-block no-underline hover:text-underline py-2 px-4': 'block md:inline-block no-underline hover:text-underline py-2 px-4'}>
                    Pricing
                  </NavLink>
                </li>
                <li className="mr-3">
                  <NavLink
                    to="/about"
                    activeClassName="nav-active"
                    className={props.colorClass? 'text-dark sm:text-white block md:inline-block no-underline hover:text-underline py-2 px-4': 'block md:inline-block no-underline hover:text-underline py-2 px-4'}>
                    About
                  </NavLink>
                </li>
                <li className="hidden md:block">
                  <Divider type="vertical" />
                </li>
                <li className="mr-3">
                  <NavLink
                    to="/faq"
                    activeClassName="nav-active"
                    className={props.colorClass? 'text-dark sm:text-white block md:inline-block no-underline hover:text-underline py-2 px-4': 'block md:inline-block no-underline hover:text-underline py-2 px-4'}>
                    FAQ
                  </NavLink>
                </li>
                <li className="mr-3">
                  <NavLink
                    to="/careers"
                    activeClassName="nav-active"
                    className={props.colorClass? 'text-dark sm:text-white block md:inline-block no-underline hover:text-underline py-2 px-4': 'block md:inline-block no-underline hover:text-underline py-2 px-4'}>
                    Careers
                  </NavLink>
                </li>
                <li className="block md:hidden">
                  <div className="flex justify-center mt-10">
                    <Button className="signup w-auto rounded-md text-lg text-white border-0">
                      Get Started
                    </Button>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex hidden md:block md:flex items-center">
            <NavLink
              to="/login"
              className={props.colorClass? 'text-dark sm:text-white block md:inline-block no-underline hover:text-underline py-2 px-4': 'block text-white md:inline-block no-underline hover:text-underline py-2 px-4'}>
              Login
            </NavLink>
            <Button onClick={goSignup} className="signup rounded-md text-white border-0">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
