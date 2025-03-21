import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './Components/Home';
import { Icon } from './Components/Icons';
import Artworks from './Components/Artworks';
import Artists from './Components/Artists';

function AnimatedRoutes() {
  const location = useLocation(); // track current route

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        {/* <Route path="/artists" element={<PageWrapper><Artists /></PageWrapper>} />
        <Route path="/artworks" element={<PageWrapper><Artworks /></PageWrapper>} /> */}
        {/* <Route path="/search" element={<PageWrapper><Search /></PageWrapper>} /> */}

        {/* <Route path="/galleries" element={<PageWrapper><h1>Galleries</h1></PageWrapper>} /> */}
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
          <Icon icon="location" />
        </Link>
        <Link to="/artists">
          <Icon icon="artist" />
        </Link>
        <Link to="/artworks">
          <Icon icon="artwork" />
        </Link>
        {/* <Link to="/search">
          <Icon icon="search" />
        </Link> */}
        {/* <Link to="/galleries">
          <Icon icon="gallery" />
        </Link> */}
      </nav>
    </Router>
  );
}

export default App;
