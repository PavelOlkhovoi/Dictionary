import { collection, addDoc } from "firebase/firestore"; 
import { useState, useEffect } from "react";
import { db } from "../..";
import CoverMeanings from "../../components/CoverMeanings";
import Example from "../../components/wordsForm/Example";
import ExamplesCreator from "../../components/wordsForm/ExamplesCreator";
import TagsCreator from "../../components/wordsForm/tags/TagsCreator";
import { IExample, Meaning } from '../types/word';


const AddWord = () => {
    const [word, setWord] = useState('')
    const [meanings, setMeanings] = useState<Meaning[]>([])
    const [tags, setTags] = useState('')

    const [examples, setExamples] = useState<IExample[]>([])

    const [deletMean, settDeleteMean] = useState('') 

    // TODO: Check if I can delete it
    const testDelete = (meaningsT: string) => {
      console.log(meaningsT)
    }

    // TODO: Delete temporary key
    // TODO: DELETE TEMPORARY ID FROM MEANinG and use new helpers functions to cleare it
    
    const addNewWord = async () => {
        try {
            const docRef = await addDoc(collection(db, "testWords"), {
              word: word,
              meaning: meanings,
              tags: tags,
              examples
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    useEffect(()=> {
      console.log('Form', examples)
    }, [examples])

    return (
        <section>
            <div>
                <div>
                  <input type='text' placeholder="Word" value={word} onChange={(e)=> setWord(e.target.value)}/>
                </div>

                <CoverMeanings meaningsForAddWord={setMeanings} deleteMeanning={testDelete}/>
                <br />
                <TagsCreator />
                <br />
                <div>Write examples with this word</div>
                <ExamplesCreator attachExamples={setExamples}/>
                {/* <input type='text' placeholder="examples" value={examples} onChange={(e)=> setExamples([e.target.value])}/> */}

                <button onClick={addNewWord}>Save a new word </button>
            </div>
        </section>
    );
}


export default AddWord;