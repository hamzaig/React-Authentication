import { Switch, Route, Redirect } from 'react-router-dom';

import React, { useState } from "react";
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const expirationTimeInMili = new Date(expirationTime).getTime();
  const remainingDuration = expirationTimeInMili - currentTime;

  return remainingDuration;
};

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { },
});

function App() {
  const initToken = localStorage.getItem("token");
  const [token, setToken] = useState(initToken);

  const userIsLoggedIn = !!token;


  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }

  const loginHandler = (token, expireTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expireTime);

    const reaminingTime = calculateRemainingTime(expireTime);

    logoutTimer = setTimeout(logoutHandler, reaminingTime);
  }
  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }


  return (
    <AuthContext.Provider value={contextValue}>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          {!userIsLoggedIn &&
            <Route path='/auth'>
              <AuthPage />
            </Route>}
          <Route path='/profile'>
            {userIsLoggedIn ? <UserProfile /> : <Redirect to="/auth" />}
          </Route>
          <Route path='*' >
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
