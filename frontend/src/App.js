import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signoutAction } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddress from './screens/ShippingAddress';
import SigninScreen from './screens/SigninScreen';

function App() {

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin

  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signoutAction())
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">Logo-Link</Link>
          </div>
          <div>
            <Link to="/cart">Cart
            {cartItems.length > 0 && (
                <span className='badge'>{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className='dropdown'>
                <Link to='#'>
                  {userInfo.name} <i className='fa fa-caret-down'></i></Link>
                <ul className='dropdown-content'>
                  <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                </ul>
              </div>
            )
              : (
                <Link to="/signin">SignIN</Link>
              )
            }
          </div>
        </header>
        <main>
          <Route path='/' component={HomeScreen} exact></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/shipping' component={ShippingAddress}></Route>
          <Route path='/payment' component={PaymentScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>

          <Route path='/signin' component={SigninScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/order/:id' component={OrderScreen}></Route>
        </main>
        <footer className="row center">
          Reserved by Paras-market
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
