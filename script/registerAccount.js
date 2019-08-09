const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const cache = require('persistent-cache');

const cacher = cache();


const readFile = (path, opts = 'utf8') => new Promise((resolve, reject) => {
  fs.readFile(path, opts, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

const signup = async () => {
  const company = cacher.getSync('company') || {};
  const url = 'http://api.staff.com:80/api/1.0/register/signup';
  try {
    console.log(chalk.yellow('----------signup------------------'));
    if (Object.keys(company).length === 0) {
      const name = `autotest${new Date().getTime()}`;
      company.params = {
        name,
        email: `${name}@staff.dev`,
        password: name,
        company: name,
        trackingMode: 'silent',
        referrer: 'autotest',
        splitTest: [
          {
            name: '',
            value: '',
          },
        ],
      };
      console.log('params:');
      console.log(JSON.stringify(company.params, null, 2));
      const res = await axios.post(url, company.params);
      company.res = res.data;
      console.log('res:');
      console.log(JSON.stringify(res.data, null, 2));
      cacher.putSync('company', company);
    }
    console.log('company');
    console.log(JSON.stringify(company, null, 2));
  } catch (error) {
    console.log(chalk.red('error in post'));
    console.log(chalk.red(JSON.stringify(error, null, 2)));
    console.log('----------------------------');
  }
};


const installTDSilentApp = async () => {
  const company = cacher.getSync('company') || {};
  if (Object.keys(company).length === 0) {
    signup();
  }
  console.log(chalk.yellow('----------install TD2 Silent App------------------ ..please be wait .. that might take a while..'));
  // todo check OS
  // if mac --->
  const { exec } = require('child_process');
  const args = ` -s 'https://9hnz5b9yag.execute-api.us-east-1.amazonaws.com/production/bash-install-generator?hostname=2.timedoctor.com&companyId=${company.res.company.companyId}' | sudo /bin/bash`;
  exec(`curl ${args}`, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
  // MAC
  // curl -s 'https://9hnz5b9yag.execute-api.us-east-1.amazonaws.com/production/bash-install-generator?hostname=2.timedoctor.com&companyId=XU2nb5vGxQAabhC9' | sudo /bin/bash
  // For Mac, run this command in the terminal: sudo /opt/sfproc/updateschecker2.app/Contents/Resources/uninstall.sh


  // UBUNTU
  // wget -q -O - 'https://9x0u6wwr6c.execute-api.us-east-1.amazonaws.com/production/bash-install-generator?hostname=2.timedoctor.com&companyId=XU2nb5vGxQAabhC9' | sudo /bin/bash

  // WIN
  // https://kwc5w69wa3.execute-api.us-east-1.amazonaws.com/production/msi-filename-redirect?companyId=XU2nb5vGxQAabhC9&hostname=2.timedoctor.com
};


const testTDSilentApp = async () => {
  const n = 2000;
  let i = 1;
  const interval = setInterval(() => {
    console.log(`-----------${i}----------------`);
    i += 1;
    console.log(`Check every ${n / 1000} sec move mouse and keyTap`);
    // Move the mouse across the screen as a sine wave.
    const robot = require('robotjs');

    // Speed up the mouse.
    robot.setMouseDelay(2);

    const twoPI = Math.PI * 2.0;
    const screenSize = robot.getScreenSize();
    const height = (screenSize.height / 2) - 10;
    const { width } = screenSize;

    for (let x = 0; x < width; x++) {
      y = height * Math.sin((twoPI * x) / width) + height;
      robot.moveMouse(x, y);
    }

    // Type "Hello World".
    // robot.typeString('Hello TD2\n');

    // Press enter.
    robot.keyTap('right');
    console.log('\n');
    robot.keyTap('left');
    console.log('\n');
    robot.keyTap('f1');
    console.log('\n');
    robot.keyTap('f2');
    console.log('\n');
    robot.keyTap('f3');
    console.log('\n');
    robot.keyTap('f4');
    console.log('\n');

    console.log('-----------done----------------\n');
  }, n);
  // console.log(interval)
  setTimeout(() => {
    clearInterval(interval);
  }, n * 10);

  console.log('-----------after 5 min, will test all mouse movements, plz do not tocuh any thing ----------------\n');

  setTimeout(() => {
    //get data from TD2

  }, 5 * 60 * 1000);


};


clear();
console.log(
  chalk.yellow(
    figlet.textSync('TD2', { horizontalLayout: 'full' }),
  ),
);


// installTDSilentApp();
testTDSilentApp();
