import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

// Hook for API calls with loading and error states
export function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (apiFunction, ...args) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setIsLoading(false);
      return result;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { callApi, isLoading, error, clearError };
}

// Hook for FASTag operations
export function useFASTag() {
  const { callApi, isLoading, error } = useApi();
  const [fastags, setFastags] = useState([]);
  const [selectedFastag, setSelectedFastag] = useState(null);

  const fetchFASTags = useCallback(async () => {
    const result = await callApi(apiService.getFASTags);
    if (result.success) {
      setFastags(result.data);
    }
    return result;
  }, [callApi]);

  const getFASTag = useCallback(async (id) => {
    const result = await callApi(apiService.getFASTag, id);
    if (result.success) {
      setSelectedFastag(result.data);
    }
    return result;
  }, [callApi]);

  const purchaseFASTag = useCallback(async (orderData) => {
    return await callApi(apiService.purchaseFASTag, orderData);
  }, [callApi]);

  const rechargeFASTag = useCallback(async (rechargeData) => {
    return await callApi(apiService.rechargeFASTag, rechargeData);
  }, [callApi]);

  const getFASTagBalance = useCallback(async (id) => {
    return await callApi(apiService.getFASTagBalance, id);
  }, [callApi]);

  return {
    fastags,
    selectedFastag,
    isLoading,
    error,
    fetchFASTags,
    getFASTag,
    purchaseFASTag,
    rechargeFASTag,
    getFASTagBalance,
  };
}

// Hook for vehicle operations
export function useVehicles() {
  const { callApi, isLoading, error } = useApi();
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = useCallback(async () => {
    const result = await callApi(apiService.getUserVehicles);
    if (result.success) {
      setVehicles(result.data);
    }
    return result;
  }, [callApi]);

  const addVehicle = useCallback(async (vehicleData) => {
    const result = await callApi(apiService.addVehicle, vehicleData);
    if (result.success) {
      await fetchVehicles(); // Refresh list
    }
    return result;
  }, [callApi, fetchVehicles]);

  const updateVehicle = useCallback(async (id, vehicleData) => {
    const result = await callApi(apiService.updateVehicle, id, vehicleData);
    if (result.success) {
      await fetchVehicles(); // Refresh list
    }
    return result;
  }, [callApi, fetchVehicles]);

  const deleteVehicle = useCallback(async (id) => {
    const result = await callApi(apiService.deleteVehicle, id);
    if (result.success) {
      await fetchVehicles(); // Refresh list
    }
    return result;
  }, [callApi, fetchVehicles]);

  const verifyVehicle = useCallback(async (vehicleNumber) => {
    return await callApi(apiService.verifyVehicle, vehicleNumber);
  }, [callApi]);

  return {
    vehicles,
    isLoading,
    error,
    fetchVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    verifyVehicle,
  };
}

// Hook for order operations
export function useOrders() {
  const { callApi, isLoading, error } = useApi();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = useCallback(async (page = 1, limit = 10) => {
    const result = await callApi(apiService.getUserOrders, page, limit);
    if (result.success) {
      setOrders(result.data.orders || result.data);
    }
    return result;
  }, [callApi]);

  const getOrder = useCallback(async (orderId) => {
    const result = await callApi(apiService.getOrder, orderId);
    if (result.success) {
      setSelectedOrder(result.data);
    }
    return result;
  }, [callApi]);

  const createOrder = useCallback(async (orderData) => {
    return await callApi(apiService.createOrder, orderData);
  }, [callApi]);

  const trackOrder = useCallback(async (orderId) => {
    return await callApi(apiService.trackOrder, orderId);
  }, [callApi]);

  const cancelOrder = useCallback(async (orderId) => {
    const result = await callApi(apiService.cancelOrder, orderId);
    if (result.success) {
      await fetchOrders(); // Refresh list
    }
    return result;
  }, [callApi, fetchOrders]);

  return {
    orders,
    selectedOrder,
    isLoading,
    error,
    fetchOrders,
    getOrder,
    createOrder,
    trackOrder,
    cancelOrder,
  };
}

