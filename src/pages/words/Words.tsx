import ExamplesConstructor from "../../components/wordsForm/examples/ExamplesConstructor";
import MeaningsConstructor from "../../components/wordsForm/meanings/MeaningsConstructor";
import TagsConstructor from "../../components/wordsForm/TagsConstructor";


// import {useEffect, useState} from 'react'
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { db } from '../..';
// import { collection, query, where } from 'firebase/firestore';


// const Words = () => {
//     // const [words, loading, error] = useCollectionData(
//     //     collection(db, "testWords")
//     // );

//     const collRef = collection(db, "testWords")
//     const [words, loading, error] = useCollectionData(
//         query(collRef, where("type", "array-contains", "noun"))
//     );






const Words = () => {
        
    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            {/* <MeaningsConstructor /> */}
            <br />
            <br />
            <br />
            {/* <TagsConstructor /> */}
            <br />
            <br />
            <br />
            {/* <ExamplesConstructor/> */}
        </div>
    );
}

export default Words;