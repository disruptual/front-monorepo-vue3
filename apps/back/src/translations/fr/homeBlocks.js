export default {
  homeBlocks: {
    form: {
      name: 'Nom',
      type: 'Type',
      request: 'Requête'
    },

    fields: {
      itemsPerSection: "Nombre d'éléments",
      title: {
        legend: 'Titre',
        content: 'Texte',
        upperCase: 'Majuscule'
      },
      seeMore: {
        legend: 'Bouton voir plus',
        enabled: 'Activé',
        position: 'Emplacement'
      },
      uiType: "Type d'affichage",
      backgroundColor: 'Couleur'
    },

    types: {
      ITEM: 'Annonces',
      BRAND: 'Marques',
      CATEGORY: 'Catégories',
      USER: 'Vendeurs'
    },

    queries: {
      LAST_ITEMS: 'Dernières annonces',
      RECOMMENDED_ITEMS: 'Annonces recommandées',
      RECOMMENDED_USERS: 'Top vendeurs',
      RECOMMENDED_POPULAR_USERS: 'Top vendeurs  et populaires',
      POPULAR_USERS: 'Vendeurs populaires',
      RECOMMENDED_BRANDS: 'Top marques',
      RECOMMENDED_POPULAR_BRANDS: 'Top marques  et populaires',
      POPULAR_BRANDS: 'Marques populaires',
      RECOMMENDED_CATEGORIES: 'Top catégories',
      RECOMMENDED_POPULAR_CATEGORIES: 'Top catégories et populaires',
      POPULAR_CATEGORIES: 'Catégories populaires'
    }
  }
};
