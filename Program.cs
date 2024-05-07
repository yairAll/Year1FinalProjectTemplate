using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;
using Microsoft.EntityFrameworkCore;
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
  }
}

class DatabaseContext : DbContextWrapper
{
  public DatabaseContext() : base("Database") { }
}
