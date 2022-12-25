import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import { db, auth } from '../..';
import { collection, DocumentData, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { WordDb } from '../types/word';
import { firstCapitalLetter } from '../../helpers/display';

const Word = () => {
    const wordId = useParams()
    const [wordDb, setWordDb] = useState<WordDb>({} as WordDb)
    // const [wordDbTest, setWordDbTest] = useState<WordDb>({} as WordDb)
    const collRef = collection(db, "testWords")
    const [words, loadingW, errorW] = useCollectionData(
        query(collRef, where("wordId", "==", wordId.idword))
    );

    useEffect(()=> {
        const oneWord = words && words[0] as WordDb
        setWordDb(oneWord ? oneWord : {} as WordDb)
    }, [words])
    useEffect(()=> {
        console.log(wordDb)
    }, [wordDb])

    if(!wordDb){
        return <h1>Loading</h1>
    }

    return (
        <section style={{
            maxWidth: '600px',
            margin: '0 auto'
            }}>
            <h1>{firstCapitalLetter(wordDb.word)}</h1>
            <span>Level: {wordDb.level}</span>
            <h2>Meanings</h2>
            {
                wordDb.meaning.map((m, idx) => {

                    <div key={idx}>
                        const keyOfMean = [];

                        m.map((el) => {

                        })
                    </div>
                })
            }
            <div>
                {
                    wordDb.examples && wordDb.examples.length !== 0 &&  wordDb.examples.map(ex => {
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
            </div>
        </section>
    );
}

export default Word;