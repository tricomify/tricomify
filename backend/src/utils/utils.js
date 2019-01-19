exports.copyJson = json => {
  return JSON.parse(JSON.stringify(json));
};

exports.getFormatedDate = (date, separator = "") => {
  let formatedDate = "";

  formatedDate += date.getFullYear();
  formatedDate += separator;
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = parseInt(date.getDate());
  if (day < 10) {
    day = `0${day}`;
  }
  formatedDate += month;
  formatedDate += separator;
  formatedDate += day;

  return formatedDate;
};

const cProc = require('child_process');

const shellcommands = [
  'gs',       // for PDF conversion [RGB -> CMYK]
  'nkf',      // reserved
  'rsync',    // reserved
  'convert',  // reserved
  'tar',      // reserved
];

const check_installed_all = () => {
  shellcommands.forEach( (cmd) => {
    check_installed (cmd);
  });
}

const check_installed = (shell_command) => {
  const cmd = shell_command;
  try {
    const stdout = cProc.execSync('which '+cmd);
    "console.log(`Installed ${cmd} @ ${stdout}`);"
  } catch (err) {
    console.error(" \n\n\n\n");
    console.error(err.name + ': ' + err.message);
    console.error(`${cmd} is not installed.`);
    console.error(" \n\n\n\n");
  }
}

exports.utilsExecShell = (cmd) => {
  check_installed_all();
  // console.log((new Date()).toString());
  // console.log(cmd+"\n");
  const stdout_bin = cProc.execSync(cmd);
  const stdout = stdout_bin.toString();
  // console.log(stdout);
  return stdout;
};

exports.utilsExecShellAsync = (cmd) => {
  check_installed_nkf();
  console.log(cmd+"\n");
  cProc.exec(cmd, (error, stdout, stderr) => {
    if(error) {
      console.log(stderr);
      return error;
    }
    else {
      console.log(stdout);
      return true;
    }
  });
};

const { memoryUsage } = require('process');

const utilsCheckMemoryUsage = () => {
  const mu = memoryUsage();
  const rss = mu.rss; // the amount of space occupied in the main memory device
  const heapTotal = mu.heapTotal; // refer to V8's memory usage
  const heapUsed = mu.heapTotal; // refer to V8's memory usage
  const external = mu.external; // refers to the memory usage of C++ objects bound to JavaScript objects managed by V8
  let ratio_used = (heapTotal + heapUsed) / rss;
  if (false) ratio_used = (heapTotal + heapUsed + external) / rss;
  return ratio_used;
};

exports.utilsWaitMemoryRelaxation = async (ratio, msec, msg = '') => {
  const sleep = _msec => new Promise(resolve => setTimeout(resolve, _msec));
  while ( ratio < utilsCheckMemoryUsage() ) {
    console.log('[%s]: Waiting ... node is using %f \% of heap. %s', String(new Date()), utilsCheckMemoryUsage() * 100.0, msg); 
    await sleep(msec);
  }
};


exports.utilsWaitCpuRelaxation = async (ratio, msec, msg = '') => {
  const sleep = _msec => new Promise(resolve => setTimeout(resolve, _msec));
  const loadAvg = () => ((require('os').loadavg())[0]);

  while ( ratio < loadAvg() ) {
    console.log('[%s]: CPU-busy, %f \%. %s', String(new Date()).substr(0, 24), loadAvg() * 100.0, msg); 
    await sleep(msec);
  }
  console.log('[%s]: CPU-ready, %f \%. %s', String(new Date()).substr(0, 24), loadAvg() * 100.0, msg);
  return loadAvg();
};


const _secureRandom = (nBytes) => {
  require('assert')(nBytes < 128);
  const rmax = (2 ** (8 * nBytes)) - 1;
  const randomBytes = require('crypto').randomBytes(nBytes);
  const r = randomBytes.readUIntBE(0, nBytes);
  return r / rmax;
}

exports.secureRandom = (nBytes) => (_secureRandom(nBytes));
