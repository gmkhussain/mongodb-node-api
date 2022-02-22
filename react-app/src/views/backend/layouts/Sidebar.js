import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside className='col-md-2 p-0'>
            <ol className="list-group">
                {/* <li className="list-group-item d-flex justify-content-between align-items-start">
                    <NavLink   to='/dashboard/users'  
                            className={({ isActive }) => (isActive ? 'active' : 'inactive') }
                            >
                        <div className="fw-bold">Users</div>
                    </NavLink>
                    
                </li> */}
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <NavLink   to='/dashboard/pages' 
                            className={({ isActive }) => (isActive ? 'active' : 'inactive') }
                            >
                        <div className="fw-bold">Pages</div>
                    </NavLink>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <NavLink to='/dashboard/settings'
                            className={({ isActive }) => (isActive ? 'active' : 'inactive') }
                            >
                        <div className="fw-bold">Settings</div>
                    </NavLink>
                </li>
            </ol>
        </aside>
        )
}

export default Sidebar