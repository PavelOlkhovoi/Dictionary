import { firstCapitalLetter } from "../../../helpers/display";
import { MeanigsForServer } from "../../../pages/types/word";
import MyInput from "../../wordsForm/ui/MyInput";
import {useState, useEffect} from 'react'
import EditSimpleString from "./EditSimpleString";
import MyButton from "../../wordsForm/ui/MyButton";


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
    const deleteLocalMeanings = (targetMeaining: string) => {
        setNewMeanings(newMeanings.filter(el => el !== targetMeaining))
    }

    useEffect(() => {
        if(partOfSpeech === meaningKeyName){
            meaningsUpdate(prev => ({
                ...prev,
                [meaningKeyName]: newMeanings.filter(el => el !== '')
            }))
        }else{
            meaningsUpdate(prev => {
                delete prev[meaningKeyName]
                return {
                    ...prev,
                    [partOfSpeech]: newMeanings.filter(el => el !== '')
                }
            })
        }
    }, [newMeanings, isPartOfSpeechChange])

    return (
        <div>
            <div>
                <MyInput
                    name={meaningKeyName} 
                    label={firstCapitalLetter(meaningKeyName)}
                    value={partOfSpeech}
                    onChange={(e)=>setPartOfSpeech(e.target.value)}
                />
                <MyButton 
                    color="green"
                    onClick={()=> setIsPartOfSpeechChange(!isPartOfSpeechChange)}
                >
                    Save
                </MyButton>
            </div>
            {
                newMeanings.map((m, idx) => {
                    return <div key={m}>
                        <EditSimpleString
                            text={m}
                            idx={idx}
                            updateLocalMeanings={updateLocalMeanings}
                            deleteLocalMeaning={deleteLocalMeanings}
                        />
                    </div>
                })
            }
            <MyButton 
                onClick={()=> setNewMeanings(prev => [...prev, ''])}
            >
                    Add meaning
            </MyButton>

            <MyButton
            color="red"
                onClick={()=>  meaningsUpdate(prev => {
                    delete prev[meaningKeyName]
                    return {
                        ...prev,
                    }
                })}
            >
                    Delete Group
            </MyButton>
        </div>
    );
}


export default EditSingleMeaning;