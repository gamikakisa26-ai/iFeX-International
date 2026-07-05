import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchContent } from '../lib/api';

const ContentContext = createContext(null);

// Fallback used only if the API is unreachable (e.g. backend not running),
// so the site still renders something reasonable instead of a blank page.
const FALLBACK_CONTENT = {
  company: {
    name: 'iFeX International',
    tagline: 'Engineering the Future',
    heroHeadline: 'Engineering Intelligent Digital Solutions for Modern Businesses',
    heroSubtext:
      'iFeX International builds premium websites, ERP systems, mobile apps, and applied AI automation — engineered for performance, security, and scale at every stage of growth.',
    email: 'hello@ifexinternational.com',
    phone: '+1 (000) 000-0000',
    location: 'Global — Remote-first operations',
    socials: { linkedin: '', twitter: '', github: '', facebook: '', instagram: '', whatsapp: '' },
    mission: 'To deliver secure, scalable, and innovative technology solutions.',
    vision: 'A world where every ambitious company has access to great engineering.',
    stats: [
      { value: 120, suffix: '+', label: 'Projects Delivered' },
      { value: 98, suffix: '%', label: 'Client Retention' },
      { value: 15, suffix: '+', label: 'Industries Served' },
      { value: 24, suffix: '/7', label: 'Support Coverage' },
    ],
  },
  portfolio: [],
};

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchContent();
      setContent(data);
    } catch (err) {
      console.error('Failed to load site content, using fallback:', err.message);
      setError(err.message);
      setContent((prev) => prev ?? FALLBACK_CONTENT);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = {
    company: content?.company ?? FALLBACK_CONTENT.company,
    portfolio: content?.portfolio ?? FALLBACK_CONTENT.portfolio,
    loading,
    error,
    refresh,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within a ContentProvider');
  return ctx;
}
