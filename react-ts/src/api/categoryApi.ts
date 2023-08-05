import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { pause } from '../utils/pause';
interface ICategory {
    id?: number,
    name: string,
}
const categoryApi = createApi({
    reducerPath: "category",
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => `/category/?_embed=products`,
            providesTags: ['Category']
        }),
        getCategoryById: builder.query<any, number|string|undefined>({
            query: (id) => `/category/${id}/?_embed=products`,
            providesTags: ['Category']
        }),
        addCategory: builder.mutation<ICategory, ICategory>({
            query: (category) => ({
                url: `/category`,
                method: 'POST',
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation<ICategory, ICategory>({
            query: (category) => ({
                url: `/category/${category.id}`,
                method: "PUT",
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        removeCategory: builder.mutation<ICategory, number>({
            query: (id) => ({
                url: `/category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Category']
        })
    })
});

export const { useGetCategoriesQuery,useGetCategoryByIdQuery, useAddCategoryMutation, useUpdateCategoryMutation, useRemoveCategoryMutation } = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi;