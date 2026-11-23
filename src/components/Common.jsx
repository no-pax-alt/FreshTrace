import React from 'react';
import { ArrowDownRight, ArrowUpRight, ArrowRight, BellRing, Check, Clock3, Thermometer, Droplets, PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PageIntro({ eyebrow, title, description, action }) {
  return (
    <div className="page-intro">
      <div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>
      {action}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, note, tone = 'sage', trend }) {
  return (
    <div className={`stat-card ${tone}`}>
      <div className="stat-top"><span className="stat-icon"><Icon size={18} /></span>{trend && <span className={`stat-trend ${trend.direction}`}>{trend.direction === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{trend.label}</span>}</div>
      <div className="stat-value">{value}</div><div className="stat-label">{label}</div><div className="stat-note">{note}</div>
    </div>
  );
}

export function RiskBadge({ risk }) {
  const kind = risk === 'High Risk' ? 'high' : risk === 'Moderate Risk' ? 'moderate' : 'low';
  return <span className={`risk-badge ${kind}`}><span />{risk || 'Low Risk'}</span>;
}

export function EmptyState({ title, text, action }) {
  return <div className="empty-state"><span className="empty-icon"><PackageOpen size={23} /></span><h3>{title}</h3><p>{text}</p>{action}</div>;
}

export function AlertList({ alerts, onMarkRead, compact = false }) {
  if (!alerts.length) return <div className="inline-empty"><Check size={17} /><span>You're all caught up. No active alerts.</span></div>;
  return <div className="alert-list">{alerts.slice(0, compact ? 3 : undefined).map((alert) => (
    <article key={alert.id} className={`alert-row ${alert.severity}${alert.read ? ' read' : ''}`}>
      <div className="alert-symbol">{alert.severity === 'high' ? <BellRing size={17} /> : alert.severity === 'moderate' ? <Thermometer size={17} /> : <Droplets size={17} />}</div>
      <div className="alert-body"><div className="alert-title">{alert.message}</div><div className="alert-meta">{alert.batchId} <span>·</span> <Clock3 size={12} /> {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div></div>
      {!alert.read && <button className="text-button" onClick={() => onMarkRead(alert.id)}>Mark read</button>}
      {alert.read && <span className="read-label"><Check size={13} /> Read</span>}
    </article>
  ))}</div>;
}

export function ViewAllLink({ to, children = 'View all' }) {
  return <Link className="view-all" to={to}>{children}<ArrowRight size={15} /></Link>;
}

export function PageTitleAction({ to, children }) {
  return <Link className="button primary-button" to={to}>{children}<ArrowRight size={16} /></Link>;
}
