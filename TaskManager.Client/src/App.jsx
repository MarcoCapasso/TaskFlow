import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/modals/TaskForm";
import TaskEditForm from "./components/modals/TaskEditForm";
import ConfirmDeleteModal from "./components/modals/ConfirmDeleteModal";
import Navbar from "./components/Navbar";
import Sidebar, { FiltriMobile } from "./components/Sidebar";
import LoginPage from "./components/LoginPage";
import Toast from "./components/Toast";
import Modale from "./components/modals/Modale";
import { IconCalendar, IconPlus } from "./components/Icons";
import { API_URL } from "./api";

const salutiMattina = [
  "Buongiorno",
  "Buona giornata",
  "Inizia bene la giornata",
];
const salutiPomeriggio = [
  "Buon pomeriggio",
  "Come procede la giornata?",
  "Caffè di metà giornata?",
];
const salutiSera = [
  "Buonasera",
  "Come è andata la giornata?",
  "Ultimo sprint della giornata",
];

//Messaggio Adattivo
function scegliCasuale(array) {
  const indiceCasuale = Math.floor(Math.random() * array.length);
  return array[indiceCasuale];
}

function getSaluto() {
  const ora = new Date().getHours();
  if (ora < 12) return scegliCasuale(salutiMattina);
  if (ora < 18) return scegliCasuale(salutiPomeriggio);
  return scegliCasuale(salutiSera);
}

