'use strict';

const test = require('tape');
const stub = require('@cloudcmd/stub');

const {
    writeTmpFileSync,
} = require('..');

test('psedit-cli: readdirSync', (t) => {
    const tmpdir = '/tmpdir';
    const writeFileSync = stub();
    const writeFile = writeTmpFileSync({
        writeFileSync,
    });
    
    const data = 'hello';
    writeFile(tmpdir, data);
    
    const expected = [
        `${tmpdir}/psedit`,
        data,
    ];
    
    t.ok(writeFileSync.calledWith(...expected), 'should call mkdtempSync');
    t.end();
});

