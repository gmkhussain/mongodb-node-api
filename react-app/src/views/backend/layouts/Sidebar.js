import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import Context from '../../../context/Context'


const Sidebar = () => {

    let { styles, setStyles } = useContext(Context)

    const style_headings = { color: styles.links_color, fontFamily: styles.links_font, fontWeight: styles.links_weight  }

    console.log( "styles", styles )

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
                    <NavLink to='/dashboard/pages'
                            style={style_headings}
                            className={({ isActive }) => (isActive ? 'active' : 'inactive') }
                            >
                        <div className="fw-bold">Pages</div>
                    </NavLink>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <NavLink to='/dashboard/settings'
                            style={style_headings}
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