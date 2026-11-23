import React from 'react';
import { Activity, ArrowDown, ArrowUpRight, Boxes, Clock3, Leaf, Plus, Radio, Sprout, Thermometer, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AlertList, EmptyState, PageIntro, RiskBadge, StatCard, ViewAllLink } from '../components/Common.jsx';
import BatchTable from '../components/BatchTable.jsx';
import { RiskChart, TrendChart } from '../components/Charts.jsx';
import { createSensorHistory } from '../utils/sensorSimulation.js';

const demoTrend = createSensorHistory();

export default function Dashboard({ batches, alerts, onMarkRead, monitoring }) {
  const attention = batches.filter((batch) => batch.prediction?.risk !== 'Low Risk').length;
  const average = batches.length ? (batches.reduce((sum, batch) => sum + (batch.prediction?.remainingDays || 0), 0) / batches.length).toFixed(1) : '—';
  return <div className="page-content">
    <PageIntro eyebrow="MONDAY, NOVEMBER 23, 2026" title="Good morning, Welcome to FreshTrace" description="Here’s what’s happening across your produce inventory today." action={<Link className="button primary-button" to="/add-batch"><Plus size={17} /> Add new batch</Link>} />
    <section className="welcome-strip">
      <div className="welcome-art"><div className="sun-disc" /><span className="leaf-art leaf-one">✦</span><span className="leaf-art leaf-two">✦</span><div className="welcome-plant">🌿</div></div>
      <div className="welcome-copy"><span className="mini-kicker">A FRESH START, EVERY DAY</span><h2>Better care from<br />harvest to home.</h2><p>Keep quality visible. Make every delivery count.</p><Link to="/analysis" className="strip-link">Explore freshness analysis <ArrowUpRight size={15} /></Link></div>
      <div className="welcome-metric"><div className="metric-ring"><Sprout size={24} /></div><div><b>{batches.length}</b><span>active batches</span></div><i /></div>
    </section>
    <section className="stats-grid">
      <StatCard icon={Boxes} label="Monitored batches" value={batches.length} note="Across all produce" tone="cream" />
      <StatCard icon={TriangleAlert} label="Need attention" value={attention} note={attention ? 'Review recommended' : 'All batches looking good'} tone={attention ? 'terracotta' : 'sage'} trend={attention ? { direction: 'up', label: 'Review' } : undefined} />
      <StatCard icon={Clock3} label="Avg. shelf life left" value={average === '—' ? average : `${average} days`} note="Illustrative estimate" tone="sand" />
      <StatCard icon={Radio} label="Sensor monitoring" value={monitoring ? 'Active' : 'Standby'} note={monitoring ? 'Simulated readings running' : 'No live simulation'} tone={monitoring ? 'sage' : 'cream'} />
    </section>
    <section className="dashboard-grid charts-grid">
      <div className="panel chart-panel"><div className="panel-heading"><div><span className="panel-eyebrow">ENVIRONMENT</span><h3>Temperature monitoring</h3></div><span className="chart-period"><span className="live-dot" /> Last 12 readings</span></div><TrendChart data={demoTrend} dataKey="temperature" color="#597959" unit="°C" /></div>
      <div className="panel chart-panel risk-panel"><div className="panel-heading"><div><span className="panel-eyebrow">INVENTORY HEALTH</span><h3>Freshness risk</h3></div><span className="subtle-period">Current</span></div><RiskChart batches={batches} /></div>
    </section>
    <section className="dashboard-grid lower-grid">
      <div className="panel"><div className="panel-heading"><div><span className="panel-eyebrow">RECENT ACTIVITY</span><h3>Recently monitored batches</h3></div><ViewAllLink to="/history" /></div>
        {batches.length ? <BatchTable batches={[...batches].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))} compact /> : <EmptyState title="Your inventory starts here" text="Add a produce batch to begin tracking freshness and storage conditions." action={<Link to="/add-batch" className="text-link">Create your first batch <ArrowUpRight size={14} /></Link>} />}
      </div>
      <div className="panel"><div className="panel-heading"><div><span className="panel-eyebrow">SMART MONITORING</span><h3>Recent alerts</h3></div><Link to="/analysis" className="view-all">See analysis <ArrowUpRight size={15} /></Link></div><AlertList alerts={alerts.filter((alert) => !alert.read)} onMarkRead={onMarkRead} compact /></div>
    </section>
    <div className="dashboard-footnote"><Activity size={14} /> Predictions are illustrative estimates, not food-safety certifications. <Link to="/about">Learn how FreshTrace works</Link></div>
  </div>;
}
