import { db } from '../../..';
import { doc, updateDoc, arrayRemove} from "firebase/firestore"; 
import {useState} from 'react';
import { Tag } from '../../../pages/types/word';
import EditTag from './EditTag';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { deleteWordFromTag } from '../../../store/slices/tagSlice';


interface Props {
    wordId: string
}
const EditAllTags = ({wordId}: Props) => {
    const dispatch = useAppDispatch()
    const tags = useAppSelector(state => state.tag.tags.filter(tag => tag.word_id.includes(wordId)))
    // const [newTags, setNewTags] = useState(oldTags)

    const deleteTag = async (tagId: string) => {
        const tagRef = doc(db, "tags", tagId);
        await updateDoc(tagRef, {
        word_id: arrayRemove(wordId)
    })

    dispatch(deleteWordFromTag({tagId, wordId}))
    }
    return (
        <div className='flex items-center'>
            {
                tags.map(t => <EditTag oldTag={t} key={t.tagId} deleteTag={deleteTag}/>)
            }
        </div>
    )
}

export default EditAllTags;