import { PartOfSpeechSelect, WordDb } from "../../types/word";
import {useState} from 'react'
import { nanoid } from "@reduxjs/toolkit";
import MeainingCrudUi from "../ui/meanings/MeainingCrudUi";
import { TranslationGroup } from "../wordsSteps/uiFields/TranslationGroup";
import { DeleteBtnIds } from "../../types/word";
import { setgroups } from "process";


interface Props {
    word: WordDb
}
const CrudMeanings = ({word}: Props) => {
    const preparedState: TranslationGroup[] = []
    Object.entries(word.meaning).forEach(([key, {translation}]) => {
        const group: TranslationGroup = {
            id: nanoid(),
            name: key as PartOfSpeechSelect,
            show: true,
            translation: translation.map(t => ({id: nanoid(), name: t, show: true}))
        }
        preparedState.push(group)
     })
    
    const [meanings, setMeanings] = useState<TranslationGroup[]>(preparedState)

    const handleTypeOfGroupe = (idGroup: string, name: string) => {
        const updayedGroupe = meanings.map(g => {
            if(g.id === idGroup) { g.name = name as PartOfSpeechSelect }
            return g
        })

        setMeanings(prev => updayedGroupe)
    }
    
    const deleteTypeOfGroupe = (idGroup: DeleteBtnIds) => {
        const updayedGroupe = meanings.map(g => {
            if(g.id === idGroup.idMain) { g.show = false }
            return g
        })

        setMeanings(prev => updayedGroupe)
    }

    const addGroup = () => {
        setMeanings(prev => [...prev, {
            id: nanoid(), 
            name: "none", 
            show: true, 
            translation: [{id: nanoid(), name: '', show: true}]
        }])
    }

    const handleTranslation = (idTranslation: string, idGroup: string, name: string) => {
        const updayedTranslation = meanings.map(g => {
            if(g.id === idGroup) { 
                g.translation.map(t => {
                    if(t.id === idTranslation){
                        t.name = name
                    }
                })
            }
            return g
        })

        setMeanings(prev => updayedTranslation)
    } 
    
    const deleteTranslation = (ids: DeleteBtnIds) => {
        const updayedTranslation = meanings.map(g => {
            if(g.id === ids.idMain) { 
                g.translation.map(t => {
                    if(t.id === ids.idEmbedded){
                        t.show= false
                    }
                })
            }
            return g
        })

        setMeanings(prev => updayedTranslation)
    } 

    const addTranslation = (idGroup: string) => {
        const group = meanings.find(g => g.id === idGroup)
        if(group){
            group.translation = [...group.translation, {id: nanoid(), name: "", show: true}]
            setMeanings(prev => [...prev])
        }

    }

    return (
        <div>
            {
                meanings.filter(g => g.show).map(m => {
                    return <MeainingCrudUi
                    key={m.id}
                    groupId={m.id}
                    typeOfGroup={m.name}
                    translation={m.translation}
                    handleGroupe={handleTypeOfGroupe}
                    handleTranslation={handleTranslation}
                    deleteGroup={deleteTypeOfGroupe}
                    deleteTranslation={deleteTranslation}
                    addTranslation={addTranslation}
                    addGroup={addGroup}
                    />
                })
            }
        </div>
    )
}

export default CrudMeanings;