
import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productApi, { productReducer } from "../api/productApi";
import categoryApi, { categoryReducer } from "../api/categoryApi";
import authApi from "../api/authApi";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const rootReducer = combineReducers({
    products: productReducer,

    category: categoryReducer,
    [authApi.reducerPath]: authApi.reducer

    // cart: cartReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [productApi.middleware, categoryApi.middleware, authApi.middleware]
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },

        }).concat(...middleware)

})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
export default persistStore(store);