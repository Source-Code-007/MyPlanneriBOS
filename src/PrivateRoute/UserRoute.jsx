import React from 'react';
import { useAuth } from '../Provider/authProvider';
import MyLoading from '../Components/HelpingCompo/MyLoading';
import { Navigate } from 'react-router-dom';

const UserRoute = ({children}) => {
    const {user, authLoading} = useAuth()

    if(authLoading){
        return <div className='h-screen flex items-center justify-center'>
            <MyLoading className={'h-14 w-14'} />
        </div>
    }

    if(!user){
        return <Navigate to={'/signin'} replace={true} />
    }

    return children
};

export default UserRoute;