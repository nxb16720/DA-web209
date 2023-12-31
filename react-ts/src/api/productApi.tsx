
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { pause } from '../utils/pause';
interface IProduct {
    id?: number,
    name: string,
    price: number;
    productId?: number
}
const productApi = createApi({
    reducerPath: "products",
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => `/products`,
            providesTags: ['Product']
        }),
        getProductById: builder.query<IProduct, number|string|undefined>({
            query: (id) => `/products/${id}`,
            providesTags: ['Product']
        }),
        addProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products`,
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation<IProduct, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Product']
        })
    })
});

export const { useGetProductsQuery,useGetProductByIdQuery ,useAddProductMutation, useUpdateProductMutation, useRemoveProductMutation } = productApi;
export const productReducer = productApi.reducer;
export default productApi;

