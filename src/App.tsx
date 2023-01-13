import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Word from './pages/words/Word';
import Words from './pages/words/Words';
import NotFound from './pages/NotFound';
import AddWord from './pages/words/AddWord';
import Navbars from './components/css-blocks/Navbars';
import InitialData from './components/data/InitialData';



function App() {

  return (
    <>
    <Navbars />
    <Routes>
      <Route path="/" element={<InitialData />} />
      <Route path="words" element={<Words />} />
      <Route path="words/:idword" element={<Word />} />
      <Route path="addwords" element={<AddWord />}/>
      <Route path="auth" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  );
}

export default App;
