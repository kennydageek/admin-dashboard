import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';
import Overview from '@/views/overview/overview.vue';
import Customers from '@/views/customers/index.vue';
import Customer from '@/views/customers/CustomerProfile.vue';
import Partners from '@/views/partners/index.vue';
import Categories from '@/views/categories/index.vue';
import Orders from '@/views/orders/index.vue';
import Payments from '@/views/payments/index.vue';
import Notifications from '@/views/notifications/index.vue';
import Settings from '@/views/settings/index.vue';
import Feedback from '@/views/feedback/index.vue';
import Staff from '@/views/staff/index.vue';
import AddStaff from '@/views/staff/AddStaff.vue';
import EditStaff from '@/views/staff/EditStaff.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'home',
    },

    {
      path: '/login',
      name: 'login',
      component: Home,
      meta: {
        title: 'Login',
        layout: 'public',
      },
    },

    {
      path: '/overview',
      name: 'overview',
      component: Overview,
      meta: {
        title: 'Overview',
        layout: 'private',
      },
    },

    {
      path: '/customers',
      name: 'customers',
      component: Customers,
      meta: {
        title: 'Customers',
        layout: 'private',
      },
    },

    {
      path: '/customer/:id',
      name: 'customer',
      component: Customer,
      meta: {
        title: 'Customer',
        layout: 'private',
      },
    },

    {
      path: '/partners',
      name: 'partners',
      component: Partners,
      meta: {
        title: 'Partners',
        layout: 'private',
      },
    },

    {
      path: '/categories',
      name: 'categories',
      component: Categories,
      meta: {
        title: 'Partners',
        layout: 'private',
      },
    },

    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: {
        title: 'Orders',
        layout: 'private',
      },
    },

    {
      path: '/payments',
      name: 'payments',
      component: Payments,
      meta: {
        title: 'Payments',
        layout: 'private',
      },
    },

    {
      path: '/staff',
      name: 'staff',
      component: Staff,
      meta: {
        title: 'Staff',
        layout: 'private',
      },
    },
    {
      path: '/staff/add-staff',
      name: 'add-staff',
      component: AddStaff,
      meta: {
        title: 'Add Staff',
        layout: 'private',
      },
    },

    {
      path: '/staff/:id/edit',
      name: 'edit-staff',
      component: EditStaff,
      meta: {
        title: 'Edit Staff',
        layout: 'private',
      },
    },

    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications,
      meta: {
        title: 'Notifications',
        layout: 'private',
      },
    },

    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        title: 'Settings',
        layout: 'private',
      },
    },

    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback,
      meta: {
        title: 'Feedback',
        layout: 'private',
      },
    },
  ],
});

export default router;
