import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../components/Common/SectionHeader';
import CTA from '../components/Home/CTA';
import { useContent } from '../context/ContentContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const FILTERS = ['All', 'Websites', 'ERP', 'Mobile', 'AI', 'UI/UX'];

export default function Portfolio() {
  const { portfolio } = useContent();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(
    () =>
      activeFilter === 'All' ? portfolio : portfolio.filter((p) => p.category === activeFilter),
    [activeFilter, portfolio]
  );

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" className="pt-40 pb-24">
      <section className="section-container">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected work across industries"
          description="Filter by discipline to see how iFeX approaches different types of projects."
        />

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                activeFilter === filter ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {activeFilter === filter && (
                <motion.span
                  layoutId="portfolio-filter-pill"
                  className="absolute inset-0 rounded-full bg-electric-cyan bg-gradient-to-r from-electric to-cyan"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section-container mt-12">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <Link
              key={project.id}
              to={`/portfolio/${project.id}`}
              className="group glass-card overflow-hidden"
            >
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                <div className="h-48 bg-electric-cyan bg-gradient-to-br from-electric/25 to-cyan/25 flex items-center justify-center border-b border-white/10 overflow-hidden">
                  {project.images?.[0] || project.image ? (
                    <img
                      src={project.images?.[0] || project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-display font-bold text-white/30">
                      {project.title.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-widest text-cyan">
                      {project.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:text-cyan group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1.5">{project.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed mb-4">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/[0.05] border border-white/10 px-3 py-1 text-xs text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </Link>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <CTA
        eyebrow="Like What You See"
        title="Your project could be next"
        description="Share your goals and we'll show you how we'd approach it."
      />
    </motion.div>
  );
}
