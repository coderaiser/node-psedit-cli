#!/usr/bin/env node

'use strict';

const arg = process.argv
    .slice(2)
    .pop();

if (/^(-v|--version)$/.test(arg)) {
    console.log(require('../package').version);
    process.exit();
}

const {join} = require('path');
const {execSync} = require('child_process');
const {tmpdir} = require('os');
const {
    readFileSync,
    writeFileSync,
    mkdtempSync,
} = require('fs');

const rimraf = require('rimraf');
const currify = require('currify');
const fullstore = require('fullstore');

const writeTmpFileSync = require('..').writeTmpFileSync({
    readFileSync,
    writeFileSync,
    mkdtempSync,
});

const psedit = require('psedit');

const pidStore = fullstore();
const {error} = console;

const isNameEqual = currify((name, a) => a[3] === name);

const filterName = currify((name, apps) => {
    if (!name)
        return apps;
    
    return apps.filter(isNameEqual(`*${name}`));
});

const diffPids = currify((pidStore, pids) => psedit.diff(pidStore(), pids));

const [name] = process.argv.slice(2);
const tmpDir = mkdtempSync(join(tmpdir(), 'psedit'));

const store = currify((pidStore, apps) => {
    const list = psedit.getPids(apps);
    
    pidStore(list);
    
    return apps;
});

const checkEmpty = currify((name, a) => {
    if (a.length)
        return a;
    
    throw Error(`processes with name "${name}" not found`);
});

psedit.get()
    .then(filterName(name))
    .then(checkEmpty(name))
    .then(store(pidStore))
    .then(psedit.build)
    .then(writeTmpFileSync(tmpDir))
    .then(edit)
    .then(read)
    .then(psedit.pulloutPids)
    .then(diffPids(pidStore))
    .then(psedit.kill)
    .then(remove)
    .catch(logError);

function edit(tmpFile) {
    const {EDITOR} = process.env;
    
    const editor = EDITOR || 'vim';
    
    execSync(`${editor} ${tmpFile}`, {
        stdio: [0, 1, 2, 'pipe'],
    });
    
    return tmpFile;
}

function read(tmpFile) {
    return readFileSync(tmpFile, 'utf8');
}

function remove() {
    rimraf.sync(tmpDir);
}

function logError(e) {
    error(e.message);
}

