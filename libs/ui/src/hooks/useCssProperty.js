const registeredProperties = new Map();

export const useCssProperty = definition => {
  if (registeredProperties.has(definition.name)) return;

  if (CSS.registerProperty) {
    registeredProperties.set(definition.name, definition);
    CSS.registerProperty(definition);
  }
};
