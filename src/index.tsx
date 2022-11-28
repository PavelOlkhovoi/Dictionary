import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './backend/config';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log('Initialize')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);

