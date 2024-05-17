﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;
using Microsoft.EntityFrameworkCore;
using UUIDNext;
using static Project.Utils;

namespace Project;

//mandatory changes
class Program
{
  static void Main()
  {

    /*───────────────────────────╮
    │ Creating the server object │
    ╰───────────────────────────*/
    var server = new HttpListener();
    server.Prefixes.Add("http://*:5000/");
    server.Start();

    Console.WriteLine("Server started. Listening for requests...");
    Console.WriteLine("Main page on http://localhost:5000/website/index.html");

    /*─────────────────────────╮
    │ Processing HTTP requests │
    ╰─────────────────────────*/
    while (true)
    {
      /*─────────────────────────────────────╮
      │ Creating the database context object │
      ╰─────────────────────────────────────*/
      var databaseContext = new DatabaseContext();

      /*────────────────────────────╮
      │ Waiting for an HTTP request │
      ╰────────────────────────────*/
      var serverContext = server.GetContext();
      var response = serverContext.Response;

      try
      {
        /*────────────────────────╮
        │ Handeling file requests │
        ╰────────────────────────*/
        serverContext.ServeFiles();

        /*───────────────────────────╮
        │ Handeling custome requests │
        ╰───────────────────────────*/
        HandleRequests(serverContext, databaseContext);

        /*───────────────────────────────╮
        │ Saving changes to the database │
        ╰───────────────────────────────*/
        databaseContext.SaveChanges();

      }
      catch (Exception e)
      {
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine(e);
        Console.ResetColor();
      }

      /*───────────────────────────────────╮
      │ Sending the response to the client │
      ╰───────────────────────────────────*/
      response.Close();
    }
  }

  static void HandleRequests(HttpListenerContext serverContext, DatabaseContext databaseContext)
  {
    var request = serverContext.Request;
    var response = serverContext.Response;

    string absPath = request.Url!.AbsolutePath;

    if (absPath == "/signUp")
    {
      (string username, string password) = request.GetBody<(string, string)>();

      Console.WriteLine("--- Username: " + username + "\n--- Password: " + password);

      var userId = Uuid.NewDatabaseFriendly(UUIDNext.Database.SQLite).ToString();

      User user = new User(userId, username, password);
      databaseContext.Users.Add(user);

      response.Write(userId);


    }
    else if (absPath == "/addcartodb")
    {
      (string carname, string idcar) = request.GetBody<(string, string)>();
      Console.WriteLine(carname);
      User user = databaseContext.Users.Find(idcar)!;
      user.Carsar = user.Carsar.Append(carname).ToArray();
      databaseContext.SaveChanges();
      response.Write(user.Carsar);


    }
    else if (absPath == "/login")
    {
      (string username, string password) = request.GetBody<(string, string)>();

      User user = databaseContext.Users.First(
        u => u.Username == username && u.Password == password
      )!;

      response.Write(user.Id);
    }
  }

}

public class DatabaseContext : DbContextWrapper
{
  public DbSet<User> Users { get; set; }
  // public DbSet<Favorite> favorites { get; set; }

  public DatabaseContext() : base("Database") { }
}


public class User(string id, string username, string password)
{
  [Key]
  public string[] Carsar{ get; set; } = [];
  public string Id { get; set; } = id;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

