export default {
  form: {
    errors: {
      required: 'Veuillez remplir ce champ',
      min: 'Ce champ doit être supérieur à {min}',
      max: 'Ce champ doit être inférieur à {max}',
      minlength: 'Ce champ doit comporter au moins {length} caractères',
      maxlength: 'Ce champ doit comporter moins de {length} caractères',
      pattern: "Ce champ n'a pas la bonne forme",
      isIn: 'Ce champ doit inclure les valeurs suivantes : {values}',
      isNotIn: 'Ce champ ne doit pas inclure les valeurs suivantes : {values}',
      email: "Ce champ n'est pas une adresse email valide",
      passwordMatch: 'Les mots de passe ne correspondent pas.',
      containsUppercase: 'Ce champ doit comporter au moins une majuscule',
      containsLowercase: 'Ce champ doit comporter au moins une minuscule',
      containsNumber: 'Ce champ doit comporter au moins un chiffre'
    }
  }
};
