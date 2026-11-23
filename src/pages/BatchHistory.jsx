import React, { useMemo, useState } from 'react';
import { ArrowDownUp, Search, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState, PageIntro } from '../components/Common.jsx';
import BatchTable from '../components/BatchTable.jsx';

export default function BatchHistory({ batches }) {
  const [search, setSearch] = useState('');
  const [risk, setRisk] = useState('All risk levels');
  const [sort, setSort] = useState('newest');
  const filtered = useMemo(() => batches.filter((batch) => {
    const matchesText = `${batch.crop} ${batch.id}`.toLowerCase().includes(search.toLowerCase());
    return matchesText && (risk === 'All risk levels' || batch.prediction?.risk === risk);
  }).sort((a, b) => sort === 'newest' ? new Date(b.createdAt) - new Date(a.createdAt) : sort === 'remaining' ? (a.prediction?.remainingDays || 0) - (b.prediction?.remainingDays || 0) : a.crop.localeCompare(b.crop)), [batches, search, risk, sort]);
  return <div className="page-content">
    <PageIntro eyebrow="INVENTORY" title="Batch history" description="A complete view of your monitored produce and freshness estimates." action={<span className="record-count">{batches.length} total records</span>} />
    <section className="panel history-panel">
      <div className="history-toolbar"><div className="search-field"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search batch ID or produce..." aria-label="Search batch ID or produce" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={15} /></button>}</div><div className="history-filters"><label className="select-filter"><SlidersHorizontal size={15} /><select value={risk} onChange={(event) => setRisk(event.target.value)} aria-label="Filter by risk"><option>All risk levels</option><option>Low Risk</option><option>Moderate Risk</option><option>High Risk</option></select></label><label className="select-filter"><ArrowDownUp size={15} /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort batches"><option value="newest">Newest first</option><option value="remaining">Lowest shelf life</option><option value="crop">Produce A–Z</option></select></label></div></div>
      {filtered.length ? <BatchTable batches={filtered} /> : <EmptyState title={batches.length ? 'No matching batches' : 'No batches yet'} text={batches.length ? 'Try another search or risk filter.' : 'Add your first batch to start a traceable freshness history.'} action={!batches.length && <Link to="/add-batch" className="text-link">Add a batch</Link>} />}
      {filtered.length > 0 && <div className="table-footer">Showing <b>{filtered.length}</b> of {batches.length} batches <span>All values are locally stored on this device.</span></div>}
    </section>
  </div>;
}
