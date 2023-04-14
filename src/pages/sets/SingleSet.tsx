import { useAppSelector } from "../../hooks/redux-hooks";
import { styleTW } from "../../style";
import { selectWordsArrById } from "../../store/slices/wordSlice";
import { Link, useParams } from "react-router-dom";
import AddText from "../texts/AddText";
import { selectTextsByIds } from "../../store/slices/textSlice";
import { deleteTextIdFromTextArr, updateUserSet } from "../../backend/crudFunctions/set";
import LineButton from "../../components/ui-elements/buttons/LineButton";
import { useState } from "react";
import OneInputUpdate from "../../components/editInputs/singleInput/OneInputUpdate";
import AddWordToSet from "./singlePage/edit/AddWordToSet";

interface SetEditStatus {
    title: boolean
    word: boolean
}

const SingleSet = () => {
    const {idtext} = useParams()
    const set = useAppSelector(state => state.set.sets.find(w => w.setId === idtext))
    const texts = useAppSelector(state => selectTextsByIds(state, set?.textIds as string[]))
    const words = useAppSelector(state => selectWordsArrById(state, set?.wordsIds))
    const [editStatus, setEditStatus] = useState<SetEditStatus>({
        title: false,
        word: false
    })

    const toggleEditStatus = (field: keyof SetEditStatus) => {
        setEditStatus(fields => ({...fields, [field]: !fields[field]}))
    }

    const updateName = (name: string) => updateUserSet(
        set?.setId as string, name, set?.source, set?.wordsIds as string[]
        )
    

    return (
    <>
        <section className={`${styleTW.containerWide}`}>
            <div className={`${styleTW.bottomBorder} md:flex md:items-center md:gap-12`}>
                <h1 className={`${styleTW.title1}`}>{set && set.name}</h1>
                <div className="flex mt-2 gap-6 md:justify-center">
                    <LineButton 
                    color="green"
                    onClick={() => toggleEditStatus('title')}
                    >
                        Edit title
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
            <div className="my-4">
                {
                    editStatus.title && 
                    <OneInputUpdate
                    name="name"
                    sendToDB={updateName}
                    value={set?.name as string}
                    />
                    
                }
            </div>
            <div className={`${styleTW.bottomBorder} md:flex md:items-center md:gap-12`}>
                <h2 className={`${styleTW.title2} mb-2`}>Words</h2>
            </div>
            <ul>
            {
                words && words.map(w => <li key={w.wordId}>{w.word}</li>)
            }
            </ul>
            <LineButton 
                    color="green"
                    onClick={() => toggleEditStatus('word')}
                    >
                        {editStatus.word ? "Hide button" : "Add word"}
                    </LineButton>
            {
                editStatus.word &&
               <AddWordToSet 
               uid={set?.uid as string} 
               setId={set?.setId as string}
               name={set?.name as string}
               wordsIds={set?.wordsIds as string[]}
               />
                
            }
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
        </section>
        <AddText setId={set?.setId} titleMode={"h2"}/>
    </>
    )
}

export default SingleSet;