import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/admin_reducer';
import { admins_url } from '../utils/constants';
import { getLocalStorage } from '../utils/helpers';
import {
  GET_ADMINS_BEGIN,
  GET_ADMINS_ERROR,
  GET_ADMINS_SUCCESS,
} from '../actions';

const initialState = {
  admins_loading: false,
  admins_error: false,
  admins: [],
};

const AdminContext = React.createContext();

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAdmins = async () => {
    dispatch({ type: GET_ADMINS_BEGIN });
    try {
      const token = getLocalStorage('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(admins_url, {
        headers,
      });
      const { data } = response.data;
      dispatch({ type: GET_ADMINS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ADMINS_ERROR });
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <AdminContext.Provider value={{ ...state }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
