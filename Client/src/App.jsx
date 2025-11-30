import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BuyFASTag from './pages/BuyFASTag'
import RechargeFastag from './pages/RechargeFastag'
import TrackOrder from './pages/TrackOrder'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/buy-fastag" element={<BuyFASTag />} />
          <Route path="/recharge-fastag" element={<RechargeFastag />} />
          <Route path="/track-order" element={<TrackOrder />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
