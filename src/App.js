import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/Login/PrivateRoute';
import LoginComplete from './components/LoginComplete';
import './App.css';

export const UserContext = createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userToken = sessionStorage.getItem('token');
    if (userToken) {
      setToken(userToken);
    }
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    if (userInfo) {
      setLoggedInUser(userInfo);
    }
  }, [token])

  console.log(loggedInUser, token)

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      <h1>Assignment Four</h1>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser, token, setToken]}>
        <Router>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <PrivateRoute path='/loginDone' >
              <LoginComplete />
            </PrivateRoute>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;