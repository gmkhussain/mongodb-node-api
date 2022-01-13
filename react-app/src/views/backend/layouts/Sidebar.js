import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside className='col-md-3'>
            Sidebar works
            <Link to='dashboard/users'>Users</Link>
            <Link to='dashboard/settings'>Settings</Link>
        </aside>
        )
}

export default Sidebar