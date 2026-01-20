import React, { useEffect, useState } from 'react';

export default function WeatherChecker({ lat, lon }: { lat: number, lon: number }) {
  const [radiation, setRadiation] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=shortwave_radiation_sum&timezone=auto`)
      .then(res => res.json())
      .then(data => setRadiation(data.daily.shortwave_radiation_sum[0]))
      .catch(() => setRadiation(0));
  }, [lat, lon]);

  return (
    <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
      <p className="text-[10px] font-bold text-blue-400 uppercase">Irraggiamento Solare</p>
      <p className="text-sm font-bold text-blue-900">
        {radiation !== null ? `${radiation} MJ/m²` : 'Caricamento...'}
      </p>
    </div>
  );
}