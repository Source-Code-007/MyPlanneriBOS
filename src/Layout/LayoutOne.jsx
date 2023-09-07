import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Shared/Sidebar';
import Navbar from '../Shared/Navbar';

const LayoutOne = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='flex bg-slate-900 text-white'>
                <div className='h-screen w-16 fixed left-0 top-0 z-30'>
                    <Sidebar></Sidebar>
                </div>
                <div className='w-full'>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default LayoutOne;