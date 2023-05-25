import { Navigate } from "react-router-dom"
import {FC, PropsWithChildren} from "react"
import { useAppSelector } from "../hooks/redux-hooks"


interface Props {
    // you shouldn't add children to the interface. You can write simpler a bit
    // the component could be like
    // const IsAuthorized: FC = ({children}) => <>{children}</>
}

const IsAuthorized: FC<PropsWithChildren<Props>> = ({ children }) => {
    const user = useAppSelector(state => state.user.user)
    // TODO: between renders?
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