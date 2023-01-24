import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Tag } from "../../pages/types/word"
import { fetchUserTags } from "../../backend/crudFunctions/words";

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

    },
    extraReducers(builder){
      builder
      .addCase(fetchTags.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        console.log(action.payload)
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

  export default tagSlice.reducer