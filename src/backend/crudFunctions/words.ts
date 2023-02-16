import { db } from '../..';
import { collection, query, Timestamp, where, getDocs, addDoc, setDoc, doc, updateDoc } from 'firebase/firestore';
import { parseISO, formatDistanceToNow } from 'date-fns'
import { WordDb } from '../../pages/types/word';
import { Tag } from '../../pages/types/word';
import { store } from '../../store';
import { addWord, updateFastMeaning } from '../../store/slices/wordSlice';

export const createFastWord = async(word: WordDb) => {
    try {
      const docRef = await addDoc(collection(db, "words"), word)

      console.log("Document written with ID: ", docRef.id);

      setDoc(docRef, {wordId: docRef.id}, { merge: true })

      store.dispatch(addWord({...word, wordId: docRef.id}))

      return docRef.id
    } catch (error) {
      console.log(`The word ${word.word} has not been`, error)
    }
}

export const updateUserFastMeaning = async(wordid: string, name: string, translation: string) => {
  try {
    console.log("Start updateRespond")
    const wordRef = doc(db, "words", wordid);
    const res = await updateDoc(wordRef, {
      word: name,
      fastMeaning: translation
    })

    console.log("Respond", res)

    store.dispatch(updateFastMeaning({
      id: wordid,
      name,
      translation
    }))


    } catch (error) {
      console.log("Error Fail", error)
  }
}

export const addManyWords = async(words: WordDb[]) => {
  const idsResArr: string[] = []
   for(const word of words ){
      const res = await createFastWord(word)
      idsResArr.push(res as string)
   }

   return idsResArr
}

export const getUserWords = async (userid: string) => {
    try {
      const wordRef = collection(db, "words");
      const query_ = query(wordRef, where("uid", "==", userid));
      const querySnapshot = await getDocs(query_);

      if(querySnapshot.empty){throw "The empty array of words has been returned"} 

      const allWords = [] as WordDb[]
      querySnapshot.forEach((doc) => {
        const word = doc.data()
        const changedData = parseISO((word.createdAt as Timestamp).toDate().toISOString())
        word.createdAt = changedData.toISOString()
        console.log('Test change time', changedData)
        allWords.push(word as WordDb)
      });

    return allWords
      
    } catch (error) {
      return new Promise((resolve, rejects) => {
        rejects(error)
      })
    }

  }


  export const fetchUserTags = async (uid: string) => {
    try {
      const tagsId = collection(db, 'tags')
      const query_ = query(tagsId, where("userId", "==", uid))
      const querySnapshot= await getDocs(query_)

      if(querySnapshot.empty) { throw 'The empty array of tags returned' }

      const allTags = [] as Tag[]
      querySnapshot.forEach((doc) => {
        allTags.push(doc.data() as Tag)
      });

      return allTags
    } catch (error) {
      return new Promise((resolve, rejects) => {
        rejects(error)
      })
    }
  }