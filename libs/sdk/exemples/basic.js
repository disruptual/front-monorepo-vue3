const { createClient } = require('../dist/cjs');

const main = async () => {
  const client = createClient({
    baseURL: 'https://cultura.api.sandbox2.disruptual.com',
    sso: false
  });

  await client.login({
    username: 'loic@disruptual.com',
    password: 'Toto1234'
  });

  const { data: carts } = await client.getCarts();
  const seller = await client.httpRequest(carts[0].seller);
  console.log(seller);
};

main();
