import { useState } from "react";
import {
  IconLogo,
  IconPlus,
  IconMoon,
  IconSun,
  IconUser,
  IconLogout,
} from "./Icons";

function Navbar({ onNuovaTask, onLogout, email, tema, onToggleTema }) {
  const [menuAperto, setMenuAperto] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-canvas/80 backdrop-blur-xl border-b border-line h-(--tf-header) pt-[env(safe-area-inset-top)]">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/*Logo*/}
          <IconLogo className="w-8 h-8 text-accent" />
          {/*Titolo*/}
          <span className="text-lg font-bold tracking-tight text-fg">
            TaskFlow
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/*Nuova task*/}
          <button
            onClick={onNuovaTask}
            className="hidden md:flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-on-accent font-semibold rounded-xl pl-3 pr-4 py-2 text-sm transition-colors active:scale-[0.98]"
          >
            <IconPlus className="w-4 h-4" /> Nuova Task
          </button>

          {/*Toggle tema chiaro/scuro*/}
          <button
            onClick={onToggleTema}
            aria-label={tema === "light" ? "Passa al tema scuro" : "Passa al tema chiaro"}
            className="p-2 rounded-xl text-muted hover:text-fg hover:bg-surface-2 transition-colors"
          >
            {tema === "light" ? (
              <IconMoon className="w-5 h-5" />
            ) : (
              <IconSun className="w-5 h-5" />
            )}
          </button>

          {/*Icona Profilo*/}
          <div className="relative">
            <button
              onClick={() => setMenuAperto(!menuAperto)}
              aria-label="Profilo"
              className={`p-2 rounded-xl transition-colors ${
                menuAperto
                  ? "bg-surface-2 text-fg"
                  : "text-muted hover:text-fg hover:bg-surface-2"
              }`}
            >
              <IconUser className="w-5 h-5" />
            </button>

            {menuAperto && (
              <>
                {/* Chiude il menu cliccando fuori */}
                <div
                  className="fixed inset-0"
                  onClick={() => setMenuAperto(false)}
                />
                <div className="absolute right-0 mt-2 w-60 max-w-[calc(100vw-2rem)]bg-raised border border-line rounded-xl shadow-card p-1.5 animate-pop-in">
                  <div className="px-3 py-2">
                    <p className="text-xs text-subtle">Connesso come</p>
                    <p className="text-sm text-fg truncate">{email}</p>
                  </div>
                  <div className="h-px bg-line my-1" />
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm text-danger hover:bg-danger-soft rounded-lg transition-colors"
                  >
                    <IconLogout className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
