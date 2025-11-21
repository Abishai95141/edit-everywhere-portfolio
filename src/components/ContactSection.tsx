import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";
import TiltedCard from "./TiltedCard";
import profileImage from "@/assets/profile-contact.jpg";

export const ContactSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-background py-20 px-6 md:px-12 lg:px-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Text & Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
            >
              Get in Touch
            </motion.h2>

            <motion.a
              variants={itemVariants}
              href="mailto:abishaioff@gmail.com"
              className="block text-3xl md:text-4xl font-semibold text-primary hover:text-primary/80 transition-colors group"
            >
              <Mail className="inline-block w-8 h-8 mr-3 mb-1" />
              abishaioff@gmail.com
            </motion.a>

            <motion.div 
              variants={itemVariants}
              className="flex gap-6 pt-4"
            >
              <a
                href="https://www.linkedin.com/in/abishai-k-c-6a5288271/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xl text-foreground hover:text-primary transition-colors group"
              >
                <div className="p-3 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/Abishai95141"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xl text-foreground hover:text-primary transition-colors group"
              >
                <div className="p-3 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                  <Github className="w-6 h-6" />
                </div>
                <span>GitHub</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Tilted Card */}
          <div className="flex justify-center">
            <TiltedCard
              imageSrc={profileImage}
              altText="Abishai K C"
              captionText="Abishai K C"
              containerHeight="500px"
              containerWidth="100%"
              imageHeight="400px"
              imageWidth="400px"
              scaleOnHover={1.1}
              rotateAmplitude={14}
              showMobileWarning={true}
              showTooltip={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
