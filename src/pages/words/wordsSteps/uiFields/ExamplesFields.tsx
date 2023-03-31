import MyInput from "../../../../components/wordsForm/ui/MyInput";
import { WordForm } from "../AddWordsWithSteps"
import { styleTW } from "../../../../style";
import { nanoid } from "@reduxjs/toolkit";
import LineButton from "../../../../components/ui-elements/buttons/LineButton";
import DeleteBtn from "./DeleteBtn";
import { DeleteBtnIds } from "../../../types/word";

interface Props {
    wordState: WordForm,
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>>
}

const ExamplesFields = ({wordState, changeWordState}: Props) => {
    
    const changeInputs = (id: string, text: string, field: 'example' | 'translation') => {
        const targetGroup = wordState.examples.find(ex => ex.id === id)
        if(!targetGroup){return false}
        field === 'example' ? targetGroup.example = text : targetGroup.translation = text
        changeWordState(wState => ({...wState, examples: [...wordState.examples]}))
    }
    const deleteHandler = (id: DeleteBtnIds) => {
        const targetGroup = wordState.examples.find(ex => ex.id === id.idMain)
        if(!targetGroup){return false}
        targetGroup.show = false
        changeWordState(wState => ({...wState, examples: [...wordState.examples]}))
    }
    const addHandler = () => {
        changeWordState(wState => ({...wState, examples: [...wordState.examples, {
            id: nanoid(),
            example: '',
            translation: '',
            show: true
        }]}))
    }

    return (
        <div>
            {
                wordState.examples.filter(ex => ex.show).map(ex => {
                    return <div key={ex.id}
                    className="my-8"
                    >
                        <div className="my-3">
                            <MyInput 
                            label='Example' 
                            name="example" 
                            value={ex.example} 
                            onChange={(e)=> changeInputs(ex.id, e.target.value, 'example')}
                            />
                        </div>
                        <div>
                            <MyInput 
                            label='Translation' 
                            name="translation" 
                            value={ex.translation} 
                            onChange={(e)=> changeInputs(ex.id, e.target.value, 'translation')}
                            />
                        </div>
                        <div className="flex-start itemes-center mt-1">
                            <DeleteBtn deleteHandler={deleteHandler} idsBtn={{idMain: ex.id}} /> <span>delete example</span>
                        </div>

                    </div>
                })
            }
            <div>
                <LineButton onClick={addHandler}>Add example</LineButton>
            </div>
        </div>
    )
}

export default ExamplesFields;