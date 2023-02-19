import { useEffect, useState } from "react";
import ExerciseCard from "../../helpers/exercise/ExerciseCard";
import { useAppSelector } from "../../hooks/redux-hooks";
import { selectSortedByTimeWords, selectWordsForFirstExercise } from "../../store/slices/wordSlice";
import { styleTW } from "../../style";
import { WordDb } from "../types/word";
import { nanoid } from "@reduxjs/toolkit";


interface Exersice {
    id: string
    display: Boolean,
    word: WordDb
}

const SetWordsToLern = () => {
    const wordsStatus = useAppSelector(state => state.word.status)
    const sortedWords = useAppSelector(state => selectSortedByTimeWords(state))
    
    const [wordForPractice, setWordForPractice] = useState<Exersice[]>([])
    const [wordStage, setWordStage] = useState<number>(0)
    
    const changeShowOrder = () => {
        const testQuantity = sortedWords?.filter(w => !w.repetition?.firstRepetition)

        if(testQuantity?.length === wordStage + 1){
            console.log('debugger', testQuantity?.length, wordStage)
            setWordStage(prev => prev - prev)
        }else {
            setWordStage(prev => prev + 1)
        }
       
    }

    useEffect(()=> {
        if(sortedWords){
            const needForFirstStage = sortedWords.filter(w => !w.repetition?.firstRepetition)
            needForFirstStage.forEach((w, idx) => {
                setWordForPractice(prev => ([...prev, {
                    id: nanoid(),
                    display: idx === wordStage ? true : false,
                    word: w
                }]))
            })
        }
    }, [wordStage])
    return (
        <section className={styleTW.container}>
            <h1 className={`${styleTW.title1} m-4`}>Words to learn</h1>
            {
                wordForPractice.filter(w => w.display).map(w => 
                <ExerciseCard key={w.id} word={w.word} changeShowOrder={changeShowOrder}/>)
            }
        </section>
    );
}


export default SetWordsToLern;