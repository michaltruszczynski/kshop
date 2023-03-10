import React, { useLayoutEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './components/Layout/Layout';
import Shop from './pages/ShopPages/Shop/Shop';
import Cart from './pages/ShopPages/Cart/Cart';
import User from './pages/User/User/User';
import Order from './pages/User/Order/Order';
import ProductPage from './pages/ShopPages/ProductPage/ProductPage';
import Products from './pages/ShopPages/Products/Products';
import PaymentPage from './pages/PaymentPages/PaymentPage';

import Signup from './pages/AuthPages/Signup/Signup';
import Signin from './pages/AuthPages/Signin/Signin';

import ErrorRedirectPage from './pages/ErrorRedirectPage/ErrorRedirectPage';
import AsyncOpBgComponent from './components/AsyncOpBgComponent/AsyncOpBgComponent';
import AdminPages from './pages/AdminPages/AdminPages';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop';

import { authCheck } from './store/actions/';

import './App.scss';

const App = () => {
   const dispatch = useDispatch();
   const auth = useSelector((state) => state.auth);
   const { asyncOperation, error } = auth;

   useLayoutEffect(() => {
      dispatch(authCheck());
   }, [ ]);

   return (
      <AsyncOpBgComponent
         status={asyncOperation}
         error={null}
      >
         <Layout>
            <ScrollToTop />
            <Switch>
               <Route
                  path='/shop'
                  component={Products}
               />
               <Route path='/product/:id'>
                  <ProductPage />
               </Route>
               <Route path='/cart'>
                  <Cart />
               </Route>
               <Route path='/checkout'>
                  <PaymentPage />
               </Route>
               <ProtectedRoute
                  path='/user'
                  allowedRoles={['client', 'employee', 'admin']}
                  onlyAuth={true}
               >
                  <User />
               </ProtectedRoute>
               <ProtectedRoute
                  path='/order/:id'
                  allowedRoles={['client', 'employee', 'admin']}
                  onlyAuth={true}
               >
                  <Order />
               </ProtectedRoute>
               <Route path='/signup'>
                  <Signup />
               </Route>
               <Route path='/signin'>
                  <Signin />
               </Route>
               <Route path='/admin'>
                  <AdminPages />
               </Route>
               <Route path='/servererror'>
                  <ErrorRedirectPage />
               </Route>
               <Route>
                  <Shop />
               </Route>
            </Switch>
         </Layout>
      </AsyncOpBgComponent>
   );
};

export default App;
