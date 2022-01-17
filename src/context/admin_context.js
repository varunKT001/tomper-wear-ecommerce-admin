import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/admin_reducer';
import { admins_url, register_url } from '../utils/constants';
import { getLocalStorage } from '../utils/helpers';
import {
  GET_ADMINS_BEGIN,
  GET_ADMINS_ERROR,
  GET_ADMINS_SUCCESS,
  CREATE_NEW_ADMIN,
} from '../actions';

const initialState = {
  admins_loading: false,
  admins_error: false,
  admins: [],
  new_admin: {
    name: '',
    email: '',
    password: '',
    privilege: 'super',
  },
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

  const updateAdminPrivilege = async (id, privilege) => {
    try {
      const token = getLocalStorage('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(
        `${admins_url}${id}`,
        { privilege },
        {
          headers,
        }
      );
      const { success, data } = response.data;
      fetchAdmins();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const deleteAdmin = async (id) => {
    try {
      const token = getLocalStorage('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(`${admins_url}${id}`, {
        headers,
      });
      const { success, message } = response.data;
      fetchAdmins();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewAdminDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: CREATE_NEW_ADMIN, payload: { name, value } });
  };

  const createNewAdmin = async () => {
    const { new_admin } = state;
    try {
      const token = getLocalStorage('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(register_url, new_admin, {
        headers,
      });
      const { success, data } = response.data;
      fetchAdmins();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        ...state,
        updateAdminPrivilege,
        deleteAdmin,
        updateNewAdminDetails,
        createNewAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
