import {useState, FC} from 'react'
import useInput from '../../../hooks/useInput';

interface Props {
    saveNewTag: Function,
    deleteTag: Function,
    componentId: number
}

const Tag: FC<Props> = ({saveNewTag, deleteTag, componentId}) => {
    const tag = useInput('')
    function handleDeleteTag(){
        deleteTag(componentId)
        
        tag.setInput('')
    }

    return (
        <div>
            <input value={tag.value} onChange={tag.onChange} placeholder="tag"/>
            <button onClick={()=> saveNewTag(tag.value)}>Save</button>
            <button onClick={handleDeleteTag}>Delete</button>
        </div>
    )
}

export default Tag;