import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomeScreen from './Screens/Home';
import { Icon } from './Components/Icons';
import ArtworkScreen from './Screens/Artwork';
import ArtistScreen from './Screens/Artist';
import SearchScreen from './Screens/Search';
import ArtworkResultsScreen from './Screens/ArtworkResults';

function AnimatedRoutes() {
  const location = useLocation(); // track current route

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomeScreen /></PageWrapper>} />
        <Route path="/artwork/:artworkId" element={<PageWrapper><ArtworkScreen /></PageWrapper>} />
        <Route path="/artist/:artistId" element={<PageWrapper><ArtistScreen /></PageWrapper>} />
        <Route path="/search" element={<PageWrapper><SearchScreen /></PageWrapper>} />
        <Route path="/gallery/:galleryId" element={<PageWrapper><ArtworkResultsScreen /></PageWrapper>} />
        <Route path="/country/:countryId" element={<PageWrapper><ArtworkResultsScreen /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ x: '100%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: '-100%', opacity: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    style={{ position: 'absolute', width: '100%', height: '100%' }}
  >
    {children}
  </motion.div>
);


function App() {

  return (
    <Router>
      <div style={{ position: 'relative', overflow: 'hidden', height: 'calc(100vh - 60px)' }}>
        <AnimatedRoutes />
      </div>

      <nav>
        <Link to="/">
          <Icon icon="home" />
        </Link>
        <Link to="/search">
          <Icon icon="search" />
        </Link>
      </nav>
    </Router>
  );
}

export default App;
