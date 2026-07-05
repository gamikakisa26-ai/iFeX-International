import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Star, X, Loader2, ImagePlus, AlertCircle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import {
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
  adminUploadImage,
} from '../../lib/api';

const CATEGORIES = ['Websites', 'ERP', 'Mobile', 'AI', 'UI/UX'];
const fieldClass =
  'w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan/50 focus:outline-none disabled:opacity-50';
const labelClass = 'text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 block';

const EMPTY_PROJECT = {
  title: '',
  category: 'Websites',
  categories: [],
  summary: '',
  tags: '',
  featured: false,
  image: '',
  images: ['', '', ''],
};

function ProjectModal({ project, onClose, onSaved }) {
  const isEditing = !!project;
  const [values, setValues] = useState(() => {
    if (!project) return EMPTY_PROJECT;
    const projectImages = project.images || [];
    const normalizedImages = Array.from({ length: 3 }, (_, index) =>
      projectImages[index] || (index === 0 ? project.image || '' : '')
    );
    return {
      ...project,
      tags: (project.tags || []).join(', '),
      images: normalizedImages,
      categories: project.categories || (project.category ? [project.category] : []),
    };
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Support checkboxes for categories
    if (name === 'categories' && type === 'checkbox') {
      setValues((prev) => {
        const current = new Set(prev.categories || []);
        if (checked) current.add(value);
        else current.delete(value);
        return { ...prev, categories: Array.from(current) };
      });
      return;
    }

    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = async (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const url = await adminUploadImage(file);
      setValues((prev) => {
        const nextImages = [...prev.images];
        nextImages[index] = url;
        return {
          ...prev,
          images: nextImages,
          image: index === 0 ? url : prev.image,
        };
      });
    } catch (err) {
      setError(err.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.title.trim() || !values.summary.trim()) {
      setError('Title and summary are required.');
      return;
    }
    setSaving(true);
    setError('');
    const payload = {
      ...values,
      tags: values.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      images: values.images.filter(Boolean),
      image: values.images[0] || values.image || '',
      categories: Array.isArray(values.categories)
        ? values.categories.filter(Boolean)
        : values.category
        ? [values.category]
        : [],
    };
    try {
      if (isEditing) {
        await adminUpdateProject(project.id, payload);
      } else {
        await adminCreateProject(payload);
      }
      onSaved();
    } catch (err) {
      setError(err.message || 'Could not save project.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.form
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="glass-panel bg-navy/95 w-full max-w-lg rounded-2xl p-7 max-h-[90vh] overflow-y-auto flex flex-col gap-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">
            {isEditing ? 'Edit Project' : 'Add Project'}
          </h3>
          <button type="button" onClick={onClose} aria-label="Close" className="text-white/40 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <label className={labelClass} htmlFor="title">Title *</label>
          <input id="title" name="title" value={values.title} onChange={handleChange} className={fieldClass} placeholder="Project name" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="categories">Categories</label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((c) => (
                <label key={c} className="inline-flex items-center gap-2 text-sm text-white/80">
                  <input
                    type="checkbox"
                    name="categories"
                    value={c}
                    checked={(values.categories || []).includes(c)}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-white/20 bg-white/5 accent-cyan"
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-end pb-3">
            <label className="inline-flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                name="featured"
                checked={values.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-white/20 bg-white/5 accent-cyan"
              />
              Featured on homepage
            </label>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="summary">Summary *</label>
          <textarea id="summary" name="summary" rows={3} value={values.summary} onChange={handleChange} className={`${fieldClass} resize-none`} placeholder="One or two sentences about the project" />
        </div>

        <div>
          <label className={labelClass} htmlFor="tags">Tags (comma-separated)</label>
          <input id="tags" name="tags" value={values.tags} onChange={handleChange} className={fieldClass} placeholder="React, Node.js, AWS" />
        </div>

        <div>
          <label className={labelClass}>Project Images</label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {values.images.map((src, index) => (
              <div key={index} className="space-y-2">
                <div className="h-32 rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden shadow-sm">
                  {src ? (
                    <img src={src} alt={`Project image ${index + 1}`} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/30">
                      <ImagePlus className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <label className="inline-flex items-center justify-center gap-2 rounded-full glass-panel px-3 py-2 text-xs font-semibold text-white cursor-pointer hover:border-cyan/40 transition-colors">
                  {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
                  {src ? `Replace ${index + 1}` : `Upload ${index + 1}`}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e)}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-white/50">Upload up to 3 images. The first image is used as the cover in the portfolio grid.</p>
        </div>

        {error && (
          <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan px-6 py-2.5 text-sm font-semibold text-white shadow-glow-blue transition-all duration-300 hover:shadow-glow-cyan disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : isEditing ? 'Save Changes' : 'Add Project'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full glass-panel px-6 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default function PortfolioManager() {
  const { portfolio, refresh } = useContent();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  const openAddModal = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleSaved = async () => {
    setModalOpen(false);
    setEditingProject(null);
    await refresh();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    setDeletingId(id);
    setError('');
    try {
      await adminDeleteProject(id);
      await refresh();
    } catch (err) {
      setError(err.message || 'Could not delete project.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">{portfolio.length} project{portfolio.length !== 1 ? 's' : ''}</p>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-glow-blue transition-all duration-300 hover:shadow-glow-cyan"
        >
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      {error && (
        <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {portfolio.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card overflow-hidden flex flex-col"
          >
            <div className="h-32 bg-electric-cyan bg-gradient-to-br from-electric/25 to-cyan/25 flex items-center justify-center border-b border-white/10 relative">
              {project.images?.[0] || project.image ? (
                <img src={project.images?.[0] || project.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-display font-bold text-white/30">
                  {project.title.charAt(0)}
                </span>
              )}
              {project.featured && (
                <span className="absolute top-2 right-2 rounded-full bg-navy/80 p-1.5" title="Featured on homepage">
                  <Star className="h-3.5 w-3.5 text-cyan fill-cyan" />
                </span>
              )}
            </div>
            <div className="p-5 flex flex-col gap-2 flex-1">
              <span className="text-xs uppercase tracking-widest text-cyan">{project.categories ? project.categories.join(', ') : project.category}</span>
              <h4 className="text-sm font-semibold text-white">{project.title}</h4>
              <p className="text-xs text-white/50 leading-relaxed flex-1">{project.summary}</p>
              <div className="flex items-center gap-2 pt-3 mt-auto border-t border-white/10">
                <button
                  onClick={() => openEditModal(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-cyan transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  disabled={deletingId === project.id}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  {deletingId === project.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {portfolio.length === 0 && (
        <div className="glass-card p-10 text-center text-sm text-white/50">
          No projects yet — click &ldquo;Add Project&rdquo; to create your first one.
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <ProjectModal
            project={editingProject}
            onClose={() => setModalOpen(false)}
            onSaved={handleSaved}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
