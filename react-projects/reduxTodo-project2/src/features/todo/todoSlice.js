import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos:[{id: 1, text:"Hello World"}]
}

// function sayHello() {
//     console.log("Hello world")
// }

// export const todoSlice = createSlice({
//     name: 'todo',
//     initialState,
//     // in reducer properties & function
//     reducers: {
//         addTodo: sayHello,
//     }
// })



// export const todoSlice = createSlice({
//     name: 'todo',
//     initialState,
//     // in reducer properties & function  , state ,action
//     reducers: {
//         addTodo: (state, action) =>{
//             const todo = {
//                 id: Date.now(), 
//                 text:"Hello World"
//             }
//         },
//         removeTodo: () => {},
//     }
// })


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    // in reducer properties & function  , state ,action
    reducers: {
        addTodo: (state, action) =>{
            const todo = {
                id: nanoid(), 
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        //update delete assignment
    }
})

export const{addTodo , removeTodo} =todoSlice.actions

export default todoSlice.reducer