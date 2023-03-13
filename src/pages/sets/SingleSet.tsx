import { useAppSelector } from "../../hooks/redux-hooks";
import { styleTW } from "../../style";
import { selectWordsArrById } from "../../store/slices/wordSlice";
import { Link, useParams } from "react-router-dom";
import AddText from "../texts/AddText";
import { selectTextsByIds } from "../../store/slices/textSlice";
import { deleteTextIdFromTextArr } from "../../backend/crudFunctions/set";
import LineButton from "../../components/ui-elements/buttons'/LineButton";

const SingleSet = () => {
    const {idtext} = useParams()
    const set = useAppSelector(state => state.set.sets.find(w => w.setId === idtext))
    const texts = useAppSelector(state => selectTextsByIds(state, set?.textIds as string[]))
    const words = useAppSelector(state => selectWordsArrById(state, set?.wordsIds))

    return (
    <>
        <section className={`${styleTW.containerWide}`}>
            <div className={`${styleTW.bottomBorder} md:flex md:items-center md:gap-12 mb-10 md:mb-12 pb-6`}>
                <h1 className={`${styleTW.title1}`}>{set && set.name}</h1>
                <div className="flex mt-2 gap-6 md:justify-center">
                    <LineButton color="green">
                        <Link
                        to={{pathname: `/sets/edit/${idtext}`}}
                        >
                            Edit set
                        </Link>
                    </LineButton>
                    <LineButton>
                        <Link
                        to={{pathname: `/exercises/${idtext}`}}
                        >
                            Work Out
                        </Link>
                    </LineButton>
                </div>
            </div>
            <div>
                <h2 className={`${styleTW.title2} ${styleTW.bottomBorder} pb-2 mb-2`}>Words</h2>
                <ul>
                {
                    words && words.map(w => <li key={w.wordId}>{w.word}</li>)
                }
                </ul>
                <div className="mt-8">
                {
                    texts.length > 0 && <div>
                    <h2 className={`${styleTW.title2} ${styleTW.bottomBorder} pb-2`}>Related Texts</h2>
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
                </div>
            </div>
        </section>
        <AddText setId={set?.setId} titleMode={"h2"}/>
    </>
    )
}

export default SingleSet;