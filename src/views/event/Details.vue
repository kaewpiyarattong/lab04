<template>
  <p>{{ event.time }} on {{ event.dat }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>

<script>
export default {
  props: ['event']
}
</script>
<style lang=""></style>
