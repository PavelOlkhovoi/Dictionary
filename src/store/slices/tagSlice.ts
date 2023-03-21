import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "../../pages/types/word"
import { fetchUserTags } from "../../backend/crudFunctions/words";
import { RootState } from "..";
import { WordDb } from "../../pages/types/word";

interface IState {
  tags: Tag[],
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: IState = {
    tags: [],
    status: 'idle',
    error: null
  }

  const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
      deleteWordFromTag(state, action: PayloadAction<{tagId: string, wordId: string}>){
        const tag = state.tags.find(tag => tag.tagId === action.payload.tagId)
        if(tag){ 
          const wordId = tag.word_id.filter(wordId => wordId !== action.payload.wordId )
          tag.word_id = wordId
        }
      },
      addTag(state, action: PayloadAction<Tag>){
        state.tags.push(action.payload)
      },
      addWordToTag(state, action: PayloadAction<{tagId: string, wordId: string}>){
        const tag = state.tags.find(tag => tag.tagId === action.payload.tagId)
        if(tag && !tag.word_id.includes(action.payload.wordId)){ 
          tag.word_id.push(action.payload.wordId)
        }
      },
    },
    extraReducers(builder){
      builder
      .addCase(fetchTags.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tags = state.tags.concat(action.payload as [])
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message as string
      })
    }
  })

  export const fetchTags = createAsyncThunk('posts/fetchTags', async (uid: string) => {
    const response = await fetchUserTags(uid)
    return response
  })

  export const selectAllTags = (state: RootState) => state.tag.tags

  export const selectWordsByTag = (state: RootState, ids?: string[]) => {
    const rangeWords: WordDb[] = []
    ids?.forEach(id => {
        const foundWord = state.word.words.find((w) => w.wordId === id)
        
        foundWord && rangeWords.push(foundWord)
    })

    return rangeWords
}

  export const { addTag, deleteWordFromTag, addWordToTag } = tagSlice.actions

  export default tagSlice.reducer