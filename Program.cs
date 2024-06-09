using System.ComponentModel.DataAnnotations;
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

    Car[] cars = [



      new Car(0, " Bugatti chiron","images/chiron.webp"),
      new Car(1," Bugatti veyron","images/veyron.jpg"),
      new Car(2,"Bugatti divo","images/divo.jpg"),
      new Car(3, "Bugatti bolide", "images/bolide.jpg"),
      new Car(4, "Bugatti eb110", "images/eb110.jpg"),
      new Car(5,"Bugatti La Voiture Noire","images/lavoiture.jpg"),
      new Car(6, "Lamborghini countach", "images/countach.jpg"),
      new Car(7," Lamborghini veneno","images/veneno.jpg"),
      new Car(8,"Lamborghini diablo","images/diablo.jpg"),
      new Car(9, " Lamborghini centenario", "images/centenario.jpg"),
      new Car(10, " Lamborghini huracan Sto", "images/sto.jpg"),
      new Car(11,"Lamborghini aventador Svj","images/svj.jpg"),
      new Car(12, " Ferrari LAFERRARI", "images/LAFERRARI.jpg"),
      new Car(13," Ferrari enzo","images/enzo.jpg"),
      new Car(14,"Ferrari f40","images/f40.webp"),
      new Car(15, "Ferrari 250 gto", "images/250Gto.png"),
      new Car(16, " Ferrari 488 pista", "images/488pista.jpg"),
      new Car(17,"Ferrari 812 competizione","images/812.jpg"),
      new Car(18, "McLaren f1", "images/F1.jpg"),
      new Car(19,"McLaren P1","images/P1.webp"),
      new Car(20,"McLaren 720","images/720.webp"),
      new Car(21, "McLaren senna", "images/senna.jpg"),
      new Car(22, " McLaren speedtail", "images/speedtail.webp"),
      new Car(23," McLaren mp4 12c","images/12c.avif"),
      new Car(24, " Porsche 918 Spyder", "images/918.webp"),
      new Car(25,"Porsche 911 GT3","images/911GT3RS.jpg"),
      new Car(26," Porsche 911 Carrera Rs","images/911CarreraRs.avif"),
      new Car(27," Porsche carrera Gt", "images/careraGt.jpg"),
      new Car(28, "Porsche 944 Turbo", "images/944.jpg"),
      new Car(29,"Porsche 935","images/935.jpg"),
      new Car(30,"Ido's Batmobile","images/bat.jpg"),
      new Car(31,"Top G Bugatti","images/topg.avif"),
      new Car(32,"Eitan's Bimba", "images/eitan.jpeg"),
      new Car(33,"My Dream Car - McLaren 765 ", "images/dream.jpg"),

    ];

    /*─────────────────────────────────────╮
    │ Creating the database context object │
    ╰─────────────────────────────────────*/
    var databaseContext = new DatabaseContext();

    for (int i = 0; i < cars.Length; i++)
    {
      if (databaseContext.Car.Find(cars[i].Id) == null)
      {
        Console.WriteLine(cars[i].Id);
        databaseContext.Car.Add(cars[i]);

        databaseContext.SaveChanges();
      }
    }

    /*─────────────────────────╮
    │ Processing HTTP requests │
    ╰─────────────────────────*/
    while (true)
    {

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

      (int favoriteCarId, string userId) = request.GetBody<(int, string)>();
      Console.WriteLine(favoriteCarId);
      Console.WriteLine(userId);
      User user = databaseContext.Users.Find(userId)!;
      user.FavoriteCarId = favoriteCarId;
      databaseContext.SaveChanges();
      response.Write(user.FavoriteCarId);
    }
    else if (absPath == "/login")
    {
      (string username, string password) = request.GetBody<(string, string)>();

      User user = databaseContext.Users.First(
        u => u.Username == username && u.Password == password
      )!;

      response.Write(user.Id);
    }
    else if (absPath == "/getpreviews")
    {
      var previews = databaseContext.Users.Select(CarId => new
      {
        carId = CarId,
      }
      );
      response.Write(previews);

    }
    else if (absPath == "/getFavorite")
    {
      string userId = request.GetBody<string>();

      User user = databaseContext.Users.Find(userId)!;

      Car car = databaseContext.Car.Find(user.FavoriteCarId)!;

      response.Write(car);
    }

  }


}

public class DatabaseContext : DbContextWrapper
{
  public DbSet<User> Users { get; set; }
  public DbSet<Car> Car { get; set; }
  //public DbSet<Favorite> favorites { get; set; }

  public DatabaseContext() : base("Database") { }
}


public class User(string id, string username, string password)
{
  [Key]
  public string Id { get; set; } = id;
  public int FavoriteCarId { get; set; } = -1;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

public class Car(int id, string name, string image)
{
  [Key]
  public int Id { get; set; } = id;
  public string Name { get; set; } = name;
  public string Image { get; set; } = image;
}




