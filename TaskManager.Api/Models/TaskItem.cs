namespace TaskManager.Api.Models;

public enum Stato
{
    ToDo,
    InProgress,
    Done
}   
public enum Tag
{
    Personal,
    Work,
    Home
}

public class TaskItem
{
    public int Id {get; set; }
    public string? Titolo {get; set; }
    public string? Descrizione {get; set; } 
    public Stato StatoCorrente {get;  set; } 
    public DateTime Data {get; set; }
    public Tag TagCorrente {get; set; }
    public int UserId {get; set; }
    public User? User {get; set; }

    //Costruttore vuoto per EF Core
    public TaskItem()
    {  
    }

    //Costruttore con parametri
    public TaskItem(int id, string? titolo, string? descrizione, Stato stato, DateTime data, Tag tag)
    {
        Id = id;
        Titolo = titolo;
        Descrizione = descrizione;
        StatoCorrente = stato;
        Data = data;
        TagCorrente = tag;
    }
}