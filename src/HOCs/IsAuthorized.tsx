import { Navigate } from "react-router-dom"
import {ReactNode} from "react"
import { useAppSelector } from "../hooks/redux-hooks"


interface Props {
    children?: ReactNode
}
const IsAuthorized = ({children}: Props) => {
    const user = useAppSelector(state => state.user.user)
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if(user?.uid === '' && storedUser === null){
        return <Navigate to='/auth' />
    }


    return (
        <> 
            { children }
        </>
    )
}

export default IsAuthorized