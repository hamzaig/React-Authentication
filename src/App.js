import { Switch, Route } from 'react-router-dom';

import React, { useState } from "react";
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { },
});

function App() {

  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  }

  const logoutHandler = () => {
    setToken(null);
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
          <Route path='/auth'>
            <AuthPage />
          </Route>
          <Route path='/profile'>
            <UserProfile />
          </Route>
        </Switch>
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
