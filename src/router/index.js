import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import About from '../views/About.vue'
import EventDetails from '@/views/event/Details.vue'
import EventEdit from '@/views/event/Edit.vue'
import EventLayout from '@/views/event/Layout.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({
      page: parseInt(route.query.page) || 0,
      size: parseInt(route.query.size) || 1
    })
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/event/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'edit',
        name: 'EventEdit',
        props: true,
        component: EventEdit
      }
    ]
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition){
      return savedPosition
    }
    else{
      return{
        top:0
      }
    }
  }
})

router.beforeEach(()=>{
  NProgress.start()
})
router.afterEach(()=>{
  NProgress.done()
})

export default router
