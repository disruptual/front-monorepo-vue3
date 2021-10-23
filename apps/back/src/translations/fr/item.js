import { ITEM_PUBLICATION_STATES } from '@dsp/business';

export default {
  item: {
    publicationState: {
      [ITEM_PUBLICATION_STATES.PUBLISHED]: 'Publié',
      [ITEM_PUBLICATION_STATES.UNPUBLISHED]: 'Dépublié',
      [ITEM_PUBLICATION_STATES.PURCHASED]: 'Acheté',
      [ITEM_PUBLICATION_STATES.ORDERED]: 'Commandé',
      [ITEM_PUBLICATION_STATES.VACANCY]: 'Vendeur en vacances',
      [ITEM_PUBLICATION_STATES.DELETED]: 'Supprimé'
    }
  }
};
