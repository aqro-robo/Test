import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Petros from './pages/Petros';
import Reela from './pages/Reela';
import Drox from './pages/Drox';
import Sayra from './pages/Sayra';
import Nava from './pages/Nava';
import Zentrox from './pages/Zentrox';
import Zilat from './pages/Zilat';
import Azra from './pages/Azra';
import Mivara from './pages/Mivara';
import FaceBody from './pages/FaceBody';
import PromptTuner from './pages/PromptTuner';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
        <nav style={{ padding: '1rem', background: '#111', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Link to="/petros">Petros</Link>
          <Link to="/reela">Reela</Link>
          <Link to="/drox">Drox</Link>
          <Link to="/sayra">Sayra</Link>
          <Link to="/nava">Nava</Link>
          <Link to="/zentrox">Zentrox</Link>
          <Link to="/zilat">Zilat</Link>
          <Link to="/azra">Azra</Link>
          <Link to="/mivara">Mivara</Link>
          <Link to="/facebody">Face & Body</Link>
          <Link to="/prompt">Prompt Tuner</Link>
          <Link to="/auth">Auth</Link>
        </nav>

        <Routes>
          <Route path="/petros" element={<Petros />} />
          <Route path="/reela" element={<Reela />} />
          <Route path="/drox" element={<Drox />} />
          <Route path="/sayra" element={<Sayra />} />
          <Route path="/nava" element={<Nava />} />
          <Route path="/zentrox" element={<Zentrox />} />
          <Route path="/zilat" element={<Zilat />} />
          <Route path="/azra" element={<Azra />} />
          <Route path="/mivara" element={<Mivara />} />
          <Route path="/facebody" element={<FaceBody />} />
          <Route path="/prompt" element={<PromptTuner />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;