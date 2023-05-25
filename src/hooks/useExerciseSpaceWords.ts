import { useAppSelector } from "./redux-hooks"
import { Set } from "../types/word"
import { selectWordsArrById } from "../store/slices/wordSlice"
import { selectTextsByIds } from "../store/slices/textSlice"

const getWordArrById = (state, set) => selectWordsArrById(state, set.wordsIds)

// I'm not sure if you need this hook. It would be better to write selector.
const useGetDataForSet = (set: Set) => {
    const words = useAppSelector(state => getWordArrById(state, set.wordsIds))
    const text = useAppSelector(state => selectTextsByIds(state, set.textIds as string[]))
    return {
        words,
        text
    }
}


export default useGetDataForSet;