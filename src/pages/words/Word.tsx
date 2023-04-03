import { Link, useParams } from "react-router-dom"
import { firstCapitalLetter } from '../../helpers/display';
import { styleTW } from '../../style';
import { useAppSelector } from '../../hooks/redux-hooks';
import Loading from '../../components/Loading';
import LineButton from "../../components/ui-elements/buttons/LineButton";
import TagsOfWord from "./singlePage/TagsOfWord";
import {useState} from 'react'
import CrudExamples from "./singlePage/CrudExamples";
import CrudMeanings from "./singlePage/CrudMeanings";
import OneInputUpdate from "./singlePage/OneInputUpdate";

interface ShowEditeFields {
    word: boolean
    createTag: boolean
    addTag: boolean
    editExample: boolean
    addExample: number,
    editMeanings: boolean,
    fastMeanings: boolean
}

const Word = () => {
    const { idword } = useParams()
    const currentWord = useAppSelector(state => state.word.words.find(w => w.wordId === idword))
    const wordStatus = useAppSelector(state => state.word.status)
    const tagStatus = useAppSelector(state => state.tag.status)
    const [showEditeFields, setShowEditeFields] = useState<ShowEditeFields>({
        word: false,
        createTag: false, 
        addTag: false, 
        editExample: false, 
        addExample: 0,
        editMeanings: false,
        fastMeanings: false
    })

    const toggleTagControlBare = (id: string) => setShowEditeFields(pr => ({...pr, [id]: !pr[id as keyof ShowEditeFields] }))
    const addExample = () => setShowEditeFields(prev => ({...prev, addExample: prev.addExample + 1, editExample: true}))

    if( wordStatus === 'pending' || tagStatus === 'pending' || !currentWord ){
        return <Loading />
    }

    return (
        <section
        className={`${styleTW.containerWide} pb-20`}
        >
            <div className={`${styleTW.bottomBorder} ${styleTW.gridLineTitle} mb-2 pb-6`}>
                <h1 className={`${styleTW.title1}`}>{firstCapitalLetter(currentWord.word)}</h1>
                <div className="">
                    <LineButton
                    onClick={(e) => toggleTagControlBare(e.currentTarget.id)}
                    id='word'
                    >
                        Edit
                    </LineButton>
                </div>
            </div>
            {
                showEditeFields.word && <div>Change input</div>
            }
            <div className="my-8">
                <div className={`${styleTW.title2} ${styleTW.bottomBorder} ${styleTW.gridLineTitle} pb-2`}>
                    <h2 className={`${styleTW.title2}`}>Meanings</h2>
                    <div className="flex gap-6">
                        <LineButton
                        onClick={(e) => toggleTagControlBare(e.currentTarget.id)}
                         id='editMeanings'
                         >
                            Edit
                        </LineButton>
                        <LineButton
                        onClick={(e) => toggleTagControlBare(e.currentTarget.id)}
                        id='fastMeanings'
                        >
                            Edit main meaning
                        </LineButton>
                    </div>
                </div>
                <h3 className={`${styleTW.title4} mt-2`}>Main meaning</h3>
                <ul>
                    <li>
                    {
                        (currentWord.fastMeaning && showEditeFields.fastMeanings) ? 
                        <OneInputUpdate
                        fastMeaning={currentWord.fastMeaning}
                        word={currentWord.word}
                        wordId={currentWord.wordId as string} 
                        />
                        :
                        <span>{currentWord.fastMeaning}</span>
                    }
                    </li>
                </ul>
                {
                   !showEditeFields.editMeanings && Object.entries(currentWord.meaning)
                    .map(([key, value], idx) => {
                        const translation = value.translation.map((t, idx) => <li key={`${t}-${idx}`}>{t}</li>)

                        return <div key={`${key}-${idx}`}>
                            <h3 className={`${styleTW.title4} mt-2`}>{firstCapitalLetter(key)}</h3>
                            <ul>
                                {
                                    translation
                                }
                            </ul>
                        </div>
                    })
                    
                }

                    {
                        showEditeFields.editMeanings && <CrudMeanings word={currentWord}/>
                    }
            </div>
            <div className="my-8">
                <div className={`${styleTW.title2} ${styleTW.bottomBorder} ${styleTW.gridLineTitle} pb-2`}>
                    <h2 className={`${styleTW.title2}`}>Examples</h2>
                    <div className="flex gap-6">
                        <LineButton onClick={(e)=> toggleTagControlBare(e.currentTarget.id)} id="editExample">Edit</LineButton>
                        <LineButton onClick={addExample}>Add example</LineButton>
                    </div>
                </div>
                {
                    (currentWord.examples && !showEditeFields.editExample) && 
                    currentWord.examples.length !== 0 && currentWord.examples.map(ex => {
                        return <div key={ex.example} className='my-4'>
                            <p>{ex.example}</p>
                            <p>{ex.translation}</p>
                        </div>
                    })
                }
                {
                    showEditeFields.editExample && <CrudExamples word={currentWord} edit={true} add={showEditeFields.addExample}/>
                }
            </div>
            <div className="my-8">
                <div className={`${styleTW.title2} ${styleTW.bottomBorder} ${styleTW.gridLineTitle} pb-4`}>
                    <h2 className="">Tags</h2>
                    <div className="flex gap-6">
                        <LineButton  onClick={e => toggleTagControlBare(e.currentTarget.id)} id="addTag">Add tags</LineButton>
                        <LineButton onClick={e => toggleTagControlBare(e.currentTarget.id)} id="createTag">Create tag</LineButton>
                    </div>
                </div>
                {
                    currentWord.wordId && <TagsOfWord 
                    addTag={showEditeFields.addTag} 
                    newTag={showEditeFields.createTag}
                    wordId={currentWord.wordId}
                    uid={currentWord.uid}
                    />
                }
            </div>
        </section>
    );
}

export default Word;