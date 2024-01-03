import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { Basket } from "../../app/models/basket"
import agent from "../../app/api/agent";
import { getCookie } from "../../app/util/util";

interface BasketState{
    basket:Basket |null;
    status:string;
}

const initialState:BasketState ={
    basket:null,
    status:'idle',
}
export const fetchBasketAsync=createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async(_,thunkAPI)=>{
        try {
            return await agent.Basket.get();
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error:error.data})
        }
    },
    {
        condition:()=>{
            if (!getCookie('buyerId')) return false;
        }
    }
)
export const addBasketItemAsync=createAsyncThunk<Basket,{productId:number,quantity?:number}>(
    'basket/addBasketItemAsync',
    async({productId,quantity=1},thunkAPI)=>{
        try{
            return await agent.Basket.addItem(productId,quantity);

        }
        catch(error){
           return thunkAPI.rejectWithValue({error});
            
        }
    }
);
export const removeBasketItemAsync=createAsyncThunk<void,{productId:number,quantity?:number}>(
    'basket/removeBasketItemAsync',
    async({productId,quantity=1},thunkAPI)=>{
        try {
            await agent.Basket.removeItem(productId,quantity);
        } catch (error) {
            return thunkAPI.rejectWithValue({error})
            
        }
    }
)


export const basketSlice=createSlice({
    name:'basket',
    initialState,
    reducers:{
        setBasket:(state,action)=>{
            state.basket=action.payload
        },
    },
    extraReducers:(builder=>{
        builder.addCase(addBasketItemAsync.pending,(state,action)=>{
            state.status='pendingAdditem'+action.meta.arg.productId
        });
        builder.addCase(removeBasketItemAsync.pending,(state,action)=>{
            
            if(action.meta.arg.quantity===undefined){
                state.status='pendingRemoveItem'+ action.meta.arg.productId;
            }
            else{
                state.status='pendingDeleteItem'+ action.meta.arg.productId;
            }
        })
        builder.addCase(removeBasketItemAsync.fulfilled,(state,action)=>{
            const {productId,quantity=1}=action.meta.arg;
            const itemIndex=state.basket?.items.findIndex(i=> i.productId===productId);
            if(itemIndex===-1||itemIndex===undefined) return;
            state.basket!.items[itemIndex].quantity-=quantity!;
            if(state.basket?.items[itemIndex].quantity===0) state.basket.items.splice(itemIndex,1);
            state.status='idle';
        })
        builder.addCase(removeBasketItemAsync.rejected,(state,action)=>{
            state.status='idle';
            console.log(action.payload);
            
        })

        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled,fetchBasketAsync.fulfilled),(state,action)=>{
            state.basket=action.payload;
            state.status='idle';
        })
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected,fetchBasketAsync.rejected),(state,action)=>{
            state.status='idle';
            console.log(action.payload);
        })
        
    })
})

export const {setBasket}=basketSlice.actions;