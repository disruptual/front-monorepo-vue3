import * as validators from '@dsp/ui/utils/formValidators';

export class FormField {
  constructor({
    mode = null,
    initialValue = null,
    useInitialValueOnReset = true,
    debounceTimeout = 0
  } = {}) {
    this.mode = mode;
    this.initialValue = initialValue;
    this.validators = {};
    this.useInitialValueOnReset = useInitialValueOnReset;
    this.debounceTimeout = debounceTimeout;
  }

  required(...args) {
    this.validators.required = validators.required(...args);

    return this;
  }

  min(...args) {
    this.validators.min = validators.min(...args);

    return this;
  }

  max(...args) {
    this.validators.max = validators.max(...args);

    return this;
  }

  minlength(...args) {
    this.validators.minlength = validators.minlength(...args);

    return this;
  }

  maxlength(...args) {
    this.validators.maxlength = validators.maxlength(...args);

    return this;
  }

  pattern(...args) {
    this.validators.pattern = validators.pattern(...args);

    return this;
  }

  isIn(...args) {
    this.validators.isIn = validators.isIn(...args);

    return this;
  }

  email(...args) {
    this.validators.email = validators.email(...args);

    return this;
  }

  validator(name, { handler, message, options }, formContext) {
    this.validators[name] = validators.customValidator(handler, message, {
      ...(options || {}),
      formContext
    });

    return this;
  }
}
