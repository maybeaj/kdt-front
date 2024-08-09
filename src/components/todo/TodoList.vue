<template>
    <!-- v-for 카드의 바디가 반복 -->
    <div v-for="(data, index) in todos" :key="data.id" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center"
            @click="moveToView(data.id)"
            style="cursor:pointer">
        <div class="form-check flex-grow-1">
          <input
            type="checkbox"
            class="form-check-input"
            :checked="data.completed"
            @change="toggleTodo(index)"
            @click.stop
          />
          <!--자식에서는 양방향이 안되기 때문에 v-바인딩으로 :value로 바꿔줌 -->
          <label
            class="form-check-label"
            :style="data.completed ? todoStyle : {}"
          >
            {{ data.subject }}</label
          >
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click.stop="onDelete(index)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>

import { useRouter } from 'vue-router';

  export default {
    props: {
      todos: {
        //내려받을 이름
        type: Array, //데이터 타입
        required: true, //데이터가 반드시 있어야함
      },
    },
    emits: ["toggle-todo", "delete-todo"],
    setup(props, context) {
      const router = useRouter();
      const moveToView = (todoId) =>  {
        //router.push(`/todos/${todoId}`);
        router.push({
          name : 'Todo',
          params : {
            id : todoId
          }
        });
    }
      const todoStyle = {
        textDecoration: "line-through",
        color: "gray",
      };
      //toggle-todo, delete-todo는 emit을 통해 올릴 데이터의 이름
      const toggleTodo = (index) => {
        context.emit("toggle-todo", index);
      };
      const onDelete = (index) => {
        context.emit("delete-todo", index);
      };
      return {
        todoStyle,
        toggleTodo,
        onDelete,
        moveToView
      };
    },
  };
  </script>
  
  <style></style>
  