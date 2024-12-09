<template>
  <ea-navbar />

  <div class="mt-[42px]">
    <p class="text-xl font-semibold font-fontHead mb-4 text-neutral-800">
      Notifications
    </p>

    <div class="order mt-4">
      <p class="text-neutral-700 mt-[32px] text-[18px] font-semibold">Order</p>
      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">All orders</p>
          <p class="text-neutral-700">
            Alerts for new orders placed by customers.
          </p>
        </div>

        <ea-toggle @is-checked="updateAllOrders" :value="allOrders" />
      </div>
    </div>

    <div class="order mt-4">
      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            Cancelled Orders
          </p>
          <p class="text-neutral-700">
            Notifications when an order is cancelled
          </p>
        </div>

        <ea-toggle
          @is-checked="updateCanceledOrders"
          :value="cancelledOrders"
        />
      </div>
    </div>

    <div class="order mt-4">
      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            Order Shipments
          </p>
          <p class="text-neutral-700">Confirmation when orders are shipped</p>
        </div>

        <ea-toggle @is-checked="updateShippedOrders" :value="ordersShipped" />
      </div>
    </div>

    <div class="order mt-4">
      <p class="text-neutral-700 mt-[32px] text-[18px] font-semibold">
        Customer
      </p>
      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            New Customer Sign-Up
          </p>
          <p class="text-neutral-700">
            Alerts when a new customer registers on the platform
          </p>
        </div>

        <ea-toggle @is-checked="updateNewCustomer" :value="newCustomer" />
      </div>
    </div>

    <div class="order mt-4">
      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            Customer Feedback
          </p>
          <p class="text-neutral-700">
            Notifications about new customer reviews or feedback
          </p>
        </div>

        <ea-toggle
          @is-checked="updateCustomerFeedback"
          :value="customerFeedback"
        />
      </div>
    </div>

    <div class="order mt-4">
      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            Support Requests
          </p>
          <p class="text-neutral-700">
            Alerts for new customer support tickets or inquiries.
          </p>
        </div>

        <ea-toggle @is-checked="updateSupportRequest" :value="supportRequest" />
      </div>
    </div>

    <div class="order mt-4">
      <p class="text-neutral-700 mt-[32px] text-[18px] font-semibold">
        Product
      </p>

      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            Low Stock Alerts
          </p>
          <p class="text-neutral-700">
            Notifications when inventory levels fall below a set threshold
          </p>
        </div>

        <ea-toggle @is-checked="updateLowStock" :value="lowStock" />
      </div>
    </div>

    <div class="order mt-4">
      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            Out of Stock Alerts
          </p>
          <p class="text-neutral-700">Alerts when a product is out of stock</p>
        </div>

        <ea-toggle @is-checked="updateOutOfStock" :value="outOfStock" />
      </div>
    </div>

    <div class="order mt-4">
      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            Product Review
          </p>
          <p class="text-neutral-700">
            Updates on new product reviews and ratings.
          </p>
        </div>

        <ea-toggle @is-checked="updateProductReview" :value="productReview" />
      </div>
    </div>

    <div class="order mt-4">
      <p class="text-neutral-700 mt-[32px] text-[18px] font-semibold">
        Financial
      </p>

      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            Payment Received
          </p>
          <p class="text-neutral-700">
            Notifications for payments received from customers
          </p>
        </div>

        <ea-toggle
          @is-checked="updatePaymentReceived"
          :value="paymentReceived"
        />
      </div>
    </div>

    <div class="order mt-4">
      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            Refunds Issued
          </p>
          <p class="text-neutral-700">Alerts when refunds are processed</p>
        </div>

        <ea-toggle @is-checked="updateRefundsIssued" :value="refundsIssued" />
      </div>
    </div>

    <div class="order mt-4">
      <div class="mt-4 flex justify-between">
        <div>
          <p class="text-[18px] text-neutral-800 font-semibold">
            Billing Issued
          </p>
          <p class="text-neutral-700">
            Notifications about billing errors or payment failures
          </p>
        </div>

        <ea-toggle @is-checked="updateBillingIssued" :value="BillingIssued" />
      </div>
    </div>
  </div>

  <div class="flex justify-end mt-5">
    <div>
      <ea-button @click="saveChanges">
        <ea-spinner small v-if="loading" />
        <p v-else>Save Changes</p>
      </ea-button>
    </div>
  </div>
</template>

<script setup>
import { NotificationService } from '@/services';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import EaToggle from '@/components/EaToggle.vue';

const toast = useToast();

const allOrders = ref(false);
const cancelledOrders = ref(false);
const ordersShipped = ref(false);
const newCustomer = ref(false);
const customerFeedback = ref(false);
const supportRequest = ref(false);
const lowStock = ref(false);
const outOfStock = ref(false);
const productReview = ref(false);
const paymentReceived = ref(false);
const refundsIssued = ref(false);
const BillingIssued = ref(false);

const loading = ref(false);

const updateAllOrders = (e) => {
  allOrders.value = e;
};

const updateCanceledOrders = (e) => {
  cancelledOrders.value = e;
};

const updateShippedOrders = (e) => {
  shippedOrders.value = e;
};

const updateNewCustomer = (e) => {
  newCustomer.value = e;
};

const updateCustomerFeedback = (e) => {
  customerFeedback.value = e;
};

const updateSupportRequest = (e) => {
  supportRequest.value = e;
};

const updateLowStock = (e) => {
  lowStock.value = e;
};
const updateOutOfStock = (e) => {
  outOfStock.value = e;
};

const updateProductReview = (e) => {
  productReview.value = e;
};

const updatePaymentReceived = (e) => {
  paymentReceived.value = e;
};
const updateRefundsIssued = (e) => {
  refundsIssued.value = e;
};
const updateBillingIssued = (e) => {
  BillingIssued.value = e;
};

const notifications = ref({});

const fetchNotifications = async () => {
  const data = await NotificationService.fetchNotifications();
  allOrders.value = data.allOrders;
  cancelledOrders.value = data.cancelledOrders;
  ordersShipped.value = data.ordersShipped;
  newCustomer.value = data.newCustomer;
  customerFeedback.value = data.customerFeedback;
  supportRequest.value = data.supportRequest;
  lowStock.value = data.lowStock;
  outOfStock.value = data.outOfStock;
  productReview.value = data.productReview;
  paymentReceived.value = data.paymentReceived;
  refundsIssued.value = data.refundsIssued;
  BillingIssued.value = data.billingIssues;
};

const saveChanges = async () => {
  const payload = {
    allOrders: allOrders.value,
    cancelledOrders: cancelledOrders.value,
    ordersShipped: ordersShipped.value,
    newCustomer: newCustomer.value,
    customerFeedback: customerFeedback.value,
    supportRequest: supportRequest.value,
    lowStock: lowStock.value,
    outOfStock: outOfStock.value,
    productReview: productReview.value,
    paymentReceived: paymentReceived.value,
    refundsIssued: refundsIssued.value,
    billingIssues: BillingIssued.value,
  };

  try {
    loading.value = true;
    const data = await NotificationService.updateNotification(payload);
    toast.success(data.message);
    await fetchNotifications();
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchNotifications();
});

// {
//   id: 4,
//   type: '',
//   title: 'Refunds Issued',
//   subTitle: 'Alerts when refunds are processed',
// },

// {
//   id: 4,
//   type: '',
//   title: 'Billing Issues',
//   subTitle: 'Notifications about billing errors or payment failures',
// },
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
