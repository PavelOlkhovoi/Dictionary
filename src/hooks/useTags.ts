import { selectAllTags } from "../store/slices/tagSlice";
import { useAppSelector } from "./redux-hooks";

const useTags = () => {
    const tags = useAppSelector(state => selectAllTags(state))
    const namesArr = tags.map(t => t.name)

    return {
        all: tags,
        namesArr: namesArr
    }
}


export default useTags;