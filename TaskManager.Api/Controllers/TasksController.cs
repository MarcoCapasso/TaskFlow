using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Models;
using TaskManager.Api.Repositories;

namespace TaskManager.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
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
        return Ok(_repository.GetAll());       
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var task = _repository.GetById(id);
        if (task == null)
            return NotFound();
        return Ok(task);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateTaskDto dto)
    {
        int idTemp = 0;
        var nuovoTask = new TaskItem(idTemp, dto.Titolo, dto.Descrizione, dto.Stato, dto.Data, dto.Tag);
        var taskCreato = _repository.Create(nuovoTask);
        return CreatedAtAction(nameof(GetById), new { id = taskCreato.Id }, taskCreato);
    }


    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] UpdateTaskDto dto)
    {
        var taskTestAggiornamento = new TaskItem(id, dto.Titolo, dto.Descrizione, dto.Stato, dto.Data, dto.Tag);
        bool updTask = _repository.Update(taskTestAggiornamento); 
        if (!updTask)
            return NotFound();
        
        return Ok(taskTestAggiornamento);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        bool taskEliminaAggiornamento = _repository.Delete(id);
        if (!taskEliminaAggiornamento)
            return NotFound();

        return NoContent(); 
    }
}