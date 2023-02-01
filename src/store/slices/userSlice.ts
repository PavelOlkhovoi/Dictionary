import {createSlice, createAsyncThunk, PayloadAction, current, createAction} from "@reduxjs/toolkit"
import { auth } from "../.."
import {onAuthStateChanged} from "firebase/auth";


interface StateUser {
    userFake: FakeUser | null
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | null
}

export interface FakeUser {
    email: string
    uid: string
    token: string
}

const initialState: StateUser = {
    userFake: {
        email: '',
        uid: '',
        token: '',
    },
    status: 'idle',
    error: null,
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userFake = action.payload
        },

        setUserPrepare: {
            reducer: (state, action: PayloadAction<FakeUser>) => {
                state.userFake = action.payload
            },
            prepare: (payload: FakeUser) => {
                return { payload: { email: payload.email, uid: payload.uid, token: '111' } }
            }
        }
    }
})


const userSelector = (state: StateUser) => state.userFake

// export const activeUser = state => state.user

export const { setUser } = userSlice.actions

export default userSlice.reducer