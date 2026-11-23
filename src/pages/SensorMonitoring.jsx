import React, { useEffect, useState } from 'react';
import { Activity, CircleStop, Radio, RadioTower, RefreshCw, ShieldCheck, Thermometer, Droplets } from 'lucide-react';
import { PageIntro } from '../components/Common.jsx';
import { TrendChart } from '../components/Charts.jsx';
import { createSensorHistory, createSensorPoint } from '../utils/sensorSimulation.js';

export default function SensorMonitoring({ batches, monitoring, onToggleMonitoring }) {
  const [history, setHistory] = useState(createSensorHistory);
  const current = history[history.length - 1];
  const monitoredBatch = batches[0];
  useEffect(() => {
    if (!monitoring) return undefined;
    const timer = window.setInterval(() => {
      setHistory((previous) => [...previous.slice(-19), createSensorPoint(previous[previous.length - 1])]);
    }, 2500);
    return () => window.clearInterval(timer);
  }, [monitoring]);
  return <div className="page-content">
    <PageIntro eyebrow="STORAGE CONDITIONS" title="Sensor monitoring" description="A simulated view of environmental conditions around your produce." action={<span className={`connection-pill ${monitoring ? 'connected' : ''}`}><i />{monitoring ? 'Simulation active' : 'Simulation paused'}</span>} />
    <div className="simulation-banner"><RadioTower size={17} /><div><b>Simulated sensor readings</b><span>All values on this page are generated in your browser. No physical sensors are connected.</span></div><span className="simulation-tag">PROTOTYPE</span></div>
    <div className="sensor-controls panel"><div className="sensor-target"><div className="sensor-target-icon"><Radio size={20} /></div><div><span className="panel-eyebrow">CURRENTLY MONITORING</span><b>{monitoredBatch ? `${monitoredBatch.crop} · ${monitoredBatch.id}` : 'No batch selected'}</b><small>{monitoredBatch ? 'Storage environment · Simulated sensor' : 'Add a batch to link monitoring data'}</small></div></div><button className={`button ${monitoring ? 'stop-button' : 'primary-button'}`} onClick={onToggleMonitoring}>{monitoring ? <><CircleStop size={17} /> Stop monitoring</> : <><RefreshCw size={16} /> Start monitoring</>}</button></div>
    <section className="sensor-value-grid">
      <div className="sensor-value-card"><div className="sensor-card-head"><span className="sensor-value-icon temp"><Thermometer size={19} /></span><span className="sensor-status">LIVE VALUE</span></div><div className="sensor-reading">{current.temperature}<span>°C</span></div><h3>Temperature</h3><p>Ideal varies by produce type</p><div className="sensor-range"><span>Latest simulated reading</span><b>{monitoring ? <><i className="live-dot" /> Updating</> : 'Paused'}</b></div></div>
      <div className="sensor-value-card"><div className="sensor-card-head"><span className="sensor-value-icon humidity"><Droplets size={19} /></span><span className="sensor-status">LIVE VALUE</span></div><div className="sensor-reading">{current.humidity}<span>%</span></div><h3>Relative humidity</h3><p>Helps maintain produce quality</p><div className="sensor-range"><span>Latest simulated reading</span><b>{monitoring ? <><i className="live-dot" /> Updating</> : 'Paused'}</b></div></div>
      <div className="sensor-status-card"><div className="sensor-card-head"><span className="sensor-value-icon status"><ShieldCheck size={19} /></span><span className="sensor-status">CONNECTION</span></div><div className="status-visual"><span className={monitoring ? 'pulse-icon on' : 'pulse-icon'}><RadioTower size={23} /></span><div><b>{monitoring ? 'Monitoring active' : 'Monitoring paused'}</b><span>Browser-based simulation</span></div></div><div className="sensor-range"><span>Data source</span><b>Simulated</b></div></div>
    </section>
    <section className="dashboard-grid sensor-charts">
      <div className="panel chart-panel"><div className="panel-heading"><div><span className="panel-eyebrow">LIVE SIMULATION</span><h3>Temperature history</h3></div><span className="chart-unit">°C</span></div><TrendChart data={history} dataKey="temperature" color="#597959" unit="°C" height={245} /></div>
      <div className="panel chart-panel"><div className="panel-heading"><div><span className="panel-eyebrow">LIVE SIMULATION</span><h3>Humidity history</h3></div><span className="chart-unit">%</span></div><TrendChart data={history} dataKey="humidity" color="#a47c4c" unit="%" height={245} /></div>
    </section>
    <div className="notice-card"><Activity size={17} /><span><b>Prototype note:</b> readings change every 2.5 seconds while monitoring is active. This simulation demonstrates how an IoT feed could appear in FreshTrace; it does not represent actual storage conditions.</span></div>
  </div>;
}
