import { useNavigate, useParams } from "react-router-dom"
import { firstCapitalLetter } from '../../helpers/display';
import { styleTW } from '../../style';
import { useAppSelector } from '../../hooks/redux-hooks';
import Loading from '../../components/Loading';
import LineButton from "../../components/ui-elements/buttons/LineButton";
import TagsOfWord from "./singlePage/TagsOfWord";
import {useState} from 'react'
import CrudExamples from "./singlePage/CrudExamples";
import CrudMeanings from "./singlePage/CrudMeanings";
import OneInputUpdate from "../../components/editInputs/singleInput/OneInputUpdate";
import { deleteWordDb, updateUserFastMeaning, updateWordDb } from "../../backend/crudFunctions/words";
import TitleGrid from "../../components/ui-elements/grids/TitleGrid";
import { selectAllTags } from "../../store/slices/tagSlice";
import { selectTagsOfWord } from "../../store/slices/tagSlice";
import { deleteWordIdFromTagDb } from "../../backend/crudFunctions/tag";

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
    const tags = useAppSelector(state => selectTagsOfWord(state, idword as string))
    const tagStatus = useAppSelector(state => state.tag.status)
    const navigate = useNavigate()
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

    const sendWordDB = (word: string) => {
        updateWordDb(currentWord?.wordId as string, word)
    }

    const sendFastMeaningDB = (text: string) => {
        updateUserFastMeaning(currentWord?.wordId as string, currentWord?.word as string, text)
    }

    const deleteWordHandler = async () => {
        deleteWordDb(currentWord?.wordId as string)
        if (tags.length > 0){
            for (let tag in tags){
                const oneTag = tags[tag]
                console.log(oneTag.tagId)
                await deleteWordIdFromTagDb(oneTag.tagId, idword as string)
            }
        }
        navigate('/');
    }


    if( wordStatus === 'pending' || tagStatus === 'pending' || !currentWord ){
        return <Loading />
    }

    return (
        <section className={`${styleTW.containerWide} pb-20`}>
            <TitleGrid title={currentWord.word} typeOfTitle="h1">
                <LineButton onClick={(e) => toggleTagControlBare(e.currentTarget.id)} id='word'>
                    {!showEditeFields.word ? "Edit" : "Clean" }
                </LineButton>
                <LineButton color="red" onClick={deleteWordHandler}>
                    Delete
                </LineButton>
            </TitleGrid>

            {
                showEditeFields.word &&
                <OneInputUpdate
                value={currentWord.word}
                name="word"
                sendToDB={sendWordDB}
                />
            }

            <div className="my-8">
                <TitleGrid title="Meanings" typeOfTitle="h2">
                    <LineButton onClick={(e) => toggleTagControlBare(e.currentTarget.id)} id='fastMeanings'>
                       { !showEditeFields.fastMeanings ? "Edit main meaning" : "Close main meaning"}
                    </LineButton>
                    <LineButton onClick={(e) => toggleTagControlBare(e.currentTarget.id)} id='editMeanings'>
                        {!showEditeFields.editMeanings ? "Edit meanings" : "Stop edit meanings"}
                    </LineButton>
                </TitleGrid>
                <h3 className={`${styleTW.title4} mt-2`}>Main meaning</h3>
                <ul>
                    <li>
                    {
                        (currentWord.fastMeaning && showEditeFields.fastMeanings) ? 
                        <OneInputUpdate
                        value={currentWord.fastMeaning}
                        name="meaning"
                        sendToDB={sendFastMeaningDB} 
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
                <TitleGrid title="Examples" typeOfTitle="h2">
                <LineButton onClick={(e)=> toggleTagControlBare(e.currentTarget.id)} id="editExample">Edit</LineButton>
                <LineButton onClick={addExample}>Add example</LineButton>
                </TitleGrid>
                {
                    (currentWord.examples && !showEditeFields.editExample) && 
                    currentWord.examples.length !== 0 && currentWord.examples.map(ex => {
                        return <div key={ex.example} className='my-5'>
                            <h4 className="font-medium text-sm">Example</h4>
                            <p className="mb-2">{ex.example}</p>
                            <h4 className="font-medium text-sm">Translation</h4>
                            <p>{ex.translation}</p>
                        </div>
                    })
                }
                {
                    showEditeFields.editExample && 
                    <CrudExamples word={currentWord} edit={true} add={showEditeFields.addExample}/>
                }
            </div>
            <div className="my-8">
                <TitleGrid title="Tags" typeOfTitle="h2">
                <LineButton  onClick={e => toggleTagControlBare(e.currentTarget.id)} id="addTag">Add tags</LineButton>
                <LineButton onClick={e => toggleTagControlBare(e.currentTarget.id)} id="createTag">Create tag</LineButton>
                </TitleGrid>
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