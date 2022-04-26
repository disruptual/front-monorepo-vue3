export default {
  location: {
    enabled: 'Ce magasin est actif',
    disabled: 'Ce magasin est inactif',
    details: {
      form: {
        editModeSwitchLabel: 'Mode éditable',
        name: 'Nom du magasin',
        route: 'Rue',
        additional: 'Adresse additionnel',
        postalCode: 'Code Postal',
        city: 'Ville',
        country: 'Pays',
        phone: 'Numéro de téléphone',
        email: 'Email Principal',
        schedule: {
          title: 'Horaires',
          weekDays: {
            0: 'Lundi',
            1: 'Mardi',
            2: 'Mercredi',
            3: 'Jeudi',
            4: 'Vendredi',
            5: 'Samedi',
            6: 'Dimanche',
            // some project use strings, other use numbers...
            MONDAY: 'Lundi',
            TUESDAY: 'Mardi',
            WEDNESDAY: 'Mercredi',
            THURSDAY: 'Jeudi',
            FRIDAY: 'Vendredi',
            SATURDAY: 'Samedi',
            SUNDAY: 'Dimanche'
          }
        },
        cancel: 'Annuler',
        submit: 'Valider'
      }
    }
  }
};
