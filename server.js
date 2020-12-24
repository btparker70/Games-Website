var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connection.connect(function(err) {
//     if (err) {
//       console.error("error connecting: " + err.stack);
//       return;
//     }
  
//     console.log("connected as id " + connection.threadId);
//   });
var games = [
    {
        gameTitle: "Sudoku",
        href: "/Sudoku"
    },
    {
        gameTitle: "Simon",
        href: "/Simon"
    },
    {
        gameTitle: "Tic Tac Toe",
        href: "/TicTacToe"
    }
]
  
  // Use Handlebars to render the main index.html page with the plans in it.
  app.get("/", function(req, res) {
    res.render("index", {games: games})
  });

  app.get("/:game", function(req, res) {
      console.log(req.params);
      var data = games.find(item => item.gameTitle === req.params.game)
      console.log(data);
     res.render("games", {game: data.gameTitle})
  });

  // Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });