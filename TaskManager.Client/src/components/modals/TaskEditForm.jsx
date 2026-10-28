import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";
import { IconTrash } from "../Icons";
import { statoLabels, tagLabels, classiBottone } from "../../costanti";
import { Campo, Selezione, IntestazioneModale } from "./CampiForm";
import { API_URL } from "../../api";

function TaskEditForm({ task, onTaskModificato, onAnnulla, onElimina, token }) {
  const [titolo, setTitolo] = useState(task.titolo);
  const [descrizione, setDescrizione] = useState(task.descrizione);
  const [statoCorrente, setStatoCorrente] = useState(task.statoCorrente);
  const [data, setData] = useState(new Date(task.data));
  const [tagCorrente, setTagCorrente] = useState(task.tagCorrente);
  const [errori, setErrori] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setErrori({});

    const taskAggiornato = {
      titolo: titolo,
      descrizione: descrizione,
      stato: statoCorrente,
      data: formatDataPerBackend(data),
      tag: tagCorrente,
    };

    fetch(`${API_URL}/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskAggiornato),
    })
      .then(async (response) => {
        if (!response.ok) {
          const datiErrore = await response.json();
          throw datiErrore;
        }
        onTaskModificato();
      })
      .catch((datiErrore) => {
        setErrori(datiErrore.errors || {});
      });
  }

  function formatDataPerBackend(dataObj) {
    const anno = dataObj.getFullYear();
    const mese = String(dataObj.getMonth() + 1).padStart(2, "0");
    const giorno = String(dataObj.getDate()).padStart(2, "0");
    return `${anno}-${mese}-${giorno}`;
  }

  useKeyboardShortcuts({
    Escape: onAnnulla,
  });

  return (
    <div className="flex flex-col">
      {/* Header */}
      <IntestazioneModale
        titolo="Modifica Task"
        sottotitolo="Aggiorna i dettagli della task"
        onChiudi={onAnnulla}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Campo label="Titolo" errore={errori.Titolo}>
          <input
            type="text"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            placeholder="Titolo della task"
            className={`tf-input ${errori.Titolo ? "border-danger!" : ""}`}
          />
        </Campo>

        <Campo label="Descrizione">
          <input
            type="text"
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
            placeholder="Descrizione della task"
            className="tf-input"
          />
        </Campo>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Campo label="Stato">
            <Selezione
              value={statoCorrente}
              onChange={setStatoCorrente}
              opzioni={statoLabels}
            />
          </Campo>

          <Campo label="Tag">
            <Selezione
              value={tagCorrente}
              onChange={setTagCorrente}
              opzioni={tagLabels}
            />
          </Campo>

          <div className="col-span-2 sm:col-span-1">
            <Campo label="Data">
              <DatePicker
                selected={data}
                onChange={(nuovaData) => setData(nuovaData)}
                dateFormat="dd/MM/yyyy"
                className="tf-input"
              />
            </Campo>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-line pt-4 mt-2">
          <button
            type="button"
            onClick={onElimina}
            aria-label="Elimina task"
            className={classiBottone.pericolo}
          >
            <IconTrash className="w-4 h-4" />
            <span className="hidden sm:inline">Elimina</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onAnnulla}
              className={classiBottone.secondario}
            >
              Annulla
            </button>
            <button type="submit" className={classiBottone.primario}>
              Salva Modifiche
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskEditForm;
