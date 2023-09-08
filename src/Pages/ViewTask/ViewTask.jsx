import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useAuth } from '../../Provider/authProvider';
import myLocalDB from '../../util/localDB';
import { FaCalendar, FaClock, FaTrash } from 'react-icons/fa';
import { FaRightLong } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { deleteTodo, handleStatusTodo, insertInitiaTodoFromLS } from '../../Redux/features/todo/todoSlice';

const ViewTask = () => {
    const todoList = useSelector(state => state.todo.value)
    const dispatch = useDispatch()
    const { user } = useAuth()
    const { getMyTasks, setTaskStatus, deleteTask } = myLocalDB
    const myTasks = getMyTasks(user?.email)
    const hasMounted = useRef(false);
    // let MyLocalToDo = []
    // if(myTasks?.length>0){
    //     MyLocalToDo = [...myTasks, ...todoList]
    // }
    useEffect(() => {
        if (!hasMounted.current) {
            dispatch(insertInitiaTodoFromLS(myTasks))
        }
    }, [dispatch]);

    console.log(todoList);

    // set task status func
    const setTaskStatusFunc = (taskId, status) => {
        setTaskStatus(taskId, status)
        dispatch(handleStatusTodo({ _id: taskId, status }))
    }

    console.log(todoList);

    // delete task func
    const deleteTaskFunc = (taskId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You can not revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTask(taskId)
                dispatch(deleteTodo(taskId))
            }
        })
    }

    return (
        <div className='min-h-screen pt-12 bg-slate-900'>
            <div className='w-3/6 mx-auto bg-slate-400 bg-opacity-20 p-4 space-y-5 rounded'>

                <Tabs className='w-full p-4 max-h-[500px] overflow-y-scroll view-task-scrollbar'>
                    <TabList className='flex gap-2 mb-4'>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>All</Tab>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>Pending</Tab>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>In Progress</Tab>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>Completed</Tab>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>Clear Completed</Tab>
                    </TabList>

                    <TabPanel>
                        {
                            todoList?.length === 0 ? <div className='min-h-[50vh] flex items-center justify-center'><span className='bg-red-500 p-2 rounded text-white font-bold text-xl'>No task here!</span></div> : todoList?.map((td, ind) => {
                                return <div key={ind} className={`rounded p-3 my-2 text-slate-200 ${td.status === 'confirm' ? `bg-green-200 text-black` : 'bg-slate-900 bg-opacity-50'}`}>
                                    <h2 className='text-slate-50 font-bold text-xl'>{td.title}</h2>
                                    <span>Status: <span className='font-semibold text-white'>{td.status}</span></span>
                                    <p className='flex gap-2 items-center'>Deadline: <span className='flex gap-1 items-center'><FaCalendar></FaCalendar> {td.deadline?.split('T')[0]}</span> <span className='flex gap-1 items-center'><FaClock></FaClock>{td.deadline?.split('T')[1]}</span></p>
                                </div>
                            })
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            todoList?.filter(tf => tf.status === 'pending').length === 0 ? <div className='min-h-[50vh] flex items-center justify-center'><span className='bg-red-500 p-2 rounded text-white font-bold text-xl'>No task here!</span></div> : todoList?.filter(tf => tf.status === 'pending')?.map((td, ind) => {
                                return <div key={ind} className='p-3 rounded my-2 text-slate-200 bg-slate-900 bg-opacity-50 relative'>
                                    <h2 className='text-slate-50 font-bold text-xl'>{td.title}</h2>
                                    <p className='flex gap-2 items-center'>Deadline: <span className='flex gap-1 items-center'><FaCalendar></FaCalendar> {td.deadline?.split('T')[0]}</span> <span className='flex gap-1 items-center'><FaClock></FaClock>{td.deadline?.split('T')[1]}</span></p>
                                    <span className='absolute right-2 hover:right-1 transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => setTaskStatusFunc(td._id, 'in progress')}><FaRightLong></FaRightLong></span>
                                    <span className='absolute right-8 hover:scale-110 hover:text-red-500 transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => deleteTaskFunc(td._id)}><FaTrash></FaTrash></span>
                                </div>
                            })
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            todoList?.filter(tf => tf.status === 'in progress').length === 0 ? <div className='min-h-[50vh] flex items-center justify-center'><span className='bg-red-500 p-2 rounded text-white font-bold text-xl'>No task here!</span></div> : todoList?.filter(tf => tf.status === 'in progress')?.map((td, ind) => {
                                return <div key={ind} className='p-3 rounded my-2 text-slate-200 bg-slate-900 bg-opacity-50 relative'>
                                    <h2 className='text-slate-50 font-bold text-xl'>{td.title}</h2>
                                    <p className='flex gap-2 items-center'>Deadline: <span className='flex gap-1 items-center'><FaCalendar></FaCalendar> {td.deadline?.split('T')[0]}</span> <span className='flex gap-1 items-center'><FaClock></FaClock>{td.deadline?.split('T')[1]}</span></p>
                                    <span className='absolute right-2 hover:right-1 transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => setTaskStatusFunc(td._id, 'complete')}><FaRightLong></FaRightLong></span>
                                    <span className='absolute right-8 hover:scale-110 hover:text-red-500 transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => deleteTaskFunc(td._id)}><FaTrash></FaTrash></span>
                                </div>
                            })
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            todoList?.filter(tf => tf.status === 'complete').length === 0 ? <div className='min-h-[50vh] flex items-center justify-center'><span className='bg-red-500 p-2 rounded text-white font-bold text-xl'>No task here!</span></div> : todoList?.filter(tf => tf.status === 'complete')?.map((td, ind) => {
                                return <div key={ind} className='p-3 rounded my-2 text-slate-200 bg-slate-900 bg-opacity-50 relative'>
                                    <h2 className='text-slate-50 font-bold text-xl'>{td.title}</h2>
                                    <p className='flex gap-2 items-center'>Deadline: <span className='flex gap-1 items-center'><FaCalendar></FaCalendar> {td.deadline?.split('T')[0]}</span> <span className='flex gap-1 items-center'><FaClock></FaClock>{td.deadline?.split('T')[1]}</span></p>
                                    <span className='absolute right-2 hover:right-1 transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => setTaskStatusFunc(td._id, 'clear')}><FaRightLong></FaRightLong></span>
                                    <span className='absolute right-8 hover:scale-110 hover:text-red-500 transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => deleteTaskFunc(td._id)}><FaTrash></FaTrash></span>
                                </div>
                            })
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            todoList?.filter(tf => tf.status === 'clear').length === 0 ? <div className='min-h-[50vh] flex items-center justify-center'><span className='bg-red-500 p-2 rounded text-white font-bold text-xl'>No task here!</span></div> : todoList?.filter(tf => tf.status === 'clear')?.map((td, ind) => {
                                return <div key={ind} className='p-3 rounded my-2 text-slate-100 bg-red-300 bg-opacity-50 relative'>
                                    <h2 className='text-slate-50 font-bold text-xl'>{td.title}</h2>
                                    <p className='flex gap-2 items-center'>Deadline: <span className='flex gap-1 items-center'><FaCalendar></FaCalendar> {td.deadline?.split('T')[0]}</span> <span className='flex gap-1 items-center'><FaClock></FaClock>{td.deadline?.split('T')[1]}</span></p>
                                    <span className='absolute right-8 hover:scale-110 hover:text-red-500 transition-all duration-500 cursor-pointer top-1/2 -translate-y-1/2' onClick={() => deleteTaskFunc(td._id)}><FaTrash></FaTrash></span>
                                </div>
                            })
                        }
                    </TabPanel>
                </Tabs>
            </div>

        </div>
    );
};

export default ViewTask;