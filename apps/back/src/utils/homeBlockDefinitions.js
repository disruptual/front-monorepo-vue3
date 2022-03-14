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
  name: {
    type: HOME_BLOCK_PROPERTY_TYPES.STRING,
    label: 'Nom',
    name: 'name'
  },
  type: {
    type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
    values: [
      HOME_BLOCK_TYPES.USER,
      HOME_BLOCK_TYPES.CATEGORY,
      HOME_BLOCK_TYPES.BRAND,
      HOME_BLOCK_TYPES.BRAND
    ],
    label: 'Type',
    name: 'type'
  },
  query: {
    type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
    label: 'Requête',
    name: 'query'
  },
  [HOME_BLOCK_TYPES.ITEM]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR,
      label: 'backgroundColor',
      name: 'backgroundColor'
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER,
      label: 'itemsPerSection',
      name: 'itemsPerSection'
    },
    title: {
      label: 'Title',
      content: {
        type: HOME_BLOCK_PROPERTY_TYPES.STRING,
        label: 'Contenu',
        name: 'title.content'
      },
      upperCase: {
        type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN,
        label: 'upperCase',
        name: 'title.upperCase'
      }
    },
    seeMore: {
      label: 'Bouton voir plus',
      enabled: {
        type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN,
        label: 'enabled',
        name: 'seeMore.enabled'
      },
      position: {
        type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
        values: [
          HOME_BLOCK_SEE_MORE_POSITION.HEADER,
          HOME_BLOCK_SEE_MORE_POSITION.BOTTOM,
          HOME_BLOCK_SEE_MORE_POSITION.CONTENT
        ],
        label: 'position',
        name: 'seeMore.position'
      }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      label: "Type d'affichage",
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER],
      name: 'uiType'
    }
  },
  [HOME_BLOCK_TYPES.BRAND]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR,
      label: 'backgroundColor',
      name: 'backgroundColor'
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER,
      label: 'itemsPerSection',
      name: 'itemsPerSection'
    },
    title: {
      label: 'Title',
      content: {
        type: HOME_BLOCK_PROPERTY_TYPES.STRING,
        label: 'Contenu',
        name: 'title.content'
      },
      upperCase: {
        type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN,
        label: 'upperCase',
        name: 'title.upperCase'
      }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      label: "Type d'affichage",
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER],
      name: 'uiType'
    }
  },
  [HOME_BLOCK_TYPES.USER]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR,
      label: 'backgroundColor',
      name: 'backgroundColor'
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER,
      label: 'itemsPerSection',
      name: 'itemsPerSection'
    },
    title: {
      label: 'Title',
      content: {
        type: HOME_BLOCK_PROPERTY_TYPES.STRING,
        label: 'Contenu',
        name: 'title.content'
      },
      upperCase: {
        type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN,
        label: 'upperCase',
        name: 'title.upperCase'
      }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      label: "Type d'affichage",
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER],
      name: 'uiType'
    }
  },
  [HOME_BLOCK_TYPES.CATEGORY]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR,
      label: 'backgroundColor',
      name: 'backgroundColor'
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER,
      label: 'itemsPerSection',
      name: 'itemsPerSection'
    },
    title: {
      label: 'Title',
      content: {
        type: HOME_BLOCK_PROPERTY_TYPES.STRING,
        label: 'Contenu',
        name: 'title.content'
      },
      upperCase: {
        type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN,
        label: 'upperCase',
        name: 'title.upperCase'
      }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      label: "Type d'affichage",
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER],
      name: 'uiType'
    }
  }
};
