const colors = require('colors');
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const cache = require('persistent-cache');
const cacher = cache();
const os = require('os');
var mainUrl = require('url');


class App {

    static async clearScr() {
        clear();
        console.log(
            chalk.yellow(
                figlet.textSync('TD2', {horizontalLayout: 'full'}),
            ),
        );
    }

    static async installTDSilentApp() {
        var http = require('http');
        var fs = require('fs');

        // var download = function(url, dest, cb) {
        //   var file = fs.createWriteStream(dest);
        //   var request = http.get(url, function(response) {
        //     response.pipe(file);
        //     file.on('finish', function() {
        //       file.close(cb);  // close() is async, call cb after close completes.
        //     });
        //   });
        // }
        //
        // // console.log(__dirname);
        // // extract the file name
        // const { exec } = require('child_process');
        const {spawn} = require('child_process');
        const file_url = 'https://kwc5w69wa3.execute-api.us-east-1.amazonaws.com/production/msi-filename-redirect?hostname=2.timedoctor.com&companyId=XW_IxWIfngAZ8l4j';
        let resw = await axios.get(file_url);
        const locURL = resw.request.res.responseUrl;
        // console.log(resw.request.res.responseUrl);
        // return;
        // axios.get(file_url).then(function(response) {
        //     var fetchedUrls = response.request.res.responseUrl;
        //     // console.log(response.request.res)
        //     console.log(fetchedUrls)
        // });
        // let res = await App.doRequest({url: file_url, followRedirect: false});
        // console.log(res);
        // return;

        const mainUrl = require('url');
        const queryString = require('query-string');
        const url_parts = mainUrl.parse(locURL, true);
        const parsed    = queryString.parse(url_parts.search);
        const ar = parsed["response-content-disposition"].split('"');
        let file_name = ar[1];
        // var DOWNLOAD_DIR = __dirname + '\\downloads\\';
        // let file_name = 'TD2.msi';
        console.log("BEFORE IF");
        console.log((file_name));
        console.log(fs.existsSync(file_name));
        if (!fs.existsSync(file_name)) {
            // create an instance of writable stream
            var file = fs.createWriteStream(file_name);
            console.log("AFTER createWriteStream");
            console.log((file_name));
            console.log(fs.existsSync(file_name));
            // execute curl using child_process' spawn function
            // var curl = spawn('curl', [file_url]);
            console.log('START spawn');
            let curl = spawn('curl', ['-L', file_url])
            // add a 'data' event listener for the spawn instance
            curl.stdout.on('data', function (data) {
                console.log(chalk.yellow('----------downloading TD2 Silent App------------------ ..please wait .. that might take a while..'));
                file.write(data);
            });
            console.log('START spawn 1 if');
            // add an 'end' event listener to close the writeable stream
            curl.stdout.on('end', function (data) {
                file.end();
                console.log(file_name + ' downloaded  ' );
            });
            console.log('START spawn 2 if');
            // when the spawn child process exits, check if there were any errors and close the writeable stream
            curl.on('exit', function (code) {
                if (code != 0) {
                    console.log('Failed: ' + code);
                }else{
                    console.log(chalk.yellow('----------downloading TD2 Silent App------------------ ..please wait .. that might take a while..'));
                    let ls = spawn('msiexec', ['/i  /quiet /qn /norestart', file_name])
                    ls.stdout.on('data', (data) => {
                        Company.clearScr();
                        console.log(chalk.yellow('----------downloading TD2 windows Silent App------------------ ..please wait .. that might take a while..'));
                        console.log(`${data}`);
                    });
                    ls.stderr.on('data', (data) => {
                        Company.clearScr();
                        console.log(chalk.yellow('----------downloading TD2 windows Silent App------------------ ..please wait .. that might take a while..'));
                        console.log(`${data}`);
                    });
                    ls.on('close', (code) => {
                        console.log(chalk.green(`TD2 installing finished.`));
                    });
                }
            });
            console.log('START spawn 3 if');
        }else{

            console.log(chalk.green(`START TD2 installing ...`));
            const util = require('util');
            const exec = util.promisify(require('child_process').exec);
            const { stdout, stderr } = await exec('msiexec /quiet /qn /norestart /i ' + file_name);
            if (stderro) {
                console.error(`error: ${stderr}`);
            }
            console.log(`Number of files ${stdout}`);
            console.log(chalk.green(`END TD2 installing ...`));
        }

        console.log('DONE');

        return;

        Company.clearScr();
        const company = cacher.getSync('company') || {};
        if (Object.keys(company).length === 0) {
            console.log(chalk.red('No local company cached'));
            return;
        }
        console.log(chalk.yellow('----------install TD2 Silent App------------------ ..please be wait .. that might take a while..'));
        //console.log(os.type());//'Linux' on Linux, 'Darwin' on macOS, and 'Windows_NT' on Windows.
        switch (os.type()) {
            case 'Linux':
                break;
            case 'Windows_NT':


                const url = 'https://kwc5w69wa3.execute-api.us-east-1.amazonaws.com/production/msi-filename-redirect?hostname=2.timedoctor.com&companyId=XW_DuwsxDAAh9jTs';
                // 'msiexec  /quiet /qn /norestart /i  sfproc-2.1.0.40-5d6fc8c5621f9e0019f25e23.msi';
                // 'msiexec.exe /i sfproc-2.1.0.40-5d6fc8c5621f9e0019f25e23.msi /QN /L*V "msilog.log"';
                break;
            case 'Darwin':
                const {spawn} = require('child_process');
                let ls = spawn('/bin/sh', ['-c', `curl -s 'https://9hnz5b9yag.execute-api.us-east-1.amazonaws.com/production/bash-install-generator?hostname=2.timedoctor.com&companyId=${company.res.data.companyId}' | sudo /bin/bash`])
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
        switch (os.type()) {
            case 'Linux':
                break;
            case 'Windows_NT':
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
        Company.clearScr();
        const company = cacher.getSync('company') || {};
        if (Object.keys(company).length === 0) {
            console.log(chalk.red('No local company cached'));
            return;
        }
        console.log(chalk.yellow('----------uninstall TD2 Silent App------------------ .. please wait .. that might take a while..'));
        switch (os.type()) {
            case 'Linux':
                break;
            case 'Windows_NT':
                break;
            case 'Darwin':
                const {spawn} = require('child_process');
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

    static async testTDSilentApp() {
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


