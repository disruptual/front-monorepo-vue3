import { ORDER_DETAILS_TABS, STORE_OPERATIONS } from '@/utils/constants';
import {
  ORDER_STATE_TRANSITIONS,
  ORDER_PROBLEM_STATE_TRANSITIONS,
  ORDER_STATES,
  ORDER_PROBLEM_STATES,
  ORDER_DELIVERY_STATES,
  ORDER_DELIVERY_STATE_TRANSITIONS,
  DELIVERY_MODES
} from '@dsp/business';

export default {
  order: {
    details: {
      noResultBuyer: "Informations de l'acheteur non disponibles.",
      noResultSeller: 'Informations du vendeur non disponibles.',
      tabs: {
        [ORDER_DETAILS_TABS.INFOS]: 'Informations',
        [ORDER_DETAILS_TABS.ITEMS]: 'Articles',
        [ORDER_DETAILS_TABS.HISTORY]: 'Suivi de commande'
      },
      title: {
        page: 'Détails commande n°',
        informations: 'Informations générales',
        buyer: { male: 'Acheteur', female: 'Acheteuse' },
        seller: { male: 'Vendeur', female: 'Vendeuse' },
        remuneration: 'Rémunération'
      },
      label: {
        status: 'Status',
        orderDate: 'Date de commande',
        numberArticles: "Nombre d'articles",
        modeDelivery: 'Mode de livraison',
        numExpedition: "Numéro d'expédition",
        storeInOut: 'Magasin de dépôt/retrait',
        trackingNumber: 'Numéro de Suivi',
        downloadEtiquette: "Télécharger l'étiquette de suivi",
        modeRemuneration: 'Mode de rémunération',
        serviceFees: 'Frais de service',
        shippingFees: 'Frais de livraison',
        reimbursementAmount: 'Montant remboursé',
        abundantAmount: 'Montant abondement',
        creditedTotal: 'Total crédité au vendeur',
        totalAmount: 'Montant total',
        itemsAmount: 'Montant des articles'
      },
      closeProblemButton: 'Clore le litige',
      solveProblemButton: 'Résoudre le litige',
      printEtiquette: "Voir l'étiquette",
      etiquetteTitle: {
        [DELIVERY_MODES.LAPOSTE_COLISSIMO]: `Commande N°{orderId} - Bordereau de livraison Colissimo`,
        [DELIVERY_MODES.LAPOSTE_LETTER]: `Commande N°{orderId} - Bordereau de livraison Lettre suivie`
      }
    },
    status: {
      [ORDER_DELIVERY_STATES.DELIVERED]: 'Récupérée',
      [ORDER_DELIVERY_STATES.DISTRIBUTED]: 'Reçue',
      [ORDER_STATES.END]: 'Finalisée',
      [ORDER_STATES.ORDERED]: 'En attente de validation',
      [ORDER_STATES.ORDER_ACCEPTED]: 'Validée par le vendeur',
      [ORDER_DELIVERY_STATES.DELIVERY_IN_PROGRESS]: 'En cours de livraison',
      [ORDER_DELIVERY_STATE_TRANSITIONS.CARRIER_FOUND]: 'Transporteur trouvé',
      [ORDER_DELIVERY_STATES.CARRIER_SEARCH_IN_PROGRESS]:
        'Recherche de transporteur en cours',
      [ORDER_DELIVERY_STATES.SENT]: 'Envoyée',
      [ORDER_DELIVERY_STATES.STORE_TO_STORE_VALIDATED]:
        'Acceptée par le magasin',
      [ORDER_DELIVERY_STATES.STORE_TO_STORE_IN_TRANSIT]:
        'En cours de livraison',
      [ORDER_STATE_TRANSITIONS.ORDERED]: 'Commandée',
      [ORDER_STATE_TRANSITIONS.ORDER_ACCEPTED_BY_SELLER]: 'A envoyer',
      [ORDER_STATE_TRANSITIONS.BUYER_IN_STORE_ACCEPT]:
        "Récupérée en magasin par l'acheteur",
      [ORDER_DELIVERY_STATES.RECOVERY_IN_RELAY_BY_BUYER_IN_PROGRESS]:
        "Récupération en cours par l'acheteur",
      [ORDER_DELIVERY_STATE_TRANSITIONS.RECOVERED_IN_RELAY_BY_BUYER]:
        "Récupérée par l'acheteur",
      [ORDER_STATE_TRANSITIONS.BUYER_IN_STORE_REFUSE]:
        "Refusée en magasin par l'acheteur",
      [ORDER_DELIVERY_STATES.TRANSFER_TO_DESTINATION_MAILBOX_IN_PROGRESS]:
        "Dépôt dans la boîte aux lettres de l'acheteur en cours",
      [ORDER_DELIVERY_STATE_TRANSITIONS.PACKAGE_HANDLED_BY_CARRIER]:
        "Dépôt dans la boîte aux lettres de l'acheteur en cours",
      [ORDER_DELIVERY_STATES.TRANSFER_TO_DESTINATION_RELAY_IN_PROGRESS]:
        'En cours de livraison',
      [ORDER_DELIVERY_STATES.TRANSFER_TO_POST_OFFICE_IN_PROGRESS]:
        'En cours de livraison',
      [ORDER_STATE_TRANSITIONS.CANCEL]: 'Annulée par le vendeur',
      [ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC]: 'Annulée automatiquement',
      [ORDER_DELIVERY_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_DISTRIBUTED]:
        'Annulée automatiquement',
      [ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED]:
        'Annulée automatiquement',
      [ORDER_DELIVERY_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED]:
        'Annulée automatiquement',
      [ORDER_DELIVERY_STATE_TRANSITIONS.DELIVERY]: "Récupérée par l'acheteur",
      // [ORDER_STATE_TRANSITIONS.DELIVERY_BY_ORDER_ACCEPTED]:
      //   "Récupérée par l'acheteur",
      [ORDER_DELIVERY_STATE_TRANSITIONS.DELIVERY_BY_SENT]:
        "Récupérée par l'acheteur",
      [ORDER_DELIVERY_STATES.PACKAGE_VALIDATION_BY_BUYER_IN_PROGRESS]:
        "En attente de validation par l'acheteur",
      [ORDER_DELIVERY_STATE_TRANSITIONS.DELIVERED_TO_BUYER]:
        "En attente de validation par l'acheteur",

      [ORDER_DELIVERY_STATES.PACKAGE_RECOVER_BY_BUYER_IN_PROGRESS]:
        'A récupérer',
      [ORDER_DELIVERY_STATE_TRANSITIONS.DELIVERY_TO_BUYER]: 'A récupérer',

      [ORDER_STATE_TRANSITIONS.DELIVERY_CANCELLED]: 'Livraison annulée',
      [ORDER_STATE_TRANSITIONS.DELIVERY_COMPLETED]: 'Livraison terminée',
      [ORDER_STATE_TRANSITIONS.DISTRIBUTION_BY_ORDER_ACCEPTED]:
        'Déposée par le vendeur',
      [ORDER_DELIVERY_STATE_TRANSITIONS.DISTRIBUTION_BY_SENT]:
        'Arrivée en point de retrait',
      [ORDER_STATE_TRANSITIONS.ORDER_ACCEPTANCE]: 'Validée',
      //[ORDER_STATE_TRANSITIONS.LOST_PACKAGE]: 'Perdue',
      [ORDER_STATE_TRANSITIONS.SELLER_RECOVERY]: 'Récupérée par le vendeur',
      [ORDER_DELIVERY_STATES.RECOVERY_IN_RELAY_BY_BUYER_IN_PROGRESS]:
        'A récupérer',
      [ORDER_DELIVERY_STATE_TRANSITIONS.STORE_ACCEPT]:
        'Acceptée par le magasin',
      [ORDER_DELIVERY_STATE_TRANSITIONS.SEND]: 'Envoyée',
      [ORDER_DELIVERY_STATE_TRANSITIONS.STORE_TO_STORE_ACCEPT]:
        'Acceptée par le magasin',
      [ORDER_DELIVERY_STATE_TRANSITIONS.STORE_LOSE_PACKAGE]:
        'Perdue par le magasin',
      [ORDER_DELIVERY_STATE_TRANSITIONS.STORE_TO_STORE_LOST_PACKAGE_BEFORE_TRANSIT]:
        'En transit vers le magasin de retrait',
      [ORDER_DELIVERY_STATE_TRANSITIONS.STORE_REFUSE]: 'Refusée par le magasin',
      [ORDER_STATE_TRANSITIONS.TO_GIVE_TO_AN_ASSOCIATION]:
        'Donnée à une association',
      [ORDER_DELIVERY_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_DELIVERED]:
        'Finalisée automatiquement',
      [ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_ORDER_ACCEPTED]:
        'Finalisée automatiquement',
      [ORDER_DELIVERY_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_SENT]:
        'Finalisée automatiquement',
      [ORDER_DELIVERY_STATE_TRANSITIONS.VALIDATION_BY_DELIVERED]: 'Finalisée',
      [ORDER_STATE_TRANSITIONS.VALIDATION_BY_ORDER_ACCEPTED]: 'Finalisée',
      [ORDER_DELIVERY_STATE_TRANSITIONS.VALIDATION_BY_SEND]: 'Finalisée',
      [ORDER_DELIVERY_STATES.START]: 'À envoyer',
      [ORDER_DELIVERY_STATES.DEPOSIT_PACKAGE_IN_PROGRESS]: 'À déposer',
      [ORDER_DELIVERY_STATES.DEPOSIT_TO_COLLECTION_POINT_IN_PROGRESS]:
        'À envoyer',
      [ORDER_DELIVERY_STATES.PACKING_IN_PROGRESS]: 'À envoyer',
      [ORDER_DELIVERY_STATES.DEPOSIT_IN_MAILBOX_BY_SELLER_IN_PROGRESS]:
        'En attente d’envoi courrier',
      [ORDER_DELIVERY_STATES.DEPOSIT_IN_RELAY_BY_SELLER_IN_PROGRESS]:
        'Dépôt en relais en cours',
      [ORDER_DELIVERY_STATE_TRANSITIONS.PACKAGE_NOT_DEPOSITED_BY_SELLER]:
        'Colis non déposé par le vendeur',
      [ORDER_DELIVERY_STATE_TRANSITIONS.EXPEDITION_CREATED_BY_SELLER]:
        'Expédition créée par le vendeur',
      [ORDER_PROBLEM_STATES.PROBLEM]: 'Litige en cours',
      [ORDER_PROBLEM_STATES.DISPUTED]: 'Litige en cours (service client)',
      [ORDER_PROBLEM_STATE_TRANSITIONS.INIT_PROBLEM]: 'Litige en cours',
      [ORDER_PROBLEM_STATE_TRANSITIONS.REFUND_PROPOSAL]:
        'Proposition de remboursement',
      [ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_IS_SOLVED_BY_USERS]:
        'Litige résolu',
      [ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_NEED_CUSTOMER_SERVICE]:
        'Litige en cours (service client)',
      [ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_IS_SOLVED_BY_CUSTOMER_SERVICE]:
        'Litige résolu',
      [ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_IS_SOLVED_AUTOMATICALLY]:
        'Litige résolu',
      [DELIVERY_MODES.LAPOSTE_COLISSIMO]: {
        [ORDER_DELIVERY_STATES.PACKAGE_RECOVER_BY_BUYER_IN_PROGRESS]: 'Livrée'
      }
    },
    store: {
      invalidMessages: {
        wrongDelivery: "Cette commande n'utilise pas la livraison en magasin",
        ORDERED: "Cette commande n'a pas été validée par la vendeuse",
        NOT_DELIVERED:
          "Retrait impossible. La date de retrait est dépassée et la commande est annulée. L'acheteuse a été remboursée",
        DELIVERED: 'Cette commande a déjà été récupérée',
        END: {
          CANCEL: 'La commande a été annulée par le vendeur',
          CANCEL_AUTOMATIC:
            "Dépôt impossible. La date de dépôt est dépassée et la commande est annulée. L'acheteuse a été remboursée",
          CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED:
            "Dépôt impossible. La date de dépôt est dépassée et la commande est annulée. L'acheteuse a été remboursée",
          CANCEL_AUTOMATIC_BY_DISTRIBUTED: 'La date de retrait a été dépassée.',
          VALIDATION_BY_DELIVERED: 'Cette commande a déjà été traitée',
          BUYER_IN_STORE_ACCEPT: 'Cette commande a déjà été traitée',
          STORE_TO_STORE_LOST_PACKAGE_AFTER_TRANSIT:
            'Le colis a été perdu pendant le transit vers le magasin de retrait.',
          STORE_TO_STORE_LOST_PACKAGE_BEFORE_TRANSIT:
            'Le colis a été perdu pendant le transit vers le magasin de retrait.'
        }
      },
      operations: {
        [STORE_OPERATIONS.SELLER_DEPOSIT]: 'Valider le dépôt',
        [STORE_OPERATIONS.BUYER_PICKUP]: 'Valider le retrait',
        [STORE_OPERATIONS.SELLER_PICKUP]: 'Valider la récupération'
      }
    }
  }
};
