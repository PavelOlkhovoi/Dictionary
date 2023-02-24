import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defineTypeOfExercise } from "../../helpers/exercise";
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
    const idOfexercise = useParams()
    const isSpaceRepetition = typeof parseInt(idOfexercise.idset as string) === 'number'
    const typeOfExercise = defineTypeOfExercise(idOfexercise?.idset as string)
    const sortedWords = useAppSelector(state => selectWordsForFirstExercise(state, idOfexercise.idset as string))
    const [wordStage, setWordStage] = useState<number>(0)
    
    const changeShowOrder = (rightAnswer: Boolean = false, last: Boolean = false) => {
        if(last){
            return setWordStage(prev => 0)
        }else if(rightAnswer) {
            return setWordStage(prev => prev)
        }else {
            setWordStage(prev => prev + 1)
        }
    }

    useEffect(()=> {
        console.log('Check sorted words', sortedWords)
    }, [sortedWords])

    return (
        <section className={styleTW.container}>
            <h1 className={`${styleTW.title1} m-4`}>Words to learn</h1>
            {
                sortedWords?.length !== 1 && sortedWords?.filter((w, idx) => wordStage === idx ).map((w, idx) =>{
                    if(sortedWords[sortedWords.length - 1].word === w.word){
                        return <ExerciseCard key={w.wordId} word={w} 
                        changeShowOrder={changeShowOrder} typeOfExercise={typeOfExercise} last={true}/>
                    }else {
                        return <ExerciseCard key={w.wordId} word={w} typeOfExercise={typeOfExercise}
                        changeShowOrder={changeShowOrder} last={false}/>
                    }
                })
            }

            {
                sortedWords?.length === 1 && wordStage === 0 && <ExerciseCard word={sortedWords[0]} changeShowOrder={changeShowOrder}
                typeOfExercise={typeOfExercise} last={true} isSingle={true}/>
            }

            {
                 sortedWords?.length === 0 && <div className={`${styleTW.card} text-center py-40`}>It is finished. Congratulation &#127881;</div>
            }
        </section>
    );
}


export default SetWordsToLern;