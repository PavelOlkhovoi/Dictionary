import {createSlice, PayloadAction} from "@reduxjs/toolkit"
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

export const {setWords } = wordSlice.actions
export default wordSlice.reducer