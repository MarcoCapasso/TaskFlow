import { AlertTriangle, Trash2 } from "lucide-react";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";

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

function ConfirmDeleteModal({ task, onConferma, onAnnulla }) {
  useKeyboardShortcuts({
    Escape: onAnnulla,
    Enter: onConferma,
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-1">Elimina Task?</h2>
        <p className="text-sm text-slate-400">
          Sei sicuro di voler eliminare{" "}
          <span className="text-white font-medium">"{task.titolo}"</span>?
          <br />
          Questa azione non può essere annullata.
        </p>
      </div>

      {/* Anteprima */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 flex flex-col gap-2">
        <p className="font-semibold text-white">{task.titolo}</p>
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
            {statoLabels[task.statoCorrente]}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
            {tagLabels[task.tagCorrente]}
          </span>
        </div>
      </div>

      {/* Azioni */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onAnnulla}
          className="bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg px-4 py-2"
        >
          Annulla
        </button>
        <button
          type="button"
          onClick={onConferma}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-lg px-4 py-2"
        >
          <Trash2 className="w-4 h-4" />
          Elimina Task
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
