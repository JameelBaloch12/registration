import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import mainBg from './components/Mainbg.jpg';

import Footer from './pages/Footer';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import Events from './pages/Event';
import EventDetails from './pages/EventDetail';
import MyTickets from './pages/MyTickets';
import AdminDashboard from './pages/AdminDashboard';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import Participants from './pages/Participant';
import NotFound from './pages/NotFound';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import RegisterEvent from './pages/RegisterEvent';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import ur from './locales/ur.json';

const App = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [content, setContent] = useState(en);

  useEffect(() => {
    switch (language) {
      case 'es': setContent(es); break;
      case 'fr': setContent(fr); break;
      case 'de': setContent(de); break;
      case 'ur': setContent(ur); break;
      default: setContent(en);
    }
  }, [language]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const backgroundStyle = {
    backgroundImage: `url(${mainBg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100%',
  };

  return (
    <Router>
      <div style={backgroundStyle}>
        <Routes>
          <Route path="/" element={<Home content={content} />} />
          <Route path="/login" element={<Login content={content} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetails content={content} />} />
          <Route path="/my-tickets" element={<MyTickets content={content} />} />
          <Route path="/admin-dashboard" element={<AdminDashboard content={content} />} />
          <Route path="/create-event" element={<CreateEvent content={content} />} />
          <Route path="/edit-event/:id" element={<EditEvent content={content} />} />
          <Route path="/participants" element={<Participants content={content} />} />
          <Route path="/payment" element={<Payment content={content} />} />
          <Route path="/profile" element={<Profile content={content} />} />
          <Route path="/reports" element={<Reports content={content} />} />
          <Route path="/settings" element={<Settings onLanguageChange={handleLanguageChange} />} />
          <Route path="/register-event/:id" element={<RegisterEvent />} />
          <Route path="*" element={<NotFound content={content} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
