import {createRouter, createWebHistory} from 'vue-router';


import Home from '../todos/pages/TodoIndex.vue';
import Todos from '../todos/pages/component/TodosMain.vue';
import Create from '../todos/pages/component/TodoCreate.vue';
import Todo from '../todos/pages/component/TodoView.vue';
import Life from '@/components/test/TestLifecycle.vue'



const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/',
            name : 'Home',
            component : Home
        },
        {
            path: '/todos',
            name : 'Todos',
            component : Todos
        },
        {
            path: '/todos/:id',
            name : 'Todo',
            component : Todo
        },
        {
            path: '/life',
            name : 'Life',
            component : Life
        },
        {
            path: '/todos/create',
            name : 'Create',
            component : Create
        }
    ]

});

export default router ;