import { collection, addDoc, serverTimestamp, collectionGroup, query, where, setDoc, getDocs, doc, getDoc,
  updateDoc, arrayUnion, DocumentData} from "firebase/firestore"; 
import { useState, useEffect } from "react";
import { db, auth, app } from "../..";
import ExamplesConstructor from "../../components/wordsForm/examples/ExamplesConstructor";
import MeaningsConstructor from "../../components/wordsForm/meanings/MeaningsConstructor";
import TagsConstructor from "../../components/wordsForm/TagsConstructor";
import {ISingleWord, MeanigsForServer, Meaning, InputExamples, ExampleForServer } from '../types/word';
import useInput from "../../hooks/useInput";
import { NavLink } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData} from 'react-firebase-hooks/firestore';
import { createTag, addWordIdxToTag } from "../../backend/crudFunctions";
import MyInput from "../../components/wordsForm/ui/MyInput";
import MyButton from "../../components/wordsForm/ui/MyButton";


const AddWord = () => {
    const word = useInput('')
    const [meanings, setMeanings] = useState<MeanigsForServer>({})
    const [examples, setExamples] = useState<ExampleForServer[]>([])
    const [tags, setTags] = useState<string[]>([])

    const [user, loading, error] = useAuthState(auth);

    // TODO: I need to search tags by user ID. If not the search process will be too long and incorrect
    const [oldTags, loadingTag, errorTag] = useCollectionData(
        collection(db, "tags")
    );

    
    const addNewWord = async () => {
        try {
            const docRef = await addDoc(collection(db, "words"), {
              uid: user?.uid ? user.uid : '12345',
              word: word.value,
              meaning: meanings,
              // tags,
              examples,
              level: 'low',
              points: 0,
              priority: 'low',
              repeat: true,
              createdAt: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);

            setDoc(docRef, {wordId: docRef.id}, { merge: true })

            addTags(docRef.id)

          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const addTags = async (wordIdx: string) => {

      let isOldTag = false

      tags?.forEach(tagField => {
        if((oldTags as DocumentData).length === 0){
          createTag(user?.uid as string, tagField, wordIdx)
        }
        oldTags?.forEach((tag, idx) => {
          console.log('Add Tag')
          if(tagField === tag.name){
            isOldTag = true
            return addWordIdxToTag(tag.tagId, wordIdx)
          }
          
          if(oldTags.length-1 === idx && !isOldTag){
            createTag(user?.uid as string, tagField, wordIdx)
          };

          if(oldTags.length-1 === idx && isOldTag){
            isOldTag = !isOldTag
          };
        })
      }
    )
      
  }

  function handleMeanings(meaningsGroup: Meaning[]){
    const objMeanings: MeanigsForServer = {}

    meaningsGroup.forEach(m => {
      Object.keys(m).forEach(el => {
          if(el !== 'tempId') {
            objMeanings[el] = m[el] as string[]
        }
      })
    })

    console.log('TTTT', objMeanings)
  setMeanings(objMeanings)
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
        return t.name
        }))
    }


    useEffect(() => {
      console.log("Meanigs Form", meanings)
    }, [meanings])

    useEffect(() => {
        console.log('Example Form', examples)
    }, [examples])


    useEffect(()=>{
      console.log('Word form', word.value)
  }, [word])
    useEffect(()=>{
      console.log('Tag form', tags)
  }, [tags])



    return (
        <section style={{
          maxWidth: '600px',
          margin: '0 auto'
          }}>
            <div>
                <MyInput name="word" label="word" value={word.value} onChange={word.onChange}/>
                <MeaningsConstructor attachToForm={handleMeanings}/>
                <br />
                <br />
                <TagsConstructor attachTag={handleTag} />
                <br />
                <br />
                <ExamplesConstructor attachExamples={handleExamples}/>
                {/* <button onClick={addNewWord}>Save a new word </button> */}
                <MyButton onClick={addNewWord}>Save a new word </MyButton>
            </div>
            <br />
            <MyButton onClick={()=> console.log('Test BTN')} color="bg-green-700">Test</MyButton>
        </section>
    );
}


export default AddWord;