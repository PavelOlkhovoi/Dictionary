import { db } from '../..';
import { collection, query, Timestamp, where, getDocs } from 'firebase/firestore';
import { parseISO, formatDistanceToNow } from 'date-fns'
import { WordDb } from '../../pages/types/word';
import { Tag } from '../../pages/types/word';


export const getUserWords = async (userid: string) => {
    try {
      const wordRef = collection(db, "words");
      const query_ = query(wordRef, where("uid", "==", userid));
      const querySnapshot = await getDocs(query_);

      if(querySnapshot.empty){throw "The empty array of words returned"} 

      const allWords = [] as WordDb[]
      querySnapshot.forEach((doc) => {
        allWords.push(doc.data() as WordDb)
      });

      const result = allWords.map(el => {
        const date = parseISO((el.createdAt as Timestamp).toDate().toISOString())
        const timePeriod = formatDistanceToNow(date)
        return{
          ...el,
          createdAt: timePeriod
        }
      })

    return result
      
    } catch (error) {
      return new Promise((resolve, rejects) => {
        rejects(error)
      })
    }

  }


  export const fetchUserTags = async (uid: string) => {
    try {
      const tagsId = collection(db, 'ts')
      const query_ = query(tagsId, where("userId", "==", uid))
      const querySnapshot= await getDocs(query_)

      if(querySnapshot.empty) { throw 'The empty array of tags returned' }
      
      const allTags = [] as Tag[]
      querySnapshot.forEach((doc) => {
      allTags.push(doc.data() as Tag)

      return allTags
    });
    } catch (error) {
      return new Promise((resolve, rejects) => {
        rejects(error)
      })
    }
  }