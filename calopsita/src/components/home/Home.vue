<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>

    <input type="search" @input="filtro = $event.target.value" placeholder="Filtre pelo título da foto" class="filtro">

    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
          <image-reponsiva v-meu-transform:scale.animate="1.4" :url="foto.url" :titulo="foto.title" />

          <router-link :to="{ name : 'altera', params : { id : foto._id } }">
            <meu-botao
              rotulo="Alterar"
              tipo="button" />
          </router-link>

          <meu-botao
            rotulo="Remover"
            tipo="button"
            :confirmacao="true"
            @botaoAtivado="remove(foto)"
            estilo="perigo" />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue'
import ImageResponsiva from '../shared/image-responsiva/ImageResponsiva.vue'
import Botao from '../shared/botao/Botao.vue'
import Transform from '../../directives/Transform.js'
import FotoService from '../../domain/foto/FotoService'

export default {
  components : {
    'meu-painel' : Painel,
    'image-reponsiva' : ImageResponsiva,
    'meu-botao' : Botao
  },
  directives : {
    'meu-transform' : Transform
  },
  computed : {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i')

        return this.fotos.filter(foto => exp.test(foto.titulo))
      } else {
        return this.fotos
      }
    }
  },
  data () {
    return {
      titulo : 'Calopsita',
      fotos : [],
      filtro : '',
      mensagem : ''
    }
  },
  created() {
    this.resource = new FotoService(this.$resource)

    this.resource
        .lista()
        .then(fotos => this.fotos = fotos, err => console.log(err))
  },
  methods : {
    remove(foto) {

      if (confirm('Confirma?')) {
        this.resource
            .apaga(foto._id)
            .then(() => {
              let indice = this.fotos.indexOf(foto)
              this.fotos.splice(indice, 1)

              this.mensagem = 'Foto removida com sucesso'
            },
            (err) => {
              this.mensagem = 'Não foi possível remover a foto'
            })
      }
    }
  }
}
</script>

<style>
  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }

  .lista-fotos-item {
    display: inline-block;
    margin-bottom: 20px;
  }

  .filtro {
    display: block;
    width: 100%;
  }
</style>
