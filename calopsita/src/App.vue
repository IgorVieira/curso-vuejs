<template>
  <div>
    <h1>{{ titulo }}</h1>

    <ul v-for="foto of fotos">
      <li>
        <img :src="foto.url" :alt="foto.titulo">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titulo : 'Calopsita',
      fotos : [
        {
          url : 'https://www.getninjas.com.br/assets/ninjas/eduardo-l-hotellier-hover-53f6b0833d5589eaee734213b995a22b6b75abd8a9d95ab6852da8d5f402d5ae.jpg',
          titulo : 'Eduardo'
        },
        {
          url : 'https://www.getninjas.com.br/assets/ninjas/enrique-marques-hover-c716a74edd4770c2e7c12dba65231771b7719f6b6779c95ebe48a0513feae5fe.jpg',
          titulo : 'Enrique'
        }
      ]
    }
  }
}
</script>

<style>

</style>
