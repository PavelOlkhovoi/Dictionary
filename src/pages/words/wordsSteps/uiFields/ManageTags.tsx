import AllTagsBar from "./AllTagsBar";
import { WordForm } from "../AddWordsWithSteps";
import { useState } from "react";
import { TagForm } from "../../../types/word";
import { styleTW } from "../../../../style";

interface Props {
    wordState: WordForm,
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>>
}

const ManageTags = () => {
    const [checked, setChecked] = useState<TagForm[]>([])
    const checkHandle = (id: string, name: string) => {
        setChecked(prev => [...prev, {id, name, show: true}])
    }

    const removeChecked = (id: string) => {
        const targetTag = checked.map(t => {
            if(t.id === id) {
                t.show = false
            }
            return t
        })
        setChecked(targetTag)
    }
    return (
        <div>
            <h1>Tags</h1>
            <AllTagsBar manageClick={checkHandle}/>
            {
                checked && checked.filter(t => t.show).map(t => 
                <div 
                key={t.id} className={`${styleTW.bageRed}`}
                onClick={()=> removeChecked(t.id)}
                >
                    {t.name} X
                </div>)
            }
        </div>
    );
}


export default ManageTags;