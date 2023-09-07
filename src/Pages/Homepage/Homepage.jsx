import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Provider/authProvider';
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import MyLoading from '../../Components/HelpingCompo/MyLoading';
import CreateTeamModal from '../../Components/HelpingCompo/CreateTeamModal';
import myLocalDB from '../../util/localDB';
import AddMemberInTeamModal from '../../Components/HelpingCompo/AddMemberInTeamModal';
import Swal from 'sweetalert2';


const Homepage = () => {
    const { user, authLoading } = useAuth()
    const [tasks, setTasks] = useState([])
    const [tasksLoading, setTasksLoading] = useState(true)
    const { getTeam, getMyTeamInfo } = myLocalDB
    const [activeTeam, setActiveTeam] = useState('')
    const allTeam = getTeam()
    const myTeamInfo = getMyTeamInfo(user?.email)
    const navigate = useNavigate()



    // useEffect(() => {
    //     if(user){
    //         axiosSecure(`/get-tasks?email=${user?.email}`)
    //             .then(res => { console.log(res.data); setTasks(res.data); setTasksLoading(false) })
    //             .catch(e => {console.log(e.message); setTasksLoading(false)})
    //     }
    // }, [user])


    // createTeamFunc


    // addTaskFunc
    const addTaskFunc = () => {
        if (!user) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You have to signin first!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, signin!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signin')
                }
            })
            return
        }
    }

    // create team func
    const createTeamFunc = () => {

        if (!user) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You have to signin first!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, signin!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signin')
                }
            })
            return
        }

        document.getElementById('my_modal_1').showModal()
    }

    // addMemberInTeamFunc
    const addMemberInTeamFunc = (team) => {
        if (!user) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You have to signin first!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, signin!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signin')
                }
            })
            return
        }


        document.getElementById('my_modal_2').showModal();
        setActiveTeam(team.teamName);
    }


    // rejectTeamInviteFunc
    const rejectTeamInviteFunc = ()=>{
        
    }


    if (authLoading) {
        return <div className='h-screen flex items-center justify-center'>
            <MyLoading className={'h-14 w-14'} />
        </div>
    }

    return (
        <div className='min-h-screen pt-12 bg-slate-900 space-y-4'>
            <div className='w-3/6 mx-auto bg-slate-400 text-white text-center bg-opacity-20 p-4 space-y-5 rounded'>
                {user && <p className='font-semibold text-lg'>Hello, <span className='text-purple-500'>{user?.displayName}</span></p>}
                {/* {tasksLoading? <MyLoading className={'h-14 w-14'}/> :tasks.length>0 && <p className='font-semibold text-3xl'>{tasks.length} tasks total!</p>} */}
                <h2 className='font-bold text-3xl'>Welcome to <span className='text-emerald-500'>My Planner</span></h2>
                <div className='flex justify-center gap-2'>
                    <button className='!flex gap-1 items-center my-btn-one' onClick={addTaskFunc}>Add Task <FaPlus></FaPlus> </button>
                    <button className='!flex gap-1 items-center my-btn-one' onClick={createTeamFunc}> Create Team <FaPlus></FaPlus> </button>
                </div>
                <h2 className='font-bold text-3xl'>All Team</h2>
                {
                    !allTeam?.length > 0 ? <span className='my-2 font-bold text-red-300'>No team found!</span> : allTeam.map((team, ind) => <div key={ind} className='bg-emerald-500 py-2 px-4 font-semibold space-y-3 flex items-center justify-between'>{team.teamName} <FaPlus className='cursor-pointer' onClick={() => addMemberInTeamFunc(team)}></FaPlus></div>)
                }

            </div>


            {
                myTeamInfo?.length > 0 && <div className='w-3/6 mx-auto bg-slate-400 text-white text-center bg-opacity-20 p-4 space-y-5 rounded'>
                    <h2 className='my-subtitle'>Notifications</h2>
                    {
                        myTeamInfo?.map((teamInfo, ind) => <div className='bg-emerald-500 text-lg flex justify-between py-2 rounded px-6'><div>You're invited from <span className='text-purple-500 font-semibold'>{teamInfo?.teamName}</span> team</div> <span className='flex items-center gap-2'>
                            <FaCheck className='bg-white text-emerald-500 p-1 rounded cursor-pointer'></FaCheck> <FaTrash className='bg-white text-red-500 p-1 rounded cursor-pointer' onClick={rejectTeamInviteFunc}></FaTrash></span></div>)
                    }
                </div>
            }


            {/* Create team modal */}
            <CreateTeamModal></CreateTeamModal>
            <AddMemberInTeamModal activeTeam={activeTeam}></AddMemberInTeamModal>
        </div>
    );
};

export default Homepage;