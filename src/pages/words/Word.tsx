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
    // const [wordDbTest, setWordDbTest] = useState<WordDb>({} as WordDb)
    const collRef = collection(db, "words")
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

    if(!words || !wordDb){
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
            <ShowMeanings meanings={wordDb.meaning}/>
            {
                // Object.keys(wordDb.meaning).map((m, idx) => {
                //     return wordDb.meaning[m].map(el => {
                //         if(idx === 0){
                //             return <li key={el}>{m} --- {el}</li>
                //         }else {
                //             return <li key={el}>{el}</li>
                //         }
                //     })
                // })
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