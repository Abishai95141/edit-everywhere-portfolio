import { SpotlightCard } from "./SpotlightCard";
import { MapPin, GraduationCap, Sparkles, Code2, Database, Brain, TrendingUp, GitBranch, Settings } from "lucide-react";
import { motion } from "framer-motion";
export const AboutSection = () => {
  const techStack = [{
    name: "Python Programming",
    icon: Code2
  }, {
    name: "Applied Data Science",
    icon: Database
  }, {
    name: "Machine Learning & Deep Learning",
    icon: Brain
  }, {
    name: "Data Analytics",
    icon: TrendingUp
  }, {
    name: "Git & GitHub",
    icon: GitBranch
  }, {
    name: "Fine-tuning & RAG",
    icon: Settings
  }];
  return <section id="about" className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-16 sm:py-20 md:py-24">
      {/* Section Header */}
      <motion.div className="mb-12 sm:mb-16" initial={{
      opacity: 0,
      y: 30
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.6
    }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          About Me
        </h2>
        <div className="w-20 h-1 bg-foreground"></div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Large Card - Who I Am */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="md:col-span-2 lg:col-span-2">
          <SpotlightCard className="h-full p-8" spotlightColor="rgba(150, 150, 150, 0.15)">
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
        </motion.div>

        {/* Small Card - Location */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.1
      }}>
          <SpotlightCard className="h-full p-6 flex flex-col justify-center" spotlightColor="rgba(150, 150, 150, 0.15)">
            <MapPin className="w-8 h-8 mb-3 text-foreground" />
            <p className="text-foreground/80 text-sm md:text-base">
              Based in India, Tamil Nadu, Chennai.
            </p>
          </SpotlightCard>
        </motion.div>

        {/* Small Card - Education */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.15
      }}>
          <SpotlightCard className="h-full p-6 flex flex-col justify-center" spotlightColor="rgba(150, 150, 150, 0.15)">
            <GraduationCap className="w-8 h-8 mb-3 text-foreground" />
            <p className="text-foreground/80 text-sm md:text-base font-medium">
              BTech AIML
            </p>
            <p className="text-foreground/60 text-xs md:text-sm">
              III<sup>rd</sup> Year
            </p>
          </SpotlightCard>
        </motion.div>

        {/* Small/Medium Card - Current Status */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="md:col-span-2">
          
        </motion.div>

        {/* Medium Card - Tech Stack */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.25
      }} className="md:col-span-2 lg:col-span-4">
          <SpotlightCard className="h-full p-8" spotlightColor="rgba(150, 150, 150, 0.15)">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Arsenal
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return <span key={index} className="px-4 py-2 text-sm md:text-base bg-foreground/5 border border-foreground/10 rounded-full text-foreground/80 hover:bg-foreground/10 transition-colors flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tech.name}
                  </span>;
            })}
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>;
};