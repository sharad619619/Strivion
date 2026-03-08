import { motion } from "framer-motion";
import { Shield, Server, Scale, FileCheck } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const trustCards = [
  {
    icon: Shield,
    title: "Secure Data Processing",
    desc: "All transaction data is processed securely with strict access controls and encryption at rest.",
  },
  {
    icon: Server,
    title: "Scalable Architecture",
    desc: "Designed to analyze large transaction datasets efficiently with parallel graph processing.",
  },
  {
    icon: Scale,
    title: "Compliance Ready",
    desc: "Supports investigation workflows used by financial institutions and regulators worldwide.",
  },
  {
    icon: FileCheck,
    title: "Audit-Friendly Reports",
    desc: "Generate structured investigation reports for compliance and legal review teams.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-24 px-6 bg-muted/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-14">
          <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">Trust & Security</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Enterprise-Grade Security and Reliability</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built for financial institutions that demand the highest standards of data security and compliance.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.5}
              variants={fadeUp}
              className="glass-card rounded-xl p-6 text-center hover-lift group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
