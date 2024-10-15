import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './reducers/store';
import { Provider } from 'react-redux';
import { Auth0Provider } from './react-auth0-spa';
import * as serviceWorker from './serviceWorker';
import history from './util/history';
import { auth0ClientID, auth0Domain, auth0Audience } from './common/constants';
import { ProductProvider } from './context';

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      client_id={auth0ClientID}
      redirect_uri={window.location.origin + '/login'}
      onRedirectCallback={onRedirectCallback}
      audience={auth0Audience}
      scope={"read:current_user"}
    >
      <ProductProvider>
      <Provider store={store}>
        <App />
      </Provider>
      </ProductProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

