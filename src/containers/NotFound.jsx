import React, { Component } from 'react';
// css
import './NotFound.css';
import { Link } from 'react-router-dom';
import { Topmenu } from '../components/common/TopMenu/Topmenu';

class NotFound extends Component {
  render() {
    return (
      <div className="relative md:mt-6 aboutuspage no-found-main h-full">
        <Topmenu />
        <div className="home-container md:mt-0 px-0 md:px-6  h-full">
          <div className="featured-hero-wrapper pricing-hero-wrapper relative pricing-hero-404  h-full">
            <div className="not-found-wrapper pt-20 h-full items-center justify-center flex flex-col relative">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div>
                  <div className="not-found-home-icon text-center w-full text-center md:text-left">
                    <img
                      src={require('./../assets/common/cottage-nopage.png')}
                      className="mx-auto"
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <div className="not-found md:pl-10">
                    <div className="not-found-code text-left">404</div>
                    <div className="not-found-message text-left mb-0">Page not found</div>
                  </div>
                </div>
              </div>
              <div className="not-found-description max-w-xl mx-auto mt-8 px-6 md:px-0">
                Sorry, we couldn’t find the page. But don’t worry, you can find plenty of other
                things in our{' '}
                <span>
                  <Link to="/" className="underline hover:no-underline">
                    homepage
                  </Link>
                </span>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
