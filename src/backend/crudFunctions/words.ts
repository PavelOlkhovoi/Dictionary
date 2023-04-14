import { db } from '../..';
import { collection, query, Timestamp, where, getDocs, addDoc, setDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { parseISO, formatDistanceToNow } from 'date-fns'
import { AdvanceMeanings, Repetition, WordDb } from '../../types/word';
import { Tag } from '../../types/word';
import { store } from '../../store';
import { addPointsAndChangeRepetition, addWord, updateFastMeaning, updateMeanings, updateWord, deleteWord } from '../../store/slices/wordSlice';

export const createFastWord = async(word: WordDb) => {
    try {
      const docRef = await addDoc(collection(db, "words"), word)

      console.log("Document written with ID: ", docRef.id);

      setDoc(docRef, {wordId: docRef.id}, { merge: true })
      const today = new Date().toDateString()

      store.dispatch(addWord({...word, wordId: docRef.id, createdAt: today}))

      return docRef.id
    } catch (error) {
      console.log(`The word ${word.word} has not been`, error)
    }
}

export const updateWordDb = async(wordid: string, word: string) => {
  try {
    const wordRef = doc(db, "words", wordid);
    const res = await updateDoc(wordRef, {
      word
    })

    store.dispatch(updateWord({
      id: wordid,
      newWord: word,
    }))

    } catch (error) {
      console.log("Word has not updated yet", error)
  }
}

export const deleteWordDb = async (wordId: string) => {
  try {
    await deleteDoc(doc(db, "words", wordId));
    store.dispatch(deleteWord({id: wordId}))
  } catch (error) {
    console.log("Set has not been deleted", error)
  }
}

export const updateUserFastMeaning = async(wordid: string, word: string, translation: string) => {
  try {
    const wordRef = doc(db, "words", wordid);
    const res = await updateDoc(wordRef, {
      fastMeaning: translation
    })

    store.dispatch(updateFastMeaning({
      id: wordid,
      word,
      translation,
    }))

    } catch (error) {
      console.log("Word has not updated yet", error)
  }
}

export const updatetMeaningDb = async(wordid: string, meaning: AdvanceMeanings) => {
  try {
    const wordRef = doc(db, "words", wordid);
    const res = await updateDoc(wordRef, {
      meaning
    })

    store.dispatch(updateMeanings({
      id: wordid,
      meanings: meaning
    }))

    } catch (error) {
      console.log("Word has not updated yet", error)
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

  export const addPointsToWord = async (wordid: string, currentPoints: number, repetition: Repetition) => {
    try {
      const wordRef = doc(db, "words", wordid);
      const res = await updateDoc(wordRef, {
        points: currentPoints + 3,
        repetition
      })
  
      store.dispatch(addPointsAndChangeRepetition({
        id: wordid,
        points: 3,
        repetition
      }))
  
      } catch (error) {
        console.log("Word has not updated yet", error)
    }
  }