import GroupOfWords, { ISingleWord } from "./GroupOfWords"
import {useState} from 'react'


const TagsConstructor = () => {
    const allTags: ISingleWord = {
        name: '',
        temId: new Date().getTime(),
        lastName: '',
        isDispaly: true
    }

    const [tags, setAllTags] = useState<ISingleWord[]>([allTags])

    function addTag(){
        setAllTags(prev => [ ...prev,
            {
                name: '',
                temId: new Date().getTime(),
                lastName: '',
                isDispaly: true
            }
        ])
    }  
    function deleteTag(tag: ISingleWord){
        const currentTagIdx = tags.indexOf(tag)
        const puereArr = [...tags]
        puereArr[currentTagIdx] = {
            ...tag,
            isDispaly: false
        }
        console.log("deleteTag", puereArr[currentTagIdx])
        setAllTags(puereArr)
    }  
    return (
        <>
            <GroupOfWords allWords={tags} deleteTag={deleteTag}/>

            <button onClick={addTag}>Add tag</button>

            <button>Save this group</button>
        </>
    )
}

export default TagsConstructor;