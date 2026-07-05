import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServiceTemplate from '../components/ServiceTemplate';
import { getServiceBySlug } from '../data/servicesData';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const serviceData = getServiceBySlug(slug);

  if (!serviceData) {
    return <Navigate to="/services" replace />;
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate">
      <ServiceTemplate serviceData={serviceData} />
    </motion.div>
  );
}
