import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside className='col-md-3'>
            Sidebar works
            <Link to='settings'>Settings</Link>
        </aside>
        )
}

export default Sidebar