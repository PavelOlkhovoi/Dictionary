import GroupOfWords, { ISingleWord } from "./GroupOfWords"
import {useState, useEffect} from 'react'


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

    // TODO: Write helpers functions to manipulate It
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

    function saveTag(tag: ISingleWord, tagName: string) {
        const currentTagIdx = tags.indexOf(tag)
        const puereArr = [...tags]

        puereArr[currentTagIdx] = {
            ...tag,
            name: tagName
        }

        setAllTags(puereArr)
    }

    useEffect(()=>{
        console.log('effect Tag', tags)
    }, [tags])

    return (
        <>
            <GroupOfWords allWords={tags} deleteTag={deleteTag} saveTag={saveTag}/>

            <button onClick={addTag}>Add tag</button>

            <button>Save this group</button>
        </>
    )
}

export default TagsConstructor;