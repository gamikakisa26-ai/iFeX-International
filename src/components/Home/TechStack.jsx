import SectionHeader from '../Common/SectionHeader';

// TODO: swap/expand with the exact technologies you want to showcase
const TECHNOLOGIES = [
  'React', 'Node.js', 'TypeScript', 'Next.js', 'AWS', 'Azure',
  'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL', 'Python', 'Flutter',
  'React Native', 'MongoDB', 'Tailwind CSS', 'OpenAI',
];

export default function TechStack() {
  const track = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section className="py-24">
      <div className="section-container">
        <SectionHeader
          eyebrow="Our Stack"
          title="Modern tools. Proven at scale."
          description="We select technology based on what your product needs — not what's trendy."
        />
      </div>

      <div className="relative mt-14 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent z-10"
        />
        <div className="flex w-max animate-marquee gap-4">
          {track.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="glass-panel rounded-full px-6 py-3 text-sm font-medium text-white/70 whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
