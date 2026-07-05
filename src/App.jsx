import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import ScrollToTop from './components/Common/ScrollToTop';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import { useContent } from './context/ContentContext';
// Home ships in the main bundle since it's the most common first paint.
// Every other route is code-split so visitors only download what they
// actually visit — keeps the initial JS payload lean (perf guideline:
// split code by route/feature rather than shipping one large bundle).
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const PortfolioDetail = lazy(() => import('./pages/PortfolioDetail'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="h-6 w-6 text-cyan animate-spin" aria-hidden="true" />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const { company } = useContent();
  const pricingVisible = company.pricingVisible !== false;
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<PortfolioDetail />} />
              {pricingVisible && <Route path="/pricing" element={<Pricing />} />}
              <Route path="/contact" element={<Contact />} />

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="*"
                element={
                  <div className="pt-48 pb-24 text-center section-container">
                    <h1 className="text-4xl font-bold text-white mb-4">Page not found</h1>
                    <p className="text-white/50">The page you're looking for doesn't exist.</p>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
