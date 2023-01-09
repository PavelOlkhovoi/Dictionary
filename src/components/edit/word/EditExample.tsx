import { ExampleForServer } from "../../../pages/types/word";
import MyButton from "../../wordsForm/ui/MyButton";
import {useState, useEffect} from 'react'
import EditSingleExample from "./EditSingleExample";


interface Props {
    allExamples: ExampleForServer[]
    exampleUpdate: Function
}

const EditExample = ({allExamples, exampleUpdate}:Props) => {
    const [newExample, setNewExample] = useState<ExampleForServer[]>(allExamples)
    const changeExample = (idx: number, example: ExampleForServer) => {
        const copyArr = [...newExample]
        copyArr[idx] = example
        setNewExample(copyArr)
    }

    const deleteExample = (idx: number) => {
        const deletedArr = newExample.filter((ex, id) => idx !== id)
        setNewExample(deletedArr)
    }

    useEffect(()=> {
        console.log('Edit New Exampl', newExample)
        exampleUpdate(newExample)
    }, [newExample])
    return (
        <div>
            {
            newExample.map((ex, idx) => {
                return <div key={ex.example} className="my-4">
                    <EditSingleExample 
                        oldExample={ex.example} 
                        oldTranslation={ex.translation}
                        arrIdx={idx}
                        rewriteFunction={changeExample}
                        deleteExample={deleteExample}
                    />
                </div>
            })
            }
            <MyButton onClick={
                ()=>setNewExample(prev => [
                    ...prev,
                    {
                        example: '',
                        translation: ''
                    }
                ])}
                >Add Example
            </MyButton>
        </div>
    );
}


export default EditExample;