import { ReactNode, useState } from "react";
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
    translation: MeaningForm | null
}

const AddWordsWithSteps = ({ }) => {
    const [step, setStep] = useState(2)
    const [word, setWords] = useState<WordForm>({
        word: '',
        fastMeaning: '',
        translation: {
            none: {
                id: nanoid(),
                partOfSpeech: 'none',
                translation: [''],
                show: true
            }
        }
    })
    return (
        <div>
            <FastMeaning step={step} changeStep={setStep} wordState={word} changeWordState={setWords}/>
            <AddTranslation step={step} changeStep={setStep} />
            <AddExamples step={step} changeStep={setStep} />
            <AddTagsStep step={step} changeStep={setStep} />
        </div>
    )
}


export default AddWordsWithSteps;