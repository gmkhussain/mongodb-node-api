import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside className='col-md-3'>
            <ol className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <Link to='/dashboard/users' className="ms-2 me-auto">
                        <div className="fw-bold">Users</div>
                    </Link>
                    <span className="badge bg-primary rounded-pill">14</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <Link to='/dashboard/pages' className="ms-2 me-auto">
                        <div className="fw-bold">Pages</div>
                    </Link>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <Link to='/dashboard/settings' className="ms-2 me-auto">
                        <div className="fw-bold">Settings</div>
                    </Link>
                </li>
            </ol>
        </aside>
        )
}

export default Sidebar