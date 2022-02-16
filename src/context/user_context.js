import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { login_url, auth_url, logout_url } from '../utils/constants';

axios.defaults.withCredentials = true;

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const setUser = (user) => {
    setCurrentUser(user);
  };

  const checkAuth = async () => {
    try {
      setAuthLoading(true);
      const response = await axios.post(auth_url);
      const { data } = response.data;
      setUser(data);
      setAuthLoading(false);
    } catch (error) {
      console.log(error.response);
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(login_url, { email, password });
      const { success, data } = response.data;
      setUser(data);
      return { success, data };
    } catch (error) {
      const { message, success } = error.response.data;
      return { success, message };
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(logout_url);
      const { success, message } = response.data;
      setUser(null);
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, authLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
