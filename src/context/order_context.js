import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/order_reducer';
import { useUserContext } from './user_context';
import {
  orders_url,
  single_order_url,
  update_order_status,
} from '../utils/constants';
import {
  GET_ORDERS_BEGIN,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
  GET_SINGLE_ORDER_BEGIN,
  GET_SINGLE_ORDER_ERROR,
  GET_SINGLE_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS,
} from '../actions';

const initialState = {
  orders_loading: false,
  orders_error: false,
  orders: [],
  single_order_loading: false,
  single_order_error: false,
  single_order: {},
  single_order_status: '',
  recent_orders: [],
  pending_orders: 0,
  delivered_orders: 0,
  total_revenue: 0,
};

const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const { currentUser } = useUserContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchOrders = async () => {
    dispatch({ type: GET_ORDERS_BEGIN });
    try {
      const response = await axios.get(orders_url);
      const { data } = response.data;
      dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ORDERS_ERROR });
    }
  };

  const fetchSingleOrder = async (id) => {
    dispatch({ type: GET_SINGLE_ORDER_BEGIN });
    try {
      const response = await axios.get(`${single_order_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_ORDER_ERROR });
    }
  };

  const updateOrderStatus = async (status, id) => {
    try {
      const response = await axios.put(`${update_order_status}${id}`, {
        status,
      });
      const { success, data } = response.data;
      dispatch({ type: UPDATE_ORDER_STATUS, payload: data.orderStatus });
      fetchOrders();
      return { success, status: data.orderStatus };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(`${update_order_status}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  return (
    <OrderContext.Provider
      value={{
        ...state,
        fetchOrders,
        fetchSingleOrder,
        updateOrderStatus,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
