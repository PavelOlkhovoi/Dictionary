import {useState} from 'react'
import Validate from "../../../../components/validations/Validate";
import MyInput from "../../../../components/wordsForm/ui/MyInput";
import { WordForm } from "../AddWordsWithSteps"
interface Props {
    wordState: WordForm,
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>>
    tagsNames: string[]
}

const CreateTagStep = ({wordState, changeWordState, tagsNames}: Props) => {
    const [validated , setValidated ] = useState({isUniqueName: false})

    const tagNameHandle = (id: string, text: string) => {
        const targetTag = wordState.tags.find(t => t.id === id)
        if(!targetTag){return false}

        targetTag.name = text
        changeWordState(wState => ({...wState}))

       setValidated(prev => ({...prev, isUniqueName: true }))
    }
    return (
        <div>
            {
                wordState.tags.filter(t => t.show).map(t => 
                <div key={t.id}>
                    <MyInput label="New tag" name="newtag" value={t.name} onChange={(e) => tagNameHandle(t.id, e.target.value)}/>
                    <Validate value={t.name} pattern={{isTextUnique: tagsNames}} show={validated.isUniqueName}/>
                </div>
                )
            }
        </div>
    )
}

export default CreateTagStep;