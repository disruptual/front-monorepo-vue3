import { USER_ROLES } from '@dsp/business';
import { USER_DETAILS_TABS } from '@/utils/constants';

export default {
  user: {
    roles: {
      [USER_ROLES.USER]: 'Utilisateur',
      [USER_ROLES.ADMIN]: 'Administrateur',
      [USER_ROLES.PROJECT_MANAGER]: 'Chef de projet',
      [USER_ROLES.STORE]: 'Magasin',
      [USER_ROLES.DAF]: 'DAF',
      [USER_ROLES.EVENT_MANAGER]: 'Magasin événement'
    },

    details: {
      tabs: {
        [USER_DETAILS_TABS.INFOS]: 'Informations',
        [USER_DETAILS_TABS.ITEMS]: 'Articles',
        [USER_DETAILS_TABS.ORDERS]: 'Achats',
        [USER_DETAILS_TABS.SALES]: 'Ventes',
        [USER_DETAILS_TABS.REVIEWS]: 'Avis automatiques'
      },
      editModeSwitchLabel: 'Mode édition',
      lastName: 'Nom',
      firstName: 'Prénom',
      email: 'E-mail',
      bio: 'Description',
      phone: 'N° de téléphone',
      password: 'Mot de passe',
      passwordConfirm: 'Confirmer le mot de passe',
      deliveries: 'Modes de livraison activés',
      ibanCount: "Nombre d'ibans",
      itemCount: "Nombre d'articles",
      orderCount: 'Nombre de commandes',
      roles: 'Rôles',
      seeDetails: 'Voir le détail',
      moneyPotCash: 'Montant en cagnotte Cash',
      moneyPotGiftcard: 'Montant en cagnotte Carte Cadeau',
      address: 'Adresse principale',
      noAddress: "Cet utilisateur n'a pas renseigné d'adresse principale",
      transactionWithdrawn: 'Suspecté de fraude depuis le {date}',
      ssoCustomerId: "N° d'identifiant SSO",
      username: 'Pseudo',
      form: {
        cancel: 'Annuler',
        submit: 'Enregistrer'
      }
    },

    anonymizeModal: {
      title: 'Êtes vous sûr de vouloir anonymiser {user} ?',
      alert: 'Cette action est irréversible.'
    },

    deleteReviewModal: {
      title: 'Êtes vous sûr de vouloir supprimer cet avis ?',
      alert: 'Cette action est irréversible.'
    },

    creditModal: {
      title: 'Créditer la cagnotte de {user}',
      alert: 'Cette action est irréversible.'
    },

    mute: 'Passer en mode silencieux',
    unmute: 'Retirer le mode silencieux',
    isMuted: 'Mode silencieux'
  }
};
