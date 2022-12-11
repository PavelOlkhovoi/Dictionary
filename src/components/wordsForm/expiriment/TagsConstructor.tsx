import GroupOfWords, { ISingleWord } from "./GroupOfWords"
import {useState, useEffect} from 'react'


const TagsConstructor = () => {
    const allTags: ISingleWord = {
        name: '',
        temId: new Date().getTime(),
        isDispaly: true
    }

    const [tags, setAllTags] = useState<ISingleWord[]>([allTags])

    function addTag(){
        setAllTags(prev => [ ...prev,
            {
                name: '',
                temId: new Date().getTime(),
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

    function finalData(){
        const tagsArr: string[] = []

        tags.forEach(tag => {
            if(tag.isDispaly && tag.name.length !== 0){
                tagsArr.push(tag.name)
            }
        })

        console.log('Final object', tagsArr)
    }

    useEffect(()=>{
        console.log('effect Tag', tags)
    }, [tags])

    return (
        <>
            <GroupOfWords 
            allWords={tags} 
            deleteTag={deleteTag} 
            saveTag={saveTag}
            title={'All Tags'}
            />

            <button onClick={addTag}>Add tag</button>

            <button onClick={() => finalData()}>Save this group</button>
        </>
    )
}

export default TagsConstructor;