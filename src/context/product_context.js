import React, { useContext, useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';
import reducer from '../reducers/product_reducer';
import {
  products_url,
  delete_order_url,
  upload_images,
  create_new_product,
} from '../utils/constants';
import { getLocalStorage } from '../utils/helpers';
import {
  CREATE_NEW_PRODUCT,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  UPDATE_NEW_PRODUCT_IMAGES,
} from '../actions';

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  new_product: {
    name: '',
    price: 50000,
    stock: 10,
    description: '',
    images: [],
    colors: [],
    sizes: [],
    category: '',
    company: '',
    shipping: true,
    featured: false,
  },
};

const ProductContext = React.createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const token = getLocalStorage('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(products_url, {
        headers,
      });
      const { data } = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = getLocalStorage('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(`${delete_order_url}${id}`, {
        headers,
      });
      const { success, message } = response.data;
      fetchProducts();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const uploadProductImages = async (images) => {
    try {
      const token = getLocalStorage('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        upload_images,
        { images },
        {
          headers,
        }
      );
      const { success, data } = response.data;
      dispatch({ type: UPDATE_NEW_PRODUCT_IMAGES, payload: data });
      console.log('here');
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewProductDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'price' || name === 'stock') {
      value = Number(value);
    }
    if (name === 'colors' || name === 'sizes') {
      value = value.replace(/\s+/g, '');
      if (value.indexOf(',') > -1) {
        value = value.split(',');
      } else {
        value = value.split();
      }
    }
    if (name === 'shipping' || name === 'featured') {
      value = e.target.checked;
    }
    dispatch({ type: CREATE_NEW_PRODUCT, payload: { name, value } });
  };

  const createNewProduct = async (product) => {
    try {
      const token = getLocalStorage('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(create_new_product, product, {
        headers,
      });
      const { success, data } = response.data;
      fetchProducts();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        ...state,
        deleteProduct,
        uploadProductImages,
        updateNewProductDetails,
        createNewProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
