import {ReactNode} from 'react'

import { PartOfSpeechSelect } from "../../../types/word";

interface Props {
    value: PartOfSpeechSelect
    formId: string
    groupId: string
    handleOption: Function
    deleteBtn?: ReactNode,
}

const SelectPartOfSpeech = ({value, formId, groupId, handleOption, deleteBtn}: Props) => {
    return (
        <div>
            <label htmlFor={formId}>Pick a part of speech: </label>
            <select value={value} onChange={(e) => handleOption(groupId, e.target.value)} id={formId}>
                <option value="noun">Noun</option>
                <option value="adjective">Adjective</option>
                <option value="verb">Verb</option>
                <option value="noun">Noun</option>
                <option value="phrasal verb">Phrasal verb</option>
                <option value="adverb">Adverb</option>
                <option value="preposition">Preposition</option>
                <option value="conjunctions">Conjunctions</option>
            </select>
            {deleteBtn}
            {/* <div className={`${styleTW.bageRed}`} onClick={()=> deleteGroupHandler(g.id)}>X</div> */}
        </div>
    )
}

export default SelectPartOfSpeech;