import {useState, useEffect} from 'react'
import Validate from "../../../../components/validations/Validate";
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

    const handleValidFields = (isValid: boolean, field: string) => {
        changeWordState(wState => ({...wState, validFields: {...wState.validFields, [field as keyof IsFormReady]: isValid}}))
    }

    const wordHandle = (text: string) => {
        changeWordState(wState => ({...wState, word: text }))
    }
    

    useEffect(() => {
        if(wordValid.uniqueTextError && !wordValid.isEmpty){
            handleValidFields(true, 'word')
        }else {
            handleValidFields(false, 'fastMeaning')
        }
    }, [wordValid.isEmpty, wordValid.uniqueTextError])

    return (
        <div className="py-4">
            <MyInput 
            name='word' 
            label='word' 
            value={wordState.word} 
            onChange={(e)=> wordHandle(e.target.value)}/
            >
            {/* <Validate value={wordState.word} pattern={{isTextUnique: words, isEmpty: true}} isFormReady={isFormReady} show={valid.word}/> */}

            <MyInput name='fastMeaning' label='main meaning' value={wordState.fastMeaning} onChange={(e)=> changeWordState(wState => ({
                ...wState,
                fastMeaning: e.target.value
            }))}/>
        </div>
    )
}

export default FastMeaningFields;