import { db } from '../../..';
import { doc, updateDoc, arrayRemove} from "firebase/firestore"; 
import {useState} from 'react';
import { Tag } from '../../../pages/types/word';
import EditTag from './EditTag';


interface Props {
    oldTags: Tag[]
    wordId: string
}
const EditAllTags = ({oldTags, wordId}: Props) => {
    const [newTags, setNewTags] = useState(oldTags)

    const deleteTag = async (tagId: string) => {
        console.log('Try to delete tag')
        const tagRef = doc(db, "tags", tagId);
        await updateDoc(tagRef, {
        word_id: arrayRemove(wordId)
    })


    }
    return (
        <div className='flex items-center'>
            {
                oldTags.map(t => <EditTag oldTag={t} key={t.tagId} deleteTag={deleteTag}/>)
            }
        </div>
    )
}

export default EditAllTags;