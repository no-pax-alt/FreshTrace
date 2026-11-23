import React from 'react';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const tooltipStyle = { background: '#fff', border: '1px solid #e8e5d9', borderRadius: 10, boxShadow: '0 8px 20px rgba(31,61,43,.08)' };

export function TrendChart({ data, dataKey, color, unit, idealLine, height = 220 }) {
  return <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data} margin={{ top: 8, right: 6, left: -20, bottom: 0 }}>
      <defs><linearGradient id={`fill-${dataKey}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.2} /><stop offset="95%" stopColor={color} stopOpacity={0.01} /></linearGradient></defs>
      <CartesianGrid stroke="#eeede6" strokeDasharray="3 5" vertical={false} />
      <XAxis dataKey="time" tick={{ fill: '#8a9085', fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={24} />
      <YAxis tick={{ fill: '#8a9085', fontSize: 11 }} axisLine={false} tickLine={false} />
      <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}${unit}`, dataKey === 'temperature' ? 'Temperature' : 'Humidity']} />
      {idealLine !== undefined && <CartesianGrid horizontal={false} />}
      <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} fill={`url(#fill-${dataKey})`} activeDot={{ r: 4, strokeWidth: 0 }} />
    </AreaChart>
  </ResponsiveContainer>;
}

const riskColors = ['#7d9a77', '#d2a05d', '#c87956'];

export function RiskChart({ batches }) {
  const data = [
    { name: 'Low risk', value: batches.filter((b) => b.prediction?.risk === 'Low Risk').length, color: riskColors[0] },
    { name: 'Moderate', value: batches.filter((b) => b.prediction?.risk === 'Moderate Risk').length, color: riskColors[1] },
    { name: 'High risk', value: batches.filter((b) => b.prediction?.risk === 'High Risk').length, color: riskColors[2] },
  ];
  const chartData = data.some((item) => item.value) ? data : [{ name: 'No batches yet', value: 1, color: '#e8e5d9' }];
  return <div className="risk-chart-wrap">
    <div className="risk-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={chartData} dataKey="value" innerRadius="68%" outerRadius="91%" paddingAngle={4} stroke="none">{chartData.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>{batches.length}</strong><span>Batches</span></div></div>
    <div className="risk-legend">{data.map((item) => <div key={item.name}><i style={{ background: item.color }} /><span>{item.name}</span><b>{item.value}</b></div>)}</div>
  </div>;
}
