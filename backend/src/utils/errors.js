exports.ErrorRouteNotFound = req => {
  return {
    code: "001",
    message: "Route not found.",
    url: req.originalUrl,
    method: req.method
  };
};

exports.ErrorInternalServer = req => {
  return {
    code: "002",
    message: "Internal server error.",
    url: req.originalUrl,
    method: req.method
  };
};

exports.ErrorBookNotFound = req => {
  return {
    code: "101",
    message: "Book not found.",
    url: req.originalUrl,
    method: req.method
  };
};

exports.ErrorUnknownBookType = req => {
  return {
    code: "201",
    message: "Unknown book type.",
    url: req.originalUrl,
    method: req.method
  };
};

exports.ErrorWrongBookType = req => {
  return {
    code: "202",
    message: "Wrong book type.",
    url: req.originalUrl,
    method: req.method
  };
};

exports.ErrorWrongNumberOfItems = req => {
  return {
    code: "203",
    message: "Wrong number of items.",
    url: req.originalUrl,
    method: req.method
  };
};

exports.ErrorNameMissing = req => {
  return {
    code: "204",
    message: "Name missing.",
    url: req.originalUrl,
    method: req.method
  };
};

exports.ErrorInternalServerUpdatingStatuts = req => {
  return {
    code: "301",
    message: "Internal server error: Updating status.",
    url: req.originalUrl,
    method: req.method
  };
};

exports.ErrorInternalServerGeneratingPdf = req => {
  return {
    code: "302",
    message: "Internal server error: Generating pdf.",
    url: req.originalUrl,
    method: req.method
  };
};

exports.ErrorInternalServerTransferingFiles = req => {
  return {
    code: "303",
    message: "Internal server error: Transfering files.",
    url: req.originalUrl,
    method: req.method
  };
};
