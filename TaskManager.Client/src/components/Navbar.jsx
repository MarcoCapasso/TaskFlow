import { Moon, User, Plus } from "lucide-react";
import { useState } from "react";

function Navbar({ onNuovaTask, onLogout, email }) {
  const [menuAperto, setMenuAperto] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b-3 border-slate-800/80 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/*Logo*/}
          <div className=" w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
            T
          </div>
          {/*Titolo*/}
          <span className="text-lg font-bold text-white">TaskFlow</span>
        </div>

        <div className="flex items-center gap-3">
          {/*Nuova task*/}
          <button
            onClick={onNuovaTask}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 text-sm"
          >
            <Plus className="w-5 h-5" /> Nuova Task
          </button>

          {/*Toggle tema chiaro/scuro*/}
          <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <Moon className="w-5 h-5" />
          </button>

          {/*Icona Profilo*/}
          <div className="relative">
            <button
              onClick={() => setMenuAperto(!menuAperto)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <User className="w-5 h-5" />
            </button>

            {menuAperto && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
                <p className="px-4 py-2 text-xs text-slate-400 border-b border-slate-700 truncate">
                  {email}
                </p>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
