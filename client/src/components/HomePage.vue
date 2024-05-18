<template>

<main>
  <h1>Home</h1>
  <h2>Halo, {{ currentUserName }}!</h2>

  <button @click="getUsers">List User</button>
  <ul v-for="item in users">
    <li @click="receiver = item.id, receiverUsername = item.username">{{ item.username }}</li>
  </ul>

  <h4>Kirim Chat</h4>
  <p>Penerima: {{ receiverUsername }}</p>
  <input type="text" placeholder="Pesan" v-model="message">
  <button @click="sendMessage">Kirim</button><br>
  
  
  <h4>Isi Chat</h4>
  <input type="text" placeholder="Pesan dari"  v-model="receiverUsername">
    <button @click="getMessages">Tampilkan</button>
    <br>

    <ul>
        <li v-for="item in messages" >
          {{ item.idUserPengirim.username }} : {{ item.isiChat }}
        </li>
    </ul>
    <button @click="handleLogout">Logout</button>
</main>
</template>

<script>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter();
    const currentUser = ref();
    const currentUserName = ref();
    const currentUserID = ref();
    const receiver = ref();
    const receiverUsername = ref();
    const messages = [];
    const message = ref();

    onMounted(async () => {
      currentUser.value = await getUser();
      console.log((currentUser.value));
      
      if (!currentUser.value.user) {
        router.replace('/login');
      } else {
        currentUserName.value = (await getUser()).user.username;
        currentUserID.value = (await getUser()).user.id;
      }

      
    });

    const getUser = async () => {
      try {
        const req = await fetch('http://localhost:3000/api/users/me', {
        method: "GET", 
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        });
        const user = await req.json();

        if (req.ok) {
          console.log(user);
        }
        else {
          console.log("Login failed");
        }

        return user;
    } catch (error) {
        console.log(error);
    }
    };

    const handleLogout = async () => {
      try {
        const req = await fetch('http://localhost:3000/api/users/logout', {
          method: "POST", 
          credentials: "include",
          headers: {
           "Content-Type": "application/json",
          },
        })
        const data = await req.json();

        if (req.ok) {
          console.log(data);
        }
        else {
          console.log("Logout failed");
        }

        router.replace('/');
      } catch (err) {
        console.log(err);
      }
    };

    const users = ref();
    const getUsers = async () => {
      try {
        const req = await fetch('http://localhost:3000/api/users')
        const data = await req.json();
        users.value = data.docs;
      } catch (err) {
        console.log(err)
      }
    }

    const sendMessage = async () => {
      try{
        console.log(currentUserID.value,receiver.value, message.value)
        const req = await fetch("http://localhost:3000/api/messages", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idUserPengirim: currentUserID.value,
            idUserPenerima: receiver.value,
            isiChat: message.value,
          }),
        });
        const data = await req.json();

        console.log(data);
      }
      catch(err){
        console.error(err);
      }
    }

    const getMessages = async () => {
      try {
        const req = await fetch("http://localhost:3000/api/messages");
        const data = await req.json();
        messages.splice(0, messages.length);
        if(Array.isArray(data.docs)){
          data.docs.forEach(element => {
            console.log(element.idUserPenerima.username, element.idUserPengirim.username, receiverUsername.value, currentUserName.value);
            if(element.idUserPengirim.username == currentUserName.value && element.idUserPenerima.username == receiverUsername.value){
              console.log(element);
              messages.push(element);
            }
            if(element.idUserPenerima.username == currentUserName.value && element.idUserPengirim.username == receiverUsername.value){
              console.log(element);
              messages.push(element);
            }
          });
        }
        else {
          console.error("data.docs is not an array or is undefined.");
        }

        console.log(messages);
      } catch (err) {
        console.error(err);
      }
    };

    return {
      currentUser,
      currentUserName,
      currentUserID,
      handleLogout,
      users,
      getUsers,
      receiver,
      receiverUsername,
      sendMessage,
      messages,
      message,
      getMessages, 
      getUser
    };
  },
  methods: {
    masuk(data){
      // this.$router.push('/room')
      console.log(data);

      const box = document.querySelector(".box");
      box.innerHTML = '<form @submit.prevent="coba()"><label for="pengirim">Pengirim</label><input type="text" id="pengirim" v-model="pengirim" name="pengirim" autocomplete="off" required><label for="penerima">Penerima</label><input type="text" id="penerima" v-model="penerima" name="penerima" autocomplete="off" required><label for="pesan">Pesan</label><input type="textarea" id="pesan" v-model="pesan" name="pesan" autocomplete="off" required><button type="submit">Login</button></form>'
    },
    coba(){
      console.log("")
    }
  }
};
</script>