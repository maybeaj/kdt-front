<template>
	<input
		class="form-control"
		type="text"
		v-model="searchTxt"
		placeholder="Search.."
	/>
	<!--v-model : 양반향 통신 -->
	<TodoForm @add-todo="addTodo" />
	<TodoList
		:todos="filteredTodos"
		@toggle-todo="toggleTodo"
		@delete-todo="onDelete"
	/>
	<!-- v-vind ":" 와 같은 뜻 - props로 내리기 위함 / emit을 통해 올려 받은 내용은 함수로 다시 받음 -->
</template>

<script>
import { ref, computed } from "vue";
import TodoForm from "./components/todo/TodoForm.vue";
import TodoList from "./components/todo/TodoList.vue";
import axios from "axios";
//템플릿에서 사용되는 반드시 스크립트를 이용해서 데이터가 이용되고 반환되어야 한다.
export default {
	components: {
		TodoForm,
		TodoList,
	},
	setup() {
		const todo = ref("");
		const todos = ref([]);
		const searchTxt = ref("");
		//getTodos 페이지 로딩 시 json-server 부터 모든 데이터를 select
		//get-select, post-insert, delete-delete, update-patch
		const getTodos = async () => {
			try {
				const response = await axios.get("http://localhost:3000/todos");
				console.log("getTodos response", response.data);
				todos.value = response.data;
			} catch (error) {
				console.log(error);
			}
		};
		getTodos();

		// const onDelete = (index) => {
		// 	todos.value.splice(index, 1); // 해당 인덱스를 삭제하겠다. - 배열 요소 삭제
		// };

		const onDelete = async (index) => {
			const id = todos.value[index].id;
			try {
				//axios 통신을 통해서 키값을 전달하고 json-server 쪽에서 삭제
				const response = await axios.delete(
					`http://localhost:3000/todos/${id}`
				);
				console.log("debug>>> todos delete response", response);
				todos.value.splice(index, 1); // 해당 인덱스를 삭제하겠다. - 배열 요소 삭제
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
		/*
        기존 배열에 담았던 객체 정보를
        axios 통신을 통해서 json-server db.json에 저장하도록 변경
        const addTodo = (data) => {
			todos.value.push(data);
		};
        
		const addTodo = (data) => {
			axios.post('http://localhost:3000/todos',{
                id : Date.now(),
                subject : data.subject,
                completed : data.completed
            }).then( response=> {
                console.log (response.data);
                todos.value.push( response.data);
            }).catch( error => {
                console.log(error);
            })
		};
        */
		const addTodo = async (data) => {
			try {
				const response = await axios.post("http://localhost:3000/todos", {
					id: Date.now(),
					subject: data.subject,
					completed: data.completed,
				});
				todos.value.push(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		/*
		const toggleTodo = (index) => {
			todos.value[index].completed = !todos.value[index].completed;
		};
        */
		const toggleTodo = async (index) => {
			const key = todos.value[index].id;
            const updateData = {
                    completed: !todos.value[index].completed
                };
			try {
				const response = await axios.patch(`http://localhost:3000/todos/${key}`,updateData);
				console.log("debug update response", response.data);
                todos.value[index].completed = response.data.completed;
			} catch (error) {
				console.log(error);
			}
		};

		return {
			//이 데이터들을 리턴해줘야 템플릿에서 사용이 가능하다.
			todo,
			todos,
			onDelete,
			searchTxt,
			filteredTodos,
			addTodo,
			toggleTodo,
		};
	},
};
</script>

<style></style>
