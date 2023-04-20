import { Routes, Route } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import './App.css';
import Authorization from './pages/Authorization';
import Words from './pages/words/Words';
import NotFound from './pages/NotFound';
import AddWord from './pages/words/AddWord';
import Navbars from './components/ui-elements/Navbars';
import AddText from './pages/texts/AddText';
import ListTexts from './pages/texts/ListTexts';
import SingleText from './pages/texts/SingleText';
import EditText from './pages/texts/EditText';
import AddSet from './pages/sets/AddSet';
import ListSets from './pages/sets/ListSets';
import SingleSet from './pages/sets/SingleSet';
import SetWordsToLern from './pages/exercise/SetWordsToLern';
import AddWordsWithSteps from './pages/words/wordsSteps/AddWordsWithSteps';
import BottomNavigation from './components/navigation/BottomNavigation';
import Word from './pages/words/Word';
import IsAuthorized from './HOCs/IsAuthorized';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import { auth } from '.';
import {onAuthStateChanged} from "firebase/auth";
import { FakeUser } from './store/slices/userSlice';
import { setUser } from './store/slices/userSlice';
import { fetchWords } from './store/slices/wordSlice';
import { fetchTags } from './store/slices/tagSlice';
import { fetchTexts } from './store/slices/textSlice';
import { fetchSets } from './store/slices/setSlice';
import { useEffect } from 'react';


function App() {
  const dispatch = useAppDispatch()
  const userStatus = useAppSelector(state => state.user.status)
  const wordsStatus = useAppSelector(state => state.word.status)
  const setStatus = useAppSelector(state => state.set.status)
  const textStatus = useAppSelector(state => state.text.status)

  const getInitialData = () => {
    const user = auth.currentUser
      onAuthStateChanged(auth, async (user) => {
  
          if(user){
            const {email, uid, photoURL} = user
            // const token = user.getIdToken()
            const newUser: FakeUser = {
              email: email as string,
              uid,
              token: 'test',
              photoURL
  
            }
  
            const res = await Promise.all([
              dispatch(setUser(newUser)), 
              dispatch(fetchWords(newUser.uid)),
              dispatch(fetchTags(newUser.uid)),
              dispatch(fetchTexts(newUser.uid)),
              dispatch(fetchSets(newUser.uid))
            ])

            console.log('All fetch', res)
            
            
            return user
          }
      
      return user
      })
  }

  useEffect(()=> {
    getInitialData()
  },[])
  

  if(userStatus === "pending" || wordsStatus === "pending" || setStatus === "pending" || textStatus === "pending"){
    return <h1>Загрузка</h1>
  }

  return (
    <>
    
    <Navbars />
    <BottomNavigation />

     <Routes>
      <Route path="/" element={<IsAuthorized><Words /></IsAuthorized>} />
      <Route path="auth" element={<Authorization />} />
      <Route path="addwordsSteps" element={<IsAuthorized><AddWordsWithSteps /></IsAuthorized>}/>
      <Route path="words/:idword" element={<IsAuthorized><Word /></IsAuthorized>} />
      <Route path="exercises/:idset" element={<IsAuthorized><SetWordsToLern /></IsAuthorized>}/>

      <Route path="addwords" element={<IsAuthorized><AddWord /></IsAuthorized>}/>

      <Route path='/texts'>
        <Route index element={<IsAuthorized><ListTexts /></IsAuthorized>} />
        <Route path=":idtext" element={<IsAuthorized><SingleText /></IsAuthorized>} />
        <Route path="edit/:idtext" element={<IsAuthorized><EditText /></IsAuthorized>} />
        <Route path="add" element={<IsAuthorized><AddText /></IsAuthorized>} />
      </Route>

      <Route path="/sets">
        <Route index element={<IsAuthorized><ListSets /></IsAuthorized>} />
        <Route path="add" element={<IsAuthorized><AddSet /></IsAuthorized>} />
        <Route path=":idtext" element={<IsAuthorized><SingleSet/></IsAuthorized>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>

  </>
  );
}

export default App;