import { Link, useParams } from "react-router-dom"
import { firstCapitalLetter } from '../../helpers/display';
import { styleTW } from '../../style';
import { useAppSelector } from '../../hooks/redux-hooks';
import Loading from '../../components/Loading';
import LineButton from "../../components/ui-elements/buttons/LineButton";
import TagsOfWord from "./singlePage/TagsOfWord";
import {useState} from 'react'
import CrudExamples from "./singlePage/CrudExamples";

interface ShowEditeFields {
    createTag: boolean
    addTag: boolean
    editExample: boolean
}

const Word = () => {
    const { idword } = useParams()
    const currentWord = useAppSelector(state => state.word.words.find(w => w.wordId === idword))
    const wordStatus = useAppSelector(state => state.word.status)
    const tagStatus = useAppSelector(state => state.tag.status)
    const [showEditeFields, setShowEditeFields] = useState<ShowEditeFields>({createTag: false, addTag: false, 
        editExample: false})

    const toggleTagControlBare = (id: string) => setShowEditeFields(pr => ({...pr, [id]: !pr[id as keyof ShowEditeFields] }))
    

    if( wordStatus === 'pending' || tagStatus === 'pending' || !currentWord ){
        return <Loading />
    }

    return (
        <section
        className={`${styleTW.containerWide} pb-20`}
        >
            <div className={`${styleTW.bottomBorder} ${styleTW.gridLineTitle} pb-6`}>
                 <h1 className={`${styleTW.title1}`}>{firstCapitalLetter(currentWord.word)}</h1>
                
                <div className="">
                    <LineButton>
                        <Link to={{pathname: `/words/edit/${idword}`}}>Edit</Link>
                    </LineButton>
                </div>
            </div>
            <div className="my-8">
                <h2 className={`${styleTW.title2} ${styleTW.bottomBorder} pb-2 mb-2`}>Meanings</h2>
                <ul>
                    <li>{currentWord.fastMeaning && currentWord.fastMeaning}</li>
                    {
                        Object.entries(currentWord.meaning).map(([key, value], idx) => {
                            const translation = value.translation.map((t, idx) => <span key={`${t}-${idx}`}>{t}</span>)

                            return <li key={`${key}-${idx}`}>
                            <h3>{key}</h3>
                            {
                                translation
                            }
                        </li>
                        })
                        
                    }
                </ul>
            </div>
            <div className="my-8">
                <div className={`${styleTW.title2} ${styleTW.bottomBorder} ${styleTW.gridLineTitle} pb-2`}>
                    <h2 className={`${styleTW.title2}`}>Examples</h2>
                    <div className="flex gap-6">
                        <LineButton onClick={(e)=> toggleTagControlBare(e.currentTarget.id)} id="editExample">Edit</LineButton>
                        <LineButton>Add example</LineButton>
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
                    showEditeFields.editExample && <CrudExamples word={currentWord} edit={true} />
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