import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Word from './pages/words/Word';
import Words from './pages/words/Words';
import NotFound from './pages/NotFound';
import AddWord from './pages/words/AddWord';



function App() {

  return (
    <>
    <nav className='flex justify-center space-x-4 my-6'>
      <Link to="/">Home</Link>
      <Link to="/words">Words</Link>
      <Link to="/addwords">Add words</Link>
      <Link to="/auth">Auth</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
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
