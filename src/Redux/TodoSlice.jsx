import { createSlice } from "@reduxjs/toolkit";

const TodoSlice= createSlice({
   name: 'Todo',
   initialState: {
    Todos:[],
    count:0,
    
   },
   reducers:{
    AddTodo(state,action) {
      const todo= {
        id:Math.random(),
        text:action.payload,
        isEditable:false,
        completed:false
      }
      state.Todos.push(todo);
      state.count++;

    },
    RemoveTodo(state,action) {
      state.Todos= state.Todos.filter((todo)=>todo.id!==action.payload);
      state.count--;
    },
    ToggleEdit(state,action) {
      const todo= state.Todos.find((todo)=>todo.id===action.payload);
      if(todo){
        todo.isEditable=!todo.isEditable;
      }
    },
    SaveEdit(state,action) {
      state.Todos.map((todo)=>todo.id===action.payload.id?todo.text=action.payload.data:null)
    },
    ToggleCompleted(state,action){
      state.Todos.map((todo)=>todo.id===action.payload.id?todo.completed=!todo.completed:null)
      console.log(state.Todos);
    }
   }
})

export const {AddTodo,RemoveTodo,ToggleEdit,SaveEdit,ToggleCompleted}=TodoSlice.actions
export default TodoSlice.reducer