"use client";
import React, { useEffect, useState } from 'react';
import WeatherChecker from './WeatherChecker';
import AddProductionForm from './AddProductionForm';

export default function Dashboard() {
  // Inizializziamo sempre come array vuoto []
  const [dati, setDati] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/produzione')
      .then(res => res.json())
      .then(data => {
        // Controllo fondamentale: se data è un array lo salviamo, 
        // altrimenti salviamo un array vuoto per evitare il crash di .map()
        if (Array.isArray(data)) {
          setDati(data);
        } else {
          console.error("I dati ricevuti non sono un array:", data);
          setDati([]);
        }
      })
      .catch(err => {
        console.error("Errore fetch:", err);
        setDati([]);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-slate-800 mb-10">SolarTech Monitor</h1>
        
        <AddProductionForm />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Se dati è vuoto, mostriamo un messaggio invece di crashare */}
          {dati.length > 0 ? (
            dati.map((item: any) => (
              <div key={item.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">{item.nome_parco}</h2>
                  <span className="text-green-500 font-black text-xl">{item.efficienza}%</span>
                </div>
                <WeatherChecker lat={Number(item.latitudine)} lon={Number(item.longitudine)} />
              </div>
            ))
          ) : (
            <p className="text-slate-500">Nessun dato disponibile o errore nel database.</p>
          )}
        </div>
      </div>
    </main>
  );
}