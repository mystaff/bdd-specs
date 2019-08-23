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


// $ td status
// $ td st
program
    .command('status')
    .alias('st')
    .description('Company: Check if local created company is cached".')
    .action(() => {
        company.statusCachedCompany();
    });

// $ td delete
// $ td d
program
    .command('delete')
    .alias('del')
    .description('Company: Delete local created company to signup new one, DO NOT FORGOT TO RUN "td remove".')
    .action(() => {
        company.deleteCachedCompany();
    });

// $ td setup
// $ td s
program
  .command('setup')
  .alias('s')
  .description('App: Download desktop application.')
  .action(() => {
    company.init();
  });


// $ td remove
// $ td r
program
  .command('remove')
  .alias('r')
  .description('App: Delete desktop application.')
  .action(() => {
    company.init();
  });


// $ td check
// $ td c
program
  .command('check')
  .alias('c')
  .description('App: Check if TD silent application is running.')
  .action(() => {
    company.init();
  });



// allow commander to parse `process.argv`
program.parse(process.argv);
