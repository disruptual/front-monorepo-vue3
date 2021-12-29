import { DATATABLE_HIGHLIGHT_OPERATORS } from '@/utils/constants';

export default {
  dataTable: {
    actionBar: {
      selectedCount:
        'Aucun élément selectionné | 1 élément sélectionné | {count} éléments sélectionnés'
    },
    highlights: {
      [DATATABLE_HIGHLIGHT_OPERATORS.STRING.EQUALS]: 'est',
      [DATATABLE_HIGHLIGHT_OPERATORS.STRING.INCLUDES]: 'contient',
      [DATATABLE_HIGHLIGHT_OPERATORS.STRING.STARTS_WITH]: 'commence par',
      [DATATABLE_HIGHLIGHT_OPERATORS.STRING.ENDS_WITH]: 'finit par',
      [DATATABLE_HIGHLIGHT_OPERATORS.NUMBER.EQUALS]: 'est égal à',
      [DATATABLE_HIGHLIGHT_OPERATORS.NUMBER.LOWER_THAN]: 'est plus petit que',
      [DATATABLE_HIGHLIGHT_OPERATORS.NUMBER.GREATER_THAN]: 'est plus grand que',
      [DATATABLE_HIGHLIGHT_OPERATORS.BOOLEAN.TRUE]: 'est vrai',
      [DATATABLE_HIGHLIGHT_OPERATORS.BOOLEAN.FALSE]: 'est faux',
      [DATATABLE_HIGHLIGHT_OPERATORS.DATE.BEFORE]: 'est avant',
      [DATATABLE_HIGHLIGHT_OPERATORS.DATE.AFTER]: 'est après',
      [DATATABLE_HIGHLIGHT_OPERATORS.ENUM.EQUALS]: 'est'
    }
  }
};
