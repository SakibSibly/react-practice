// import { useState } from 'react'
import './App.css'
// import MyButton from './components/MyButton'
import AboutPage from './components/AboutPage/AboutPage'
// import Profile from './components/Profile/Profile'
// import Helper from './components/Helper/Helper'
import LoginPage from './components/LoginPage/LoginPage'
import NotFound from './components/NotFound/NotFound'
import HomePage from './components/HomePage/HomePage'
import Layout from './layouts/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
