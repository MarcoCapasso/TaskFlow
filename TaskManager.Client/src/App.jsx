import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/modals/TaskForm";
import TaskEditForm from "./components/modals/TaskEditForm";
import ConfirmDeleteModal from "./components/modals/ConfirmDeleteModal";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/LoginPage";
import Toast from "./components/Toast";
import "./App.css";

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

  //Task che soddisfano entrambi i filtri attivi (stato e tag)
  const taskFiltrati = taskList.filter((t) => {
    const passaFiltroStato =
      filtroStato === null || t.statoCorrente === filtroStato;
    const passaFiltroTag = filtroTag === null || t.tagCorrente === filtroTag;
    return passaFiltroStato && passaFiltroTag;
  });

  //FUNZIONI

  //Ricarica automaticamente la pagina per mostrare le modifiche effettuate, come creazione, modifica, eliminazione delle task o logout/login
  function ricaricaTasks() {
    fetch("http://localhost:5285/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setTaskList(data));
  }

  useEffect(() => {
    if (token) {
      ricaricaTasks();
    }
  }, [token]);

  //Elimina task
  function eliminaTask(id) {
    fetch(`http://localhost:5285/api/tasks/${id}`, {
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

    fetch(`http://localhost:5285/api/tasks/${task.id}`, {
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
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/*Navbar*/}
      <Navbar
        onNuovaTask={() => setMostraForm(true)}
        onLogout={handleLogout}
        email={emailUtente}
      />

      {/* Contenuto principale */}
      <div className="flex pt-16 flex-1">
        {/*Sidebar*/}
        <Sidebar
          taskList={taskList}
          filtroStato={filtroStato}
          setFiltroStato={setFiltroStato}
          filtroTag={filtroTag}
          setFiltroTag={setFiltroTag}
        />

        <div className="flex-1 p-6">
          {/* Giorno e calendario*/}
          <div className="mb-6 flex items-center gap-2 text-slate-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span className="capitalize">{getDataFormattata()}</span>
          </div>
          {/* Saluto personalizzato */}
          <h1 className="text-3xl font-bold text-white mb-6">{getSaluto()}</h1>
          {/* Toast */}
          {toast && <Toast messaggio={toast.messaggio} tipo={toast.tipo} />}

          {/* Modale per creazione task*/}
          {mostraForm && (
            <div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              onClick={() => setMostraForm(false)}
            >
              <div
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <TaskForm
                  token={token}
                  onTaskCreato={() => {
                    ricaricaTasks();
                    setMostraForm(false);
                    mostraToast("Task creata con successo", "successo");
                  }}
                  onAnnulla={() => setMostraForm(false)}
                />
              </div>
            </div>
          )}

          {/* Modale per modifica task*/}
          {taskInModifica && (
            <div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              onClick={() => setTaskInModifica(null)}
            >
              <div
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
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
              </div>
            </div>
          )}

          {/* Modale per eliminazione task */}
          {taskDaEliminare && (
            <div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              onClick={() => setTaskDaEliminare(null)}
            >
              <div
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <ConfirmDeleteModal
                  task={taskDaEliminare}
                  onConferma={() => {
                    eliminaTask(taskDaEliminare.id);
                    setTaskDaEliminare(null);
                  }}
                  onAnnulla={() => setTaskDaEliminare(null)}
                />
              </div>
            </div>
          )}

          {/* Lista dei task filtrati */}
          {Object.entries(gruppi).map(
            ([nomeGruppo, taskDelGruppo]) =>
              taskDelGruppo.length > 0 && (
                <section key={nomeGruppo} className="mb-6">
                  <h2 className="text-sm font-semibold text-slate-400 uppercase mb-3">
                    {nomeGruppo}
                  </h2>
                  <div className="flex flex-col gap-4">
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
        </div>
      </div>
    </div>
  );
}

export default App;
