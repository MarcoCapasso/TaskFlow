import {
  IconCheck,
  IconPencil,
  IconTrash,
  IconCalendar,
} from "./Icons";
import {
  statoLabels,
  tagLabels,
  statoColori,
  tagColori,
  statoIcone,
  tagIcone,
} from "../costanti";

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
  const completata = statoCorrente === 2;
  const IconaStato = statoIcone[statoCorrente];
  const IconaTag = tagIcone[tagCorrente];

  return (
    <div
      onClick={onModifica}
      className={`group flex items-center justify-between gap-3 sm:gap-4 bg-surface border border-line rounded-2xl px-3.5 sm:px-4 py-3.5 hover:border-line-strong hover:shadow-card hover:-translate-y-px transition-all cursor-pointer ${
        completata ? "opacity-60 hover:opacity-90" : ""
      }`}
    >
      {/* Sinistra: checkbox + titolo + meta */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/*Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompletato();
          }}
          aria-label={completata ? "Riapri task" : "Completa task"}
          className={`relative before:absolute before:-inset-2.5 w-[22px] h-[22px] rounded-lg border-[1.5px] flex items-center justify-center shrink-0 transition-all active:scale-90 ${
            completata
              ? "bg-accent border-accent text-on-accent"
              : "border-line-strong text-transparent hover:border-accent hover:text-accent/50"
          }`}
        >
          <IconCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>

        {/* titolo + meta */}
        <div className="min-w-0 flex-1">
          <h3
            className={`font-semibold text-fg truncate ${
              completata ? "line-through decoration-subtle" : ""
            }`}
          >
            {titolo}
          </h3>
          {descrizione && (
            <p className="text-sm text-muted truncate">{descrizione}</p>
          )}
          <div className="flex items-center gap-x-4 gap-y-1 flex-wrap mt-1.5 text-xs">
            <span className={`flex items-center gap-1.5 ${statoColori[statoCorrente]}`}>
              <IconaStato className="w-3.5 h-3.5" />
              {statoLabels[statoCorrente]}
            </span>
            <span className={`flex items-center gap-1.5 ${tagColori[tagCorrente]}`}>
              <IconaTag className="w-3.5 h-3.5" />
              {tagLabels[tagCorrente]}
            </span>
            <span className="flex items-center gap-1.5 text-subtle">
              <IconCalendar className="w-3.5 h-3.5" />
              {new Date(data).toLocaleDateString("it-IT")}
            </span>
          </div>
        </div>
      </div>

      {/* Destra: bottoni azione, visibili in hover (sempre su touch; su mobile si usa il tap sulla card) */}
      <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 touch:opacity-100 transition-opacity">
        {/* Modifica / Elimina */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onModifica();
          }}
          aria-label="Modifica task"
          className="p-2 rounded-lg text-muted hover:text-fg hover:bg-surface-2 transition-colors"
        >
          <IconPencil className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onElimina(id);
          }}
          aria-label="Elimina task"
          className="p-2 rounded-lg text-muted hover:text-danger hover:bg-danger-soft transition-colors"
        >
          <IconTrash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
