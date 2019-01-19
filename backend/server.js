const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const myRoutes = require("./src/routes");

const {
  ErrorRouteNotFound,
  ErrorInternalServer
} = require("./src/utils/errors");

const app = express();
const port = process.env.PORT || 5432;

app.listen(port);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

myRoutes(app);

app.use((req, res) => {
  res.status(404).send(ErrorRouteNotFound(req));
});

app.use((req, res) => {
  res.status(500).send(ErrorInternalServer(req));
});

console.log("Backend imgsrv is running on : " + port);
