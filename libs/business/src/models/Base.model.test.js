import { BaseModel } from './Base.model';

describe('BaseModel', () => {
  it('should instanciate model without throwing', () => {
    expect(() => new BaseModel({})).not.toThrow();
  });

  it('should expose the @id as uri', () => {
    const model = new BaseModel({ '@id': 123 });

    expect(model.uri).toBe(123);
    expect(model['@id']).not.toBeDefined();
  });

  it('should prefix relations uri with _', () => {
    class MyModel extends BaseModel {
      static get relations() {
        return [
          {
            name: 'myRelation',
            getUri: entity => entity._myRelation,
            model: BaseModel
          }
        ];
      }
    }

    const model = new MyModel({
      myRelation: 123
    });

    expect(model.myRelation).toBe(null);
    expect(model._myRelation).toBe(123);
  });
});
