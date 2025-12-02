import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoadingScreen } from './components/LoadingScreen'
import { usePageLoading } from './hooks/usePageLoading'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BuyFASTag from './pages/BuyFASTag'
import RechargeFastag from './pages/RechargeFastag'
import TrackOrder from './pages/TrackOrder'
import TermsConditions from './pages/TermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import TollRates from './pages/TollRates'
import Support from './pages/Support'
import Resellers from './pages/Resellers'
import ApiDevelopers from './pages/ApiDevelopers'

function AppContent() {
  const isLoading = usePageLoading();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/buy-fastag" element={<BuyFASTag />} />
        <Route path="/recharge-fastag" element={<RechargeFastag />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/toll-rates" element={<TollRates />} />
        <Route path="/support" element={<Support />} />
        <Route path="/resellers" element={<Resellers />} />
        <Route path="/api" element={<ApiDevelopers />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
