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
            
            if(action.payload){
                state.sets.push(action.payload)
            }
        },
        updateSet(state, action: PayloadAction<{id:string, wordIdx: string[], title: string, source?: string | null}>){
            const set = state.sets.find(s => s.setId === action.payload.id)

            if(set){
                set.name = action.payload.title
                set.wordsIds = action.payload.wordIdx
                set.source = action.payload.source
            }
        },
        deleteWordFromSet(state, action: PayloadAction<{setId: string, wordId: string}>){
        const set = state.sets.find(s=> s.setId === action.payload.setId)
        console.log('Redux set delete word', set)
        if(set){ 
            set.wordsIds = set.wordsIds.filter(wId => wId !== action.payload.wordId)
        }
        },
        deleteSet(state, action: PayloadAction<{id: string}>){
            debugger
            state.sets.splice(state.sets.findIndex((s) => s.setId === action.payload.id), 1);
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

export const {addSet, updateSet, deleteSet, deleteWordFromSet} = setSlice.actions
export default setSlice.reducer
