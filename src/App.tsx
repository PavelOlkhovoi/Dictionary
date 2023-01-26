import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Word from './pages/words/Word';
import Words from './pages/words/Words';
import NotFound from './pages/NotFound';
import AddWord from './pages/words/AddWord';
import Navbars from './components/css-blocks/Navbars';
import WordEdit from './pages/words/WordEdit';
import AddText from './pages/texts/AddText';



function App() {

  return (
    <>
    <Navbars />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="words" element={<Words />} />
      <Route path="words/:idword" element={<Word />} />
      <Route path="words/edit/:idword" element={<WordEdit />} />
      <Route path="addwords" element={<AddWord />}/>
      <Route path="auth" element={<SignUp />} />

      <Route path="addtext" element={<AddText />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  );
}

export default App;
