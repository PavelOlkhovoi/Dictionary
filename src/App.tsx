import { Routes, Route } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import './App.css';
import Home from './pages/Home';
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



function App() {

  return (
    <>

    <Navbars />
    <BottomNavigation />

    {/* // TODO: I can't refactor routes. I have an error presumably with circular dependencies */}
    {/* <AppRouter /> */}

     <Routes>
      <Route path="/" element={<IsAuthorized><Words /></IsAuthorized>} />
      <Route path="auth" element={<Home />} />
      <Route path="addwordsSteps" element={<IsAuthorized><AddWordsWithSteps /></IsAuthorized>}/>
      <Route path="words/:idword" element={<IsAuthorized><Word /></IsAuthorized>} />
      <Route path="exercises/:idset" element={<IsAuthorized><SetWordsToLern /></IsAuthorized>}/>

      {/* // TODO: Can't delete the route because of circular dependencies */}
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
        <Route path=":idtext" element={<IsAuthorized></IsAuthorized>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  );
}

export default App;