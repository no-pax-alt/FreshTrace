import React, { useState } from 'react';
import { ArrowLeft, CalendarDays, CheckCircle2, Info, PackageCheck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PageIntro } from '../components/Common.jsx';
import { makeBatchId } from '../utils/prediction.js';

const crops = ['Tomato', 'Banana', 'Mango', 'Apple', 'Potato', 'Spinach', 'Carrot'];

export default function AddBatch({ onCreate }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: makeBatchId(), crop: 'Tomato', quantity: '', harvestDate: new Date().toISOString().slice(0, 10),
    initialShelfLife: '', temperature: '', humidity: '', storageDuration: '0',
  });
  const [error, setError] = useState('');
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    const quantity = Number(values.quantity);
    const initialShelfLife = Number(values.initialShelfLife);
    const temperature = Number(values.temperature);
    const humidity = Number(values.humidity);
    const storageDuration = Number(values.storageDuration);
    if (!values.harvestDate || values.harvestDate > new Date().toISOString().slice(0, 10)) {
      setError('Choose a valid harvest date that is today or earlier.');
      return;
    }
    if (!(quantity > 0) || !(initialShelfLife > 0) || values.temperature.trim() === '' || !Number.isFinite(temperature) || values.humidity.trim() === '' || !Number.isFinite(humidity) || humidity < 0 || humidity > 100 || values.storageDuration.trim() === '' || !Number.isFinite(storageDuration) || storageDuration < 0) {
      setError('Please check each field. Quantity and shelf life must be positive, humidity 0–100%, and storage duration cannot be negative.');
      return;
    }
    onCreate({ ...values, quantity, initialShelfLife, temperature, humidity, storageDuration, harvestDate: values.harvestDate });
    navigate('/');
  };
  return <div className="page-content">
    <PageIntro eyebrow="INVENTORY · NEW ENTRY" title="Add a produce batch" description="Capture the harvest and storage details to start monitoring freshness." action={<Link to="/" className="button quiet-button"><ArrowLeft size={16} /> Back to overview</Link>} />
    <div className="form-page-layout">
      <form className="form-card" onSubmit={submit} noValidate>
        <div className="form-section-title"><span className="section-icon"><PackageCheck size={18} /></span><div><h3>Batch details</h3><p>Give this harvest a traceable identity.</p></div><span className="required-note">* Required</span></div>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="form-grid">
          <label className="form-field"><span>Batch ID <span className="required">*</span></span><div className="input-with-icon"><input name="id" value={values.id} readOnly /><Sparkles size={15} /></div><small>Generated automatically</small></label>
          <label className="form-field"><span>Produce type <span className="required">*</span></span><select name="crop" value={values.crop} onChange={update}>{crops.map((crop) => <option key={crop}>{crop}</option>)}</select></label>
          <label className="form-field"><span>Quantity (kg) <span className="required">*</span></span><input name="quantity" type="number" min="0.1" step="0.1" value={values.quantity} onChange={update} placeholder="e.g. 240" required /></label>
          <label className="form-field"><span>Harvest date <span className="required">*</span></span><div className="input-with-icon"><input name="harvestDate" type="date" max={new Date().toISOString().slice(0, 10)} value={values.harvestDate} onChange={update} required /><CalendarDays size={15} /></div></label>
        </div>
        <div className="form-divider" />
        <div className="form-section-title compact-title"><span className="section-icon olive"><Sparkles size={17} /></span><div><h3>Freshness baseline</h3><p>Set the initial estimate and current storage conditions.</p></div></div>
        <div className="form-grid">
          <label className="form-field"><span>Initial shelf life (days) <span className="required">*</span></span><div className="input-with-unit"><input name="initialShelfLife" type="number" min="1" step="1" value={values.initialShelfLife} onChange={update} placeholder="e.g. 12" required /><span>days</span></div></label>
          <label className="form-field"><span>Storage duration (days) <span className="required">*</span></span><div className="input-with-unit"><input name="storageDuration" type="number" min="0" step="0.5" value={values.storageDuration} onChange={update} placeholder="e.g. 2" required /><span>days</span></div></label>
          <label className="form-field"><span>Storage temperature <span className="required">*</span></span><div className="input-with-unit"><input name="temperature" type="number" step="0.1" value={values.temperature} onChange={update} placeholder="e.g. 12" required /><span>°C</span></div></label>
          <label className="form-field"><span>Relative humidity <span className="required">*</span></span><div className="input-with-unit"><input name="humidity" type="number" min="0" max="100" step="1" value={values.humidity} onChange={update} placeholder="e.g. 88" required /><span>% RH</span></div></label>
        </div>
        <div className="form-hint"><Info size={16} /><span>These values inform an illustrative, crop-specific deterioration estimate. They can be updated in Freshness Analysis.</span></div>
        <div className="form-actions"><Link to="/" className="cancel-link">Cancel</Link><button className="button primary-button" type="submit">Create batch <ArrowLeft className="button-arrow" size={16} /></button></div>
      </form>
      <aside className="form-aside">
        <div className="aside-leaf"><span>✦</span>🌱</div>
        <span className="mini-kicker">FROM HARVEST TO HOME</span><h3>Start with the<br />right conditions.</h3>
        <p>Every batch tells a story. Capture the details now to make more informed decisions along the way.</p>
        <div className="aside-check"><CheckCircle2 size={17} /><span>Crop-specific estimates</span></div>
        <div className="aside-check"><CheckCircle2 size={17} /><span>Storage condition tracking</span></div>
        <div className="aside-check"><CheckCircle2 size={17} /><span>Actionable freshness insights</span></div>
        <div className="aside-disclaimer">Estimates are for demonstration only and are not food-safety certifications.</div>
      </aside>
    </div>
  </div>;
}
