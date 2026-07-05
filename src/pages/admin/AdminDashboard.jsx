import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Building2, Briefcase, ExternalLink } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import CompanyForm from '../../components/Admin/CompanyForm';
import PortfolioManager from '../../components/Admin/PortfolioManager';

const TABS = [
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'company', label: 'Company Details', icon: Building2 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Admin Panel</span>
            <h1 className="text-3xl font-bold text-white mt-2">Manage iFeX Content</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              <ExternalLink className="h-4 w-4" /> View Site
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-2.5 text-sm font-medium text-white/70 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Log Out
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b border-white/10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="admin-tab-underline"
                  className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-electric to-cyan rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab === 'portfolio' ? <PortfolioManager /> : <CompanyForm />}
        </motion.div>
      </div>
    </div>
  );
}
