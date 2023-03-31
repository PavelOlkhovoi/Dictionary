import LineButton from "../../../../components/ui-elements/buttons/LineButton";
import MyInput from "../../../../components/wordsForm/ui/MyInput";
import useValidation from "../../../../hooks/useValidation";
import { ExampleForm } from "../../../types/word";
import DeleteBtn from "../../wordsSteps/uiFields/DeleteBtn";
import {useState} from 'react'
import ShowError from "../../../../components/validations/ShowError";
import { DeleteBtnIds } from "../../../types/word";

interface Props {
    example: ExampleForm
    setExample: (id: string, name: string, text: string) => void
    updateDB: () => void
    deleteExample: (id: DeleteBtnIds) => void
}
const SimpleExampleUi = ({example, setExample, updateDB, deleteExample}: Props) => {
    const exampleValidation = useValidation(example.example, {minLength: 10})
    const translationValidation = useValidation(example.translation, {minLength: 10})
    const [startValidation, setStartValidation] = useState({example: false, translation: false})

    const handleValue = (name: string, value: string) => setExample(example.id, name, value)

    return (
        <div className="my-2">
            <div className="my-4">
                <MyInput 
                name="example" 
                label="example" 
                value={example.example}
                onFocus={()=> setStartValidation(prev => ({...prev, example: false})) }
                onBlur={()=> setStartValidation(prev => ({...prev, example: true})) }
                onChange={(e) => handleValue(e.target.name, e.target.value)}
                />
                <ShowError show={startValidation.example} hookName={exampleValidation} length={20}/>
            </div>
            <div className="my-4">
                <MyInput 
                name="translation" 
                label="translation" 
                value={example.translation}
                onFocus={()=> setStartValidation(prev => ({...prev, translation: false})) }
                onBlur={()=> setStartValidation(prev => ({...prev, translation: true})) }
                onChange={(e) => handleValue(e.target.name, e.target.value)}
                />
                <ShowError show={startValidation.translation} hookName={translationValidation} length={20}/>
            </div>
            <div className="flex gap-6">
                <LineButton
                detach={!exampleValidation.correctField || !translationValidation.correctField}
                onClick={updateDB}
                >
                    Save
                </LineButton>
                <span><DeleteBtn idsBtn={{idMain: example.id}} deleteHandler={() => deleteExample({idMain: example.id})}  /> delete</span> 
            </div>   
        </div>
    )
}


export default SimpleExampleUi;