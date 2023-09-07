import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    value: []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        insertTodo: (state, action) => {
            const newTodo = {
                _id: uuidv4(),
                title: action.payload.title,
                status: action.payload.status
            }
            state.value.push(newTodo)
        },
        confirmTodo: (state, action) => {
            // const restTodo = state.value.filter(tf => tf._id !== action.payload)
            const confirmTodo = state.value.find(td => td._id === action.payload)
            // console.log(confirmTodo);
            confirmTodo.status = 'confirm'
            // state.value = [...restTodo, confirmTodo]
        },
        deleteTodo: (state, action) => {
            state.value = state.value.filter(td => td._id !== action.payload)
        },
    },
})

export const { insertTodo, confirmTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer