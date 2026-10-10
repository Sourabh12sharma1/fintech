import { useEffect, useRef, useState } from 'react';
import {
  TrendingUp, FileText, Shield, BarChart3,
  ArrowRight, Play, ChevronDown, CheckCircle2,
  ExternalLink, Lock, Server, Database,
  Network, Key, Eye, FileCheck, Zap,
  Users, Building2, Briefcase, Landmark,
  ArrowUpRight, ArrowDownRight, Activity,
  Globe, Cpu, HardDrive, Cloud
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

/* ─── Mock Data ─────────────────────────────────────────────── */

const STOCK_DATA = [
  { date: 'Jan', value: 4200 }, { date: 'Feb', value: 4350 },
  { date: 'Mar', value: 4100 }, { date: 'Apr', value: 4580 },
  { date: 'May', value: 4720 }, { date: 'Jun', value: 4650 },
  { date: 'Jul', value: 4900 }, { date: 'Aug', value: 5100 },
  { date: 'Sep', value: 4950 }, { date: 'Oct', value: 5200 },
  { date: 'Nov', value: 5400 }, { date: 'Dec', value: 5580 },
];

const PORTFOLIO_DATA = [
  { name: 'Technology', value: 35, return: 22.5 },
  { name: 'Healthcare', value: 18, return: 14.2 },
  { name: 'Finance', value: 15, return: 9.8 },
  { name: 'Energy', value: 12, return: -3.5 },
  { name: 'Consumer', value: 10, return: 11.0 },
  { name: 'Other', value: 10, return: 7.5 },
];

const DOC_METRICS = {
  revenue: { current: '3.2B', previous: '2.7B', growth: 18.5 },
  netIncome: { current: '420M', previous: '345M', growth: 21.7 },
  ebitda: { current: '680M', previous: '580M', growth: 17.2 },
  roe: '22.4%',
  roi: '18.6%',
};

const ARCHITECTURE_STEPS = [
  'Market Data', 'Data Engineering', 'Feature Engineering',
  'Financial Models', 'Signal Detection', 'Risk Analysis',
  'Intelligence', 'Decision Support',
];

const DOC_PIPELINE = [
  'PDF/Excel/CSV Reports', 'Document AI', 'Data Extraction',
  'Validation', 'Financial Analysis', 'Insights',
];

const PIPELINE_STAGES = [
  'Collect', 'Process', 'Understand', 'Analyze', 'Model', 'Validate', 'Decide',
];

const SECURITY_FEATURES = [
  { icon: Shield, title: 'On-Premise Deployment', desc: 'Full deployment within your infrastructure. No mandatory cloud dependency.' },
  { icon: Network, title: 'Network Isolation', desc: 'Configurable network isolation with private subnet deployment options.' },
  { icon: Key, title: 'Enterprise Authentication', desc: 'SSO, LDAP, and custom identity provider integration.' },
  { icon: Lock, title: 'Role-Based Access', desc: 'Granular permissions at model, data, and feature levels.' },
  { icon: Eye, title: 'Audit Logging', desc: 'Comprehensive audit trail for all model accesses and operations.' },
  { icon: Server, title: 'Local Model Execution', desc: 'All models execute locally with configurable inference capacity.' },
];

const CLIENT_TYPES = [
  { icon: TrendingUp, label: 'Trading Firms', desc: 'Real-time signals & trade analytics' },
  { icon: Briefcase, label: 'Investment Firms', desc: 'Proprietary models & research automation' },
  { icon: Landmark, label: 'Family Offices', desc: 'Private portfolio analytics & reporting' },
  { icon: Building2, label: 'Financial Institutions', desc: 'Compliance, risk, & secure AI' },
  { icon: Users, label: 'Research Teams', desc: 'Intelligent document analysis & insights' },
  { icon: Globe, label: 'Fintech Companies', desc: 'White-label AI infrastructure' },
];

/* ─── Hooks ─────────────────────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Reusable Components ───────────────────────────────────── */

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-24 lg:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} mb-16`}>
      {eyebrow && (
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-brand-500/10 text-brand-400 rounded-full mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
        {title}
      </h2>
      {subtitle && <p className="text-lg text-white/50 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, index = 0, delay = 0 }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="group relative glass-card rounded-2xl p-8 transition-all duration-500 hover:border-brand-500/30 hover:-translate-y-1"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ease ${delay}ms`,
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-6 group-hover:bg-brand-500/20 transition-colors">
        <Icon size={24} className="text-brand-400" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      <div className="mt-6 flex items-center gap-1 text-brand-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Learn More <ArrowRight size={14} />
      </div>
    </div>
  );
}

