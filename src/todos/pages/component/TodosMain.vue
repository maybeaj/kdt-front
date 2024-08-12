<template>
	<div class="container">
		<h2>Todos Page</h2>
		<input
			class="form-control"
			type="text"
			v-model="searchTxt"
			placeholder="Search.."
		/>
		<!--v-model : 양반향 통신 -->
		<!-- <TodoForm @add-todo="addTodo" /> -->
		<p />
		<div class="d-grid gap-2">
			<button class="btn btn-primary" type="button" @click="moveToCreate">
				CREATE
			</button>
		</div>
		<p />
		<TodoList
			:todos="filteredTodos"
			@toggle-todo="toggleTodo"
			@delete-todo="onDelete"
			@open-modal="openModal"
		/>
		<!-- v-vind ":" 와 같은 뜻 - props로 내리기 위함 / emit을 통해 올려 받은 내용은 함수로 다시 받음 -->
		<Alert v-if="showAlert" :message="alertMsg" :type="alertType" />
		<teleport to="#modal">
			<Modal v-if="showModal" @close="onClose" @delete="deleteTodo">
				<template v-slot:title> 할 일을 삭제 </template>
				<template v-slot:body>
					<p>정말 삭제하시겠습니까?</p>
				</template>
				<template v-slot:footer>
					<button type="button" class="btn btn-secondary" @click="onClose">
						Close
					</button>
					<button type="button" class="btn btn-danger" @click="deleteTodo">
						Delete
					</button>
				</template>
			</Modal>
		</teleport>
	</div>
</template>

<script>
import { ref, computed } from "vue";
import TodoList from "@/components/todo/TodoList.vue";
import Alert from "@/components/alert/AlertComponent.vue";
import Modal from "@/components/modal/ModalComponent.vue";
import axios from "@/axios";
import { useToast } from "@/composables/toast.js";
import { useRouter } from "vue-router";
//템플릿에서 사용되는 반드시 스크립트를 이용해서 데이터가 이용되고 반환되어야 한다.
export default {
	components: {
		TodoList,
		Alert,
		Modal,
	},
	setup() {
		const todo = ref("");
		const todos = ref([]);
		const searchTxt = ref("");
		const showModal = ref(false);
		let deleteTodoId = "";
		//getTodos 페이지 로딩 시 json-server 부터 모든 데이터를 select
		//get-select, post-insert, delete-delete, update-patch
		const getTodos = async () => {
			try {
				const response = await axios.get("todos");
				console.log("getTodos response", response.data);
				todos.value = response.data;
			} catch (error) {
				console.log(error);
			}
		};
		getTodos();
		const router = useRouter();
		const moveToCreate = () => {
			//router.push(`/todos/${todoId}`);
			router.push({
				name: "Create",
			});
		};

		const deleteTodo = async () => {
			try {
				//axios 통신을 통해서 키값을 전달하고 json-server 쪽에서 삭제
				const response = await axios.delete(`todos/${deleteTodoId}`);
				console.log("debug>>> todos delete response", response);
				getTodos();
				showModal.value = false;
			} catch (error) {
				console.log(error);
			}
		};

		const filteredTodos = computed(() => {
			if (searchTxt.value) {
				return todos.value.filter((todo) => {
					return todo.subject.includes(searchTxt.value);
				});
			}
			return todos.value;
		});

		const { showAlert, alertMsg, alertType, triggerAlert } = useToast();

		const toggleTodo = async (index) => {
			const key = todos.value[index].id;
			const updateData = {
				completed: !todos.value[index].completed,
			};
			try {
				const response = await axios.patch(`todos/${key}`, updateData);
				console.log("debug update response", response.data);
				todos.value[index].completed = response.data.completed;

				triggerAlert("Successfully checked", "primary");
			} catch (error) {
				console.log(error);
			}
		};

		const onClose = () => {
			console.log("Debug>>> onClose");
			showModal.value = false;
		};

		const openModal = (id) => {
			console.log("debug>>> todo id", id);
			deleteTodoId = id;
			showModal.value = true;
		};
		return {
			//이 데이터들을 리턴해줘야 템플릿에서 사용이 가능하다.
			todo,
			todos,
			searchTxt,
			filteredTodos,
			toggleTodo,
			showAlert,
			alertMsg,
			alertType,
			moveToCreate,
			onClose,
			showModal,
			openModal,
			deleteTodo,
		};
	},
};
</script>

<style></style>
