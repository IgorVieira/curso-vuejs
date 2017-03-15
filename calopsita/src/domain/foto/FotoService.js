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
               .then(res => res.json(), err => {
                 console.log(err)
                 throw new Error('Não foi possível listar as fotos. Tente mais tarde!')
               })
  }
  apaga(id) {
    return this._resource
               .delete({ id })
               .then(null, err => {
                 console.log(err)
                 throw new Error('Não foi possível remover sua foto. Tente mais tarde!')
               })
  }
  busca(id) {
    return this._resource.get({ id })
               .then(res => res.json())
  }
}
