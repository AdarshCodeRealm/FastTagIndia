import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
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
import AboutUs from './pages/AboutUs'
import Resellers from './pages/Resellers'
import ApiDevelopers from './pages/ApiDevelopers'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const isLoading = usePageLoading();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/buy-fastag" element={<BuyFASTag />} />
        <Route path="/recharge-fastag" element={<RechargeFastag />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/toll-rates" element={<TollRates />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/resellers" element={<Resellers />} />
        <Route path="/api" element={<ApiDevelopers />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
