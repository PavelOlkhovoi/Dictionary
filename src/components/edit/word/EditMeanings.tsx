import { MeanigsForServer } from "../../../pages/types/word";
import EditSingleMeaning from "./EditSingleMeaning";
import {useState, useEffect} from 'react'


interface Props {
    oldMeanings: MeanigsForServer
}

const EditMeanings = ({oldMeanings}: Props) => {
    const meaningsName = Object.keys(oldMeanings)
    const [newMeanings, setNewMeanings] = useState<MeanigsForServer>(oldMeanings)

    const meaningsUpdate = (updatedMeanings: MeanigsForServer) => {
        console.log(updatedMeanings)
    }

    useEffect(() => {
        console.log('EditMeanings', newMeanings)
    }, [newMeanings])
    return (
        <div>
           {
            meaningsName.map(m => {
                return <EditSingleMeaning
                    meaningKeyName={m}
                    meanings={newMeanings}
                    meaningsUpdate={setNewMeanings}
                    key={m}
                />
            })
           }
        </div>
    );
}

export default EditMeanings;