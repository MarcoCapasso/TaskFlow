import {
  Circle,
  Clock,
  CheckCircle,
  User,
  Briefcase,
  Home,
} from "lucide-react";

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

function Sidebar({
  taskList,
  filtroStato,
  setFiltroStato,
  filtroTag,
  setFiltroTag,
}) {
  return (
    <aside className="w-56 flex flex-col gap-6 p-6 border-r-3 border-slate-800/80">
      <div>
        <h2 className="text-xs font-semibold text-slate-400 uppercase mb-2 text-center">
          Stato
        </h2>
        {/*Da Fare*/}
        <button
          onClick={() => setFiltroStato(filtroStato === 0 ? null : 0)}
          className={`w-full text-left px-3 py-2 rounded-lg flex justify-between transition-colors ${
            filtroStato === 0
              ? "bg-slate-800 border border-slate-700 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2">
            <Circle className="w-4 h-4" />
            Da fare
          </span>
          <span className="text-slate-500">
            {taskList.filter((t) => t.statoCorrente === 0).length}
          </span>
        </button>

        {/*In Corso*/}
        <button
          onClick={() => setFiltroStato(filtroStato === 1 ? null : 1)}
          className={`w-full text-left px-3 py-2 rounded-lg flex justify-between transition-colors ${
            filtroStato === 1
              ? "bg-slate-800 border border-slate-700 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            In corso
          </span>
          <span className="text-slate-500">
            {taskList.filter((t) => t.statoCorrente === 1).length}
          </span>
        </button>

        {/*Completato*/}
        <button
          onClick={() => setFiltroStato(filtroStato === 2 ? null : 2)}
          className={`w-full text-left px-3 py-2 rounded-lg flex justify-between transition-colors ${
            filtroStato === 2
              ? "bg-slate-800 border border-slate-700 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Completato
          </span>
          <span className="text-slate-500">
            {taskList.filter((t) => t.statoCorrente === 2).length}
          </span>
        </button>
      </div>

      <div>
        <h2 className="text-xs font-semibold text-slate-400 uppercase mb-2 text-center">
          Tag
        </h2>
        {/*Personal*/}
        <button
          onClick={() => setFiltroTag(filtroTag === 0 ? null : 0)}
          className={`w-full text-left px-3 py-2 rounded-lg flex justify-between transition-colors ${
            filtroTag === 0
              ? "bg-slate-800 border border-slate-700 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Personale
          </span>
          <span className="text-slate-500">
            {taskList.filter((t) => t.tagCorrente === 0).length}
          </span>
        </button>

        {/*Work*/}
        <button
          onClick={() => setFiltroTag(filtroTag === 1 ? null : 1)}
          className={`w-full text-left px-3 py-2 rounded-lg flex justify-between transition-colors ${
            filtroTag === 1
              ? "bg-slate-800 border border-slate-700 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Lavoro
          </span>
          <span className="text-slate-500">
            {taskList.filter((t) => t.tagCorrente === 1).length}
          </span>
        </button>

        {/*Home*/}
        <button
          onClick={() => setFiltroTag(filtroTag === 2 ? null : 2)}
          className={`w-full text-left px-3 py-2 rounded-lg flex justify-between transition-colors ${
            filtroTag === 2
              ? "bg-slate-800 border border-slate-700 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Casa
          </span>
          <span className="text-slate-500">
            {taskList.filter((t) => t.tagCorrente === 2).length}
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
