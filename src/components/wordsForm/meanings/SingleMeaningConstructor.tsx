import AbstarctGroup from "../AbstarctGroup";
import { GruopedMeaning, ISingleWord, Meaning } from "../../../pages/types/word";
import {useState, useEffect} from 'react'
import useInput from "../../../hooks/useInput";

interface Props {
    deleteGroup: Function;
    singleGroup: Meaning;
    saveGroupedMeaning: Function;
    groupId: number,
}

const SingleMeaningConstructor = ({deleteGroup, saveGroupedMeaning, singleGroup, groupId}: Props) => {

    const partOfSpeech = useInput('nothing')

    const allMeanings: ISingleWord = {
        name: '',
        temId: new Date().getTime(),
    }

    const [meaningFields, setMeaningFields] = useState<ISingleWord[]>([allMeanings])

    function addMeaning(){
        setMeaningFields(prev => [ ...prev,
            {
                name: '',
                temId: new Date().getTime(),
            }
        ])
    }  

        function deleteMeaning(meaning: ISingleWord){
            const currentTagIdx = meaningFields.indexOf(meaning)
            const pureArr = [...meaningFields]
            pureArr.splice(currentTagIdx, 1)
    
            setMeaningFields(pureArr)
        }

        function saveMeaning(meaning: ISingleWord, newName: string) {
            const currentTagIdx = meaningFields.indexOf(meaning)
            const puereArr = [...meaningFields]
            puereArr[currentTagIdx] = {
                ...meaning,
                name: newName
            }
    
            setMeaningFields(puereArr)
        }

        function saveGroup(){
            const addedSingleGroup: Meaning = {
                tempId: singleGroup.tempId,
                [partOfSpeech.value]: meaningFields.map(m => m.name)
            }

            saveGroupedMeaning(addedSingleGroup)
        }


    return (
        <div>
            <br />
            <br />
            <input value={partOfSpeech.value} onChange={partOfSpeech.onChange}/>
            <AbstarctGroup
                fieldsObject={meaningFields}
                typeOfField="single"
                saveField={saveMeaning}
                deleteField={deleteMeaning}
                place={'meaning'}
            />

            <button onClick={addMeaning}>Add field</button>
            <button onClick={() => deleteGroup(singleGroup)}>Delete Gruop</button>
            <button onClick={saveGroup}>Save group</button>
            <br />
        </div>

    )
}


export default SingleMeaningConstructor;