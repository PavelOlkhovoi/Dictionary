import { useAppSelector } from "../../hooks/redux-hooks";
import { selectWordById } from "../../store/slices/wordSlice";
interface Props {
    id: string
}

const WordInText = ({id}: Props) => {
    const word = useAppSelector(state => selectWordById(state, id))
    return <div>
        {word?.word}
    </div>;
}

export default WordInText;