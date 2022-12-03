import { collection, addDoc } from "firebase/firestore"; 
import { useState, useEffect } from "react";
import { db } from "../..";
import CoverMeanings from "../../components/CoverMeanings";


const AddWord = () => {
    const [word, setWord] = useState('')
    const [meanings, setMeanings] = useState<object[]>([])
    const [tags, setTags] = useState('')
    
    const addNewWord = async () => {
        try {
            const docRef = await addDoc(collection(db, "testWords"), {
              word: word,
              meaning: meanings,
              tags: tags,
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
                <div>
                  <input type='text' placeholder="Word" value={word} onChange={(e)=> setWord(e.target.value)}/>
                </div>

                <CoverMeanings meaningsForAddWord={setMeanings}/>

                <div>          
                  <input type='text' placeholder="tags" value={tags} 
                    onChange={(e)=> 
                    setTags(e.target.value)}
                  />
                </div>
                {/* <input type='text' placeholder="examples" value={examples} onChange={(e)=> setExamples([e.target.value])}/> */}

                <button onClick={addNewWord}>Save a new word </button>
            </div>
        </section>
    );
}


export default AddWord;