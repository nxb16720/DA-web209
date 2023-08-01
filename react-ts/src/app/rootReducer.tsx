import { combineReducers } from "redux";

import productReducer from '../features/product/productSlice';



const rootReducer = combineReducers({
    product: productReducer,
    // counter: counterReducer,
    // cart: cartReducer,
    // auth: authReducer
});
export default rootReducer;