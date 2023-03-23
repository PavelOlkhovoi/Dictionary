import { useState, useEffect } from "react";
import AddExamples from "./AddExamples";
import AddTagsStep from "./AddTagsStep";
import AddTranslation from "./AddTranslation";
import FastMeaning from "./FastMeaning";
import { nanoid } from '@reduxjs/toolkit'
import { TranslationGroup } from "./uiFields/TranslationGroup";
import { AddedTagForm, ExampleForm, IsFormReady, TagForm } from "../../types/word";

export interface WordForm {
    word: string,
    fastMeaning: string,
    translation: TranslationGroup[],
    examples: ExampleForm[]
    tags: {
        newTags: TagForm[]
        addedTags: AddedTagForm[]
    },
    validFields: IsFormReady
}

const AddWordsWithSteps = ({ }) => {
    const [step, setStep] = useState(1)
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
        tags: {
            newTags: [{id: nanoid(), name: '', show: true}],
            addedTags: []
        },
        validFields: {word: false, fastMeaning: false}
    })

    useEffect(() => {
    }, [word])
    return (
        <div>
            <FastMeaning step={step} changeStep={setStep} wordState={word} changeWordState={setWords} />
            <AddTranslation step={step} changeStep={setStep} wordState={word} changeWordState={setWords} />
            <AddExamples step={step} changeStep={setStep} wordState={word} changeWordState={setWords}/>
            <AddTagsStep wordState={word} changeWordState={setWords} step={step} changeStep={setStep} />
        </div>
    )
}


export default AddWordsWithSteps;