import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.tsx'
import Cambodia from './pages/Cambodia.tsx'
import CommunityCenter from './pages/CommunityCenter.tsx'
import Listen from './pages/Listen.tsx'
import Look from './pages/Look.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cambodia" element={<Cambodia/>} />
        <Route path="/cambodia/community" element={<CommunityCenter/>} />
        <Route path="/cambodia/community/listen" element={<Listen/>} />
        <Route path="/cambodia/community/look" element={<Look/>} />
      </Routes>
    </Router>
  )
}

export default App