// Hook for support operations
export function useSupport() {
  const { callApi, isLoading, error } = useApi();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchTickets = useCallback(async () => {
    const result = await callApi(apiService.getUserTickets);
    if (result.success) {
      setTickets(result.data);
    }
    return result;
  }, [callApi]);

  const getTicket = useCallback(async (ticketId) => {
    const result = await callApi(apiService.getTicket, ticketId);
    if (result.success) {
      setSelectedTicket(result.data);
    }
    return result;
  }, [callApi]);

  const createTicket = useCallback(async (ticketData) => {
    const result = await callApi(apiService.createSupportTicket, ticketData);
    if (result.success) {
      await fetchTickets(); // Refresh list
    }
    return result;
  }, [callApi, fetchTickets]);

  const addMessage = useCallback(async (ticketId, message) => {
    const result = await callApi(apiService.addTicketMessage, ticketId, message);
    if (result.success) {
      await getTicket(ticketId); // Refresh ticket details
    }
    return result;
  }, [callApi, getTicket]);

  return {
    tickets,
    selectedTicket,
    isLoading,
    error,
    fetchTickets,
    getTicket,
    createTicket,
    addMessage,
  };
}

// Hook for file upload operations
export function useFileUpload() {
  const { callApi, isLoading, error } = useApi();

  const uploadDocument = useCallback(async (file, documentType) => {
    return await callApi(apiService.uploadDocument, file, documentType);
  }, [callApi]);

  const uploadImage = useCallback(async (file) => {
    return await callApi(apiService.uploadImage, file);
  }, [callApi]);

  return {
    isLoading,
    error,
    uploadDocument,
    uploadImage,
  };
}

// Hook for admin operations
export function useAdmin() {
  const { callApi, isLoading, error } = useApi();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [pendingKYC, setPendingKYC] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);

  const fetchDashboardStats = useCallback(async () => {
    const result = await callApi(apiService.getAdminDashboardStats);
    if (result.success) {
      setDashboardStats(result.data);
    }
    return result;
  }, [callApi]);

  const fetchUsers = useCallback(async (page = 1, limit = 10, filters = {}) => {
    const result = await callApi(apiService.getUsers, page, limit, filters);
    if (result.success) {
      setUsers(result.data.users || result.data);
    }
    return result;
  }, [callApi]);

  const fetchPendingKYC = useCallback(async () => {
    const result = await callApi(apiService.getPendingKYC);
    if (result.success) {
      setPendingKYC(result.data);
    }
    return result;
  }, [callApi]);

  const approveKYC = useCallback(async (kycId) => {
    const result = await callApi(apiService.approveKYC, kycId);
    if (result.success) {
      await fetchPendingKYC(); // Refresh list
    }
    return result;
  }, [callApi, fetchPendingKYC]);

  const rejectKYC = useCallback(async (kycId, reason) => {
    const result = await callApi(apiService.rejectKYC, kycId, reason);
    if (result.success) {
      await fetchPendingKYC(); // Refresh list
    }
    return result;
  }, [callApi, fetchPendingKYC]);

  const fetchTransactions = useCallback(async (page = 1, limit = 10, filters = {}) => {
    const result = await callApi(apiService.getAllTransactions, page, limit, filters);
    if (result.success) {
      setTransactions(result.data.transactions || result.data);
    }
    return result;
  }, [callApi]);

  const fetchSupportTickets = useCallback(async (page = 1, limit = 10, filters = {}) => {
    const result = await callApi(apiService.getAllSupportTickets, page, limit, filters);
    if (result.success) {
      setSupportTickets(result.data.tickets || result.data);
    }
    return result;
  }, [callApi]);

  const assignTicket = useCallback(async (ticketId, adminId) => {
    const result = await callApi(apiService.assignTicket, ticketId, adminId);
    if (result.success) {
      await fetchSupportTickets(); // Refresh list
    }
    return result;
  }, [callApi, fetchSupportTickets]);

  const replyToTicket = useCallback(async (ticketId, message) => {
    return await callApi(apiService.replyToTicket, ticketId, message);
  }, [callApi]);

  const updateTicketStatus = useCallback(async (ticketId, status) => {
    const result = await callApi(apiService.updateTicketStatus, ticketId, status);
    if (result.success) {
      await fetchSupportTickets(); // Refresh list
    }
    return result;
  }, [callApi, fetchSupportTickets]);

  return {
    dashboardStats,
    users,
    pendingKYC,
    transactions,
    supportTickets,
    isLoading,
    error,
    fetchDashboardStats,
    fetchUsers,
    fetchPendingKYC,
    approveKYC,
    rejectKYC,
    fetchTransactions,
    fetchSupportTickets,
    assignTicket,
    replyToTicket,
    updateTicketStatus,
  };
}

// Hook for debouncing values
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for local storage with JSON support
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}