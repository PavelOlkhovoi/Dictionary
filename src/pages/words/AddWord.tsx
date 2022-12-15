import { collection, addDoc } from "firebase/firestore"; 
import { useState, useEffect } from "react";
import { db } from "../..";
import ExamplesConstructor from "../../components/wordsForm/examples/ExamplesConstructor";
import MeaningsConstructor from "../../components/wordsForm/meanings/MeaningsConstructor";
import TagsConstructor from "../../components/wordsForm/TagsConstructor";
import { IExample, MeanigsForServer, Meaning } from '../types/word';


const AddWord = () => {
    
    const [meanings, setMeanings] = useState<MeanigsForServer[]>([])
    
    const addNewWord = async () => {
        try {
            const docRef = await addDoc(collection(db, "testWords"), {
              word: 'word',
              meaning: meanings,
              tags: 'tags',
              examples: 'examples'
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    function handleMeanings(meaningsGroup: Meaning[]){
      const pure: MeanigsForServer[] = []

      meaningsGroup.forEach(m => {
        const objTest: MeanigsForServer = {}

        const test = Object.keys(m).forEach(el => {
          if(el !== 'tempId') {
            objTest[el] = m[el] as string[]
          }
        })

        pure.push(objTest)
      })
      
    setMeanings(pure)
  }

    useEffect(() => {
      console.log("Meanigs Form", meanings)
  }, [meanings])

    return (
        <section>
            <div style={{
                maxWidth: '600px',
                margin: '0 auto'
                }}
            >
                <MeaningsConstructor attachToForm={handleMeanings}/>
                <br />
                <br />
                <TagsConstructor />
                <br />
                <br />
                <ExamplesConstructor />
                <button onClick={addNewWord}>Save a new word </button>
            </div>
        </section>
    );
}


export default AddWord;