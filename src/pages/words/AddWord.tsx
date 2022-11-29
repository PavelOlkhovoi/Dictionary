import { collection, addDoc } from "firebase/firestore"; 
import { useState, useEffect } from "react";
import { db } from "../..";
import MeaningInput from "../../components/MeaningInput";


const AddWord = () => {
    const [word, setWord] = useState('')
    const [part, setPart] = useState('nothing')
    const [meaning, setMeaning] = useState('')
    const [meaningArray, setMeaningArray] = useState<string[]>([])

    
    const testHandle = (e: React.FocusEvent<HTMLInputElement, Element>) => {
      e.preventDefault()
      console.log('12345', meaning)
      meaning.length > 0 && setMeaningArray(prev => [...prev, meaning]);
    }

    const [meaningComponent, setMeaningComponent] = useState([<MeaningInput onBlur={testHandle} onChange={setMeaning}/>])


    const addMeaningComponent = () => {
      setMeaningComponent(prev => [...prev, <MeaningInput onBlur={testHandle} onChange={setMeaning}/>])

    }

    const [tags, setTags] = useState('')
    // const [examples, setExamples] = useState([])

    
    const addNewWord = async () => {
        console.log(part)
        try {
            const docRef = await addDoc(collection(db, "testWords"), {
              word: word,
              meaning: [{
                [part]: meaningArray,
              }],
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

    // useEffect(() => {

    // }, [meaningComponent])
    return (
        <section>
            <div>
                <div>
                  <input type='text' placeholder="Word" value={word} onChange={(e)=> setWord(e.target.value)}/>
                </div>
                <div>
                  <input type='text' placeholder="part" value={part} onChange={(e)=> setPart(e.target.value)}/>
                </div>
                {/* <input type='text' placeholder="meaning" value={meaning} 
                  onChange={(e)=> setMeaning(e.target.value)}
                  onBlur={(e) => testHandle(e)}
                /> */}
                <MeaningInput onBlur={testHandle} onChange={setMeaning}/>

                <div>
                    {
                      meaningComponent.map( (p, idx) => <div key={idx}>{p}</div>)
                    }
                    <button onClick={addMeaningComponent}>Add the meaning fields</button>
                </div>

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