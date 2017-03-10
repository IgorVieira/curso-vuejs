<template>
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>

    <input type="search" @input="filtro = $event.target.value" placeholder="Filtre pelo título da foto" class="filtro">

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
          <image-reponsiva :url="foto.url" :titulo="foto.title" />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from './components/shared/painel/Painel.vue'
import ImageResponsiva from './components/shared/image-responsiva/ImageResponsiva.vue'

export default {
  components : {
    'meu-painel' : Painel,
    'image-reponsiva' : ImageResponsiva
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
      filtro : ''
    }
  },
  created() {
    this.$http.get('http://localhost:3000/v1/fotos')
              .then(res => res.json())
              .then(fotos => this.fotos = fotos, err => console.log(err))
  }
}
</script>

<style>
  .centralizado {
    text-align: center;
  }

  .corpo {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
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
