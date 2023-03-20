import { nanoid } from '@reduxjs/toolkit';
import LineButton from '../../../../components/ui-elements/buttons/LineButton';
import { PartOfSpeechSelect } from '../../../types/word';
import { WordForm } from "../AddWordsWithSteps";
import TranslationFields, { TranslationFieldsTest } from './TranslationFields';
import { styleTW } from '../../../../style';

export interface TranslationGroup {
    id: string,
    name: PartOfSpeechSelect,
    translation: TranslationFieldsTest[],
    show: boolean
}

interface Props {
    wordState: WordForm
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>> 
}
const TranslationGroup = ({changeWordState, wordState}: Props) => {
    
    const handleSelect = (id: string, value: string) => {
        const targetGroup = [...wordState.translation].find(g => g.id === id)
        if(!targetGroup){return false}
        targetGroup.name = value as PartOfSpeechSelect

        changeWordState(wState => ({...wState, translation: [...wordState.translation] }))
    }

    const deleteGroupHandler = (id: string) => {
        const targetGroup = [...wordState.translation].find(g => g.id === id)
        if(!targetGroup){return false}
        targetGroup.show = false

        changeWordState(wState => ({...wState, translation: [...wordState.translation] }))
    }

    return (
        <div>
            {
                wordState.translation.filter(g => g.show).map(g => <div key={g.id}>
                <div>
                    <label htmlFor={g.id}>Pick a part of speech: </label>
                    <select value={g.name} onChange={(e) => handleSelect(g.id, e.target.value)} id={g.id}>
                        <option value="noun">Noun</option>
                        <option value="adjective">Adjective</option>
                        <option value="verb">Verb</option>
                        <option value="noun">Noun</option>
                        <option value="phrasal verb">Phrasal verb</option>
                        <option value="adverb">Adverb</option>
                        <option value="preposition">Preposition</option>
                        <option value="conjunctions">Conjunctions</option>
                    </select>

                    <div className={`${styleTW.bageRed}`} onClick={()=> deleteGroupHandler(g.id)}>X</div>
                </div>
                <TranslationFields
                        wordState={wordState} 
                        groupId={g.id}
                        changeWordState={changeWordState} />
                </div>)
            }
            <LineButton onClick={()=> changeWordState(wState => ({
                ...wState, translation: [...wState.translation, { id: nanoid(), name: 'none', translation: [{
                    id: nanoid(),
                    name: '',
                    show: true
                }], 
                show: true}
            ]
            }))}
            >
                New groupe
            </LineButton>
        </div>
    )
}

export default TranslationGroup;