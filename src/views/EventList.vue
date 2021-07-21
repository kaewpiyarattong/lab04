<template>

  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    
    <div class ="pagination">
      <router-link
        id="page-prev"
        :to="{name: 'EventList', query:{page: page - 1, kai: kai }}" 
        rel="prev"
        v-if="page !=1 ">
        Prev Page
      </router-link>

      <router-link
        id="page-next"
        :to="{name: 'EventList', query:{page: page + 1,kai: kai}}" 
        rel="next"
        v-if = "hasNextPage">
        Next Page
      </router-link>

    </div>
    <div class="pageLimit">
      <router-link
      id="plus"
        :to="{name: 'EventList', query:{kai: kai + 1,page: page}}" 
        rel="next">
        Increase Size
      </router-link>

      <router-link
        id = "delete"
        :to="{name: 'EventList', query:{page: page, kai: kai - 1}}" 
        rel="prev"
        v-if="kai >1 ">
        Decrease Size
      </router-link>
  </div>

  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from '@vue/runtime-core'
// import axios from 'axios'
export default {
  name: 'EventList',
  props:{
    page:{
      type:Number,
      required: true
    },
    kai:{
      type:Number,
      required: true
    }
  },
  computed:{
    hasNextPage(){
      let totalPages = Math.ceil(this.totalEvents/this.kai)
      return this.page < totalPages
    }
  },
  components: {
    EventCard // register it as a child component
  },
  data() {
    return {
      events: null,
      totalEvents: 0
    }
  },
  created() {
    watchEffect(() => {
      EventService.getEvents( this.kai, this.page)
      .then((response) => {
        this.events = response.data
        this.totalEvents = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log(error)
      })
    })
  }
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination{
  display: flex;
  width: 290px
}
.pagination a{
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev{
  text-align: left;
}
#page-next{
  text-align: right;
}
#plus{
  text-align: left;
}
#delete{
  text-align: right;
}
.pageLimit{
  display: flex;
  width: 290px;
  align-items: center;
  text-align: center;
  
}
.pageLimit a{
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
</style>
