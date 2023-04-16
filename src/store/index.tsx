import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'
import userReduser from "./slices/userSlice"
import wordReducer from "./slices/wordSlice"
import tagSlice from './slices/tagSlice'
import textSlice from './slices/textSlice'
import setSlice from './slices/setSlice'


export const store = configureStore({
  reducer: {
    user: userReduser,
    set: setSlice,
    word: wordReducer,
    tag: tagSlice,
    text: textSlice,
  }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch