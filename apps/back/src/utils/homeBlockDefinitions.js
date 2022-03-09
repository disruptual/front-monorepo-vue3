import {
  HOME_BLOCK_TYPES,
  HOME_BLOCK_SEE_MORE_POSITION,
  HOME_BLOCK_PROPERTY_TYPES,
  HOME_BLOCK_UI_TYPES
} from '@dsp/business';

export const HOME_BLOCK_OPTIONS_DEFAULTS = {
  [HOME_BLOCK_TYPES.ITEM]: {
    seeMore: {},
    title: {}
  },
  [HOME_BLOCK_TYPES.BRAND]: { title: {} },
  [HOME_BLOCK_TYPES.USER]: { title: {} },
  [HOME_BLOCK_TYPES.CATEGORY]: { title: {} }
};

export const HOME_BLOCK_MAPPED_TYPE = {
  [HOME_BLOCK_TYPES.ITEM]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR,
      label: 'backgroundColor'
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER,
      label: 'itemsPerSection'
    },
    title: {
      label: 'Title',
      content: { type: HOME_BLOCK_PROPERTY_TYPES.STRING, label: 'Contenu' },
      upperCase: { type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN, label: 'upperCase' }
    },
    seeMore: {
      label: 'Bouton voir plus',
      enabled: { type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN, label: 'enabled' },
      position: {
        type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
        values: [
          HOME_BLOCK_SEE_MORE_POSITION.HEADER,
          HOME_BLOCK_SEE_MORE_POSITION.BOTTOM,
          HOME_BLOCK_SEE_MORE_POSITION.CONTENT
        ],
        label: 'position'
      }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      label: "Type d'affichage",
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER]
    }
  },
  [HOME_BLOCK_TYPES.BRAND]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR,
      label: 'backgroundColor'
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER,
      label: 'itemsPerSection'
    },
    title: {
      label: 'Title',
      content: { type: HOME_BLOCK_PROPERTY_TYPES.STRING, label: 'Contenu' },
      upperCase: { type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN, label: 'upperCase' }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      label: "Type d'affichage",
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER]
    }
  },
  [HOME_BLOCK_TYPES.USER]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR,
      label: 'backgroundColor'
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER,
      label: 'itemsPerSection'
    },
    title: {
      label: 'Title',
      content: { type: HOME_BLOCK_PROPERTY_TYPES.STRING, label: 'Contenu' },
      upperCase: { type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN, label: 'upperCase' }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      label: "Type d'affichage",
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER]
    }
  },
  [HOME_BLOCK_TYPES.CATEGORY]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR,
      label: 'backgroundColor'
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER,
      label: 'itemsPerSection'
    },
    title: {
      label: 'Title',
      content: { type: HOME_BLOCK_PROPERTY_TYPES.STRING, label: 'Contenu' },
      upperCase: { type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN, label: 'upperCase' }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      label: "Type d'affichage",
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER]
    }
  }
};
