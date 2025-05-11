import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/pages/ProfileOptions/component/Sidebar'


const Profile = () => {
    return (
        <div className='flex '>
            {/* <Sidebar /> */}
            <div className='w-full'>
            <Outlet />
            </div>
        </div>
    )
}

export default Profile