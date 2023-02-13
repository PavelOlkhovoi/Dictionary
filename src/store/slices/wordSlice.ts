import {createSlice, PayloadAction, createAsyncThunk, current} from "@reduxjs/toolkit"
import { RootState } from "..";
import { getUserWords } from "../../backend/crudFunctions/words";
import { ExampleForServer, MeanigsForServer, WordDb } from "../../pages/types/word";


interface WordsState {
    words: WordDb[]
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: WordsState = {
    words: [],
    status: 'idle',
    error: null
}

const wordSlice = createSlice({
    name: "words",
    initialState,
    reducers: {
        addWord(state, action: PayloadAction<WordDb>){
            state.words.push(action.payload)
        },
        updateWord(state, action: PayloadAction<{id: string, newWord: string}>){
            const word = state.words.find(word => word.wordId === action.payload.id)
            if(word){ word.word = action.payload.newWord }
        },
        updateFastMeaning(state, action: PayloadAction<{id: string, name: string, translation: string}>){
            const word = state.words.find(word => word.wordId === action.payload.id)
            if(word){ 
                word.word = action.payload.name
                word.fastMeaning = action.payload.translation
            }
        },
        updateExamplex(state, action: PayloadAction<{id: string, examples: ExampleForServer[]}>){
            const word = state.words.find(word => word.wordId === action.payload.id)
            if(word){ word.examples = action.payload.examples }
        },
        updateMeanings(state, action: PayloadAction<{id: string, meanings: MeanigsForServer}>){
            const word = state.words.find(word => word.wordId === action.payload.id)
            if(word){ word.meaning = action.payload.meanings }
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchWords.pending, (state, action) => {
            state.status = "pending"
        })
        .addCase(fetchWords.fulfilled, (state, action) => {
            state.status = "idle"
            state.words = state.words.concat(action.payload as [])
        })
        .addCase(fetchWords.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message as string
        })
    }
})

export const fetchWords = createAsyncThunk('words/fetchWords', async (uid: string) => {
    const response = await getUserWords(uid)
    return response
})

export const selectWordsArrByName = (state: RootState, words: string[]) => {
    const test = state.word.words.filter(w => words.includes(w.word)).map(w => w.wordId)
    return test
}

export const selectWordsArrById = (state: RootState, ids: string[] | null | undefined) => {
    if(ids){
        const words = state.word.words.filter(w => ids.includes(w.wordId as string))
        return words
    }
}
export const selectWordById = (state: RootState, id: string) => {
    return state.word.words.find(w => w.wordId === id)
}

export const selectAllWordsIdsInArr = (state: RootState) => state.word.words.map(w => w.wordId)


export const { addWord, updateWord, updateExamplex, updateMeanings, updateFastMeaning } = wordSlice.actions
export default wordSlice.reducer