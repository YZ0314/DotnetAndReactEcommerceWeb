import { createAsyncThunk, createEntityAdapter,createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";


const productAdapter= createEntityAdapter();

export const fetchProductsAsync=createAsyncThunk<Product[]>(
    'products/fetchProductsAsync',
    async ()=>{
        try {
            return await agent.Catalog.list()
            
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchProductAsync=createAsyncThunk<Product,number>(
    'products/fetchProductAsync',
    async (productId)=>{
        try {
            return await agent.Catalog.details(productId)
            
        } catch (error) {
            console.log(error);
            
        }
    }
)


export const cataLogSlice=createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers:(
        builder=>{
            builder.addCase(fetchProductsAsync.pending,(state,action)=>{
                state.status='pendingFetchProducts';
            });
            builder.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
                productAdapter.setAll(state,action.payload);
                state.status='idle';
                state.productsLoaded=true;

            });
            builder.addCase(fetchProductsAsync.rejected,(state)=>{
                state.status='idle'
            });
            builder.addCase(fetchProductAsync.pending,(state)=>{
                state.status='pendingFetchProduct';
            });
            builder.addCase(fetchProductAsync.fulfilled,(state,action)=>{
                productAdapter.upsertOne(state,action.payload);
                state.status='idle';

            });

            builder.addCase(fetchProductAsync.rejected,(state)=>{
                state.status='idle'
            });
        }
    )
    
})

export const productSelectors= productAdapter.getSelectors((state:RootState)=>state.catalog)