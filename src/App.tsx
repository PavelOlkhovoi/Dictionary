import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Word from './pages/words/Word';
import Words from './pages/words/Words';
import NotFound from './pages/NotFound';
import AddWord from './pages/words/AddWord';
import Navbars from './components/ui-elements/Navbars';
import WordEdit from './pages/words/WordEdit';
import AddText from './pages/texts/AddText';
import ListTexts from './pages/texts/ListTexts';
import SingleText from './pages/texts/SingleText';
import EditText from './pages/texts/EditText';
import AddSet from './pages/sets/AddSet';
import ListSets from './pages/sets/ListSets';
import SingleSet from './pages/sets/SingleSet';
import EditSet from './pages/sets/EditSet';
import SetWordsToLern from './pages/sets/SetWordsToLern';


function App() {

  return (
    <>
    <Navbars />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="words" element={<Words />} />
      <Route path="words/:idword" element={<Word />} />
      <Route path="words/edit/:idword" element={<WordEdit />} />
      <Route path="exercises" element={<SetWordsToLern />}/>
      {/* <Route path="exercises/:idset" element={<SetWordsToLern />}/> */}
      <Route path="addwords" element={<AddWord />}/>
      <Route path="auth" element={<SignUp />} />
      <Route path="texts" element={<ListTexts />} />
      <Route path="texts/:idtext" element={<SingleText />} />
      <Route path="texts/edit/:idtext" element={<EditText />} />
      <Route path="addtext" element={<AddText />} />
      <Route path="addSet" element={<AddSet />} />
      <Route path="sets/list" element={<ListSets />} />
      <Route path="sets/:idtext" element={<SingleSet />} />
      <Route path="sets/edit/:idtext" element={<EditSet />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  );
}

export default App;
