import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './backend/config';
import { getFirestore } from "firebase/firestore";
import { BrowserRouter } from "react-router-dom"
import { getAuth } from "firebase/auth";
import { Provider } from 'react-redux';
import { store } from './store';
import {onAuthStateChanged} from "firebase/auth";
import { setUser } from './store/slices/userSlice';
import { FakeUser } from './store/slices/userSlice';
import { getUserWords } from './backend/crudFunctions/words';
import { fetchWords } from './store/slices/wordSlice';
import { fetchTags } from './store/slices/tagSlice';
import { fetchTexts } from './store/slices/textSlice';
import { fetchSets } from './store/slices/setSlice';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);


const testUser = () => {
  const user = auth.currentUser
    onAuthStateChanged(auth, user => {

        if(user){
          const {email, uid, photoURL} = user
          // const token = user.getIdToken()
          const newUser: FakeUser = {
            email: email as string,
            uid,
            token: 'test',
            photoURL

          }
          store.dispatch(setUser(newUser))
          store.dispatch(fetchWords(newUser.uid))
          store.dispatch(fetchTags(newUser.uid))
          store.dispatch(fetchTexts(newUser.uid))
          store.dispatch(fetchSets(newUser.uid))
          
          return user
        }
    
    return user
    })
}

testUser()


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);

