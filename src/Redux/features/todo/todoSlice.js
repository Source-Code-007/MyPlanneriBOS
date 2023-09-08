import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        insertInitiaTodoFromLS: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        insertTodo: (state, action) => {
            state.value.push(action.payload)
        },
        handleStatusTodo: (state, action) => {
            const updateTodoStatus = state.value.find(td => td._id === action.payload?._id)
            updateTodoStatus.status = action.payload?.status
        },
        deleteTodo: (state, action) => {
            state.value = state.value.filter(td => td._id !== action.payload)
        },
    },
})

export const { insertTodo, handleStatusTodo, insertInitiaTodoFromLS, deleteTodo } = todoSlice.actions

export default todoSlice.reducer