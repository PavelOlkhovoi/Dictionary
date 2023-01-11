import useInput from "../../../hooks/useInput";
import MyButton from "../../wordsForm/ui/MyButton";
import MyInput from "../../wordsForm/ui/MyInput";
import { createTag } from "../../../backend/crudFunctions";
import { db, auth } from "../../..";
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
    wordIdx: string
}

const AddNewTag = ({wordIdx}: Props) => {
    const newTag = useInput('')
    const [user, loading, error] = useAuthState(auth);
    const addNewTag = async () => {
         createTag(user?.uid ? user.uid : '12345', newTag.value, wordIdx)
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