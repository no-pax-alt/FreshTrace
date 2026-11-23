import React from 'react';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const titles = {
  '/': 'Overview',
  '/add-batch': 'Add new batch',
  '/sensors': 'Sensor monitoring',
  '/analysis': 'Freshness analysis',
  '/history': 'Batch history',
  '/about': 'About FreshTrace',
};

export default function PageHeader({ alerts, onMenuClick }) {
  const { pathname } = useLocation();
  const unread = alerts.filter((alert) => !alert.read).length;
  return (
    <header className="topbar">
      <button className="mobile-menu icon-button" onClick={onMenuClick} aria-label="Toggle navigation"><Menu size={20} /></button>
      <div className="topbar-title">{titles[pathname] || 'FreshTrace'}</div>
      <div className="topbar-right">
        <div className="today-label">{new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
        <span className="topbar-divider" />
        <div className="profile-wrap">
          <Link to="/" className="notification-button" title="View alerts on dashboard" aria-label={`${unread} unread alerts`}>
            <Bell size={18} />{unread > 0 && <span className="notification-dot" />}
          </Link>
          <span className="avatar">FT</span>
          <div className="profile-copy"><b>Farm team</b><small>Operations</small></div>
          <ChevronDown size={15} className="profile-chevron" />
        </div>
      </div>
    </header>
  );
}
