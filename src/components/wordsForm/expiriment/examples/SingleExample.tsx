import useInput from "../../../../hooks/useInput";
import {FC} from 'react'
import { IExamples } from "./ExamplesConstructor";

interface Props {
    deleteField: Function,
    fieldObject: IExamples
}

const SingleExample: FC<Props> = ({deleteField, fieldObject}) => {
    const example = useInput('')
    const translation = useInput('')
    return (
        <div>
            <input value={example.value} onChange={example.onChange} />
            <input value={translation.value} onChange={translation.onChange} />
            <button>Save Example</button>
            <button onClick={()=> deleteField(fieldObject)}>Delete Example</button>
        </div>
    );
}


export default SingleExample;