namespace TaskManager.Api.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManager.Api.Models;
using TaskManager.Api.Repositories;


[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly ITaskRepository _repository;
    public TasksController(ITaskRepository repository)
    {
    _repository = repository;
    }

    
    [HttpGet]
    public IActionResult GetAll()
    {
        int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var tasks = _repository.GetAll().Where(t => t.UserId == userId).ToList();
        return Ok(tasks);       
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var task = _repository.GetById(id);

        if (task == null)
            return NotFound();

        if (task.UserId != userId)
            return NotFound(); //la task potrebbe esistere ma appartiene ad un altro utente

        return Ok(task);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateTaskDto dto)
    {
        int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        int idTemp = 0;
        var nuovoTask = new TaskItem(idTemp, dto.Titolo, dto.Descrizione, dto.Stato, dto.Data, dto.Tag);
        nuovoTask.UserId = userId;
        var taskCreato = _repository.Create(nuovoTask);

        return CreatedAtAction(nameof(GetById), new { id = taskCreato.Id }, taskCreato);
    }


    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] UpdateTaskDto dto)
    {
        int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var task = _repository.GetById(id);
        if (task == null)
        {
            return NotFound();
        }

        if (task.UserId != userId)
        {
            return NotFound();
        }

        var taskTestAggiornamento = new TaskItem(id, dto.Titolo, dto.Descrizione, dto.Stato, dto.Data, dto.Tag);
        taskTestAggiornamento.UserId = userId;
        bool updTask = _repository.Update(taskTestAggiornamento); 
        if (!updTask)
            return NotFound();
        
        return Ok(taskTestAggiornamento);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var task = _repository.GetById(id);
        if (task == null)
        {
            return NotFound();
        }

        if (task.UserId != userId)
        {
            return NotFound();
        }
        bool taskEliminaAggiornamento = _repository.Delete(id);
        if (!taskEliminaAggiornamento)
            return NotFound();

        return NoContent(); 
    }
}