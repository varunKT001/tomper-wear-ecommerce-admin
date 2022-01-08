import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/order_reducer';
import { orders_url } from '../utils/constants';
import { getLocalStorage } from '../utils/helpers';
import {
  GET_ORDERS_BEGIN,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
} from '../actions';

const initialState = {
  orders_loading: false,
  orders_error: false,
  orders: [],
  recent_orders: [],
  pending_orders: 0,
  delivered_orders: 0,
  total_revenue: 0,
};

const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchOrders = async () => {
    dispatch({ type: GET_ORDERS_BEGIN });
    try {
      const token = getLocalStorage('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(orders_url, {
        headers,
      });
      const { data } = response.data;
      dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ORDERS_ERROR });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ ...state }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
