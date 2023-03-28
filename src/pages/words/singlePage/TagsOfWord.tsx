import useTags from "../../../hooks/useTags";
import ShowAddeTag from "../ui/tags/ShowAddeTag";
import {useEffect} from 'react'
import ShowSimpleTag from "../ui/tags/ShowSimpleTag";
import { useState } from "react";
import MyInput from "../../../components/wordsForm/ui/MyInput";
import LineButton from "../../../components/ui-elements/buttons/LineButton";


interface Props {
    wordId: string
}
const TagsOfWord = ({wordId}: Props) => {
    const tag = useTags(wordId)
    const [show, setShow] = useState({newTag: false, addTag: false})
    //3. state for new tag
    //4. delete tag
    //6. create Tag 

    useEffect(()=> {
        console.log(tag)
    }, [])
    return (
        <div className="">
            <div className="flex gap-4 my-4">
            {
                tag.tagsArr?.map(t => <ShowAddeTag
                    key={t.tagId} 
                    tagName={t.name}
                    clickFunc={console.log}
                    tagId={t.tagId} 
                    />)
            }
            </div>
           <div className="flex flex-wrap gap-2 gap-4 my-4">
           {
                tag.all.map(t => <ShowSimpleTag tag={t} />)
            }
           </div>
           <div>
            <MyInput 
            value={tag.newTag.addTag.name}
            name="tag"
            label="tag"
            onChange={(e) => tag.newTag.setAddTag(prev => ({
                ...prev,
                name: e.target.value
            }))}  />

            <LineButton>Add new tag</LineButton>
           </div>
        </div>
    )
}

export default TagsOfWord;