import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const getPokemons = createAsyncThunk(
    'pokemon/all',
    async (arg,{rejectWithValue})=>{
        try{
            const data = await axios.get('http://localhost:3000/api/pokemon/all')
            return data;
        }catch(e){
            rejectWithValue(e.response.data);
        }
});

export const deletePokemons = createAsyncThunk(
    'pokemon/delete',
    async (arg,{rejectWithValue})=>{
        try{
            const data = await axios.delete(`http://localhost:3000/api/pokemon/delete/${arg}`)
            return data;
        }catch(e){
            rejectWithValue(e.response.data);
        }
});

const pokeSlice = createSlice({
    name: "Pokes",
    initialState:{
        loaded: true,
        data:[],
        copy:[],
        error:''
    },
    reducers:{
        searchPokes:(state,action) =>{
            state.data = action.payload;
        },
        addPokes:(state,action) =>{
            state.data.push(action.payload);
            state.copy.push(action.payload);
        },
        deletePokes:(state,action) =>{
            let c = "";
            // eslint-disable-next-line array-callback-return
            state.data.map((item,index) => {
                if(action.payload === item._id){
                    c = index;
                }
            })

            state.data.splice(c, 1);
            state.copy = state.data;
        }
    },
    extraReducers:{
        [getPokemons.pending]:(state,{payload})=>{
            state.loaded = true;
        },
        [getPokemons.fulfilled]:(state,{payload})=>{
            state.loaded = false;
            state.data = payload.data;
            state.copy = payload.data;
        },
        [getPokemons.rejected]:(state,{payload})=>{
            state.loaded = false;
            state.error = payload;
        },
        [deletePokemons.pending]:(state,{payload})=>{
            state.loaded = true;
        },
        [deletePokemons.fulfilled]:(state,{payload})=>{
            state.loaded = false;
        },
        [deletePokemons.rejected]:(state,{payload})=>{
            state.loaded = false;
            state.error = payload;
        }
    }
})        

export const {searchPokes,addPokes,deletePokes} =pokeSlice.actions;
export default pokeSlice.reducer;




