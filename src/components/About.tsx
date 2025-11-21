import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import { Globe, Code, Brain, Database, TrendingUp, GitBranch } from "lucide-react";

export const About = () => {
  return (
    <section className="bg-background py-24 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-foreground mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {/* Main Bio Card - Spans 2 columns */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SpotlightCard className="h-full bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-colors">
              <h3 className="text-3xl font-bold text-foreground mb-4">Who I Am</h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                I bridge the gap between complex AI research and real-world application. 
                With a core focus on Machine Learning, Deep Learning, and LLMs, I don't 
                just build models—I ensure they are understood.
              </p>
            </SpotlightCard>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard className="h-full bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-foreground/20 transition-colors">
              <div className="text-6xl font-bold text-foreground mb-2">3+</div>
              <div className="text-xl text-foreground/70">Years Experience</div>
            </SpotlightCard>
          </motion.div>

          {/* Tech Stack Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SpotlightCard className="h-full bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-colors">
              <h3 className="text-2xl font-bold text-foreground mb-6">Arsenal</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Code className="w-8 h-8 text-foreground/70" />
                  <span className="text-sm text-foreground/70">Python</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Database className="w-8 h-8 text-foreground/70" />
                  <span className="text-sm text-foreground/70">Data Science</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Brain className="w-8 h-8 text-foreground/70" />
                  <span className="text-sm text-foreground/70">ML & DL</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <TrendingUp className="w-8 h-8 text-foreground/70" />
                  <span className="text-sm text-foreground/70">Analytics</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <GitBranch className="w-8 h-8 text-foreground/70" />
                  <span className="text-sm text-foreground/70">Git & GitHub</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Brain className="w-8 h-8 text-foreground/70" />
                  <span className="text-sm text-foreground/70">Fine-tuning</span>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Currently Learning Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SpotlightCard className="h-full bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-colors">
              <h3 className="text-2xl font-bold text-foreground mb-4">Loading...</h3>
              <p className="text-lg text-foreground/70">
                Currently exploring AI Agents & SLMs.
              </p>
            </SpotlightCard>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <SpotlightCard className="h-full bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-foreground/20 transition-colors">
              <Globe className="w-12 h-12 text-foreground/70 mb-4" />
              <p className="text-lg text-foreground/80">
                Based in India,<br />Tamil Nadu, Chennai
              </p>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
