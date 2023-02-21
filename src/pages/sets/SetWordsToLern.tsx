import { useEffect, useState } from "react";
import ExerciseCard from "../../helpers/exercise/ExerciseCard";
import { useAppSelector } from "../../hooks/redux-hooks";
import { selectWordsForFirstExercise } from "../../store/slices/wordSlice";
import { styleTW } from "../../style";
import { WordDb } from "../types/word";

interface Exersice {
    id: string
    display: Boolean,
    word: WordDb
}

const SetWordsToLern = () => {
    const sortedWords = useAppSelector(state => selectWordsForFirstExercise(state))
    const [wordStage, setWordStage] = useState<number>(0)
    
    const changeShowOrder = (rightAnswer: Boolean = false, last: Boolean = false) => {
        if(last){
            return setWordStage(prev => 0)
        }else if(rightAnswer) {
            setWordStage(prev => prev)
            return setWordStage(prev => prev - prev)
        }else {
            setWordStage(prev => prev + 1)
        }
       
    }

    useEffect(()=> {
       console.log('Sorted words', sortedWords)
    }, [sortedWords])

    return (
        <section className={styleTW.container}>
            <h1 className={`${styleTW.title1} m-4`}>Words to learn</h1>
            {
                sortedWords?.filter((w, idx) => wordStage === idx ).map((w, idx) =>{
                    if(sortedWords[sortedWords.length - 1].word === w.word){
                        return <ExerciseCard key={w.wordId} word={w} changeShowOrder={changeShowOrder} last={true}/>
                    }else {
                        return <ExerciseCard key={w.wordId} word={w} changeShowOrder={changeShowOrder} last={false}/>
                    }
                })
            }

            {
                 sortedWords?.length === 0 && <div className={`${styleTW.card} text-center py-40`}>It is finished. Congratulation &#127881;</div>
            }
        </section>
    );
}


export default SetWordsToLern;