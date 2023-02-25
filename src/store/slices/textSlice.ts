import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { createText, fetchUserTexts } from "../../backend/crudFunctions/text";
import { Text } from "../../pages/types/word";

interface TextState {
    texts: Text[]
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: TextState = {
    texts: [],
    status: 'idle',
    error: null
}

const textsSlice = createSlice({
    name: 'texts',
    initialState,
    reducers: {
        addText(state, action: PayloadAction<Text>){
            state.texts.push(action.payload)
        },
        updateText(state, action: PayloadAction<Text>){
            const text = state.texts.find(t => t.textId === action.payload.textId)
            if(text){
                text.title = action.payload.title
                text.text = action.payload.text
                text.wordsIds = action.payload.wordsIds
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTexts.pending, (state, action) => {
            state.status = 'pending'
        })
        builder.addCase(fetchTexts.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.texts = state.texts.concat(action.payload as Text[])
        })
        .addCase(fetchTexts.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message as string
        })
    }
})

export const fetchTexts = createAsyncThunk('text/fetchTexts', async (uid: string)=> {
    const res = fetchUserTexts(uid)
    return res
})

export const selectTextById = (state: RootState, id: string) => {
    const text = state.text.texts.find(text => text.textId === id)
    return text
}

export const selectTextsByIds = (state: RootState, ids: string[]) => {
    return state.text.texts.filter(t => ids.includes(t.textId))
}

export const {addText, updateText} = textsSlice.actions
export default textsSlice.reducer