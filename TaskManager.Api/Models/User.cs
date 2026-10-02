namespace TaskManager.Api.Models;

public class User
{
    public int Id {get; set; }
    public string Email {get; set; }
    public string PasswordHash {get; set;}

    //Costruttore per EF Core
    public User()
{
    Email = string.Empty;
    PasswordHash = string.Empty;
}

    //Costruttore con parametir
    public User(int id, string email, string passwordHash)
    {
        Id = id;
        Email = email;
        PasswordHash = passwordHash;
    }
}