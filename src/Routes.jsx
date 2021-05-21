import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Elements } from 'react-stripe-elements';
import Account from './containers/Account';
import Business from './containers/Business';
import Checkout from './containers/Checkout';
import Features from './containers/Features';
import Pricing from './containers/Pricing';
import About from './containers/About';
import Purchases from './containers/Purchases';
import Legal from './containers/Legal';
import NotFound from './containers/NotFound';
import MarketingPage from './containers/MarketingPage';
import { PageRoute } from './constants';
import SignUp from './containers/auth/Signup';
import Careers from './containers/Careers';
import Confirm from './containers/auth/Confirm';
import Faq from './containers/Faq'
import TermsCon from './containers/TermsCon'
const Routes = () => {
  return (
    <Switch>
      <Route path={PageRoute.HOME} exact component={MarketingPage} />
      <Route path="/features" exact component={Features} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/confirm" exact component={Confirm} />
      <Route path="/pricing" exact component={Pricing} />
      <Route path="/about" exact component={About} />
      <Route path="/faq" exact component={Faq} />
      <Route path="/careers" exact component={Careers} />
      <Route path="/term" exact component={TermsCon} />
      <Route path={PageRoute.LEGAL} exact component={Legal} />
      <Route path={PageRoute.TERMS} exact component={Legal} />
      <Route path={PageRoute.PRIVACY} exact component={Legal} />
      <Route path={PageRoute.ACCOUNT} exact component={Account} />
      <Route path={PageRoute.PURCHASES} exact component={Purchases} />
      <Route path="/:urlDomain" exact component={NotFound} />

      <Route
        path={`/:urlDomain/:urlSubdomain${PageRoute.CHECKOUT}`}
        exact
        render={(props) => (
          <Elements>
            <Checkout {...props} />
          </Elements>
        )}
      />
      <Route path="/:urlDomain/:urlSubdomain" component={Business} />

      {/* Catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
