import useInput from "../../../hooks/useInput";
import MyButton from "../../wordsForm/ui/MyButton";
import MyInput from "../../wordsForm/ui/MyInput";
import { createTag } from "../../../backend/crudFunctions";
import { useAppSelector } from "../../../hooks/redux-hooks";

interface Props {
    wordIdx: string
}

const AddNewTag = ({ wordIdx }: Props) => {
    const newTag = useInput('')
    const uid = useAppSelector(state => state.user.userFake?.uid)
    const addNewTag = async () => {
         createTag(uid as string, newTag.value, wordIdx)
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