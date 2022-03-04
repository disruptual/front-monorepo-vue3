export const HOME_BLOCK_TYPES = {
  ITEM: 'ITEM',
  USER: 'USER',
  BRAND: 'BRAND',
  CATEGORY: 'CATEGORY'
};

export const HOME_BLOCK_SEE_MORE_POSITION = {
  HEADER: 'HEADER',
  CONTENT: 'CONTENT',
  BOTTOM: 'BOTTOM'
};

export const HOME_BLOCK_PROPERTY_TYPES = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  ENUM: 'ENUM',
  COLOR: 'COLOR'
};

export const HOME_BLOCK_UI_TYPES = {
  SWIPER: 'SWIPER',
  GRID: 'GRID'
};

export const HOME_BLOCK_QUERIES = {
  [HOME_BLOCK_TYPES.ITEM]: {
    LAST: 'LAST_ITEMS',
    RECOMMENDED: 'RECOMMENDED_ITEMS'
  },
  [HOME_BLOCK_TYPES.USER]: {
    RECOMMENDED: 'RECOMMENDED_USERS',
    POPULAR: 'POPULAR_USERS'
  },
  [HOME_BLOCK_TYPES.BRAND]: {
    RECOMMENDED: 'RECOMMENDED_BRANDS',
    POPULAR: 'POPULAR_BRANDS'
  },
  [HOME_BLOCK_TYPES.CATEGORY]: {
    RECOMMENDED: 'RECOMMENDED_CATEGORIES',
    POPULAR: 'POPULAR_CATEGORIES'
  }
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
