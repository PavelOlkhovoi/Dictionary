import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserSets } from "../../backend/crudFunctions/set";
import { Set } from "../../pages/types/word";

interface InitialState {
    sets: Set[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: InitialState  = {
    sets: [],
    status: 'idle',
    error: null
}
const setSlice = createSlice({
    name: 'sets',
    initialState,
    reducers: {
        addSet(state, action: PayloadAction<Set>){
            
        console.log('Papazogla Redux', action.payload)
            if(action.payload){
                state.sets.push(action.payload)
            }
        },
        updateSet(state, action: PayloadAction<{id:string, wordIdx: string[], title: string, source?: string | null}>){
            const set = state.sets.find(s => s.setId === action.payload.id)

            if(set){
                set.name = action.payload.title
                set.wordsIds = action.payload.wordIdx
                set.sourse = action.payload.source
            }
        },
        deleteSet(state, action: PayloadAction<{id: string}>){
            state.sets.filter(s => s.setId !== action.payload.id)
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchSets.pending, (state, action)=> {
            state.status = 'pending'
        })
        .addCase(fetchSets.fulfilled, (state, action) => {
            state.status = "idle"
            state.sets = state.sets.concat(action.payload as [])
        })
        .addCase(fetchSets.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message as string
        })
    }
})

export const fetchSets = createAsyncThunk('sets/fetchSets', async (uid: string)=>{
    const res = await getUserSets(uid)

    return res
})

export const {addSet, updateSet, deleteSet} = setSlice.actions
export default setSlice.reducer
