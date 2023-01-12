import {createSlice} from "@reduxjs/toolkit"


interface FakeUser {
    email: string | null
    uid: string | null
    token: string | null
}

const initialState: FakeUser = {
    email: '',
    uid: '',
    token: ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action){
            state.email = action.payload.email;
            state.uid = action.payload.id;
            state.token = action.payload.token;
        },
        removeUser(state){
            state.email = null;
            state.uid = null;
            state.token = null
        },
    }
})

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer