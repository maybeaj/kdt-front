<template>
	<div class="container">
		<h2>Login Page</h2>
        <form @submit.prevent="onLogin">
		<div class="mb-3">
			<label for="exampleId" class="form-label">ID</label>
			<input
				type="text"
				class="form-control"
				id="exampleId"
				placeholder="아이디를 입력하세요"
                v-model="user.id"
			/>
		</div>
		<div class="mb-3">
			<label for="examplePassword" class="form-label">Password</label>
			<input
				type="password"
				class="form-control"
				id="examplePassword"
				placeholder="암호를 입력하세요"
                v-model="user.password"
			/>
		</div>
		<div class="d-grid gap-2">
			<button class="btn btn-primary" type="submit">Login</button>
			<button class="btn btn-primary" type="button">Cancel</button>
		</div>
    </form>
	</div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "@/axios";

export default {
	setup() {
        let user = ref({});
        const router = useRouter();
        const onLogin = async () => {
            console.log("Debug>>> login create btn click");
            try {
                // const data = {
                //     id : user.value.id,
                //     password : user.value.password
                // };
                let response = await axios.get(`users?id=${user.value.id}&password=${user.value.password}`);
                console.log("login response data,",response.data);
                user = response.data;
                
                router.push({
				name: 'Home',
                params : {
                    "user" : user
                }
			});
            } catch (error){
                console.log(error);
            }
        }


        return{
            user,
            onLogin,
        }
    },
};
</script>

<style></style>
