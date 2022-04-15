const path = require('path');
const fs = require('fs-extra');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const simpleGit = require('simple-git');
const cwd = process.cwd();
const chalk = require('chalk');

const apps = fs.readdirSync(path.join(cwd, 'apps'));
const branches = {
  sandbox: 'dev',
  preprod: 'master'
};

const showError = message => console.log(chalk.red(message));

const { env, app } = argv;
if (!apps.includes(app)) {
  showError(
    `argument --app missing or invalid. Possible values are ${apps.join(', ')}`
  );
  process.exit();
}

deploy();

async function deploy() {
  const git = simpleGit({ baseDir: cwd });

  await git.checkout(branches[env]);
}
