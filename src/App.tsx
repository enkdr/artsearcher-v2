import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './Components/Home';
import { Icon } from './Components/Icons';
import { getAllArtists, getAllGalleries, fetchAndStoreEntities } from './db'
import { useEffect, useState } from 'react';
import { Artist, Gallery } from './types';

function AnimatedRoutes() {
  const location = useLocation(); // track current route

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/artworks" element={<PageWrapper><h1>Artworks</h1></PageWrapper>} />
        <Route path="/artists" element={<PageWrapper><h1>Artists</h1></PageWrapper>} />
        <Route path="/galleries" element={<PageWrapper><h1>Galleries</h1></PageWrapper>} />
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


  // initialise IndexedDB and fetch data OR pull from existing data
  useEffect(() => {
    const init = async () => {
      try {

        await fetchAndStoreEntities();

        // custom calls from UI to get from indexedDB
        const artistData = await getAllArtists();
        const gallerytData = await getAllGalleries();

        setArtists(artistData);
        setGalleries(gallerytData);

      } catch (error) {
        setError("Error fetching artists from IndexedDB");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [artists, setArtists] = useState<Artist[]>([])
  const [galleries, setGalleries] = useState<Gallery[]>([])

  return (
    <Router>
      <div style={{ position: 'relative', overflow: 'hidden', height: 'calc(100vh - 60px)' }}>
        <AnimatedRoutes />
      </div>

      <nav>
        <Link to="/">
          <Icon icon="home" />
        </Link>
        <Link to="/artists">
          <Icon icon="artist" />
        </Link>
        <Link to="/artworks">
          <Icon icon="artwork" />
        </Link>
        <Link to="/galleries">
          <Icon icon="gallery" />
        </Link>
      </nav>
    </Router>
  );
}

export default App;
