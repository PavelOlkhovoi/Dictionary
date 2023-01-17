import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"
import { WordDb } from "../../pages/types/word";


interface WordsState {
    words: WordDb[]
}

const initialState: WordsState = {
    words: []
}

const wordSlice = createSlice({
    name: "words",
    initialState,
    reducers: {
        setWords(state, action: PayloadAction<WordDb[]>){
            state.words = action.payload
        },
    }
})

// export const fetchWprds = createAsyncThunk('words/fetchWords', async (uid: string) => {
//     const response = await ....
//     return Response.data
// })


export const {setWords } = wordSlice.actions
export default wordSlice.reducer