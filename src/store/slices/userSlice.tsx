import {createSlice, createAsyncThunk, PayloadAction, createAction} from "@reduxjs/toolkit"
import { auth } from "../.."
import {onAuthStateChanged} from "firebase/auth";



interface StateUser {
    user: FakeUser | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed' 
}

export interface FakeUser {
    email: string | null
    uid: string | null
    token: string | null
}

const initialState: StateUser = {
    user: {
        email: '',
        uid: '',
        token: '',
    },
    status: 'idle',
}

const typedActionForUser = createAction<FakeUser, 'user/getUser/pending'>('user/getUser/pending')

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase('getUser.pending', (state, action) => {
            console.log('aaaaaaaaaaa')
            state.status = 'loading'
        })
        builder.addCase(typedActionForUser, (state, action) => {
            console.log('vvvvvvvvvvvvvvvvvv')
            state.user = action.payload
            state.status= 'idle'
        })
    }
})

export const getUser = createAsyncThunk('user/getUser', async () => {

    const user = auth.currentUser

    let newTestUser: FakeUser = {} as FakeUser

    onAuthStateChanged(auth, user => {
        if(user){
            const {email, uid } = user
            newTestUser.email = email
            newTestUser.uid = uid
            newTestUser.token = 'testov'
        }
    })
    console.log('bbbbbbb')
    return newTestUser
})



// export const activeUser = state => state.user

export const { setUser } = userSlice.actions

export default userSlice.reducer