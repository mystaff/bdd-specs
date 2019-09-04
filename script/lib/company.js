const colors = require('colors');
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const cache = require('persistent-cache');
const cacher = cache();
const companyHelper = require('../lib/company');
const os = require('os');


class Company {

  static async clearScr() {
    clear();
    console.log(
        chalk.yellow(
            figlet.textSync('TD2', { horizontalLayout: 'full' }),
        ),
    );
  }

  static async init() {
      Company.clearScr();
      const company = cacher.getSync('company') || {};
      const url = 'http://api.staff.com:80/api/1.0/register/signup';
      try {
        console.log(chalk.yellow('----------init-----------'));
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
        }else{
          console.log(chalk.red('company is already created, try "td delete", to remove the current created company.'));
        }
        console.log('company');
        console.log(JSON.stringify(company, null, 2));
      } catch (error) {
        console.log(chalk.red('error in post'));
        console.log(chalk.red(JSON.stringify(error, null, 2)));
        console.log('----------------------------');
      }
  }

  static async installTDSilentApp() {
    Company.clearScr();
    const company = cacher.getSync('company') || {};
    if (Object.keys(company).length === 0) {
      console.log(chalk.red('No local company cached'));
      return;
    }
    console.log(chalk.yellow('----------install TD2 Silent App------------------ ..please be wait .. that might take a while..'));
    //console.log(os.type());//'Linux' on Linux, 'Darwin' on macOS, and 'Windows_NT' on Windows.
    switch(os.type()){
      case 'Linux':
        break;
      case 'Windows_NT':
        break;
      case 'Darwin':
        const { spawn } = require('child_process');
        let ls = spawn('/bin/sh', [ '-c', `curl -s 'https://9hnz5b9yag.execute-api.us-east-1.amazonaws.com/production/bash-install-generator?hostname=2.timedoctor.com&companyId=${company.res.data.companyId}' | sudo /bin/bash` ])
        ls.stdout.on('data', (data) => {
          Company.clearScr();
          console.log(chalk.yellow('----------install TD2 Silent App------------------ ..please wait .. that might take a while..'));
          console.log(`${data}`);
        });
        ls.stderr.on('data', (data) => {
          Company.clearScr();
          console.log(chalk.yellow('----------install TD2 Silent App------------------ .. please wait .. that might take a while..'));
          console.log(`${data}`);
        });
        ls.on('close', (code) => {
          console.log(chalk.green(`TD2 installing finished.`));
        });
        break;
      default:
        break;
    }
    return;
    // todo check OS
    // if mac --->
    // MAC
    // curl -s 'https://9hnz5b9yag.execute-api.us-east-1.amazonaws.com/production/bash-install-generator?hostname=2.timedoctor.com&companyId=XU2nb5vGxQAabhC9' | sudo /bin/bash
    // For Mac, run this command in the terminal: sudo /opt/sfproc/updateschecker2.app/Contents/Resources/uninstall.sh
    // UBUNTU
    // wget -q -O - 'https://9x0u6wwr6c.execute-api.us-east-1.amazonaws.com/production/bash-install-generator?hostname=2.timedoctor.com&companyId=XU2nb5vGxQAabhC9' | sudo /bin/bash
    // WIN
    // https://kwc5w69wa3.execute-api.us-east-1.amazonaws.com/production/msi-filename-redirect?companyId=XU2nb5vGxQAabhC9&hostname=2.timedoctor.com
  };

  static async statusApp() {
    Company.clearScr();
    if (fs.existsSync(`/opt/sfproc/updateschecker2.app/Contents/Resources/uninstall.sh`)) {
      console.log(chalk.white('TD2 App is alerady installed'));
    } else {
      console.log(chalk.white('TD2 App is not installed'));
    }
  }

  static async uninstallApp() {
    Company.clearScr();
    const company = cacher.getSync('company') || {};
    if (Object.keys(company).length === 0) {
      console.log(chalk.red('No local company cached'));
      return;
    }
    console.log(chalk.yellow('----------uninstall TD2 Silent App------------------ .. please wait .. that might take a while..'));
    switch(os.type()){
      case 'Linux':
        break;
      case 'Windows_NT':
        break;
      case 'Darwin':
        const { spawn } = require('child_process');
        var ls = spawn("sudo", ["/opt/sfproc/updateschecker2.app/Contents/Resources/uninstall.sh"])
        ls.stdout.on('data', (data) => {
          Company.clearScr();
          console.log(chalk.yellow('----------uninstall TD2 Silent App------------------ .. please wait .. that might take a while..'));
          console.log(`${data}`);
        });
        ls.stderr.on('data', (data) => {
          console.log(chalk.red(`${data}`));
        });
        ls.on('close', (code) => {
          console.log(chalk.green(`TD2 uninstalling finished.`));
        });
        break;
      default:
        break;
    }
    return;
  }

  static async testTDSilentApp () {
    Company.clearScr();
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
    setTimeout(() => {}, 5 * 60 * 1000);
  };

  static async deleteCachedCompany() {
    Company.clearScr();
    const company = cacher.getSync('company') || {};
    if (Object.keys(company).length === 0) {
      console.log(chalk.white('No local company cached'));
    } else {
      console.log(chalk.white('deleting local cache'));
      cacher.putSync('company', {});
      console.log(chalk.white('DONE'));
    }
  }


  static async statusCachedCompany() {
    Company.clearScr();
    const company = cacher.getSync('company') || {};
    if (Object.keys(company).length === 0) {
      console.log(chalk.white('No local company cache'));
    } else {
      console.log(chalk.white('Local company is created and cached'));
    }
  }
}

module.exports = Company;
