import { nanoid } from '@reduxjs/toolkit';
import LineButton from '../../../../components/ui-elements/buttons/LineButton';
import { PartOfSpeechSelect } from '../../../../types/word';
import { WordForm } from "../AddWordsWithSteps";
import TranslationFields, { TranslationFieldsTest } from './TranslationFields';
import SelectPartOfSpeech from './SelectPartOfSpeech';
import DeleteBtn from './DeleteBtn';
import { DeleteBtnIds } from '../../../../types/word';

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

    const deleteGroupHandler = (id: DeleteBtnIds) => {
        const targetGroup = [...wordState.translation].find(g => g.id === id.idMain)
        if(!targetGroup){return false}
        targetGroup.show = false

        changeWordState(wState => ({...wState, translation: [...wordState.translation] }))
    }

    return (
        <div className='mt-4'>
            {
                wordState.translation.filter(g => g.show).map(g => <div key={g.id}>
                    <SelectPartOfSpeech
                    value={g.name}
                    formId={g.id}
                    groupId={g.id}
                    handleOption={handleSelect}
                    deleteBtn={<DeleteBtn deleteHandler={deleteGroupHandler} idsBtn={{idMain: g.id}}/>}
                    />
                    <TranslationFields
                    wordState={wordState} 
                    groupId={g.id}
                    changeWordState={changeWordState} 
                    />
                </div>)
            }
            
            <LineButton 
            onClick={()=> changeWordState(wState => ({
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