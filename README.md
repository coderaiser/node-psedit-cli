# PSEdit CLI [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

Kill group of processes with help of an editor.

## Install

`
npm i psedit-cli --save
`

## Usage

Edit files names in the `$EDITOR` of choice. Run:

```
$ psedit
```

If you want to filter by process name, use:

```
$ psedit node
```

Edit processes in editor, remove processes you'd like to kill, save and exit. Absent processes will be killed.
It works in similar way to `git rebase -i`.

## Related

- [renamify-cli](https://github.com/coderaiser/node-psedit-cli "psedit-cli") - rename group of files from a directory in editor

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/psedit-cli.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/node-psedit-cli/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/node-psedit-cli.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/psedit-cli "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/node-psedit-cli  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/node-psedit-cli "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/node-psedit-cli?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/node-psedit-cli/badge.svg?branch=master&service=github

