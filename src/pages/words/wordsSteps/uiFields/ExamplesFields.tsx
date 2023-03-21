import MyInput from "../../../../components/wordsForm/ui/MyInput";
import { WordForm } from "../AddWordsWithSteps"
import { styleTW } from "../../../../style";
import { nanoid } from "@reduxjs/toolkit";
import LineButton from "../../../../components/ui-elements/buttons/LineButton";
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
    const deleteHandler = (id: string) => {
        const targetGroup = wordState.examples.find(ex => ex.id === id)
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
                    return <div key={ex.id}>
                        <MyInput label='Example' name="example" value={ex.example} onChange={(e)=> changeInputs(ex.id, e.target.value, 'example')}/>
                        <MyInput label='Translation' name="translation" value={ex.translation} onChange={(e)=> changeInputs(ex.id, e.target.value, 'translation')}/>
                        <div className={`${styleTW.bageRed}`} onClick={()=> deleteHandler(ex.id)}>X</div>
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