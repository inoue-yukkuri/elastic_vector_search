import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import UploadPage from './components/UploadPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
