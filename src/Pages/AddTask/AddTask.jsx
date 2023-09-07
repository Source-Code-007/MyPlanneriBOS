import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmTodo, deleteTodo, insertTodo } from '../../Redux/features/todo/todoSlice';
import { FaCheck, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useAuth } from '../../Provider/authProvider';
import MyLoading from '../../Components/HelpingCompo/MyLoading';


const AddTask = () => {
    const todoList = useSelector(state => state.todo.value)
    const { user, authLoading } = useAuth()
    const dispatch = useDispatch()
    const { axiosSecure } = UseAxiosSecure()
    const [insertTaskLoading, setInsertTaskLoading] = useState(false)
    const [tasksLoading, setTasksLoading] = useState(true)
    const [tasks, setTasks] = useState([])

    // useEffect(() => {
    //     if(user){
    //         axiosSecure(`/get-tasks?email=${user?.email}`)
    //             .then(res => { console.log(res.data); setTasks(res.data); setTasksLoading(false) })
    //             .catch(e => {console.log(e.message); setTasksLoading(false)})
    //     }
    // }, [user])

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = form => {
        setInsertTaskLoading(true)
        const { title, dateTime, priority } = form
        console.log(title, dateTime, priority);

        // insert task to local state by redux
        dispatch(insertTodo({ title: title, status: 'pending', deadline: dateTime, priority: priority }))

        // insert task to databse
        axiosSecure.post('/insert-tasks', { title: title, status: 'pending', deadline: dateTime, priority: priority, user: user?.email })
            .then(res => {
                setInsertTaskLoading(false)
                console.log(res.data)
                if (res.data?.insertedId) {
                    toast('Task added!', {
                        position: "bottom-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
            .catch(e => { console.log(e.message); setInsertTaskLoading(false) })

        reset()
    };

    // const confirmTodoFunc = (id) => {
    //     dispatch(confirmTodo(id))
    //     toast('Task confirmed!', {
    //         position: "bottom-right",
    //         autoClose: 1500,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //     });
    // }


    return (
        <div className='min-h-screen pt-12 bg-slate-900'>
            <div className='w-3/6 mx-auto bg-slate-400 bg-opacity-20 p-4 space-y-5 rounded'>
                <div>
                    <h2 className='font-bold text-3xl text-white'>Today's TODO!</h2>
                    <h2 className='font-semibold text-lg text-slate-300'>Create a list of task.</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4 text-slate-700'>
                    <div>
                        <label className='text-white' htmlFor="task">Tasks</label>
                        <input type="text" id='task' placeholder="Your task here" className="my-inp" {...register("title", { required: true })} />
                        {errors.title && <span className='text-red-500 block font-semibold'>Task is required!</span>}
                    </div>
                    <div>
                        <label className='text-white' htmlFor="descripion">Description</label>
                        <input type="text" id='descripion' placeholder="Your description here" className="my-inp" {...register("description", { required: true })} />
                        {errors.description && <span className='text-red-500 block font-semibold'>Description is required!</span>}
                    </div>
                    <div>
                        <label className='text-white' htmlFor="due-date">Due Date</label>
                        <input className='my-inp' id='due-date' type="datetime-local" {...register("dateTime", { required: true })} />
                        {errors.dateTime && <span className='text-red-500 block font-semibold'>Date and time are required!</span>}
                    </div>
                    <div>
                        <label className='text-white' htmlFor="priority-level">Priority Level</label>
                        <select className="select my-inp w-full" id='priority-level' defaultValue={''} {...register("priority", { required: true })}>
                            <option value={''} disabled>Priority</option>
                            <option value={'Low'}>Low</option>
                            <option value={'Medium'}>Medium</option>
                            <option value={'High'}>High</option>
                        </select>
                        {errors.priority && <span className='text-red-500 block font-semibold'>Priority is required!</span>}
                    </div>
                    {/* team */}
                    <div>
                        <label className='text-white' htmlFor="team">Team</label>
                        <select className="select my-inp w-full" id='team' defaultValue={''} {...register("priority", { required: true })}>
                            <option value={''} disabled>Priority</option>
                            <option value={'Low'}>Low</option>
                            <option value={'Medium'}>Medium</option>
                            <option value={'High'}>High</option>
                        </select>
                        {errors.priority && <span className='text-red-500 block font-semibold'>Priority is required!</span>}
                    </div>

                    <button className={`my-btn-one !flex items-center gap-2 ${insertTaskLoading ? 'opacity-40 !cursor-auto' : 'opacity-100 !cursor-pointer'}`} disabled={insertTaskLoading} type='submit'> <span><FaPlus></FaPlus></span> Add Task</button>
                </form>

                {/* My todo */}
                {/* <div className='my-4'>
                    {tasksLoading? <MyLoading></MyLoading> :tasks?.map((td, ind) => <p key={ind} className={`text-white p-4 rounded ${td.status === 'pending' ? 'bg-slate-900 bg-opacity-50' : 'bg-green-200 text-black'} my-3 relative`}>{td.title}  {td.status === 'pending' && <span className='bg-green-500 rounded h-6 w-6 flex items-center justify-center cursor-pointer absolute right-8 top-1/2 -translate-y-1/2' onClick={() => confirmTodoFunc(td._id)}><FaCheck></FaCheck></span>} <span className='bg-[#f87272] rounded h-6 w-6 flex items-center justify-center cursor-pointer absolute right-1 top-1/2 -translate-y-1/2' onClick={() => dispatch(deleteTodo(td._id))}>X</span></p>)}
                </div> */}
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default AddTask;