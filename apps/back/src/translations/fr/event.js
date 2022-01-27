import { EVENT_DETAILS_TABS } from '@/utils/constants';

export default {
  event: {
    isSalesPeriod: 'Vente en cours',
    isPhysicalPeriod: 'Dépôt physique',
    isDigitalPeriod: 'Dépôt digital',
    hasEventStarted: 'Pas encore commencé',
    finished: 'Terminé',
    title: {
      edit: "Modification d'événement",
      create: "Création d'événement",
      date: 'Date',
      address: 'Adresse',
      schedule: 'Horaire du magasin',
      informations: 'Informations',
      startEndAt: 'Début / fin',
      digitalSubmissionStartEndAt: 'Dépôt digital',
      physicalSubmissionStartEndAt: 'Dépôt physique',
      salesStartEndAt: 'Vente'
    },
    label: {
      description: 'Description',
      title: 'Titre',
      category: 'Catégories',
      OrganiserShop: 'Magasin organisateur',
      address: {
        fullName: "Nom de l'adresse",
        route: 'Rue',
        postalCode: 'Code postal',
        city: 'Ville',
        country: 'Pays',
        clock: 'Horaire du magasin'
      },
      location: 'adresse',
      numArticles: "Nombre d'articles",
      numUserMarked: "Nombre d'utilisateurs marqués",
      startAt: 'du',
      endAt: 'au',
      digitalSubmissionStartAt: 'du',
      digitalSubmissionEndAt: 'au',
      physicalSubmissionStartAt: 'du',
      physicalSubmissionEndAt: 'au',
      salesStartAt: 'du',
      salesEndAt: 'au'
    },
    details: {
      startEndAt: 'du {startAt} au {endAt}',
      notStarted: 'À venir',
      inProgress: 'En cours',
      complete: 'Terminé',
      tabs: {
        [EVENT_DETAILS_TABS.INFOS]: 'Informations',
        [EVENT_DETAILS_TABS.ITEMS_DIGITAL]: 'Articles dépôt digital',
        [EVENT_DETAILS_TABS.ITEMS_PHYSICAL]: 'Articles dépôt physique'
      },
      title: {
        schedule: 'Horaires du magasin',
        informations: 'Informations Pratiques',
        dateEvent: "Découpe de l'événement",
        digitalDeposit: 'DÉPÔT DIGITAL',
        physicalDeposit: 'DÉPÔT PHYSIQUE',
        sale: 'VENTE'
      },
      day: {
        monday: 'Lundi',
        tuesday: 'Mardi',
        wednesday: 'Mercredi',
        thursday: 'Jeudi',
        friday: 'Vendredi',
        saturday: 'Samedi',
        sunday: 'Dimanche'
      }
    }
  }
};
