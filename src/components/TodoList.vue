<template>
  <div>
    <div class="row">
      <div class="col">
        <h2>{{ title }}</h2>

        <ul class="list-group mb-3">
          <li
            v-for="todo in todosFromServer"
            :key="todo"
            class="list-group-item"
            @click="getTodo(todo._id)"
          >
            {{ todo.title }} 
            {{ todo.status }}

            <button
              @click="completeTodo(todo._id)"
              type="submit"
              class="btn btn-primary m-1"
            >
              {{ changeState(todo.status) }}
            </button>
            <button
              @click="deleteTodo(todo._id)"
              type="submit"
              class="btn btn-primary m-1"
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input
          v-model="newTodo"
          type="text"
          name="newTodo"
          class="form-control"
        />
      </div>
      <div class="col">
        <button @click="addTodo" type="submit" class="btn btn-primary w-100">
          Add new todo
        </button>
      </div>
    </div>
    {{ singleTodo }}
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  name: "TodoList",
  props: {
    title: String,
  },
  setup() {
    const todos = ref(["Read a book", "Go for a walk", "Eat food"]);
    const newTodo = ref("");
    const todosFromServer = ref([]);
    const singleTodo = ref({});
    
    async function getTodos() {
      const result = await axios.get("/api/get-todos");
      todosFromServer.value = result.data;
      console.log(result.data);
    }
    async function getTodo(id) {
      const result = await axios.get("/api/get-todo/" + id);
      singleTodo.value = result.data;
      console.log(result.data);
    }

    async function completeTodo(id) {
      console.log("FE status update started", id);
      const result = await axios.patch("/api/patch-todo/" + id);
      console.log("FE status update sent: ", result.data.status);
      await getTodos();
    }

    async function deleteTodo(id) {
      const result = await axios.post("/api/delete-todo/" + id);
      singleTodo.value = result.data;
      console.log("Delete todo: ", result.data);
      await getTodos();
    }

    async function addTodo() {
      await axios.post("/api/add-todo", {
        title: newTodo.value,
        status: "ACTIVE",
      });
      newTodo.value = "";
      await getTodos();
    }

    getTodos();

    function addNewTodo() {
      todos.value.push(newTodo.value);
      newTodo.value = "";
    }
    return {
      todos,
      newTodo,
      addNewTodo,
      todosFromServer,
      addTodo,
      singleTodo,
      getTodo,
      getTodos,
      completeTodo,
      deleteTodo,
    };
  },
  methods: {
    changeState(input) {
      if (input === "ACTIVE") {
        return this.todoComplete;
      } else {
        return this.todoActivate;
      }
    },
  },
};
</script>

<style scoped>
.completed {
  background-color: silver;
}
</style>