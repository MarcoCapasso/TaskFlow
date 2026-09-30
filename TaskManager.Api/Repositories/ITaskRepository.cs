namespace TaskManager.Api.Repositories;

using TaskManager.Api.Models;

public interface ITaskRepository
{
    List<TaskItem> GetAll();
    TaskItem? GetById(int id);
    TaskItem Create(TaskItem task);
    bool Update(TaskItem task);
    bool Delete(int id);
}