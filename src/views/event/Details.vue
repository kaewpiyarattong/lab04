<template>
  <div v-if="event">
        <h2>NAME: {{ event.name }}</h2>
        <p>ID: {{ event._id }}</p>
        <p>TRIP: {{event.trips}}</p>
    </div>
</template>

<script>
export default {
  props: ['event']
}
</script>
<style lang=""></style>
