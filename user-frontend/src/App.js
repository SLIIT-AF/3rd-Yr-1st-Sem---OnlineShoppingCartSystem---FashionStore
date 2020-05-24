import React from 'react';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import Nav from './components/navbar';
import Order from './components/order';
import Users from './components/users';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import userProfile from "./components/userProfile";

class App extends React.Component {

  render (){
    if(localStorage.getItem('email')){
      return (
        <Router>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/order" component={ Order }></Route>
              <Route path="/users" component={ Users }></Route>
              <Route path="/profile/:id" component={ userProfile }></Route>
            </Switch>
          </div>
        </Router>
      );
    }else{
      return (
        <Router>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/login" component={ Login }></Route>
              <Route path="/register" component={ Register }></Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default App;
