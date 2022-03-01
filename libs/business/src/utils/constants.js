export const DEFAULT_DATE_FORMAT = 'dd-MM-yyyy';
export const SLASH_DATE_FORMAT = 'dd/MM/yyyy';

export const TIME_IN_HOURS = {
  ONE_DAY: 24,
  ONE_WEEK: 24 * 7
};

export const fakeHomePageConfig = [
  {
    id: 1,
    name: 'Bloc 1',
    type: 'ITEM',
    query: 'RECOMMENDED_ITEMS',
    position: 1,
    options: {
      itemsPerSection: 7,
      uiType: 'SWIPER',
      seeMore: {
        isEnabled: true,
        position: 'HEADER'
      },
      title: {
        upperCase: true
      },
      color: '#f4f5f7'
    }
  },
  {
    id: 2,
    name: 'Bloc 2',
    type: 'ITEM',
    query: 'RECOMMENDED_ITEMS',
    position: 2,
    options: {
      itemsPerSection: 7,
      uiType: 'SWIPER',
      seeMore: {
        isEnabled: true,
        position: 'HEADER'
      },
      title: {
        content: 'Ça devrait vous plaire !',
        upperCase: true
      },
      color: 'var(--color-background)'
    }
  },
  {
    id: 3,
    name: 'Bloc 3',
    type: 'BRAND',
    query: 'POPULAR_BRANDS',
    position: 3,
    options: {
      itemsPerSection: 10,
      uiType: 'SWIPER',
      title: {
        // content: 'Marques les plus tendances du moment',
        upperCase: true
      },
      color: '#f4f5f7'
    }
  },
  {
    id: 4,
    name: 'Bloc 4',
    type: 'USER',
    query: 'POPULAR_USERS',
    position: 4,
    options: {
      itemsPerSection: 10,
      uiType: 'SWIPER',
      title: {
        content: 'Top vendeurs & dressing',
        upperCase: true
      }
    }
  },
  {
    id: 5,
    name: 'Bloc 5',
    type: 'CATEGORY',
    query: 'POPULAR_CATEGORIES',
    position: 5,
    options: {
      itemsPerSection: 10,
      uiType: 'SWIPER',
      title: {
        content: 'Catégories les + recherchées',
        upperCase: true
      },
      color: 'var(--color-accent)'
    }
  },
  {
    id: 6,
    name: 'Bloc 6',
    type: 'ITEM',
    query: 'RECOMMENDED_ITEMS',
    position: 6,
    options: {
      itemsPerSection: 10,
      uiType: 'SWIPER',
      seeMore: {
        isEnabled: true,
        position: 'HEADER'
      },
      title: {
        content: 'À la baisse !',
        upperCase: true
      },
      color: '#f4f5f7'
    }
  },
  {
    id: 7,
    name: 'Bloc 7',
    type: 'ITEM',
    query: 'LAST_ITEMS',
    position: 7,
    options: {
      itemsPerSection: 30,
      uiType: 'GRID',
      seeMore: {
        isEnabled: true,
        position: 'BOTTOM'
      },
      title: {
        content: 'Dernières publications',
        upperCase: true
      }
    }
  }
];
