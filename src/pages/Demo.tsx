import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Network, ArrowRight, Cpu, BarChart3,
  AlertTriangle, Shield, Database, Layers,
  RefreshCw, Users, FileJson, Play, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import GraphVisualization from "@/components/GraphVisualization";
import FraudRingTable from "@/components/FraudRingTable";
import SummaryStats from "@/components/SummaryStats";
import { parseCSVText } from "@/lib/csvParser";
import { analyzeTransactions, AnalysisResult } from "@/lib/graphAnalysis";
import { fadeUp } from "@/lib/animations";

const workflowSteps = [
  {
    icon: Database,
    title: "Transaction Dataset",
    desc: "CSV file with transaction_id, sender_id, receiver_id, amount, and timestamp fields.",
  },
  {
    icon: Network,
    title: "Graph Network Construction",
    desc: "Transaction records are converted into a directed network graph of nodes and edges.",
  },
  {
    icon: Cpu,
    title: "Pattern Detection Algorithms",
    items: [
      { icon: RefreshCw, label: "Circular Routing Detection", example: "A → B → C → A" },
      { icon: Users, label: "Smurfing Pattern Detection", example: "Fan-in / Fan-out" },
      { icon: Layers, label: "Layered Transfer Chain Detection", example: "Multi-hop shells" },
    ],
  },
  {
    icon: BarChart3,
    title: "Risk Scoring Engine",
    desc: "Suspicious accounts receive risk scores and are grouped into detected fraud rings.",
  },
  {
    icon: FileJson,
    title: "Investigation Dashboard & Report",
    desc: "Interactive graph visualization, fraud ring registry, and downloadable JSON investigation report.",
  },
];

