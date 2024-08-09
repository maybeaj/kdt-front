<template>
	<div class="container">
		<h2>Todo Read View</h2>
		<div v-if="loading">Loading...</div>
		<form v-else @submit.prevent="onUpdate">
			<div class="row">
				<div class="col-6">
					<div class="form-group">
						<label>Subject</label>
						<input type="text" class="form-control" v-model="todo.subject" />
					</div>
				</div>
				<div class="col-6">
					<div class="form-group">
						<label>State</label>
						<div>
							<button
								class="btn"
								:class="todo.completed ? 'btn-primary' : 'btn-danger'"
								type="button"
								@click="toggleState"
							>
								{{ todo.completed ? "Completed" : "InComplete" }}
							</button>
						</div>
					</div>
				</div>
			</div>
			<button class="btn btn-outline-dark" type="submit" :disabled="!todoUpdated">Update</button>
			<!-- cancel 버튼 클릭 시 path /todos 연결된 컴포넌트로 화면전환 -->
			<button class="btn btn-outline-danger ml-2" @click.stop="moveToTodos">
				Cancel
			</button>
		</form>
        <Alert v-if="showAlert"
                :message="alertMsg"
                :type="alertType"/>
	</div>
</template>

<script>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import axios from "@/axios";
import _ from 'lodash';
import Alert from '@/components/alert/AlertComponent.vue';
import { useToast } from '@/composables/toast.js';

export default {
    components : {
        Alert,
    },

	setup() {
		const route = useRoute(); //route.params.
		const router = useRouter(); //push() tramsition


		console.log("debug>>> TodoView params, ", route.params);
		console.log("debug>>> TodoView params.id, ", route.params.id);

		const moveToTodos = () => {
			// router.push("/todos");
			router.push({
				name: "Todos",
			});
		};
		const loading = ref(true);
		const todo = ref(null);
        const originalTodo = ref(null);

        const {
            showAlert, alertMsg, alertType, triggerAlert
        } = useToast();

        // // alert 구현을 위한 변수
        // const showAlert = ref(false);
        // const alertMsg = ref('');
        // const alertType = ref('');

        // const triggerAlert = (message, type = 'success') => {
        //     showAlert.value = true;
        //     alertMsg.value = message;
        //     alertType.value= type;
        //     setTimeout(()=>{
        //         showAlert.value = false;
        //     alertMsg.value = '';
        //     alertType.value= '';
        //     },3000);
        // }

        const todoUpdated = computed(()=>{
            return !_.isEqual(todo.value, originalTodo.value)
        });
		/*
        button 이벤트에 의해서 호출되는 함수
        이벤트 핸들러에서 todo의 completed 값을 변경하는 구현
        */
		const toggleState = () => {
			todo.value.completed = !todo.value.completed;
		};

		const onUpdate = async () => {
			const updateData = {
				completed: todo.value.completed,
				subject: todo.value.subject,
			};
			try {
				const response = await axios.patch(
					`todos/${route.params.id}`,
					updateData
				);
				console.log(response.data);
				//moveToTodos();
                triggerAlert('Successfully updated');
			} catch (error) {
				console.log(error);
                triggerAlert('Something went wrong...', 'danger');
			}
		};

		const getTodo = async () => {
			try {
				const response = await axios.get(
					`todos/${route.params.id}`
				);
				console.log(response.data);
				todo.value = {...response.data};
                originalTodo.value = {...response.data};
				loading.value = false;
                triggerAlert('Successfully get Todo');
			} catch (error) {
				console.log(error);
                triggerAlert('Something went wrong...', 'danger');
			}
		};
		getTodo();
		return {
			loading,
			todo,
			moveToTodos,
			toggleState,
			onUpdate,
            todoUpdated,
            showAlert,
            alertMsg,
            alertType
		};
	},
};
</script>

<style></style>
