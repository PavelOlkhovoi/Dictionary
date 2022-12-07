import Tag from "./Tag";
import {useState} from 'react'


const TagsCreator = () => {
    const [nextComponentId, setNextComponentId] = useState<number>(0)
    const [allTags, setAllTags] = useState<string[]>([])

    const tagComponent = <Tag saveNewTag={setAllTags} deleteTag={deleteTag} componentId={nextComponentId}/>
    const [tagComponents, setTagsComponent] = useState([tagComponent])

    function deleteTag(idTadComponente: number){
        console.log('Delete Tag')

        setTagsComponent(tags => {
            const neaArray= [...tags]
            neaArray.splice(idTadComponente, 1)
            return neaArray
        })
    }

    function addTag(){
        setTagsComponent(p => [...p, tagComponent])
        setNextComponentId(current => current + 1)
    }

    return (
        <div>
            {
                tagComponents.map((t, idx) => <div key={idx}>{t}</div>)
            }
            <button onClick={addTag}>Add tag</button>
        </div>
    );
}

export default TagsCreator;