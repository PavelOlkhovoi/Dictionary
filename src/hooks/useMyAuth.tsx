import { useAppSelector } from './redux-hooks'

export const useMyAuth =() => {
    const {email, token, uid} = useAppSelector(state => state.user)

    /// TODO: Create this hook
    return {
        isAuth: !!email,
        email,
        token,
        uid
    }
}