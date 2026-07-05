import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ShieldCheck, Rocket, Users, Layers } from 'lucide-react';
import SectionHeader from '../Common/SectionHeader';
import { useContent } from '../../context/ContentContext';

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Secure by Design',
    detail: 'Every build follows security-first architecture, from auth to infrastructure.',
  },
  {
    icon: Rocket,
    title: 'Built to Scale',
    detail: 'Systems architected to handle 10x growth without a rebuild.',
  },
  {
    icon: Users,
    title: 'One Dedicated Team',
    detail: 'The same engineers scope, build, and support your project end to end.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Expertise',
    detail: 'Web, mobile, ERP, cloud, and AI — under a single technical roof.',
  },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-mono font-semibold text-white">
      {display}
      <span className="text-cyan">{suffix}</span>
    </span>
  );
}

export default function WhyChooseUs() {
  const { company } = useContent();
  const stats = company.stats || [];

  return (
    <section className="section-container py-24">
      <SectionHeader
        eyebrow="Why iFeX"
        title="The technical partner enterprises trust"
        description="We combine enterprise-grade rigor with startup speed — so your product ships fast and holds up under real-world load."
      />

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {REASONS.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card flex items-start gap-5 p-7"
          >
            <div className="shrink-0 rounded-xl bg-electric-cyan bg-gradient-to-br from-electric/20 to-cyan/20 border border-white/10 p-3">
              <reason.icon className="h-6 w-6 text-cyan" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1.5">{reason.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{reason.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-2xl mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 p-10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2">
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className="text-xs sm:text-sm uppercase tracking-widest text-white/50">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
