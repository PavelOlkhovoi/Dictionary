import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import LineButton from "../../../../components/ui-elements/buttons/LineButton";
import MyInput from "../../../../components/wordsForm/ui/MyInput";
import useInput from "../../../../hooks/useInput";
import { styleTW } from "../../../../style";
import { PartOfSpeechSelect } from "../../../types/word";
import { WordForm } from "../AddWordsWithSteps";
import { TranslationGroup } from "./TranslationGroup";


interface Props {
    groupState: TranslationGroup[]
    groupId: string
    changeTranslationGroup: React.Dispatch<React.SetStateAction<TranslationGroup[]>>
}

const TranslationFields = ({groupState, groupId, changeTranslationGroup}: Props) => {
    const [meanings, setMeanings] = useState([{
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

        setMeanings(newState)
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
    const deleteHandler = (id: string) => {
        const newState = meanings.map(t => {
            if(t.id === id){t.show = false}
            return t
        })

        setMeanings(newState)
    }
    return (
        <div className="py-4">

            {
            meanings.map(m => {
                return m.show && <div key={m.id} className="flex items-start">
                <MyInput 
                name="translation" label="translation" 
                value={m.name} onChange={(e) => handleMeaning(m.id, e.target.value)}
                onBlur={handleOnBlur}
                />
                <div className={`${styleTW.bageRed}`} onClick={()=> deleteHandler(m.id)}>X</div>
                </div> 
                })
            }
            
            <div>
                <LineButton onClick={()=> setMeanings(prev => [...prev, {id: nanoid(), name: '', show: true}])}>New translation</LineButton>
            </div>
        </div>
    )
}


export default TranslationFields;