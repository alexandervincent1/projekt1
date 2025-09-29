<script setup>
import { ref } from 'vue'
import '/Users/master/Desktop/Te4/projekt1/frontend/src/components/css/signup.css'


const username = ref('');
const password = ref('');
const password_confirm = ref('');
const errorMessage = ref('');
const successMessage = ref('');


async function register() {
 
    errorMessage.value = '';
    successMessage.value = '';


    if (password.value !== password_confirm.value) {
        errorMessage.value = "Lösenorden matchar inte. Kontrollera inmatningen.";
        return;
    }

    if (password.value.length < 6) {
        errorMessage.value = "Lösenordet måste vara minst 6 tecken långt.";
        return;
    }

    try {
      
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value, 
                userRole: 'user' 
            }),
        });

        const responseData = await response.json();

    
        if (response.ok) {
            successMessage.value = responseData.message || 'Registrering lyckades! Användare sparad i MongoDB.';
             
            username.value = '';
            password.value = '';
            password_confirm.value = '';
        } else {
         
            errorMessage.value = responseData.message || 'Ett okänt fel uppstod vid servern.';
        }
    } catch (error) {
       
        console.error('Nätverksfel:', error);
        errorMessage.value = 'Kunde inte ansluta till servern. Kontrollera att din backend körs på port 3000.';
    }
}
</script>

<template>
    <div class="signup-container">
        <h1>Sign Up</h1>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

        <div id="first_box" class="input-group">
       
            <input v-model="username" placeholder="Username" aria-label="Användarnamn">
            <input v-model="password" type="password" placeholder="Password" aria-label="Lösenord">
            <input v-model="password_confirm" type="password" placeholder="Re-enter Password" aria-label="Bekräfta lösenord">
            <button @click="register">Sign Up!</button>
            <router-link to="/login">Login</router-link>
        </div>
    </div>
</template>
