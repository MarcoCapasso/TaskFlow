namespace TaskManager.Api.Controllers;

using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

using TaskManager.Api.Models;
using TaskManager.Api.Repositories;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;

    public AuthController(IConfiguration configuration, IUserRepository userRepository)
    {
        _configuration = configuration;
        _userRepository = userRepository;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterDto dto)
    {   
        var utenteEsistente = _userRepository.GetByEmail(dto.Email);
        if (utenteEsistente != null)
        {
            return BadRequest("Email già registrata.");
        }
        string passwordInChiaro = dto.Password;
        string hash = BCrypt.Net.BCrypt.HashPassword(passwordInChiaro);
        int idTemp = 0;
        var nuovoUtente = new User(idTemp, dto.Email, hash);
        _userRepository.Create(nuovoUtente);
        string tokenString = GeneraToken(nuovoUtente);
        return Ok(new { token = tokenString });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        var verificaUtente = _userRepository.GetByEmail(dto.Email);
        if (verificaUtente == null)
        {
            return Unauthorized();
        }

        bool passwordCorretta = BCrypt.Net.BCrypt.Verify(dto.Password, verificaUtente.PasswordHash);
        if (!passwordCorretta)
        {
            return Unauthorized();
        }

        string tokenString = GeneraToken(verificaUtente);
        return Ok(new { token = tokenString });
    }

    private string GeneraToken(User utente)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, utente.Id.ToString()),
            new Claim(ClaimTypes.Email, utente.Email)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}