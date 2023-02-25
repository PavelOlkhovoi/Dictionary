import { useAppSelector } from "../../hooks/redux-hooks";
import { styleTW } from "../../style";
import { Set } from "../types/word";
import { selectWordsArrById } from "../../store/slices/wordSlice";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import MyButton from "../../components/wordsForm/ui/MyButton";
import { useEffect } from "react";
import { daysDifferent } from "../../helpers/time";
import AddText from "../texts/AddText";
import { selectTextsByIds } from "../../store/slices/textSlice";
import { deleteTextIdFromTextArr } from "../../backend/crudFunctions/set";

const SingleSet = () => {
    const {idtext} = useParams()
    const set = useAppSelector(state => state.set.sets.find(w => w.setId === idtext))
    const texts = useAppSelector(state => selectTextsByIds(state, set?.textIds as string[]))
    const setStatus = useAppSelector(state => state.set.status)
    const words = useAppSelector(state => selectWordsArrById(state, set?.wordsIds))

    useEffect(()=>{

    }, [])

    return (
        <section className={`${styleTW.container}`}>
            <h1 className={`${styleTW.title1}`}>{set && set.name}</h1>
            <div className="flex gap-4 justify-center my-4">
            <MyButton>
                <Link
                to={{pathname: `/sets/edit/${idtext}`}}
                >
                    Edit set
                </Link>
            </MyButton>
            <MyButton>
                <Link
                to={{pathname: `/exercises/${idtext}`}}
                >
                    Work Out
                </Link>
            </MyButton>
            <MyButton>
                <Link
                to={{pathname: `/addText`}}
                >
                    Add Text
                </Link>
            </MyButton>
            </div>
            <div>
                <h2 className={`${styleTW.title2}`}>Words</h2>
                {
                    words && words.map(w => <li key={w.wordId}>{w.word}</li>)
                }
                {
                    texts.length > 0 && <div>
                    <h2 className={`${styleTW.title2}`}>Related Texts</h2>
                    {
                        texts.map(t => <div key={t.textId}>{t.title} <MyButton color="red" onClick={
                            ()=> deleteTextIdFromTextArr(set?.setId as string, t.textId)
                        }>Delete</MyButton></div>)
                    }
                    </div>
                    
                }
                <AddText setId={set?.setId}/>
            </div>
        </section>
    )
}

export default SingleSet;