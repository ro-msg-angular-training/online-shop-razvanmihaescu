import {IAppState} from '../states/app.state';
import {createSelector} from '@ngrx/store';
import {IProductState} from '../states/IProductState';

const selectProducts = (state: IAppState) => state.products;

export const selectProductList = createSelector(selectProducts, (state: IProductState) => state.products);

export const selectSelectedProduct = createSelector(selectProducts, (state: IProductState) => state.selectedProduct);
