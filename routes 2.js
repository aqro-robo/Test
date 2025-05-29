import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sayra from './pages/Sayra';
import Zentrox from './pages/Zentrox';
import Nava from './pages/Nava';
import Azra from './pages/Azra';
import Mivara from './pages/Mivara';
import FaceBodyAI from './pages/FaceBodyAI';
import PersonalityBuilder from './pages/PersonalityBuilder';
import Zilat from './pages/Zilat';
import PromptTuner from './pages/PromptTuner';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/sayra" element={<Sayra />} />
      <Route path="/zentrox" element={<Zentrox />} />
      <Route path="/nava" element={<Nava />} />
      <Route path="/azra" element={<Azra />} />
      <Route path="/mivara" element={<Mivara />} />
      <Route path="/facebody" element={<FaceBodyAI />} />
      <Route path="/personality" element={<PersonalityBuilder />} />
      <Route path="/zilat" element={<Zilat />} />
      <Route path="/prompt" element={<PromptTuner />} />
    </Routes>
  );
}

export default AppRoutes;
