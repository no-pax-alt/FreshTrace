const cropProfiles = {
  Tomato: { idealTemp: 12, idealHumidity: 88, tempFactor: 0.045, humidityFactor: 0.018 },
  Banana: { idealTemp: 14, idealHumidity: 90, tempFactor: 0.052, humidityFactor: 0.02 },
  Mango: { idealTemp: 13, idealHumidity: 90, tempFactor: 0.05, humidityFactor: 0.02 },
  Apple: { idealTemp: 3, idealHumidity: 92, tempFactor: 0.035, humidityFactor: 0.015 },
  Potato: { idealTemp: 8, idealHumidity: 90, tempFactor: 0.04, humidityFactor: 0.022 },
  Spinach: { idealTemp: 2, idealHumidity: 95, tempFactor: 0.06, humidityFactor: 0.025 },
  Carrot: { idealTemp: 2, idealHumidity: 93, tempFactor: 0.038, humidityFactor: 0.018 },
};

export function predictFreshness(batch) {
  const profile = cropProfiles[batch.crop] || cropProfiles.Tomato;
  const duration = Math.max(0, Number(batch.storageDuration) || 0);
  const temperature = Number(batch.temperature) || 0;
  const humidity = Number(batch.humidity) || 0;
  const initialDays = Math.max(0, Number(batch.initialShelfLife) || 0);
  const tempStress = Math.max(0, Math.abs(temperature - profile.idealTemp) - 2);
  const humidityStress = Math.max(0, Math.abs(humidity - profile.idealHumidity) - 8);
  const dailyRate = 1 + tempStress * profile.tempFactor + humidityStress * profile.humidityFactor;
  const consumedDays = duration * dailyRate;
  const remainingDays = Math.max(0, Math.round((initialDays - consumedDays) * 10) / 10);
  const consumedRatio = initialDays ? consumedDays / initialDays : 1;
  const risk = remainingDays <= 2 || consumedRatio >= 0.8
    ? 'High Risk'
    : remainingDays <= 5 || consumedRatio >= 0.55
      ? 'Moderate Risk'
      : 'Low Risk';
  const condition = remainingDays <= 0 ? 'Past estimated shelf life'
    : risk === 'High Risk' ? 'Needs prompt attention'
      : risk === 'Moderate Risk' ? 'Freshness declining'
        : 'Within expected range';
  const recommendation = risk === 'High Risk'
    ? 'Inspect this batch and prioritize distribution.'
    : risk === 'Moderate Risk'
      ? 'Review storage conditions and plan priority dispatch.'
      : 'Continue monitoring under stable storage conditions.';

  return {
    remainingDays,
    risk,
    condition,
    recommendation,
    consumedDays: Math.round(consumedDays * 10) / 10,
    idealTemp: profile.idealTemp,
    idealHumidity: profile.idealHumidity,
  };
}

export function makeBatchId() {
  const date = new Date();
  const stamp = `${date.getFullYear().toString().slice(-2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  return `FT-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
