const fs = require('fs-extra');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const snakeToCamelCase = str => {
  return str.replace(/(_\w)/g, match => match[1].toUpperCase());
};
const camelToSnakeCase = str =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
const upperCaseFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.substring(1);

const argv = yargs(hideBin(process.argv)).argv;
const resourceName = argv._[0];

if (!resourceName) {
  console.log(
    'Please provide a resource name in the command, ex: yarn ge:resource myResource'
  );
}

const nameCamelCased = snakeToCamelCase(resourceName);
const namePascalCased = upperCaseFirstLetter(nameCamelCased);
const nameSnakeCased = camelToSnakeCase(resourceName);

const model = `
import { BaseModel } from './Base.model'

export class ${namePascalCased} extends BaseModel {}
`;

const service = `
import { BaseCRUDService } from './BaseCRUD.service';

export class ${namePascalCased}Service extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/${nameSnakeCased}s';
  }
}
`;

const hook = `
import { ${namePascalCased}, ${namePascalCased}Service } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function use${namePascalCased}Api() {
  return useCRUDApi({ model: ${namePascalCased}, service: ${namePascalCased}Service });
}
`;

const modelPath = `libs/business/src/models/${namePascalCased}.model.js`;
const servicePath = `libs/business/src/services/${namePascalCased}.service.js`;
const hookPath = `libs/core/src/hooks/api/use${namePascalCased}Api.js`;
const createFile = (filePath, content) => {
  fs.writeFileSync(path.join(process.cwd(), filePath), content, {
    encoding: 'utf-8'
  });
  console.log(`created file ${filePath}`);
};
createFile(modelPath, model);
createFile(servicePath, service);
createFile(hookPath, hook);

const modelIndexPath = path.join(
  process.cwd(),
  'libs/business/src/models/index.js'
);
const serviceIndexPath = path.join(
  process.cwd(),
  'libs/business/src/services/index.js'
);
const hookIndexPath = path.join(
  process.cwd(),
  'libs/core/src/hooks/api/index.js'
);
fs.appendFileSync(
  modelIndexPath,
  `export * from './${namePascalCased}.model';`
);
console.log('Updated models index.js file');
fs.appendFileSync(
  serviceIndexPath,
  `export * from './${namePascalCased}.service';`
);
console.log('Updated services index.js file');
fs.appendFileSync(hookIndexPath, `export * from './use${namePascalCased}Api';`);
console.log('Updated core hooks index.js file');
