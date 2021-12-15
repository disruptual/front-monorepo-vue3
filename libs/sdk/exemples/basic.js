const { createClient } = require('../dist/cjs');

const main = async () => {
  const client = createClient({
    baseURL: 'https://cultura.api.sandbox2.disruptual.com',
    sso: false
  });

  // Pass an email address and a password to the method
  // The values could come from an HTML form, etc...
  const user = await client.login({
    username: 'loic@disruptual.com',
    password: 'Toto1234'
  });
  console.log(user);
};

main();
