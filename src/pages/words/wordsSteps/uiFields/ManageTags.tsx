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
    const [checkedTags, setCheckedTags] = useState<TagForm[]>([])
    const checkHandle = (id: string, name: string) => {
        const isTagadded = checkedTags.find(t => t.id === id)
        if(isTagadded){return false}

        setCheckedTags(prev => [...prev, {id, name, show: true}])
    }

    const removeChecked = (id: string) => {
        const targetTag = checkedTags.map(t => {
            if(t.id === id) {
                t.show = false
            }
            return t
        })
        setCheckedTags(targetTag)
    }
    return (
        <div>
            <AllTagsBar tags={tags.all} manageClick={checkHandle}/>
            {
                checkedTags && checkedTags.filter(t => t.show).map(t => 
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