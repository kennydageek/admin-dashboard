<template>
  <ea-navbar />
  <div class="mt-[42px] p-4 bg-white">
    <div class="">
      <p class="mb-2 font-fontHead text-xl font-semibold text-neutral-800">
        Staff Info
      </p>
      <p class="text-neutral-700">Fill in the staff details below</p>
    </div>
    <div class="flex flex-col md:flex-row md:gap-6 mt-4">
      <div class="mb-4 grow w-full md:w-[50%]">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
          First name
        </p>

        <div
          class="w-full bg-white border-neutral-400 pr-0 rounded placeholder:text-base border flex"
        >
          <input
            type="text"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff first name?"
            disabled
          />
          <!-- <img src="@/assets/svg/lock.svg" alt="" /> -->
        </div>
      </div>

      <div class="mb-2 w-full md:w-[50%] grow">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">Last name</p>
        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <input
            type="text"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff last name?"
            disabled
          />
          <!-- <img src="@/assets/svg/arrow_down.svg" alt="" /> -->
        </div>
      </div>
    </div>

    <!-- ======= -->
    <div class="flex flex-col md:flex-row md:gap-6 mt-4">
      <div class="mb-4 grow w-full md:w-[50%]">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
          Email Address
        </p>

        <div
          class="w-full bg-white border-neutral-400 pr-0 rounded placeholder:text-base border flex"
        >
          <input
            type="email"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff email?"
            disabled
          />
          <!-- <img src="@/assets/svg/lock.svg" alt="" /> -->
        </div>
      </div>

      <div class="mb-2 w-full md:w-[50%] grow">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
          Phone number
        </p>
        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <input
            type="text"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff phone number?"
            disabled
          />
          <!-- <img src="@/assets/svg/arrow_down.svg" alt="" /> -->
        </div>
      </div>
    </div>

    <!-- ldkfkfkf===ddfkdf -->

    <div class="flex flex-col md:flex-row md:gap-6 mt-4">
      <div class="mb-4 grow w-full md:w-[50%]">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
          Start date
        </p>

        <div
          class="w-full bg-white border-neutral-400 pr-0 rounded placeholder:text-base border flex"
        >
          <input
            type="date"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff first name?"
            disabled
          />
          <!-- <img src="@/assets/svg/lock.svg" alt="" /> -->
        </div>
      </div>

      <div class="mb-2 w-full md:w-[50%] grow">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
          Date of Birth
        </p>
        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <input
            type="date"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff last name?"
            disabled
          />
          <!-- <img src="@/assets/svg/arrow_down.svg" alt="" /> -->
        </div>
      </div>
    </div>

    <!-- 9393939929292 -->
    <div class="flex flex-col md:flex-row md:gap-6 mt-4">
      <div class="mb-4 grow w-full md:w-[50%]">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">Gender</p>

        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <select
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff first name?"
            disabled
          >
            <option>Select the staff gender</option>
            <option>Male</option>
            <option>Femaile</option>
            <option>Prefer not to say</option>
          </select>
          <!-- <img src="@/assets/svg/lock.svg" alt="" /> -->
        </div>
      </div>

      <div class="mb-2 w-full md:w-[50%] grow">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">Role</p>
        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <select
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff last name?"
            disabled
          >
            <option>General Manager</option>
            <option>General Admin</option>
            <option>General Staff</option>
            <option>Guest</option>
          </select>
          <!-- <img src="@/assets/svg/arrow_down.svg" alt="" /> -->
        </div>
      </div>
    </div>

    <div class="mt-6">
      <p class="text-xl font-fontHead font-semibold text-neutral-800 mb-2">
        Email and Password
      </p>

      <p class="text-neutral-700">
        Fill in the staff username and password below
      </p>

      <div class="flex flex-col md:flex-row md:gap-6 mt-4">
        <div class="mb-4 grow w-full md:w-[50%]">
          <p class="text-[18px] font-fontHead text-neutral-800 mb-2">Email</p>

          <div
            class="w-full bg-white border-neutral-400 pr-0 rounded placeholder:text-base border flex"
          >
            <input
              type="email"
              class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
              placeholder="ibrahimajose@gmail.com"
            />
            <!-- <img src="@/assets/svg/lock.svg" alt="" /> -->
          </div>
        </div>

        <div class="mb-2 w-full md:w-[50%] grow">
          <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
            Password
          </p>
          <div
            class="w-full border-neutral-400 pr-3 rounded placeholder:text-base border flex"
          >
            <input
              type="password"
              placeholder="Enter your password"
              class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            />
            <img src="@/assets/images/eye-cross.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <button
      class="w-full mt-[42px] py-4 bg-primary-500 rounded text-[18px] text-white"
    >
      Edit Staff
    </button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
