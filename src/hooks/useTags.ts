import { nanoid } from '@reduxjs/toolkit';
import {useState} from 'react'
import { TagForm } from '../pages/types/word';
import { selectAllTags } from "../store/slices/tagSlice";
import { useAppSelector } from "./redux-hooks";

const useTags = (wordIds: string | null = null) => {
    const tags = useAppSelector(state => selectAllTags(state))
    const tagsArr = wordIds ? tags.filter(t => t.word_id.includes(wordIds)) : null
    const namesArr = tags.map(t => t.name)
    const [addTag, setAddTag] = useState<TagForm>({id: nanoid(), name: '', show: true})

    return {
        all: tags,
        namesArr: namesArr,
        newTag:{addTag, setAddTag} ,
        tagsArr
    }
}


export default useTags;