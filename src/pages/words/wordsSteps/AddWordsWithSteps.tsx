import { ReactNode, useState, useEffect } from "react";
import { styleTW } from "../../../style";
import { MeaningForm } from "../../types/word";
import AddExamples from "./AddExamples";
import AddTagsStep from "./AddTagsStep";
import AddTranslation from "./AddTranslation";
import FastMeaning from "./FastMeaning";
import { nanoid } from '@reduxjs/toolkit'

export interface WordForm {
    word: string,
    fastMeaning: string,
    translation: MeaningForm
}

const AddWordsWithSteps = ({ }) => {
    const [step, setStep] = useState(2)
    const [word, setWords] = useState<WordForm>({
        word: '',
        fastMeaning: '',
        translation: {
        }
    })

    useEffect(() => {
        console.log('Translation changed', word.translation)
    }, [word.translation])
    return (
        <div>
            <FastMeaning step={step} changeStep={setStep} wordState={word} changeWordState={setWords}/>
            <AddTranslation step={step} changeStep={setStep} wordState={word} changeWordState={setWords} />
            <AddExamples step={step} changeStep={setStep} />
            <AddTagsStep step={step} changeStep={setStep} />
        </div>
    )
}


export default AddWordsWithSteps;