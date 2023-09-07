import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useAuth } from '../../Provider/authProvider';

const ViewTask = () => {
    const todoList = useSelector(state => state.todo.value)
    const {user} = useAuth()
    // const {axiosSecure} = UseAxiosSecure()
    const [myTasks, setMyTasks] = useState([])
    const [tasksLoading, setTasksLoading] = useState(true)

    // useEffect(()=>{
    //     if(user){
    //         axiosSecure(`/get-tasks?email=${user?.email}`)
    //             .then(res => { console.log(res.data); setMyTasks(res.data); setTasksLoading(false) })
    //             .catch(e => {console.log(e.message); setTasksLoading(false)})
    //     }
    // }, [user])

    return (
        <div className='min-h-screen pt-12 bg-slate-900'>
            <div className='w-3/6 mx-auto bg-slate-400 bg-opacity-20 p-4 space-y-5 rounded'>

                <Tabs className='w-full p-4 max-h-[500px] overflow-y-scroll view-task-scrollbar'>
                    <TabList className='flex gap-2 mb-4'>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>All</Tab>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>Pending</Tab>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>Completed</Tab>
                        <Tab className={'border border-slate-200 bg-slate-100 p-2 cursor-pointer text-black font-semibold'}>Clear Completed</Tab>
                    </TabList>

                    <TabPanel>
                        {
                            myTasks?.map((td, ind) => {
                                return <div key={ind} className={`text-white rounded p-3 my-2 ${td.status === 'confirm' ? `bg-green-200 text-black` : 'bg-slate-900 bg-opacity-50'}`}>
                                    <h2>{td.title}</h2>
                                    <span>{td.status}</span>
                                </div>
                            })
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            myTasks?.filter(tf => tf.status === 'pending').map((td, ind) => <h2 className=' p-3 rounded my-2 bg-slate-900 bg-opacity-50' key={ind}>{td.title}</h2>)
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            myTasks?.filter(tf => tf.status === 'complete').map((td, ind) => <h2 className=' p-2 my-2 bg-slate-900 bg-opacity-50' key={ind}>{td.title}</h2>)
                        }
                    </TabPanel>
                    <TabPanel>
                        <h2>Clear Completed</h2>
                    </TabPanel>
                </Tabs>
            </div>

        </div>
    );
};

export default ViewTask;