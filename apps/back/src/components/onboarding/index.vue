<script>
export default { name: 'Onboarding' };
</script>

<script setup></script>

<template>
  <dsp-surface>
    <h2>Votre interface d'administration évolue ! 🚀</h2>
    <p>
      Et ce n'est qu'un début...
      <br />
      Nous avons revu cette interface afin de vous faciliter la gestion de votre
      plateforme et la rendre plus performante.
    </p>

    <p>Voici quelques-unes de nos améliorations :</p>
    <ul>
      <li>
        Retrouvez plus facilement un élément au sein d'une commande, tout en
        utilisant le fil d'ariane pour naviguer en arrière
      </li>
      <li>
        Adaptez la présentation de vos tableaux à vos préférences: affichez les
        colonnes qui vous intéressent, masquez les autres et surlignez les
        données que vous souhaitez isoler.
      </li>
      <li>Filtrez les commande par status ou mode de livraison.</li>
      <li>
        Renseignez les clients sur la prochaine étape de leur commande grâce aux
        informations de suivi
      </li>
      <li>
        La gestion des litiges a été améliorée : remboursez directement
        l'acheteur et le vendeur dans la même fenêtre, en visualisant les
        montants des articles, frais de livraison et frais de livraison.
      </li>
    </ul>

    <br />

    <p>
      Et nous continuons de faire évoluer cette interface, des nouveautés sont
      en préparation...Patience !
    </p>

    <p>
      Pour toute question et complément d'informations, n'hésitez pas à
      solliciter votre chef de projet.
    </p>

    <p>À très vite !</p>
  </dsp-surface>
</template>

<style lang="scss" scoped>
h2 {
  text-align: center;
}

p,
li {
  line-height: 1.5;
}

ul {
  list-style-type: disc;
  margin: 0;

  > li {
    margin-bottom: var(--spacing-);
  }
}
</style>
