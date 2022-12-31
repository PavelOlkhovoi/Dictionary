import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import { db, auth } from '../..';
import { collection, DocumentData, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { WordDb } from '../types/word';
import { firstCapitalLetter } from '../../helpers/display';
import ShowMeanings from '../../components/wordsForm/singleWord/ShowMeanings';

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
        className='bg-[#d1d1f7]'
        >
            <h1 className='my-2'>{firstCapitalLetter(wordDb.word)}</h1>
            <span>Level: {wordDb.level}</span>
            <h2 className='mt-2'>Meanings</h2>
            <ShowMeanings meanings={wordDb.meaning}/>
            <div>
                {
                    wordDb.examples && wordDb.examples.length !== 0 &&  wordDb.examples.map(ex => {
                        return <div key={ex.example} className='mt-1'>
                            <h4>Example</h4>
                            <p>
                                {ex.example}
                            </p>
                            <h4>Translation</h4>
                            <p>
                                {ex.translation}
                            </p>
                        </div>
                    })
                }
                <h2>Tags</h2>
                {
                    tags.map(t => <ul key={t.tagId}><li>{t.name}</li></ul>)
                }
            </div>
        </section>
    );
}

export default Word;