import { motion } from "framer-motion";
import { Database, Cpu, Shield, Eye, FileJson, ArrowDown } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const layers = [
  {
    icon: Database,
    title: "Data Layer",
    color: "primary",
    items: ["Transaction datasets", "Banking system exports", "CSV uploads", "API data streams"],
  },
  {
    icon: Cpu,
    title: "Processing Layer",
    color: "primary",
    items: ["Data cleaning", "Transaction graph construction", "Node relationship mapping"],
  },
  {
    icon: Shield,
    title: "Detection Layer",
    color: "destructive",
    items: ["Circular transaction detection", "Smurfing pattern analysis", "Layered chain detection", "Behavior anomaly detection"],
  },
  {
    icon: Eye,
    title: "Intelligence Layer",
    color: "suspicious",
    items: ["Risk scoring engine", "Suspicious node identification", "Fraud ring clustering"],
  },
  {
    icon: Eye,
    title: "Visualization Layer",
    color: "primary",
    items: ["Interactive graph visualization", "Investigation dashboard", "Fraud ring exploration"],
  },
  {
    icon: FileJson,
    title: "Output Layer",
    color: "primary",
    items: ["JSON investigation reports", "Suspicious account summaries", "Fraud ring evidence"],
  },
];

export default function ArchitectureSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
          <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">Architecture</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How Strivion Detects Financial Crime</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A multi-layer AI and graph analytics pipeline designed for financial investigation teams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.5}
              variants={fadeUp}
              className="glass-card rounded-xl p-6 group hover-lift relative"
            >
              {/* Connection arrow for flow */}
              {i < layers.length - 1 && i % 3 !== 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                  <ArrowDown className="w-4 h-4 text-primary/40 rotate-[-90deg]" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <layer.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Step {i + 1}</span>
                  <h3 className="text-sm font-bold text-foreground">{layer.title}</h3>
                </div>
              </div>
              <ul className="space-y-1.5">
                {layer.items.map((item) => (
                  <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Flow indicator */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp} className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Real-time pipeline processing
          </div>
        </motion.div>
      </div>
    </section>
  );
}
