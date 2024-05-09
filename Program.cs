using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;
using Microsoft.EntityFrameworkCore;
using static Project.Utils;

namespace Project;

//mandatory changes
class Program
{static void Main()
    {
        Dictionary<string, int> votes = new Dictionary<string, int>();
        votes.Add("ferrari", 0);
        votes.Add("porsche", 0);
        votes.Add("lamborghini", 0);
        votes.Add("mclaren", 0);
        votes.Add("bugatti", 0);
        votes.Add("other",0);
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
  
  if (absPath == "/vote") {
                string company = GetBody(request);

                votes[company]++;
            }
            else if (absPath == "/getVotes") {
                string votesJson = JsonSerializer.Serialize(votes);
                byte[] votesBytes = Encoding.UTF8.GetBytes(votesJson);
                response.OutputStream.Write(votesBytes);
            }
  

  }
}

class DatabaseContext : DbContextWrapper
{
  public DatabaseContext() : base("Database") { }
}
