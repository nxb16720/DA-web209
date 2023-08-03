import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
interface ICategory {
    id?: number,
    name: string,
}
const categoryApi = createApi({
    reducerPath: "category",
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => `/category/?_embed=products`,
            providesTags: ['Category']
        }),
        getCategoryById: builder.query<ICategory, number>({
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

export const { useGetCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation, useRemoveCategoryMutation } = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi;