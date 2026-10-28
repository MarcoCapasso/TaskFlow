import {
  IconDaFare,
  IconInCorso,
  IconCompletato,
  IconUser,
  IconBriefcase,
  IconHome,
} from "./components/Icons";

//Etichette e colori condivisi per stati e tag (stessi valori numerici del backend)

export const statoLabels = {
  0: "Da fare",
  1: "In corso",
  2: "Completato",
};

export const tagLabels = {
  0: "Personale",
  1: "Lavoro",
  2: "Casa",
};

export const statoColori = {
  0: "text-muted",
  1: "text-progress",
  2: "text-accent",
};

export const tagColori = {
  0: "text-tag-personale",
  1: "text-tag-lavoro",
  2: "text-tag-casa",
};

//Mappe condivise tra Sidebar, TaskCard e modali
export const statoIcone = {
  0: IconDaFare,
  1: IconInCorso,
  2: IconCompletato,
};

export const tagIcone = {
  0: IconUser,
  1: IconBriefcase,
  2: IconHome,
};

//Stili dei bottoni condivisi dai modali
export const classiBottone = {
  primario:
    "bg-accent hover:bg-accent-hover text-on-accent font-semibold rounded-xl px-4 py-2 transition-colors active:scale-[0.98]",
  secondario:
    "text-muted hover:text-fg hover:bg-surface-2 font-medium rounded-xl px-4 py-2 transition-colors",
  pericolo:
    "flex items-center gap-2 text-danger hover:bg-danger-soft font-medium rounded-xl px-3 py-2 transition-colors",
};
