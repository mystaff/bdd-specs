#!/usr/bin/env node
const program = require('commander');
const list = require('../lib/list');
const order = require('../lib/order');

/*******************************************/

// Print td commands menu
// $ td list
// $ td ls
program
    .command('list') // sub-command name
    .alias('ls') // alternative sub-command is `al`
    .description('List coffee menu') // command description

    // function to execute when command is uses
    .action(function () {
        list();
    });


// Order a coffee
// $ td order
// $ td o
program
    .command('order') // sub-command name
    .alias('o') // alternative sub-command is `o`
    .description('Order a coffee') // command description

    // function to execute when command is uses
    .action(function () {
        order();
    });


// allow commander to parse `process.argv`
program.parse(process.argv);