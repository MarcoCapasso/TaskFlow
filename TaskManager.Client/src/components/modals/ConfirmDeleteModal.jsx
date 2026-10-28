import { IconAlert, IconTrash } from "../Icons";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";
import {
  statoLabels,
  tagLabels,
  statoColori,
  tagColori,
  statoIcone,
  tagIcone,
  classiBottone,
} from "../../costanti";

function ConfirmDeleteModal({ task, onConferma, onAnnulla }) {
  useKeyboardShortcuts({
    Escape: onAnnulla,
    Enter: onConferma,
  });
  const IconaStato = statoIcone[task.statoCorrente];
  const IconaTag = tagIcone[task.tagCorrente];

  return (
    <div className="flex flex-col gap-5">
      <div className="w-12 h-12 rounded-2xl bg-danger-soft text-danger flex items-center justify-center">
        <IconAlert className="w-6 h-6" />
      </div>

      <div>
        <h2 className="text-xl font-bold tracking-tight text-fg mb-1">
          Elimina Task?
        </h2>
        <p className="text-sm text-muted">
          Questa azione non può essere annullata.
        </p>
      </div>

      {/* Anteprima */}
      <div className="bg-surface-2 border border-line rounded-xl p-3.5 flex flex-col gap-2">
        <p className="font-semibold text-fg">{task.titolo}</p>
        <div className="flex gap-4 flex-wrap text-xs">
          <span className={`flex items-center gap-1.5 ${statoColori[task.statoCorrente]}`}>
            <IconaStato className="w-3.5 h-3.5" />
            {statoLabels[task.statoCorrente]}
          </span>
          <span className={`flex items-center gap-1.5 ${tagColori[task.tagCorrente]}`}>
            <IconaTag className="w-3.5 h-3.5" />
            {tagLabels[task.tagCorrente]}
          </span>
        </div>
      </div>

      {/* Azioni */}
      <div className="flex items-center justify-end gap-2">
        <button type="button" onClick={onAnnulla} className={classiBottone.secondario}>
          Annulla
        </button>
        <button
          type="button"
          onClick={onConferma}
          className="flex items-center gap-2 bg-danger hover:opacity-90 text-white font-semibold rounded-xl px-4 py-2 transition-opacity active:scale-[0.98]"
        >
          <IconTrash className="w-4 h-4" />
          Elimina Task
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
