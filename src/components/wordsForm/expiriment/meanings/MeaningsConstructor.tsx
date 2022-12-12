import { Meaning } from "../../../../pages/types/word";
import {useState} from 'react'
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

    function deleteMeaning(meaning: Meaning){
        const currentTagIdx = meaningsFields.indexOf(meaning)
        const pureArr = [...meaningsFields]
        pureArr.splice(currentTagIdx, 1)

        setMeaningsFields(pureArr)
    }

    function saveMeaning(meaning: Meaning, newName: string) {
        const currentTagIdx = meaningsFields.indexOf(meaning)
        const puereArr = [...meaningsFields]

        // puereArr[currentTagIdx] = {
        //     ...meaning,
        //     name: newName
        // }

        setMeaningsFields(puereArr)
    }


    return (
        <div>
            <br />
            <br />
            <br />
            <AbstarctGroup 
                fieldsObject={meaningsFields}
                typeOfField={'meanings'}
                deleteField={deleteMeaning}
            />

            <button onClick={addMeaning}>Add new Meaning</button>
        </div>
    );
}


export default MeaningsConstructor;