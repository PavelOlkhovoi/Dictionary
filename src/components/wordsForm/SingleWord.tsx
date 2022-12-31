import {FC} from 'react'
import useInput from '../../hooks/useInput';
import { ISingleWord } from '../../pages/types/word';

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
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button onClick={() => deleteField(wordData)}>Delete</button>
        </div>
    );
}

export default SingleWord;
