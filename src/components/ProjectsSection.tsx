import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

interface Project {
  title: string;
  link: string;
  description: string;
  techStack: string[];
  bgColor: "black" | "grey";
  image: string;
}

const projects: Project[] = [
  {
    title: "FloodGuard",
    link: "https://github.com/MOHAMEDAHSAN/floodguard?utm_source=chatgpt.com",
    description: "Built a dual-portal flood simulation and emergency-response system using an ensemble of LSTM and Random Forest models to predict 5-day water level rise. Integrated a public complaint portal with geolocation and weather APIs for real-time distress reporting.",
    techStack: ["React", "TypeScript", "Flask", "Supabase", "Python"],
    bgColor: "black",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
  },
  {
    title: "TrueFIR",
    link: "https://github.com/Abishai95141/TrueFIR/blob/main/README.md?utm_source=chatgpt.com",
    description: "Created a blockchain-powered FIR filing system optimized for minimal gas costs, with integrated anomaly-detection logs to prevent misuse and ensure data integrity.",
    techStack: ["Solidity", "Polygon testnet", "Pinata(IPFS)", "Web3", "React"],
    bgColor: "grey",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop"
  },
  {
    title: "Taxonomist-Gidy",
    link: "https://github.com/MOHAMEDAHSAN/taxonomist-gidy?utm_source=chatgpt.com",
    description: "Designed a tax-policy simulation and GDP prediction platform using agent-based modeling linked to economic indicators. Developed an interactive interface for scenario analysis and budget allocation.",
    techStack: ["Python", "React", "TypeScript"],
    bgColor: "black",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  },
  {
    title: "LexIntel",
    link: "https://github.com/Abishai95141/LexIntel-LawFirm",
    description: "LexIntel is an on-premises AI assistant that orchestrates a fine-tuned 7B-parameter Mistral model through a modular, multi-agent pipeline. All components run within client infrastructure. By decomposing report generation into discrete Planner, Retriever, Drafter, Summarizer, and Formatter agents, LexIntel maximizes coherence within context limits and automates styling, citations, and research.",
    techStack: ["Python", "Mistral 7B", "LangChain", "Multi-agent framework"],
    bgColor: "grey",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop"
  },
  {
    title: "CampaignIQ",
    link: "https://github.com/Abishai95141/CampaignIQ",
    description: "CampaignIQ is a state-of-the-art analytical solution that leverages causal inference to provide health organizations with precise, unbiased measures of campaign metrics and actionable insights for strategic resource allocation.",
    techStack: ["Python", "React", "TypeScript", "IBM LinuxOne Cloud"],
    bgColor: "black",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Selected Projects
          </h2>
          <div className="w-20 h-1 bg-foreground"></div>
        </motion.div>

        {/* Scroll Stack */}
        <ScrollStack
          itemDistance={50}
          itemScale={0.05}
          itemStackDistance={40}
          stackPosition="15%"
          scaleEndPosition="10%"
          baseScale={0.92}
        >
          {projects.map((project, index) => (
            <ScrollStackItem key={index} itemClassName="!p-0">
              <motion.div
                className={`h-full flex flex-col md:flex-row gap-8 p-8 md:p-12 ${
                  project.bgColor === "black" ? "bg-black" : "bg-zinc-800"
                } text-white`}
                whileHover={{ 
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Left Column - Content */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                      {project.title}
                    </h3>
                    
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors mb-6"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Image */}
                <div className="flex-1 overflow-hidden rounded-lg min-w-0">
                  <motion.img 
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};
