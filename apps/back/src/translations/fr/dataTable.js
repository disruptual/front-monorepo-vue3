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
      amount: 'Montant',
      anonymize: 'Anonymiser',
      avatar: 'Avatar',
      buyer: 'Acheteur',
      blocked: 'Bloquer',
      category: 'Categorie',
      city: 'ville',
      content: 'Contenu',
      created: 'Date de création',
      dateStart: 'Date de début',
      dateEnd: 'date de fin',
      delete: 'Supprimer',
      depositedArticle: 'Articles déposés',
      detail: 'Détails',
      edit: 'Editer',
      email: 'Email',
      firstname: 'Prénom',
      id: 'Id',
      identifier: 'Identifiant',
      inscription: "Date d'inscription",
      lastname: 'Nom',
      modeShipping: 'Mode de livraison',
      modeSilence: 'Mode silencieux',
      mute: 'Muter',
      name: 'Nom',
      numbArticles: "Nb d'articles",
      plateformRate: 'plateformRate',
      photo: 'Photo',
      price: 'Prix',
      role: 'Rôle',
      seller: 'Vendeur',
      service: 'Service',
      slug: 'Slug',
      status: 'Status',
      state: 'Etat',
      storeCode: 'Code store',
      storeOrganizer: 'Magasin organisateur',
      title: 'Titre',
      unblocked: 'Débloquer',
      visibility: 'Visibilité'
    }
  }
};
