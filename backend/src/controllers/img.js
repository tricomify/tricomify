"use strict";

module.exports = async (req, res) => {
  const ts = () => ('['+String(new Date()).substr(0, 24)+']: ');
  console.log(ts() + JSON.stringify(req.query));

  if ('logo' === req.query.target) {
    return res.sendFile(`${process.cwd()}/src/resources/TRICOMIFY.svg.png`);
  }

  return res.sendFile(`${process.cwd()}/src/resources/404-notFound.png`);
};