function getDataFormattata() {
  const oggi = new Date();
  return oggi.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [taskList, setTaskList] = useState([]);
  const [taskInModifica, setTaskInModifica] = useState(null);
  const [mostraForm, setMostraForm] = useState(false);
  const [filtroStato, setFiltroStato] = useState(null);
  const [filtroTag, setFiltroTag] = useState(null);
  const [taskDaEliminare, setTaskDaEliminare] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const utenteDecodificato = token ? decodificaToken(token) : null;
  const emailUtente =
    utenteDecodificato?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];
  const [toast, setToast] = useState(null);
  //Estratto una sola volta: non cambia a ogni re-render
  const [saluto] = useState(getSaluto);
  const [tema, setTema] = useState(
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );

  //Task che soddisfano entrambi i filtri attivi (stato e tag)
  const taskFiltrati = taskList.filter((t) => {
    const passaFiltroStato =
      filtroStato === null || t.statoCorrente === filtroStato;
    const passaFiltroTag = filtroTag === null || t.tagCorrente === filtroTag;
    return passaFiltroStato && passaFiltroTag;
  });

  //FUNZIONI

  //Ricarica automaticamente la pagina per mostrare le modifiche effettuate
  // creazione, modifica, eliminazione delle task o logout/login
  function ricaricaTasks() {
    fetch(`${API_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setTaskList(data));
  }

  //Tema chiaro/scuro
  useEffect(() => {
    if (tema === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", tema === "light" ? "#f4f5f3" : "#0b0c0f");
    try {
      localStorage.setItem("tema", tema);
    } catch {
      //storage non disponibile: il tema vale solo per la sessione
    }
  }, [tema]);

  useEffect(() => {
    if (token) {
      ricaricaTasks();
    }
  }, [token]);

  //Elimina task
  function eliminaTask(id) {
    fetch(`${API_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      ricaricaTasks();
      mostraToast("Task eliminata con successo.", "successo");
    });
  }

  //Cambia Stato
  function toggleCompletato(task) {
    const nuovoStato = task.statoCorrente === 2 ? 0 : 2;
    const taskAggiornato = {
      titolo: task.titolo,
      descrizione: task.descrizione,
      stato: nuovoStato,
      data: task.data,
      tag: task.tagCorrente,
    };

    fetch(`${API_URL}/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskAggiornato),
    }).then(() => ricaricaTasks());
  }

  //Raggruppa per data
  function getFasciaData(dataTask) {
    const oggi = new Date();
    oggi.setHours(0, 0, 0, 0); //confronto solo il giorno non l'orario

    const data = new Date(dataTask);
    data.setHours(0, 0, 0, 0);

    const unGiorno = 24 * 60 * 60 * 1000;
    const differenzaGiorni = Math.round((data - oggi) / unGiorno);

    if (differenzaGiorni === 0) return "Oggi";
    if (differenzaGiorni > 0 && differenzaGiorni <= 7)
      return "Questa settimana";
    if (differenzaGiorni > 7 && differenzaGiorni <= 30) return "Questo mese";
    return "Altro";
  }

  const gruppi = {
    Oggi: taskFiltrati.filter((t) => getFasciaData(t.data) === "Oggi"),
    "Questa settimana": taskFiltrati.filter(
      (t) => getFasciaData(t.data) === "Questa settimana",
    ),
    "Questo mese": taskFiltrati.filter(
      (t) => getFasciaData(t.data) === "Questo mese",
    ),
    Altro: taskFiltrati.filter((t) => getFasciaData(t.data) === "Altro"),
  };

  //Login
  function handleLoginSuccess(nuovoToken) {
    localStorage.setItem("token", nuovoToken);
    setToken(nuovoToken);
  }

  //Logout
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  if (!token) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  function decodificaToken(token) {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch {
      return null;
    }
  }

  //Messagio Toast
  function mostraToast(messaggio, tipo = "successo") {
    setToast({ messaggio, tipo });
    setTimeout(() => setToast(null), 3000);
  }

  //RENDER

  return (
    <div className="min-h-dvh bg-canvas text-fg flex">
      {/*Navbar*/}
      <Navbar
        onNuovaTask={() => setMostraForm(true)}
        onLogout={handleLogout}
        email={emailUtente}
        tema={tema}
        onToggleTema={() => setTema(tema === "light" ? "dark" : "light")}
      />

      {/* Contenuto principale */}
      <div className="flex pt-(--tf-header) flex-1 min-w-0">
        {/*Sidebar (da md in su)*/}
        <Sidebar
          taskList={taskList}
          filtroStato={filtroStato}
          setFiltroStato={setFiltroStato}
          filtroTag={filtroTag}
          setFiltroTag={setFiltroTag}
        />

        <main className="flex-1 min-w-0 max-w-4xl px-4 sm:px-6 lg:px-10 pt-6 md:pt-8 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-8">
          {/* Giorno e calendario*/}
          <div className="mb-2 flex items-center gap-2 text-muted text-sm">
            <IconCalendar className="w-4 h-4 text-accent" />
            <span className="capitalize">{getDataFormattata()}</span>
          </div>
          {/* Saluto personalizzato */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-fg mb-6 md:mb-10">
            {saluto}
          </h1>
          {/* Filtri (sotto md) */}
          <FiltriMobile
            taskList={taskList}
            filtroStato={filtroStato}
            setFiltroStato={setFiltroStato}
            filtroTag={filtroTag}
            setFiltroTag={setFiltroTag}
          />
          {/* Toast */}
          {toast && <Toast messaggio={toast.messaggio} tipo={toast.tipo} />}

          {/* Modale per creazione task*/}
          {mostraForm && (
            <Modale onChiudi={() => setMostraForm(false)}>
              <TaskForm
                token={token}
                onTaskCreato={() => {
                  ricaricaTasks();
                  setMostraForm(false);
                  mostraToast("Task creata con successo", "successo");
                }}
                onAnnulla={() => setMostraForm(false)}
              />
            </Modale>
          )}

          {/* Modale per modifica task*/}
          {taskInModifica && (
            <Modale onChiudi={() => setTaskInModifica(null)}>
              <TaskEditForm
                token={token}
                task={taskInModifica}
                onTaskModificato={() => {
                  ricaricaTasks();
                  setTaskInModifica(null);
                  mostraToast("Task modificata con successo", "successo");
                }}
                onAnnulla={() => setTaskInModifica(null)}
                onElimina={() => {
                  setTaskInModifica(null);
                  setTaskDaEliminare(taskInModifica);
                }}
              />
            </Modale>
          )}

          {/* Modale per eliminazione task */}
          {taskDaEliminare && (
            <Modale onChiudi={() => setTaskDaEliminare(null)} larghezza="max-w-md">
              <ConfirmDeleteModal
                task={taskDaEliminare}
                onConferma={() => {
                  eliminaTask(taskDaEliminare.id);
                  setTaskDaEliminare(null);
                }}
                onAnnulla={() => setTaskDaEliminare(null)}
              />
            </Modale>
          )}

          {/* Lista dei task filtrati */}
          {Object.entries(gruppi).map(
            ([nomeGruppo, taskDelGruppo]) =>
              taskDelGruppo.length > 0 && (
                <section key={nomeGruppo} className="mb-8">
                  <h2 className="flex items-center gap-3 text-[11px] font-semibold text-subtle uppercase tracking-widest mb-3">
                    {nomeGruppo}
                    <span className="text-muted tabular-nums">{taskDelGruppo.length}</span>
                    <span className="h-px flex-1 bg-line" />
                  </h2>
                  <div className="flex flex-col gap-2.5">
                    {taskDelGruppo.map((task) => (
                      <TaskCard
                        key={task.id}
                        id={task.id}
                        titolo={task.titolo}
                        descrizione={task.descrizione}
                        statoCorrente={task.statoCorrente}
                        data={task.data}
                        tagCorrente={task.tagCorrente}
                        onElimina={() => setTaskDaEliminare(task)}
                        onModifica={() => setTaskInModifica(task)}
                        onToggleCompletato={() => {
                          toggleCompletato(task);
                          mostraToast(
                            task.statoCorrente === 2
                              ? "Task riaperta"
                              : "Task completata",
                            "successo",
                          );
                        }}
                      />
                    ))}
                  </div>
                </section>
              ),
          )}
        </main>
      </div>

      {/* FAB nuova task (sotto md) */}
      <button
        onClick={() => setMostraForm(true)}
        aria-label="Nuova Task"
        className="md:hidden fixed z-30 right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] w-14 h-14 rounded-2xl bg-accent text-on-accent shadow-card flex items-center justify-center active:scale-95 transition-transform"
      >
        <IconPlus className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;
