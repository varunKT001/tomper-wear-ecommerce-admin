import React from 'react';
import {
  FaHome,
  FaProductHunt,
  FaShoppingCart,
  FaUserTie,
} from 'react-icons/fa';

export const LinkItems = [
  { name: 'Home', url: '/', icon: <FaHome /> },
  { name: 'Products', url: '/products', icon: <FaProductHunt /> },
  { name: 'Orders', url: '/orders', icon: <FaShoppingCart /> },
  { name: 'Admins', url: '/admins', icon: <FaUserTie /> },
];

export const orderStatusList = [
  { name: 'Reject', value: 'rejected' },
  { name: 'Processing', value: 'processing' },
  { name: 'Confirmed', value: 'confirmed' },
  { name: 'Shipped', value: 'shipped' },
  { name: 'Delivered', value: 'delivered' },
];

export const domain = process.env.REACT_APP_BACKEND_HOST;
export const auth_url = `${domain}/api/admin/auth`;
export const login_url = `${domain}/api/admin/login`;
export const register_url = `${domain}/api/admin/register`;
export const logout_url = `${domain}/api/admin/logout`;
export const orders_url = `${domain}/api/admin/orders`;
export const update_product_url = `${domain}/api/admin/product/`;
export const products_url = `${domain}/api/products/`;
export const admins_url = `${domain}/api/admin/users/`;
export const single_order_url = `${domain}/api/orders/`;
export const update_order_status = `${domain}/api/admin/order/`;
export const create_new_product = `${domain}/api/admin/product/new`;
export const delete_review = `${domain}/api/admin/product/review/`;
