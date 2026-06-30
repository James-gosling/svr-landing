import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './lib/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Methodology from './components/Methodology';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import DashboardLayout from './dashboard/DashboardLayout';

function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#030712' }}>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Methodology />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jarvis/*" element={<DashboardLayout />} />
      </Routes>
    </AppProvider>
  );
}
