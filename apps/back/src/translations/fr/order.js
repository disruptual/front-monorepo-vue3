import { ORDER_DETAILS_TABS } from '@/utils/constants';
import { ORDER_STATE_TRANSITIONS } from '@dsp/business/';

export default {
  order: {
    details: {
      tabs: {
        [ORDER_DETAILS_TABS.INFOS]: 'Informations',
        [ORDER_DETAILS_TABS.ITEMS]: 'Articles',
        [ORDER_DETAILS_TABS.HISTORY]: 'Suivi de commande'
      }
    },
    status: {
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
      [ORDER_STATE_TRANSITIONS.DELIVERY]: "Récupéré par l'acheteur",
      [ORDER_STATE_TRANSITIONS.DELIVERY_BY_ORDER_ACCEPTED]:
        "Récupéré par l'acheteur",
      [ORDER_STATE_TRANSITIONS.DELIVERY_BY_SENT]: "Récupéré par l'acheteur",
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
      [ORDER_STATE_TRANSITIONS.VALIDATION_BY_SENT]: 'Finalisée'
    }
  }
};
