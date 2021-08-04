<template>
  <div id="flashMessage">{{ GStore.flashMessage }}</div>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1, size: size } }"
        rel="prev"
        v-if="page != 0"
      >
        Prev Page
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1, size: size } }"
        rel="next"
      >
        Next Page
      </router-link>
    </div>
    <div class="pageLimit">
      <router-link
        id="plus"
        :to="{ name: 'EventList', query: { page: page, size: size + 1 } }"
        rel="next"
      >
        Increase Size
      </router-link>

      <router-link
        id="delete"
        :to="{ name: 'EventList', query: { page: page, size: size - 1 } }"
        rel="prev"
        v-if="size > 1"
      >
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
import NProgress from 'nprogress'
// import axios from 'axios'
export default {
  name: 'EventList',
  props: {
    page: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / this.size)
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
      EventService.getEvents(this.size, this.page)
        .then((response) => {
          this.events = response.data.data
          this.totalEvents = response.headers['x-total-count']
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  beforeRouteEnter(routeTo, routeFrom,next){
    NProgress.start()
    EventService.getEvents(2,parseInt(routeTo.query.page) || 1 ).then((response)=> {
      next((comp)=>{
        comp.events=response.data
        comp.totalEvents=response.headers['x-total-count']
      })
    })
    .catch(() => {
      next({ name:'NetworkError'})
    })
    .finally(() =>{
      NProgress.done()
    })
  },

  beforeRouteUpdate(routeTo,routeFrom,next){
    NProgress.start()
    EventService.getEvents(2,parseInt(routeTo.query.page) || 1 ).then((response)=>{
      this.events = response.data //<-----
      this.totalEvents = response.headers['x-total-count'] // <-----
      next() // <-----
    })
    .catch(() => {
      next({ name:'NetworkError'})
    })
    .finally(() =>{
      NProgress.done()
    })
  },

  inject: ['GStore']
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
#plus {
  text-align: left;
}
#delete {
  text-align: right;
}
.pageLimit {
  display: flex;
  width: 290px;
  align-items: center;
  text-align: center;
}
.pageLimit a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}
#flashMessage {
  animation-name: yellowfade;
  animation-duration: 5s;
}
</style>
