import { ORDER_DETAILS_TABS } from '@/utils/constants';
import {
  ORDER_STATE_TRANSITIONS,
  ORDER_PROBLEM_STATE_TRANSITIONS,
  ORDER_STATES,
  ORDER_PROBLEM_STATES,
  ORDER_DELIVERY_STATES
} from '@dsp/business';

export default {
  order: {
    details: {
      tabs: {
        [ORDER_DETAILS_TABS.INFOS]: 'Informations',
        [ORDER_DETAILS_TABS.ITEMS]: 'Articles',
        [ORDER_DETAILS_TABS.HISTORY]: 'Suivi de commande'
      },
      title: {
        informations: 'Informations générales',
        buyer: { male: 'Acheteur', female: 'Acheteuse' },
        seller: { male: 'Vendeur', female: 'Vendeuse' },
        remuneration: 'Rémuneration'
      },
      label: {
        status: 'Status',
        orderDate: 'Date de commande',
        numberArticles: "Nombre d'articles",
        modeDelivery: 'Mode de livraison',
        numExpedition: "Numéro d'expédition",
        storeInOut: 'Magasin de dépôt/retrait',
        mondialRelay: {
          trackingNumber: 'Numéro de Suivi MondialRelay',
          downloadEtiquette: "Télécharger l'étiquette de suivi MondialRelay"
        },
        relaisColis: {
          trackingNumber: 'Numero de Suivi Relais Colis',
          downloadEtiquette: "Télécharger l'étiquette de suivi Relais Colis"
        }
      }
    },
    status: {
      [ORDER_STATES.DELIVERED]: 'Récupérée',
      [ORDER_STATES.DISTRIBUTED]: 'Reçue',
      [ORDER_STATES.END]: 'Finalisée',
      [ORDER_STATES.ORDERED]: 'En attente de validation',
      [ORDER_STATES.ORDER_ACCEPTED]: 'Validée par le vendeur',
      [ORDER_STATES.DELIVERY_IN_PROGRESS]: 'En cours de livraison',
      [ORDER_STATES.SENT]: 'Envoyée',
      [ORDER_STATES.STORE_TO_STORE_VALIDATED]: 'Acceptée par le magasin',
      [ORDER_STATE_TRANSITIONS.ORDERED]: 'Commandée',
      [ORDER_STATE_TRANSITIONS.ORDER_ACCEPTED_BY_SELLER]: 'A envoyer',
      [ORDER_STATE_TRANSITIONS.BUYER_IN_STORE_ACCEPT]:
        "Récupérée en magasin par l'acheteur",
      [ORDER_STATE_TRANSITIONS.BUYER_IN_STORE_REFUSE]:
        "Refusé en magasin par l'acheteur",
      [ORDER_STATE_TRANSITIONS.CANCEL]: 'Annulée par le vendeur',
      [ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC]: 'Annulée automatiquement',
      [ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_DISTRIBUTED]:
        'Annuléeautomatiquement',
      [ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED]:
        'Annulée automatiquement',
      [ORDER_STATE_TRANSITIONS.DELIVERY]: "Récupérée par l'acheteur",
      [ORDER_STATE_TRANSITIONS.DELIVERY_BY_ORDER_ACCEPTED]:
        "Récupérée par l'acheteur",
      [ORDER_STATE_TRANSITIONS.DELIVERY_BY_SENT]: "Récupérée par l'acheteur",
      [ORDER_STATE_TRANSITIONS.DELIVERY_CANCELLED]: 'Livraison annulée',
      [ORDER_STATE_TRANSITIONS.DELIVERY_COMPLETED]: 'Livraison terminée',
      [ORDER_STATE_TRANSITIONS.DISTRIBUTION_BY_ORDER_ACCEPTED]:
        'Déposée par le vendeur',
      [ORDER_STATE_TRANSITIONS.DISTRIBUTION_BY_SENT]:
        'Arrivée en point de retrait',
      [ORDER_STATE_TRANSITIONS.ORDER_ACCEPTANCE]: 'Validée',
      [ORDER_STATE_TRANSITIONS.LOST_PACKAGE]: 'Perdue',
      [ORDER_STATE_TRANSITIONS.SELLER_RECOVERY]: 'Récupérée par le vendeur',
      [ORDER_STATE_TRANSITIONS.STORE_ACCEPT]: 'Acceptée par le magasin',
      [ORDER_STATE_TRANSITIONS.SEND]: 'Envoyée',
      [ORDER_STATE_TRANSITIONS.STORE_TO_STORE_ACCEPT]:
        'Acceptée par le magasin',
      [ORDER_STATE_TRANSITIONS.STORE_LOSE_PACKAGE]: 'Perdue par le magasin',
      [ORDER_STATE_TRANSITIONS.STORE_TO_STORE_LOST_PACKAGE_BEFORE_TRANSIT]:
        'En transit vers le magasin de retrait',
      [ORDER_STATE_TRANSITIONS.STORE_REFUSE]: 'Refusée par le magasin',
      [ORDER_STATE_TRANSITIONS.TO_GIVE_TO_AN_ASSOCIATION]:
        'Donnée à une association',
      [ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_DELIVERED]:
        'Finalisée automatiquement',
      [ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_ORDER_ACCEPTED]:
        'Finalisée automatiquement',
      [ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_SENT]:
        'Finalisée automatiquement',
      [ORDER_STATE_TRANSITIONS.VALIDATION_BY_DELIVERED]: 'Finalisée',
      [ORDER_STATE_TRANSITIONS.VALIDATION_BY_ORDER_ACCEPTED]: 'Finalisée',
      [ORDER_STATE_TRANSITIONS.VALIDATION_BY_SENT]: 'Finalisée',
      [ORDER_PROBLEM_STATES.PROBLEM]: 'Litige en cours',
      [ORDER_PROBLEM_STATES.DISPUTED]: 'Litige en cours',
      [ORDER_PROBLEM_STATE_TRANSITIONS.INIT_PROBLEM]: 'Litige en cours',
      [ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_IS_SOLVED_BY_USERS]:
        'Litige résolu',
      [ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_NEED_CUSTOMER_SERVICE]:
        'Litige en cours (service client)',
      [ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_IS_SOLVED_BY_CUSTOMER_SERVICE]:
        'Litige résolu',
      [ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_IS_SOLVED_AUTOMATICALLY]:
        'Litige résolu',
      [ORDER_DELIVERY_STATES.START]: 'A envoyer'
    }
  }
};
