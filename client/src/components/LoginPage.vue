<template>
  <h1>Login</h1>
  <form @submit.prevent="handleLogin">
    <input type="email" id="email" v-model="email" name="email" autocomplete="off" required placeholder="Email"><br><br>
    
    <input type="password" id="password" v-model="password" name="password" autocomplete="off" required placeholder="Password"><br><br>
                      
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'LoginPage',
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handleLogin = async () => {
      console.log(email.value);
      console.log(password.value);
      try {
        const req = await fetch('http://localhost:3000/api/users/login', {
        method: "POST", 
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }),
        });
        const data = await req.json();

        if (req.ok) {
          console.log(data);
          router.push('/home'); // Change to the appropriate route
        } else {
          console.log("Login failed");
        }
    } catch (error) {
        console.log(error);
    }
    };

    return {
      email,
      password,
      handleLogin
    };
  },
  methods: {
    signup() {
      this.$router.push('/signup');
    }
  }
};


</script>