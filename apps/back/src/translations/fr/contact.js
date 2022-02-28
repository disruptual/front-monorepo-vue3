import { CONTACT_STATUSES } from '@dsp/business';

export default {
  contact: {
    response: {
      timeAgo: 'il y a {time}'
    },
    submitError: "Une erreur est survenue lors de l'envoi de la réponse",
    details: {
      email: 'Email:',
      content: 'Message:',
      response: 'Réponse(s):',
      send: 'Répondre',
      seeMore: 'voir fiche utilisateur'
    },
    status: {
      [CONTACT_STATUSES.DONE]: 'Traité',
      [CONTACT_STATUSES.NOT_DONE]: 'A traiter',
      [CONTACT_STATUSES.PENDING]: 'En cours'
    },
    form: {
      response: 'Réponse'
    }
  }
};
