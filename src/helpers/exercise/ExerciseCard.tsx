import MyButton from "../../components/wordsForm/ui/MyButton";
import { MeanigsForServer, Repetition, WordDb } from "../../pages/types/word";
import { styleTW } from "../../style";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { addPointsToWord } from "../../backend/crudFunctions/words";

interface Props {
    word: WordDb,
    changeShowOrder: Function,
    last: boolean,
    isSingle?: boolean
}
const ExerciseCard = ({word, changeShowOrder, last, isSingle = false}:Props) => {
    const readableTime = formatDistanceToNow(parseISO(word.createdAt as string))
    const [wrongAnswer, setWrongAnswer] = useState(false)
    const [stages, setStages] = useState({
        showCard: true,
        wordKnown: true,
        repeat: false,
        spelling: false,
        repeted: false
    })

    const [meaning, setMeaning] = useState('')

    const translation = word.fastMeaning ? word.fastMeaning : Object.keys(word.meaning).map(m => word.meaning[m as keyof MeanigsForServer][0])

    const cardAnimation = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    }

    const checkWord = () => {
        const isCorrect = meaning === word.word
        !isCorrect ? setWrongAnswer(last => {
            return true}) : setStages(prev => ({
            ...prev,
            showCard: false,
            repeted: true
        }))

        if(isCorrect){
            addPointsToWord(word?.wordId as string, word.points, {
            ...word.repetition as Repetition,
            firstRepetition: true
        })
            changeShowOrder(true, last)
        }
    }

    const setHidden = () => {
        setStages(prev => ({...prev, showCard: isSingle, wordKnown: isSingle}))
        changeShowOrder(false, last)
    }

    
    return (
        <div className="m-4">
        {
            stages.showCard && 
            <div className="flex gap-4">
            {
            stages.wordKnown ? 
            <motion.div 
            initial={'hidden'}
            animate={'visible'}
            variants={cardAnimation}
            className={`${styleTW.card} flex flex-col justify-items-center items-center m-auto`}
            >
                <div className="translate-x-[-8] text-xs p-1">
                    {readableTime }
                </div>
                <span className="my-6">{word.word}</span>
                <div className="flex gap-4 justify-items-stretch mt-auto">
                    <MyButton onClick={()=> setStages(prev => ({...prev, spelling: true, wordKnown: false}))}>Yes</MyButton>
                    <MyButton color="red" onClick={()=> setStages(prev => ({...prev, wordKnown: false}))}>No</MyButton>
                </div>
            </motion.div>
            : 
            <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileTap={{ scale: 0.9 }}
            className={`${styleTW.card} flex flex-col justify-items-center items-center w-full`}
            >
                <span className="my-6">{translation}</span>
                <div className="flex gap-4 justify-items-stretch mt-auto">
                    <MyButton onClick={setHidden}>Hide</MyButton>
                </div>
            </motion.div>
            }
            {
            stages.spelling && 
            <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }} 
            className={`${styleTW.card} flex flex-col justify-items-center items-center w-full`}
            >
                <span className="text-xs my-3 w-full">
                    {!wrongAnswer ? 'Type the meaning' + ' ✔' : word.word}
                </span>
                
                <textarea 
                value={meaning} 
                onChange={(e) => setMeaning(e.target.value)} 
                className={`${styleTW.shadow} my-4`} 
                />
                <div className="flex gap-4 justify-items-stretch mt-auto">
                    <MyButton color="green" onClick={checkWord}>Check</MyButton>
                </div>
            </motion.div>
            }
            </div>
        }
        </div>
    );
}

export default ExerciseCard;