const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Spatan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About the Creator",
    name: "Spartan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Spartan",
    helpText:
      "Hello my name is spartan how can i help you to know your weather forecast",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Please enter your location to continue",
    });
  }
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    weather(longitude, latitude, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast,
        location,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404 Not Found",
    name: "Spatan",
    errorMessage: "The article you are looking for is not found",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "Spatan",
    errorMessage: "Something went wrong.",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
