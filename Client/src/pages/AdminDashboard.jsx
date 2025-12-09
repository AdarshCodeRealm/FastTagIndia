import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Users, 
  Shield, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Car,
  UserCheck,
  Database,
  Activity,
  Home,
  Menu,
  X,
  HelpCircle,
  BarChart3,
  Wallet,
  Globe,
  ChevronDown
} from 'lucide-react'
import apiService from '../services/api'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [adminData, setAdminData] = useState(null)
  const [activeSection, setActiveSection] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [dashboardStats, setDashboardStats] = useState(null)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  // Navigation items
  const navigationItems = [
    {
      id: 'overview',
      name: 'Dashboard',
      icon: Activity,
      description: 'Overview and analytics',
      badge: null
    },
    {
      id: 'users',
      name: 'User Management',
      icon: Users,
      description: 'Manage user accounts',
      badge: '15.4K'
    },
    {
      id: 'kyc',
      name: 'KYC Verification',
      icon: UserCheck,
      description: 'Document verification',
      badge: '245'
    },
    {
      id: 'transactions',
      name: 'Transactions',
      icon: CreditCard,
      description: 'Payment monitoring',
      badge: null
    },
    {
      id: 'fastag',
      name: 'FASTag Orders',
      icon: Car,
      description: 'Order management',
      badge: null
    },
    {
      id: 'support',
      name: 'Support Center',
      icon: FileText,
      description: 'Customer support',
      badge: '18'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      description: 'Reports and insights',
      badge: null
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: Wallet,
      description: 'Revenue and payouts',
      badge: null
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      description: 'System configuration',
      badge: null
    }
  ]

  // Mock data for dashboard
  const mockDashboardStats = {
    totalUsers: 15420,
    activeUsers: 12350,
    pendingKYC: 245,
    totalTransactions: 89650,
    totalRevenue: 2450000,
    supportTickets: 18
  }

  const mockUsers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '+91 9876543210',
      status: 'active',
      kycStatus: 'verified',
      fastagCount: 2,
      balance: 1250,
      lastLogin: '2024-12-08',
      joinedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '+91 8765432109',
      status: 'active',
      kycStatus: 'pending',
      fastagCount: 1,
      balance: 850,
      lastLogin: '2024-12-07',
      joinedDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit@example.com',
      phone: '+91 7654321098',
      status: 'inactive',
      kycStatus: 'verified',
      fastagCount: 3,
      balance: 2100,
      lastLogin: '2024-11-25',
      joinedDate: '2024-01-08'
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      email: 'sneha@example.com',
      phone: '+91 6543210987',
      status: 'active',
      kycStatus: 'rejected',
      fastagCount: 0,
      balance: 0,
      lastLogin: '2024-12-06',
      joinedDate: '2024-03-12'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      phone: '+91 5432109876',
      status: 'suspended',
      kycStatus: 'verified',
      fastagCount: 1,
      balance: 450,
      lastLogin: '2024-11-30',
      joinedDate: '2024-02-05'
    }
  ]

  // Initialize admin session and fetch data
  useEffect(() => {
    const initializeAdmin = async () => {
      console.log('🔐 Initializing admin dashboard...')
      try {
        // Check if admin is logged in
        const adminSession = localStorage.getItem('admin_session')
        if (!adminSession) {
          console.log('❌ No admin session found, redirecting to login')
          navigate('/admin/login')
          return
        }

        try {
          const admin = JSON.parse(adminSession)
          console.log('✅ Admin session found:', admin.name)
          setAdminData(admin)
        } catch (parseError) {
          console.error('❌ Failed to parse admin session:', parseError)
          navigate('/admin/login')
          return
        }

        // Fetch dashboard stats
        await fetchDashboardData()
      } catch (err) {
        console.error('❌ Admin initialization error:', err)
        setError('Failed to initialize dashboard')
      } finally {
        setIsLoadingData(false)
      }
    }

    initializeAdmin()
  }, [navigate])

  const fetchDashboardData = async () => {
    try {
      console.log('📊 Fetching dashboard stats...')
      console.log('ℹ️ Note: Admin endpoints are optional. The dashboard will use mock data if backend is unavailable.')
      
      // Try to fetch from backend, fallback to mock data
      try {
        const statsResponse = await apiService.getAdminDashboardStats()
        if (statsResponse.success) {
          console.log('✅ Dashboard stats fetched from backend')
          setDashboardStats(statsResponse.data)
        } else {
          console.log('ℹ️ Using mock dashboard stats (backend endpoint not implemented yet)')
          setDashboardStats(mockDashboardStats)
        }
      } catch (err) {
        console.log('ℹ️ Backend admin endpoints not available, using mock dashboard data. To use real data, implement the backend endpoints.')
        setDashboardStats(mockDashboardStats)
      }

      // Try to fetch users, fallback to mock data
      try {
        const usersResponse = await apiService.getUsers(1, 10)
        if (usersResponse.success) {
          console.log('✅ Users fetched from backend')
          setUsers(usersResponse.data.users || [])
        } else {
          console.log('ℹ️ Using mock users data (backend endpoint not implemented yet)')
          setUsers(mockUsers)
        }
      } catch (err) {
        console.log('ℹ️ Backend admin endpoints not available, using mock users data. To use real data, implement the backend endpoints.')
        setUsers(mockUsers)
      }
    } catch (err) {
      console.error('❌ Error fetching dashboard data:', err)
      setError('Failed to load dashboard data')
    }
  }

  const handleLogout = async () => {
    console.log('👋 Admin logging out...')
    try {
      setIsLoadingData(true)

      // Try to call logout API
      try {
        await apiService.logout()
        console.log('✅ Logout API call successful')
      } catch (err) {
        console.log('⚠️ Logout API call failed, continuing with local logout:', err.message)
      }

      // Clear all session data
      localStorage.removeItem('admin_session')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      sessionStorage.clear()
      
      console.log('✅ Admin session cleared, redirecting to login')
      
      // Use a small delay to ensure localStorage is cleared before redirect
      setTimeout(() => {
        navigate('/admin/login', { replace: true })
      }, 100)
    } catch (err) {
      console.error('❌ Logout error:', err)
      // Force redirect even if error occurs
      localStorage.clear()
      sessionStorage.clear()
      
      setTimeout(() => {
        window.location.href = '/admin/login'
      }, 100)
    } finally {
      setIsLoadingData(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { variant: 'default', className: 'bg-green-100 text-green-800 border-green-200' },
      inactive: { variant: 'secondary', className: 'bg-gray-100 text-gray-800 border-gray-200' },
      suspended: { variant: 'destructive', className: 'bg-red-100 text-red-800 border-red-200' }
    }
    return statusConfig[status] || statusConfig.inactive
  }

  const getKYCBadge = (kycStatus) => {
    const kycConfig = {
      verified: { variant: 'default', className: 'bg-green-100 text-green-800 border-green-200' },
      pending: { variant: 'secondary', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      rejected: { variant: 'destructive', className: 'bg-red-100 text-red-800 border-red-200' }
    }
    return kycConfig[kycStatus] || kycConfig.pending
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm)
    
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  if (isLoadingData || !adminData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">{error}</p>
          <Button onClick={() => navigate('/admin/login')} className="mt-4">
            Return to Login
          </Button>
        </div>
      </div>
    )
  }

  const renderMainContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Users</p>
                      <p className="text-3xl font-bold text-slate-900">{dashboardStats?.totalUsers?.toLocaleString() || '0'}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+12%</span>
                    <span className="text-slate-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Active Users</p>
                      <p className="text-3xl font-bold text-slate-900">{dashboardStats?.activeUsers?.toLocaleString() || '0'}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+8%</span>
                    <span className="text-slate-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-emerald-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                      <p className="text-3xl font-bold text-slate-900">₹{(dashboardStats?.totalRevenue / 100000 || 0).toFixed(1)}L</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+15%</span>
                    <span className="text-slate-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Pending KYC</p>
                      <p className="text-3xl font-bold text-slate-900">{dashboardStats?.pendingKYC || '0'}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                    <span className="text-orange-600 font-medium">Requires attention</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity & Status Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-slate-600" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest user registrations and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-slate-900">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                        <Badge {...getStatusBadge(user.status)} className="text-xs">
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-slate-600" />
                    System Status
                  </CardTitle>
                  <CardDescription>Current system health and statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">Payment Gateway</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">KYC Service</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">Notification Service</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                        Running
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">Database</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                        Healthy
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-slate-600" />
                      User Management
                    </CardTitle>
                    <CardDescription>Manage registered users and their accounts</CardDescription>
                  </div>
                  <Button className="bg-slate-900 hover:bg-slate-800">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        placeholder="Search users by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      className="px-3 py-2 border border-slate-200 rounded-md text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                    <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left p-4 font-semibold text-slate-700">User</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Contact</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                        <th className="text-left p-4 font-semibold text-slate-700">KYC</th>
                        <th className="text-left p-4 font-semibold text-slate-700">FASTags</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Balance</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Last Login</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-slate-700">
                                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{user.name}</p>
                                <p className="text-sm text-slate-500">ID: {user.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-sm text-slate-900">{user.email}</p>
                              <p className="text-sm text-slate-500">{user.phone}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge {...getStatusBadge(user.status)} className="text-xs">
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge {...getKYCBadge(user.kycStatus)} className="text-xs">
                              {user.kycStatus}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-slate-900 font-medium">{user.fastagCount}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-slate-900 font-medium">₹{user.balance}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-slate-500">{user.lastLogin}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100">
                                <Eye className="h-4 w-4 text-slate-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100">
                                <Edit className="h-4 w-4 text-slate-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">No users found matching your criteria</p>
                    <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter settings</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Coming Soon</h3>
              <p className="text-slate-500">This section is under development</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${sidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 flex-shrink-0">
          {!sidebarCollapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-slate-900 rounded-lg p-1.5">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">
                FasTag<span className="text-orange-600">India</span>
              </span>
            </Link>
          )}
          
          {sidebarCollapsed && (
            <div className="bg-slate-900 rounded-lg p-1.5 mx-auto">
              <Car className="h-6 w-6 text-white" />
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Admin Info */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-slate-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{adminData?.name || 'Admin'}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{adminData?.role || 'administrator'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation - Scrollable */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setMobileSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'} ${sidebarCollapsed ? 'mx-auto' : ''}`} />
                
                {!sidebarCollapsed && (
                  <>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${isActive ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>
                        {item.name}
                      </p>
                      <p className={`text-xs ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                        {item.description}
                      </p>
                    </div>
                    
                    {item.badge && (
                      <Badge variant={isActive ? 'secondary' : 'outline'} className={`text-xs ${
                        isActive ? 'bg-white/20 text-white border-white/30' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 space-y-2 flex-shrink-0">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500">
              <Globe className="h-4 w-4" />
              <span>System Status: Online</span>
            </div>
          )}
          
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex items-center justify-center w-full px-3 py-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
            {!sidebarCollapsed && <span className="ml-2 text-sm">Collapse</span>}
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        {/* Top Header - Fixed */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  {navigationItems.find(item => item.id === activeSection)?.name || 'Dashboard'}
                </h1>
                <p className="text-sm text-slate-500">
                  {navigationItems.find(item => item.id === activeSection)?.description || 'Admin management console'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="hidden sm:flex bg-green-50 text-green-700 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Online
                </Badge>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-slate-200 hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content - Scrollable */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  )
}