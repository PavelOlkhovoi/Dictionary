import {createSlice, PayloadAction} from "@reduxjs/toolkit"


interface StateUser {
    user: User | null
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | null
}

export interface User {
    email: string
    uid: string
    photoURL: string | null
}

const initialState: StateUser = {
    user: {
        email: '',
        uid: '',
        photoURL: null
    },
    status: 'idle',
    error: null,
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },

        setUserPrepare: {
            reducer: (state, action: PayloadAction<User>) => {
                state.user = action.payload
            },
            prepare: (payload: User) => {
                return { payload: { email: payload.email, uid: payload.uid, photoURL: payload.photoURL } }
            }
        }
    }
})


export const selectUserId = (state: StateUser) => state.user


export const { setUser } = userSlice.actions

export default userSlice.reducer