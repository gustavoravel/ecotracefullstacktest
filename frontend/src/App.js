import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Repositories from './components/Repositories';
import History from './components/History';
import UserDetails from './components/UserDetails';
import SignUp from './components/Signup';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/repositories" element={<Repositories/>} />
          <Route path="/history" element={<History/>} />
          <Route path="/user-details/:username" element={<UserDetails/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
