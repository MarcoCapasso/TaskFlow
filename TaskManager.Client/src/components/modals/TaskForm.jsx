import { useState } from "react";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskForm({ onTaskCreato, onAnnulla }) {
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [statoCorrente, setStatoCorrente] = useState(0);
  const [tagCorrente, setTagCorrente] = useState(0);
  const [data, setData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const nuovoTask = {
      titolo: titolo,
      descrizione: descrizione,
      stato: statoCorrente,
      data: formatDataPerBackend(data),
      tag: tagCorrente,
    };

    fetch("http://localhost:5285/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuovoTask),
    }).then(() => onTaskCreato());
  }

  function formatDataPerBackend(dataObj) {
    const anno = dataObj.getFullYear();
    const mese = String(dataObj.getMonth() + 1).padStart(2, "0");
    const giorno = String(dataObj.getDate()).padStart(2, "0");
    return `${anno}-${mese}-${giorno}`;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Crea Task</h2>
          <p className="text-sm text-slate-400">
            Aggiungi i dettagli della task
          </p>
        </div>
        <button
          type="button"
          onClick={onAnnulla}
          className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase">
            Titolo
          </label>
          <input
            type="text"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            placeholder="Titolo della task"
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase">
            Descrizione
          </label>
          <input
            type="text"
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
            placeholder="Descrizione della task"
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase">
            Stato
          </label>
          <select
            value={statoCorrente}
            onChange={(e) => setStatoCorrente(Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Da fare</option>
            <option value={1}>In corso</option>
            <option value={2}>Completato</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase">
            Data
          </label>
          <DatePicker
            selected={data}
            onChange={(nuovaData) => setData(nuovaData)}
            dateFormat="dd/MM/yyyy"
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase">
            Tag
          </label>
          <select
            value={tagCorrente}
            onChange={(e) => setTagCorrente(Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Personale</option>
            <option value={1}>Lavoro</option>
            <option value={2}>Casa</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-700 pt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onAnnulla}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg px-4 py-2"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2"
            >
              Crea Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
