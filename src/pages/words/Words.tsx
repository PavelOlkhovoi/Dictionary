import {useEffect, useState} from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, auth } from '../..';
import { collection, DocumentData, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';


const Words = () => {

    // const [words, loading, error] = useCollectionData(
    //     collection(db, "testWords")
    // );

    const [user, loading, error] = useAuthState(auth);

    const collRef = collection(db, "testWords")
    const [words, loadingW, errorW] = useCollectionData(
        query(collRef, where("uid", "==", user?.uid))
    );

    const [allWords, setAllWords] = useState<DocumentData[]>([])

    useEffect(() => {
        setAllWords(words ? words : [])
    }, [words])

    useEffect(() => {
        console.log('All words', allWords)
    }, [allWords])
        
    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <ul>
                {
                    allWords.map(w => 
                    <li 
                        key={w.wordId}
                        >
                        <Link to={{
                            pathname: `/words/${w.wordId}`
                        }}>{w.word}</Link>
                    </li>)
                }
            </ul>
        </div>
    );
}

export default Words;