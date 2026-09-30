import { Moon, User, Plus } from "lucide-react";

function Navbar({ onNuovaTask }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b-3 border-slate-800/80 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className=" w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
            T
          </div>
          <span className="text-lg font-bold text-white">TaskFlow</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNuovaTask}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 text-sm"
          >
            <Plus className="w-5 h-5" /> Nuova Task
          </button>

          <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <Moon className="w-5 h-5" />
          </button>

          <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
