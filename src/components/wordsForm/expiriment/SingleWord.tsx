import {FC} from 'react'
import useInput from '../../../hooks/useInput';
import { ISingleWord } from '../../../pages/types/word';

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
            <input 
                placeholder={place} 
                value={field.value} 
                onChange={field.onChange} 
                onBlur={() => saveField(wordData, field.value)}
            />
            <button onClick={() => deleteField(wordData)}>Delete</button>
        </div>
    );
}

export default SingleWord;
