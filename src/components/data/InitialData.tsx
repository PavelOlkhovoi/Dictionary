import {useEffect, useState} from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { collection, DocumentData, query, Timestamp, where } from 'firebase/firestore';
import {onAuthStateChanged} from "firebase/auth";
import { db, auth } from '../..';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { setUser } from '../../store/slices/userSlice';
import Home from '../../pages/Home';
import { getDocs } from "firebase/firestore";
import { WordDb } from '../../pages/types/word';
import { setWords } from '../../store/slices/wordSlice';
import { parseISO, formatDistanceToNow } from 'date-fns'


const InitialData = () => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const dispatch = useAppDispatch()

    const authMonitor = async () => {
        onAuthStateChanged(auth, user => {
          if(user){
            setCurrentUser(user)
            dispatch(setUser({
              email: user.email,
              id: user.uid,
              token: user.refreshToken
            }))
          }
          else {
            console.log('Else', user)
          }
        })
      }


    const getUserWords = async () => {
      const wordRef = collection(db, "words");
            const query_ = query(wordRef, where("uid", "==", currentUser?.uid));
            const querySnapshot = await getDocs(query_);
            const allWords = [] as WordDb[]
            querySnapshot.forEach((doc) => {
              allWords.push(doc.data() as WordDb)
            });

            const test = allWords.map(el => {
              const date = parseISO((el.createdAt as Timestamp).toDate().toISOString())
              const timePeriod = formatDistanceToNow(date)
              return{
                ...el,
                createdAt: timePeriod
              }

            })
            // console.log("TTTTTT", test)
            dispatch(setWords(test))
    }

      
    useEffect(()=> {
        authMonitor()
        if(currentUser){
            getUserWords()
        }
    },[currentUser])


    if(!currentUser){
        return <h1>You need to auth</h1>
    }

    return <Home />
}


export default InitialData;