<template>
	<div class="container">
		<form @submit.prevent="addTodo" class="d-flex">
			<div class="flex-grow-1 mr-2">
				<input
					class="form-control"
					type="text"
					placeholder="Add Your To-Do"
					v-model="todo"
				/><!-- 변수 자체가 리엑티브한 상태 -->
			</div>
			<div>
				<button class="btn btn-primary" type="submit">Add</button>
			</div>
		</form>
		<div v-show="hasError" style="color: red">
			This field cannot be empty!!!
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import axios from "@/axios";
import { useRouter } from "vue-router";

export default {
	setup() {
		const todo = ref("");
		const todos = ref([]);
		const hasError = ref(false);
		const router = useRouter(); //push() transmition

		const moveToTodos = () => {
			// router.push("/todos");
			router.push({
				name: "Todos",
			});
		};

		const addTodo = async () => {
			if (todo.value === "") {
				hasError.value = true;
				return; // 빈 입력일 경우 함수 종료
			}

			hasError.value = false;

			const newTodo = {
				id: Date.now(),
				subject: todo.value,
				completed: false,
			};

			try {
				const response = await axios.post("todos", newTodo);
				todos.value.push(response.data);
                todo.value='';
				moveToTodos();
			} catch (error) {
				console.log(error);
			}
		};

		return {
			todo,
			hasError,
			addTodo,
		};
	},
};
</script>

<style></style>
