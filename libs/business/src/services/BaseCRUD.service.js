import invariant from 'invariant';

export class BaseCRUDService {
  constructor({ http }) {
    this._http = http;
  }

  _checkEndpoint() {
    invariant(
      this.endpoint,
      `No endpoint specified on ${this.constructor.name}`
    );
  }

  findAll(options) {
    this._checkEndpoint();

    return this._http.get(`${this.endpoint}`, options);
  }

  findById(id, options) {
    this._checkEndpoint();

    return this._http.get(`${this.endpoint}/${id}`, options);
  }

  create(id, data, options) {
    this._checkEndpoint();

    return this._http.post(`${this.endpoint}`, { data, ...options });
  }

  update(id, data, options) {
    this._checkEndpoint();

    return this._http.put(`${this.endpoint}/${id}`, { data, ...options });
  }

  delete(id, options) {
    this._checkEndpoint();

    return this._http.delete(`${this.endpoint}/${id}`, options);
  }
}
