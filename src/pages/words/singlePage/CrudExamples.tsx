import { nanoid } from "@reduxjs/toolkit";
import { DeleteBtnIds, ExampleForm, ExampleForServer, WordDb } from "../../types/word";
import {useState} from 'react'
import SimpleExampleUi from "../ui/example/SimpleExampleUi";
import { updateExampleDB } from "../../../backend/crudFunctions/example";
import {useEffect} from 'react'

interface Props {
    word: WordDb
    edit: boolean
    add: number
}
const CrudExamples = ({word, edit, add}: Props) => {

    const stateExample: ExampleForm[] = word.examples.length > 0 ? word.examples.map(ex => ({
        id: nanoid(),
        example: ex.example,
        translation: ex.translation,
        show: true
    })) : [{id: nanoid(), example: '', translation: '', show: true}]

    const [examples, setExamples] = useState<ExampleForm[]>(stateExample)

    const updateExampleForm = (id: string, name: string, text: string) => {
        const ex = examples.map(ex => {
            if(ex.id === id) {
                return {...ex, [name]: text}
            }
            return ex
        })

        setExamples(prev => ex)
    }

    const updateDb = () => {
        const formExample = examples.filter(ex => ex.show)
        const dbExample: ExampleForServer[] = formExample.map(ex => ({example: ex.example, translation: ex.translation}))
        updateExampleDB(word.wordId as string, dbExample)
    }

    const deleteExample = (id: DeleteBtnIds) => {
        const formExample = examples.filter(ex => ex.id !== id.idMain)
        setExamples(prev => formExample)
        const dbExample: ExampleForServer[] = formExample.map(ex => ({example: ex.example, translation: ex.translation}))
        updateExampleDB(word.wordId as string, dbExample)
    }


    useEffect(()=> {
        setExamples(prev => [...prev, {id: nanoid(), example: '', translation: '', show: true}])
    }, [add])
    return (
        <div className="my-4">
        {
            examples.filter(ex => ex.show).map(ex => 
            <SimpleExampleUi
            key={ex.id}
            example={ex} 
            updateDB={updateDb}
            deleteExample={deleteExample}
            setExample={updateExampleForm}
            />)
        }
        </div>
    )
}

export default CrudExamples;