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
    type: HOME_BLOCK_PROPERTY_TYPES.STRING
  },
  type: {
    type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
    values: [
      HOME_BLOCK_TYPES.USER,
      HOME_BLOCK_TYPES.CATEGORY,
      HOME_BLOCK_TYPES.BRAND,
      HOME_BLOCK_TYPES.BRAND
    ]
  },
  query: {
    type: HOME_BLOCK_PROPERTY_TYPES.ENUM
  },
  [HOME_BLOCK_TYPES.ITEM]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER
    },
    title: {
      content: {
        type: HOME_BLOCK_PROPERTY_TYPES.STRING
      },
      upperCase: {
        type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN
      }
    },
    seeMore: {
      enabled: {
        type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN
      },
      position: {
        type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
        values: [
          HOME_BLOCK_SEE_MORE_POSITION.HEADER,
          HOME_BLOCK_SEE_MORE_POSITION.BOTTOM,
          HOME_BLOCK_SEE_MORE_POSITION.CONTENT
        ]
      }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER]
    }
  },
  [HOME_BLOCK_TYPES.BRAND]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER
    },
    title: {
      content: {
        type: HOME_BLOCK_PROPERTY_TYPES.STRING,
        name: 'title.content'
      },
      upperCase: {
        type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN
      }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER]
    }
  },
  [HOME_BLOCK_TYPES.USER]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER
    },
    title: {
      content: {
        type: HOME_BLOCK_PROPERTY_TYPES.STRING,
        name: 'title.content'
      },
      upperCase: {
        type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN
      }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER]
    }
  },
  [HOME_BLOCK_TYPES.CATEGORY]: {
    backgroundColor: {
      type: HOME_BLOCK_PROPERTY_TYPES.COLOR
    },
    itemsPerSection: {
      type: HOME_BLOCK_PROPERTY_TYPES.NUMBER
    },
    title: {
      content: {
        type: HOME_BLOCK_PROPERTY_TYPES.STRING
      },
      upperCase: {
        type: HOME_BLOCK_PROPERTY_TYPES.BOOLEAN
      }
    },
    uiType: {
      type: HOME_BLOCK_PROPERTY_TYPES.ENUM,
      values: [HOME_BLOCK_UI_TYPES.GRID, HOME_BLOCK_UI_TYPES.SWIPER]
    }
  }
};
