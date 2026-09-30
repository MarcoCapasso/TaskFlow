import { Check, Pencil, Trash2 } from "lucide-react";

const statoLabels = {
  0: "Da fare",
  1: "In corso",
  2: "Completato",
};

const tagLabels = {
  0: "Personale",
  1: "Lavoro",
  2: "Casa",
};

const statoColori = {
  0: "bg-slate-500/20 text-slate-400",
  1: "bg-blue-500/20 text-blue-400",
  2: "bg-green-500/20 text-green-400",
};

const tagColori = {
  0: "bg-purple-500/20 text-purple-400", // Personale
  1: "bg-yellow-500/20 text-yellow-400", // Lavoro
  2: "bg-pink-500/40 text-pink-100", // Casa
};

function TaskCard({
  id,
  titolo,
  descrizione,
  statoCorrente,
  data,
  tagCorrente,
  onElimina,
  onModifica,
  onToggleCompletato,
}) {
  return (
    <div
      onClick={onModifica}
      className={`flex items-center justify-between gap-4 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 hover:border-slate-600 hover:bg-slate-750 transition-colors cursor-pointer ${statoCorrente === 2 ? "opacity-50" : ""}`}
    >
      {/* Sinistra: checkbox + titolo + badge */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/*Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompletato();
          }}
          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
            statoCorrente === 2
              ? "bg-green-500 border-green-500"
              : "border-slate-600 hover:border-blue-500"
          }`}
        >
          {statoCorrente === 2 && <Check className="w-3 h-3 text-white" />}
        </button>

        {/* titolo + badge */}
        <h3 className="text-lg font-semibold text-white">{titolo}</h3>
        <div className="flex gap-2 flex-wrap">
          <span
            className={`text-xs px-2 py-1 rounded-full ${statoColori[statoCorrente]}`}
          >
            {statoLabels[statoCorrente]}
          </span>

          <span
            className={`text-xs px-2 py-1 rounded-full ${tagColori[tagCorrente]}`}
          >
            {tagLabels[tagCorrente]}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
            {new Date(data).toLocaleDateString("it-IT")}
          </span>
        </div>
      </div>

      {/* Destra: bottoni azione */}
      <div className="flex items-center gap-2">
        {/* Modifica / Elimina */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onModifica();
          }}
          className="p-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600"
        >
          <Pencil className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onElimina(id);
          }}
          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
