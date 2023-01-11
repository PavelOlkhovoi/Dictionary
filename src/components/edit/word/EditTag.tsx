import {useState, useEffect} from 'react'
import useInput from '../../../hooks/useInput'
import { Tag } from '../../../pages/types/word'
import MyButton from '../../wordsForm/ui/MyButton'
import MyInput from '../../wordsForm/ui/MyInput'
import { styleTW } from '../../../style'

interface Props {
    oldTag: Tag,
    changeTag: React.Dispatch<React.SetStateAction<Tag[]>>
    deleteTag: Function
}
const EditTag = ({oldTag, deleteTag}: Props) => {
    const tag = useInput(oldTag.name)

    return (
        <div>
            {/* <MyInput
                label='Tag'
                name='tag'
                value={tag.value}
                onChange={tag.onChange}
            />
            <MyButton
                color='red'
            >
                Delete
            </MyButton> */}
            <span className={`${styleTW.bageRed} mt-3 ml-5 cursor-pointer`}
                onClick={()=> deleteTag(oldTag.tagId)}
            >{tag.value} x</span>
        </div>
    );
}


export default EditTag;