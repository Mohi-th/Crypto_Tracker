import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState = {
    data:[]
}

export const getData = createAsyncThunk("/get", async () => {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,xrp,binancecoin,solana&price_change_percentage=1h,24h,7d');
    return response.data;
})



const cryptoSlice = createSlice({
    name: "cryptoSlice",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(getData.fulfilled,(state,actions)=>{
            console.log(actions)
            state.data=actions.payload;
        }).addCase(getData.rejected,(state)=>{
            state.data=[];
        })
    }
})

export const { setLiveData } = cryptoSlice.actions;

export default cryptoSlice.reducer;