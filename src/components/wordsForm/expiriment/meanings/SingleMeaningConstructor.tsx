import AbstarctGroup from "../AbstarctGroup";
import { ISingleWord } from "../../../../pages/types/word";
import {useState} from 'react'
import useInput from "../../../../hooks/useInput";


const SingleMeaningConstructor = () => {

    const partOfSpeech = useInput('nothing')

    // TODO: Rename this tag and check speling in other places
    const allTags: ISingleWord = {
        name: '',
        temId: new Date().getTime(),
    }

    const [meaningFields, setMeaningFields] = useState<ISingleWord[]>([allTags])

    function addMeaning(){
        setMeaningFields(prev => [ ...prev,
            {
                name: '',
                temId: new Date().getTime(),
            }
        ])
    }  

        // TODO: Write helpers functions to manipulate It
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
            const mergedObj =  {
                [partOfSpeech.value]: meaningFields
            }

            console.log('Meanig obg', mergedObj)
            return mergedObj
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
            <button onClick={saveGroup}>Save group</button>
            <br />
        </div>

    )
}


export default SingleMeaningConstructor;