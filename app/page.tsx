"use client";
import { useEffect, useState } from 'react';
import WeatherChecker from '../app/WeatherChecker';
import AddProductionForm from '../app/AddProductionForm';

export default function Dashboard() {
  const [dati, setDati] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/produzione')
      .then(res => res.json())
      .then(data => setDati(data));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-800">SolarTech Monitor</h1>
          <p className="text-slate-500">Gestione Energia e Manutenzione Predittiva</p>
        </header>

        {/* Form di inserimento dati (CRUD) */}
        <AddProductionForm />

        {/* Lista Card con Meteo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dati.map((item: any) => (
            <div key={item.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-slate-800">{item.nome_parco}</h2>
                <span className="text-green-500 font-black text-xl">{item.efficienza}%</span>
              </div>
              <WeatherChecker lat={Number(item.latitudine)} lon={Number(item.longitudine)} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}