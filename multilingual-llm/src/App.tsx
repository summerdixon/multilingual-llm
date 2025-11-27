import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import CambodiaLanding from './pages/CambodiaLanding.tsx'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/cambodia" element={<CambodiaLanding/>} />
      </Routes>
    </Router>
  )
}

export default App
