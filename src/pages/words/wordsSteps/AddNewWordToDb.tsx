import {useEffect, useState} from 'react'
import { db } from "../../..";
import { collection, addDoc, serverTimestamp, DocumentData, setDoc } from "firebase/firestore";
import { createTag, addWordIdxToTag  } from "../../../backend/crudFunctions";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { selectUserId } from "../../../store/slices/userSlice";
import { basicAddWordStructure, WordForm } from "./AddWordsWithSteps";
import { AdvanceMeanings, ExampleForServer, PartOfSpeechSelect, WordDb } from "../../types/word";
import { BaseExtendedFirebaseInstance } from 'react-redux-firebase';
import { nanoid } from '@reduxjs/toolkit';
import Notification from "../../../components/ui-elements/Notification"

interface Props {
    wordFields: WordForm
    changeWordSate:  React.Dispatch<React.SetStateAction<WordForm>>
}

const AddNewWordToDb = ({wordFields, changeWordSate}: Props) => {
    const userId = useAppSelector(state => selectUserId(state.user))
    const [showNotification, setShowNotification] = useState({
        word: false,
        tag: false,
        message: "New word was added"
    })

    const stopShowingWord = () => {
        setShowNotification(prev => ({...prev, word: false}))
    }

    const stopShowingTag = () => {
        setShowNotification(prev => ({...prev, tag: false}))
    }

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
              fastMeaning: wordFields.meaning,
              level: 'low',
              points: 0,
              priority: 'low',
              repeat: true,
              createdAt: serverTimestamp()
            } as WordDb);
            console.log("Document written with ID: ", docRef.id);

            setDoc(docRef, {wordId: docRef.id}, { merge: true })
            setShowNotification(prev => ({...prev, word: true, message: `${wordFields.word} was successfully added`}))

            if(docRef.id){
                changeWordSate(prev =>({
                    word: '',
                    meaning: '',
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
                    validFields: {word: false, meaning: false},
                    sendingData: false
                }))

                addTags(docRef.id)
            }


          } catch (e) {
            setShowNotification(prev => ({...prev, show: true, message: "The word was not added"}))
            console.error("Error adding document: ", e);
          }
    }

    const addTags = async (wordIdx: string) => {
      wordFields.tags.addedTags.length > 0 && 
      wordFields.tags.addedTags.filter(t => t.show).forEach(t => addWordIdxToTag(t.tagId, wordIdx))

      const newTags = wordFields.tags.newTags.filter(t => t.show).filter(t => t.name !== '')

      try {

        if(newTags.length > 0){
            for (const tag of newTags) {
                const result = await createTag(userId?.uid as string, tag.name, wordIdx)
              }
        setShowNotification(prev => ({...prev, tag: true, message: `${wordFields.word} with tag was added`}))
        } 
                
    } catch (error) {
        setShowNotification(prev => ({...prev, tag: true, message: `Tag was not added`}))
    }
      
        
    }

    useEffect(() => {
        wordFields.sendingData &&
        addNewWord()
    }, [wordFields.sendingData])

    return (
        <>
        {
            showNotification.word && <Notification message={showNotification.message} stopShowing={stopShowingWord}/>
        }
        {
            showNotification.tag && <Notification message={showNotification.message} stopShowing={stopShowingTag}/>
        }
        </>
    )
}

export default AddNewWordToDb;