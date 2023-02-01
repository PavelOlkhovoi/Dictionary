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

export const {addText} = textsSlice.actions
export default textsSlice.reducer