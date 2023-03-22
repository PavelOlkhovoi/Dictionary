import AllTagsBar from "./AllTagsBar";
import { WordForm } from "../AddWordsWithSteps";
import { useState } from "react";
import { TagForm } from "../../../types/word";
import { styleTW } from "../../../../style";
import CreateTagStep from "./CreateTagStep";
import useTags from "../../../../hooks/useTags";

interface Props {
    wordState: WordForm,
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>>
}

const ManageTags = ({wordState, changeWordState}: Props) => {
    const tags = useTags()

    const addHandle = (id: string, name: string) => {
        changeWordState(wState => ({...wState, tags: {
            ...wState.tags,
            addedTags: [...wState.tags.addedTags, {id, tagId: id, name, show: true}]
        }}))
    }

    const removeChecked = (id: string) => {
        const targetTag = wordState.tags.addedTags.map(t => {
            if(t.id === id) {
                t.show = false
            }
            return t
        })
        changeWordState(wState => ({...wState, tags: {
            ...wState.tags,
            addedTags: targetTag
        }}))
    }
    return (
        <div>
            <AllTagsBar tags={tags.all} manageClick={addHandle}/>
            {
                wordState.tags.addedTags.length > 0 && wordState.tags.addedTags.filter(t => t.show).map(t => 
                <div 
                key={t.id} className={`${styleTW.bageRed} cursor-pointer`}
                onClick={()=> removeChecked(t.id)}
                >
                    {t.name} X
                </div>
                )
            }
            <CreateTagStep tagsNames={tags.namesArr} wordState={wordState} changeWordState={changeWordState} />
        </div>
    );
}


export default ManageTags;