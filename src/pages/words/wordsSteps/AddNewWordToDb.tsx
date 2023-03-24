import {useEffect} from 'react'
import { db } from "../../..";
import { collection, addDoc, serverTimestamp, DocumentData, setDoc } from "firebase/firestore";
import { createTag, addWordIdxToTag  } from "../../../backend/crudFunctions";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { selectUserId } from "../../../store/slices/userSlice";
import { basicAddWordStructure, WordForm } from "./AddWordsWithSteps";
import { AdvanceMeanings, ExampleForServer, PartOfSpeechSelect, WordDb } from "../../types/word";
import { BaseExtendedFirebaseInstance } from 'react-redux-firebase';
import { nanoid } from '@reduxjs/toolkit';

interface Props {
    wordFields: WordForm
    changeWordSate:  React.Dispatch<React.SetStateAction<WordForm>>
}

const AddNewWordToDb = ({wordFields, changeWordSate}: Props) => {
    const userId = useAppSelector(state => selectUserId(state.user))

    const names: PartOfSpeechSelect[] = wordFields.translation.map(t => t.name)
    const translationObj: AdvanceMeanings = {}

    names.forEach(n => {
        const allTranslationGroupByName = wordFields.translation.filter(t => t.name === n && t.show)
        const translationClean = allTranslationGroupByName.map(g => g.translation.filter(t => t.show)).flat().map(t => t.name)
        const cleanEmptyString = translationClean.filter(s => s !== '')
    
        if(!translationObj[n]){
            translationObj[n] = {
                translation: cleanEmptyString
            }
        }
    })

              
    const clearExamples: ExampleForServer[] = wordFields.examples.map(ex => ({example: ex.example, translation: ex.translation}))

    const addNewWord = async () => {
        try {
            const docRef = await addDoc(collection(db, "words"), {
              uid: userId?.uid,
              word: wordFields.word,
              meaning: translationObj,
              examples: clearExamples,
              fastMeaning: wordFields.fastMeaning,
              level: 'low',
              points: 0,
              priority: 'low',
              repeat: true,
              createdAt: serverTimestamp()
            } as WordDb);
            console.log("Document written with ID: ", docRef.id);

            setDoc(docRef, {wordId: docRef.id}, { merge: true })

            // addTags(docRef.id)

            if(docRef.id){
                changeWordSate(prev =>({
                    word: '',
                    fastMeaning: '',
                    translation: [{
                        id: nanoid(),
                        name: 'none',
                        translation: [{
                            id: nanoid(),
                            name: '',
                            show: true
                        }],
                        show: true
                    }],
                    examples: [{
                        id: nanoid(),
                        example: '',
                        translation: '',
                        show: true
                    }],
                    tags: {
                        newTags: [{id: nanoid(), name: '', show: true}],
                        addedTags: []
                    },
                    validFields: {word: false, fastMeaning: false},
                    sendingData: false
                }))
            }

          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

//     const addTags = async (wordIdx: string) => {

//       let isOldTag = false

//       tags?.forEach(tagField => {
//         if((oldTags as DocumentData).length === 0){
//           createTag(user?.uid as string, tagField, wordIdx)
//         }
//         oldTags?.forEach((tag, idx) => {
//           console.log('Add Tag')
//           if(tagField === tag.name){
//             isOldTag = true
//             return addWordIdxToTag(tag.tagId, wordIdx)
//           }
          
//           if(oldTags.length-1 === idx && !isOldTag){
//             createTag(user?.uid as string, tagField, wordIdx)
//           };

//           if(oldTags.length-1 === idx && isOldTag){
//             isOldTag = !isOldTag
//           };
//         })
//       }
//     )
      
//   }

  useEffect(() => {
    wordFields.sendingData &&
    addNewWord()
  }, [wordFields.sendingData])
    return <div></div>;
}

export default AddNewWordToDb;