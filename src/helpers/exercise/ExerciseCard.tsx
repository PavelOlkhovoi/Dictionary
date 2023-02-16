import MyButton from "../../components/wordsForm/ui/MyButton";
import { WordDb } from "../../pages/types/word";
import { styleTW } from "../../style";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useState } from "react";
import MyInput from "../../components/wordsForm/ui/MyInput";
import useInput from "../../hooks/useInput";

interface Props {
    word: WordDb
}
const ExerciseCard = ({word}:Props) => {
    const readableTime = formatDistanceToNow(parseISO(word.createdAt as string))
    const [stages, setStages] = useState({
        wordKnown: true,
        spelling: false
    })

    const meaning = useInput('')
    return (
        <div className="flex gap-4">
            {
                stages.wordKnown ? 
                <div className={`${styleTW.card} flex flex-col justify-items-center items-center relative`}>
                <div className="absolute top-0 right-1 text-xs p-1">
                    {readableTime }
                </div>
                <span className="my-6">{word.word}</span>
                <div className="flex gap-4 justify-items-stretch mt-auto">
                    <MyButton>Yes</MyButton>
                    <MyButton color="red" onClick={()=> setStages(prev => ({...prev, wordKnown: false}))}>No</MyButton>
                </div>
            </div>
            : 
            <div className={`${styleTW.card} flex flex-col justify-items-center items-center`}>
                <span className="my-6">{word.fastMeaning ? word.fastMeaning : 'Get meanings'}</span>
                <div className="flex gap-4 justify-items-stretch mt-auto">
                    <MyButton onClick={()=> setStages(prev => ({...prev, spelling: true}))}>Try to spell</MyButton>
                </div>
            </div>
            }
            {
                stages.spelling && 
                <div className={`${styleTW.card} flex flex-col justify-items-center items-center`}>
                <input value={meaning.value} onChange={(e) => meaning.onChange(e)} className="my-6" />
                <div className="flex gap-4 justify-items-stretch mt-auto">
                    <MyButton>Check</MyButton>
                </div>
            </div>
            }
           
        </div>
    );
}

export default ExerciseCard;