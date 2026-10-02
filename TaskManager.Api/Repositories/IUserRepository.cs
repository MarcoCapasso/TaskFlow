namespace TaskManager.Api.Repositories;

using TaskManager.Api.Models;

public interface IUserRepository
{
    User? GetByEmail(string email);
    User Create(User user);
}