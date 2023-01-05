import { Meaning } from "../../../pages/types/word";
import {useState} from 'react'
import AbstarctGroup from "../AbstarctGroup";
import MyButton from "../ui/MyButton";

interface Props {
    attachToForm: Function
}

const MeaningsConstructor = ({attachToForm}: Props) => {
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

        attachToForm(deletedArr)
    }

    function saveMeaningGroup(singleGroup: Meaning) {
        const targetIndex = meaningsFields.filter(m => m.tempId === singleGroup.tempId)
        const idx = meaningsFields.indexOf(targetIndex[0])
        const pureArr = [...meaningsFields]
        pureArr[idx] = singleGroup

        setMeaningsFields(pureArr)

        attachToForm(pureArr)

    }



    return (
        <div>
            <AbstarctGroup 
                fieldsObject={meaningsFields}
                typeOfField={'meanings'}
                deleteField={deleteMeaningGroup}
                saveField={saveMeaningGroup}
            />

            <MyButton onClick={addMeaning} color={'blue'}>Add new group meanings</MyButton>
        </div>
    );
}


export default MeaningsConstructor;