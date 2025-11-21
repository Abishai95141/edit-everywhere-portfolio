import { SpotlightCard } from "./SpotlightCard";
import { MapPin, GraduationCap, Sparkles } from "lucide-react";

export const AboutSection = () => {
  const techStack = [
    "Python Programming",
    "Applied Data Science",
    "Machine Learning & Deep Learning",
    "Data Analytics",
    "Git & GitHub",
    "Fine-tuning & RAG",
  ];

  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-16 py-24">
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          About Me
        </h2>
        <div className="w-20 h-1 bg-foreground"></div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
        {/* Large Card - Who I Am */}
        <SpotlightCard
          className="md:col-span-2 lg:col-span-2 lg:row-span-2 p-8"
          spotlightColor="rgba(150, 150, 150, 0.15)"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Who I Am
          </h3>
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
            I am an AI practitioner who believes that the best code is the kind
            that can be explained. My background spans Machine Learning, Deep
            Learning, and LLMs, honed through competitive datathons and
            internship roles. I love the challenge of research, but I'm equally
            passionate about communication, breaking down technical complexity
            to collaborate effectively and drive meaningful results.
          </p>
        </SpotlightCard>

        {/* Small Card - Location */}
        <SpotlightCard
          className="p-6 flex flex-col justify-center"
          spotlightColor="rgba(150, 150, 150, 0.15)"
        >
          <MapPin className="w-8 h-8 mb-3 text-foreground" />
          <p className="text-foreground/80 text-sm md:text-base">
            Based in India, Tamil Nadu, Chennai.
          </p>
        </SpotlightCard>

        {/* Small Card - Education */}
        <SpotlightCard
          className="p-6 flex flex-col justify-center"
          spotlightColor="rgba(150, 150, 150, 0.15)"
        >
          <GraduationCap className="w-8 h-8 mb-3 text-foreground" />
          <p className="text-foreground/80 text-sm md:text-base font-medium">
            BTech AIML
          </p>
          <p className="text-foreground/60 text-xs md:text-sm">
            III<sup>rd</sup> Year
          </p>
        </SpotlightCard>

        {/* Medium Card - Tech Stack */}
        <SpotlightCard
          className="md:col-span-2 lg:col-span-2 p-8"
          spotlightColor="rgba(150, 150, 150, 0.15)"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Arsenal
          </h3>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm md:text-base bg-foreground/5 border border-foreground/10 rounded-full text-foreground/80 hover:bg-foreground/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </SpotlightCard>

        {/* Small/Medium Card - Current Status */}
        <SpotlightCard
          className="md:col-span-2 lg:col-span-2 p-6 flex flex-col justify-center"
          spotlightColor="rgba(150, 150, 150, 0.15)"
        >
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 text-foreground flex-shrink-0 mt-1" />
            <div>
              <p className="text-foreground font-medium text-base md:text-lg mb-1">
                Currently Researching
              </p>
              <p className="text-foreground/70 text-sm md:text-base">
                AI agents & SLMs
              </p>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
