import {
  CREATE_NEW_PRODUCT,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  UPDATE_NEW_PRODUCT_IMAGES,
} from '../actions';

const product_reducer = (state, action) => {
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_error: false, products_loading: true };
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_error: true, products_loading: false };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products_loading: false,
      products: action.payload,
    };
  }
  if (action.type === UPDATE_NEW_PRODUCT_IMAGES) {
    return {
      ...state,
      new_product: { ...state.new_product, images: action.payload },
    };
  }
  if (action.type === CREATE_NEW_PRODUCT) {
    const { name, value } = action.payload;
    return { ...state, new_product: { ...state.new_product, [name]: value } };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default product_reducer;
