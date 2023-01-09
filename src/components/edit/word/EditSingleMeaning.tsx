import { firstCapitalLetter } from "../../../helpers/display";
import { MeanigsForServer } from "../../../pages/types/word";
import MyInput from "../../wordsForm/ui/MyInput";
import {useState, useEffect} from 'react'
import EditSimpleString from "./EditSimpleString";


interface Props {
    meaningKeyName: string
    meanings: MeanigsForServer
    meaningsUpdate: React.Dispatch<React.SetStateAction<MeanigsForServer>>
}
const EditSingleMeaning = ({meanings, meaningKeyName, meaningsUpdate}: Props) => {
    const [partOfSpeech, setPartOfSpeech] = useState(meaningKeyName)

    const [newMeanings, setNewMeanings] = useState(meanings[meaningKeyName])
    const [isPartOfSpeechChange, setIsPartOfSpeechChange] = useState(false)

    const updateLocalMeanings = (idx: number, newMeaining: string) => {
        const coppyMeaningsArr = [...newMeanings]
        coppyMeaningsArr[idx] = newMeaining
        setNewMeanings(coppyMeaningsArr)
    }

    useEffect(() => {
        if(partOfSpeech === meaningKeyName){
            meaningsUpdate(prev => ({
                ...prev,
                [meaningKeyName]: newMeanings
            }))
        }else{
            meaningsUpdate(prev => {
                delete prev[meaningKeyName]
                return {
                    ...prev,
                    [partOfSpeech]: newMeanings
                }
            })
        }
    }, [newMeanings])

    return (
        <div>
            <MyInput
                name={meaningKeyName} 
                label={firstCapitalLetter(meaningKeyName)}
                value={partOfSpeech}
                onChange={(e)=>setPartOfSpeech(e.target.value)}
            />
            {
                newMeanings.map((m, idx) => {
                    return <div>
                        <EditSimpleString
                            text={m}
                            idx={idx}
                            key={m}
                            updateLocalMeanings={updateLocalMeanings}
                        />
                    </div>
                })
            }
        </div>
    );
}


export default EditSingleMeaning;