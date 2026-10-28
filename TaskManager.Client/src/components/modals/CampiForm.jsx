import { IconChevron, IconX } from "../Icons";

//Etichetta + contenuto + eventuale errore di validazione dal backend
export function Campo({ label, errore, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted">{label}</label>
      {children}
      {errore && <p className="text-xs text-danger">{errore[0]}</p>}
    </div>
  );
}

//Select nativa con chevron custom
export function Selezione({ value, onChange, opzioni }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="tf-input appearance-none pr-9 cursor-pointer"
      >
        {Object.entries(opzioni).map(([valore, label]) => (
          <option key={valore} value={valore}>
            {label}
          </option>
        ))}
      </select>
      <IconChevron className="w-4 h-4 text-subtle absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}

export function IntestazioneModale({ titolo, sottotitolo, onChiudi }) {
  return (
    <div className="flex items-start justify-between pb-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-fg">{titolo}</h2>
        <p className="text-sm text-muted">{sottotitolo}</p>
      </div>
      <button
        type="button"
        onClick={onChiudi}
        aria-label="Chiudi"
        className="w-8 h-8 rounded-lg text-muted hover:text-fg hover:bg-surface-2 flex items-center justify-center transition-colors"
      >
        <IconX className="w-4 h-4" />
      </button>
    </div>
  );
}