function AnimatedCounter({ value, label, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    const numVal = parseInt(value);
    if (isNaN(numVal)) { setCount(numVal); return; }
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * numVal));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl lg:text-4xl font-bold gradient-text-accent">
        {count}{suffix}
      </div>
      <div className="text-sm text-white/40 mt-1">{label}</div>
    </div>
  );
}

/* ─── Home Page ─────────────────────────────────────────────── */

export default function HomePage() {
  const [heroRef, heroVisible] = useInView();
  const [pipelineRef, pipelineVisible] = useInView();

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grid-bg neural-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 via-transparent to-[#08090a]" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div
            className="transition-all duration-1000"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-sm text-brand-300 font-medium">Proprietary Financial Intelligence</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
              Financial Intelligence.{' '}
              <span className="gradient-text-accent">Built for the</span>
              <br />
              <span className="gradient-text-accent">Next Market.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
              We build proprietary financial-market models, intelligent document analysis systems,
              and secure AI infrastructure for organizations that demand control over their data and intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#platform"
                className="group px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-brand-500/25 inline-flex items-center justify-center gap-2"
              >
                Explore Our Technology
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#private-ai"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2"
              >
                <Shield size={18} />
                Build Your Private AI Environment
              </a>
            </div>

            {/* Data flow visualization */}
            <div className="mt-20 flex flex-wrap items-center justify-center gap-2 md:gap-0">
              {['Market Data', 'AI Models', 'Documents', 'Intelligence', 'Decisions'].map((step, i, arr) => (
                <div key={step} className="flex items-center">
                  <div className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-lg text-sm font-medium text-white/70">
                    <Activity size={14} className="text-brand-400" />
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight size={16} className="text-brand-500/50 mx-2 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={24} className="text-white/30" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* THE PROBLEM */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section className="bg-[#0f1114]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="The Problem"
              title="Financial Intelligence Shouldn't Be Trapped in Legacy Processes."
              align="left"
            />
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Organizations today struggle with financial analysis that is manual, fragmented,
              and slow. Disconnected systems, repetitive reporting, and cloud restrictions
              prevent financial teams from moving at the speed of the market.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Manual Spreadsheets',
                'Disconnected Systems',
                'Slow Analysis',
                'Cloud Restrictions',
                'Data Fragmentation',
                'Repetitive Reporting',
                'Limited Controls',
                'Sensitive Information',
                'Token Exhaustion',
                'High Subscription Costs',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 glass-card rounded-xl border-brand-500/20">
              <p className="text-white font-medium mb-2">Our Approach</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Modernize the financial intelligence layer. Build proprietary models,
                automate document processing, and deploy AI infrastructure that respects
                your data sovereignty.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="glass-card rounded-2xl p-8 glow-blue">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="text-xs text-white/30 ml-2">financial_analysis.xlsx</span>
              </div>
              <div className="space-y-3">
                {['Sheet1', 'Sheet2', 'Sheet3', 'Sheet4'].map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className="h-8 rounded bg-white/5 animate-pulse"
                      style={{ width: `${40 + i * 15}%`, animationDelay: `${i * 0.3}s` }}
                    />
                  </div>
                ))}
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-4 rounded bg-white/3 flex-1" style={{ animationDelay: `${i * 0.1}s` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 glass-card rounded-xl p-4 border-brand-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent-green" />
                <span className="text-xs text-white/60">Automated. Intelligent. Secure.</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* TECHNOLOGY CARDS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="platform">
        <SectionHeader
          eyebrow="Our Technology"
          title="Four Pillars of Financial Intelligence"
          subtitle="From market signals to secure deployment, we provide a complete stack for modern financial analysis."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={TrendingUp}
            title="Market Intelligence"
            description="Proprietary financial-market models for trend detection, signal generation, sentiment analysis, and quantitative trading strategies."
            delay={0}
          />
          <FeatureCard
            icon={FileText}
            title="Document Intelligence"
            description="AI-powered analysis of financial statements, trade reports, portfolios, and contracts. Extract, validate, and structure information automatically."
            delay={100}
          />
          <FeatureCard
            icon={BarChart3}
            title="Financial Analytics"
            description="Unified analytics combining market data, documents, and proprietary models. Automated reports, dashboards, and decision-support insights."
            delay={200}
          />
          <FeatureCard
            icon={Shield}
            title="Private AI Infrastructure"
            description="On-premise deployment with local model execution. Your data stays in your environment. Complete control over infrastructure and inference."
            delay={300}
          />
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PROPRIETARY MODELS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="market-intelligence" className="bg-[#0f1114]">
        <SectionHeader
          eyebrow="Proprietary Models"
          title="Built In-House. Designed for Financial Markets."
          subtitle="Our models are developed, tested, and deployed in-house — not borrowed from generic AI. Purpose-built for the complexities of financial markets."
        />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Architecture diagram */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-8">Model Architecture</h3>
            <div className="space-y-3">
              {ARCHITECTURE_STEPS.map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/15 flex items-center justify-center text-xs font-bold text-brand-300 shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm text-white/70">{step}</span>
                  {i < ARCHITECTURE_STEPS.length - 1 && (
                    <div className="ml-auto hidden sm:block">
                      <ArrowRight size={14} className="text-brand-500/40 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Cpu size={16} className="text-brand-400" />
                <span>Continuously trained on historical market data</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/40 mt-2">
                <Activity size={16} className="text-accent-green" />
                <span>Real-time signal generation & validation</span>
              </div>
            </div>
          </div>

          {/* Market chart */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Market Model Performance</h3>
            <div className="glass-card rounded-xl p-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={STOCK_DATA}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0a5eff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0a5eff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.15)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.15)" fontSize={11} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(22,26,31,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#0a5eff" strokeWidth={2} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="glass-card rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-accent-green">+24.8%</div>
                <div className="text-xs text-white/40">YTD Return</div>
              </div>
              <div className="glass-card rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-brand-400">0.78</div>
                <div className="text-xs text-white/40">Sharpe Ratio</div>
              </div>
              <div className="glass-card rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-white/70">94.2%</div>
                <div className="text-xs text-white/40">Signal Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* DOCUMENT INTELLIGENCE */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="document-intelligence">
        <SectionHeader
          eyebrow="Document Intelligence"
          title="Turn Financial Documents Into Structured Intelligence."
          subtitle="Upload financial documents — our AI extracts, validates, and analyzes every data point. From PDFs to Excel, from statements to contracts."
        />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Pipeline */}
          <div>
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-8">Document Processing Pipeline</h3>
              <div className="space-y-4">
                {DOC_PIPELINE.map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-brand-300">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-12 glass-card rounded-lg px-4 flex items-center">
                        <span className="text-sm text-white/70">{step}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Extracted Financial Metrics</h3>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-white/40">Financial Report</div>
                  <div className="text-sm font-medium text-white/70">Q3 2024 Earnings Statement</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-green/10 rounded-lg">
                  <CheckCircle2 size={14} className="text-accent-green" />
                  <span className="text-xs text-accent-green font-medium">{DOC_METRICS.confidence}% confidence</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Revenue', current: DOC_METRICS.revenue.current, prev: DOC_METRICS.revenue.previous, change: DOC_METRICS.revenue.growth },
                  { label: 'Net Income', current: DOC_METRICS.netIncome.current, prev: DOC_METRICS.netIncome.previous, change: DOC_METRICS.netIncome.growth },
                  { label: 'EBITDA', current: DOC_METRICS.ebitda.current, prev: DOC_METRICS.ebitda.previous, change: DOC_METRICS.ebitda.growth },
                  { label: 'ROE', current: DOC_METRICS.roe },
                  { label: 'ROI', current: DOC_METRICS.roi },
                  { label: 'Current Ratio', current: '2.4x' },
                ].map((m) => (
                  <div key={m.label} className="bg-white/3 rounded-lg p-4">
                    <div className="text-xs text-white/40 mb-1">{m.label}</div>
                    <div className="text-lg font-bold text-white">{m.current}</div>
                    {m.change !== undefined && (
                      <div className={`text-xs mt-1 ${m.change >= 0 ? 'text-accent-green' : 'text-red-400'}`}>
                        {m.change >= 0 ? '+' : ''}{m.change}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PRIVATE AI INFRASTRUCTURE */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="private-ai" className="bg-[#0f1114] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-cyan-500/5" />
        <div className="relative z-10">
          <SectionHeader
            eyebrow="Private AI Infrastructure"
            title="AI That Runs Where Your Data Lives."
            subtitle="No unnecessary data movement. No forced public-cloud architecture. Complete control over deployment."
          />

          {/* Architecture visualization */}
          <div className="glass-card rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto glow-blue">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-8">
                <HardDrive size={32} className="text-brand-400" />
              </div>
              <div className="text-sm font-semibold text-white/60 mb-8 tracking-widest uppercase">Company Network</div>
              <div className="w-px h-12 bg-gradient-to-b from-brand-500/30 to-transparent mb-8" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
                {[
                  { icon: Database, label: 'Private Database', desc: 'Isolated data stores' },
                  { icon: FileText, label: 'Financial Documents', desc: 'On-premise processing' },
                  { icon: Cpu, label: 'Local AI Models', desc: 'High-throughput inference' },
                  { icon: Globe, label: 'Internal APIs', desc: 'Controlled API access' },
                  { icon: BarChart3, label: 'Analytics Engine', desc: 'Real-time computation' },
                  { icon: Shield, label: 'Security Layer', desc: 'Encryption & RBAC' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="glass-card rounded-xl p-4 text-center hover:border-brand-500/20 transition-colors">
                    <Icon size={24} className="text-brand-400 mx-auto mb-2" />
                    <div className="text-xs font-medium text-white/70">{label}</div>
                    <div className="text-[10px] text-white/30 mt-1">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="#contact"
              className="group px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-brand-500/25 inline-flex items-center gap-2"
            >
              Explore Private Deployment
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* WHO WE SERVE */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="solutions">
        <SectionHeader
          eyebrow="Who We Serve"
          title="Financial Organizations That Demand More."
          subtitle="From trading floors to family offices, we build financial intelligence systems that respect your operational requirements."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENT_TYPES.map(({ icon: Icon, label, desc }, i) => (
            <div
              key={label}
              className="glass-card rounded-2xl p-6 hover:border-brand-500/20 transition-all hover:-translate-y-1 group"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.6s ease forwards`,
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                <Icon size={20} className="text-brand-400" />
              </div>
              <h3 className="font-semibold mb-1">{label}</h3>
              <p className="text-sm text-white/40">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECURITY */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="security" className="bg-[#0f1114]">
        <SectionHeader
          eyebrow="Security"
          title="Security by Architecture."
          subtitle="Security isn't a bolt-on feature — it's built into every layer of our infrastructure."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECURITY_FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="glass-card rounded-xl p-6 hover:border-brand-500/20 transition-all group"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.6s ease forwards`,
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500/15 transition-colors">
                <Icon size={20} className="text-brand-400" />
              </div>
              <h3 className="font-semibold text-sm mb-2">{title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* DATA TO DECISION PIPELINE */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section>
        <SectionHeader
          eyebrow="Workflow"
          title="From Data to Decision."
          subtitle="Our end-to-end pipeline transforms raw financial data into actionable intelligence."
        />
        <div ref={pipelineRef} className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage} className="flex items-center">
              <div
                className="glass-card rounded-xl px-5 py-4 text-center transition-all duration-500 min-w-[120px]"
                style={{
                  opacity: pipelineVisible ? 1 : 0.3,
                  transform: pipelineVisible ? 'scale(1)' : 'scale(0.9)',
                  transition: `all 0.5s ease ${i * 150}ms`,
                  borderColor: pipelineVisible ? 'rgba(10, 94, 255, 0.2)' : 'rgba(255,255,255,0.06)',
                }}
              >
                <div className="text-sm font-medium text-white/70">{stage}</div>
              </div>
              {i < PIPELINE_STAGES.length - 1 && (
                <ArrowRight size={16} className="text-brand-500/50 mx-1 md:mx-3 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* WHY US COMPARISON */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section className="bg-[#0f1114]">
        <SectionHeader
          eyebrow="Why Us"
          title="The Difference Is Fundamental."
        />
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 border-b border-white/5">
              <div className="p-5 text-sm font-semibold text-white/40 uppercase tracking-wider border-r border-white/5">Traditional Approach</div>
              <div className="p-5 text-sm font-semibold text-brand-400 uppercase tracking-wider">Our Approach</div>
            </div>
            {[
              ['Manual spreadsheets & analysis', 'Automated intelligence pipelines'],
              ['Fragmented data sources', 'Unified financial intelligence'],
              ['Generic AI models', 'Specialized financial models'],
              ['Cloud-dependent only', 'Cloud or private deployment'],
              ['Repetitive manual reporting', 'Automated dynamic reports'],
              ['Static dashboards', 'Real-time analytics & alerts'],
              ['Limited infrastructure control', 'Full infrastructure sovereignty'],
              ['Token exhaustion & rate limits', 'Unlimited local inference capacity'],
              ['High subscription costs', 'Owned models. Predictable costs.'],
            ].map(([old, neww], i) => (
              <div key={i} className={`grid grid-cols-2 ${i < 8 ? 'border-b border-white/5' : ''}`}>
                <div className="p-5 flex items-center gap-3 border-r border-white/5">
                  <ArrowDownRight size={16} className="text-red-400/60 shrink-0" />
                  <span className="text-sm text-white/40">{old}</span>
                </div>
                <div className="p-5 flex items-center gap-3 bg-brand-500/[0.02]">
                  <ArrowUpRight size={16} className="text-accent-green shrink-0" />
                  <span className="text-sm text-white/70 font-medium">{neww}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FUTURE VISION */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="about">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            eyebrow="Future Vision"
            title="Building the Financial Intelligence Infrastructure of Tomorrow."
            subtitle="Our long-term vision is a platform where financial data, market intelligence, proprietary models, documents, and analytics work together as one intelligent system."
          />
          <div className="glass-card rounded-2xl p-8 lg:p-12 text-left">
            <p className="text-white/50 leading-relaxed mb-6">
              We're building more than individual tools — we're architecting the financial intelligence
              layer of the future. A world where market data, document analysis, quantitative models,
              and AI infrastructure work as one unified, intelligent system.
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              An environment where financial organizations can operate with full control over their data,
              deploy models with institutional-grade security, and transform financial documents into
              structured intelligence — all within their own infrastructure.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <AnimatedCounter value="99.2" suffix="%" label="Model Accuracy" />
              <AnimatedCounter value="70" suffix="%" label="Time Reduction" />
              <AnimatedCounter value="50" suffix="+" label="Data Sources" />
              <AnimatedCounter value="100" suffix="%" label="Data Sovereignty" />
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CTA + CONTACT */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="contact" className="bg-[#0f1114] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-cyan-500/5" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Build Your Financial Intelligence Infrastructure.
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Whether you need proprietary market models, intelligent financial-document analysis,
              or a secure local AI environment — we build systems around your requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact form */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Talk to Our Team</h3>
              <ContactForm />
            </div>

            {/* Demo request */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Request a Demo</h3>
              <DemoForm />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

function ContactForm() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus({ type: 'error', msg: data.error });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Network error. Please try again.' });
    }
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input name="name" type="text" placeholder="Your Name" required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500/50 transition-colors" />
      </div>
      <div>
        <input name="email" type="email" placeholder="Email Address" required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500/50 transition-colors" />
      </div>
      <div>
        <input name="company" type="text" placeholder="Company"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500/50 transition-colors" />
      </div>
      <div>
        <select name="interest" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white/50 focus:outline-none focus:border-brand-500/50 transition-colors">
          <option value="">Area of Interest</option>
          <option value="market-intelligence">Market Intelligence</option>
          <option value="document-intelligence">Document Intelligence</option>
          <option value="private-ai">Private AI Infrastructure</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <textarea name="message" rows="4" placeholder="Tell us about your requirements..." required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500/50 transition-colors resize-none" />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full px-6 py-3 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && <p className="text-sm text-accent-green text-center">Message sent successfully!</p>}
      {status?.type === 'error' && <p className="text-sm text-red-400 text-center">{status.msg}</p>}
    </form>
  );
}

function DemoForm() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/demo/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus({ type: 'error', msg: data.error });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Network error. Please try again.' });
    }
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input name="name" type="text" placeholder="Full Name" required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500/50 transition-colors" />
      </div>
      <div>
        <input name="email" type="email" placeholder="Work Email" required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500/50 transition-colors" />
      </div>
      <div>
        <input name="company" type="text" placeholder="Company Name"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500/50 transition-colors" />
      </div>
      <div>
        <input name="role" type="text" placeholder="Your Role"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500/50 transition-colors" />
      </div>
      <div>
        <select name="useCase" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white/50 focus:outline-none focus:border-brand-500/50 transition-colors">
          <option value="">Primary Use Case</option>
          <option value="market">Market Intelligence</option>
          <option value="document">Document Analysis</option>
          <option value="private-ai">Private AI Infrastructure</option>
          <option value="combined">Combined Platform</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full px-6 py-3 bg-white/5 border border-white/10 hover:border-brand-500/30 disabled:opacity-50 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
      >
        {status === 'sending' ? 'Submitting...' : 'Request Demo'}
      </button>
      {status === 'success' && <p className="text-sm text-accent-green text-center">Demo request received!</p>}
      {status?.type === 'error' && <p className="text-sm text-red-400 text-center">{status.msg}</p>}
    </form>
  );
}
