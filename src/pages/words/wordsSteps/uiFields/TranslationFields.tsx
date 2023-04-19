import { nanoid } from "@reduxjs/toolkit";
import LineButton from "../../../../components/ui-elements/buttons/LineButton";
import MyInput from "../../../../components/wordsForm/ui/MyInput";
import { DeleteBtnIds } from "../../../../types/word";
import { WordForm } from "../AddWordsWithSteps";
import DeleteBtn from "./DeleteBtn";

export interface TranslationFieldsTest {
    id: string
    name: string
    show: boolean
}

interface Props {
    wordState: WordForm
    groupId: string
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>>
}

const TranslationFields = ({wordState, groupId, changeWordState}: Props) => {
    const targetGroup = wordState.translation.find(g => g.id === groupId)
    if(!targetGroup){
        throw new Error('Target group was not found')
    }

    const copyState = [...wordState.translation]

    const updateTranslationCorrect = ()=> {
        changeWordState(wordState => ({
            ...wordState,
            translation: copyState
        }))
    }

    const handleMeaning = (meaningId: string, text: string) => {
        targetGroup.translation.map(t => {
            if(t.id === meaningId){t.name = text}
            return t
        })

        updateTranslationCorrect()
    }

    const handleOnBlur = () => {
        // changeTranslationGroup(targetGroup)
    }
    const deleteHandler = (id: DeleteBtnIds) => {
        targetGroup.translation.map(t => {
            if(t.id === id.idMain){t.show = false}
            return t
        })
        
    }

    const addFields = () => {
        targetGroup.translation = [...targetGroup.translation, {id: nanoid(), name: '', show: true}]
        updateTranslationCorrect()
    }

    return (
        <div className="py-4">
            {
            targetGroup.translation.map(m => {
                return m.show && <div key={m.id} className="w-full py-2 mb-2 relative">
                    <MyInput 
                    name="translation" label="translation" 
                    value={m.name} 
                    onChange={(e) => handleMeaning(m.id, e.target.value)}
                    onBlur={handleOnBlur}
                    />
                    <div className="absolute bottom-7 right-0">
                        <DeleteBtn deleteHandler={deleteHandler} idsBtn={{idMain: m.id}} />
                    </div>
                </div> 
                })
            }
            <div>
                <LineButton onClick={addFields} color="blue">New translation</LineButton>
            </div>
        </div>
    )
}


export default TranslationFields;