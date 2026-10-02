import { useState } from "react";

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

    fetch(`http://localhost:5285/api/auth/${endpoint}`, {
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-white text-center">TaskFlow</h1>

        {errore && <p className="text-red-400 text-sm text-center">{errore}</p>}
        <div className="flex bg-slate-900 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setModalita("login")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
              modalita === "login"
                ? "bg-slate-700 text-white"
                : "text-slate-400"
            }`}
          >
            Accedi
          </button>
          <button
            type="button"
            onClick={() => setModalita("registrazione")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
              modalita === "registrazione"
                ? "bg-slate-700 text-white"
                : "text-slate-400"
            }`}
          >
            Crea Account
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`bg-slate-900 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errori.Email ? "border-red-500" : "border-slate-700"
            }`}
          />
          {errori.Email && (
            <p className="text-xs text-red-400">{errori.Email[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`bg-slate-900 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errori.Password ? "border-red-500" : "border-slate-700"
            }`}
          />
          {errori.Password && (
            <p className="text-xs text-red-400">{errori.Password[0]}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2"
        >
          {modalita === "login" ? "Accedi" : "Crea Account"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
