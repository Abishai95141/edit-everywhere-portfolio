import { BarChart, Cpu, Lightbulb, FileQuestion, Cloud } from 'lucide-react';
import Carousel, { CarouselItem } from './Carousel';
import { useState, useEffect } from 'react';

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
  const [carouselWidth, setCarouselWidth] = useState(600);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        // Mobile: smaller width
        setCarouselWidth(Math.min(window.innerWidth - 32, 340));
      } else if (window.innerWidth < 768) {
        // Small tablets
        setCarouselWidth(Math.min(window.innerWidth - 48, 500));
      } else {
        // Desktop
        setCarouselWidth(600);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <section id="certifications" className="min-h-[80vh] py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-background relative overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Professional credentials and continuous learning achievements
          </p>
        </div>

        <div className="flex justify-center">
          <Carousel
            items={certifications}
            baseWidth={carouselWidth}
            autoplay={true}
            autoplayDelay={4000}
            pauseOnHover={true}
            loop={true}
          />
        </div>

        <div className="text-center mt-8 sm:mt-12 text-xs sm:text-sm text-muted-foreground px-4">
          <p>Drag or swipe to explore • Click cards to view credentials</p>
        </div>
      </div>
    </section>
  );
};
