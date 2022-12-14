import { GruopedMeaning, Meaning } from "../../../../pages/types/word";
import {useState, useEffect} from 'react'
import AbstarctGroup from "../AbstarctGroup";

interface Props {
    idx: number;
}

const MeaningsConstructor = ({idx}: Props) => {
    const singleMeaning: Meaning  = {
        tempId: new Date().getTime(),
    }

    // const [teastMeanIdx, setTeastMeanIdx] = useState<Meaning[]>([{
    //     tempId: new Date().getTime()
    // }])



    const [meaningsFields, setMeaningsFields] = useState<Meaning[]>([singleMeaning])



    function addMeaning(){
        setMeaningsFields(prev => [ ...prev,
            {
                tempId: new Date().getTime(),
            }
        ])

    }

    function deleteMeaningGroup(meaning: Meaning){
        const deletedArr = meaningsFields.filter(m => m.tempId !== meaning.tempId)

        console.log('Delete Group', deletedArr)

        // const currentTagIdx = meaningsFields.indexOf(meaning)
        // const pureArr = [...meaningsFields]
        // pureArr.splice(currentTagIdx, 1)

        setMeaningsFields(deletedArr)
    }

    function saveMeaningGroup(singleGroup: Meaning) {
        // const idx = meaningsFields.indexOf(singleGroup)
        const targetIndex = meaningsFields.filter(m => m.tempId === singleGroup.tempId)
        const idx = meaningsFields.indexOf(targetIndex[0])
        console.log('Meanings Group', idx)
        const pureArr = [...meaningsFields]
        pureArr[idx] = singleGroup

        setMeaningsFields(pureArr)

    }

    useEffect(() => {
        console.log("MeanigsFields", meaningsFields)
    }, [meaningsFields])


    return (
        <div>
            <br />
            <br />
            <br />
            <AbstarctGroup 
                fieldsObject={meaningsFields}
                typeOfField={'meanings'}
                deleteField={deleteMeaningGroup}
                saveField={saveMeaningGroup}
                groupId={idx}
            />

            <button onClick={addMeaning}>Add new Meaning</button>
        </div>
    );
}


export default MeaningsConstructor;