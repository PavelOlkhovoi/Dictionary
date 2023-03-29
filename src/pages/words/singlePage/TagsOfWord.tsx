import useTags from "../../../hooks/useTags";
import ShowAddeTag from "../ui/tags/ShowAddeTag";
import {useEffect} from 'react'
import ShowSimpleTag from "../ui/tags/ShowSimpleTag";
import { useState } from "react";
import MyInput from "../../../components/wordsForm/ui/MyInput";
import LineButton from "../../../components/ui-elements/buttons/LineButton";
import ShowError from "../../../components/validations/ShowError";
import useValidation from "../../../hooks/useValidation";
import { addWordIdxToTag, deleteWordIdFromTagDb } from "../../../backend/crudFunctions";


interface Props {
    wordId: string
    addTag: boolean
    createTag: boolean
}
const TagsOfWord = ({wordId, addTag, createTag}: Props) => {
    const tag = useTags(wordId)
    const [startValidation, setStartValidation] = useState(false)
    const patterns = {minLength: 3, isTextUnique: tag.namesArr }
    const tagValidation = useValidation(tag.newTag.addTag.name, patterns)
    
    //6. create Tag - sendToDB

    const startValidate = () => setStartValidation(prev => true)

    const deleteTagFromWord = (tagId: string) => {
        deleteWordIdFromTagDb(tagId, wordId)
    }

    const addWordIdToTag = (tagId: string) => {
        addWordIdxToTag(tagId, wordId)
    }

    useEffect(()=> {
        console.log(tagValidation)
    }, [tagValidation])
    return (
        <div className="pb-14">
            <div className="flex gap-4 my-4">
            {
                tag.tagsArr?.map(t => <ShowAddeTag
                    key={t.tagId} 
                    tagName={t.name}
                    clickFunc={deleteTagFromWord}
                    tagId={t.tagId} 
                    />)
            }
            </div>
            {
                addTag && <div className="flex flex-wrap gap-2 gap-4 my-4">
                {
                    tag.all.map(t => <ShowSimpleTag tag={t} key={t.tagId} clickFunc={addWordIdToTag}/>)
                }
                </div>
            }

            {
                createTag &&  <div className="">
                    <MyInput 
                    value={tag.newTag.addTag.name}
                    name="tag"
                    label="tag"
                    onChange={(e) => tag.newTag.setAddTag(prev => ({
                        ...prev,
                        name: e.target.value
                    }))}  
                    onBlur={startValidate}
                    />

                    <ShowError show={startValidation} hookName={tagValidation} />

                    <LineButton detach={!tagValidation.correctField}>
                        Add new tag
                    </LineButton>
                </div>
            }
        </div>
    )
}

export default TagsOfWord;