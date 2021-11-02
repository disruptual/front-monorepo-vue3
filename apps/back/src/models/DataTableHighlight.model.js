import { DATATABLE_HIGHLIGHT_OPERATORS } from '@/utils/constants';

const matchers = {
  [DATATABLE_HIGHLIGHT_OPERATORS.STRING.EQUALS](predicate, value) {
    return predicate === value;
  },
  [DATATABLE_HIGHLIGHT_OPERATORS.STRING.INCLUDES](predicate, value) {
    return predicate.includes(value);
  },
  [DATATABLE_HIGHLIGHT_OPERATORS.STRING.STARTS_WITH](predicate, value) {
    return predicate.startsWith(value);
  },
  [DATATABLE_HIGHLIGHT_OPERATORS.STRING.ENDS_WITH](predicate, value) {
    return predicate.endsWith(value);
  },
  [DATATABLE_HIGHLIGHT_OPERATORS.NUMBER.EQUALS](predicate, value) {
    return predicate === value;
  },
  [DATATABLE_HIGHLIGHT_OPERATORS.NUMBER.LOWER_THAN](predicate, value) {
    return predicate < value;
  },
  [DATATABLE_HIGHLIGHT_OPERATORS.NUMBER.GREATER_THAN](predicate, value) {
    return predicate > value;
  },
  [DATATABLE_HIGHLIGHT_OPERATORS.BOOLEAN.TRUE](predicate) {
    return predicate === true;
  },
  [DATATABLE_HIGHLIGHT_OPERATORS.DATE.BEFORE](predicate) {
    // @TODO
    return false;
  },
  [DATATABLE_HIGHLIGHT_OPERATORS.BOOLEAN.AFTER](predicate) {
    // @TODO
    return false;
  }
};

export class DataTableHighlight {
  constructor({ column, color, value, operator, name }) {
    this.column = column;
    this.color = color;
    this.value = value;
    this.operator = operator;
    this.name = name;
    this.isActive = true;
  }

  isMatch(predicate) {
    return matchers[this.operator](predicate, this.value);
  }
}
