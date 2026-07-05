import { useMemo, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import SectionHeader from '../components/Common/SectionHeader';
import CTA from '../components/Home/CTA';
import { useContent } from '../context/ContentContext';

export default function PortfolioDetail() {
  const { id } = useParams();
  const { portfolio } = useContent();
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const project = useMemo(
    () => portfolio.find((item) => item.id === id),
    [portfolio, id]
  );

  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeImageIndex]);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const galleryImages = (project.images && project.images.length > 0 ? project.images : [project.image]).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="pt-40 pb-24"
    >
      <section className="section-container">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70 transition-colors duration-200 hover:text-white hover:border-cyan/40"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </button>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Portfolio Detail"
              title={project.title}
              description={project.summary}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {galleryImages.map((src, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-glass focus:outline-none focus:ring-2 focus:ring-cyan/60"
                >
                  <img
                    src={src}
                    alt={`${project.title} image ${index + 1}`}
                    className="h-64 w-full object-cover transition duration-300 hover:scale-[1.02]"
                  />
                </button>
              ))}
            </div>

            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-xl font-semibold text-white mb-3">Project details</h2>
              <p className="text-white/65 leading-relaxed whitespace-pre-line">
                {project.summary}
              </p>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan mb-4">Project info</h3>
              <div className="space-y-3 text-sm text-white/70">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/40">Category</p>
                  <p className="mt-1 font-semibold text-white">{project.category}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/40">Tags</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(project.tags || []).map((tag) => (
                      <span key={tag} className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-white/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/40">Featured</p>
                  <p className="mt-1 font-semibold text-white">{project.featured ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan mb-4">Gallery</h3>
              <div className="space-y-3">
                {galleryImages.map((src, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-cyan/60"
                  >
                    <img
                      src={src}
                      alt={`Gallery image ${index + 1}`}
                      className="h-28 w-full object-cover transition duration-300 hover:brightness-95"
                    />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
      <CTA
        eyebrow="Explore more"
        title="See how every project is built with clarity and precision"
        description="Click through a project to review images, categories, and the core details that make it stand out."
      />

      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setActiveImageIndex(null)}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.img
              key={galleryImages[activeImageIndex]}
              src={galleryImages[activeImageIndex]}
              alt={`${project.title} image ${activeImageIndex + 1}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-h-[90vh] w-full max-w-[1200px] rounded-3xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
