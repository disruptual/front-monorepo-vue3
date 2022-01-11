export default {
  toasts: {
    orderHistory: {
      forwardError: "La commande n'a pas pu être avancée.",
      rollbackError: 'Le retour en arrière de la commande a échoué.'
    },

    announcement: {
      removeError:
        "Un ou plusieurs messages d'annonces n'ont pas pu être supprimés",
      createError: "Le message d'annonce n'a pas pu être créé.",
      removeSuccess: 'Suppression réussie.'
    },

    user: {
      muteSuccess:
        "L'utilisateur est désormais en mode silencieux | Les utilisateurs sont désormais en mode silencieux.",
      muteError:
        "L'utilisateur n'a pas pu être passé en mode silencieux | Un ou plusieurs utilisateurs n'ont pas pu être passés en mode silencieux.",
      unMuteSuccess: "L'utilisateurs n'est plus en mode silencieux",
      unMuteError: "L'utilisateur n'a pas pu être débloqué",
      anonymizeSuccess: "L'utilisateur a été anonymisé avec succès.",
      anonymizeError: "L'utilisateur n'a pas pu être anonymisé.",
      creditSuccess: "La cagnotte de l'utilisateur a été créditée",
      creditError: "La cagnotte de l'utilisateur n'a pas pu être créditée"
    },
    email:{
      updateSuccess:"L'email a été mise à jour",
      updateError:"L'email n'a pas été mise à jour"

    }
  }
};
