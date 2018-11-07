import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainPage from './views/MainPage.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:
  [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        requiresVisitor: true,
      },
      children:
      [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/components/home/Login')
        },
        {
          path: 'register',
          component: () => import('@/components/home/Register')
        },
        {
          path: 'password-reset',
          component: () => import('@/components/home/PasswordReset')
        },
        {
          path: 'email-confirm',
          component: () => import('@/components/home/EmailConfirm')
        },
        {
          path: 'logout',
          name: 'logout',
          component: () => import('@/components/home/Login')
        }
      ]
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: MainPage,
      meta:{
        requiresAuth: true,
      },
      children:
      [
        {
          path: 'list',
          component: () => import('@/components/tickets/TicketsList')
        },
        {
          path: 'my-used-tickets',
          component: () => import('@/components/tickets/TicketsUsed')
        },
        {
          path: 'create',
          name: 'tickets-create',
          component: () => import('@/components/tickets/TicketsCreate')
        }
      ]
    },
    {
      path: '/users',
      name: 'users',
      component: MainPage,
      meta:{
        requiresAuth: true,
      },
      children:
      [
        {
          path: 'view',
          component: () => import('@/components/users/UsersView')
        },
        {
          path: 'account-settings',
          component: () => import('@/components/users/AccountSettings')
        },
        {
          path: 'chat',
          component: () => import('@/components/users/Chat')
        }
      ]
    },
    {
      path: '/posts',
      name: 'posts',
      component: MainPage,
      meta:{
        requiresAuth: true,
      },
      children:
      [
        {
          path: 'list',
          component: () => import('@/components/posts/PostsList')
        },
        {
          path: 'create',
          component: () => import('@/components/posts/PostsCreate')
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: MainPage,
      children:
      [
        {
          path: 'search-results',
          component: () => import('@/components/search/SearchResults')
        },
        {
          path: 'upload-files',
          component: () => import('@/components/search/UploadFiles')
        }
      ]
    }
  ]
})
