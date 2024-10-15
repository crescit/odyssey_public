import './App.css';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// import AboutPage from './components/organisms/pages/AboutPage';
// import BlogPage from './components/organisms/pages/BlogPage';
import ButtonAppBar from './components/atoms/navigation/ButtonAppBar';
import BusinessCenterPage from './components/organisms/pages/BusinessCenterPage';
import CartPage from './components/organisms/pages/CartPage';
import CheckoutPage from './components/organisms/pages/CheckoutPage';
import CreateProductRating from './components/atoms/products/CreateProductRating';
import CreateStoreRating from './components/atoms/stores/CreateStoreRating';
import Footer from './components/atoms/navigation/Footer';
import history from './util/history';
import HomePage from './components/organisms/pages/HomePage';
import HowItWorksPage from './components/organisms/pages/HowItWorksPage';
import InventoryUploadPage from './components/organisms/pages/InventoryUploadPage';
import LoginPage from './components/organisms/pages/LoginPage';
import OnboardingPage from './components/organisms/pages/OnboardingPage';
import OrdersPage from './components/organisms/pages/OrdersPage';
import NavigationBar from './components/organisms/routing/NavigationBar';
import PrivateRoute from './components/organisms/routing/PrivateRoute';
import ProfilePage from './components/organisms/pages/ProfilePage';
import RetryStripeAcctLinkPage from './components/organisms/pages/OnboardStripeAcctLinkPage';
import SingleProductPage from './components/organisms/pages/SingleProductPage';
import SingleStorePage from './components/organisms/pages/SingleStorePage';
import ShopifyOnboardingPage from './components/organisms/pages/ShopifyOnboardingPage';
import StoresPage from './components/organisms/pages/StoresPage';
// import Payment from './components/atoms/orders/Payment';

const App = () => (
  <div className='App'>
    <div className='page-container'>
      <div className='content-wrapper'>
        <Router history={history}>
          <NavigationBar />
          <ButtonAppBar />
          <div className='page-spacing'>
            <Switch>
              <Route path='/' exact component={HomePage} />
              {/* <PrivateRoute path='/payment' component={Payment} /> */}
              <PrivateRoute path='/login' component={LoginPage} />
              <PrivateRoute
                path='/businesscenter/:page?'
                component={BusinessCenterPage}
              />
              <PrivateRoute
                path='/onboardingprocess'
                component={ShopifyOnboardingPage}
              />
              <PrivateRoute
                path='/businessprofile'
                component={OnboardingPage}
              />
              <PrivateRoute path='/inventory' component={InventoryUploadPage} />
              <Route path='/stores' component={StoresPage} />
              <PrivateRoute path='/profile' component={ProfilePage} />
              <PrivateRoute path='/cart' component={CartPage} />
              <PrivateRoute path='/checkout' component={CheckoutPage} />
              <PrivateRoute path='/orders' component={OrdersPage} />
              <Route
                path='/product/:pid/:merchant_name/:company_id'
                component={SingleProductPage}
              />
              <Route path='/store/:id/:name' component={SingleStorePage} />
              {/*<Route path='/about' component={AboutPage} />*/}
              <Route path='/howitworks' component={HowItWorksPage} />
              {/*<Route path='/blog' component={BlogPage} />*/}
              <PrivateRoute
                path='/onboardstripeacctlink'
                component={RetryStripeAcctLinkPage}
              />
            </Switch>
          </div>
        </Router>
      </div>
      <Router history={history}>
        <div className='page-spacing' style={{ paddingTop: 30 }}>
          <Footer />
        </div>
      </Router>
      <CreateProductRating />
      <CreateStoreRating />
    </div>
  </div>
);

export default App;
