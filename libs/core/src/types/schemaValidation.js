import { typeValidators as validators } from './validators';
import { transformers } from './transformers';
import { types as helpers } from './helpers';
import { isUndefinedOrNull } from '@dsp/core/';

function _normalizeValue(name, key, schema, value) {
  const transformer = transformers[schema.type];
  if (isUndefinedOrNull(value)) return transformer(schema.default, schema);

  const isValid = _validateValue(name, key, schema, value);

  return isValid
    ? transformer(value, schema)
    : transformer(schema.default, schema);
}

function _validateValue(name, key, schema, value) {
  if (!validators[schema.type]) {
    console.warn(
      `the prop type ${schema.type} doesn't exist ! This will result in a missing prop on component ${name}`
    );
  }
  const validator = validators[schema.type];
  const isValid = validator(schema, value);

  if (!isValid) {
    console.warn(
      `Wrong type for parameter ${key} on ${name}, expected ${schema.type}, recieved ${value}`
    );

    return false;
  }

  return true;
}

export const toConfig = (name, schema, config, props) => {
  const definition = schema(helpers);

  const entries = Object.entries(definition).map(([key, schema]) => [
    key,
    _normalizeValue(name, key, schema, props?.[key] ?? config?.[key])
  ]);

  return Object.fromEntries(entries);
};

export const toProps = (name, schema) => {
  const definition = schema(helpers);

  const entries = Object.entries(definition).map(([key, schema]) => [
    key,
    {
      type: schema.propType,
      validator(value) {
        return _validateValue(name, key, schema, value);
      },
      default: undefined
    }
  ]);

  return Object.fromEntries(entries);
};
