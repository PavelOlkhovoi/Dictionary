import {useState, FC, useEffect} from 'react'
import useTest from './useTest'


interface Props {
    onBlur: Function
}

const MeaningInput: FC<Props> = ({onBlur}) => {
    const newInputProps = useTest('')

    return (
    <div>
        <input type="text" {...newInputProps} onBlur={(e) => onBlur(e)} />
    </div>
    );
}


export default MeaningInput;