export default function Demo() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const loadSampleData = useCallback(async () => {
    setIsLoading(true);
    setErrors([]);
    setAnalysis(null);

    await new Promise((r) => setTimeout(r, 100));

    try {
      const response = await fetch("/sample_transactions.csv");
      const text = await response.text();
      const { transactions, errors: parseErrors } = parseCSVText(text);
      if (parseErrors.length > 0) setErrors(parseErrors.slice(0, 5));
      if (transactions.length === 0) {
        setErrors(["No valid transactions found in sample dataset."]);
        setIsLoading(false);
        return;
      }
      const result = analyzeTransactions(transactions);
      setAnalysis(result);
    } catch {
      setErrors(["Failed to load sample dataset."]);
    }
    setIsLoading(false);
  }, []);

  // Auto-load sample data on mount
  useEffect(() => {
    loadSampleData();
  }, [loadSampleData]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6">
        {/* ── HERO ── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-3xl">
            <motion.p initial="hidden" animate="visible" custom={0} variants={fadeUp}
              className="text-sm text-primary font-medium uppercase tracking-widest mb-4">
              Platform Demonstration
            </motion.p>
            <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Strivion Platform Demonstration
            </motion.h1>
            <motion.p initial="hidden" animate="visible" custom={2} variants={fadeUp}
              className="text-lg text-muted-foreground mb-4">
              See how Strivion detects hidden money-muling networks using graph analytics.
            </motion.p>
            <motion.p initial="hidden" animate="visible" custom={3} variants={fadeUp}
              className="text-muted-foreground mb-8">
              This demonstration shows how transaction data is transformed into network graphs
              and analyzed to detect suspicious financial behavior.
            </motion.p>
            <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}
              className="flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2 glow-button">
                <Eye className="w-4 h-4" /> View Investigation Dashboard
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/analysis")}>
                <ArrowRight className="w-4 h-4 mr-2" /> Run Your Own Analysis
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ── LOADING STATE ── */}
        {isLoading && (
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}
            className="panel rounded-2xl p-12 text-center mb-12">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-foreground font-semibold">Analyzing sample transaction network...</p>
            <p className="text-sm text-muted-foreground mt-1">Running detection algorithms on graph data</p>
          </motion.div>
        )}

        {/* ── ERRORS ── */}
        {errors.length > 0 && (
          <div className="panel rounded-xl p-4 border-amber-500/30 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-amber-400">Parse Warnings</span>
            </div>
            <ul className="space-y-1">
              {errors.map((e, i) => (
                <li key={i} className="text-xs text-muted-foreground font-mono">{e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ── INVESTIGATION DASHBOARD ── */}
        {analysis && (
          <motion.div id="dashboard" initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            {/* Summary Stats */}
            <section className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  01 — Analysis Summary
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <SummaryStats analysis={analysis} />
            </section>

            {/* Graph Visualization */}
            <section className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  02 — Transaction Network Graph
                </span>
                <div className="h-px flex-1 bg-border" />
                <span className="text-[10px] text-muted-foreground">
                  Hover nodes for details · Click for investigation panel
                </span>
              </div>
              <GraphVisualization analysis={analysis} />
            </section>

            {/* Detection Results */}
            <section className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  03 — Detection Results
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: RefreshCw,
                    title: "Circular Fund Routing Detected",
                    desc: analysis.fraudRings.filter(r => r.pattern_type === "cycle").length > 0
                      ? `${analysis.fraudRings.filter(r => r.pattern_type === "cycle").length} circular transaction ring(s) identified`
                      : "No circular routing detected",
                    accounts: analysis.fraudRings.find(r => r.pattern_type === "cycle")?.member_accounts.slice(0, 3).join(" → "),
                    score: analysis.fraudRings.find(r => r.pattern_type === "cycle")?.risk_score,
                    active: analysis.fraudRings.some(r => r.pattern_type === "cycle"),
                  },
                  {
                    icon: Users,
                    title: "Smurfing Pattern Detected",
                    desc: analysis.fraudRings.filter(r => r.pattern_type.includes("smurfing")).length > 0
                      ? `${analysis.fraudRings.filter(r => r.pattern_type.includes("smurfing")).length} smurfing pattern(s) flagged`
                      : "No smurfing patterns detected",
                    accounts: analysis.fraudRings.find(r => r.pattern_type.includes("smurfing"))?.member_accounts.slice(0, 3).join(", "),
                    score: analysis.fraudRings.find(r => r.pattern_type.includes("smurfing"))?.risk_score,
                    active: analysis.fraudRings.some(r => r.pattern_type.includes("smurfing")),
                  },
                  {
                    icon: Layers,
                    title: "Layered Shell Transfers",
                    desc: analysis.fraudRings.filter(r => r.pattern_type === "layered_transfer").length > 0
                      ? `${analysis.fraudRings.filter(r => r.pattern_type === "layered_transfer").length} layered chain(s) found`
                      : "No layered transfers detected",
                    accounts: analysis.fraudRings.find(r => r.pattern_type === "layered_transfer")?.member_accounts.slice(0, 3).join(" → "),
                    score: analysis.fraudRings.find(r => r.pattern_type === "layered_transfer")?.risk_score,
                    active: analysis.fraudRings.some(r => r.pattern_type === "layered_transfer"),
                  },
                ].map((card) => (
                  <div key={card.title} className={`glass-card rounded-xl p-5 ${card.active ? "border-destructive/30" : ""}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`p-1.5 rounded-lg ${card.active ? "bg-destructive/15" : "bg-accent"}`}>
                        <card.icon className={`w-4 h-4 ${card.active ? "text-destructive" : "text-primary"}`} />
                      </div>
                      {card.active && card.score && (
                        <span className="ml-auto text-xs font-bold text-destructive">{card.score.toFixed(1)}</span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-1">{card.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{card.desc}</p>
                    {card.accounts && (
                      <p className="text-[10px] font-mono text-primary/80 bg-primary/5 px-2 py-1 rounded">
                        {card.accounts}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Risk Scoring Panel */}
            <section className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  04 — Risk Scoring
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="panel rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    Suspicious Accounts by Risk Score
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account ID</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Risk Score</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Detected Pattern</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ring ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.nodes
                        .filter(n => n.isSuspicious)
                        .sort((a, b) => b.suspicionScore - a.suspicionScore)
                        .slice(0, 10)
                        .map((node, i) => (
                          <tr key={node.id} className={`border-b border-border/50 ${i % 2 === 0 ? "" : "bg-muted/15"}`}>
                            <td className="px-4 py-3 font-mono text-xs font-semibold text-foreground">{node.id}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-bold ${
                                node.suspicionScore >= 60
                                  ? "text-destructive bg-destructive/10 border-destructive/20"
                                  : node.suspicionScore >= 30
                                    ? "text-amber-500 bg-amber-500/10 border-amber-500/20"
                                    : "text-primary bg-primary/10 border-primary/20"
                              }`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                {node.suspicionScore}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {node.detectedPatterns.map(p => (
                                  <span key={p} className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive border border-destructive/20">
                                    {p.replace(/_/g, " ")}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-primary">{node.ringId || "—"}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Fraud Ring Table */}
            <section className="mb-12">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  05 — Fraud Ring Registry
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <FraudRingTable rings={analysis.fraudRings} />
            </section>
          </motion.div>
        )}

        {/* ── DETECTION ENGINE WORKFLOW ── */}
        <section className="mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-12">
            <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">Engine Workflow</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How the Detection Engine Works</h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-px" />

            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.5}
                variants={fadeUp}
                className={`relative flex items-start gap-6 mb-10 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-accent border border-border flex items-center justify-center z-10">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>

                <div className={`ml-20 lg:ml-0 lg:w-[calc(50%-3rem)] ${
                  i % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                } ${i % 2 === 0 ? "" : "lg:ml-auto"}`}>
                  <div className="glass-card rounded-xl p-5 hover-lift">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-2">{step.title}</h3>
                    {step.desc && (
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    )}
                    {step.items && (
                      <div className="space-y-2 mt-2">
                        {step.items.map((item) => (
                          <div key={item.label} className="flex items-start gap-2">
                            <item.icon className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="text-xs font-semibold text-foreground">{item.label}</span>
                              <span className="text-xs text-muted-foreground ml-1.5">{item.example}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="mb-16">
          <div className="panel rounded-2xl p-12 text-center">
            <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Run Your Own Investigation
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Upload transaction data and analyze financial networks using Strivion's detection engine.
            </p>
            <Button size="lg" onClick={() => navigate("/analysis")} className="gap-2 glow-button">
              Run Analysis <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
