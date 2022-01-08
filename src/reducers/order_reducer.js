import {
  GET_ORDERS_BEGIN,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
} from '../actions';

const order_reducer = (state, action) => {
  if (action.type === GET_ORDERS_BEGIN) {
    return { ...state, orders_error: false, orders_loading: true };
  }
  if (action.type === GET_ORDERS_ERROR) {
    return { ...state, orders_error: true, orders_loading: false };
  }
  if (action.type === GET_ORDERS_SUCCESS) {
    const orders = action.payload;
    let recent_orders = action.payload;
    recent_orders = recent_orders
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .slice(0, 11);
    const pending_orders = orders.filter(
      (order) => order.orderStatus === 'processing'
    );
    const delivered_orders = orders.filter(
      (order) => order.orderStatus === 'delivered'
    );
    const total_revenue = orders.reduce((total, order) => {
      total += order.totalPrice;
      return total;
    }, 0);
    return {
      ...state,
      orders_loading: false,
      orders,
      pending_orders,
      delivered_orders,
      total_revenue,
      recent_orders,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default order_reducer;
