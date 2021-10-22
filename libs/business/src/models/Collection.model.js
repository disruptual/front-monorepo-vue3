export class Collection extends Array {
  constructor(dto) {
    if (typeof dto === 'number') {
      super(dto);
    } else {
      super();
    }

    if (typeof dto === 'object') {
      const {
        'hydra:member': collection,
        'hydra:totalItems': totalItems,
        '@id': uri
      } = dto || {};
      this.push(...collection);
      this.__id = Math.random();
      this.totalItems = totalItems;
      this.uri = uri;
    }
  }

  map(...args) {
    const newCollection = super.map(...args);
    newCollection.totalItems = this.totalItems;
    newCollection.uri = this.uri;

    return newCollection;
  }

  filter(...args) {
    const newCollection = super.filter(...args);
    newCollection.totalItems = this.totalItems;
    newCollection.uri = this.uri;

    return newCollection;
  }

  toJSON() {
    return {
      '@id': this.uri,
      'hydra:totalItems': this.totalItems,
      'hydra:member': [...this].map(entity => entity.toJSON())
    };
  }
}
