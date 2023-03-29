import { nanoid } from "@reduxjs/toolkit";
import { ExampleForm, WordDb } from "../../types/word";
import {useState} from 'react'
import SimpleExampleUi from "../ui/example/SimpleExampleUi";


interface Props {
    word: WordDb
    edit: boolean
}
const CrudExamples = ({word, edit}: Props) => {

    const stateExample: ExampleForm[] = word.examples.length > 0 ? word.examples.map(ex => ({
        id: nanoid(),
        example: ex.example,
        translation: ex.translation,
        show: true
    })) : [{id: nanoid(), example: '', translation: '', show: true}]

    const [examples, setExamples] = useState<ExampleForm[]>(stateExample)

    const updateExample = (id: string, name: string, text: string) => {
        const ex = examples.map(ex => {
            if(ex.id === id) {
                return {...ex, [name]: text}
            }
            return ex
        })

        setExamples(ex)
    }
    
    return (
        <div className="my-4">
        {
            examples.filter(ex => ex.show).map(ex => <SimpleExampleUi example={ex} setExample={updateExample} key={ex.id}/>)
        }
        </div>
    )
}

export default CrudExamples;