import useInput from "../../../hooks/useInput";
import {FC} from 'react'
import { InputExamples } from "../../../pages/types/word";
import MyInput from "../ui/MyInput";
import MyButton from "../ui/MyButton";

interface Props {
    deleteField: Function;
    fieldObject: InputExamples;
    saveField: Function
}

const SingleExample: FC<Props> = ({deleteField, fieldObject, saveField}) => {
    const example = useInput('')
    const translation = useInput('')
    return (
        <div className="[&>*]:my-5">
            <MyInput value={example.value} onChange={example.onChange} placeholder="example" name="example" label="Example"/>
            <MyInput value={translation.value} onChange={translation.onChange} placeholder="translation"
            name="translation" label="Translation"/>
            <div className="grid grid-cols-2 gap-4">
                <MyButton onClick={()=> saveField(fieldObject, example.value, translation.value)} color='green'>Save Example</MyButton>
                <MyButton onClick={()=> deleteField(fieldObject)} color={'red'}>Delete Example</MyButton>
            </div>
        </div>
    );
}


export default SingleExample;