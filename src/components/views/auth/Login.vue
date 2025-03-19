<template>
  <div class="flex flex-col md:flex-row h-screen w-full relative">
    <Toast ref="toastRef" />
    <!-- Left side - Image -->
    <div class="hidden md:block md:w-1/2 bg-cover bg-center">
      <img src="@/assets/images/login-coffee.svg" class="w-full h-full object-cover" />
    </div>

    <!-- Right side - Login Form -->
    <div class="w-full md:w-1/2 flex flex-col items-center justify-center relative">
      <!-- Centered Top Navigation -->
      <!--      <nav class="absolute top-5 left-1/2 -translate-x-1/2">-->
      <nav class="absolute top-4">
        <ul class="flex space-x-6 text-sm font-medium text-primary-800-main">
          <li><a target="_blank" href="https://onlinebanking.co-opbank.co.ke/" class="hover:text-green-600 font-bold">Coop-Online</a></li>
          <li><a target="_blank" href="https://www.nairobicoffeeexchange.co.ke/" class="hover:text-green-600 font-bold">NCE</a></li>
          <li><a target="_blank" href="https://www.agricultureauthority.go.ke//" class="hover:text-green-600 font-bold">AFA</a></li>
          <li><a target="_blank" href="https://www.cma.or.ke/" class="hover:text-green-600 font-bold">CMA</a></li>
          <li><router-link to="/login"/></li>
        </ul>
      </nav>

      <div class="w-full max-w-md mt-12">
        <h1 class="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p class="text-center text-gray-600 mb-8">Log in to your account</p>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              v-model="formData.username"
              placeholder="Enter your email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              v-model="formData.password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input type="checkbox" id="remember"
                     class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
              <label for="remember" class="ml-2 block text-sm text-gray-700">Keep me signed in</label>
            </div>
            <a href="/ForgotPassword" class="text-sm text-green-600 hover:text-green-500">Forgot password?</a>
          </div>

          <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Sign in
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-600">
          Need help signing in?
          <a href="#" class="font-medium text-green-600 hover:text-green-500">Contact support</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref, inject } from 'vue'
import api from '@/components/services/api.js';
// import Toast from '@/components/views/ui/Toast.vue'
const toast = inject("toast");
const router = useRouter();
const toastRef = ref(null);
const goToPage = () => {
  router.push('/dashboard'); // Change to your desired route
};

const formData = ref({
  email: '',
  password: '',
});

const handleLogin = async () => {
  try {
    console.log('Form Data:', formData.value); // Check the dynamic values
    const response = await api.post('/api/token/generate-token',formData.value);
    console.log("response - ", response)
    // toastRef.value("Login successful!", "success");

    if (response.token) {
      toast.value?.showToast("Login successful!", "success")
      localStorage.setItem('token', response.token); // Save JWT token
      router.push('/dashboard'); // Redirect after login
    } else {
      toast.value?.showToast("Invalid Username and Password!", "error")
     // errorMessage.value = 'Invalid login credentials';
    }
  } catch (error) {
    console.log(error)
    //errorMessage.value = 'Login failed. Please check your credentials.';
    console.error('Login error:', error);
  }
};
async function saveUser() {
  try {
    // if (isEditing.value) {
    //   await put(`/users/${form.id}`, form)
    // } else {
    //   await post('/users', form)
    // }
    //resetForm()
    await api.post('/api/sca/v1/auth/authenticate', formData.value)
    fetchUsers()
  } catch (err) {
    console.error('Failed to save user')
  }
}

async function fetchUsers() {
  console.log("hello")
  try {
    const response = await api.get("/api/sca/v1/auth/kongtest")
    console.log("response - ", response)
    //users.value = response.data
  } catch (err) {
    // Error is already handled in our composable
    console.error('Failed to fetch users')
  }
}

// Load users on component mount
onMounted(fetchUsers)
</script>
