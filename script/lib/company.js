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
var mainUrl = require('url');


class Company {

    static async clearScr() {
        clear();
        console.log(
            chalk.yellow(
                figlet.textSync('TD2', {horizontalLayout: 'full'}),
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
            } else {
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

    static async deleteCachedCompany() {
        Company.clearScr();
        switch (os.type()) {
            case 'Linux':
                break;
            case 'Windows_NT':
                break;
            case 'Darwin':
                if (fs.existsSync(`/opt/sfproc/updateschecker2.app/Contents/Resources/uninstall.sh`)) {
                    console.log(chalk.red('TD2 App is alerady installed and running, please run "td uninstall" before delete company.'));
                    return;
                }
                break;
            default:
                break;
        }

        const company = cacher.getSync('company') || {};
        if (Object.keys(company).length === 0) {
            console.log(chalk.white('No local company cached'));
        } else {
            console.log(chalk.white('deleting local cache'));
            cacher.delete('company', function(err) {
                console.log('company removed from cache');
            });
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
            console.log('company');
            console.log(JSON.stringify(company, null, 2));
        }
    }

}

module.exports = Company;


