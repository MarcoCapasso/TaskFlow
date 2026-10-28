![TaskFlow](branding/taskflow-card.png)

# TaskFlow — Task manager full-stack con ASP.NET Core e React

TaskFlow è un'app per organizzare le attività quotidiane: crei una task, le assegni uno stato
(da fare, in corso, completata), un tag (personale, lavoro, casa) e una scadenza, e la ritrovi
raggruppata in Oggi, Questa settimana e Questo mese.

Il backend è un'API REST in ASP.NET Core con autenticazione JWT: ogni utente si registra,
accede e vede solo le proprie task. Il frontend è una single-page app in React, costruita con
Vite e Tailwind CSS.
