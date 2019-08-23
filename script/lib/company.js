const colors = require('colors');


class Company {
  static async init() {
    console.log('COMMAND MENU');
    console.log('------------------');
    console.log('%s %s', colors.bold('LOL'), colors.grey('POP'));
  }
}

module.exports = Company;
