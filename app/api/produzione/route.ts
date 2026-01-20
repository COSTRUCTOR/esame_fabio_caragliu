import { NextResponse } from 'next/server';
// Usiamo @ per puntare alla root, è il modo più sicuro
import pool from '@/app/lib/db'; 

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, i.nome_parco, i.latitudine, i.longitudine, i.capacita_max_kw,
      ROUND(((p.kwh_prodotti / p.ore_funzionamento) / i.capacita_max_kw) * 100, 2) as efficienza
      FROM produzione p
      JOIN impianti i ON p.id_impianto = i.id
      ORDER BY p.data DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Errore Database:", error);
    return NextResponse.json([]); // Restituisce array vuoto in caso di errore
  }
}

// Aggiungiamo anche la POST per far funzionare il form
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Dati ricevuti dal form:", body); // Questo apparirà nel terminale di VS Code

    const { id_impianto, data, kwh_prodotti, ore_funzionamento } = body;

    // Verifichiamo che i dati non siano vuoti
    if (!id_impianto || !data || !kwh_prodotti || !ore_funzionamento) {
      return NextResponse.json({ error: "Tutti i campi sono obbligatori" }, { status: 400 });
    }

    await pool.query(
      'INSERT INTO produzione (id_impianto, data, kwh_prodotti, ore_funzionamento) VALUES (?, ?, ?, ?)',
      [id_impianto, data, kwh_prodotti, ore_funzionamento]
    );

    return NextResponse.json({ message: "Dati inseriti correttamente" });
  } catch (error: any) {
    console.error("ERRORE DATABASE DURANTE POST:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}