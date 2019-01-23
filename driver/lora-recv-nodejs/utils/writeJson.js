const saveFile = (fname, data) => {
  //const { writeFileSync } = require("fs");
  //  writeFileSync( fname, data);
  const fs = require("fs");
  fs.writeFile(fname, data, "utf8", (error) => {
    if (error) {
      console.log(JSON.stringify(error));
    }
  });

};

//JSON.stringify(json)

module.exports.writeJson = (json) => {
  const payload = json.payload;

  if (1 !== payload && 2 !== payload) return false;

  const da = new Date();
  const yy = String(da.getFullYear());
  const mm = String((da.getMonth()+1)).padStart(2, '0');
  const dd = String((da.getDate())).padStart(2, '0');
  const hh = String((da.getHours())).padStart(2, '0');
  const mi = String((da.getMinutes())).padStart(2, '0');
  const ms = String((da.getMilliseconds())).padStart(3, '0');
  const fname = './log/' + yy + mm + dd + '-' + hh + mi + '-' + ms + '.json'; 

  saveFile(fname, JSON.stringify(json, undefined, 2));

  return true;
}


