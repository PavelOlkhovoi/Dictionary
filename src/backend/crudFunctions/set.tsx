import { db } from '../..';
import { collection, query, Timestamp, arrayUnion, where, getDocs, addDoc, setDoc, doc, updateDoc, arrayRemove, deleteDoc} from 'firebase/firestore';
import { parseISO, formatDistanceToNow } from 'date-fns'
import { Set } from '../../types/word';
import { store } from '../../store';
import { addSet, deleteSet, deleteWordFromSet, deleteWordIdFromRepeatArr, updateSet,
  restartRepeatReduxSet, addTextIdToTextArrRedux, deleteTextIdFromTextArrRedux
} from '../../store/slices/setSlice';

export const createUserSet = async (set: Set) => {
    try {
        const docRef = await addDoc(collection(db, "sets"), set)
  
        console.log("Document written with ID: ", docRef.id);
  
        setDoc(docRef, {setId: docRef.id}, { merge: true })

        const today = new Date().toISOString()
        console.log("Testt today", today)

        store.dispatch(addSet({
          setId: docRef.id,
          wordsIds: set.wordsIds,
          repeatIds: set.wordsIds,
          name: set.name,
          uid: set.uid,
          createdAt: today,
          textIds: [],
          source: set.source
        }))

      } catch (error) {
        console.log('Set has not been added', error)

      }
}

export const updateUserSet = async (setId: string, name: string, source: string | null = null, wordsIds: string[]) => {
  try {
    const setRef = doc(db, "sets", setId);
    const res = await updateDoc(setRef, {
      wordsIds,
      source,
      name,
    })

    store.dispatch(updateSet({
      id: setId,
      wordIdx: wordsIds,
      title: name,
      source
    }))

    } catch (error) {
      console.log("Error Fail", error)
  }
}


export const getUserSets = async (uid: string) => {
  try {
    const setRef = collection(db, "sets");
    const query_ = query(setRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(query_);

    if(querySnapshot.empty){throw "The empty array of sets has been returned"} 

    const allSets: Set[] = []
    querySnapshot.forEach((doc) => {
      const set = doc.data()
      const changedData = parseISO((set.createdAt as Timestamp).toDate().toISOString())
      set.createdAt = changedData.toISOString()
      allSets.push(set as Set)
    });

  return allSets as Set[]
    
  } catch (error) {
    return new Promise((resolve, rejects) => {
      rejects(error)
    })
  }
}

export const restartRepeatArrInSet = async (setId: string,  wordsIds: string[]) => {
  try {
    const setRef = doc(db, "sets", setId);
    const res = await updateDoc(setRef, {
      repeatIds: wordsIds
    })

    store.dispatch(restartRepeatReduxSet({
      setId,
      repeatIds: wordsIds
    }))

    } catch (error) {
      console.log("Error Fail", error)
  }
}

export const deleteWordInsiteSet = async (setId: string, wordId: string) => {
  try {
    const setRef = doc(db, "sets", setId);
      await updateDoc(setRef, {
      word_id: arrayRemove(wordId)
    })

    store.dispatch(deleteWordFromSet({setId, wordId}))
  } catch (error) {
    console.log('Word id has not been removed from set', error)
  }
}


export const addTextIdToTextArr = async (setId: string, textId: string) => {
  try {
    const setRef = doc(db, "sets", setId);
      await updateDoc(setRef, {
        textIds: arrayUnion(textId)
    })

    store.dispatch(addTextIdToTextArrRedux({setId, textId}))
  } catch (error) {
    console.log('Word id has not been removed from set', error)
  }
}

export const deleteTextIdFromTextArr = async (setId: string, textId: string) => {
  try {
    const setRef = doc(db, "sets", setId);
      await updateDoc(setRef, {
        textIds: arrayRemove(textId)
    })

    store.dispatch(deleteTextIdFromTextArrRedux({setId, textId}))
  } catch (error) {
    console.log('Word id has not been removed from set', error)
  }
}

export const deleteIdInRepeatArr = async (setId: string, wordId: string) => {
  try {
    const setRef = doc(db, "sets", setId);
      await updateDoc(setRef, {
        repeatIds: arrayRemove(wordId)
    })

    store.dispatch(deleteWordIdFromRepeatArr({setId, wordId}))
  } catch (error) {
    console.log('Word id has not been removed from set', error)
  }
}


export const deleteUserSet = async (setId: string) => {
  try {
    await deleteDoc(doc(db, "sets", setId));
    store.dispatch(deleteSet({id:setId}))
  } catch (error) {
    console.log("Set has not been deleted", error)
  }
}