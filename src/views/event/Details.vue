<template>
  <div v-if="event">
    <h2>NAME: {{ event.name }}</h2>
    <p>ID: {{ event._id }}</p>
    <p>TRIP: {{ event.trips }}</p>
    <button @click="update">Update</button>
  </div>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'],
  methods: {
    update() {
      this.GStore.flashMessage = 'Detail of ' + this.event.name + ' is update'
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
      this.$router.push({
        name: 'EventList',
        params: { id: this.event.id }
      })
    }
  }
}
</script>
<style lang=""></style>
