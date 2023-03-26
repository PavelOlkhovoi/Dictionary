import {useState, useEffect} from 'react'
import ShowError from '../../../../components/validations/ShowError';
import MyInput from "../../../../components/wordsForm/ui/MyInput";
import { useAppSelector } from "../../../../hooks/redux-hooks";
import useValidation from '../../../../hooks/useValidation';
import { selectWordsAsStringInArr } from "../../../../store/slices/wordSlice";
import { IsFormReady } from '../../../types/word';
import { WordForm } from "../AddWordsWithSteps";

interface Props {
    wordState: WordForm
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>>
}

const FastMeaningFields = ({wordState, changeWordState}: Props) => {
    const words = useAppSelector(state => selectWordsAsStringInArr(state))
    const wordValid = useValidation(wordState.word, {isTextUnique: words, isEmpty: true})
    const fastMeaningValid = useValidation(wordState.meaning, {isEmpty: true, minLength: 2})
    
    const [startValidation, setStartValidation] = useState({word: false, fastMeaning: false})

    const handleValidFields = (isValid: boolean, field: string) => {
        changeWordState(wState => ({...wState, validFields: {...wState.validFields, [field as keyof IsFormReady]: isValid}}))
    }

    const fieldsHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeWordState(wState => ({...wState, [e.target.name]: e.target.value }))
    }

    const onStartValidation = (name: string) => {
        setStartValidation(prev => ({...prev, [name]: true}))
    }
    

    useEffect(() => {
        handleValidFields(wordValid.uniqueTextError && !wordValid.isEmpty, 'word')
    }, [wordValid.isEmpty, wordValid.uniqueTextError])

    useEffect(() => {
        handleValidFields(fastMeaningValid.minLengthError, 'fastMeaning')
    }, [fastMeaningValid.minLengthError])

    return (
        <div className="py-4">
            <div className='py-4'>
                <MyInput 
                name='word' 
                label='word' 
                value={wordState.word} 
                onChange={(e)=> fieldsHandle(e)}
                onBlur={(e) => onStartValidation(e.target.name)}
                />
                <ShowError show={startValidation.word} pattern={wordValid}  />
            </div>

            <div className='py-4'>
            <MyInput 
            name='meaning' 
            label='main meaning' 
            value={wordState.meaning} 
            onChange={(e)=> fieldsHandle(e)}
            onBlur={(e)=> onStartValidation(e.target.name)}
            />
            <ShowError show={startValidation.fastMeaning} pattern={fastMeaningValid} length={2} />
            </div>
        </div>
    )
}

export default FastMeaningFields;