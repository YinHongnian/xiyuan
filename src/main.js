import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import WelcomeComponent from './view/welcome.jsx';
import LoginComponent from './components/login/login.jsx';

ReactDOM.render(
  <BrowserRouter>
    <Route path='/' exact component={WelcomeComponent}></Route>
    <Route path="/login" component={LoginComponent}></Route>
  </BrowserRouter>
  ,document.getElementById('root'))