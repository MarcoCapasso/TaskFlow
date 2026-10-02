namespace TaskManager.Api.Repositories;

using TaskManager.Api.Models;
using TaskManager.Api.Data;

public class SqlUserRepository : IUserRepository
{
    private readonly TaskManagerDbContext _context; 
    public SqlUserRepository(TaskManagerDbContext context)
    {
        _context = context;
    }

    public User? GetByEmail(string email)
    {
        return _context.Users.FirstOrDefault(u => u.Email == email);
    }


    //Prende la task creata in precedenza e la salva nel database
    public User Create(User user)
    {
        _context.Users.Add(user); 
        _context.SaveChanges();
        return user;
    }

}