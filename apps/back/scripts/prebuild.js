const path = require('path');
const fs = require('fs-extra');

const envPath = path.resolve(process.cwd(), '.env.local');

require('dotenv').config({
  path: envPath
});

const { VITE_CLIENT } = process.env;
// include fs-extra package

var source = path.join(process.cwd(), 'src/clients', VITE_CLIENT, 'public');
var destination = path.join(process.cwd(), 'public');

console.log('Merging client public directory...');
fs.copy(source, destination, err => {
  if (err) {
    return console.error(err);
  }
  console.log('Public directory merged.');
});
