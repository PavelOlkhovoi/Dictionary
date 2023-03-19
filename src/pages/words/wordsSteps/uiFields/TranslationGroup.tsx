import { nanoid } from '@reduxjs/toolkit';
import {useState, useEffect} from 'react'
import { PartOfSpeechSelect } from '../../../types/word';
import { WordForm } from "../AddWordsWithSteps";
import TranslationFields from './TranslationFields';

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

    useEffect(() => {
        console.log('Changed select items', selectItems)
    }, [selectItems])
    return (
        <div>
            {
                selectItems.map(g => <div key={g.id}>
                <label>
                Pick a part of speech
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
                <TranslationFields groupState={selectItems} groupId={g.id} changeTranslationGroup={setSelectItems} />
                </label>
                </div>)
            }
        </div>
    )
}

// <TranslationFields wordState={wordState} changeWordState={changeWordState} />} changeStep={changeStep}

export default TranslationGroup;