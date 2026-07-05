import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Hero from '../components/Home/Hero';
import ServicesOverview from '../components/Home/ServicesOverview';
import WhyChooseUs from '../components/Home/WhyChooseUs';
import TechStack from '../components/Home/TechStack';
import CTA from '../components/Home/CTA';
import SectionHeader from '../components/Common/SectionHeader';
import { useContent } from '../context/ContentContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function FeaturedProjects() {
  const { portfolio } = useContent();
  const featured = portfolio.filter((p) => p.featured);

  if (featured.length === 0) return null;

  return (
    <section className="section-container py-16 sm:py-24">
      <SectionHeader
        eyebrow="Featured Work"
        title="Recent builds we're proud of"
        description="A sample of platforms, apps, and systems shipped for clients across industries."
      />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 md:grid-cols-3 md:gap-6">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/portfolio" className="group glass-card block h-full overflow-hidden">
              <div className="h-44 bg-electric-cyan bg-gradient-to-br from-electric/25 to-cyan/25 flex items-center justify-center border-b border-white/10 overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-3xl font-display font-bold text-white/30">
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
                <p className="text-sm text-white/55 leading-relaxed">{project.summary}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate">
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <FeaturedProjects />
      <TechStack />
      <CTA />
    </motion.div>
  );
}
