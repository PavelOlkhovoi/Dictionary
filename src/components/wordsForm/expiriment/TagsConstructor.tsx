import GroupOfWords from "./GroupOfWords"
import {useState, useEffect} from 'react'
import { ISingleWord } from "../../../pages/types/word"
import AbstarctGroup from "./AbstarctGroup"


const TagsConstructor = () => {
    const allTags: ISingleWord = {
        name: '',
        temId: new Date().getTime(),
    }

    const [tags, setAllTags] = useState<ISingleWord[]>([allTags])

    function addTag(){
        setAllTags(prev => [ ...prev,
            {
                name: '',
                temId: new Date().getTime(),
            }
        ])
    }  

    // TODO: Write helpers functions to manipulate It
    function deleteTag(tag: ISingleWord){
        const currentTagIdx = tags.indexOf(tag)
        const pureArr = [...tags]
        pureArr.splice(currentTagIdx, 1)

        setAllTags(pureArr)
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

    function finalData(){
        const tagsArr: string[] = []

        tags.forEach(tag => {
            tagsArr.push(tag.name)
        })

        console.log('Final object', tagsArr)
    }

    useEffect(()=>{
        console.log('effect Tag', tags)
    }, [tags])

    return (
        <>
            <AbstarctGroup 
                fieldsObject={tags}
                typeOfField={'single'}
                deleteField={deleteTag}
                saveField={saveTag}
            />

            <button onClick={addTag}>Add tag</button>

            <button onClick={() => finalData()}>Save this group</button>
        </>
    )
}

export default TagsConstructor;