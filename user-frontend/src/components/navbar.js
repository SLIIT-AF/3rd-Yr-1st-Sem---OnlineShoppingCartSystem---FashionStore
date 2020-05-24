import React from 'react';
import '../App.css';
import { Navbar , Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class nav extends React.Component {

  LogoutFn = () => {
    localStorage.clear();
    window.location.href = '/login'
  }

  myProfile = () => {
      window.location.href = "/profile/"+localStorage.getItem('uid');
  }

  render() {
    if(localStorage.getItem('email')){
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand >Fashion Store</Navbar.Brand>
    
          <Navbar.Collapse className="collapse navbar-collapse">
            <Nav className="navbar-nav ml-auto">
                <Nav.Link onClick={ this.myProfile } className="text-light"> <small>{localStorage.getItem('name')}</small></Nav.Link>
                <Nav.Link onClick={ this.LogoutFn } >Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }else{
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand >Fashion Store</Navbar.Brand>
    
          <Navbar.Collapse className="collapse navbar-collapse">
            <Nav className="navbar-nav ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

  }
}

export default nav;
