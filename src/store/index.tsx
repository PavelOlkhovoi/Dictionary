import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'
import userReduser from "./slices/userSlice"
import wordReducer from "./slices/wordSlice"
import tagSlice from './slices/tagSlice'


export const store = configureStore({
  reducer: {
    user: userReduser,
    word: wordReducer,
    tag: tagSlice,
  },
  // middleware: new MiddlewareArray()
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch