import {useState} from 'react'
import { firstCapitalLetter } from '../../../helpers/display';
import useInput from '../../../hooks/useInput';
import MyButton from '../../wordsForm/ui/MyButton';
import MyInput from '../../wordsForm/ui/MyInput';

interface Props {
    text: string
    idx: number,
    updateLocalMeanings: Function
}

const EditSimpleString = ({text, idx, updateLocalMeanings}:Props) => {
    const string = useInput(text)
    return (
        <div>
            <MyInput 
            label='Meanings'
            name={string.value}
            onChange={string.onChange}
            value={string.value}
        />
        <MyButton 
            onClick={() => updateLocalMeanings(idx, string.value)}
        >
            Save
        </MyButton>
        </div>
    );
}


export default EditSimpleString;
