import { useEffect } from "react";

function useKeyboardShortcuts(scorciatoie) {
  useEffect(() => {
    function handleKeyDown(e) {
      const azione = scorciatoie[e.key];
      if (azione) {
        e.preventDefault();
        azione();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [scorciatoie]);
}

export default useKeyboardShortcuts;
