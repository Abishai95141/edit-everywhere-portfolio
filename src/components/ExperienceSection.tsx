import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TimelineEvent {
  title: string;
  date: string;
  description: string;
}

const events: TimelineEvent[] = [
  {
    title: "GNS AI, Research Intern",
    date: "July 2024",
    description: "Contributed to core research initiatives related to product development and market research."
  },
  {
    title: "KU Hackathon",
    date: "February 2025",
    description: "Participated in my first 24-hour hackathon at Kalinga University. After traveling over 1,500 km to attend, we were shortlisted into the final 10, competing against top teams from IITs and NITs."
  },
  {
    title: "Gidy Hackathon Victory",
    date: "March 2024",
    description: "Secured 1st place at the Techpreneur Hackathon hosted by Gidy.ai at Saveetha Engineering College. Out of 100+ registered teams, we clinched the victory with \"FiscalAI,\" our AI-driven GDP growth prediction and budget allocation model."
  },
  {
    title: "\"Breaking the Brain\" Workshop Host",
    date: "June 2025",
    description: "Organized and hosted a technical workshop designed to demystify Large Language Models. I guided participants through the internal architecture of LLMs and led a hands-on session where they fine-tuned a model for the first time."
  },
  {
    title: "NASSCOM Developer Confluence",
    date: "August 2025",
    description: "Shortlisted to present our research work at this prestigious conference. We proudly represented Saveetha Engineering College, showcasing our findings to a panel of industry experts and leaders."
  }
];

export const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="relative py-20 md:py-32 px-4 md:px-8 bg-background"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-16 md:mb-24"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-foreground">
          Experience & Milestones
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Timeline Line Container */}
        <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px]">
          {/* Background Grey Line */}
          <div className="absolute inset-0 bg-muted-foreground/20" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute inset-0 bg-foreground origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Timeline Events */}
        <div className="space-y-16 md:space-y-24">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative flex items-center ${
                  isLeft 
                    ? "md:flex-row flex-row" 
                    : "md:flex-row-reverse flex-row"
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${isLeft ? "md:pr-16 pl-12" : "md:pl-16 pl-12"} md:pl-0`}>
                  <motion.div 
                    className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-sm md:text-base text-muted-foreground font-medium mb-2">
                      {event.date}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                      {event.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Node */}
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="w-full h-full rounded-full bg-foreground border-4 border-background shadow-lg"
                  />
                </div>

                {/* Spacer for desktop layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
