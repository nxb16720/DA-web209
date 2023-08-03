import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, add, get, update } from '../../api/productApi';

const initialState = {
    items: [],
    current: {},
    isLoading:false
} as any
export const fetchProduct = createAsyncThunk(
    'product/fetchProduct', async () => {
        try {
            const { data } = await getAll();
            return data
        } catch (error:any) {
            return error.response.data
        }
    }
)
export const fetchProductById = createAsyncThunk(
    'product/fetchProductById', async (id) => {
        try {
            const { data } = await get(id);
            return data
        } catch (error:any) {
            return error.response.data
        }
    }
)
export const addProduct = createAsyncThunk(
    'product/addProduct', async (product, { rejectWithValue }) => {
        try {
            const { data } = await add(product);
            return data
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const updateProduct = createAsyncThunk(
    'product/updateProduct', async (product, { rejectWithValue }) => {
        try {
            const { data } = await update(product);
            return data
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const removeProduct = createAsyncThunk(
    'product/removeProduct',
    async (id:any) => {
        try {
            await removeProduct(id)
            return id;
        } catch (error:any) {
            return error.message
        }
    }
);
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        // get
        builder.addCase(fetchProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.items = action.payload
        });
        builder.addCase(fetchProduct.rejected, (state) => {
            state.isLoading = false
        });
        // get one
        builder.addCase(fetchProductById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.isLoading = false
            state.current = action.payload
        });
        builder.addCase(fetchProductById.rejected, (state) => {
            state.isLoading = false
        });
        //add
        builder.addCase(addProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.products.push(action.payload)
        });
        builder.addCase(addProduct.rejected, (state) => {
            state.isLoading = false
        });
        //update
        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false
            const product = action.payload
            state.products = state.products.map((item: any) => item.id === product.id ? product : item)
        });
        builder.addCase(updateProduct.rejected, (state) => {
            state.isLoading = false
        });
        //remove
        builder.addCase(removeProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(removeProduct.fulfilled, (state, action) => {
            state.isLoading = false
            const id = action.payload;
            state.products = state.products.filter((item: any) => item.id !== id)
        });
        builder.addCase(removeProduct.rejected, (state) => {
            state.isLoading = false
        });
    }
});
export const productReducer = productSlice.reducer;