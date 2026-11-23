import React from 'react';
import { ArrowUpRight, BarChart3, Boxes, BrainCircuit, Radio, Route, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageIntro } from '../components/Common.jsx';

const modules = [
  { icon: Boxes, number: '01', title: 'Batch management', text: 'Capture crop, harvest and storage details in one traceable record.' },
  { icon: Radio, number: '02', title: 'Sensor monitoring', text: 'Explore how temperature and humidity readings could be monitored over time.' },
  { icon: BrainCircuit, number: '03', title: 'Freshness analysis', text: 'See a transparent, crop-specific rule simulation estimate remaining shelf life.' },
  { icon: BarChart3, number: '04', title: 'Smart alerts', text: 'Surface batches that may benefit from inspection or priority distribution.' },
  { icon: Route, number: '05', title: 'Batch history', text: 'Search and review saved produce records and their current risk outlook.' },
];

export default function About() {
  return <div className="page-content">
    <PageIntro eyebrow="OUR PURPOSE" title="A clearer picture of freshness." description="FreshTrace is a design-thinking prototype exploring how better information can support better decisions across the produce journey." />
    <section className="about-hero"><div className="about-hero-art"><div className="about-orbit orbit-a" /><div className="about-orbit orbit-b" /><div className="about-plant">🌿</div><span className="orbit-tag tag-top">HARVEST</span><span className="orbit-tag tag-bottom">FRESHNESS</span></div><div className="about-hero-copy"><span className="mini-kicker">THE CHALLENGE</span><h2>Good produce can lose its value before it reaches the table.</h2><p>Post-harvest deterioration is shaped by time, handling and storage conditions. A fixed shelf-life label may not tell the whole story when real-world conditions change along the way.</p><p>Farmers, distributors and retailers need a practical way to see what’s happening and decide which batches may deserve attention first.</p></div></section>
    <section className="about-fixed panel"><span className="big-quote">“</span><div><span className="panel-eyebrow">WHY DYNAMIC CONTEXT MATTERS</span><h3>One estimate doesn't fit every journey.</h3><p>Fixed shelf-life estimates are useful starting points, but they can miss differences in crop type and exposure to warmer or more humid storage. FreshTrace explores a more responsive view: combine a baseline with changing conditions to make an informed operational decision.</p></div><div className="fixed-icon"><Sprout size={27} /></div></section>
    <section className="about-modules-section"><div className="about-section-heading"><div><span className="panel-eyebrow">THE PLATFORM</span><h2>Five connected modules</h2></div><p>Designed to turn simple observations into a more useful picture of freshness.</p></div><div className="module-grid">{modules.map(({ icon: Icon, number, title, text }) => <article className="module-card" key={number}><div className="module-top"><span className="module-icon"><Icon size={19} /></span><span>{number}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="about-how panel"><div><span className="panel-eyebrow">HOW FRESHTRACE WORKS</span><h2>Observe. Estimate. Act.</h2><p>Record a batch and its storage profile. FreshTrace compares those inputs with a configurable crop profile, estimates a remaining shelf-life outlook and surfaces a suggested next step. A simulated sensor page demonstrates how a live feed might fit into this workflow.</p><Link className="text-link" to="/analysis">See the prediction model <ArrowUpRight size={15} /></Link></div><div className="how-steps"><div><i>01</i><b>Capture</b><span>Batch & storage</span></div><div className="step-line" /><div><i>02</i><b>Understand</b><span>Freshness outlook</span></div><div className="step-line" /><div><i>03</i><b>Prioritize</b><span>Recommended action</span></div></div></section>
    <section className="future-card"><div><span className="mini-kicker">WHAT'S NEXT</span><h2>Built to grow with better data.</h2><p>Future work could connect calibrated physical sensors, incorporate handling and transport events, and validate crop-specific models against real post-harvest studies and observed outcomes.</p></div><div className="future-badge"><Sprout size={27} /><span>Thoughtful technology<br />for a more resilient<br />food system.</span></div></section>
    <div className="about-disclaimer">FreshTrace is an educational design-thinking prototype. Prediction outputs are illustrative, are not scientifically validated, and do not certify food safety.</div>
  </div>;
}
