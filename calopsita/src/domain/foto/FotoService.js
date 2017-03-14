export default class FotoService {
  constructor(resource) {
    this._resource = resource('v1/fotos{/id}')
  }
  cadastro(foto) {
    return this._resource.save(foto)
  }
  atualiza(foto) {
    return this._resource.update({ id : foto._id }, foto)
  }
  lista() {
    return this._resource
               .query()
               .then(res => res.json())
  }
  apaga(id) {
    return this._resource.delete({ id })
  }
  busca(id) {
    return this._resource.get({ id })
               .then(res => res.json())
  }
}
