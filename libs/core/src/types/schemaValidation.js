import { typeValidators as validators } from './validators';
import { transformers } from './transformers';
import { types as helpers } from './helpers';
import { isUndefinedOrNull } from '@dsp/core/';
import * as types from './types';
import { merge } from 'lodash-es';

function _getDefaultValue(schema) {
  if (schema.type === types.OBJECT) {
    return Object.fromEntries(
      Object.entries(schema.shape).map(([key, value]) => [
        key,
        _getDefaultValue(value)
      ])
    );
  }

  return schema.default;
}

function _normalizeValue(name, key, schema, value) {
  const transformer = transformers[schema.type];
  if (isUndefinedOrNull(value))
    return transformer(_getDefaultValue(schema), schema);

  const isValid = _validateValue(name, key, schema, value);

  if (!isValid) return transformer(_getDefaultValue(schema), schema);

  if (schema.type === types.OBJECT)
    return transformer(merge({}, _getDefaultValue(schema), value), schema);

  return transformer(value, schema);
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

export const toProps = (name, schema, { isVariant = false } = {}) => {
  const definition = schema(helpers);

  const entries = Object.entries(definition).map(([key, schema]) => [
    key,
    {
      type: schema.propType,
      validator(value) {
        return _validateValue(name, key, schema, value);
      },
      default: _normalizeValue(
        name,
        key,
        schema,
        isVariant ? schema.default : undefined
      )
    }
  ]);

  return Object.fromEntries(entries);
};
