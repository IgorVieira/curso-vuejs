<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"></h2>

    <form @submit.prevent="gravar()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off" v-model="foto.titulo">
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model="foto.url">
        <image-responsiva :titulo="foto.titulo" :url="foto.url" />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{ name : 'home' }">
          <meu-botao rotulo="VOLTAR" tipo="button" />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImageResponsiva from '../shared/image-responsiva/ImageResponsiva.vue'
import Botao from '../shared/botao/Botao.vue'
import Foto from '../../domain/foto/Foto'
import FotosService from '../../domain/foto/FotoService'

export default {
  components: {
    'image-responsiva': ImageResponsiva,
    'meu-botao': Botao
  },
  data() {
    return {
      foto : new Foto(),
      id : this.$route.params.id
    }
  },
  created() {
    this.service = new FotosService(this.$resource)

    if(this.id) {
      this.service.busca(this.id)
                  .then(foto => this.foto = foto)
    }
  },
  methods : {
    gravar() {
      console.log('FOI')
      this.service
          .cadastro(this.foto)
          .then(() => this.foto = new Foto(), err => console.log(err))
    }
  }
}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

</style>
