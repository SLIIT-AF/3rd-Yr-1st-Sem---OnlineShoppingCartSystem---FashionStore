import React from 'react';
import '../App.css';
import { Navbar , Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonContainer, ButtonWishlist} from './CartNWishlist/Button'
import {Link} from 'react-router-dom';

class nav extends React.Component {
  
  LogoutFn = () => {
    localStorage.clear();
    window.location.href = '/login'
  }

  render() {
    /*if(localStorage.getItem('email')){*/
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand >Fashion Store</Navbar.Brand>
                <NavItem>
                    <Link to="/prdcts" className="nav-link text-light">Purchase</Link>
                </NavItem>
            <NavItem>
                <Link to="/products_and_order" className="nav-link text-light">Purchase and Orders</Link>
            </NavItem>
          <Navbar.Collapse class="collapse navbar-collapse">
            <Nav class="navbar-nav ml-auto">
                <Link to="/products_and_order">
                    <ButtonContainer>
                        <p> Products and Order Management </p>
                    </ButtonContainer>
                </Link>
              <Link to="/cart">
                  <ButtonContainer>
                      <i className="fas fa-cart-plus mr-2"/>
                      my cart
                  </ButtonContainer>
              </Link>

              <Link to="/wishlist">
                <ButtonWishlist>
                    <i className="fas fa-heart mr-2"/>
                    my wishlist
                </ButtonWishlist>
              </Link>

               <Nav.Link className="text-light"> <small>{localStorage.getItem('email')}</small></Nav.Link>
              <Nav.Link onClick={ this.LogoutFn } >Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    /*}else{
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand >Fashion Store</Navbar.Brand>
    
          <Navbar.Collapse class="collapse navbar-collapse">
            <Nav class="navbar-nav ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }*/

  }
}

export default nav;
