import {createSlice, PayloadAction, createAsyncThunk, current} from "@reduxjs/toolkit"
import { RootState } from "..";
import { getUserWords } from "../../backend/crudFunctions/words";
import { ExampleForServer, MeanigsForServer, Repetition, WordDb } from "../../pages/types/word";
import { parseISO } from "date-fns";


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
        },
        addPointsAndChangeRepetition(state, action: PayloadAction<{id: string, points: number, repetition: Repetition}>){
            const word = state.words.find(word => word.wordId === action.payload.id)
            if(word){
                word.points = word.points + action.payload.points
                word.repetition = action.payload.repetition
            }
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

export const selectSortedByTimeWords = (state: RootState) => {
    if(state.word.words.length > 0){
        const sortedArr = [...state.word.words].sort((a, b)=> {
            return parseISO(a.createdAt as string).getTime() - parseISO(b.createdAt as string).getTime()
        })

        return sortedArr
    }
}

export const selectWordsForFirstExercise = (state: RootState) => {
    const getSortedWords = selectSortedByTimeWords(state)
    const newLearnedWords = getSortedWords?.filter(w => !w.repetition?.fifthRepetition)
}


export const { addWord, updateWord, updateExamplex, updateMeanings, updateFastMeaning, addPointsAndChangeRepetition } = wordSlice.actions
export default wordSlice.reducer