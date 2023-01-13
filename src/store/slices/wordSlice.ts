import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { WordDb } from "../../pages/types/word";


interface WordsState {
    words: WordDb[]
}

const initialState: WordsState = {
    words: []
}

const wordSlice = createSlice({
    name: "word",
    initialState,
    reducers: {
        setWords(state, action: PayloadAction<WordDb[]>){
            state.words = action.payload
        },
        // removeUser(state){
        //     state.email = null;
        //     state.uid = null;
        //     state.token = null
        // },
    }
})

export const {setWords } = wordSlice.actions
export default wordSlice.reducer