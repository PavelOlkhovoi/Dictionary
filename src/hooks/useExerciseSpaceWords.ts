import { useAppSelector } from "./redux-hooks"
import { Set } from "../types/word"
import { selectWordsArrById } from "../store/slices/wordSlice"
import { selectTextsByIds } from "../store/slices/textSlice"


const useGetDataForSet = (set: Set) => {
    const words = useAppSelector(state => selectWordsArrById(state, set.wordsIds))
    const text = useAppSelector(state => selectTextsByIds(state, set.textIds as string[]))
    return {
        words,
        text
    }
}


export default useGetDataForSet;