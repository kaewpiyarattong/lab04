<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.data }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  props: ['id'],
  data() {
    return {
      event: null
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then((respone) => {
        this.event = respone.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
<style></style>
