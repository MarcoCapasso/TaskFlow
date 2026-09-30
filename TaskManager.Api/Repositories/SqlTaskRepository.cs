namespace TaskManager.Api.Repositories;

using TaskManager.Api.Models;
using TaskManager.Api.Data;

public class SqlTaskRepository : ITaskRepository
{
    private readonly TaskManagerDbContext _context;

    public SqlTaskRepository(TaskManagerDbContext context)
    {
        _context = context;
    }

    // Restituisce tutte le task presenti nella tabella Tasks del database
    public List<TaskItem> GetAll()
    {
        return _context.Tasks.ToList();
    }

    // Cerca la task con l'Id specificato; restituisce null se non esiste
    public TaskItem? GetById(int id)
    {
        return _context.Tasks.FirstOrDefault(t => t.Id == id);
    }


    //Prende la task creata in precedenza e la salva nel database
    public TaskItem Create(TaskItem task)
    {
        _context.Tasks.Add(task); 
        _context.SaveChanges();
        return task;
    }

    //Cerca la task nel database e aggiorna i campi interessati
    public bool Update(TaskItem task)
    {
        var aggiornaTask = _context.Tasks.FirstOrDefault(t => t.Id == task.Id);
           if(aggiornaTask == null) 
                return false;
            else
            {
                aggiornaTask.Titolo = task.Titolo;
                aggiornaTask.Descrizione = task.Descrizione;
                aggiornaTask.StatoCorrente = task.StatoCorrente;
                aggiornaTask.Data = task.Data;
                aggiornaTask.TagCorrente = task.TagCorrente;
                _context.SaveChanges();    
            }
            
        return true;
    }

    //Cerca la task nel database, poi elimina
    public bool Delete(int id)
    {
        var eliminaTask = _context.Tasks.FirstOrDefault(t => t.Id == id);
        if (eliminaTask == null)
        {
            return false;
        }
        
        _context.Tasks.Remove(eliminaTask);
        _context.SaveChanges();
        return true;
    }
}