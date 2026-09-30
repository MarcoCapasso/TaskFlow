namespace TaskManager.Api.Repositories;

using TaskManager.Api.Models;

public class InMemoryTaskRepository : ITaskRepository
{
     private static readonly List<TaskItem> _tasks = new List<TaskItem>
    {
        new TaskItem(1, "Compra latte", "Intero", Stato.Done, DateTime.Now, Tag.Personal),
        new TaskItem(2, "Compra latte", "Scremato", Stato.ToDo, DateTime.Now, Tag.Work),
        new TaskItem(3, "Compra latte", "Senza lattosio", Stato.InProgress, DateTime.Now, Tag.Home),
    };

    public List<TaskItem> GetAll()
    {
        return _tasks;       
    }

    public TaskItem? GetById(int id)
    {
        return _tasks.FirstOrDefault(t => t.Id == id);
    }

    public TaskItem Create(TaskItem task)
    {
        int nuovoId = _tasks.Max(t => t.Id) + 1;
        task.Id = nuovoId;
        _tasks.Add(task);
        return task;
    }

    public bool Update(TaskItem task)
    {
        var aggiornaTask = _tasks.FirstOrDefault(t=> t.Id == task.Id);
        if (aggiornaTask == null)
            return false;
                
        aggiornaTask.Titolo = task.Titolo;
        aggiornaTask.Descrizione = task.Descrizione;
        aggiornaTask.StatoCorrente = task.StatoCorrente;
        aggiornaTask.Data = task.Data;
        aggiornaTask.TagCorrente = task.TagCorrente;
        
        return true;
    }

    public bool Delete(int id)
    {
         var eliminaTask = _tasks.FirstOrDefault(t=> t.Id == id);
         if (eliminaTask == null)
            return false;
        else
            _tasks.Remove(eliminaTask);
        return true;
        
    }

   

}