<template>
	<div class="container">
		<h2>Todo-Create</h2>
		<form>
			<div class="row">
				<div class="col-6">
					<div class="form-group">
						<label>Subject</label>
						<input type="text" class="form-control" v-model="todo.subject" />
						<div v-if="subjectError" style="color: red">
							{{ subjectError }}
						</div>
					</div>
				</div>
				<div class="col-6">
					<div class="form-group">
						<label>State</label>
						<div>
							<button class="btn btn-primary" type="button">InComplete</button>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="form-group">
					<label>Body</label>
					<textarea
						v-model="todo.body"
						class="form-control"
						cols="30"
						rows="10"
					></textarea>
					<div v-if="bodyError" style="color: red">
						{{ bodyError }}
					</div>
				</div>
			</div>
			<p />
			<button class="btn btn-outline-dark" type="button" @click="openModal">Create</button>
			<!-- cancel 버튼 클릭 시 path /todos 연결된 컴포넌트로 화면전환 -->
			<button class="btn btn-outline-danger ms-2" @click.stop="moveToTodos">
				Cancel
			</button>
		</form>

		<teleport to="#modal">
			<Modal v-if="showModal" @close="onClose" >
				<template v-slot:title> 할 일 등록하기 </template>
				<template v-slot:body>
					<p>정말 등록하시겠습니까?</p>
				</template>
				<template v-slot:footer>
					<button type="button" class="btn btn-secondary" @click="onClose">
						Close
					</button>
					<button type="button" class="btn btn-primary" @click="createTodo">
						Create
					</button>
				</template>
			</Modal>
		</teleport>

	</div>
</template>

<script>
import { ref } from "vue";
import axios from "@/axios";
import { useRouter } from "vue-router";
import Modal from'@/components/modal/ModalComponent.vue';

export default {components: {
		Modal,
	},
	setup() {
		const todo = ref({});
		const router = useRouter(); //push() transmition
		const bodyError = ref('');
		const subjectError = ref('');
		
		const showModal =ref(false);

		const openModal = () => {
			showModal.value = true;
			console.log("debug>>>> create openModal , " ,showModal)
		}
		const moveToTodos = () => {
			// router.push("/todos");
			router.push({
				name: "Todos",
			});
		};

		const onClose = () => {
			console.log("Debug>>> onClose");
			showModal.value = false;
		};

		const createTodo = async () => {
			subjectError.value='';
			bodyError.value='';
			const data = {
				id: Date.now(),
				subject: todo.value.subject,
				body: todo.value.body,
				completed: false,
			};

			try {
				if ( !todo.value.subject){
					subjectError.value = 'Subject is required';
					return;
				} else if(!todo.value.body){
					bodyError.value = 'Body is required';
					return;
				} else {
				const response = await axios.post(`todos`, data);
				todo.value.subject = "";
				todo.value.body = "";
				console.log("debug>>> post result", response.data);
				moveToTodos();
				}
			} catch (error) {
				console.log(error);
			}
		};

		return {
			todo,
			moveToTodos,
			createTodo,
			bodyError,
			subjectError,
			openModal,
			showModal,
			onClose,
		};
	},
};
</script>

<style></style>
