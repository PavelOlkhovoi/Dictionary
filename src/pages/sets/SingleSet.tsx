import { useAppSelector } from "../../hooks/redux-hooks";
import { styleTW } from "../../style";
import { selectWordsArrById } from "../../store/slices/wordSlice";
import { Link, useParams } from "react-router-dom";
import MyButton from "../../components/wordsForm/ui/MyButton";
import AddText from "../texts/AddText";
import { selectTextsByIds } from "../../store/slices/textSlice";
import { deleteTextIdFromTextArr } from "../../backend/crudFunctions/set";

const SingleSet = () => {
    const {idtext} = useParams()
    const set = useAppSelector(state => state.set.sets.find(w => w.setId === idtext))
    const texts = useAppSelector(state => selectTextsByIds(state, set?.textIds as string[]))
    const setStatus = useAppSelector(state => state.set.status)
    const words = useAppSelector(state => selectWordsArrById(state, set?.wordsIds))

    return (
        <section className={`${styleTW.container}`}>
            <h1 className={`${styleTW.title1} my-6`}>{set && set.name}</h1>
            <div className="flex gap-4 justify-center my-4">
            <MyButton color="green">
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
            <MyButton color="green">
                <Link
                to={{pathname: `/addText`}}
                >
                    Add Text
                </Link>
            </MyButton>
            </div>
            <div>
                <h2 className={`${styleTW.title2} text-center mt-4`}>Words</h2>
                <ul className="p-8">
                {
                    words && words.map(w => <li key={w.wordId}>{w.word}</li>)
                }
                </ul>
                {
                    texts.length > 0 && <div className="p-8">
                    <h2 className={`${styleTW.title2} text-center`}>Related Texts</h2>
                    {
                        texts.map(t => <Link 
                        to={{pathname: `/texts/${idtext}`}} key={t.textId}>{t.title} 
                        <div
                        className={`${styleTW.bageRed} m-2`} 
                        onClick={()=> deleteTextIdFromTextArr(set?.setId as string, t.textId)}
                        >
                            x
                        </div>
                        </Link>)
                    }
                    </div>
                    
                }
                <AddText setId={set?.setId}/>
            </div>
        </section>
    )
}

export default SingleSet;