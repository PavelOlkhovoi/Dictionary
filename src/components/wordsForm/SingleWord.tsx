import {FC} from 'react'
import useInput from '../../hooks/useInput';
import { ISingleWord } from '../../pages/types/word';
import MyButton from './ui/MyButton';
import MyInput from './ui/MyInput';

interface Props {
    wordData: ISingleWord,
    deleteField: Function,
    saveField: Function,
    place: string,
    name?: string,
    label?: string
}

const SingleWord: FC<Props> = ({wordData, deleteField, saveField, place, name, label}) => {
    const field = useInput(wordData.name)
    return (
        <div className='grid grid-cols-2 gap-4 items-end'>
            <MyInput 
                placeholder={place} 
                value={field.value} 
                onChange={field.onChange} 
                onBlur={() => saveField(wordData, field.value)}
                // className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name={name as string}
                label={label as string}
            />
            <MyButton 
            color='red' 
            onClick={() => deleteField(wordData)}
            >
                Delete</MyButton>
        </div>
    );
}

export default SingleWord;
