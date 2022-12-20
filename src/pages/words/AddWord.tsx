import { collection, addDoc, serverTimestamp, collectionGroup, query, where, setDoc, getDocs} from "firebase/firestore"; 
import { useState, useEffect } from "react";
import { db, auth, app } from "../..";
import ExamplesConstructor from "../../components/wordsForm/examples/ExamplesConstructor";
import MeaningsConstructor from "../../components/wordsForm/meanings/MeaningsConstructor";
import TagsConstructor from "../../components/wordsForm/TagsConstructor";
import {ISingleWord, MeanigsForServer, Meaning, InputExamples, ExampleForServer } from '../types/word';
import useInput from "../../hooks/useInput";
import { NavLink } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore';


const AddWord = () => {
    const word = useInput('')
    const [meanings, setMeanings] = useState<MeanigsForServer[]>([])
    const [examples, setExamples] = useState<ExampleForServer[]>([])
    const [tags, setTags] = useState<string[]>([])

    const [tagsId, setTagsId] = useState<string[]>([])

    const [user, loading, error] = useAuthState(auth);

    const [oldTags, loadingTag, errorTag] = useCollectionData(
        collection(db, "tags")
    );

    
    const addNewWord = async () => {
        try {
            const docRef = await addDoc(collection(db, "testWords"), {
              uid: user?.uid ? user.uid : '12345',
              word: word.value,
              meaning: meanings,
              tags,
              examples,
              level: 'low',
              points: 0,
              priority: 'low',
              repeat: true,
              createdAt: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);

            setDoc(docRef, {wordId: docRef.id}, { merge: true })

          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const addTags = async (tag: string) => {
      let isOldTags = true

      oldTags?.forEach(t => {
        if(t.tag === tag){
          isOldTags = false
        }
      })
      
      if(isOldTags){
        try {
          const docRef = await addDoc(collection(db, "tags"), {
            userid: user?.uid ? user.uid : '12345',
            tag
          });
          console.log("Tag Document written with ID: ", docRef.id);

        } catch (e) {
          console.error("Error adding document: ", e);
        }
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
        setTags([...tagsArr].map(t => {
          addTags(t.name)
        return t.name
        }))
    }


    useEffect(() => {
      console.log("Meanigs Form", meanings)
    }, [meanings])

    useEffect(() => {
        console.log('Example Form', examples)
    }, [examples])


    useEffect(()=> {

      async function testTagGrab(){
        const tags = collectionGroup(db, 'word_tag')
        const querySnapshot = await getDocs(tags);


          querySnapshot.forEach((doc) => {
              console.log(doc.id, ' => ', doc.data());
          })

      }

      testTagGrab()
    }, [])

    useEffect(()=>{
      console.log('Word form', word.value)
  }, [word])



    return (
        <section style={{
          maxWidth: '600px',
          margin: '0 auto'
          }}>
            <div>
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
            <br />
            <NavLink to='/addwords'>Add a new word</NavLink>
        </section>
    );
}


export default AddWord;