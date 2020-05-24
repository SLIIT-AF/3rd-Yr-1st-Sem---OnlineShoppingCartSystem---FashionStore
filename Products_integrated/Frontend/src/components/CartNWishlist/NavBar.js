import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import logo from '../../logo.svg'
import styled from 'styled-components'
import {ButtonContainer, ButtonWishlist} from './Button'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';

//   https://www.iconfinder.com/icons/1243689/call_phone_icon
//   Creative Commons (Attribution 3.0 Unported);
//   https://www.iconfinder.com/Makoto_msk

class NavBar extends Component {

    state = {
        isOpen: false
    }

    toggle = () => this.setState({
        isOpen: !this.state.isOpen
    })

    render() {
        return (
            
        <Navbar color="dark" dark expand="md">
            <Link to="/">
                <img src={logo} alt="store" className="navbar-brand"/>
            </Link>
            

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>

                <NavItem >
                    <Link to="/" className="nav-link">Products</Link>
                </NavItem>

            </Nav>
            {/* Push items to the right */}
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

            </Collapse>
        </Navbar>
        )
    }
}



export default NavBar
