import useTags from "../../../hooks/useTags";
import ShowAddeTag from "../ui/tags/ShowAddeTag";
import {useEffect} from 'react'


interface Props {
    wordId: string
}
const TagsOfWord = ({wordId}: Props) => {
    const tag = useTags(wordId)
    //1. All tags
    //2 current tags
    //3. state for new tag
    //4. delete tag
    //5. update tag
    //6. create Tag 

    useEffect(()=> {
        console.log(tag)
    }, [])
    return (
        <div>
            {
                tag.tagsArr?.map(t => <ShowAddeTag
                    key={t.tagId} 
                    tagName={t.name}
                    clickFunc={console.log}
                    tagId={t.tagId} 
                    />)
            }
        </div>
    )
}

export default TagsOfWord;