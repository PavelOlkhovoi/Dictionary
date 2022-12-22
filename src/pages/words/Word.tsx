import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import { db, auth } from '../..';
import { collection, DocumentData, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { WordDb } from '../types/word';

const Word = () => {
    const word = useParams()
    const [wordDb, setWordDb] = useState<DocumentData[]>([])
    const [wordDbTest, setWordDbTest] = useState<WordDb>({} as WordDb)
    const collRef = collection(db, "testWords")
    const [words, loadingW, errorW] = useCollectionData(
        query(collRef, where("wordId", "==", word.idword))
    );

    useEffect(()=> {
        console.log(words)
        setWordDb(words ? words : [])
    }, [words])
    useEffect(()=> {
        const testObj = wordDb[0] as WordDb
        setWordDbTest(testObj)
        console.log(testObj)
    }, [wordDb])
    useEffect(()=> {
        const testObj = wordDb[0] as WordDb
        setWordDbTest(testObj)
        console.log('Examples', wordDbTest)
    }, [wordDbTest])

    if(!wordDbTest){
        return <h1>Loading</h1>
    }

    return (
        <section style={{
            maxWidth: '600px',
            margin: '0 auto'
            }}>
            One Word
            <p>
                {
                    wordDbTest.examples.length && wordDbTest.examples.length !== 0 &&  wordDbTest.examples.map(ex => {
                        return <div key={ex.example}>
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
            </p>
        </section>
    );
}

export default Word;