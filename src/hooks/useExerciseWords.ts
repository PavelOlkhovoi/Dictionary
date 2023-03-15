import { useAppSelector } from "./redux-hooks";

const useExerciseSpaceWords = () => {
    const first = useAppSelector(state => state.word.words.filter(w => !w.repetition?.firstRepetition))
    const second = useAppSelector(state => state.word.words.filter(w => !w.repetition?.secondRepetition && w.repetition?.firstRepetition))
    const third = useAppSelector(state => state.word.words.filter(w => !w.repetition?.thirdRepetition && w.repetition?.firstRepetition
        && w.repetition?.secondRepetition))
    const forth = useAppSelector(state => state.word.words.filter(w => !w.repetition?.fourthRepetition && w.repetition?.firstRepetition
        && w.repetition?.secondRepetition && w.repetition?.thirdRepetition))
    const fifth = useAppSelector(state => state.word.words.filter(w => !w.repetition?.fifthRepetition && w.repetition?.firstRepetition
        && w.repetition?.secondRepetition && w.repetition?.thirdRepetition && w.repetition?.fourthRepetition))
    const sixth = useAppSelector(state => state.word.words.filter(w => !w.repetition?.sixthRepetition && w.repetition?.firstRepetition
        && w.repetition?.secondRepetition && w.repetition?.thirdRepetition && w.repetition?.fourthRepetition
        && w.repetition?.fifthRepetition))
    const seventh = useAppSelector(state => state.word.words.filter(w => !w.repetition?.seventhRepetition && w.repetition?.firstRepetition
        && w.repetition?.secondRepetition && w.repetition?.thirdRepetition && w.repetition?.fourthRepetition
        && w.repetition?.fifthRepetition && w.repetition?.sixthRepetition))

    return {
        first: first.length,
        second: second.length,
        third: third.length,
        forth: forth.length,
        fifth: fifth.length,
        sixth: sixth.length,
        seventh: seventh.length
    };
}


export default useExerciseSpaceWords;