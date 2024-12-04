<template>
  <ea-navbar />

  <div class="mt-[42px]">
    <p class="text-xl font-semibold font-fontHead mb-4 text-neutral-800">
      Notifications
    </p>

    <div
      class="order mt-4"
      v-for="(notification, i) in notifications"
      :key="`notification-${i}`"
    >
      <p
        class="text-neutral-700 mt-[32px] text-[18px] font-semibold"
        v-show="notification.type"
      >
        {{ notification.type }}
      </p>
      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            {{ notification.title }}
          </p>
          <p class="text-neutral-700">
            {{ notification.subTitle }}
          </p>
        </div>

        <div
          :class="[
            'toggle-switch',
            { 'toggle-switch--checked': isProfileUpdatesChecked },
          ]"
          class="self-end"
          @click="toggleProfileUpdates"
        >
          <div class="toggle-switch__slider"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NotificationService } from '@/services';
import { onMounted, ref } from 'vue';

const isProfileUpdatesChecked = ref(false);

const toggleProfileUpdates = () => {
  isProfileUpdatesChecked.value = !isProfileUpdatesChecked.value;
};

const notifications = [
  {
    id: 1,
    type: 'Order',
    title: 'All orders',
    subTitle: 'Alerts for new orders placed by customers.',
  },

  {
    id: 2,
    type: '',
    title: 'Canceled Orders',
    subTitle: 'Notifications when an order is cancelled',
  },

  {
    id: 3,
    type: '',
    title: 'Order Shipments',
    subTitle: 'Confirmation when orders are shipped',
  },

  {
    id: 4,
    type: 'Customer',
    title: 'New Customer Sign-Up',
    subTitle: 'Alerts when a new customer registers on the platform',
  },

  {
    id: 4,
    type: '',
    title: 'Customer Feedback',
    subTitle: 'Notifications about new customer reviews or feedback',
  },

  {
    id: 4,
    type: '',
    title: 'Support Request',
    subTitle: 'Alerts for new customer support tickets or inquiries.',
  },

  {
    id: 4,
    type: '',
    title: 'Support Requests',
    subTitle: 'Alerts for new customer support tickets or inquiries.',
  },

  {
    id: 4,
    type: 'Product',
    title: 'Low Stock Alerts',
    subTitle: 'Notifications when inventory levels fall below a set threshold',
  },

  {
    id: 4,
    type: '',
    title: 'Out of Stock Alerts',
    subTitle: 'Alerts when a product is out of stock',
  },

  {
    id: 4,
    type: '',
    title: 'Out of Stock Alerts',
    subTitle: 'Alerts when a product is out of stock',
  },

  {
    id: 4,
    type: '',
    title: 'Product Review',
    subTitle: 'Updates on new product reviews and ratings.',
  },

  {
    id: 4,
    type: 'Financial',
    title: 'Payment Received',
    subTitle: 'Notifications for payments received from customers',
  },

  {
    id: 4,
    type: '',
    title: 'Refunds Issued',
    subTitle: 'Alerts when refunds are processed',
  },

  {
    id: 4,
    type: '',
    title: 'Billing Issues',
    subTitle: 'Notifications about billing errors or payment failures',
  },
];

const fetchNotifications = async () => {
  const data = await NotificationService.fetchNotifications();
  notifications.value;
  console.log(data);
};

onMounted(async () => {
  await fetchNotifications();
});
</script>

<style scoped>
.toggle-switch {
  width: 50px;
  height: 25px;
  background-color: #879693;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-switch--checked {
  background-color: #00644f;
}

.toggle-switch__slider {
  width: 23px;
  height: 23px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: transform 0.3s;
}

.toggle-switch--checked .toggle-switch__slider {
  transform: translateX(25px);
}
</style>
