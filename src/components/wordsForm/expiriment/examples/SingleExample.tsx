import useInput from "../../../../hooks/useInput";
import {FC} from 'react'
import { InputExamples } from "../../../../pages/types/word";

interface Props {
    deleteField: Function;
    fieldObject: InputExamples;
    saveField: Function
}

const SingleExample: FC<Props> = ({deleteField, fieldObject, saveField}) => {
    const example = useInput('')
    const translation = useInput('')
    return (
        <div>
            <input value={example.value} onChange={example.onChange} />
            <input value={translation.value} onChange={translation.onChange} />
            <button onClick={()=> saveField(fieldObject, example.value, translation.value)}>Save Example</button>
            <button onClick={()=> deleteField(fieldObject)}>Delete Example</button>
        </div>
    );
}


export default SingleExample;