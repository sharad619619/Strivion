import { motion } from "framer-motion";
import { Shield, Lightbulb, Eye, Heart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { fadeUp } from "@/lib/animations";
import founderPhoto from "@/assets/founder-photo.png";

const values = [
  { icon: Shield, title: "Security", desc: "Data protection is at the core of everything we build." },
  { icon: Lightbulb, title: "Innovation", desc: "Pushing the boundaries of financial crime detection with graph analytics." },
  { icon: Eye, title: "Transparency", desc: "Open, explainable analysis that investigators can trust." },
  { icon: Heart, title: "Trust", desc: "Building lasting relationships with financial institutions worldwide." },
];

export default function About() {
  return (
    <Layout>
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <motion.p initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-sm text-primary font-medium uppercase tracking-widest mb-4">About</motion.p>
            <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Making Financial Crime Detection Accessible
            </motion.h1>
            <motion.p initial="hidden" animate="visible" custom={2} variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
              Strivion was founded with a clear mission: build powerful financial investigation tools using AI and graph analytics that make it easier for teams of any size to detect and prevent financial crime.
            </motion.p>
          </div>

          {/* Mission */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="panel rounded-xl p-10 max-w-3xl mb-20">
            <p className="text-sm text-primary font-medium uppercase tracking-widest mb-4">Our Mission</p>
            <p className="text-xl text-foreground font-medium leading-relaxed">
              Build powerful financial investigation tools using AI and graph analytics to make financial crime detection faster, more accurate, and accessible to organizations worldwide.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="max-w-3xl mb-20">
            <p className="text-sm text-primary font-medium uppercase tracking-widest mb-4">Our Vision</p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To make financial crime detection faster and more accessible worldwide — empowering every bank, fintech company, and regulatory body with the tools to protect their ecosystems.
            </p>
          </motion.div>

          {/* Values */}
          <div className="mb-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-12">
              <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">Our Values</p>
              <h2 className="text-3xl font-bold text-foreground">What Drives Us</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
              {values.map((v, i) => (
                <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                  className="flex gap-4 p-6 rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Founder */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">Founder</p>
            <h2 className="text-3xl font-bold text-foreground mb-8">Built by Vision</h2>
            <div className="panel rounded-xl p-8 max-w-3xl">
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <img
                  src={founderPhoto}
                  alt="Sharad Singh - Founder & CEO"
                  className="w-28 h-28 rounded-full object-cover shrink-0 border-2 border-border"
                />
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Sharad Singh</h3>
                  <p className="text-sm text-primary font-medium mb-4">Founder & CEO</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sharad Singh is a visionary entrepreneur focused on solving real-world problems through technology. He has built multiple ventures and is passionate about developing next-generation financial intelligence tools. Through Strivion, he is pioneering graph-based financial forensics systems that help uncover hidden fraud networks and complex money-muling operations. His work focuses on combining data, AI, and graph analytics to build powerful investigation platforms for the future of financial security.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
