import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HEADER from './components/header.jsx';
import FOOTER from './components/footer.jsx';
import HOME from './pages/home/home.jsx';
import TOPICS from './pages/topics/topics.jsx';
import SINLGENEWS from './pages/single.jsx';
import VIEWALL from './pages/listAll.jsx';
import SIGNUP from './pages/auth/signup.jsx';
import LOGIN from './pages/auth/login.jsx';
import NOTESFORM from './pages/notes/notes.jsx';
import NOTESDATA from './pages/notes/notesData.jsx';
import SEARCH from './pages/search.jsx';
import "bootstrap-icons/font/bootstrap-icons.css";
import notesImage from './notes.png';

function App() {
  return (
    <>
      <Router>
        <HEADER />
        <Routes>
          <Route path="/" element={<HOME />} />
          <Route path="/:topic" element={<TOPICS />} />
          <Route path="/auth/login" element={<LOGIN />} />
          <Route path="/auth/signup" element={<SIGNUP />} />
          <Route path="/news/:id" element={<SINLGENEWS />} />
          <Route path="/news/all/:topic" element={<VIEWALL />} />
          <Route path="/news/notes/" element={<NOTESFORM />} />
          <Route path="/news/notes/data" element={<NOTESDATA />} />
          <Route path="/news/search/:topic" element={<SEARCH />} />

        </Routes>

        <Link to={`/news/notes`}>
          <img 
            style ={{height:"50px",borderRadius:"50%"}}
            className="icon-position" 
            src={notesImage}
            alt="Read Full" 
          />
        </Link>

        <FOOTER />
      </Router>
    </>
  );
}

export default App;
