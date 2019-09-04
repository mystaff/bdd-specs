#!/usr/bin/env node
const program = require('commander');
const company = require('../lib/company');

/** **************************************** */

// $ td init
// $ td i
program
  .command('init')
  .alias('i')
  .description('Company: Create company and cache all details locally.')
  .action(() => {
    company.init();
  });



// $ td delete
// $ td d
program
    .command('delete')
    .alias('d')
    .description('Company: Delete local created company to signup new one, DO NOT FORGOT TO RUN "td remove".')
    .action(() => {
        company.deleteCachedCompany();
    });

// $ td status
// $ td s
program
    .command('status')
    .alias('s')
    .description('Company: Check if local created company is cached".')
    .action(() => {
        company.statusCachedCompany();
    });

// $ td install
// $ td in
program
  .command('install')
  .alias('in')
  .description('App: Download and install TD2 silent application.')
  .action(() => {
    company.installTDSilentApp();
  });


// $ td uninstall
// $ td u
program
  .command('uninstall')
  .alias('u')
  .description('App: Uninstall TD2 silent application.')
  .action(() => {
    company.uninstallApp();
  });


// $ td check
// $ td c
program
  .command('check')
  .alias('c')
  .description('App: Check if TD2 silent application is installed.')
  .action(() => {
    company.statusApp();
  });


// allow commander to parse `process.argv`
program.parse(process.argv);
// Check the program.args obj
var NO_COMMAND_SPECIFIED = program.args.length === 0;

// Handle it however you like
if (NO_COMMAND_SPECIFIED) {
    // e.g. display usage
    program.help();
}

