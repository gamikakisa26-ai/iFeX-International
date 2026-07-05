import { motion } from 'framer-motion';
import SectionHeader from '../components/Common/SectionHeader';
import ContactCard from '../components/Contact/ContactCard';
import ContactForm from '../components/Contact/ContactForm';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Contact() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" className="pt-40 pb-24">
      <section className="section-container">
        <SectionHeader
          eyebrow="Contact"
          title="Let's engineer something great"
          description="Whether you have a full spec or just an idea, we'll help you shape it into a scoped, buildable plan."
        />
      </section>

      <section className="section-container mt-16 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <ContactCard />
        </div>
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </section>
    </motion.div>
  );
}
