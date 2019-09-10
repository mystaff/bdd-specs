const colors = require('colors');
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const cache = require('persistent-cache');
const cacher = cache();
const os = require('os');
const mainUrl = require('url');
const http = require('http');
const {spawn} = require('child_process');
const path = require('path');
const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./out.log', 'a');

class App {

    static async downloadWindowsApp(file_name) {
        var file = fs.createWriteStream(`${__dirname}\\${file_name}`);
        console.log("AFTER createWriteStream");
        console.log((`${__dirname}\\${file_name}`));
        console.log(fs.existsSync(`${__dirname}\\${file_name}`));
        console.log('START spawn');
        const company = cacher.getSync('company') || {};
        const file_url = 'https://kwc5w69wa3.execute-api.us-east-1.amazonaws.com/production/msi-filename-redirect?hostname=2.timedoctor.com&companyId=' + company.res.data.companyId;
        let curl = spawn('curl', ['-L', file_url])
        curl.stdout.on('data', function (data) {
            console.log(chalk.yellow('----------downloading TD2 Silent App------------------ ..please wait .. that might take a while..'));
            file.write(data);
        });
        console.log('START spawn 1 if');
        curl.stdout.on('end', function (data) {
            file.end();
            console.log(`${__dirname}\\${file_name}` + ' downloaded  ' );
            App.installWindowsApp(file_name);
        });
        console.log('START spawn 2 if');
        curl.on('exit', function (code) {
            if (code != 0) {
                console.log('Failed: ' + code);
            }
        });
        console.log('START spawn 3 if');
    }

    static async installWindowsApp(file_name) {
        const command = `/S /C ${__dirname}\\${file_name}`;
        console.log('command');
        console.log(command);
        var child = spawn('cmd', [command], {
            detached: true,
            cwd: os.homedir(),
            env: process.env
        });
        child.stdout.on('data', function(data) {
            console.log("stdout: " + data);
        });
        child.stderr.on('data', function(data) {
            console.log("stderr: " + data);
        });
        child.on('close', function(code) {
            console.log("Child process exited with code " + code);
        });
        child.unref();
    }


    static async uninstallWindowsApp(file_name) {
        const command = [`/quiet`, `/qn`, `/norestart`, `/uninstall` , `${__dirname}\\${file_name}`];
        console.log('command');
        console.log(command);
        var child = spawn('msiexec', command, {
            detached: true,
            cwd: os.homedir(),
            env: process.env
        });
        child.stdout.on('data', function(data) {
            console.log(`Start delete ${file_name} `);
            cacher.putSync('file_name', null);
            fs.unlinkSync(`${__dirname}\\${file_name}`);
            console.log("stdout: " + data);
        });
        child.stderr.on('data', function(data) {
            console.log(`Start delete ${file_name} `);
            cacher.putSync('file_name', null);
            fs.unlinkSync(`${__dirname}\\${file_name}`);
            console.log("stderr: " + data);
        });
        child.on('close', function(code) {
            console.log(`Start delete ${file_name} `);
            cacher.putSync('file_name', null);
            fs.unlinkSync(`${__dirname}\\${file_name}`);
            console.log("Child process exited with code " + code);
        });
        child.unref();
    }

    static async clearScr() {
        clear();
        console.log(
            chalk.yellow(
                figlet.textSync('TD2', {horizontalLayout: 'full'}),
            ),
        );
    }

