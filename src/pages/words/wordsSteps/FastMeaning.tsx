import {useEffect, useState} from 'react'
import { WordForm } from "./AddWordsWithSteps";
import CardStepsWords from "./CardStepsWords";
import FastMeaningFields from "./uiFields/FastMeaningFields";

interface Props {
    step: number
    changeStep: React.Dispatch<React.SetStateAction<number>>
    wordState: WordForm
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>> 
}
const FastMeaning = ({step, changeStep, wordState, changeWordState}: Props) => {
    const errorless = wordState.validFields.word && wordState.validFields.meaning

    if (step !== 1){
        return null
    }
    return (
        <CardStepsWords 
        step={step} 
        fieldSet={<FastMeaningFields wordState={wordState} changeWordState={changeWordState} />} 
        changeStep={changeStep}
        changeWordState={changeWordState}
        errorless={errorless}
        />
    )
}

export default FastMeaning;