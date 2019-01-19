"use strict";

module.exports = app => {
  const status = require("./controllers/status");
  const img = require("./controllers/img");

  app
    .route("/status")
    .get(status)
    .post(status);

  app
    .route("/img")
    .get(img)
    .post(img);

};
