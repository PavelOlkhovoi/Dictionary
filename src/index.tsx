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

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);


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

