#!/usr/bin/env node

require('manakin').global;

try {
  const fs = require('fs-extra');
  const _ = require('lodash');
  const branchName = require('current-git-branch');
  const findUp = require('find-up');
  const prettyjson = require('prettyjson');


  const optionDefinitions = [{
      name: 'tag',
      alias: 't',
      type: String
    },
    {
      name: 'branch',
      alias: 'b',
      type: String
    }
  ];

  const commandLineArgs = require('command-line-args');
  const options = commandLineArgs(optionDefinitions);

  let packagePath;

  findUp('package.json', {
      cwd: process.cwd()
    })
    .then((path) => {
      packagePath = path;
      return require(path);
    })
    .then((pkg) => {
      pkg = pkg;

      const branch = options.branch || process.env.TRAVIS_BRANCH || branchName();

      options.tag = options.tag || _.get(pkg, `release.versionMapping.${ branch }`);

      if (!options.tag) {
        throw new Error(`a tag was not defined by parameter or package.json for branch "${ branch }"`);
      }

      console.info('updating package.json release params to:\n');
      console.log(prettyjson.render({
        'release.branch': branch,
        'publishConfig.tag': options.tag
      }));

      if (_.get(pkg, 'release.branch')) {
        pkg.release.branch = branch;
      }

      if (_.get(pkg, 'publishConfig.tag')) {
        pkg.publishConfig.tag = options.tag;
      }

      return fs.writeJson(packagePath, pkg, {
        spaces: 2
      });
    })
    .then(() => console.success('\n~ package.json updated ~\n'))
    .catch((err) => console.error(err));

} catch (err) {
  console.error(err);
}
