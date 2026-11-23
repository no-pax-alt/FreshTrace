export function createSensorPoint(previous = {}) {
  const next = (value, delta, min, max) => Math.min(max, Math.max(min, value + (Math.random() - 0.5) * delta));
  const temperature = next(Number(previous.temperature ?? 7.2), 1.4, 2, 14);
  const humidity = next(Number(previous.humidity ?? 86), 3.4, 65, 98);
  return {
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    temperature: Math.round(temperature * 10) / 10,
    humidity: Math.round(humidity),
  };
}

export function createSensorHistory() {
  let point = { temperature: 7.1, humidity: 86 };
  return Array.from({ length: 12 }, (_, index) => {
    point = createSensorPoint(point);
    return { ...point, time: `${String(9 + Math.floor(index / 2)).padStart(2, '0')}:${index % 2 ? '30' : '00'}` };
  });
}
