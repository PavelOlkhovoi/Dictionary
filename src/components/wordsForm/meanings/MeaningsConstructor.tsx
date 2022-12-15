import { Meaning } from "../../../pages/types/word";
import {useState, useEffect} from 'react'
import AbstarctGroup from "../AbstarctGroup";


const MeaningsConstructor = () => {
    const singleMeaning: Meaning  = {
        tempId: new Date().getTime(),
    }

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
        setMeaningsFields(deletedArr)
    }

    function saveMeaningGroup(singleGroup: Meaning) {
        const targetIndex = meaningsFields.filter(m => m.tempId === singleGroup.tempId)
        const idx = meaningsFields.indexOf(targetIndex[0])
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
            <AbstarctGroup 
                fieldsObject={meaningsFields}
                typeOfField={'meanings'}
                deleteField={deleteMeaningGroup}
                saveField={saveMeaningGroup}
            />

            <button onClick={addMeaning}>Add new group meanings</button>
        </div>
    );
}


export default MeaningsConstructor;