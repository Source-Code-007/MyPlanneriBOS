import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Provider/authProvider';
import MyLoading from '../Components/HelpingCompo/MyLoading';
import { FaSignOutAlt, FaTasks, FaUser } from 'react-icons/fa';
import myLocalDB from '../util/localDB';

const Navbar = () => {
    const { user, setUser, authLoading, setAuthLoading, signInByEmailFunc, signoutFunc } = useAuth()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const profileRef = useRef(null);
    const {getMyProfile} = myLocalDB
    const myProfile = getMyProfile(user?.email)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

   

    // handle signout fuc
    const handleSignoutFunc = () => {
        signoutFunc().then(()=> {console.log('signout'); setAuthLoading(false); setUser(null)}).catch(e=> {console.log(e.message); setAuthLoading(false)})
    }

    return (
        <div className="navbar bg-slate-900 text-slate-50 border-b border-slate-700 sticky top-0 w-full z-40 justify-between">
            <div className="navbar-start">
                <Link className="btn btn-ghost normal-case text-xl" to={'/'}>My Planner</Link>
            </div>
            <div className="navbar-end gap-3 w-80">
                <form className='searchForm !text-red-500'>
                    <label htmlFor="search">Search</label>
                    <input id="search" type="search" pattern=".*\S.*" required />
                    <span className="caret"></span>
                </form>
                {
                    authLoading ? <MyLoading className={'h-12 w-12'} /> : user ?
                        <>
                            <figure className='relative w-16' onClick={() => setIsProfileOpen(!isProfileOpen)} ref={profileRef}>
                                <img src={user?.photoURL} title={user?.displayName} alt={user.displayName} className='h-12 w-12 block cursor-pointer rounded-full border-2 border-purple-500' />
                                <ul className={`absolute top-full p-3 bg-slate-900 text-slate-100 border-2 border-purple-500 w-40 rounded transition-all duration-500 origin-top ${!isProfileOpen ? 'opacity-0 invisible -right-10' : 'opacity-100 visible right-2'}`}>
                                    <Link to={'/my-profile'}>  <li className='flex gap-2 items-center py-2 cursor-pointer'> <FaUser></FaUser> My Profile</li></Link>
                                    <Link to={'/view-task'}>  <li className='flex gap-2 items-center py-2 cursor-pointer'> <FaTasks></FaTasks> My Tasks</li></Link>
                                    <li className='flex gap-2 items-center py-2 cursor-pointer' onClick={handleSignoutFunc}> <FaSignOutAlt></FaSignOutAlt> Sign Out</li>
                                </ul>
                            </figure>
                        </>
                        : <Link to={'signin'}><button className='my-btn-one'>Signin</button></Link>
                }
            </div>
        </div>
    );
};

export default Navbar;