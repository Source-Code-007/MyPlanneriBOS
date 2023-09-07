import React, { useRef } from 'react';
import { ImCross } from "react-icons/im";
import modalBG from '/public/assets/img/signinBg.jpg'
import myLocalDB from '../../util/localDB';

const AddMemberInTeamModal = ({activeTeam}) => {
    const userNameRef = useRef()
    const { isUserInTeamFunc, getUser } = myLocalDB
    const allUser = getUser()


    console.log(activeTeam);

    // create team func
    const addUserInTeamFunc = () => {
        isUserInTeamFunc(userNameRef.current?.value, activeTeam)
        window.location.reload()
    }


    return (
        <dialog id="my_modal_2" className="modal bg-[#000000b8]" >
            <div className="modal-box relative bg-slate-300 bg-opacity-50 text-black">
                <div className="modal-action justify-center">
                    <form method="dialog" className='space-y-3 w-full'>
                        <button className="text-red-500 px-2 py-1 rounded bg-slate-50 bg-opacity-50 text-sm absolute left-2 top-2" type='submit'><ImCross></ImCross> </button>
                        <select className="select my-inp w-full" id='priority-level' defaultValue={''} ref={userNameRef}>
                            <option value={''} disabled>Users</option>
                            {
                                allUser?.map((user, ind) => <option key={ind} value={user?.email}>{user?.email}</option>)
                            }
                        </select>
                        <div className='text-center'>
                            <button className="my-btn-one" onClick={addUserInTeamFunc}>Invite user</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default AddMemberInTeamModal;