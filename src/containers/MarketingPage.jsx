import React, { Component } from 'react';

// Components
import Fullpage from '../components/home/FullPage';
import './marketingpage.css';
import { Topmenu } from '../components/common/TopMenu/Topmenu';
// Utils
import { DASHBOARD_LOGIN_LINK } from '../constants';
import './general.scss';
class MarketingPage extends Component {
  goToDashboard = () => {
    window.location = DASHBOARD_LOGIN_LINK;
  };

  render() {
    return (
      <div className="relative mt-0 md:mt-6 marketing-page">
        <Topmenu />

        <Fullpage />
      </div>
    );
  }
}

export default MarketingPage;
