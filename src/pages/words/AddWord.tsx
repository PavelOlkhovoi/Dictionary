import { collection, addDoc, serverTimestamp, collectionGroup, query, where, setDoc, getDocs, doc, getDoc,
  updateDoc, arrayUnion} from "firebase/firestore"; 
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


const AddWord = () => {
    const word = useInput('')
    const [meanings, setMeanings] = useState<MeanigsForServer[]>([])
    const [examples, setExamples] = useState<ExampleForServer[]>([])
    const [tags, setTags] = useState<string[]>([])

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

        oldTags?.forEach((tag, idx) => {

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


      // oldTags?.forEach(tag => {
      //     tags.forEach(tagField => {
      //       console.log('Inside TAG', tagField)
      //       if(tag.name !== tagField){
      //         createTag(user?.uid as string, tagField, wordIdx)
      //       }else {
      //         addWordIdxToTag(tag.tagId, wordIdx)
      //       };
      //     })
      //   }
      // )

      // if tag.name = tag -> add the word Index to => word_id

      // tag.name !== tag
      
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
        return t.name
        }))
    }


    useEffect(() => {
      console.log("Meanigs Form", meanings)
    }, [meanings])

    useEffect(() => {
        console.log('Example Form', examples)
    }, [examples])


    // useEffect(()=> {

    //   async function testTagGrab(wordid: string = ''){
    //     const wordsRef = doc(db, 'testWords', wordid)
    //     const docSnap = await getDoc(wordsRef);
    //     console.log(docSnap.data())
    //   }

    //   console.log('OldTags', oldTags)

    //   oldTags?.forEach(tag => {
    //     (tag?.word_id as string[]).forEach(wid => {
    //       testTagGrab(wid)
    //     })
    //   })
    // }, [oldTags])

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