import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Word from './pages/user/Word';
import Words from './pages/user/Words';
import NotFound from './pages/NotFound';



function App() {

  return (
    <>
    <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/auth">Auth</Link></li>
          <li><Link to="/words">Words</Link></li>
        </ul>
      </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth" element={<SignUp />} />
      <Route path="words" element={<Words />} />
      <Route path="words/:idword" element={<Word />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  );
}

export default App;
