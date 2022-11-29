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
    <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/auth">Auth</Link></li>
          <li><Link to="/words">Words</Link></li>
          <li><Link to="/addwords">Words</Link></li>
        </ul>
      </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth" element={<SignUp />} />
      <Route path="words" element={<Words />} />
      <Route path="words/:idword" element={<Word />} />
      <Route path="addwords" element={<AddWord />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  );
}

export default App;
