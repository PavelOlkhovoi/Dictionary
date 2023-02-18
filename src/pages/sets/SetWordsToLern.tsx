import { useEffect } from "react";
import ExerciseCard from "../../helpers/exercise/ExerciseCard";
import { useAppSelector } from "../../hooks/redux-hooks";
import { selectSortedByTimeWords, selectWordsForFirstExercise } from "../../store/slices/wordSlice";
import { styleTW } from "../../style";


const SetWordsToLern = () => {
    const wordsStatus = useAppSelector(state => state.word.status)
    const sortedWords = useAppSelector(state => selectSortedByTimeWords(state))

    useEffect(()=> {
    }, [])
    return (
        <section className={styleTW.container}>
            <h1 className={`${styleTW.title1} m-4`}>Words to learn</h1>
            <div className="ml-[-185px]">
                {
                    sortedWords?.filter(w => !w.repetition?.firstRepetition).map(w => <ExerciseCard word={w} key={w.wordId}/>)
                }
            </div>
        </section>
    );
}


export default SetWordsToLern;