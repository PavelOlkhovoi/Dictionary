import { MeanigsForServer } from "../../../pages/types/word";
import EditSingleMeaning from "./EditSingleMeaning";
import {useState, useEffect} from 'react'
import MyButton from "../../wordsForm/ui/MyButton";
import { collection, DocumentData, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from "../../..";


interface Props {
    oldMeanings: MeanigsForServer
    wordId: string
}

const EditMeanings = ({oldMeanings, wordId}: Props) => {
    const [newMeanings, setNewMeanings] = useState<MeanigsForServer>(oldMeanings)

    const meaningsUpdate = async () => {
        const wordRef = doc(db, "words", wordId);
        await updateDoc(wordRef, {
            meaning: newMeanings
        });
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