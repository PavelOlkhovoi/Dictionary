import Tag from "./Tag";
import {useState, useEffect, FC} from 'react'

type JsxOrString = JSX.Element | string

interface Props {
    attachTags: Function
}

const TagsCreator: FC<Props> = ({attachTags}) => {
    const [nextComponentId, setNextComponentId] = useState<number>(0)
    const [allTags, setAllTags] = useState<string[]>([])

    const tagComponent = <Tag addNewTagToArr={setAllTags} deleteTag={deleteTag} componentId={nextComponentId}/>

    // TODO: Try to doit without state
    const [tagComponents, setTagsComponent] = useState<JsxOrString[] >([])

    function deleteTag(idTagComponente: number){
        // console.log('Delete Tag', idTagComponente)
        setTagsComponent(tags => {
            const newArray= [...tags]
            newArray[idTagComponente] = ''
            return newArray
        })


    }

    function addTagComponent(){
        setNextComponentId(current => current + 1)
        console.log(nextComponentId)
        setTagsComponent(p => [...p, tagComponent])
    }

    useEffect(()=> {
        console.log('All tags', allTags)
    }, [allTags])

    useEffect(()=> {
        addTagComponent()
    }, [])

    return (
        <div>
            {
                tagComponents.map((t, idx) => <div key={idx}>{t}</div>)
            }
            <button onClick={addTagComponent}>Add tag</button>
            <button onClick={() => attachTags(allTags)}>Save tags</button>
        </div>
    );
}

export default TagsCreator;