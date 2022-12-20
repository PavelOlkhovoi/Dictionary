import {useState, useEffect} from 'react'
import { ISingleWord } from "../../pages/types/word"
import AbstarctGroup from "./AbstarctGroup"

interface Props {
    attachTag: Function
}

const TagsConstructor = ({attachTag}: Props) => {
    
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

        // attachTag(pureArr)
    }  

    function saveTag(tag: ISingleWord, tagName: string) {
        const currentTagIdx = tags.indexOf(tag)
        const pureArr = [...tags]

        pureArr[currentTagIdx] = {
            ...tag,
            name: tagName
        }

        setAllTags(pureArr)

        attachTag(pureArr)
    }

    function finalData(){
        const tagsArr: string[] = []

        tags.forEach(tag => {
            tagsArr.push(tag.name)
        })

        console.log('Final object', tagsArr)
    }

    // useEffect(()=>{
    //     console.log('effect Tag', tags)
    // }, [tags])

    return (
        <>
            <AbstarctGroup 
                fieldsObject={tags}
                typeOfField={'single'}
                deleteField={deleteTag}
                saveField={saveTag}
                place={'tag'}
            />

            <button onClick={addTag}>Add tag</button>

            <button onClick={() => finalData()}>Save this group</button>
        </>
    )
}

export default TagsConstructor;