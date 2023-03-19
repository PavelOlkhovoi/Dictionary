import { nanoid } from '@reduxjs/toolkit';
import {useState, useEffect} from 'react'
import LineButton from '../../../../components/ui-elements/buttons/LineButton';
import { PartOfSpeechSelect } from '../../../types/word';
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
        console.log('Changed select items', selectItems)
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

// <TranslationFields wordState={wordState} changeWordState={changeWordState} />} changeStep={changeStep}

export default TranslationGroup;