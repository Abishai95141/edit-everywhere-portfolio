import { Award, Database, Cpu, BarChart, Shield, Cloud } from 'lucide-react';
import Carousel, { CarouselItem } from './Carousel';

const certifications: CarouselItem[] = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    description: "Professional certification demonstrating expertise in designing distributed systems on AWS",
    icon: <Cloud />,
    link: "https://aws.amazon.com/certification/certified-solutions-architect-professional/"
  },
  {
    id: 2,
    title: "Google Data Analytics Professional",
    description: "Comprehensive certification covering data analysis, visualization, and business intelligence",
    icon: <BarChart />,
    link: "https://www.coursera.org/professional-certificates/google-data-analytics"
  },
  {
    id: 3,
    title: "Machine Learning Specialization",
    description: "Deep learning and neural networks certification from Stanford University and DeepLearning.AI",
    icon: <Cpu />,
    link: "https://www.coursera.org/specializations/machine-learning-introduction"
  },
  {
    id: 4,
    title: "PostgreSQL Database Administration",
    description: "Advanced database design, optimization, and administration certification",
    icon: <Database />,
    link: "https://www.postgresql.org/docs/current/"
  },
  {
    id: 5,
    title: "Certified Ethical Hacker (CEH)",
    description: "Industry-recognized cybersecurity certification covering penetration testing and security",
    icon: <Shield />,
    link: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/"
  },
  {
    id: 6,
    title: "Professional Scrum Master",
    description: "Agile methodology and Scrum framework certification for project management",
    icon: <Award />,
    link: "https://www.scrum.org/professional-scrum-master-i-certification"
  }
];

export const CertificationsSection = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional certifications and credentials showcasing expertise across various domains
          </p>
        </div>

        <div className="flex justify-center">
          <Carousel
            items={certifications}
            baseWidth={400}
            autoplay={true}
            autoplayDelay={4000}
            pauseOnHover={true}
            loop={true}
          />
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Drag or swipe to explore • Click cards to view credentials</p>
        </div>
      </div>
    </section>
  );
};
