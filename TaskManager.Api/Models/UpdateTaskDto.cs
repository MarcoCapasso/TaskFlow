using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Models;

public class UpdateTaskDto
{
    [Required(ErrorMessage = "Il titolo è obbligatorio.")]
    [MinLength(5, ErrorMessage = "Il titolo deve avere almeno 5 caratteri.")]
    public string? Titolo { get; set; }
    public string? Descrizione { get; set; }
    public Stato Stato { get; set; }
    public DateTime Data { get; set; }
    public Tag Tag { get; set; }
}