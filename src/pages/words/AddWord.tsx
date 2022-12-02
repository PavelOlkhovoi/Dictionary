import { collection, addDoc } from "firebase/firestore"; 
import { useState, useEffect } from "react";
import { db } from "../..";
import MeaningInput from "../../components/MeaningInput";
import MeaningsObjectsCreator from "../../components/MeaningsObjectsCreator";


const AddWord = () => {
    const [word, setWord] = useState('')
    const [meaningArray, setMeaningArray] = useState<object[]>([])



    const handleMeaningArray = (objectArray: object[]) => {
      setMeaningArray(objectArray)
      console.log(objectArray)
    }

    const [partComponent, setPartComponent] = useState([<MeaningsObjectsCreator setObject={handleMeaningArray} partProps={'verb'} />])

    const partOfSpeechWithMeanings = () => {
      setPartComponent(prev => [...prev, <MeaningsObjectsCreator setObject={handleMeaningArray} partProps={'verb'}/>])
    }
    

    const [tags, setTags] = useState('')
    // const [examples, setExamples] = useState([])

    
    const addNewWord = async () => {
        // console.log(part)
        try {
            const docRef = await addDoc(collection(db, "testWords"), {
              word: word,
              meaning: meaningArray,
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

    // useEffect(()=> {
    //   console.log('Change meaining', meaningArray)
    // }, [meaningArray])

    useEffect(()=> {
      console.log('Change word', word)
    }, [word])


    return (
        <section>
            <div>
                <div>
                  <input type='text' placeholder="Word" value={word} onChange={(e)=> setWord(e.target.value)}/>
                </div>
                
                {
                  partComponent.map((m, idx) => <div key={idx}>{m}</div>)
                }
                <button onClick={partOfSpeechWithMeanings}>Add part of speech</button>

                <div>          
                  <input type='text' placeholder="tags" value={tags} 
                    onChange={(e)=> 
                    setTags(e.target.value)}
                  />
                </div>
                {/* <input type='text' placeholder="examples" value={examples} onChange={(e)=> setExamples([e.target.value])}/> */}

                <button onClick={addNewWord}>Add meaning</button>
            </div>
        </section>
    );
}


export default AddWord;