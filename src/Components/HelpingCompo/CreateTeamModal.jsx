import React, { useRef } from 'react';
import { ImCross } from "react-icons/im";
import modalBG from '/public/assets/img/signinBg.jpg'
import myLocalDB from '../../util/localDB';
import { useAuth } from '../../Provider/authProvider';

const CreateTeamModal = () => {
    const teamNameRef = useRef()
    const {user} = useAuth()
    const { createTeam } = myLocalDB

    // create team func
    const createTeamFunc = () => {
        createTeam({ teamName: teamNameRef.current?.value, member: [] })
        window.location.reload()
    }


    return (
        <dialog id="my_modal_1" className="modal bg-[#000000b8]" >
            <div className="modal-box relative bg-slate-300 bg-opacity-50 text-black">
                <div className="modal-action justify-center">
                    <form method="dialog" className='space-y-3 w-full'>
                        <button className="text-red-500 px-2 py-1 rounded bg-slate-50 bg-opacity-50 text-sm absolute left-2 top-2" type='submit'><ImCross></ImCross> </button>
                        <input type="text" className='my-inp w-full' ref={teamNameRef} placeholder='Your team name here!' />
                        <div className='text-center'>
                            <button className="my-btn-one" onClick={createTeamFunc}>Add team</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default CreateTeamModal;