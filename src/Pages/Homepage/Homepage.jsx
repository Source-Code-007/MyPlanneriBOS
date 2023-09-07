import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Provider/authProvider';
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import MyLoading from '../../Components/HelpingCompo/MyLoading';
import CreateTeamModal from '../../Components/HelpingCompo/CreateTeamModal';
import myLocalDB from '../../util/localDB';
import AddMemberInTeamModal from '../../Components/HelpingCompo/AddMemberInTeamModal';


const Homepage = () => {
    const { user, authLoading } = useAuth()
    const [tasks, setTasks] = useState([])
    const [tasksLoading, setTasksLoading] = useState(true)
    const {getTeam} = myLocalDB
    const [activeTeam,setActiveTeam] = useState('')
    const allTeam = getTeam()
    const navigate = useNavigate()



    // useEffect(() => {
    //     if(user){
    //         axiosSecure(`/get-tasks?email=${user?.email}`)
    //             .then(res => { console.log(res.data); setTasks(res.data); setTasksLoading(false) })
    //             .catch(e => {console.log(e.message); setTasksLoading(false)})
    //     }
    // }, [user])


    // createTeamFunc
    const createTeamFunc = ()=>{

        if(!user){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
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
        }

        document.getElementById('my_modal_1').showModal()
    }

    if(authLoading){
        return <div className='h-screen flex items-center justify-center'>
            <MyLoading className={'h-14 w-14'} />
        </div>
    }

    return (
        <div className='min-h-screen pt-12 bg-slate-900 space-y-4'>
            <div className='w-3/6 mx-auto bg-slate-400 text-white text-center bg-opacity-20 p-4 space-y-5 rounded'>
                { user && <p className='font-semibold text-lg'>Hello, <span className='text-purple-500'>{user?.displayName}</span></p>}
                {/* {tasksLoading? <MyLoading className={'h-14 w-14'}/> :tasks.length>0 && <p className='font-semibold text-3xl'>{tasks.length} tasks total!</p>} */}
                <h2 className='font-bold text-3xl'>Welcome to <span className='text-emerald-500'>My Planner</span></h2>
                <div className='flex justify-center gap-2'>
                    <Link to={'/add-task'}><button className='!flex gap-1 items-center my-btn-one'>Add Task <FaPlus></FaPlus> </button></Link>
                    <button className='!flex gap-1 items-center my-btn-one' onClick={createTeamFunc}> Create Team <FaPlus></FaPlus> </button>
                </div>
                <h2 className='font-bold text-3xl'>All Team</h2>
                {
                    !allTeam?.length>0? <span className='my-2 font-bold text-red-300'>No team found!</span> : allTeam.map((team, ind)=> <div key={ind} className='bg-emerald-500 py-2 px-4 font-semibold space-y-3 flex items-center justify-between'>{team.teamName} <FaPlus className='cursor-pointer' onClick={() => {document.getElementById('my_modal_2').showModal(); setActiveTeam(team.teamName)}}></FaPlus></div>)
                }

            </div>

            <div className='w-3/6 mx-auto bg-slate-400 text-white text-center bg-opacity-20 p-4 space-y-5 rounded'>
                <h2 className='my-subtitle'>Notifications</h2>
            </div>


            {/* Create team modal */}
            <CreateTeamModal></CreateTeamModal>
            <AddMemberInTeamModal activeTeam={activeTeam}></AddMemberInTeamModal>
        </div>
    );
};

export default Homepage;