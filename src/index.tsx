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
import {FakeUser, getUser} from './store/slices/userSlice'
import {onAuthStateChanged} from "firebase/auth";
import { setUser } from './store/slices/userSlice';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

store.dispatch(getUser())

// store.dispatch(getUser())

// const testUser = () => {
//   const user = auth.currentUser
//     onAuthStateChanged(auth, user => {
//       console.log('thunc User', user)

//         if(user){
//           const {email, uid } = user
//           // const token = user.getIdToken()
//           const newUser: FakeUser = {
//             email,
//             uid,
//             token: 'test'
//           }
//           store.dispatch(setUser(newUser))
//             return user
//         }
    
//     // console.log('thunc User', user)
//     return user
//     })
// }

// console.log(testUser())


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

