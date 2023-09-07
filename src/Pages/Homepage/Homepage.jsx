import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Provider/authProvider';
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyLoading from '../../Components/HelpingCompo/MyLoading';
import CreateTeamModal from '../../Components/HelpingCompo/CreateTeamModal';


const Homepage = () => {
    const { user, authLoading } = useAuth()
    const [tasks, setTasks] = useState([])
    const [tasksLoading, setTasksLoading] = useState(true)



    // useEffect(() => {
    //     if(user){
    //         axiosSecure(`/get-tasks?email=${user?.email}`)
    //             .then(res => { console.log(res.data); setTasks(res.data); setTasksLoading(false) })
    //             .catch(e => {console.log(e.message); setTasksLoading(false)})
    //     }
    // }, [user])


    return (
        <div className='h-[3000px] pt-12 bg-slate-900'>
            <div className='w-3/6 mx-auto bg-slate-400 text-white text-center bg-opacity-20 p-4 space-y-5 rounded'>
                {authLoading ? <MyLoading className={'h-14 w-14'} /> : user && <p className='font-semibold text-lg'>Hello, <span className='text-purple-500'>{user?.displayName}</span></p>}
                {/* {tasksLoading? <MyLoading className={'h-14 w-14'}/> :tasks.length>0 && <p className='font-semibold text-3xl'>{tasks.length} tasks total!</p>} */}
                <h2 className='font-bold text-3xl'>Welcome to <span className='text-emerald-500'>My Planner</span></h2>
                <div className='flex justify-center gap-2'>
                    <Link to={'/add-task'}><button className='!flex gap-1 items-center my-btn-one'>Add Task <FaPlus></FaPlus> </button></Link>
                    <button className='!flex gap-1 items-center my-btn-one' onClick={() => document.getElementById('my_modal_1').showModal()}> Create Team <FaPlus></FaPlus> </button>
                </div>
            </div>
            {/* Create team modal */}
            <CreateTeamModal></CreateTeamModal>
        </div>
    );
};

export default Homepage;