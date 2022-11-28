import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log("Hi", process.env.REACT_APP_TEST)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);

