import {
  DELIVERY_MODES,
  ORDER_STATES,
  ORDER_STATE_TRANSITIONS,
  ORDER_PROBLEM_STATE_TRANSITIONS
} from '@dsp/business';

export default {
  orderHistory: {
    warning:
      "Il n'est pas possible de revenir en arrière dans l'état d'une commande si celle-ci est finalisée ou qu'elle a subi un litige. Il est également impossible de revenir avant la validation de la commande par le vendeur.",
    next: "Avancer l'état",
    previous: "Revenir à l'état",
    [DELIVERY_MODES.COLISSIMO]: {
      [ORDER_STATES.DELIVERED]: {
        description:
          '{buyer} doit valider la conformité de la commande avant le {maxDate}'
      },
      [ORDER_STATES.ORDERED]: {
        description: '{seller} doit valider la vente avant le {maxDate}'
      },
      [ORDER_STATES.ORDER_ACCEPTED]: {
        description:
          '{seller} a validé la vente et doit envoyer son colis avant {maxDate}'
      },
      [ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED]: {
        description:
          "{seller} n'a pas déposé la commande. {buyer} a été recrédité dans sa cagnotte cash."
      }
    },
    [DELIVERY_MODES.LAPOSTE_COLISSIMO]: {
      [ORDER_STATES.DELIVERED]: {
        description:
          '{buyer} doit valider la conformité de la commande avant le {maxDate}'
      },
      [ORDER_STATES.ORDERED]: {
        description: '{seller} doit valider la vente avant le {maxDate}'
      },
      [ORDER_STATES.ORDER_ACCEPTED]: {
        description:
          '{seller}  a validé la vente et doit envoyer son colis avant {maxDate}'
      },
      [ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED]: {
        description:
          "{seller} n'a pas déposé la commande. {buyer} a été recrédité dans sa cagnotte cash."
      }
    },
    [DELIVERY_MODES.LAPOSTE_LETTER_FOLLOW]: {
      [ORDER_STATES.DELIVERED]: {
        description:
          '{buyer} doit valider la conformité de la commande avant le {maxDate}'
      },
      [ORDER_STATES.ORDERED]: {
        description: '{seller} doit valider la vente avant le {maxDate}'
      },
      [ORDER_STATES.ORDER_ACCEPTED]: {
        description:
          '{seller}  a validé la vente et doit envoyer son colis avant {maxDate}'
      },
      [ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED]: {
        description:
          "{seller} n'a pas déposé la commande. {buyer} a été recrédité dans sa cagnotte cash."
      },
      [ORDER_STATES.DELIVERY_IN_PROGRESS]: {
        description:
          '{seller} a validé la vente et doit envoyer son colis avant {maxDate}'
      }
    },
    [DELIVERY_MODES.HAND]: {
      [ORDER_STATES.DELIVERED]: {
        description:
          '{buyer} devez valider la conformité de la commande avant le {maxDate}'
      },
      [ORDER_STATES.ORDERED]: {
        description: '{seller} doit valider la vente avant le {maxDate}'
      },
      [ORDER_STATES.ORDER_ACCEPTED]: {
        description:
          '{seller} a validé la vente, et doit remettre la commande avant le {maxDate}'
      }
    },
    [DELIVERY_MODES.LOCATION]: {
      [ORDER_STATES.DELIVERED]: {
        description:
          '{buyer} devez valider la conformité de la commande avant le {maxDate}  '
      },
      [ORDER_STATES.ORDERED]: {
        description: '{seller} doit valider la vente avant le {maxDate}'
      },
      [ORDER_STATES.ORDER_ACCEPTED]: {
        description:
          '{seller} a validé la vente et doit déposer son colis avant le {maxDate}'
      },
      [ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED]: {
        description:
          "{seller} n'a pas déposé la commande. {buyer} a été recrédité dans sa cagnotte cash."
      }
    },
    [DELIVERY_MODES.MONDIAL_RELAY]: {
      [ORDER_STATES.DELIVERED]: {
        description:
          '{buyer} doit valider la conformité de la commande avant le {maxDate}'
      },
      [ORDER_STATES.DISTRIBUTED]: {
        description: 'Commande à récupérer'
      },
      [ORDER_STATES.ORDERED]: {
        description: '{seller} doit valider la vente avant le {maxDate}'
      },
      [ORDER_STATES.ORDER_ACCEPTED]: {
        description:
          '{seller}  a validé la vente et doit envoyer son colis avant {maxDate}'
      },
      [ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED]: {
        description:
          "{seller} n'a pas déposé la commande. {buyer} a été recrédité dans sa cagnotte cash."
      }
    },
    [DELIVERY_MODES.RELAIS_COLIS]: {
      [ORDER_STATES.ORDERED]: {
        description: '{seller} doit valider la commande avant le {maxDate}'
      },
      [ORDER_STATES.ORDER_ACCEPTED]: {
        description:
          '{seller} a validé la vente et doit envoyer son colis avant le {maxDate}'
      },
      [ORDER_STATES.TRANSFER_TO_DESTINATION_RELAY_IN_PROGRESS]: {
        description:
          'Le colis est en cours de réception au relai de {destinationRelay}'
      },
      [ORDER_STATES.RECOVERY_IN_RELAY_BY_BUYER_IN_PROGRESS]: {
        description:
          '{buyer} pouvez aller récuperer la commande au relai de {destinationRelay}'
      }
    },
    [DELIVERY_MODES.COCOLIS]: {
      [ORDER_STATES.ORDERED]: {
        description: '{seller} doit valider la commande avant le {maxDate}'
      }
    }
  }
};
