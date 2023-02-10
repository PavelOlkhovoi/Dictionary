import { useAppSelector } from "../../hooks/redux-hooks";
import { styleTW } from "../../style";
import { Set } from "../types/word";
import { selectWordsArrById } from "../../store/slices/wordSlice";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import MyButton from "../../components/wordsForm/ui/MyButton";
import { useEffect } from "react";

const SingleSet = () => {
    const {idtext} = useParams()
    const set = useAppSelector(state => state.set.sets.find(w => w.setId === idtext))
    const setStatus = useAppSelector(state => state.set.status)
    const words = useAppSelector(state => selectWordsArrById(state, set?.textsIds))
    useEffect(()=> {
        console.log('Wwwwww', words)
    }, [words])
    if(setStatus === 'pending'){return <Loading />}
    

    return (
        <section className={`${styleTW.container}`}>
            <h1 className={`${styleTW.title1}`}>{set && set.name}</h1>
            <MyButton>
                <Link
                to={{pathname: `/sets/edit/${idtext}`}}
                >
                    Edit set
                </Link>
            </MyButton>
            <div>
                <h2 className={`${styleTW.title2}`}>Words</h2>
                {
                    words && words.map(w => <li key={w.wordId}>{w.word}</li>)
                }
            </div>
        </section>
    )
}

export default SingleSet;