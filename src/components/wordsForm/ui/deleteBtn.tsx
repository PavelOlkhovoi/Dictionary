import { styleTW } from "../../../style"

interface Props {
    onDeleteFunc: Function
    id: string
}
const deleteBtn = ({onDeleteFunc, id}: Props) => {
    const deleteHandler = () => {
        onDeleteFunc(id)
    }
    return <div className={`${styleTW.bageRed}`} onClick={()=> deleteHandler}>X</div>;
}

export default deleteBtn;