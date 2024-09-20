<template>
  <div class="">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <th class="rounded-l-[16px] text-sm text-grey-500">#ID</th>
          <th class="text-sm text-grey-500">Name</th>
          <th class="text-sm text-grey-500">Email</th>
          <th class="text-sm text-grey-500">Phone number</th>
          <th class="text-sm text-grey-500">Gender</th>
          <th class="text-sm text-grey-500">DOB</th>
          <th class="text-sm text-grey-500">Role</th>
          <th class="text-sm text-grey-500">Status</th>
          <th class="text-sm text-grey-500"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableArray" :key="index">
          <td>{{ item.id }}</td>
          <td>Name</td>
          <td>Email</td>
          <td>Phone number</td>
          <td>Gender</td>
          <td>DOB</td>
          <td>Role</td>
          <td><p class="text-sm text-primary-500">Active</p></td>
          <td>
            <div class="relative">
              <img
                src="@/assets/svg/dots-vertical.svg"
                alt=""
                class="cursor-pointer"
                @click="toggleModal(item)"
              />

              <!-- Only show modal for the specific row -->
              <div
                v-if="item.showModal"
                class="absolute z-[10000] shadow-lg top-[30px] right-[-20px] bg-white w-[284px] rounded-bl-lg rounded-r-lg py-6 px-4 !text-left"
                v-click-away="() => closeModal(item)"
              >
                <!-- Content inside the modal -->
                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleSelectMakeStaffAdmin(item)"
                >
                  <p class="text-[18px]">Make Staff admin</p>
                </div>

                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleSelectDeactivateStaff(item)"
                >
                  <p class="text-[18px]">Deactivate Staff</p>
                </div>

                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleSelectEditStaff(item)"
                >
                  <p class="text-[18px]">Edit Staff Details</p>
                </div>

                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleSelectDeleteAccount(item)"
                >
                  <p class="text-[18px] text-red-500">Delete Account</p>
                </div>
                <!-- Example: Add more content here -->
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PaymentHistoryTable',
  setup(props, { emit }) {
    const tableArray = ref([
      {
        id: 1,
        showModal: false,
      },
      {
        id: 2,
        showModal: false,
      },
      {
        id: 3,
        showModal: false,
      },
      {
        id: 4,
        showModal: false,
      },
      {
        id: 5,
        showModal: false,
      },
    ]);

    // Function to toggle the modal for a specific row
    const toggleModal = (item) => {
      item.showModal = !item.showModal;
    };

    // Function to close the modal for a specific row
    const closeModal = (item) => {
      item.showModal = false;
    };

    const handleSelectMakeStaffAdmin = (item) => {
      emit('make-staff-admin', item);
      toggleModal(item);
    };

    const handleSelectDeactivateStaff = (item) => {
      emit('deactivate-staff', item);
      toggleModal(item);
    };

    const handleSelectEditStaff = (item) => {
      emit('edit-staff', item);
    };

    const handleSelectDeleteAccount = (item) => {
      emit('delete-account', item);
      toggleModal(item);
    };

    return {
      tableArray,
      toggleModal,
      closeModal,
      handleSelectMakeStaffAdmin,
      handleSelectDeactivateStaff,
      handleSelectEditStaff,
      handleSelectDeleteAccount,
    };
  },
};
</script>

<style scoped>
th,
td {
  padding: 12px;
  text-align: center;
}

td {
  padding: 0 16px 0 16px;
  height: 72px;
  font-size: 14px;
  color: #344054;
}

th {
  background-color: #f9fafa;
  padding: 16px 8px;
  font-size: 14px;
  font-family: 'Aileron';
  color: #131826;
}
</style>
