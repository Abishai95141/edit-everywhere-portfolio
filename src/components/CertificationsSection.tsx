import { BarChart, Cpu, Lightbulb, FileQuestion, Cloud } from 'lucide-react';
import Carousel, { CarouselItem } from './Carousel';

const certifications: CarouselItem[] = [
  {
    id: 1,
    title: "Google Data Analytics",
    description: "Professional Certificate by Google",
    icon: <BarChart />,
    link: "https://coursera.org/share/d581dd6c0dfa04f6c554d94ae0ae8cb4"
  },
  {
    id: 2,
    title: "Multimodal RAG using Vertex AI Gemini API",
    description: "Advanced retrieval augmented generation techniques",
    icon: <Cpu />,
    link: "https://coursera.org/share/97a61359cf245374722c9dd71985b4b3"
  },
  {
    id: 3,
    title: "Generative AI for Everyone",
    description: "Comprehensive overview of GenAI landscape",
    icon: <Lightbulb />,
    link: "https://coursera.org/share/1c2ab8add8bed5e3bae797e0112cbd5b"
  },
  {
    id: 4,
    title: "Ask Questions to Make Data-Driven Decisions",
    description: "Analytical thinking and questioning strategies",
    icon: <FileQuestion />,
    link: "https://coursera.org/share/358b1e3dcce18d6b68b0c207ae1b492e"
  },
  {
    id: 5,
    title: "Introduction to Vertex AI Studio",
    description: "Cloud-based model development and deployment",
    icon: <Cloud />,
    link: "https://coursera.org/share/af61bcc3fb6c7cc6c9c895f6d195882b"
  }
];

export const CertificationsSection = () => {
  return (
    <section id="certifications" className="min-h-[80vh] py-24 px-6 bg-background relative overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional credentials and continuous learning achievements
          </p>
        </div>

        <div className="flex justify-center">
          <Carousel
            items={certifications}
            baseWidth={600}
            autoplay={true}
            autoplayDelay={4000}
            pauseOnHover={true}
            loop={true}
          />
        </div>

        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Drag or swipe to explore • Click cards to view credentials</p>
        </div>
      </div>
    </section>
  );
};
