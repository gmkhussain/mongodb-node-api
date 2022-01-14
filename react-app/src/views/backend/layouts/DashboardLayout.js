import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
    <React.Fragment>
        <Header />
        <main className="wrapper">
           <div className='row'>
                <Sidebar />
                <div className='col-md-9'>
                    {children}
                </div>
            </div>
        </main>
    </React.Fragment>
    );
};
export default DashboardLayout;