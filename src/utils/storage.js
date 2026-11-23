import { makeBatchId, predictFreshness } from './prediction.js';

const BATCH_KEY = 'freshtrace.batches.v1';
const ALERT_KEY = 'freshtrace.alerts.v1';

function createDemoBatches() {
  const samples = [
    { crop: 'Tomato', quantity: 240, temperature: 16, humidity: 82, storageDuration: 4, initialShelfLife: 12, harvestDate: '2026-11-18' },
    { crop: 'Spinach', quantity: 85, temperature: 5, humidity: 88, storageDuration: 2, initialShelfLife: 7, harvestDate: '2026-11-20' },
    { crop: 'Mango', quantity: 180, temperature: 14, humidity: 91, storageDuration: 3, initialShelfLife: 10, harvestDate: '2026-11-19' },
  ];
  return samples.map((sample, index) => {
    const batch = { ...sample, id: `FT-DEMO-00${index + 1}`, createdAt: new Date(Date.now() - index * 3600000).toISOString() };
    return { ...batch, prediction: predictFreshness(batch) };
  });
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from local storage.`, error);
    return fallback;
  }
}

export function loadBatches() {
  const existing = read(BATCH_KEY, null);
  if (existing) return existing;
  const initial = createDemoBatches();
  saveBatches(initial);
  return initial;
}

export function saveBatches(batches) {
  localStorage.setItem(BATCH_KEY, JSON.stringify(batches));
}

export function loadAlerts() {
  return read(ALERT_KEY, []);
}

export function saveAlerts(alerts) {
  localStorage.setItem(ALERT_KEY, JSON.stringify(alerts));
}
