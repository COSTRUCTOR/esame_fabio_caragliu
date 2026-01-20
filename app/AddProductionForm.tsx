"use client";
import React, { useState } from 'react';

export default function AddProductionForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Recuperiamo i dati dal form
    const formData = new FormData(e.currentTarget);
    const payload = {
      id_impianto: formData.get('id_impianto'),
      data: formData.get('data'),
      kwh_prodotti: formData.get('kwh_prodotti'),
      ore_funzionamento: formData.get('ore_funzionamento'),
    };

    try {
      const res = await fetch('/api/produzione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Lettura salvata con successo!");
        window.location.reload(); // Ricarica per vedere il nuovo dato
      } else {
        const errorData = await res.json();
        alert("❌ Errore: " + (errorData.error || "Errore nel salvataggio"));
      }
    } catch (err) {
      alert("❌ Errore di connessione al server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10 p-6 bg-white rounded-2xl shadow-md border border-slate-200">
      <h2 className="text-lg font-bold mb-4 text-slate-700">Inserisci Nuova Produzione</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select name="id_impianto" className="p-2 border rounded-lg text-black" required>
          <option value="1">Parco Nord</option>
          <option value="2">Solar Valley</option>
          <option value="3">Green Field</option>
          <option value="4">Sun Peak</option>
          <option value="5">Eco Power</option>
        </select>
        <input name="data" type="date" className="p-2 border rounded-lg text-black" required />
        <input name="kwh_prodotti" type="number" step="0.01" placeholder="kWh Prodotti" className="p-2 border rounded-lg text-black" required />
        <input name="ore_funzionamento" type="number" step="0.1" placeholder="Ore Funz." className="p-2 border rounded-lg text-black" required />
        <button 
          type="submit" 
          disabled={loading}
          className="md:col-span-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-lg transition-all"
        >
          {loading ? "Salvataggio in corso..." : "Registra Produzione"}
        </button>
      </div>
    </form>
  );
}