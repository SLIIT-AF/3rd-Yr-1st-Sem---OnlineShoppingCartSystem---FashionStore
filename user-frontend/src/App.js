import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/CartNWishlist/NavBar'
import Cart from './components/CartNWishlist/Cart/Cart'
import Wishlist from './components/CartNWishlist/Wishlist/Wishlist'
import Payment from './components/CartNWishlist/Cart/Payment'
import Default from './components/CartNWishlist/Default'
import Details from './components/CartNWishlist/Details'
import ProductList from './components/CartNWishlist/ProductList'
import Modal from './components/CartNWishlist/Modal'


export class App extends Component {
  render() {
    return (
      <React.Fragment>

        <NavBar/>

        <Switch>
          {/* Home Page */}
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route path="/payment" component={Payment} />
          <Route path="/wishlist" component={Wishlist} />
          <Route component={Default} />
          <Cart></Cart>
          <Default></Default>
        </Switch>

        <Modal/>
        
      </React.Fragment>
    )
  }
}

export default App

