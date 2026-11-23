import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, CircleHelp, ClipboardList, LayoutDashboard, Leaf, LineChart, Plus, Radio, Sprout } from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/add-batch', label: 'Add new batch', icon: Plus },
  { to: '/sensors', label: 'Sensor monitoring', icon: Radio },
  { to: '/analysis', label: 'Freshness analysis', icon: LineChart },
  { to: '/history', label: 'Batch history', icon: ClipboardList },
  { to: '/about', label: 'About FreshTrace', icon: CircleHelp },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand">
        <span className="brand-mark"><Sprout size={23} strokeWidth={2.2} /></span>
        <span className="brand-name">freshtrace<span className="brand-period">.</span><small>SMART PRODUCE MONITORING</small></span>
      </NavLink>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="side-nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-note-icon"><Leaf size={18} /></div>
        <p>Every harvest deserves a longer, better journey.</p>
        <span>FRESHNESS, IN FOCUS</span>
      </div>
      <div className="sidebar-version">FRESHTRACE <span>•</span> PROTOTYPE 1.0</div>
    </aside>
  );
}
