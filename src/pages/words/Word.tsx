import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import { db, auth } from '../..';
import { collection, DocumentData, query, where, doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ExampleForServer, WordDb } from '../types/word';
import { firstCapitalLetter } from '../../helpers/display';
import ShowMeanings from '../../components/wordsForm/singleWord/ShowMeanings';
import MyButton from '../../components/wordsForm/ui/MyButton';
import { styleTW } from '../../style';
import MyInput from '../../components/wordsForm/ui/MyInput';
import EditExample from '../../components/edit/word/EditExample';

const Word = () => {
    const wordId = useParams()
    const [wordDb, setWordDb] = useState<WordDb>({} as WordDb)

    const collRef = collection(db, "words")
    const [words, loadingW, errorW] = useCollectionData(
        query(collRef, where("wordId", "==", wordId.idword))
    );

    const tagsRef = collection(db, "tags")
    const [tags, tLoading, tError] = useCollectionData(
        query(tagsRef, where("word_id", "array-contains", wordId.idword))
    );

    const [isEdit, setIsEdit] = useState(false)

    const [word, setWord] = useState('')

    const wordRef = doc(db, "words", wordId.idword as string);
    
    const wordUpdate = async () => {
        await updateDoc(wordRef, {
          word: word
        });
    }
    
    const examplesUpdate = async (updatedExamples: ExampleForServer[]) => {
        await updateDoc(wordRef, {
          examples: updatedExamples
        });
    }

    useEffect(()=> {
        const oneWord = words && words[0] as WordDb
        setWordDb(oneWord ? oneWord : {} as WordDb)
    }, [words])
    useEffect(()=> {
        console.log(wordDb)
    }, [wordDb])
    useEffect(()=> {
        console.log('Tags', tags)
    }, [tags, wordDb])
    useEffect(()=> {
        console.log('isEdit', isEdit)
    }, [isEdit])

    if(!words || !tags){
        return (
            <div className='container mx-auto'>
                <button type="button" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md h-2 disabled">
                    <svg className="motion-reduce:hidden animate-spin ..." viewBox="0 0 24 24">...</svg>
                    Loading...
                </button>
            </div>
        )
    }

    return (
        <section
        className="container max-w-screen-lg mx-auto px-4 mt-5"
        >
            <div className='sm:flex gap-8 items-center'>
                {
                    isEdit ? <h1 className='text-6xl font-normal leading-normal mt-0 mb-2'>{firstCapitalLetter(wordDb.word)}</h1>
                    : <MyInput
                        edit={true}  
                        name='word' 
                        label='Word' 
                        placeholder={firstCapitalLetter(wordDb.word)} 
                        onChange={(e)=> setWord( prev => e.target.value)}
                        editFunct={wordUpdate}
                        />
                }
                
                <MyButton onClick={()=> setIsEdit(prev => !prev)}>Edit</MyButton>
            </div>
            <dl className={styleTW.gridDl}>
                <dt>Level:</dt>
                <dd>{wordDb.level}</dd>
                </dl>
            <h2 className={styleTW.title2}>Meanings</h2>
            <ShowMeanings meanings={wordDb.meaning} isEdit={isEdit}/>
            <div>
            <h2 className={styleTW.title2}>Examples</h2>
                {
                    wordDb.examples && wordDb.examples.length !== 0 && isEdit && wordDb.examples.map(ex => {
                        return <div key={ex.example} className='my-4'>
                            <h3 className={styleTW.title3}>Example</h3>
                                <p> {ex.example}</p>
                            <h3 className={`${styleTW.title3} mt-2`}>Translation</h3>
                            <p>{ex.translation}</p>
                        </div>
                    })
                }
                {
                    wordDb.examples && wordDb.examples.length !== 0 &&  !isEdit && 
                    <EditExample allExamples={wordDb.examples} exampleUpdate={examplesUpdate}/>
                }
            </div>
            <div className='flex items-center'>
            <h2 className="my-4 text-4xl">Tags</h2>
                {
                    tags.map(t => <div key={t.tagId}><span className={`${styleTW.bageBlue} mt-3 ml-5`}>{t.name}</span></div>)
                }
            </div>
        </section>
    );
}

export default Word;