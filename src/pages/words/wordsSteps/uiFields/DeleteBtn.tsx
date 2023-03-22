import { styleTW } from "../../../../style"
interface Props {
    deleteHandler: Function,
    idBtn: string
}
const DeleteBtn = ({deleteHandler, idBtn}:Props) => {
    const manageHandler = () => {
        deleteHandler(idBtn)
    }
    return <div className={`${styleTW.bageRed}`} onClick={manageHandler}>X</div>
}


export default DeleteBtn;