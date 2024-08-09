<template>
    <form @submit.prevent="onSubmit" class="d-flex">
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
    <div v-show="hasError" style="color: red">This field cannot be empty!!!</div>
  </template>
  
  <script>
  import { ref } from "vue";
  export default {
    emits: ["add-todo"],
    setup(props, context) {
      const todo = ref("");
      const hasError = ref(false);
      const onSubmit = () => {
        if (todo.value === "") {
          hasError.value = true;
        } else {
          context.emit("add-todo", {
            //emit을 통해 상위 컴포넌트로 올림
            id: Date.now(),
            subject: todo.value,
            completed: false,
          });
          hasError.value = false;
          todo.value = "";
        }
      };
  
      return {
        todo,
        hasError,
        onSubmit,
      };
    },
  };
  </script>
  
  <style></style>