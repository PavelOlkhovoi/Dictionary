import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
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
import EditSet from './pages/sets/EditSet';
import SetWordsToLern from './pages/exercise/SetWordsToLern';
import AddWordsWithSteps from './pages/words/wordsSteps/AddWordsWithSteps';


function App() {

  return (
    <>
    <Navbars />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="words" element={<Words />} />
      <Route path="exercises/:idset" element={<SetWordsToLern />}/>
      <Route path="addwords" element={<AddWord />}/>
      <Route path="addwordsSteps" element={<AddWordsWithSteps />}/>
      <Route path="auth" element={<SignUp />} />
      <Route path='/texts'>
        <Route index element={<ListTexts />} />
        <Route path=":idtext" element={<SingleText />} />
        <Route path="edit/:idtext" element={<EditText />} />
        <Route path="add" element={<AddText />} />
      </Route>
      <Route path="/sets">
        <Route index element={<ListSets />} />
        <Route path="add" element={<AddSet />} />
        <Route path=":idtext" element={<SingleSet />} />
        <Route path="edit/:idtext" element={<EditSet />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  );
}

export default App;