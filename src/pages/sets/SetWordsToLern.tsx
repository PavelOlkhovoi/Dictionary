import { useEffect } from "react";
import ExerciseCard from "../../helpers/exercise/ExerciseCard";
import { useAppSelector } from "../../hooks/redux-hooks";
import { selectSortedByTimeWords, selectWordsForFirstExercise } from "../../store/slices/wordSlice";
import { styleTW } from "../../style";


const SetWordsToLern = () => {
    // Get Words 
    const wordsStatus = useAppSelector(state => state.word.status)
    const sortedWords = useAppSelector(state => selectSortedByTimeWords(state))
    // const wordsfForFirstExercise = useAppSelector(state => selectWordsForFirstExercise(state))
    useEffect(()=> {
        console.log("Sorted wprds", sortedWords?.filter(w => !w.repetition?.fifthRepetition))
    }, [sortedWords])
    return (
        <section className={styleTW.container}>
            <h1 className={`${styleTW.title1}`}>Words to learn</h1>
            <div className="">
                {
                    sortedWords?.filter(w => !w.repetition?.fifthRepetition).map(w => <ExerciseCard word={w}/>)
                }

            </div>
        </section>
    );
}


export default SetWordsToLern;