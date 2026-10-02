import { CheckCircle, XCircle } from "lucide-react";

function Toast({ messaggio, tipo }) {
  return (
    <div className="fixed bottom-6 right-6 z-60 flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl shadow-lg">
      {tipo === "successo" ? (
        <CheckCircle className="w-5 h-5 text-green-400" />
      ) : (
        <XCircle className="w-5 h-5 text-red-400" />
      )}
      <p className="text-sm text-white">{messaggio}</p>
    </div>
  );
}

export default Toast;
