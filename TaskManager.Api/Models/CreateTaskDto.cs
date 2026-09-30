using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Models;

public class CreateTaskDto
{
    [Required]
    [MinLength(5)]
    public string? Titolo { get; set; }
    public string? Descrizione { get; set; }
    public Stato Stato { get; set; }
    public DateTime Data { get; set; }
    public Tag Tag { get; set; }
}

