import { motion } from 'framer-motion';

/**
 * SectionHeader
 * Consistent eyebrow + headline + supporting copy block used across all pages.
 * Props: eyebrow, title, description, align ('left' | 'center')
 */
export default function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-4 max-w-2xl ${alignment}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 self-start rounded-full glass-panel px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan mx-auto">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-white/60 leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
