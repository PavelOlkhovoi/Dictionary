import { useState, useEffect } from "react";
import AddExamples from "./AddExamples";
import AddTagsStep from "./AddTagsStep";
import AddTranslation from "./AddTranslation";
import FastMeaning from "./FastMeaning";
import { nanoid } from '@reduxjs/toolkit'
import { TranslationGroup } from "./uiFields/TranslationGroup";
import { ExampleForm, TagForm } from "../../types/word";

export interface WordForm {
    word: string,
    fastMeaning: string,
    translation: TranslationGroup[],
    examples: ExampleForm[]
    tags: TagForm[]
}

const AddWordsWithSteps = ({ }) => {
    const [step, setStep] = useState(2)
    const [word, setWords] = useState<WordForm>({
        word: '',
        fastMeaning: '',
        translation: [{
            id: nanoid(),
            name: 'none',
            translation: [{
                id: nanoid(),
                name: '',
                show: true
            }],
            show: true
        }],
        examples: [{
            id: nanoid(),
            example: '',
            translation: '',
            show: true
        }],
        tags: [{id: nanoid(), name: '', show: true}]
    })

    useEffect(() => {
        console.log('Word Chenged', word)
    }, [word])
    return (
        <div>
            <FastMeaning step={step} changeStep={setStep} wordState={word} changeWordState={setWords}/>
            <AddTranslation step={step} changeStep={setStep} wordState={word} changeWordState={setWords} />
            <AddExamples step={step} changeStep={setStep} wordState={word} changeWordState={setWords}/>
            <AddTagsStep wordState={word} changeWordState={setWords} step={step} changeStep={setStep} />
        </div>
    )
}


export default AddWordsWithSteps;