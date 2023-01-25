import { MeanigsForServer } from "../../../pages/types/word";
import EditSingleMeaning from "./EditSingleMeaning";
import {useState, useEffect} from 'react'
import MyButton from "../../wordsForm/ui/MyButton";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../../..";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { updateMeanings } from "../../../store/slices/wordSlice";


interface Props {
    oldMeanings: MeanigsForServer
    wordId: string
}

const EditMeanings = ({oldMeanings, wordId}: Props) => {
    const [newMeanings, setNewMeanings] = useState<MeanigsForServer>(oldMeanings)
    const dispatch = useAppDispatch()
    const meaningsUpdate = async () => {
       try {
        const wordRef = doc(db, "words", wordId);
        await updateDoc(wordRef, {
            meaning: newMeanings
        });

        dispatch(updateMeanings({id: wordId as string, meanings: newMeanings}))
       } catch (error) {
        console.error(error)
       }
    }

    useEffect(() => {
        console.log('EditMeanings', newMeanings)
    }, [newMeanings])
    return (
        <div>
           {
            Object.keys(newMeanings).map(m => {
                return <EditSingleMeaning
                    meaningKeyName={m}
                    meanings={newMeanings}
                    meaningsUpdate={setNewMeanings}
                    key={m}
                />
            })
           }
           <MyButton
            onClick={()=> setNewMeanings(prev => (
                {
                    ...prev,
                    nothing: ['']
                }
            ))}
           >
            Add new group
           </MyButton>

           <MyButton
            color="green"
            onClick={()=> meaningsUpdate()}
           >
            Save Changes
           </MyButton>
        </div>
    );
}

export default EditMeanings;