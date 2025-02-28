<template>
  <div class="flex min-h-screen">
    <!-- Left Section (Image) -->
    <div class="hidden md:flex w-1/2 h-screen">
      <img src="../assets/images/loginimage.jpg" alt="Background" class="w-full h-full object-cover" />
    </div>

    <!-- Right Section (Login Form) -->
    <div class="w-full md:w-1/2 flex justify-center items-center p-6">
      <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input type="email" v-model="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Password</label>
            <input type="password" v-model="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      alert(`Logging in with ${this.email}`);
    }
  }
};
</script>
