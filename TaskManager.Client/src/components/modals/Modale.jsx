//Overlay + pannello condiviso da tutti i modali, click fuori per chiudere
function Modale({ onChiudi, larghezza = "max-w-xl", children }) {
  return (
    <div
      className="fixed inset-0 bg-overlay backdrop-blur-sm flex items-center justify-center z-50 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] animate-fade-in"
      onClick={onChiudi}
    >
      <div
        className={`bg-raised border border-line rounded-2xl shadow-card p-5 sm:p-6 w-full max-h-full overflow-y-auto overscroll-contain animate-pop-in ${larghezza}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modale;
