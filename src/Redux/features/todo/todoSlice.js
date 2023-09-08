import { createSlice, current } from "@reduxjs/toolkit";
import myLocalDB from "../../../util/localDB";


const { getMyTasks } = myLocalDB
const currentUser = localStorage.getItem('currentUser')
const myTasks = getMyTasks(currentUser)
console.log(currentUser);
console.log(myTasks);
const initialState = {
    value: myTasks.length > 0 ? myTasks : []
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
        sortTodo: (state, action) => {
            console.log(action.payload);
            // For ascending or descending
            if (action.payload.type === 'order') {
                if (action.payload?.value === 'ascending') {
                    state.value.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
                }
                else if (action.payload?.value === 'descending') {
                    state.value.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
                }
            }
        },
        deleteTodo: (state, action) => {
            state.value = state.value.filter(td => td._id !== action.payload)
        },
    },
})

export const { insertTodo, handleStatusTodo, insertInitiaTodoFromLS, sortTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer