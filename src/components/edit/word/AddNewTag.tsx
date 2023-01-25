import useInput from "../../../hooks/useInput";
import MyButton from "../../wordsForm/ui/MyButton";
import MyInput from "../../wordsForm/ui/MyInput";
import { createTag } from "../../../backend/crudFunctions";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { Tag } from "../../../pages/types/word";
import { addTag } from "../../../store/slices/tagSlice";

interface Props {
    wordIdx: string
}

const AddNewTag = ({ wordIdx }: Props) => {
    const newTag = useInput('')
    const dispatch = useAppDispatch()
    const uid = useAppSelector(state => state.user.userFake?.uid)
    const addNewTag = async () => {
         try {
            const newTagId = await createTag(uid as string, newTag.value, wordIdx)
            const tagForRedux: Tag = {
                tagId: newTagId as string,
                name: newTag.value,
                userId: uid as string,
                word_id: [wordIdx]
            }

            dispatch(addTag(tagForRedux))

         } catch (error) {
            console.error(error)
         }
    }
    return (
        <div>
            <MyInput
                label="New Tag" 
                name="newTag"
                value={newTag.value}
                onChange={newTag.onChange} 
            />
            <MyButton onClick={addNewTag}>Save new tag</MyButton>
        </div>
    );
}


export default AddNewTag;