import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
