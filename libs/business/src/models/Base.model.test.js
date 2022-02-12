import { BaseModel } from './Base.model';

describe('BaseModel', () => {
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

  it('should instanciate model without throwing', () => {
    expect(() => new BaseModel({})).not.toThrow();
  });

  it('should expose the @id as uri', () => {
    const model = new BaseModel({ '@id': 123 });

    expect(model.uri).toBe(123);
    expect(model['@id']).not.toBeDefined();
  });

  it('should transform the model back to API dto', () => {
    const model = new MyModel({ '@id': 123, myRelation: 234 });
    const json = model.toJSON();

    expect(json.uri).not.toBeDefined();
    expect(json['@id']).toBe(123);
    expect(json._myRelation).not.toBeDefined();
    expect(json.myRelation).toBe(234);
  });

  it('should prefix relations uri with _', () => {
    const model = new MyModel({
      myRelation: 123
    });

    expect(model.myRelation).toBe(null);
    expect(model._myRelation).toBe(123);
  });

  it('should correctly return that the key is a relation', () => {
    expect(MyModel.isRelation('myRelation')).toBe(true);
    expect(MyModel.isRelation('notARelation')).toBe(false);
  });

  it('should return the relation', () => {
    const relation = MyModel.getRelation('myRelation');

    expect(relation.name).toBe('myRelation');
    expect(relation.model).toBe(BaseModel);
  });

  it('should format created date', () => {
    const model = new BaseModel({
      created: '2022-01-01T10:00:00+01:00'
    });

    expect(model.formatCreated()).toBe('01-01-2022');
    expect(model.formatCreated('dd/MM/yy')).toBe('01/01/22');
  });

  it('should format updated date', () => {
    const model = new BaseModel({
      updated: '2022-01-01T10:00:00+01:00'
    });

    expect(model.formatUpdated()).toBe('01-01-2022');
    expect(model.formatUpdated('dd/MM/yy')).toBe('01/01/22');
  });
});
