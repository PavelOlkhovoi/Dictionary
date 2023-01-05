import AbstarctGroup from "../AbstarctGroup";
import { ISingleWord, Meaning } from "../../../pages/types/word";
import { useState } from 'react'
import useInput from "../../../hooks/useInput";
import MyInput from "../ui/MyInput";
import MyButton from "../ui/MyButton";

interface Props {
    deleteGroup: Function;
    singleGroup: Meaning;
    saveGroupedMeaning: Function;
    // TODO: Delete IT
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
                tempId: singleGroup.tempId as number,
                [partOfSpeech.value]: meaningFields.map(m => m.name)
            }

            saveGroupedMeaning(addedSingleGroup)
        }


    return (
        <div className="[&>div]:my-5">
            <MyInput 
            value={partOfSpeech.value} 
            onChange={partOfSpeech.onChange}
            name={'part of speach'}
            label={'part'}
            />
            <AbstarctGroup
                fieldsObject={meaningFields}
                typeOfField="single"
                saveField={saveMeaning}
                deleteField={deleteMeaning}
                place={'meaning'}
                name={'meaning'}
                label={'meaning'}
            />
            <div className="grid grid-cols-3 gap-4">   
                <MyButton onClick={addMeaning}>Add field</MyButton>
                <MyButton onClick={() => deleteGroup(singleGroup)} color="red">Delete Gruop</MyButton>
                <MyButton onClick={saveGroup} color="green">Save group</MyButton>
            </div>
        </div>

    )
}


export default SingleMeaningConstructor;