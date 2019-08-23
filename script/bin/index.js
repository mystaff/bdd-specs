#!/usr/bin/env node
const program = require('commander');
const company = require('../lib/company');

/** **************************************** */

// $ td init
// $ td i
program
  .command('init')
  .alias('i')
  .description('Create company and cache all details locally.')
  .action(() => {
    company.init();
  });


// $ td setup
// $ td s
program
  .command('setup')
  .alias('s')
  .description('Download desktop application.')
  .action(() => {
    company.init();
  });


// $ td remove
// $ td r
program
  .command('remove')
  .alias('r')
  .description('Delete desktop application.')
  .action(() => {
    company.init();
  });


// $ td check
// $ td c
program
  .command('check')
  .alias('c')
  .description('Check if TD silent application is running.')
  .action(() => {
    company.init();
  });

// allow commander to parse `process.argv`
program.parse(process.argv);
