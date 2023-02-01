import { useAppSelector } from "../../hooks/redux-hooks";
import { Tag } from "../../pages/types/word";
import {useState} from 'react'
import { styleTW } from "../../style";
import { selectWordsByTag } from "../../store/slices/tagSlice";



interface Props {
    tag: Tag
}
const ShowTagWithWords = ({tag}:Props) => {
    const words = useAppSelector(state => selectWordsByTag(state, tag.word_id))

    const [showWords, setShowWOrds] = useState(false)

    return (
        <div>
            <div
            className={`${styleTW.bageBlue} my-3 mr-3 cursor-pointer`}
            onClick={()=> setShowWOrds(show => !show)}
            >
                {tag.name}
            </div>

            <ul>
            {
                showWords && words.map(w => <li key={w.wordId}>{w.word}</li>)
            }
            </ul>
        </div>
    )

}


export default ShowTagWithWords;