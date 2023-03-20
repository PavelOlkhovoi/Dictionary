import { nanoid } from '@reduxjs/toolkit';
import {useState, useEffect} from 'react'
import LineButton from '../../../../components/ui-elements/buttons/LineButton';
import { PartOfSpeechSelect, AdvanceMeanings } from '../../../types/word';
import { WordForm } from "../AddWordsWithSteps";
import TranslationFields from './TranslationFields';
import { styleTW } from '../../../../style';

export interface TranslationGroup {
    id: string,
    name: PartOfSpeechSelect,
    translation: string[],
    show: boolean
}

interface Props {
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>> 
}
const TranslationGroup = ({changeWordState}: Props) => {
    const [selectItems, setSelectItems] = useState<TranslationGroup[]>([{
        id: nanoid(),
        name: 'none',
        translation: [''],
        show: true
    }])

    const handleSelect = (id: string, value: string) => {
        const selectedGroup = selectItems.map(items => {
            if(items.id === id){
                items.name = value as PartOfSpeechSelect
            }
            return items
        })

        setSelectItems(selectedGroup)
    }

    const deleteGroupHandler = (id: string) => {
        const newState = selectItems.map(g => {
            if(g.id === id){
                g.show = false
            }
            return g
        })
        setSelectItems(newState)
    }

    useEffect(() => {
        const meargedGroup: AdvanceMeanings = {}
        selectItems.forEach(g => {
            
            const allMeanings = selectItems.filter(g => meargedGroup.hasOwnProperty(g.name as keyof AdvanceMeanings))
            .map(t => t.translation).flat()
            if(allMeanings.length > 0){
                meargedGroup[g.name as keyof AdvanceMeanings] = {
                    translation: allMeanings
                }
            }else {
                meargedGroup[g.name as keyof AdvanceMeanings] = {
                    translation: g.translation
                }
            }
            
        })

        console.log('Translation group was changed', meargedGroup)

        changeWordState(wState => ({...wState, translation: meargedGroup}))

    }, [selectItems])
    return (
        <div>
            {
                selectItems.filter(g => g.show).map(g => <div key={g.id}>
                    <div>
                        <label>
                        Pick a part of speech: 
                        <select value={g.name} onChange={(e) => handleSelect(g.id, e.target.value)}>
                            <option value="noun">Noun</option>
                            <option value="adjective">Adjective</option>
                            <option value="verb">Verb</option>
                            <option value="noun">Noun</option>
                            <option value="phrasal verb">Phrasal verb</option>
                            <option value="adverb">Adverb</option>
                            <option value="preposition">Preposition</option>
                            <option value="conjunctions">Conjunctions</option>
                        </select>
                        </label>
                        <div className={`${styleTW.bageRed}`} onClick={()=> deleteGroupHandler(g.id)}>X</div>
                    </div>
                    <TranslationFields groupState={selectItems} groupId={g.id} changeTranslationGroup={setSelectItems} />
                </div>)
            }
            <LineButton onClick={()=> setSelectItems(prev => 
            [...prev, { id: nanoid(), name: 'none', translation: [''], show: true}])}
            >
                New groupe
            </LineButton>
        </div>
    )
}

export default TranslationGroup;