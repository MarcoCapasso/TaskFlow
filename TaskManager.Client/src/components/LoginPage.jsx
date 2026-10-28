import { useState } from "react";
import { IconLogo, IconErrore } from "./Icons";
import { Campo } from "./modals/CampiForm";
import { API_URL } from "../api";

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");
  const [modalita, setModalita] = useState("login");
  const [errori, setErrori] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setErrore("");
    setErrori({});

    const endpoint = modalita === "login" ? "login" : "register";

    fetch(`${API_URL}/api/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const datiErrore = await response.json();
          throw datiErrore;
        }
        return response.json();
      })
      .then((data) => {
        onLoginSuccess(data.token);
      })
      .catch((datiErrore) => {
        if (modalita === "registrazione" && datiErrore.errors) {
          setErrori(datiErrore.errors);
        } else {
          setErrore(
            modalita === "login"
              ? "Email o password errati"
              : "Registrazione fallita",
          );
        }
      });
  }

  return (
    <div className="relative min-h-dvh bg-canvas flex items-center justify-center px-4 sm:px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-hidden">
      {/* Alone d'accento dietro la card */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-accent/10 blur-3xl" />

      <div className="relative w-full max-w-sm flex flex-col items-center gap-6 animate-pop-in">
        <div className="flex flex-col items-center gap-3">
          <IconLogo className="w-12 h-12 text-accent" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-fg">TaskFlow</h1>
            <p className="text-sm text-muted">
              {modalita === "login"
                ? "Bentornato, accedi per continuare"
                : "Crea un account per iniziare"}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-surface border border-line rounded-2xl shadow-card p-6 flex flex-col gap-4"
        >
          <div className="flex bg-surface-2 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setModalita("login")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                modalita === "login"
                  ? "bg-raised text-fg shadow-card"
                  : "text-muted hover:text-fg"
              }`}
            >
              Accedi
            </button>
            <button
              type="button"
              onClick={() => setModalita("registrazione")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                modalita === "registrazione"
                  ? "bg-raised text-fg shadow-card"
                  : "text-muted hover:text-fg"
              }`}
            >
              Crea Account
            </button>
          </div>

          {errore && (
            <p className="flex items-center gap-2 text-sm text-danger bg-danger-soft rounded-lg px-3 py-2">
              <IconErrore className="w-4 h-4 shrink-0" />
              {errore}
            </p>
          )}

          <Campo label="Email" errore={errori.Email}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@esempio.it"
              className={`tf-input ${errori.Email ? "border-danger!" : ""}`}
            />
          </Campo>

          <Campo label="Password" errore={errori.Password}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`tf-input ${errori.Password ? "border-danger!" : ""}`}
            />
          </Campo>

          <button
            type="submit"
            className="mt-1 bg-accent hover:bg-accent-hover text-on-accent font-semibold rounded-xl px-4 py-2.5 transition-colors active:scale-[0.98]"
          >
            {modalita === "login" ? "Accedi" : "Crea Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
