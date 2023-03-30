const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// creates an endpoint for the route /api/weather
app.get("/api/weather/", (req, res) => {
  const city = req.query.cityName;
  const apiKey = process.env.API_KEY;
  const params = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: "Imperial",
  });
  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      console.log(err);
    });
});

// create the get request for users in the endpoint '/api/weather_user'
app.get("/api/weather_user", async (req, res) => {
  try {
    const { rows: weather_user } = await db.query("SELECT * FROM weather_user");
    res.send(weather_user);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post("/api/weather_user", async (req, res) => {
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      favorite_city: req.body.favorite_city,
    };

    const result = await db.query(
      "INSERT INTO weather_user(username, password, favorite_city) VALUES($1, $2, $3) RETURNING *",
      [newUser.username, newUser.password, newUser.favorite_city]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for users
app.delete("/api/weather_user/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    await db.query("DELETE FROM weather_user WHERE user_id=$1", [user_id]);
    console.log("From the delete request-url", user_id);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a user
app.put("/api/weather_user/:user_id", async (req, res) => {
  //console.log(req.params);
  //This will be the id that I want to find in the DB - the student to be updated
  const user_id = req.params.user_id;
  const updatedUser = {
    user_id: req.body.user_id,
    username: req.body.username,
    password: req.body.password,
    favorite_city: req.body.favorite_city,
  };
  console.log("In the server from the url - the user id", user_id);
  console.log(
    "In the server, from the react - the user to be edited",
    updatedUser
  );
  // UPDATE students SET lastname = "something" WHERE id="16";
  const query = `UPDATE weather_user SET username=$1, password=$2, favorite_city=$3 WHERE user_id=${user_id} RETURNING *`;
  const values = [
    updatedUser.username,
    updatedUser.password,
    updatedUser.favorite_city,
  ];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
