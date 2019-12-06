import {ActionReducerMap} from '@ngrx/store';
import {IAppState} from '../states/app.state';
import {routerReducer} from '@ngrx/router-store';
import {productReducers} from './product.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  products: productReducers
};

