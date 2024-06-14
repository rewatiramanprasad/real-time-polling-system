import React from 'react'
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Auth from './Auth';
import Home from './Home';
import { SocketProvider } from './socket'

const App = () => {
  return (
    <SocketProvider>
      <Router>
      <Routes>
        <Route path="/login" element={<Auth/>} />
        <Route path="/home" element={<Home/>} />
        {/* <Route path="/protected" element={ProtectedComponent} /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </SocketProvider>
    
  )
}

export default App
