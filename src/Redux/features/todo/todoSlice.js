import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        insertTodo: (state, action) => {
            state.value.push(action.payload)
        },
        handleStatusTodo: (state, action) => {
            // const restTodo = state.value.filter(tf => tf._id !== action.payload)
            const updateTodoStatus = state.value.find(td => td._id === action.payload?._id)
            // console.log(confirmTodo);
            updateTodoStatus.status = action.payload?.status
            // state.value = [...restTodo, confirmTodo]
        },
        deleteTodo: (state, action) => {
            state.value = state.value.filter(td => td._id !== action.payload)
        },
    },
})

export const { insertTodo, handleStatusTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer