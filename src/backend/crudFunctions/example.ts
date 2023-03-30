import { db } from '../..';
import { doc, updateDoc } from 'firebase/firestore';
import { ExampleForServer } from '../../pages/types/word';
import { store } from '../../store';
import { updateExample} from '../../store/slices/wordSlice';


export const updateExampleDB = async(wordid: string, examples: ExampleForServer[]) => {
    try {
      const wordRef = doc(db, "words", wordid);
      const res = await updateDoc(wordRef, {
        examples
      })

      console.log('Update example', res)
  
      store.dispatch(updateExample({id: wordid, examples}))
  
      } catch (error) {
        console.log("Word has not updated yet", error)
    }
  }