const { createClient } = require('../dist/cjs');

const main = async () => {
  const client = createClient({
    baseURL: 'https://cdiscount.api.sandbox2.disruptual.com',
    sso: true
  });

  const myToken =
    'AAEAABJnuZQ_QdFCYhzMp8m-qQqPLhAG08Kb2y2PS91kJ7MeLGc3bLDTnb3Zr1l2g3nfCkZn4j36CZY9JKLNFt7wAQ5aQaRHBrUQhDPzocJvBjlF2J_pLSQfAIz9zZSTe6_ZdUbod1jFnDEOnf7GVAjo7-blXUpKi3yCzOvuUz9TbRfmrG_AWm_pzmuo7tLMQlFlp6NquoQEniiryAvMNslSXCzrU66eF0_rixw_BG-5iZFaOs1lKqOIgP_NlL1a9PeYPBhDbkr7CHYLAfMaPK6SfUIo_u8iXnlVtKfL1UQt8vooFZSE0_RraswrN-3TPQZJs9ic9cKn2dtqLKfj0eMHFT4EAgAAAAEAABn0hA6vNv0JSKC_8pO7koYWIW54WzWKHSHYibBVrttHoF26WoqZU4p8uLSOb5RXfuSO4BIvw1T-2lKtB9riba1sDAhzBtUZwNnGupLuLRU7v4dSxbHHAlUap2UpnxRl-a8yI4s-fJhl-fP3jH_UOFNl_d8ViAid2nY8LUPmvGCfx71t3Zm44u4YBhRK81eGaXXKeKH9mNN5l1KU59GUmciG7bxpgANom98lsV30qtEGYp5WOdXtMxy6SzEsKfvQxo2o0UzNvoRVg5rxDzDH6u9zoLIRmGaVwH09Za7BliNnOcymAffghxFeDMEmRy_8h2kYDni2mzgrN5xk4o54u25DfdCF6FSE033klvbnoPBhCOfV1vt0GpFr2V6Es36l6w-4hHxschm_9Zc9TdMjntlWPtVFChJ83oAVq4elYlkTpShUqXW1jvlqv_q0YzlM-6yYqswi6D6T1HvLwZZ9q2Fmen1yG5nH8sirSgNap_u7XD3_0tbW3OWCWcPOJrwUoOTdTPSqvatVCLOgBR5dc4Xlr4nLUcwI_ROH-2CKgImVtJnPShD1ITEDF2VnMrZq1iZUjnxhqp5vS9PnUjCDFqSEsQlIah9KQwN7vjmAWCrgoayiVCtYQM0qgZGiRunz1x_UBO7Q4ISJ_LkIcdeyzmi5gjEFx6SSkZ4Siy0kqAvr';

  // Pass the SSO access token. This token can come from anywhere,
  // the disruptual client is not opinionated about how to get the SSO credentials tp ensure maximum flexibility
  const user = await client.login(myToken);
  console.log(user);
};

main();
