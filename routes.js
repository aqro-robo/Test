
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Petros from './pages/Petros';
import Reela from './pages/Reela';
import Sayra from './pages/Sayra';
import Zentrox from './pages/Zentrox';
import Nava from './pages/Nava';
import Azra from './pages/Azra';
import Mivara from './pages/Mivara';
import FaceBody from './pages/FaceBody';
import PersonalityBuilder from './pages/PersonalityBuilder';
import PromptTuner from './pages/PromptTuner';
import Zilat from './pages/Zilat';
import Drox from './pages/Drox';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/petros" element={<Petros />} />
        <Route path="/reela" element={<Reela />} />
        <Route path="/sayra" element={<Sayra />} />
        <Route path="/zentrox" element={<Zentrox />} />
        <Route path="/nava" element={<Nava />} />
        <Route path="/azra" element={<Azra />} />
        <Route path="/mivara" element={<Mivara />} />
        <Route path="/facebody" element={<FaceBody />} />
        <Route path="/personality" element={<PersonalityBuilder />} />
        <Route path="/prompt" element={<PromptTuner />} />
        <Route path="/zilat" element={<Zilat />} />
        <Route path="/drox" element={<Drox />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
