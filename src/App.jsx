import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import PageHeader from './components/PageHeader.jsx';
import { makeBatchId, predictFreshness } from './utils/prediction.js';
import { loadAlerts, loadBatches, saveAlerts, saveBatches } from './utils/storage.js';
import Dashboard from './pages/Dashboard.jsx';
import AddBatch from './pages/AddBatch.jsx';
import SensorMonitoring from './pages/SensorMonitoring.jsx';
import FreshnessAnalysis from './pages/FreshnessAnalysis.jsx';
import BatchHistory from './pages/BatchHistory.jsx';
import About from './pages/About.jsx';

function alertForBatch(batch) {
  const risk = batch.prediction?.risk;
  if (risk === 'Low Risk') return null;
  const message = risk === 'High Risk'
    ? 'Temperature exposure has increased. Inspect this batch.'
    : 'This batch may require priority distribution.';
  return { id: `${batch.id}-${Date.now()}`, batchId: batch.id, message, severity: risk === 'High Risk' ? 'high' : 'moderate', createdAt: new Date().toISOString(), read: false };
}

export default function App() {
  const [batches, setBatches] = useState(loadBatches);
  const [alerts, setAlerts] = useState(() => {
    const saved = loadAlerts();
    if (saved.length) return saved;
    return loadBatches().map(alertForBatch).filter(Boolean);
  });
  const [monitoring, setMonitoring] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => saveBatches(batches), [batches]);
  useEffect(() => saveAlerts(alerts), [alerts]);

  const createBatch = (values) => {
    const batch = { ...values, id: values.id || makeBatchId(), createdAt: new Date().toISOString() };
    batch.prediction = predictFreshness(batch);
    setBatches((current) => [batch, ...current]);
    const alert = alertForBatch(batch);
    if (alert) setAlerts((current) => [alert, ...current]);
  };
  const updateBatch = (id, values) => {
    const updated = { ...values, prediction: predictFreshness(values) };
    setBatches((current) => current.map((batch) => batch.id === id ? { ...batch, ...updated } : batch));
    const alert = alertForBatch({ ...updated, id });
    if (alert) setAlerts((current) => current.some((item) => item.batchId === id && !item.read) ? current : [alert, ...current]);
  };
  const markRead = (id) => setAlerts((current) => current.map((alert) => alert.id === id ? { ...alert, read: true } : alert));

  return <div className="app-shell">
    <Sidebar />
    {menuOpen && <button className="mobile-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
    <div className="main-shell">
      <PageHeader alerts={alerts} onMenuClick={() => setMenuOpen((open) => !open)} />
      <main className="main-content" onClick={() => menuOpen && setMenuOpen(false)}>
        <Routes>
          <Route path="/" element={<Dashboard batches={batches} alerts={alerts} onMarkRead={markRead} monitoring={monitoring} />} />
          <Route path="/add-batch" element={<AddBatch onCreate={createBatch} />} />
          <Route path="/sensors" element={<SensorMonitoring batches={batches} monitoring={monitoring} onToggleMonitoring={() => setMonitoring((active) => !active)} />} />
          <Route path="/analysis" element={<FreshnessAnalysis batches={batches} onUpdateBatch={updateBatch} />} />
          <Route path="/history" element={<BatchHistory batches={batches} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer className="app-footer"><span>© 2026 FreshTrace</span><span>Growing better decisions, together <i>✦</i></span></footer>
      </main>
    </div>
  </div>;
}
