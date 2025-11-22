import { motion } from "framer-motion";
import InfiniteMenu from "./InfiniteMenu";

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
  // Map the projects to the format required by InfiniteMenu
  const menuItems = projects.map(project => ({
    image: project.image,
    link: project.link,
    title: project.title,
    description: project.description
  }));

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

        {/* Infinite Menu Container - Height is required for the canvas */}
        <div className="w-full h-[600px] md:h-[800px] relative rounded-xl overflow-hidden border border-border/50 bg-white">
          <InfiniteMenu items={menuItems} />
        </div>
      </div>
    </section>
  );
};
