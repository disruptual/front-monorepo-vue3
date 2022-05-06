const fs = require('fs-extra');
const path = require('path');
const yargs = require('yargs/yargs');
const chalk = require('chalk');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const cwd = process.cwd();
const apps = fs.readdirSync(path.join(cwd, 'apps'));
const glob = require('glob');

const { app, locale } = argv;

const showError = message => {
  console.log(chalk.red(message));
  process.exit();
};
const showInfo = message => console.log(chalk.cyan(message));

if (!apps.includes(app)) {
  showError(
    `argument --app missing or invalid. Possible values are ${apps.join(
      ', '
    )}. Recieved ${app}`
  );
}

if (!locale) {
  showError(`Please specify the name of the locale you wish to add.`);
}

const LOCALE_DIRECTORIES_GLOB = `apps/${app}/src/**/locales`;

function resetObjectValues(obj) {
  const result = {};

  Object.entries(obj).forEach(([k, v]) => {
    if (typeof v === 'object') {
      result[k] = resetObjectValues(v);
    } else {
      result[k] = '';
    }
  });

  return result;
}

glob(LOCALE_DIRECTORIES_GLOB, { cwd }, (err, directories) => {
  if (err) showError(err);

  directories.forEach(directory => {
    const frJson = require(path.join(cwd, directory, `fr.json`));

    const filePath = path.join(cwd, directory, `${locale}.json`);
    fs.writeJsonSync(filePath, resetObjectValues(frJson), { spaces: 2 });
    showInfo(`created file ${filePath}`);
  });
});
