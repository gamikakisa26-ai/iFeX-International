import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { adminUpdateCompany } from '../../lib/api';

const fieldClass =
  'w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan/50 focus:outline-none disabled:opacity-50';
const labelClass = 'text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 block';

export default function CompanyForm() {
  const { company, refresh } = useContent();
  const [values, setValues] = useState(company);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setValues(company);
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (platform, value) => {
    setValues((prev) => ({ ...prev, socials: { ...prev.socials, [platform]: value } }));
  };

  const handleStatChange = (index, field, value) => {
    setValues((prev) => {
      const stats = [...(prev.stats || [])];
      stats[index] = { ...stats[index], [field]: field === 'value' ? Number(value) || 0 : value };
      return { ...prev, stats };
    });
  };

  const addStat = () => {
    setValues((prev) => ({
      ...prev,
      stats: [...(prev.stats || []), { value: 0, suffix: '+', label: 'New Stat' }],
    }));
  };

  const removeStat = (index) => {
    setValues((prev) => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus('idle');
    try {
      await adminUpdateCompany(values);
      await refresh();
      setStatus('success');
      setMessage('Company details saved.');
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Could not save changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <section className="glass-card p-6 flex flex-col gap-5">
        <h3 className="text-base font-semibold text-white">Homepage Hero</h3>
        <div>
          <label className={labelClass} htmlFor="heroHeadline">Headline</label>
          <input
            id="heroHeadline"
            name="heroHeadline"
            value={values.heroHeadline || ''}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="heroSubtext">Subtext</label>
          <textarea
            id="heroSubtext"
            name="heroSubtext"
            rows={3}
            value={values.heroSubtext || ''}
            onChange={handleChange}
            className={`${fieldClass} resize-none`}
          />
        </div>
      </section>

      <section className="glass-card p-6 flex flex-col gap-5">
        <h3 className="text-base font-semibold text-white">Contact Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor="email">Email</label>
            <input id="email" name="email" value={values.email || ''} onChange={handleChange} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={values.phone || ''} onChange={handleChange} className={fieldClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="location">Location</label>
            <input id="location" name="location" value={values.location || ''} onChange={handleChange} className={fieldClass} />
          </div>
        </div>
      </section>

      <section className="glass-card p-6 flex flex-col gap-5">
        <h3 className="text-base font-semibold text-white">Social Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/...' },
            { key: 'twitter', label: 'Twitter', placeholder: 'https://twitter.com/...' },
            { key: 'github', label: 'GitHub', placeholder: 'https://github.com/...' },
            { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
            { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
            { key: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/...' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className={labelClass} htmlFor={key}>{label}</label>
              <input
                id={key}
                value={values.socials?.[key] || ''}
                onChange={(e) => handleSocialChange(key, e.target.value)}
                className={fieldClass}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card p-6 flex flex-col gap-5">
        <h3 className="text-base font-semibold text-white">Mission &amp; Vision</h3>
        <div>
          <label className={labelClass} htmlFor="mission">Mission</label>
          <textarea id="mission" name="mission" rows={3} value={values.mission || ''} onChange={handleChange} className={`${fieldClass} resize-none`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="vision">Vision</label>
          <textarea id="vision" name="vision" rows={3} value={values.vision || ''} onChange={handleChange} className={`${fieldClass} resize-none`} />
        </div>
        <div className="flex items-center gap-3 mt-2">
          <input
            id="pricingVisible"
            name="pricingVisible"
            type="checkbox"
            checked={values.pricingVisible !== false}
            onChange={(e) => setValues((prev) => ({ ...prev, pricingVisible: e.target.checked }))}
            className="h-4 w-4 rounded border-white/20 bg-white/5 accent-cyan"
          />
          <label htmlFor="pricingVisible" className="text-sm text-white/80">
            Show Pricing page on the website
          </label>
        </div>
      </section>

      <section className="glass-card p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">Homepage Stats</h3>
          <button
            type="button"
            onClick={addStat}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan hover:text-white transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add Stat
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {(values.stats || []).map((stat, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_2fr_auto] gap-3 items-center">
              <input
                type="number"
                value={stat.value}
                onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                className={fieldClass}
                placeholder="Value"
              />
              <input
                value={stat.suffix}
                onChange={(e) => handleStatChange(i, 'suffix', e.target.value)}
                className={fieldClass}
                placeholder="Suffix (+, %, /7)"
              />
              <input
                value={stat.label}
                onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                className={fieldClass}
                placeholder="Label"
              />
              <button
                type="button"
                onClick={() => removeStat(i)}
                aria-label="Remove stat"
                className="justify-self-start sm:justify-self-center rounded-lg p-2 text-white/40 hover:text-red-400 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan px-6 py-3 text-sm font-semibold text-white shadow-glow-blue transition-all duration-300 hover:shadow-glow-cyan disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Changes'}
        </button>

        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-emerald-300"
            >
              <CheckCircle2 className="h-4 w-4" /> {message}
            </motion.span>
          )}
          {status === 'error' && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-red-300"
            >
              <AlertCircle className="h-4 w-4" /> {message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
