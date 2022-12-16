import { collection, addDoc } from "firebase/firestore"; 
import { useState, useEffect } from "react";
import { db } from "../..";
import ExamplesConstructor from "../../components/wordsForm/examples/ExamplesConstructor";
import MeaningsConstructor from "../../components/wordsForm/meanings/MeaningsConstructor";
import TagsConstructor from "../../components/wordsForm/TagsConstructor";
import {ISingleWord, MeanigsForServer, Meaning, InputExamples, ExampleForServer } from '../types/word';
import useInput from "../../hooks/useInput";


const AddWord = () => {
    
    const word = useInput('')
    const [meanings, setMeanings] = useState<MeanigsForServer[]>([])
    const [examples, setExamples] = useState<ExampleForServer[]>([])
    const [tags, setTags] = useState<string[]>([])
    
    const addNewWord = async () => {
        try {
            const docRef = await addDoc(collection(db, "testWords"), {
              word: word.value,
              meaning: meanings,
              tags,
              examples,
              level: 'low',
              points: 0,
              priority: 'low',
              repeat: true
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

    function handleExamples(examplesArr: InputExamples[]){
      const pure: ExampleForServer[] = []
      examplesArr.forEach(ex => {
        const cleanedExample: ExampleForServer = {
          example: ex.example,
          translation: ex.translation
        }

        pure.push(cleanedExample)
      })
      setExamples(pure)
    }

    function handleTag(tagsArr: ISingleWord[]){
        setTags([...tagsArr].map(t => t.name))

    }


    useEffect(() => {
      console.log("Meanigs Form", meanings)
    }, [meanings])

    useEffect(() => {
        console.log('Example Form', examples)
    }, [examples])

    useEffect(()=>{
      console.log('Tags Form', tags)
  }, [tags])

    useEffect(()=>{
      console.log('Word form', word.value)
  }, [word])

    return (
        <section>
            <div style={{
                maxWidth: '600px',
                margin: '0 auto'
                }}
            >
              <input value={word.value} onChange={word.onChange} placeholder={'Word'}/>
                <MeaningsConstructor attachToForm={handleMeanings}/>
                <br />
                <br />
                <TagsConstructor attachTag={handleTag} />
                <br />
                <br />
                <ExamplesConstructor attachExamples={handleExamples}/>
                <button onClick={addNewWord}>Save a new word </button>
            </div>
        </section>
    );
}


export default AddWord;