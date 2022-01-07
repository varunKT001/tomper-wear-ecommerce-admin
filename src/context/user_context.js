import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { login_url, auth_url } from '../utils/constants';
import { getLocalStorage, setLocalStorage } from '../utils/helpers';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const setUser = (user, token) => {
    setCurrentUser(user);
    setLocalStorage('token', token);
  };

  const checkAuth = async () => {
    try {
      const token = getLocalStorage('token');
      const response = await axios.post(auth_url, { token });
      const { success, data, token: authToken } = response.data;
      setUser(data, authToken);
    } catch (error) {
      console.log(error.response);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(login_url, { email, password });
      const { success, data, token } = response.data;
      setUser(data, token);
      return { success, data };
    } catch (error) {
      const { message, success } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
