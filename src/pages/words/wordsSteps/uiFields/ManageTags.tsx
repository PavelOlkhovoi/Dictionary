import AllTagsBar from "./AllTagsBar";
import { WordForm } from "../AddWordsWithSteps";
import { styleTW } from "../../../../style";
import CreateTagStep from "./CreateTagStep";
import useTags from "../../../../hooks/useTags";
import { nanoid } from "@reduxjs/toolkit";

interface Props {
    wordState: WordForm,
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>>
}

const ManageTags = ({wordState, changeWordState}: Props) => {
    const tags = useTags()

    const addHandle = (id: string, name: string) => {
        const isUnique = wordState.tags.addedTags.find(t => t.tagId === id)
        if(!isUnique) {
            changeWordState(wState => ({...wState, tags: {
                ...wState.tags,
                addedTags: [...wState.tags.addedTags, {id: nanoid(), tagId: id, name, show: true}]
            }}))

            return false
        }

        if(!isUnique.show){
            isUnique.show = true
            changeWordState(wState => ({...wState, tags: {
                ...wState.tags,
                addedTags: [...wState.tags.addedTags]
            }}))
        }
            
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
                <span 
                key={t.id}
                className="inline-flex items-center px-2 py-1 mr-2 mb-2 text-sm font-medium text-green-800 bg-green-100 rounded"
                onClick={()=> removeChecked(t.id)}
                >
                    {t.name}
                    <button type="button" className="inline-flex items-center p-0.5 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900">
                        <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </span>
                )
            }
            <CreateTagStep tagsNames={tags.namesArr} wordState={wordState} changeWordState={changeWordState} />
        </div>
    );
}


export default ManageTags;