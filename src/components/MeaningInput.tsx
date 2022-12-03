import {FC} from 'react'
import useInput from "../hooks/useInput"


interface Props {
    onBlur: Function
}

const MeaningInput: FC<Props> = ({onBlur}) => {
    const newInputProps = useInput('')

    return (
    <div>
        <input type="text" {...newInputProps} onBlur={(e) => onBlur(e)} />
    </div>
    );
}


export default MeaningInput;