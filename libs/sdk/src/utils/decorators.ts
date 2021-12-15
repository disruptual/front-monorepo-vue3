export const autoBind =
  () => (target: any, methodName: String, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const adjustableDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    };
    return adjustableDescriptor;
  };
