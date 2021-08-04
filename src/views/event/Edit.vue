<template>
  <div v-if="event.airline.length">
    <img :src="event.airline[0].logo" />
    <p>AIRLINE ID: {{ event.airline[0].id }}</p>
    <p>AIRLINE NAME: {{ event.airline[0].name }}</p>
    <p>AIRLINE SLOGAN: {{ event.airline[0].slogan }}</p>
  </div>
  <div v-else>
    <img :src="event.airline.logo" />
    <p>AIRLINE ID: {{ event.airline.id }}</p>
    <p>AIRLINE NAME: {{ event.airline.name }}</p>
    <p>AIRLINE SLOGAN: {{ event.airline.slogan }}</p>
  </div>
</template>

<script>
export default {
  props: ['event']
}
</script>
<style lang=""></style>
