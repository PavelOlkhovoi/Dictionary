import { nanoid } from '@reduxjs/toolkit';
import {useState} from 'react'
import LineButton from '../../../../components/ui-elements/buttons/LineButton';
import Validate from "../../../../components/validations/Validate";
import MyInput from "../../../../components/wordsForm/ui/MyInput";
import { DeleteBtnIds } from '../../../../types/word';
import { WordForm } from "../AddWordsWithSteps"
import DeleteBtn from './DeleteBtn';
interface Props {
    wordState: WordForm,
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>>
    tagsNames: string[]
}

const CreateTagStep = ({wordState, changeWordState, tagsNames}: Props) => {
    const [validated , setValidated] = useState({
        isFormReady: true,
        isUniqueName: false
    })

    const tagNameHandle = (id: string, text: string) => {
        const targetTag = wordState.tags.newTags.find(t => t.id === id)
        if(!targetTag){return false}

        targetTag.name = text
        changeWordState(wState => ({...wState}))

        setValidated(prev => ({...prev, isUniqueName: true }))
    }

    const deleteNewTag = (id: DeleteBtnIds) => {
        const targetTag = wordState.tags.newTags.map(t => {
            if(t.id === id.idMain){t.show = false}
            return t
        })
            
        changeWordState(wState => ({...wState, tags: {...wState.tags, newTags: targetTag}}))
    }

    const addTag = () => {
        changeWordState(wState => ({...wState, tags: {...wState.tags, newTags: [...wState.tags.newTags, {
            id: nanoid(),
            name: '',
            show: true
        }]}}))
    }
    return (
        <div>
            {
                wordState.tags.newTags.filter(t => t.show).map(t => 
                <div 
                key={t.id}
                className="my-5"
                >
                    <MyInput label="New tag" name="newtag" value={t.name} onChange={(e) => tagNameHandle(t.id, e.target.value)}/>
                    <div className='mt-1'>
                        <DeleteBtn idsBtn={{idMain: t.id}} deleteHandler={deleteNewTag}/> <span>delete tag</span>
                    </div>
                </div>
                )
            }
            <LineButton onClick={addTag}>Add tag</LineButton>
        </div>
    )
}

export default CreateTagStep;