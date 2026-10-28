import {
  statoLabels,
  tagLabels,
  statoColori,
  tagColori,
  statoIcone,
  tagIcone,
} from "../costanti";

const stati = [0, 1, 2].map((v) => ({
  valore: v,
  label: statoLabels[v],
  colore: statoColori[v],
}));

const tags = [0, 1, 2].map((v) => ({
  valore: v,
  label: tagLabels[v],
  colore: tagColori[v],
}));

//Voce di filtro
// click per attivare, secondo click per disattivare
function VoceFiltro({ Icona, label, colore, conteggio, attivo, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-sm transition-colors ${
        attivo
          ? "bg-surface-2 text-fg ring-1 ring-line-strong"
          : "text-muted hover:bg-surface-2 hover:text-fg"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <Icona className={`w-[18px] h-[18px] ${colore}`} />
        {label}
      </span>
      <span
        className={`text-xs tabular-nums min-w-6 text-center rounded-md px-1.5 py-0.5 ${
          attivo ? "bg-accent-soft text-accent" : "text-subtle"
        }`}
      >
        {conteggio}
      </span>
    </button>
  );
}

function ChipFiltro({ Icona, label, colore, conteggio, attivo, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 flex items-center gap-2 pl-3 pr-2.5 h-9 rounded-full border text-sm transition-colors ${
        attivo
          ? "bg-surface-2 border-line-strong text-fg"
          : "bg-surface border-line text-muted"
      }`}
    >
      <Icona className={`w-4 h-4 ${colore}`} />
      {label}
      <span
        className={`text-xs tabular-nums rounded-md px-1.5 ${
          attivo ? "bg-accent-soft text-accent" : "text-subtle"
        }`}
      >
        {conteggio}
      </span>
    </button>
  );
}

//Costruisce le voci di stato e tag con conteggi e handler, condivise da sidebar e chip
function useVociFiltro({ taskList, filtroStato, setFiltroStato, filtroTag, setFiltroTag }) {
  const vociStato = stati.map((s) => ({
    key: `s${s.valore}`,
    Icona: statoIcone[s.valore],
    label: s.label,
    colore: s.colore,
    conteggio: taskList.filter((t) => t.statoCorrente === s.valore).length,
    attivo: filtroStato === s.valore,
    onClick: () => setFiltroStato(filtroStato === s.valore ? null : s.valore),
  }));
  const vociTag = tags.map((t) => ({
    key: `t${t.valore}`,
    Icona: tagIcone[t.valore],
    label: t.label,
    colore: t.colore,
    conteggio: taskList.filter((task) => task.tagCorrente === t.valore).length,
    attivo: filtroTag === t.valore,
    onClick: () => setFiltroTag(filtroTag === t.valore ? null : t.valore),
  }));
  return { vociStato, vociTag };
}

function Sidebar(props) {
  const { vociStato, vociTag } = useVociFiltro(props);

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col gap-7 p-5 border-r border-line sticky top-(--tf-header) h-[calc(100dvh-var(--tf-header))] overflow-y-auto">
      <div className="flex flex-col gap-1">
        <h2 className="text-[11px] font-semibold text-subtle uppercase tracking-widest mb-2 px-3">
          Stato
        </h2>
        {vociStato.map(({ key, ...voce }) => (
          <VoceFiltro key={key} {...voce} />
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-[11px] font-semibold text-subtle uppercase tracking-widest mb-2 px-3">
          Tag
        </h2>
        {vociTag.map(({ key, ...voce }) => (
          <VoceFiltro key={key} {...voce} />
        ))}
      </div>
    </aside>
  );
}

//Filtri su mobile
export function FiltriMobile(props) {
  const { vociStato, vociTag } = useVociFiltro(props);

  return (
    <div className="md:hidden -mx-4 sm:-mx-6 mb-6 flex gap-2 overflow-x-auto scrollbar-none px-4 sm:px-6 py-1">
      {vociStato.map(({ key, ...voce }) => (
        <ChipFiltro key={key} {...voce} />
      ))}
      <span className="shrink-0 w-px bg-line my-1.5" />
      {vociTag.map(({ key, ...voce }) => (
        <ChipFiltro key={key} {...voce} />
      ))}
    </div>
  );
}

export default Sidebar;
