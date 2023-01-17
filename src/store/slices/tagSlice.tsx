import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../..";
import { collection, query, where } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { Tag } from "../../pages/types/word"

interface IState {
  tags: Tag[],
  status: string
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
        state.status = 'loading'
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.tags = state.tags.concat(action.payload)
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message as string
      })
    }
  })

  export const fetchTags = createAsyncThunk('posts/fetchPosts', async (uid: string) => {
    const tagsId = collection(db, 'tags')
    const query_ = query(tagsId, where("userId", "==", uid))
    const querySnapshot= await getDocs(query_)
    
    const allTags = [] as Tag[]
    
    querySnapshot.forEach((doc) => {
      allTags.push(doc.data() as Tag)
    });

    console.log('KKKKKKKKKK', allTags)
    return allTags
  })

  export default tagSlice.reducer