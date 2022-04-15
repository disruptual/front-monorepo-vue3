const path = require('path');
const fs = require('fs-extra');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const simpleGit = require('simple-git');
const cwd = process.cwd();
const chalk = require('chalk');

const apps = fs.readdirSync(path.join(cwd, 'apps'));
const BRANCHES = {
  sandbox: 'dev',
  preprod: 'master'
};

const showError = message => {
  console.log(chalk.red(message));
  process.exit();
};
const showInfo = message => console.log(chalk.cyan(message));

const { env, app } = argv;
if (!apps.includes(app)) {
  showError(
    `argument --app missing or invalid. Possible values are ${apps.join(
      ', '
    )}. Recieved ${app}`
  );
}

deploy();

async function deploy() {
  const git = simpleGit({ baseDir: cwd });

  const { name, version } = fs.readJSONSync(
    path.join(cwd, 'apps', app, 'package.json')
  );

  showInfo(`Deploying project ${name} in ${env} at version ${version}`);
  const tag = `${app}-${version}`;
  const tags = (await git.tag()).split('\n');
  if (tags.includes(tag)) {
    showError(
      `${name} has already been released with version ${version}. Maybe you forgot to update the app package.json ?`
    );
  }

  const { current } = await git.branch();
  if (current !== BRANCHES[env]) {
    showError(
      `You are on the wrong branch to deploy in environment ${env}. Please checkout to branch ${BRANCHES[env]} first.`
    );
  }
  // await git.checkout(BRANCHES[env]);
  await git.push();
  await git.addTag(tag);
  await git.push('origin', tag);
  showInfo(`${name} has been deployed successfully !`);
}
