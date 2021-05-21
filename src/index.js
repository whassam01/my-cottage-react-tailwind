import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Amplify
import Amplify from "aws-amplify";

// Stripe
import { StripeProvider } from "react-stripe-elements";

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { QueryClient, QueryClientProvider } from "react-query";
import reducer from "./store/reducers/index";
import { callAPIMiddleware } from "./store/middleware/callApiMiddleware";

// Service worker
import * as serviceWorker from "./serviceWorker";

import './index.css';
import App from "./App";

import config from "./config";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    AWSS3: {
      bucket: config.s3.BUCKET,
      region: config.s3.REGION,
    },
  },
  API: {
    graphql_endpoint: config.apiGateway.URL,
    graphql_endpoint_iam_region: config.apiGateway.REGION,
  },
});
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(callAPIMiddleware)
  // other store enhancers if any
);

const store =
  process.env.REACT_APP_STAGE === "prod"
    ? createStore(reducer, applyMiddleware(callAPIMiddleware))
    : createStore(reducer, enhancer);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 180000,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <StripeProvider apiKey={config.stripe.PUBLISHER_KEY}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StripeProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
