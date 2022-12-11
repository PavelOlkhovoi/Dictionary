import {FC} from 'react'
import useInput from '../../../hooks/useInput';
import { ISingleWord } from './GroupOfWords';

interface Props {
    wordData: ISingleWord,
    deleteField: Function,
    saveField: Function,
    place: string
}

const SingleWord: FC<Props> = ({wordData, deleteField, saveField, place}) => {
    const field = useInput(wordData.name)
    return (
        <div>
            <input placeholder={place} value={field.value} onChange={field.onChange}/>
            <button onClick={() => saveField(wordData, field.value)}>Save / Update</button>
            <button onClick={() => deleteField(wordData)}>Delete</button>
        </div>
    );
}

export default SingleWord;
