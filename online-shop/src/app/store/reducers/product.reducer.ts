import {initialProductState, IProductState} from '../states/IProductState';
import {EProductActions, ProductActions} from '../actions/product.action';

export const productReducers = (
  state = initialProductState,
  action: ProductActions
): IProductState => {
  switch (action.type) {
    case EProductActions.GetAllProductsSuccess: {
      return {
        ...state,
        products: action.payload
      };
    }

    case EProductActions.GetProductSuccess: {
      return {
        ...state,
        selectedProduct: action.payload
      };
    }

    case EProductActions.DeleteProductSuccess: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
};
