import { useParams } from "react-router-dom"

const Word = () => {
    const word = useParams()
    return (
        <div>One Word {word.idword}</div>
    );
}

export default Word;