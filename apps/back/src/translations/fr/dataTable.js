import { DATATABLE_HIGHLIGHT_OPERATORS } from '@/utils/constants';

export default {
  dataTable: {
    actionBar: {
      selectedCount:
        'Aucun élément selectionné | 1 élément sélectionné | {count} éléments sélectionnés'
    },
    highlights: {
      operators: {
        [DATATABLE_HIGHLIGHT_OPERATORS.STRING.EQUALS]: 'est',
        [DATATABLE_HIGHLIGHT_OPERATORS.STRING.INCLUDES]: 'contient',
        [DATATABLE_HIGHLIGHT_OPERATORS.STRING.STARTS_WITH]: 'commence par',
        [DATATABLE_HIGHLIGHT_OPERATORS.STRING.ENDS_WITH]: 'finit par',
        [DATATABLE_HIGHLIGHT_OPERATORS.NUMBER.EQUALS]: 'est égal à',
        [DATATABLE_HIGHLIGHT_OPERATORS.NUMBER.LOWER_THAN]: 'est plus petit que',
        [DATATABLE_HIGHLIGHT_OPERATORS.NUMBER.GREATER_THAN]:
          'est plus grand que',
        [DATATABLE_HIGHLIGHT_OPERATORS.BOOLEAN.TRUE]: 'est vrai',
        [DATATABLE_HIGHLIGHT_OPERATORS.BOOLEAN.FALSE]: 'est faux',
        [DATATABLE_HIGHLIGHT_OPERATORS.DATE.BEFORE]: 'est avant',
        [DATATABLE_HIGHLIGHT_OPERATORS.DATE.AFTER]: 'est après',
        [DATATABLE_HIGHLIGHT_OPERATORS.ENUM.EQUALS]: 'est'
      },
      colors: {
        red: 'Texte rouge',
        deepRed: 'Fond rouge',
        orange: 'Texte orange',
        deepOrange: 'Fond orange',
        blue: 'Texte bleu',
        deepBlue: 'Fond bleu',
        green: 'Texte vert',
        deepGreen: 'Fond vert',
        teal: 'Texte turqoise',
        deepTeal: 'Fond turquoise',
        purple: 'Texte violet',
        deepPurple: 'Fond violet'
      }
    },
    label: {
      add: 'Ajouter',
      amount: 'Montant',
      anonymize: 'Anonymiser',
      avatar: 'Avatar',
      buyer: 'Acheteur',
      blocked: 'Bloquer',
      brand: 'Marque',
      category: 'Catégorie',
      city: 'ville',
      code: 'Code',
      content: 'Contenu',
      created: 'Date de création',
      updated: 'Date de modification',
      dateEnd: 'date de fin',
      dateFrom: 'De',
      dateStart: 'Date de début',
      dateTo: 'À',
      delete: 'Supprimer',
      depositedArticle: 'Articles déposés',
      detail: 'Détails',
      expirationDate: "Date d'expiration",
      dispute: 'Litige',
      edit: 'Editer',
      email: 'Email',
      firstname: 'Prénom',
      generated: 'Généré',
      id: 'Id',
      identifier: 'Identifiant',
      inscription: "Date d'inscription",
      lastname: 'Nom',
      modeShipping: 'Mode de livraison',
      modeSilenceAction: 'Mode silencieux',
      modeBlockedAction: 'Bloqué',
      modeAnonymizedAction: 'Anonymisé',
      modeSilence: 'Mode silencieux',
      name: 'Nom',
      numbArticles: "Nb d'articles",
      numbArticlesPublished: 'Articles publiés',
      numbReviews: "Nombre d'avis",
      noValue: 'Pas de valeur',
      note: 'Note',
      openNewTab: 'Ouvrir dans un nouvel onglet',
      order: 'Commande',
      photo: 'Photo',
      position: 'Position',
      price: 'Prix',
      republish: 'Republier',
      role: 'Rôle',
      rootCategory: 'Catégorie mère',
      seller: 'Vendeur',
      service: 'Service',
      slug: 'Slug',
      status: 'Status',
      state: 'Etat',
      storeCode: 'Code magasin',
      storeOrganizer: 'Magasin organisateur',
      title: 'Titre',
      unblocked: 'Débloquer',
      unpublish: 'Dépublier',
      username: 'Pseudo',
      visibility: 'Visibilité'
    },
    actions: {
      goToDetail: 'Voir le détail',
      resetPreferences: 'Réinitialiser le tableau'
    }
  }
};
