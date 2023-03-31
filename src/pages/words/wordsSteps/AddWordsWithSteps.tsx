import { useState, useEffect } from "react";
import AddExamples from "./AddExamples";
import AddTagsStep from "./AddTagsStep";
import AddTranslation from "./AddTranslation";
import FastMeaning from "./FastMeaning";
import { nanoid } from '@reduxjs/toolkit'
import { TranslationGroup } from "./uiFields/TranslationGroup";
import { AddedTagForm, ExampleForm, IsFormReady, TagForm } from "../../types/word";
import AddNewWordToDb from "./AddNewWordToDb";

export interface WordForm {
    word: string,
    meaning: string,
    translation: TranslationGroup[],
    examples: ExampleForm[]
    tags: {
        newTags: TagForm[]
        addedTags: AddedTagForm[]
    },
    validFields: IsFormReady,
    sendingData: boolean
}

export const basicAddWordStructure: WordForm = {
    word: '',
    meaning: '',
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
    tags: {
        newTags: [{id: nanoid(), name: '', show: true}],
        addedTags: []
    },
    validFields: {word: false, meaning: false},
    sendingData: false
}

const AddWordsWithSteps = () => {
    const [step, setStep] = useState(1)
    const [word, setWords] = useState<WordForm>(basicAddWordStructure)

    useEffect(() => {
    }, [word])
    
    return (
        <div>
            <FastMeaning step={step} changeStep={setStep} wordState={word} changeWordState={setWords} />
            <AddTranslation step={step} changeStep={setStep} wordState={word} changeWordState={setWords} />
            <AddExamples step={step} changeStep={setStep} wordState={word} changeWordState={setWords}/>
            <AddTagsStep wordState={word} changeWordState={setWords} step={step} changeStep={setStep} />
            <AddNewWordToDb wordFields={word} changeWordSate={setWords}/>
        </div>
    )
}


export default AddWordsWithSteps;