import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RiskBadge } from './Common.jsx';

export default function BatchTable({ batches, compact = false }) {
  const rows = compact ? batches.slice(0, 5) : batches;
  return <div className="table-scroll"><table className="batch-table">
    <thead><tr><th>Produce / batch</th><th>Quantity</th><th>Date added</th><th>Temp.</th><th>Humidity</th><th>Remaining</th><th>Risk level</th><th /></tr></thead>
    <tbody>{rows.map((batch) => (
      <tr key={batch.id}>
        <td><div className="crop-cell"><span className="crop-emoji">{({ Tomato: '🍅', Banana: '🍌', Mango: '🥭', Apple: '🍎', Potato: '🥔', Spinach: '🥬', Carrot: '🥕' })[batch.crop] || '🌱'}</span><span><b>{batch.crop}</b><small>{batch.id}</small></span></div></td>
        <td>{Number(batch.quantity).toLocaleString()} <span className="unit">kg</span></td>
        <td>{new Date(batch.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
        <td>{batch.temperature}°C</td>
        <td>{batch.humidity}%</td>
        <td><b className="days-cell">{batch.prediction?.remainingDays ?? '—'}</b><span className="unit"> days</span></td>
        <td><RiskBadge risk={batch.prediction?.risk} /></td>
        <td><Link className="row-action" to={`/analysis?batch=${encodeURIComponent(batch.id)}`} aria-label={`View ${batch.id}`}><ArrowUpRight size={16} /></Link></td>
      </tr>
    ))}</tbody>
  </table></div>;
}
