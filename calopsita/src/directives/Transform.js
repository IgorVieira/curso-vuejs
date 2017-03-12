export default {
  bind(el, binding, vnode) {
    let incremento = binding.value || 90
    let current = 0

    el.addEventListener('dblclick', function() {
      current += incremento

      if (binding.modifiers.animate) this.style.transition = '500ms'

      if(!binding.arg || binding.arg == 'rotate') {
        this.style.transform = `rotate(${current}deg)`
      }

      if(binding.arg == 'scale') {
        this.style.transform = `scale(${incremento})`
      }
      
    })
  }
}