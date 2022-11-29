import { collection, addDoc } from "firebase/firestore"; 
import { useState } from "react";
import { db } from "../..";

const AddWord = () => {
    const [word, setWord] = useState('')
    const [part, setPart] = useState('nothing')
    const [meaning, setMeaning] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])
    // const [examples, setExamples] = useState([])
    
    const addNewWord = async () => {
        console.log(part)
        try {
            const docRef = await addDoc(collection(db, "testWords"), {
              word: word,
              meaning: [{
                [part]: meaning,
              }],
              tags: ['people interactions'],
              examples: [{
                sentence: 'My mother had instigated divorce proceedings.',
                translation: 'Моя мама спровоцировала процедуру развода'
            }]
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    return (
        <section>
            <div>
                <input type='text' placeholder="Word" value={word} onChange={(e)=> setWord(e.target.value)}/>
                <input type='text' placeholder="part" value={part} onChange={(e)=> setPart(e.target.value)}/>
                <input type='text' placeholder="meaning" value={meaning} onChange={(e)=> setMeaning([e.target.value])}/>
                <input type='text' placeholder="tags" value={tags} onChange={(e)=> setTags([e.target.value])}/>
                {/* <input type='text' placeholder="examples" value={examples} onChange={(e)=> setExamples([e.target.value])}/> */}

                <button onClick={addNewWord}>Add meaning</button>
            </div>
        </section>
    );
}


export default AddWord;