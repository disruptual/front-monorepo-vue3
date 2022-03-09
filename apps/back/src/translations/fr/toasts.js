export default {
  toasts: {
    orderHistory: {
      forwardError: "La commande n'a pas pu être avancée.",
      rollbackError: 'Le retour en arrière de la commande a échoué.'
    },

    announcement: {
      removeError: "Une ou plusieurs annonces n'ont pas pu être supprimées",
      createError: "L'annonce n'a pas pu être créée.",
      removeSuccess: 'Suppression réussie.'
    },

    event: {
      removeError: "Un ou plusieurs événements n'ont pas pu être supprimés",
      createError: "L'événement n'a pas pu être créé.",
      createSuccess: "L'événement a été créé.",
      updateSuccess: "L'événement a été mis à jour.",
      removeSuccess: 'Suppression réussie.'
    },

    user: {
      blockSuccess:
        "L'utilisateur est désormais bloqué. | Les utilisateurs sont désormais bloqués.",
      blockError:
        "L'utilisateur n'a pas pu être bloqué. | Un ou plusieurs utilisateurs n'ont pas pu être bloqués.",
      unblockSuccess: "L'utilisateurs n'est plus bloqué",
      unblockError: "L'utilisateur n'a pas pu être débloqué",
      updateError: "L'utilisateur n'a pas pu être mis à jour",
      updateSuccess: "L'utilisateur a été mise à jour",
      muteSuccess:
        "L'utilisateur est désormais en mode silencieux | Les utilisateurs sont désormais en mode silencieux.",
      muteError:
        "L'utilisateur n'a pas pu être passé en mode silencieux | Un ou plusieurs utilisateurs n'ont pas pu être passés en mode silencieux.",
      unMuteSuccess: "L'utilisateurs n'est plus en mode silencieux",
      unMuteError: "L'utilisateur n'a pas pu être débloqué",
      anonymizeSuccess: "L'utilisateur a été anonymisé avec succès.",
      anonymizeError: "L'utilisateur n'a pas pu être anonymisé.",
      creditSuccess: "La cagnotte de l'utilisateur a été créditée",
      creditError: "La cagnotte de l'utilisateur n'a pas pu être créditée",
      unblockTransactionsSuccess:
        "Les transactions de l'utilisateur ne sont désormais plus bloquées",
      unblockTransactionsError:
        'Une erreur est survenue lors du changement de status de blocage des transactions',
      blockTransactionsSuccess:
        "Les transactions de l'utilisateur sont maintenant bloquées",
      blockTransactionsError:
        'Une erreur est survenue lors du changement de status de blocage des transactions'
    },

    email: {
      updateSuccess: "L'email a été mise à jour",
      updateError: "L'email n'a pas été mise à jour"
    },

    location: {
      updateSuccess: 'Le magasin a été mise à jour',
      updateError: "Le magasin n'a pas été mise à jour"
    },

    item: {
      unpublishInvalid:
        'Certains articles selectionnés ne peuvent pas être dépubliés.',
      deletehInvalid:
        'Certains articles selectionnés ne peuvent pas être supprimés.',
      republishInvalid:
        'Certains articles selectionnés ne peuvent pas être republiés.',
      updateError: "L'opération n'a pas pû être effectuée."
    }
  }
};
