import { motion } from "framer-motion";
import { Shield, AlertTriangle, BarChart3, Download, Clock } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const labels = [
  { text: "Graph Analysis Engine", x: "left-4 top-4", color: "primary" },
  { text: "Fraud Ring Detection", x: "right-4 top-4", color: "destructive" },
  { text: "Risk Scoring", x: "left-4 bottom-4", color: "primary" },
  { text: "Suspicious Node Highlighting", x: "right-4 bottom-4", color: "destructive" },
];

const timelineEvents = [
  { time: "14:23:01", event: "Circular pattern detected", severity: "high" },
  { time: "14:23:04", event: "Fan-in anomaly flagged", severity: "medium" },
  { time: "14:23:08", event: "Risk score updated: ACC-7291 → 94", severity: "high" },
  { time: "14:23:12", event: "Fraud ring cluster confirmed", severity: "high" },
];

export default function DashboardShowcase() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-destructive/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-14">
          <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">Product</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Investigation Dashboard</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive fraud investigation interface designed for financial crime analysts.
          </p>
        </motion.div>

        {/* Dashboard mock */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
          className="glass-card rounded-2xl p-2 sm:p-3 max-w-6xl mx-auto glow-cyan">
          <div className="rounded-xl border border-border bg-background overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-destructive/60" />
                <span className="w-3 h-3 rounded-full bg-warning" />
                <span className="w-3 h-3 rounded-full bg-primary/40" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">strivion.app/investigation/INV-2026-0391</span>
            </div>

            <div className="grid lg:grid-cols-4 gap-0">
              {/* Main graph area */}
              <div className="lg:col-span-3 p-5 relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-foreground">Transaction Network — Case INV-2026-0391</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">3 Fraud Rings</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">47 Nodes</span>
                  </div>
                </div>

                {/* Graph SVG */}
                <div className="relative aspect-[16/9] rounded-lg bg-muted/20 border border-border overflow-hidden">
                  <svg viewBox="0 0 600 340" className="w-full h-full" fill="none">
                    {/* Grid */}
                    <defs>
                      <pattern id="showcase-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <circle cx="15" cy="15" r="0.5" fill="hsl(var(--muted-foreground))" opacity="0.2" />
                      </pattern>
                    </defs>
                    <rect width="600" height="340" fill="url(#showcase-grid)" />

                    {/* Edges */}
                    <line x1="120" y1="80" x2="280" y2="60" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
                    <line x1="280" y1="60" x2="440" y2="90" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
                    <line x1="440" y1="90" x2="500" y2="200" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
                    <line x1="280" y1="60" x2="300" y2="170" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
                    <line x1="120" y1="80" x2="80" y2="200" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
                    <line x1="80" y1="200" x2="200" y2="260" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
                    <line x1="500" y1="200" x2="400" y2="280" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />

                    {/* Fraud ring 1 */}
                    <line x1="160" y1="160" x2="260" y2="120" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.6" />
                    <line x1="260" y1="120" x2="320" y2="200" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.6" />
                    <line x1="320" y1="200" x2="220" y2="240" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.6" />
                    <line x1="220" y1="240" x2="160" y2="160" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.6" />

                    {/* Fraud ring 2 */}
                    <line x1="380" y1="140" x2="460" y2="160" stroke="hsl(var(--destructive))" strokeWidth="1.5" opacity="0.5" />
                    <line x1="460" y1="160" x2="420" y2="240" stroke="hsl(var(--destructive))" strokeWidth="1.5" opacity="0.5" />
                    <line x1="420" y1="240" x2="380" y2="140" stroke="hsl(var(--destructive))" strokeWidth="1.5" opacity="0.5" />

                    {/* Normal nodes */}
                    {[[120,80],[280,60],[440,90],[80,200],[200,260],[500,200],[400,280],[300,170]].map(([cx,cy], i) => (
                      <circle key={i} cx={cx} cy={cy} r="6" fill="hsl(var(--primary))" opacity="0.6" />
                    ))}

                    {/* Fraud ring 1 nodes */}
                    {[[160,160],[260,120],[320,200],[220,240]].map(([cx,cy], i) => (
                      <g key={`fr1-${i}`}>
                        <circle cx={cx} cy={cy} r="12" fill="hsl(var(--destructive))" opacity="0.12" />
                        <circle cx={cx} cy={cy} r="7" fill="hsl(var(--destructive))" opacity="0.8" />
                      </g>
                    ))}

                    {/* Fraud ring 2 nodes */}
                    {[[380,140],[460,160],[420,240]].map(([cx,cy], i) => (
                      <g key={`fr2-${i}`}>
                        <circle cx={cx} cy={cy} r="10" fill="hsl(var(--destructive))" opacity="0.12" />
                        <circle cx={cx} cy={cy} r="6" fill="hsl(var(--destructive))" opacity="0.7" />
                      </g>
                    ))}

                    {/* Ring labels */}
                    <text x="240" y="185" textAnchor="middle" fill="hsl(var(--destructive))" fontSize="9" fontWeight="700" opacity="0.8">Ring A</text>
                    <text x="420" y="195" textAnchor="middle" fill="hsl(var(--destructive))" fontSize="8" fontWeight="700" opacity="0.7">Ring B</text>
                  </svg>

                  {/* Floating labels */}
                  {labels.map((label) => (
                    <span key={label.text} className={`absolute ${label.x} text-[9px] font-semibold px-2 py-1 rounded-md bg-${label.color}/10 text-${label.color} border border-${label.color}/20`}>
                      {label.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right sidebar */}
              <div className="border-l border-border p-4 space-y-4 bg-muted/10">
                {/* Stats */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Summary</h4>
                  {[
                    { label: "Accounts Analyzed", value: "47" },
                    { label: "Fraud Rings", value: "3" },
                    { label: "High Risk Accounts", value: "7" },
                    { label: "Total Transactions", value: "312" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="font-bold text-foreground">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-3">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Timeline
                  </h4>
                  <div className="space-y-2">
                    {timelineEvents.map((evt, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <AlertTriangle className={`w-3 h-3 shrink-0 mt-0.5 ${evt.severity === "high" ? "text-destructive" : "text-warning"}`} />
                        <div>
                          <p className="text-[10px] text-foreground font-medium leading-tight">{evt.event}</p>
                          <p className="text-[9px] text-muted-foreground font-mono">{evt.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-3 space-y-2">
                  <button className="w-full text-[10px] font-semibold px-3 py-2 rounded-lg bg-primary text-primary-foreground flex items-center justify-center gap-1.5">
                    <Download className="w-3 h-3" /> Export Report
                  </button>
                  <button className="w-full text-[10px] font-semibold px-3 py-2 rounded-lg border border-border text-foreground flex items-center justify-center gap-1.5">
                    <BarChart3 className="w-3 h-3" /> Risk Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
