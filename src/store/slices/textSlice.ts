import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { createText } from "../../backend/crudFunctions/text";
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
    }
})


export const {addText} = textsSlice.actions
export default textsSlice.reducer