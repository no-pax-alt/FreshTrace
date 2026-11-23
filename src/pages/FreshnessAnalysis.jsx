import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Lightbulb, ShieldAlert, Sparkles, Thermometer, Droplets, Clock3 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageIntro, RiskBadge } from '../components/Common.jsx';
import { predictFreshness } from '../utils/prediction.js';

const blank = { crop: 'Tomato', initialShelfLife: 12, storageDuration: 3, temperature: 12, humidity: 88 };

export default function FreshnessAnalysis({ batches, onUpdateBatch }) {
  const [params, setParams] = useSearchParams();
  const selectedId = params.get('batch');
  const selectedBatch = batches.find((batch) => batch.id === selectedId) || batches[0];
  const [form, setForm] = useState(selectedBatch || blank);
  useEffect(() => {
    setForm(selectedBatch || blank);
  }, [selectedBatch?.id]);
  const prediction = useMemo(() => predictFreshness(form), [form]);
  const setField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const changeBatch = (event) => {
    const batch = batches.find((item) => item.id === event.target.value);
    setParams(batch ? { batch: batch.id } : {});
    if (batch) setForm(batch);
  };
  const updateBatch = () => {
    if (selectedBatch) onUpdateBatch(selectedBatch.id, { ...form, prediction });
  };
  return <div className="page-content">
    <PageIntro eyebrow="ILLUSTRATIVE PREDICTION MODEL" title="Freshness analysis" description="Explore how crop and storage conditions shape an estimated shelf-life outlook." action={<span className="model-pill"><Sparkles size={15} /> Rule-based simulation</span>} />
    <div className="model-disclaimer"><ShieldAlert size={18} /><div><b>Illustrative AI-inspired prediction</b><span>This transparent rule-based simulation is not a trained machine-learning model and has no scientifically validated accuracy. Estimates are not food-safety certifications.</span></div></div>
    <div className="analysis-layout">
      <section className="panel analysis-input-panel">
        <div className="panel-heading"><div><span className="panel-eyebrow">PREDICTION INPUTS</span><h3>Storage profile</h3></div><span className="step-count">01 / 02</span></div>
        {batches.length > 0 && <label className="form-field selector-field"><span>Choose a saved batch</span><select value={selectedBatch?.id || ''} onChange={changeBatch}><option value="">Custom analysis</option>{batches.map((batch) => <option key={batch.id} value={batch.id}>{batch.crop} · {batch.id}</option>)}</select></label>}
        <div className="form-grid analysis-inputs">
          <label className="form-field"><span>Crop type</span><select name="crop" value={form.crop} onChange={setField}>{['Tomato', 'Banana', 'Mango', 'Apple', 'Potato', 'Spinach', 'Carrot'].map((crop) => <option key={crop}>{crop}</option>)}</select></label>
          <label className="form-field"><span>Initial shelf life</span><div className="input-with-unit"><input name="initialShelfLife" type="number" min="1" value={form.initialShelfLife} onChange={setField} /><span>days</span></div></label>
          <label className="form-field"><span>Storage duration</span><div className="input-with-unit"><input name="storageDuration" type="number" min="0" step="0.5" value={form.storageDuration} onChange={setField} /><span>days</span></div></label>
          <label className="form-field"><span>Temperature exposure</span><div className="input-with-unit"><input name="temperature" type="number" step="0.1" value={form.temperature} onChange={setField} /><span>°C</span></div></label>
          <label className="form-field full-field"><span>Relative humidity</span><div className="input-with-unit"><input name="humidity" type="number" min="0" max="100" value={form.humidity} onChange={setField} /><span>% RH</span></div></label>
        </div>
        {selectedBatch && <button className="button secondary-button save-profile" onClick={updateBatch}>Save conditions to batch <ArrowRight size={15} /></button>}
        <div className="ideal-note"><Lightbulb size={17} /><span>For {form.crop}, the model's reference conditions are around <b>{prediction.idealTemp}°C</b> and <b>{prediction.idealHumidity}% RH</b>. These are illustrative model inputs.</span></div>
      </section>
      <section className={`prediction-card ${prediction.risk === 'High Risk' ? 'prediction-high' : prediction.risk === 'Moderate Risk' ? 'prediction-moderate' : ''}`}>
        <div className="prediction-top"><span className="prediction-label"><Sparkles size={14} /> ESTIMATED OUTLOOK</span><RiskBadge risk={prediction.risk} /></div>
        <div className="prediction-days">{prediction.remainingDays}<span>days</span></div>
        <div className="prediction-caption">estimated shelf life remaining</div>
        <div className="prediction-divider" />
        <div className="condition-row"><span>Batch condition</span><b>{prediction.condition}</b></div>
        <div className="condition-row"><span>Modelled days consumed</span><b>{prediction.consumedDays} days</b></div>
        <div className="prediction-action"><div className="action-icon"><Lightbulb size={17} /></div><div><span>RECOMMENDED ACTION</span><p>{prediction.recommendation}</p></div></div>
        <div className="prediction-foot"><Clock3 size={14} /> Estimate updates as inputs change</div>
      </section>
    </div>
    <section className="panel explanation-panel"><div className="panel-heading"><div><span className="panel-eyebrow">MODEL TRANSPARENCY</span><h3>How this estimate is calculated</h3></div></div>
      <div className="explanation-steps">
        <div><span className="explain-number">01</span><div><b>Crop-specific reference</b><p>Each crop has configurable reference temperature, humidity, and deterioration sensitivity factors.</p></div></div>
        <div><span className="explain-number">02</span><div><b>Environmental exposure</b><p>The model estimates additional daily deterioration when temperature or humidity moves outside its reference range.</p></div></div>
        <div><span className="explain-number">03</span><div><b>Remaining-life estimate</b><p>Estimated deterioration is subtracted from the initial shelf-life input. Risk tiers use remaining days and consumed-life proportion.</p></div></div>
      </div>
      <div className="formula-note"><Thermometer size={15} /><Droplets size={15} /><span>Illustrative formula: remaining life = initial shelf life − (storage duration × adjusted daily deterioration rate).</span></div>
    </section>
  </div>;
}