    static async installTDSilentApp() {
        App.clearScr();
        const company = cacher.getSync('company') || {};
        if (Object.keys(company).length === 0) {
            console.log(chalk.red('No local company cached'));
            return;
        }
        console.log(chalk.yellow('----------install TD2 Silent App------------------ ..please be wait .. that might take a while..'));
        switch (os.type()) {
            case 'Linux':
                console.log(chalk.white('TD2 App on Linux is not implemented yet.'));
                break;
            case 'Windows_NT':
                let file_name = cacher.getSync('file_name') || null;
                if (!file_name) {
                    console.log('file_name not cached');
                    const file_url = 'https://kwc5w69wa3.execute-api.us-east-1.amazonaws.com/production/msi-filename-redirect?hostname=2.timedoctor.com&companyId=' + company.res.data.companyId;
                    let resw = await axios.get(file_url);
                    const locURL = resw.request.res.responseUrl;
                    const queryString = require('query-string');
                    const url_parts = mainUrl.parse(locURL, true);
                    const parsed    = queryString.parse(url_parts.search);
                    const ar = parsed["response-content-disposition"].split('"');
                    file_name = ar[1];
                    cacher.putSync('file_name', file_name);
                }else{
                    console.log('file_name already cached');
                }
                if (!fs.existsSync(`${__dirname}\\${file_name}`)) {
                    App.downloadWindowsApp(file_name);
                }else{
                    console.log('already ' + `${__dirname}\\${file_name}` + ' downloaded  ' );
                    App.installWindowsApp(file_name);
                }
                console.log('DONE');
                // const url = 'https://kwc5w69wa3.execute-api.us-east-1.amazonaws.com/production/msi-filename-redirect?hostname=2.timedoctor.com&companyId=XW_DuwsxDAAh9jTs';
                // 'msiexec  /quiet /qn /norestart /i  sfproc-2.1.0.40-5d6fc8c5621f9e0019f25e23.msi';
                // 'msiexec.exe /i sfproc-2.1.0.40-5d6fc8c5621f9e0019f25e23.msi /QN /L*V "msilog.log"';
                break;
            case 'Darwin':
                const {spawn} = require('child_process');
                let ls = spawn('/bin/sh', ['-c', `curl -s 'https://9hnz5b9yag.execute-api.us-east-1.amazonaws.com/production/bash-install-generator?hostname=2.timedoctor.com&companyId=${company.res.data.companyId}' | sudo /bin/bash`])
                ls.stdout.on('data', (data) => {
                    App.clearScr();
                    console.log(chalk.yellow('----------install TD2 Silent App------------------ ..please wait .. that might take a while..'));
                    console.log(`${data}`);
                });
                ls.stderr.on('data', (data) => {
                    App.clearScr();
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
        App.clearScr();
        switch (os.type()) {
            case 'Linux':
                console.log(chalk.white('TD2 App on Linux is not implemented yet.'));
                break;
            case 'Windows_NT':
                let file_name = cacher.getSync('file_name') || null;
                if (!file_name) {
                    console.log('file_name not cached');
                }else{
                    console.log('file_name already cached');
                }
                if (!fs.existsSync(`${__dirname}\\${file_name}`)) {
                    console.log('file_name not downloaded');
                    return;
                }else{
                    console.log('already ' + `${__dirname}\\${file_name}` + ' downloaded and installed');
                }
                break;
            case 'Darwin':
                if (fs.existsSync(`/opt/sfproc/updateschecker2.app/Contents/Resources/uninstall.sh`)) {
                    console.log(chalk.white('TD2 App is alerady installed'));
                } else {
                    console.log(chalk.white('TD2 App is not installed'));
                }
                break;
            default:
                break;
        }
    }


    static async doRequest(url) {
        var request = require('request');
        return new Promise(function (resolve, reject) {
            request(url, function (error, res, body) {
                return res;
            });
        });
    }


    static async uninstallApp() {
        App.clearScr();
        const company = cacher.getSync('company') || {};
        if (Object.keys(company).length === 0) {
            console.log(chalk.red('No local company cached'));
            return;
        }
        console.log(chalk.yellow('----------uninstall TD2 Silent App------------------ .. please wait .. that might take a while..'));
        switch (os.type()) {
            case 'Linux':
                console.log(chalk.white('TD2 App on Linux is not implemented yet.'));
                break;
            case 'Windows_NT':
                let file_name = cacher.getSync('file_name') || null;
                if (!file_name) {
                    console.log('file_name not cached');
                    return;
                }else{
                    console.log('file_name already cached');
                }
                if (!fs.existsSync(`${__dirname}\\${file_name}`)) {
                    console.log('file_name not downloaded');
                    return;
                }else{
                    console.log('already ' + `${__dirname}\\${file_name}` + ' downloaded, lets uninstallWindowsApp ' );
                    App.uninstallWindowsApp(file_name);
                }
                break;
            case 'Darwin':
                const {spawn} = require('child_process');
                var ls = spawn("sudo", ["/opt/sfproc/updateschecker2.app/Contents/Resources/uninstall.sh"])
                ls.stdout.on('data', (data) => {
                    App.clearScr();
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

    static async testTDSilentApp() {
        App.clearScr();
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
            const {width} = screenSize;

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
        }, 5 * 60 * 1000);
    };
}

module.exports = App;


