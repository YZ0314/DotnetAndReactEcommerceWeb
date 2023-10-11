import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { basketSlice } from '../../features/basket/BasketSlice';
import { cataLogSlice } from '../../features/Catalog/catalogSlice';


export const store=configureStore({
    reducer:{
        basket:basketSlice.reducer,
        catalog:cataLogSlice.reducer,
    }
})

export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;

export const useAppDispatch=()=> useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;