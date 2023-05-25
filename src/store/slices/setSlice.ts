import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getUserSets } from "../../backend/crudFunctions/set";
import { Set } from "../../types/word";

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
            if(set){ 
                set.wordsIds = set.wordsIds.filter(wId => wId !== action.payload.wordId)
            }
        },
        deleteWordIdFromRepeatArr(state, action: PayloadAction<{setId: string, wordId: string}>){
        const set = state.sets.find(s=> s.setId === action.payload.setId)
            if(set){ 
                set.repeatIds = set.repeatIds.filter(wId => wId !== action.payload.wordId)
            }
        },
        restartRepeatReduxSet(state, action: PayloadAction<{setId: string, repeatIds: string[]}>){
        const set = state.sets.find(s=> s.setId === action.payload.setId)
            if(set){ 
                set.repeatIds = action.payload.repeatIds
            }
        },
        deleteSet(state, action: PayloadAction<{id: string}>){
            state.sets.splice(state.sets.findIndex((s) => s.setId === action.payload.id), 1);
        },
        addTextIdToTextArrRedux(state, action: PayloadAction<{setId: string, textId: string}>){
        const set = state.sets.find(s=> s.setId === action.payload.setId)
            if(set){ 
                set.textIds?.push(action.payload.textId)
            }
        },
        deleteTextIdFromTextArrRedux(state, action: PayloadAction<{setId: string, textId: string}>){
            const set = state.sets.find(s=> s.setId === action.payload.setId)
                if(set && set.textIds){ 
                    set.textIds = set.textIds?.filter(id => id !== action.payload.textId)
                }
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
    // return getUserSets(uid)

    const res = await getUserSets(uid)
    return res
})

export const selectAllSets = (state: RootState) => state.set.sets

export const {addSet, updateSet, deleteSet, deleteWordFromSet, deleteWordIdFromRepeatArr, restartRepeatReduxSet,
    addTextIdToTextArrRedux, deleteTextIdFromTextArrRedux} = setSlice.actions
export default setSlice.reducer
