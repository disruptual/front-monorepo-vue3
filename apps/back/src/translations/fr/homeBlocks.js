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
      RECOMMENDED_USERS: 'Vendeurs recommandés',
      RECOMMENDED_POPULAR_USERS: 'Top vendeurs  et recommandés',
      POPULAR_USERS: 'Top vendeurs',
      RECOMMENDED_BRANDS: 'Marques recommandées',
      RECOMMENDED_POPULAR_BRANDS: 'Top marques  et recommandées',
      POPULAR_BRANDS: 'Top marques',
      RECOMMENDED_CATEGORIES: 'Catégories recommandées',
      RECOMMENDED_POPULAR_CATEGORIES: 'Top catégories  et recommandées',
      POPULAR_CATEGORIES: 'Top catégories'
    }
  }
};
