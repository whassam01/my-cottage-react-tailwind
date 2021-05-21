import React, { Component } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1270,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
          },
        },
      ],
    };
    return (
      <div className="who-uses-cottage py-8 lg:py-8">
        <h2 className="text-center text-xl pb-4">Who uses Cottage?</h2>
        <Slider {...settings}>
          <div className="mobilesection py-8 px-3 lg:px-0">
            <div className="section-box lg:w-72 text-center mx-auto">
              <div>
                <img
                  src={require('../../../assets/home/meal-services.jpg')}
                  className="mx-auto"
                  alt=""
                />
              </div>
              <div className="p-4">
                <div className="why-sub-title">Meal Services</div>
                <div className="why-description font-normal">
                  For kitchens big and small, we offer tools that give your food service a simple
                  way to process online orders.
                </div>
              </div>
            </div>
          </div>
          <div className="py-8 px-3 lg:px-0">
            <div className="section-box lg:w-72 text-center mx-auto">
              <div>
                <img
                  src={require('../../../assets/home/personal-chef.jpg')}
                  className="mx-auto"
                  alt=""
                />
              </div>
              <div className="p-4">
                <div className="why-sub-title">Personal Chefs</div>
                <div className="why-description font-normal">
                  Tools for planning and preparing a menu that suits clients with particular dietary
                  needs and preferences.
                </div>
              </div>
            </div>
          </div>
          <div className="py-8 px-3 lg:px-0">
            <div className="section-box lg:w-72 text-center mx-auto">
              <div>
                <img
                  src={require('../../../assets/home/caterers.jpg')}
                  className="mx-auto"
                  alt="img"
                />
              </div>
              <div className="p-4">
                <div className="why-sub-title">Caterers</div>
                <div className="why-description font-normal">
                  A painless way to let your customers build their perfect meal plan and send it
                  over to you for review and approval.
                </div>
              </div>
            </div>
          </div>
          <div className="py-8 px-3 lg:px-0">
            <div className="section-box lg:w-72 text-center mx-auto">
              <div>
                <img
                  src={require('../../../assets/home/local-growers.jpg')}
                  className="mx-auto"
                  alt="img"
                />
              </div>
              <div className="p-4">
                <div className="why-sub-title">Local Growers</div>
                <div className="why-description font-normal">
                  The perfect tool for small farmers and producers who sell food in their community
                  or at local markets.
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
