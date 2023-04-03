import {createSlice, PayloadAction, createAsyncThunk, current} from "@reduxjs/toolkit"
import { RootState } from "..";
import { getUserWords } from "../../backend/crudFunctions/words";
import { AdvanceMeanings, ExampleForServer, MeanigsForServer, Repetition, WordDb } from "../../pages/types/word";
import { parseISO } from "date-fns";
import { createSelector } from "@reduxjs/toolkit";
import { daysDifferent } from "../../helpers/time";
import { selectAllSets} from "./setSlice";


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
        updateFastMeaning(state, action: PayloadAction<{id: string, word: string, translation: string}>){
            const word = state.words.find(word => word.wordId === action.payload.id)
            if(word){ 
                word.word = action.payload.word
                word.fastMeaning = action.payload.translation
            }
        },
        updateExample(state, action: PayloadAction<{id: string, examples: ExampleForServer[]}>){
            const word = state.words.find(word => word.wordId === action.payload.id)
            if(word){ word.examples = action.payload.examples }
        },
        updateMeanings(state, action: PayloadAction<{id: string, meanings: AdvanceMeanings}>){
            const word = state.words.find(word => word.wordId === action.payload.id)
            if(word){ word.meaning = action.payload.meanings }
        },
        deleteWord(state, action: PayloadAction<{id: string}>){
            state.words.splice(state.words.findIndex((w) => w.wordId === action.payload.id), 1);
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

export const selectAllWords = (state: RootState) => {
    return state.word.words
}

export const selectWordsAsStringInArr = createSelector(selectAllWords, words => words.map(w => w.word))

export const selectWordsArrByName = (state: RootState, words: string[]) => {
    const res = state.word.words.filter(w => words.includes(w.word)).map(w => w.wordId)
    return res
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
    const words = state.word.words
    if(words.length > 0){
        const sortedArr =  [...words].sort((a, b)=> {
            return parseISO(a.createdAt as string).getTime() - parseISO(b.createdAt as string).getTime()
        })

        return sortedArr
    }
}


export const selectWordsForFirstExercise = createSelector([selectSortedByTimeWords, selectAllSets,
    (state: RootState, exercise: string) => exercise], 
    (sortedWords, setWords, exercise) => {
        
        if(exercise === '1'){
            return sortedWords?.filter(w => !w.repetition?.firstRepetition)
        }else if(exercise === '2'){
            return sortedWords?.filter(w => !w.repetition?.secondRepetition && w.repetition?.firstRepetition 
                && daysDifferent(w.createdAt as string) >= 2)
        }else if(exercise === '3'){
            return sortedWords?.filter(w => !w.repetition?.thirdRepetition && w.repetition?.firstRepetition
                && w.repetition?.secondRepetition && daysDifferent(w.createdAt as string) >= 6)
        }else if(exercise === '4'){
            return sortedWords?.filter(w => !w.repetition?.fourthRepetition && w.repetition?.firstRepetition
                && w.repetition?.secondRepetition && w.repetition?.thirdRepetition && daysDifferent(w.createdAt as string) >= 20)
        }else if(exercise === '5'){
            return sortedWords?.filter(w => !w.repetition?.fifthRepetition && w.repetition?.firstRepetition
                && w.repetition?.secondRepetition && w.repetition?.thirdRepetition && w.repetition?.fourthRepetition
                 && daysDifferent(w.createdAt as string) >= 30)

        }else if(exercise === '6'){
            return sortedWords?.filter(w => !w.repetition?.sixthRepetition && w.repetition?.firstRepetition
                && w.repetition?.secondRepetition && w.repetition?.thirdRepetition && w.repetition?.fourthRepetition
                && w.repetition?.fifthRepetition && daysDifferent(w.createdAt as string) >= 45)

        }else if(exercise === '7'){
            return sortedWords?.filter(w => !w.repetition?.seventhRepetition && w.repetition?.firstRepetition
                && w.repetition?.secondRepetition && w.repetition?.thirdRepetition && w.repetition?.fourthRepetition
                && w.repetition?.fifthRepetition && w.repetition?.sixthRepetition && daysDifferent(w.createdAt as string) >= 60)

        }else {
            const wordsIds = setWords.find(set => set.setId === exercise)?.repeatIds
            return sortedWords?.filter(w => wordsIds?.includes(w.wordId as string))
        }


})

export const { addWord, updateWord, updateExample, updateMeanings, updateFastMeaning, addPointsAndChangeRepetition,
    deleteWord } = wordSlice.actions
export default wordSlice.reducer