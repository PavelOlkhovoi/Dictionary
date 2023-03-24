import { db, auth } from "../../..";
import { collection, addDoc, serverTimestamp, query, where, updateDoc, DocumentData, setDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData} from 'react-firebase-hooks/firestore';
import { createTag, addWordIdxToTag  } from "../../../backend/crudFunctions";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { selectUserId } from "../../../store/slices/userSlice";
import { WordForm } from "./AddWordsWithSteps";
import { AdvanceMeanings, PartOfSpeechSelect } from "../../types/word";
import { TranslationGroup } from "./uiFields/TranslationGroup";

interface Props {
    wordFields: WordForm,
}

const AddNewWordToDb = ({wordFields}: Props) => {
    const userId = useAppSelector(state => selectUserId(state.user))
    if(!userId){
        return null
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

    console.log('Clean translation', translationObj)

    // const addNewWord = async () => {
    //     try {
    //         const docRef = await addDoc(collection(db, "words"), {
    //           uid: userId,
    //           word: wordFields.word,
    //           meaning: wordFields.translation.map(t => {t.name, t.translation, t.}),
    //           examples: wordFields.examples.map(ex => {ex.example, ex.translation}),
    //           level: 'low',
    //           points: 0,
    //           priority: 'low',
    //           repeat: true,
    //           createdAt: serverTimestamp()
    //         });
    //         console.log("Document written with ID: ", docRef.id);

    //         setDoc(docRef, {wordId: docRef.id}, { merge: true })

    //         // addTags(docRef.id)

    //       } catch (e) {
    //         console.error("Error adding document: ", e);
    //       }
    // }

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
    return <div></div>;
}

export default AddNewWordToDb;