import { IconCompletato, IconErrore } from "./Icons";

function Toast({ messaggio, tipo }) {
  return (
    <div className="fixed z-60 left-4 right-24 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] md:left-auto md:right-6 md:bottom-6 flex items-center gap-3 pl-3 pr-4 py-3 bg-raised border border-line rounded-xl shadow-card animate-pop-in">
      {tipo === "successo" ? (
        <IconCompletato className="w-5 h-5 text-accent" />
      ) : (
        <IconErrore className="w-5 h-5 text-danger" />
      )}
      <p className="text-sm text-fg">{messaggio}</p>
    </div>
  );
}

export default Toast;
