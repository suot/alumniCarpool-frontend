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
      children:
      [
        {
          path: 'login',
          // component: AuthenticationLoginV2
          component: () => import('@/components/home/AuthenticationLoginV2')
        },
        {
          path: 'register',
          component: () => import('@/components/home/AuthenticationRegisterV2')
        },
        {
          path: 'password-reset',
          component: () => import('@/components/home/AuthenticationPasswordReset')
        }, {
          path: 'email-confirm',
          component: () => import('@/components/home/AuthenticationEmailConfirm')
        }
      ]
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: MainPage,
      children:
      [
        {
          path: 'list',
          component: () => import('@/components/tickets/TicketsList')
        },
        {
          path: 'edit',
          component: () => import('@/components/tickets/TicketsEdit')
        },
        {
          path: 'my-used-tickets',
          component: () => import('@/components/tickets/TicketsUsed')
        },
        {
          path: 'create',
          component: () => import('@/components/tickets/TicketsCreate')
        }
      ]
    },
    {
      path: '/users',
      name: 'users',
      component: MainPage,
      children:
      [
        {
          path: 'view',
          component: () => import('@/components/users/UsersView')
        },
        // {
        //   path: 'edit',
        //   component: () => import('@/components/users/UsersEdit')
        // },
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
