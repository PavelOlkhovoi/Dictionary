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
    const sortedWords = useAppSelector(state => selectWordsForFirstExercise(state))
    
    const [wordForPractice, setWordForPractice] = useState<Exersice[]>([])
    const [wordStage, setWordStage] = useState<number>(0)
    
    const changeShowOrder = (removeWord: Boolean = false) => {
        debugger
        // if(removeWord && sortedWords?.length == wordStage + 1 ){
        //     return setWordStage(prev => prev)
        // }


        if(sortedWords?.length as number <= wordStage + 1){
            console.log('debugger', sortedWords?.length, wordStage)
            setWordStage(prev => prev - prev)
        }else {
            setWordStage(prev => prev + 1)
        }
       
    }


    // useEffect(()=> {
    //     console.log('Sorted Words', sortedWords)
    //     if(sortedWords){
    //         sortedWords.forEach((w, idx) => {
    //             setWordForPractice(prev => ([...prev, {
    //                 id: nanoid(),
    //                 display: idx === wordStage ? true : false,
    //                 word: w
    //             }]))
    //         })
    //     }
    // }, [])

    useEffect(()=> {
        console.log('Sorted Words', sortedWords)
        if(sortedWords){
            sortedWords.forEach((w, idx) => {
                setWordForPractice(prev => ([...prev, {
                    id: nanoid(),
                    display: idx === wordStage ? true : false,
                    word: w
                }]))
            })
        }
    }, [wordStage])

    // useEffect(()=> {
    //     console.log('Sorted Words', sortedWords)
    // }, [sortedWords])
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