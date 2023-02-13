import { db } from '../..';
import { collection, query, Timestamp, serverTimestamp, where, getDocs, addDoc, setDoc, doc, updateDoc} from 'firebase/firestore';
import { parseISO, formatDistanceToNow } from 'date-fns'
import { Set } from '../../pages/types/word';
import { store } from '../../store';
import { addSet, updateSet } from '../../store/slices/setSlice';

export const createUserSet = async (set: Set) => {
    try {
        const docRef = await addDoc(collection(db, "sets"), set)
  
        console.log("Document written with ID: ", docRef.id);
  
        console.log('Data', set)
        setDoc(docRef, {setId: docRef.id}, { merge: true })

        // const date = parseISO((set.createdAt as Timestamp).toDate().toISOString())
        // const timePeriod = formatDistanceToNow(date)

        store.dispatch(addSet({
          setId: docRef.id,
          wordsIds: set.wordsIds,
          name: set.name,
          uid: set.uid,
          createdAt: 'today',
          sourse: set.sourse,
        }))


  
      } catch (error) {
        console.log('Set has not been added', error)

      }
}

export const updateUserSet = async (setId: string, name: string, suorce: string | null = null, wordsIds: string[]) => {
  try {
    const setRef = doc(db, "sets", setId);
    const res = await updateDoc(setRef, {
      wordsIds: wordsIds,
      suorce
    })

    store.dispatch(updateSet({
      id: setId,
      wordIdx: wordsIds,
      title: name,
      source: suorce
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
      allSets.push(doc.data() as Set)
    });

    const result = allSets.map(el => {
      const date = parseISO((el.createdAt as Timestamp).toDate().toISOString())
      const timePeriod = formatDistanceToNow(date)
      return{
        ...el,
        createdAt: timePeriod
      }
    })

  return result as Set[]
    
  } catch (error) {
    return new Promise((resolve, rejects) => {
      rejects(error)
    })
  }
}