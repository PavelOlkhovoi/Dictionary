import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import LineButton from "../../../../components/ui-elements/buttons/LineButton";
import MyInput from "../../../../components/wordsForm/ui/MyInput";
import useInput from "../../../../hooks/useInput";
import { PartOfSpeechSelect } from "../../../types/word";
import { WordForm } from "../AddWordsWithSteps";
import { TranslationGroup } from "./TranslationGroup";


interface Props {
    groupState: TranslationGroup[]
    groupId: string
    changeTranslationGroup: React.Dispatch<React.SetStateAction<TranslationGroup[]>>
}

const TranslationFields = ({groupState, groupId, changeTranslationGroup}: Props) => {
    const [meanings, setMeaning] = useState([{
        id: nanoid(),
        name: '',
        show: true
    }])

    const handleMeaning = (meaningId: string, text: string) => {
        const newState = meanings.map(m => {
            if(meaningId === m.id){
                return {
                    ...m,
                    name: text
                }
            }
            return m
        })

        setMeaning(newState)
    }

    const handleOnBlur = () => {
        const cleanTranslation = meanings.filter(t => t.show).map(t => t.name)
        const targetGroup = groupState.map(g => {
            if(g.id === groupId){
                g.translation = cleanTranslation
            }

            return g
        })
        changeTranslationGroup(targetGroup)
    }
    return (
        <div className="py-4">
        {
            meanings.map(m => <MyInput key={m.id} 
                name="translation" label="translation" 
                value={m.name} onChange={(e) => handleMeaning(m.id, e.target.value)}
                onBlur={handleOnBlur}
                />)
        }
        <div>
            <LineButton onClick={()=> setMeaning(prev => [...prev, {id: nanoid(), name: '', show: true}])}>New translation</LineButton>
        </div>
        </div>
    )
}


export default TranslationFields;